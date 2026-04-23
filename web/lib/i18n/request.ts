import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type Locale } from "./locales";
import { messagesByLocale } from "./messages";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as never)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: messagesByLocale[locale as Locale],
  };
});
