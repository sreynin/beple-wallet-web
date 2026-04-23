import { TopBar } from "@/components";
import { KycPassportConfirmForm } from "@/domains/onboarding/components/KycPassportConfirmForm";

// ONB-014 — 여권 정보 확인 (OCR 결과)
export default function KycPassportConfirmPage() {
  return (
    <>
      <TopBar leading="back" title="여권 정보 확인" />
      <main className="flex flex-1 flex-col px-4 pb-6 pt-4">
        <KycPassportConfirmForm />
      </main>
    </>
  );
}
