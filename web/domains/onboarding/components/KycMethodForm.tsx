"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import { saveKycMethod } from "../api";
import { isNativeApp } from "@/lib/native-bridge";

type Method = "quick" | "full";

const STEPS_QUICK = ["여권 촬영", "안면 인식", "HiKorea 조회"];
const STEPS_FULL = ["여권 촬영", "안면 인식", "추가 서류", "심사"];

export function KycMethodForm() {
  const router = useRouter();
  const [selected, setSelected] = useState<Method>("quick");

  const { isPending } = useMutation({
    mutationFn: () => saveKycMethod(selected),
    onSuccess: () => router.push(routes.onb.kyc("passport")),
  });

  const handleNext = () => router.push(routes.onb.kyc("passport"));

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Quick 인증 card */}
      <button
        type="button"
        onClick={() => setSelected("quick")}
        className={cn(
          "relative w-full rounded-2xl border-2 p-5 text-left transition-colors",
          selected === "quick"
            ? "border-primary bg-primary/5"
            : "border-gray-200 bg-white",
        )}
      >
        <div className="mb-3 flex items-center justify-end gap-2">
          <span className="rounded-lg bg-primary px-3 py-1 text-[13px] font-bold text-white">
            추천
          </span>
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors",
              selected === "quick"
                ? "border-primary bg-primary"
                : "border-gray-300 bg-white",
            )}
          >
            {selected === "quick" && (
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            )}
          </span>
        </div>

        <p className="mb-1 text-[20px] font-bold text-text-heading">Quick 인증</p>
        <p className="mb-4 text-[14px] font-semibold text-primary">충전 한도 50만원</p>

        <div className="flex flex-wrap gap-2">
          {STEPS_QUICK.map((step, i) => (
            <span
              key={step}
              className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[13px] font-semibold text-white"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/30 text-[11px] font-bold">
                {i + 1}
              </span>
              {step}
            </span>
          ))}
        </div>
      </button>

      {/* Full 인증 card (disabled) */}
      <div className="relative w-full rounded-2xl border-2 border-gray-200 bg-gray-50 p-5 opacity-60">
        <div className="mb-3 flex items-center justify-end gap-2">
          <span className="rounded-lg bg-gray-300 px-3 py-1 text-[13px] font-bold text-gray-500">
            준비 중
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-300 bg-white" />
        </div>

        <p className="mb-1 text-[20px] font-bold text-gray-400">Full 인증</p>
        <p className="mb-4 text-[14px] text-gray-400">한도 상향 (서비스 준비 중)</p>

        <div className="flex flex-wrap gap-2">
          {STEPS_FULL.map((step, i) => (
            <span
              key={step}
              className="flex items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1.5 text-[13px] font-semibold text-gray-400"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-300 text-[11px] font-bold text-gray-500">
                {i + 1}
              </span>
              {step}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={handleNext}
          disabled={isPending}
          className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-primary text-[18px] font-semibold text-white disabled:opacity-60"
        >
          {isPending ? "처리 중…" : "다음"}
        </button>
      </div>
    </div>
  );
}
