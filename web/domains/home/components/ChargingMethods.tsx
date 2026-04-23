"use client";

import { CreditCard, Globe, ChevronRight } from "lucide-react";
import { useRouter } from "@/lib/i18n/routing";
import type { ChargingMethod } from "../types";

function MethodIcon({ id }: { id: ChargingMethod["id"] }) {
  if (id === "korbit") {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF4FE] text-[18px] font-bold text-primary">
        K
      </span>
    );
  }
  if (id === "bank") {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF4FE]">
        <CreditCard className="h-5 w-5 text-primary" />
      </span>
    );
  }
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EEF4FE]">
      <Globe className="h-5 w-5 text-primary" />
    </span>
  );
}

function getHref(method: ChargingMethod): string {
  if (method.id === "korbit") return "/recharge/krb/connect";
  if (method.id === "bank") return "/recharge/bnk/complete";
  return "/recharge/drt/guide";
}

// SCN-HOM-009: external wallet always shows action regardless of connection state
function getActionLabel(method: ChargingMethod): string {
  if (method.id === "wallet") return "직전송 바로가기";
  if (!method.connected) return "";
  if (method.id === "korbit") return "코인매도 바로가기";
  if (method.id === "bank") return "계좌충전 바로가기";
  return "";
}

type Props = {
  methods: ChargingMethod[];
  onCharge?: () => void; // for empty-state CTA
};

export function ChargingMethods({ methods, onCharge }: Props) {
  const router = useRouter();
  const isEmpty = methods.every((m) => !m.connected);

  return (
    <section className="px-4">
      <h2 className="mb-3 text-[17px] font-bold text-text-heading">충전 수단</h2>

      <div className="flex flex-col">
        {methods.map((method, i) => (
          <button
            key={method.id}
            type="button"
            onClick={() => router.push(getHref(method))}
            className={`flex items-center gap-3 py-4 ${
              i < methods.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <MethodIcon id={method.id} />

            <div className="flex flex-1 flex-col items-start gap-0.5">
              <span className="text-[15px] font-bold text-text-heading">{method.name}</span>
              {/* SCN-HOM-006/007/008/017: detail text — blue when it's a CTA, gray when it's info */}
              <span
                className={`text-[13px] ${
                  method.connected || method.id === "wallet"
                    ? "text-gray-400"
                    : "font-semibold text-primary"
                }`}
              >
                {method.detail}
              </span>
            </div>

            {/* SCN-HOM-006/008/009: action label with chevron */}
            {getActionLabel(method) ? (
              <span className="flex shrink-0 items-center gap-0.5 text-[12px] text-gray-400">
                {getActionLabel(method)}
                <ChevronRight className="h-4 w-4" />
              </span>
            ) : (
              <ChevronRight className="h-5 w-5 shrink-0 text-gray-300" />
            )}
          </button>
        ))}
      </div>

      {/* SCN-HOM-002/015: empty state guidance + 충전하기 button */}
      {isEmpty && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-center text-[13px] text-gray-400">
            충전 수단을 연결하고 시작해보세요
          </p>
          <button
            type="button"
            onClick={onCharge ?? (() => router.push("/recharge/krb/connect"))}
            className="flex h-[44px] w-full items-center justify-center rounded-2xl bg-primary text-[15px] font-semibold text-white"
          >
            충전하기
          </button>
        </div>
      )}
    </section>
  );
}
