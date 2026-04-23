import { TopBar } from "@/components";
import { TermsForm } from "@/domains/onboarding/components/TermsForm";

export default function OnbTermsPage() {
  return (
    <>
      <TopBar leading="back" />
      <main className="flex flex-1 flex-col gap-8 px-4 pb-6">
        <h1 className="text-[24px] font-bold leading-snug text-text-heading">
          서비스 이용을 위해{"\n"}약관에 동의해주세요
        </h1>
        <TermsForm />
      </main>
    </>
  );
}
