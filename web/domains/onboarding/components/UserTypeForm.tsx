"use client";

import { useState } from "react";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { Button } from "@/components";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import { useOnbStore, type UserType } from "../store";

const OPTIONS: { value: UserType; label: string; description: string }[] = [
  {
    value: "domestic",
    label: "내국인",
    description: "대한민국 국적자 / SMS 본인인증으로 간편 가입",
  },
  {
    value: "foreign",
    label: "외국인",
    description: "외국 국적자 / 여권 + 안면인식 KYC 인증 필요",
  },
];

export function UserTypeForm() {
  const router = useRouter();
  const setUserType = useOnbStore((s) => s.setUserType);
  const [selected, setSelected] = useState<UserType | null>(null);

  const handleNext = () => {
    if (!selected) return;
    setUserType(selected);
    router.push(routes.onb.terms);
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {OPTIONS.map(({ value, label, description }) => {
          const isSelected = selected === value;
          return (
            <li key={value}>
              <button
                type="button"
                onClick={() => setSelected(value)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-2xl border px-4 py-5 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white",
                )}
              >
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[17px] font-bold text-text-heading">
                    {label}
                  </span>
                  <span className="text-[13px] leading-snug text-text-description">
                    {description}
                  </span>
                </div>

                {/* Checkbox */}
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-gray-300 bg-white",
                  )}
                >
                  {isSelected && <Check className="h-4 w-4 text-white" strokeWidth={3} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto">
        <Button size="xl" block disabled={!selected} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
