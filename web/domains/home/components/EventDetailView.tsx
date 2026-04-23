"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "../api";
import { TopBar } from "@/components";

export function EventDetailView() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["home", "events", id],
    queryFn: () => fetchEvent(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <>
        <TopBar leading="back" title="이벤트" />
        <div className="flex flex-1 flex-col gap-4 px-4 py-6">
          <div className="h-[200px] animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <TopBar leading="back" title="이벤트" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-[14px] text-text-description">이벤트를 불러오지 못했습니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar leading="back" title="이벤트" />

      <div className="flex flex-1 flex-col overflow-y-auto pb-6">
        {/* Banner */}
        <div className="relative flex h-[220px] flex-col justify-end overflow-hidden bg-gradient-to-br from-primary to-blue-400 px-6 pb-6">
          <span className="absolute right-[-30px] top-[-30px] h-48 w-48 rounded-full bg-white/10" />
          <span className="absolute right-10 top-6 h-24 w-24 rounded-full bg-white/10" />
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-white/70">
            {data.tag}
          </p>
          <p className="whitespace-pre-line text-[28px] font-bold leading-snug text-white">
            {data.title}
          </p>
        </div>

        <div className="flex flex-col gap-5 px-4 pt-6">
          {/* Title + dates */}
          <div>
            <h2 className="text-[18px] font-bold text-text-heading">
              Beple Money {data.title}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="flex items-center gap-1 text-[13px] text-gray-400">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M1 5h12" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 1v2M10 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {data.startDate} ~ {data.endDate}
              </span>
              {data.active && (
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  진행 중
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="whitespace-pre-line text-[14px] leading-relaxed text-text-description">
            {data.description}
          </p>

          {/* Benefits */}
          <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-4 py-4">
            <p className="mb-2 text-[14px] font-bold text-primary">이벤트 혜택 안내</p>
            <ul className="flex flex-col gap-1.5">
              {data.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-text-description">
                  <span className="mt-1 text-primary">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-6 pt-2">
        <button
          type="button"
          className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-primary text-[18px] font-semibold text-white"
        >
          이벤트 참여하기
        </button>
      </div>
    </>
  );
}
