import { TopBar } from "@/components";
import { SmsForm } from "@/domains/onboarding/components/SmsForm";

export default function OnbSmsPage() {
  return (
    <>
      <TopBar leading="back" />
      <main className="flex flex-1 flex-col gap-8 px-4 pb-6">
        <div>
          <h1 className="whitespace-pre-line text-[24px] font-bold leading-snug text-text-heading">
            {"휴대폰 번호를\n입력하세요"}
          </h1>
          <p className="mt-2 text-[14px] text-text-description">
            본인 명의의 휴대폰 번호를 입력해주세요
          </p>
        </div>

        <SmsForm />
      </main>
    </>
  );
}
