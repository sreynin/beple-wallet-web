import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./lib/i18n/locales";

// Custom Edge-safe locale middleware.
//
// Replaces `next-intl/middleware` to avoid pulling in Node-only modules
// (node:async_hooks, node:buffer) that crash Vercel's Edge Runtime with
// `__dirname is not defined`. next-intl's server/client helpers still
// work normally — only the middleware-layer locale routing is custom.
//
// Behavior:
//   1. Ignore static, API, and file-like paths (via matcher).
//   2. Block /dev/* in production.
//   3. If the path already starts with a known locale prefix, pass through.
//   4. Otherwise, detect preferred locale from the `NEXT_LOCALE` cookie or
//      the `Accept-Language` header, falling back to defaultLocale.
//   5. Redirect to `/<locale><path>`.

function pickLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as never)) {
    return cookieLocale;
  }

  const acceptLanguage = req.headers.get("accept-language") ?? "";
  for (const part of acceptLanguage.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase();
    if (!tag) continue;
    const primary = tag.split("-")[0];
    if (primary && locales.includes(primary as never)) {
      return primary;
    }
  }

  return defaultLocale;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Block /dev/* in production
  if (
    process.env.NODE_ENV === "production" &&
    pathname.includes("/dev/")
  ) {
    return new NextResponse(null, { status: 404 });
  }

  // Already locale-prefixed?
  const hasLocalePrefix = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // Redirect to localized URL
  const locale = pickLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
