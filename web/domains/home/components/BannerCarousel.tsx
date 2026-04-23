"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/lib/i18n/routing";
import type { HomeEvent } from "../types";

const AUTO_SLIDE_MS = 4000;

type Props = { banners: HomeEvent[] };

export function BannerCarousel({ banners }: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = banners.length;

  const goTo = (i: number) => setIndex((i + count) % count);

  // Auto-slide
  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setTimeout(() => goTo(index + 1), AUTO_SLIDE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  if (count === 0) return null;

  const banner = banners[index % count]!;

  return (
    <section className="px-4">
      <h2 className="mb-3 text-[17px] font-bold text-text-heading">이벤트</h2>

      {/* Slide area */}
      <div className="relative overflow-hidden rounded-2xl">
        <button
          type="button"
          onClick={() => router.push(`/home/banner?id=${banner.id}`)}
          className="relative flex h-[148px] w-full flex-col justify-end overflow-hidden bg-gradient-to-br from-primary to-blue-400 px-5 pb-5 text-left"
        >
          {/* Decorative circles */}
          <span className="pointer-events-none absolute right-[-24px] top-[-24px] h-36 w-36 rounded-full bg-white/10" />
          <span className="pointer-events-none absolute right-10 top-4 h-20 w-20 rounded-full bg-white/10" />

          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-white/70">
            {banner.tag}
          </p>
          <p className="text-[20px] font-bold leading-snug text-white">{banner.title}</p>
          {banner.active && (
            <span className="mt-2 w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              진행 중
            </span>
          )}
        </button>

        {/* Dot indicators — shown only when count > 1 */}
        {count > 1 && (
          <div className="absolute bottom-3 right-4 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
