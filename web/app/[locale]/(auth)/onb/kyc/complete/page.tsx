import { Link } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";

// ONB-010 — KYC 완료 (Quick KYC 인증 완료, 충전 한도 50만원)
export default function KycCompletePage() {
  return (
    <main className="flex flex-1 flex-col px-4 pb-6">
      {/* Progress bars */}
      <div className="mb-8 flex gap-1 pt-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1 flex-1 rounded-full bg-primary" />
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
        {/* Checkmark */}
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 20L16 28L32 12"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-[26px] font-bold text-text-heading">
            인증이 완료됐습니다
          </h1>
          <p className="text-[14px] leading-relaxed text-text-description">
            충전 한도 50만원으로 서비스를{"\n"}이용하실 수 있습니다
          </p>
        </div>

        {/* Info card */}
        <div className="w-full rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 text-left">
          <p className="text-[15px] font-bold text-primary">Quick KYC 인증 완료</p>
          <p className="mt-1 text-[13px] leading-relaxed text-text-description">
            월 최대 50만원 충전 · 비플월렛 결제 서비스 이용 가능
          </p>
        </div>
      </div>

      <div className="pt-6">
        <Link
          href={routes.onb.pinSetup}
          className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-primary text-[18px] font-semibold text-white"
        >
          PIN 설정하기
        </Link>
      </div>
    </main>
  );
}
