"use client";

import { CreditCard, Home, MoreHorizontal } from "lucide-react";
import { useRouter, usePathname } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";

const TABS = [
  { icon: CreditCard,     label: "결제내역", href: routes.activity.history },
  { icon: Home,           label: "홈",       href: routes.home.main },
  { icon: MoreHorizontal, label: "더보기",   href: routes.settings.root },
] as const;

export function BottomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-50 flex h-[64px] items-end justify-around border-t border-gray-100 bg-white pb-2 pt-2">
      {TABS.map(({ icon: Icon, label, href }) => {
        const isHome = href === routes.home.main;
        const isActive =
          href === routes.home.main
            ? pathname === "/home" || pathname.startsWith("/home")
            : pathname.startsWith(href);

        if (isHome) {
          return (
            <button
              key={label}
              type="button"
              onClick={() => router.push(href)}
              className="flex flex-col items-center gap-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-md">
                <Icon className="h-6 w-6 text-white" strokeWidth={2} />
              </span>
              <span className="text-[11px] font-semibold text-primary">{label}</span>
            </button>
          );
        }

        return (
          <button
            key={label}
            type="button"
            onClick={() => router.push(href)}
            className="flex flex-col items-center gap-1 pt-2"
          >
            <Icon className={`h-6 w-6 ${isActive ? "text-primary" : "text-gray-400"}`} strokeWidth={2} />
            <span className={`text-[11px] ${isActive ? "font-semibold text-primary" : "text-gray-400"}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
