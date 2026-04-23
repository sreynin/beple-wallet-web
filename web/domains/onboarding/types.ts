import type { Locale } from "@/lib/i18n/routing";

export type LanguageOption = {
  code: Locale;
  label: string;
  english?: string;
};
