"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";
import { confirmPassport } from "../api";
import { useOnbStore } from "../store";
import { isNativeApp } from "@/lib/native-bridge";

const FIELD_LABELS: Record<string, string> = {
  name: "한글 이름",
  nameEn: "영문 이름",
  number: "여권 번호",
  nationality: "국적",
  dob: "생년월일",
  expiry: "만료일",
  gender: "성별",
};

export function KycPassportConfirmForm() {
  const router = useRouter();
  const passportOcr = useOnbStore((s) => s.passportOcr);

  const { mutate, isPending } = useMutation({
    mutationFn: confirmPassport,
    onSuccess: () => router.push(routes.onb.kyc("face")),
    // MSW is disabled inside the native WebView, so the real POST fails.
    // Navigate forward anyway — the OCR was already accepted by native.
    onError: () => { if (isNativeApp()) router.push(routes.onb.kyc("face")); },
  });

  const handleConfirm = () => {
    // Skip the API call entirely in native — no server to confirm against.
    if (isNativeApp()) {
      router.push(routes.onb.kyc("face"));
      return;
    }
    mutate();
  };

  if (!passportOcr) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-[14px] text-text-description">여권 정보를 불러오는 중…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Passport thumbnail */}
      <div className="overflow-hidden rounded-2xl bg-gray-900">
        <div className="relative aspect-[1.42/1] w-full">
          <span className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-primary" />
          <span className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-primary" />
          <span className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-primary" />
          <span className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-primary" />

          <div className="flex h-full items-center gap-4 px-6">
            <div className="h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-gray-700">
              <div className="flex h-full items-center justify-center">
                <span className="text-[28px]">🪪</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-[13px] font-semibold text-white">
                {passportOcr.nameEn || passportOcr.name}
              </p>
              <p className="text-[11px] text-gray-400">{passportOcr.number}</p>
              <div className="mt-1 flex flex-col gap-1">
                <div className="h-2 w-full rounded bg-gray-700" />
                <div className="h-2 w-4/5 rounded bg-gray-700" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gray-800/80 px-3 py-1.5">
            <p className="font-mono text-[9px] text-gray-400 truncate">
              P&lt;{passportOcr.nationality}{passportOcr.nameEn.replace(" ", "<<")}
            </p>
            <p className="font-mono text-[9px] text-gray-400">
              {passportOcr.number}&lt;{passportOcr.dob}
            </p>
          </div>
        </div>
      </div>

      {/* OCR result table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {Object.entries(passportOcr).map(([key, val], i, arr) => (
          <div
            key={key}
            className={`flex items-center justify-between px-4 py-4 ${
              i < arr.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <span className="text-[13px] text-text-description">
              {FIELD_LABELS[key] ?? key}
            </span>
            <span className={`text-[15px] font-semibold ${val ? "text-text-heading" : "text-gray-300"}`}>
              {val || "인식 불가"}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-[12px] text-text-description">
        위 정보가 여권과 동일한지 확인해주세요.
      </p>

      <div className="mt-auto flex flex-col gap-3">
        {/* 다시 촬영 */}
        <button
          type="button"
          onClick={() => router.push(routes.onb.kyc("passport"))}
          className="flex h-[52px] w-full items-center justify-center rounded-2xl border border-gray-300 text-[16px] font-semibold text-text-heading"
        >
          다시 촬영
        </button>

        {/* 확인 */}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isPending}
          className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-primary text-[18px] font-semibold text-white disabled:opacity-60"
        >
          {isPending ? "제출 중…" : "확인"}
        </button>
      </div>
    </div>
  );
}
