import { TopBar } from "@/components";
import { KycMethodForm } from "@/domains/onboarding/components/KycMethodForm";

// ONB-007 — 본인인증 방식 선택 (Quick / Full)
export default function KycMethodPage() {
  return (
    <>
      <TopBar leading="back" />
      <main className="flex flex-1 flex-col px-4 pb-6 pt-2">
        <div className="mb-6">
          <h1 className="text-[24px] font-bold leading-snug text-text-heading">
            본인인증 방식을{"\n"}선택해주세요
          </h1>
          <p className="mt-2 text-[14px] text-text-description">
            선택한 방식에 따라 서비스 이용 한도가 달라집니다
          </p>
        </div>
        <KycMethodForm />
      </main>
    </>
  );
}
