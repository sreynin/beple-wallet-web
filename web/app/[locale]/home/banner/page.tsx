import { Suspense } from "react";
import { EventDetailView } from "@/domains/home/components/EventDetailView";

// HOM-003 — 이벤트 상세
export default function HomeBannerPage() {
  return (
    <Suspense>
      <EventDetailView />
    </Suspense>
  );
}
