import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/i18n/locales";
import { LanguagePageClient } from "./LanguagePageClient";

type Props = { params: Promise<{ locale: Locale }> };

export default async function OnbLanguagePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col px-4 pb-6 pt-12">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-primary">
          <span className="text-[36px] font-bold text-white">B</span>
        </div>
        <h1 className="text-[24px] font-bold text-primary">비플월렛</h1>
        <p className="text-[14px] text-text-description">언어를 선택해주세요</p>
      </div>

      <LanguagePageClient current={locale} />
    </main>
  );
}
