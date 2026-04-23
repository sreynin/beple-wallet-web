"use client";

import { RefreshCw } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refreshBalance } from "../api";

const fmt = new Intl.NumberFormat("ko-KR");

type Props = {
  balanceKrw: number;
  lastUpdated: string;
};

export function BalanceCard({ balanceKrw, lastUpdated }: Props) {
  const queryClient = useQueryClient();
  const isEmpty = balanceKrw === 0;

  const { mutate, isPending } = useMutation({
    mutationFn: refreshBalance,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home"] }),
  });

  return (
    <div className="mx-4 rounded-2xl bg-[#EEF4FE] px-5 py-5">
      {/* Label */}
      <div className="mb-2 flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${isEmpty ? "bg-gray-400" : "bg-primary"}`} />
        <span className="text-[13px] text-gray-500">Beple Money</span>
      </div>

      {/* Amount */}
      <p className={`text-[32px] font-bold tracking-tight ${isEmpty ? "text-gray-400" : "text-text-heading"}`}>
        ₩{fmt.format(balanceKrw)}
        <span className="ml-1 text-[18px] font-medium text-gray-400">원</span>
      </p>

      {isEmpty && (
        <p className="mt-1 text-[13px] text-gray-400">충전하고 시작해보세요</p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-blue-100 pt-3">
        <span className="text-[12px] text-gray-400">마지막 업데이트: {lastUpdated}</span>
        <button
          type="button"
          onClick={() => mutate()}
          disabled={isPending}
          className="flex items-center gap-1 text-[13px] font-semibold text-primary disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
          새로고침
        </button>
      </div>
    </div>
  );
}
