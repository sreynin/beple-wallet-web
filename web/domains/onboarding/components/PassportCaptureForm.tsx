"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { submitPassport, type PassportOcr } from "../api";
import { useOnbStore } from "../store";
import { isNativeApp, sendToNative, onNativeMessage } from "@/lib/native-bridge";

export function PassportCaptureForm() {
  const router = useRouter();
  const setPassportOcr = useOnbStore((s) => s.setPassportOcr);

  const { mutate, isPending } = useMutation({
    mutationFn: submitPassport,
    onSuccess: (ocr: PassportOcr) => {
      setPassportOcr(ocr);
      router.replace(routes.onb.kyc("passport-confirm"));
    },
  });

  // Always listen for native KYC_PASSPORT_DONE so returning from the native
  // camera navigates forward. No auto-trigger on mount.
  useEffect(() => {
    return onNativeMessage((msg) => {
      if (msg.type === "KYC_PASSPORT_DONE") {
        setPassportOcr(msg.ocr as PassportOcr);
        router.replace(routes.onb.kyc("passport-confirm"));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = () => {
    if (isNativeApp()) {
      sendToNative({ type: "KYC_PASSPORT_START" });
      return;
    }
    mutate();
  };

  return (
    <main className="flex flex-1 flex-col px-4 pb-6 pt-2">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-white">여권을 촬영해주세요</h1>
        <p className="mt-2 text-[14px] text-gray-400">
          여권 사진면이 가이드 안에 들어오도록 맞춰주세요
        </p>
      </div>

      {/* Camera viewfinder */}
      <div className="relative mx-auto mb-6 w-full max-w-sm">
        <div className="relative aspect-[1.42/1] w-full overflow-hidden rounded-lg bg-gray-900">
          <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-primary" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-primary" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary" />

          <div className="flex h-full items-center gap-4 px-6">
            <div className="h-20 w-16 shrink-0 rounded-sm bg-gray-700" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-2.5 w-full rounded bg-gray-700" />
              <div className="h-2.5 w-4/5 rounded bg-gray-700" />
              <div className="h-2.5 w-full rounded bg-gray-700" />
              <div className="h-2.5 w-3/4 rounded bg-gray-700" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gray-800/80 px-3 py-2">
            <p className="font-mono text-[10px] text-gray-400">
              P&lt;KORHONG&lt;&lt;GIL&lt;DONG&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
            </p>
            <p className="font-mono text-[10px] text-gray-400">
              M12345678&lt;6KOR8501014M2801013&lt;&lt;&lt;&lt;
            </p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-6 text-center">
        <p className="text-[18px] font-bold text-white">
          여권 사진면이 잘 보이도록 놓아주세요
        </p>
        <p className="mt-1 text-[14px] text-gray-400">
          빛 반사가 없는 곳에서 촬영해주세요
        </p>
      </div>

      {/* Info box */}
      <div className="mb-8 rounded-2xl bg-gray-800 px-4 py-4">
        <p className="text-[13px] leading-relaxed text-gray-400">
          여권의 사진, 이름, 번호 등 모든 정보가 선명하게 보여야 합니다.
          빛 반사나 그림자가 없는 밝은 환경에서 촬영해주세요.
        </p>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={handleCapture}
          disabled={isPending}
          className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-primary text-[18px] font-semibold text-white disabled:opacity-60"
        >
          {isPending ? "분석 중…" : "촬영하기"}
        </button>
      </div>
    </main>
  );
}
