"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { TopBar, PinKeypad } from "@/components";
import { setupPin } from "../api";
import { isNativeApp } from "@/lib/native-bridge";

type Step = "enter" | "confirm";

const CONTENT: Record<Step, { topBarTitle: string; title: string; subtitle: string }> = {
  enter: {
    topBarTitle: "PIN 설정",
    title: "사용하실 6자리 PIN을\n입력해주세요",
    subtitle: "숫자 6자리를 입력해 주세요",
  },
  confirm: {
    topBarTitle: "PIN 확인",
    title: "PIN을 한 번 더\n입력해주세요",
    subtitle: "앞서 입력한 PIN을 다시 입력해 주세요",
  },
};

export function PinSetupForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("enter");
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mismatch, setMismatch] = useState(false);

  const { isPending } = useMutation({
    mutationFn: setupPin,
    onSuccess: () => router.push(routes.onb.biometric),
  });

  const handlePinChange = (next: string) => {
    setPin(next);
    if (next.length === 6) setStep("confirm");
  };

  const handleConfirmChange = (next: string) => {
    setMismatch(false);
    setConfirm(next);
    if (next.length === 6) {
      if (next === pin) {
        router.push(routes.onb.biometric);
      } else {
        setMismatch(true);
        setConfirm("");
      }
    }
  };

  const handleBack = () => {
    if (step === "confirm") {
      setStep("enter");
      setPin("");
      setConfirm("");
      setMismatch(false);
    } else {
      router.back();
    }
  };

  const { topBarTitle, title, subtitle } = CONTENT[step];

  return (
    <>
      <TopBar leading="back" title={topBarTitle} onLeadingClick={handleBack} />

      <main className="flex flex-1 flex-col items-center px-4 pb-6 pt-6">
        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="whitespace-pre-line text-[24px] font-bold leading-snug text-text-heading">
            {title}
          </h1>
          <p className="mt-2 text-[14px] text-text-description">{subtitle}</p>
        </div>

        {/* Keypad */}
        {step === "enter" ? (
          <PinKeypad value={pin} onChange={handlePinChange} className="w-full" />
        ) : (
          <div className="flex w-full flex-col items-center gap-4">
            <PinKeypad
              value={confirm}
              onChange={handleConfirmChange}
              error={mismatch}
              className="w-full"
            />
            {mismatch && (
              <p className="text-[13px] text-error">
                PIN이 일치하지 않습니다. 다시 입력해주세요.
              </p>
            )}
          </div>
        )}

        {isPending && (
          <p className="mt-4 text-[13px] text-text-description">설정 중…</p>
        )}
      </main>
    </>
  );
}
