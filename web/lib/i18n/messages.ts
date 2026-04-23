// Direct static imports of all locale messages so the app no longer
// depends on `createNextIntlPlugin` (which injected next-intl code —
// and transitively Node-only deps like node:async_hooks — into every
// Edge bundle including middleware, causing `__dirname is not defined`).
import en from "./messages/en.json";
import es from "./messages/es.json";
import ja from "./messages/ja.json";
import ko from "./messages/ko.json";
import zh from "./messages/zh.json";
import type { Locale } from "./locales";

export const messagesByLocale = {
  en,
  es,
  ja,
  ko,
  zh,
} as const satisfies Record<Locale, unknown>;

export function getMessagesFor(locale: Locale) {
  return messagesByLocale[locale];
}
