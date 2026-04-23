import { TopBar } from "@/components";
import { FaceScanForm } from "@/domains/onboarding/components/FaceScanForm";

// ONB-009 — 안면 인식 + Liveness Check
export default function KycFacePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <TopBar leading="back" className="bg-transparent text-white" />
      <FaceScanForm />
    </div>
  );
}
