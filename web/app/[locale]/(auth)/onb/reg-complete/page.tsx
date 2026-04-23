import { Link } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";

// ONB-005 — 내국인 회원가입 완료
export default function OnbRegCompletePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-12 text-center">
      {/* Checkmark icon */}
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

      {/* Colored dots */}
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-[26px] font-bold text-text-heading">
          회원가입이 완료됐습니다
        </h1>
        <p className="text-[14px] leading-relaxed text-text-description">
          지금 바로 PIN을 설정하고{"\n"}비플월렛을 시작해보세요
        </p>
      </div>

      <div className="w-full">
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
