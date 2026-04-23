"use client";

import { useState } from "react";
import { useRouter } from "@/lib/i18n/routing";
import { type Locale } from "@/lib/i18n/routing";
import { LanguagePicker } from "@/components/LanguagePicker";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

export function LanguagePageClient({ current }: { current: Locale }) {
  const router = useRouter();
  const [selected, setSelected] = useState(true);

  return (
    <>
      <LanguagePicker current={current} onSelect={() => setSelected(true)} />

      <div className="mt-auto pt-6">
        <button
          type="button"
          disabled={!selected}
          onClick={() => router.push(routes.onb.userType)}
          className={cn(
            "flex h-[52px] w-full items-center justify-center rounded-2xl text-[18px] font-semibold transition-colors",
            selected
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed",
          )}
        >
          다음
        </button>
      </div>
    </>
  );
}
