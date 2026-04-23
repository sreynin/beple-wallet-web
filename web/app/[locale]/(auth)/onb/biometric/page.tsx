import { BiometricForm } from "@/domains/onboarding/components/BiometricForm";

// ONB-013 — 생체인증 등록
export default function OnbBiometricPage() {
  return (
    <div className="flex flex-1 flex-col">
      <BiometricForm />
    </div>
  );
}
