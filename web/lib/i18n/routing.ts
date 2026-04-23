import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "./locales";

export { defaultLocale, locales } from "./locales";
export type { Locale } from "./locales";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
