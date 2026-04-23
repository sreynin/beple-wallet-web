"use client";

import { Plus, CreditCard, ArrowDown } from "lucide-react";
import { useRouter } from "@/lib/i18n/routing";
import { routes } from "@/lib/routes";

// SCN-HOM-003: 충전 → CHG domain
// SCN-HOM-004: 결제 → PAY domain (QR scan)
// SCN-HOM-005: 출금 → WDR domain
const ACTIONS = [
  { icon: Plus,       label: "충전", href: routes.recharge.krb("connect") },
  { icon: CreditCard, label: "결제", href: routes.pay.qr },
  { icon: ArrowDown,  label: "출금", href: routes.withdraw.qr },
] as const;

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="mx-4 rounded-2xl bg-white px-4 py-5 shadow-sm">
      <div className="flex items-center justify-around">
        {ACTIONS.map(({ icon: Icon, label, href }) => (
          <button
            key={label}
            type="button"
            onClick={() => router.push(href)}
            className="flex flex-col items-center gap-2"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4FE]">
              <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
            </span>
            <span className="text-[14px] font-medium text-text-heading">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
