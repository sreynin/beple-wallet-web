import { TopBar } from "@/components";
import { UserTypeForm } from "@/domains/onboarding/components/UserTypeForm";

// ONB-002 — 사용자 유형 선택
export default function OnbUserTypePage() {
  return (
    <>
      <TopBar leading="back" />
      <main className="flex flex-1 flex-col gap-6 px-4 pb-6 pt-2">
        <div>
          <h1 className="text-[24px] font-bold leading-snug text-text-heading">
            어떤 사용자이신가요?
          </h1>
          <p className="mt-2 text-[14px] text-text-description">
            회원 유형에 따라 가입 절차가 달라집니다
          </p>
        </div>
        <UserTypeForm />
      </main>
    </>
  );
}
