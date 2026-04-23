"use client";

import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

const LETTER_LABELS: Record<string, string> = {
  "2": "ABC",  "3": "DEF",
  "4": "GHI",  "5": "JKL",  "6": "MNO",
  "7": "PQRS", "8": "TUV",  "9": "WXYZ",
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"];

type Props = {
  value: string;
  onChange: (next: string) => void;
  length?: number;
  error?: boolean;
  className?: string;
};

export function PinKeypad({ value, onChange, length = 6, error, className }: Props) {
  const press = useCallback(
    (key: string) => {
      if (key === "del") return onChange(value.slice(0, -1));
      if (key === "" || value.length >= length) return;
      onChange((value + key).slice(0, length));
    },
    [value, onChange, length],
  );

  return (
    <div className={cn("flex w-full flex-col gap-10", className)}>
      {/* Dot indicators */}
      <div className="flex justify-center gap-4">
        {Array.from({ length }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-5 w-5 rounded-full border-2 transition-colors",
              i < value.length
                ? error
                  ? "border-error bg-error"
                  : "border-primary bg-primary"
                : "border-gray-300 bg-transparent",
            )}
          />
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3">
        {KEYS.map((key, i) => (
          <button
            key={`${key}-${i}`}
            type="button"
            onClick={() => press(key)}
            disabled={key === ""}
            className={cn(
              "flex h-16 flex-col items-center justify-center gap-0.5",
              "active:bg-gray-100 disabled:pointer-events-none disabled:opacity-0",
            )}
          >
            {key === "del" ? (
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            ) : (
              <>
                <span className="text-[26px] font-medium text-text-heading leading-none">
                  {key}
                </span>
                {LETTER_LABELS[key] ? (
                  <span className="text-[10px] tracking-widest text-text-description">
                    {LETTER_LABELS[key]}
                  </span>
                ) : null}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
