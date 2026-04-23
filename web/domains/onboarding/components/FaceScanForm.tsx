"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { submitFaceScan } from "../api";
import { isNativeApp, sendToNative, onNativeMessage } from "@/lib/native-bridge";

export function FaceScanForm() {
  const router = useRouter();
  const [native, setNative] = useState(false);
  const startedRef = useRef(false);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: submitFaceScan,
    // replace, not push: this page is a native-scanner gateway, not a
    // destination the user should land on via back navigation.
    onSuccess: () => router.replace(routes.onb.kyc("complete")),
    onError: () => { if (isNativeApp()) router.replace(routes.onb.kyc("complete")); },
  });

  useEffect(() => {
    if (isNativeApp()) {
      setNative(true);

      // One-shot: fire KYC_FACE_START once per page mount.
      if (!startedRef.current) {
        startedRef.current = true;
        sendToNative({ type: "KYC_FACE_START" });
      }

      // Listener must attach on every effect run — Strict Mode cleans up.
      return onNativeMessage((msg) => {
        if (msg.type === "KYC_FACE_DONE") {
          router.replace(routes.onb.kyc("complete"));
        }
      });
    }

    // Web fallback: auto-start simulated face scan (once, even under Strict Mode)
    if (startedRef.current) return;
    startedRef.current = true;
    mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (native) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 pb-6">
        <p className="text-[14px] text-gray-400">얼굴 인식 화면으로 이동 중…</p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col pt-2">
      <div className="px-4">
        <h1 className="text-[24px] font-bold text-white">얼굴을 인식해주세요</h1>
        <p className="mt-2 text-[14px] text-gray-400">
          원 안에 얼굴을 맞추고 정면을 바라봐 주세요
        </p>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-8 pt-2">
        {/* Face circle */}
        <div className="flex flex-1 items-center justify-center">
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div
              className={`absolute inset-0 rounded-full border-4 ${
                isError ? "border-red-500" : "border-primary"
              } opacity-80`}
            />
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-14 rounded-full bg-gray-600" />
              <div className="h-20 w-28 rounded-t-full bg-gray-600" />
            </div>
            {isPending && (
              <div className="absolute inset-x-0 top-1/2 h-px bg-primary/60" />
            )}
          </div>
        </div>

        {/* Progress dots */}
        <div className="mb-4 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === 0 ? "bg-primary" : "bg-gray-600"}`}
            />
          ))}
        </div>

        {/* Status */}
        <div className="mb-6 text-center">
          {isError ? (
            <>
              <p className="text-[20px] font-semibold text-red-400">인식 실패</p>
              <p className="mt-1 text-[13px] text-gray-400">다시 시도해주세요</p>
              <button
                type="button"
                onClick={() => mutate()}
                className="mt-4 rounded-xl bg-primary px-6 py-2 text-[14px] font-semibold text-white"
              >
                재시도
              </button>
            </>
          ) : (
            <>
              <p className="text-[20px] font-semibold text-white">
                {isPending ? "얼굴 인식 중..." : "인식 완료"}
              </p>
              <p className="mt-1 text-[13px] text-gray-400">
                잠시 움직이지 말고 정면을 바라봐 주세요
              </p>
            </>
          )}
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {["안경 제거 권장", "밝은 환경 필요", "정면 응시"].map((tip) => (
            <span
              key={tip}
              className="flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-2 text-[12px] text-gray-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {tip}
            </span>
          ))}
        </div>

        <p className="text-center text-[12px] text-gray-500">
          안면 인식 데이터는 본인 확인 목적으로만 사용되며{"\n"}
          인증 완료 후 즉시 삭제됩니다
        </p>
      </div>
    </main>
  );
}
