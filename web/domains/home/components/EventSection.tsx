"use client";

import { useRouter } from "@/lib/i18n/routing";
import type { HomeEvent } from "../types";

type Props = { events: HomeEvent[] };

export function EventSection({ events }: Props) {
  const router = useRouter();

  if (events.length === 0) return null;

  return (
    <section className="px-4 pb-6">
      <h2 className="mb-3 text-[17px] font-bold text-text-heading">이벤트</h2>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {events.map((ev) => (
          <button
            key={ev.id}
            type="button"
            onClick={() => router.push(`/home/banner?id=${ev.id}`)}
            className="relative flex w-[260px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-400 p-5 text-left"
          >
            {/* Decorative circle */}
            <span className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-white/10" />
            <span className="absolute right-8 top-4 h-16 w-16 rounded-full bg-white/10" />

            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/70">
              {ev.tag}
            </p>
            <p className="whitespace-pre-line text-[20px] font-bold leading-snug text-white">
              {ev.title}
            </p>
            {ev.active && (
              <span className="mt-3 w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                진행 중
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
