"use client";

import { useRouter, usePathname } from "@/lib/i18n/routing";
import { routing, type Locale } from "@/lib/i18n/routing";
import { cn } from "@/lib/cn";
import { useLanguages } from "@/domains/onboarding/hooks/useLanguages";

const FALLBACK_LABELS: Record<Locale, { native: string; english: string }> = {
  ko: { native: "한국어", english: "Korean" },
  en: { native: "English", english: "English" },
  zh: { native: "中文", english: "Chinese" },
  ja: { native: "日本語", english: "Japanese" },
  es: { native: "Español", english: "Spanish" },
};

type Props = { current: Locale; onSelect?: () => void };

export function LanguagePicker({ current, onSelect }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: languages, isLoading } = useLanguages();

  const select = (locale: Locale) => {
    router.replace(pathname, { locale });
    onSelect?.();
  };

  const options =
    languages ??
    routing.locales.map((code) => ({
      code,
      label: FALLBACK_LABELS[code].native,
      english: FALLBACK_LABELS[code].english,
    }));

  return (
    <ul className="flex flex-col gap-3">
      {isLoading
        ? routing.locales.map((code) => (
            <li
              key={code}
              className="h-[72px] animate-pulse rounded-2xl bg-gray-100"
            />
          ))
        : options.map(({ code, label, english }) => {
            const isSelected = current === code;
            return (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => select(code as Locale)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-colors",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-white",
                  )}
                >
                  {/* Flag placeholder */}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[20px]">
                    {code === "ko" ? "🇰🇷" : code === "en" ? "🇺🇸" : code === "zh" ? "🇨🇳" : code === "ja" ? "🇯🇵" : "🇪🇸"}
                  </span>

                  <div className="flex flex-1 flex-col">
                    <span className="text-[16px] font-semibold text-text-heading">
                      {label}
                    </span>
                    <span className="text-[13px] text-text-description">
                      {english ?? label}
                    </span>
                  </div>

                  {/* Radio */}
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-gray-300 bg-white",
                    )}
                  >
                    {isSelected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
    </ul>
  );
}
