"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { registerBiometric } from "../api";
import { isNativeApp, sendToNative, onNativeMessage } from "@/lib/native-bridge";

export function BiometricForm() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: registerBiometric,
    onSuccess: () => router.push(routes.home.main),
  });

  const skip = () => router.push(routes.home.main);

  // Native: hand off biometric registration to native LocalAuthentication
  useEffect(() => {
    if (!isNativeApp()) return;

    return onNativeMessage((msg) => {
      if (msg.type === "KYC_BIOMETRIC_DONE") router.push(routes.home.main);
      if (msg.type === "KYC_BIOMETRIC_SKIP") router.push(routes.home.main);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = () => {
    if (isNativeApp()) {
      sendToNative({ type: "KYC_BIOMETRIC_START" });
    } else {
      mutate();
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-between px-4 pb-8 pt-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        {/* Biometric icon */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6C11.373 6 6 11.373 6 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 10C13.582 10 10 13.582 10 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 14C15.791 14 14 15.791 14 18c0 2.209 1.791 4 4 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 6c6.627 0 12 5.373 12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 10c4.418 0 8 3.582 8 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h1 className="whitespace-pre-line text-[26px] font-bold leading-snug text-text-heading">
            {"생체인증을\n등록하시겠어요?"}
          </h1>
          <p className="mt-3 whitespace-pre-line text-[14px] leading-relaxed text-text-description">
            {"등록하면 PIN 대신 생체인증으로\n빠르게 결제할 수 있어요"}
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="rounded-2xl bg-gray-50 px-5 py-4">
            <p className="text-[15px] font-bold text-text-heading">빠른 결제</p>
            <p className="mt-1 text-[13px] text-text-description">
              PIN 입력 없이 지문/Face ID로 즉시 결제
            </p>
          </div>
          <div className="rounded-2xl bg-gray-50 px-5 py-4">
            <p className="text-[15px] font-bold text-text-heading">강력한 보안</p>
            <p className="mt-1 text-[13px] text-text-description">
              기기 내 생체정보를 활용한 안전한 인증
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 pt-6">
        <button
          type="button"
          onClick={handleRegister}
          disabled={isPending}
          className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-primary text-[16px] font-semibold text-white disabled:opacity-60"
        >
          {isPending ? "등록 중…" : "생체인증 등록하기"}
        </button>
        <button
          type="button"
          onClick={skip}
          disabled={isPending}
          className="flex h-[52px] w-full items-center justify-center rounded-2xl border-2 border-primary text-[16px] font-semibold text-primary disabled:opacity-40"
        >
          나중에 하기
        </button>
      </div>
    </div>
  );
}
