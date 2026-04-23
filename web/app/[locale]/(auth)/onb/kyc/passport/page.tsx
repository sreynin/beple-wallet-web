import { TopBar } from "@/components";
import { PassportCaptureForm } from "@/domains/onboarding/components/PassportCaptureForm";

// ONB-008 — 여권 OCR 촬영
export default function KycPassportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <TopBar leading="back" className="bg-transparent text-white" />
      <PassportCaptureForm />
    </div>
  );
}
