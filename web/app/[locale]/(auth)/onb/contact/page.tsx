import { TopBar } from "@/components";
import { ContactForm } from "@/domains/onboarding/components/ContactForm";

// ONB-006 — 외국인 연락처 인증 (이메일 / 전화번호 탭)
export default function OnbContactPage() {
  return (
    <>
      <TopBar leading="back" />
      <main className="flex flex-1 flex-col px-4 pb-6 pt-2">
        <div className="mb-6">
          <h1 className="whitespace-pre-line text-[24px] font-bold leading-snug text-text-heading">
            {"연락처를\n인증해주세요"}
          </h1>
          <p className="mt-2 text-[14px] text-text-description">
            이메일 또는 전화번호로 인증코드를 받으세요
          </p>
        </div>
        <ContactForm />
      </main>
    </>
  );
}
