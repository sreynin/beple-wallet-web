import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";
import en from "./messages/en.json";
import es from "./messages/es.json";
import ja from "./messages/ja.json";
import ko from "./messages/ko.json";
import zh from "./messages/zh.json";

const messagesByLocale = {
  en,
  es,
  ja,
  ko,
  zh,
} as const satisfies Record<Locale, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messagesByLocale[locale as Locale],
  };
});
