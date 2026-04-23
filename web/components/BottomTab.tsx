"use client";

import { Home, QrCode, Wallet, History, Settings, type LucideIcon } from "lucide-react";
import { Link, usePathname } from "@/lib/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * BottomTab — spec source: design-guide.md §1.3
 * 5 tabs, 56px height. Primary active color.
 */
type Tab = {
  href: string;
  labelKey: string;
  label: string;
  icon: LucideIcon;
};

const TABS: Tab[] = [
  { href: "/home", labelKey: "home", label: "홈", icon: Home },
  { href: "/pay/qr", labelKey: "pay", label: "결제", icon: QrCode },
  { href: "/activity/history", labelKey: "activity", label: "내역", icon: History },
  { href: "/recharge", labelKey: "recharge", label: "충전", icon: Wallet },
  { href: "/settings", labelKey: "settings", label: "더보기", icon: Settings },
];

export function BottomTab() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 z-30 flex h-14 w-full items-center justify-around border-t border-border-divider bg-bg"
      aria-label="Primary"
    >
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5",
              active ? "text-primary" : "text-gray-600",
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="text-[11px]">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
