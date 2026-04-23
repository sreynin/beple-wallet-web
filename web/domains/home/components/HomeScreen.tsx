"use client";

import { Bell } from "lucide-react";
import { useRouter } from "@/lib/i18n/routing";
import { useHome } from "../hooks/useHome";
import { BalanceCard } from "./BalanceCard";
import { QuickActions } from "./QuickActions";
import { ChargingMethods } from "./ChargingMethods";
import { BannerCarousel } from "./BannerCarousel";
import { BottomTabBar } from "./BottomTabBar";

function HomeSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 pb-6 pt-4">
      <div className="mx-4 h-[116px] animate-pulse rounded-2xl bg-gray-200" />
      <div className="mx-4 h-[100px] animate-pulse rounded-2xl bg-gray-200" />
      <div className="mx-4 h-5 w-24 animate-pulse rounded bg-gray-200" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="mx-4 h-[64px] animate-pulse rounded-xl bg-gray-200" />
      ))}
    </div>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useHome();

  return (
    <div className="flex flex-1 flex-col">
      {/* Custom header — SCN-HOM-016: bell icon is tappable */}
      <header className="flex h-14 shrink-0 items-center justify-between px-4">
        <h1 className="text-[22px] font-bold text-primary">비플월렛</h1>
        <button
          type="button"
          aria-label="알림"
          onClick={() => router.push("/notifications")}
          className="relative flex h-10 w-10 items-center justify-center"
        >
          <Bell className="h-6 w-6 text-gray-700" />
          {/* Red dot — shown when there are unread notifications */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pb-4">
        {isLoading ? (
          <HomeSkeleton />
        ) : isError || !data ? (
          /* SCN-HOM-013: error state with retry button */
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8">
            <p className="text-center text-[14px] text-text-description">
              잔액 조회에 실패했습니다.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-xl bg-primary px-6 py-2.5 text-[14px] font-semibold text-white"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <>
            {/* SCN-HOM-001/002: balance card handles 0원 empty state styling */}
            <BalanceCard
              balanceKrw={data.balanceKrw}
              lastUpdated={data.lastUpdated}
            />

            {/* SCN-HOM-003/004/005: quick actions */}
            <QuickActions />

            {/* SCN-HOM-006~009/015/017: charging methods + empty CTA */}
            <ChargingMethods methods={data.chargingMethods} />

            {/* SCN-HOM-010/011/014: banner carousel — hidden when 0 banners */}
            <BannerCarousel banners={data.events} />
          </>
        )}
      </div>

      {/* SCN-HOM-012: bottom tab bar — 3 tabs */}
      <BottomTabBar />
    </div>
  );
}
