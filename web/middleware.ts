import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Block /dev/* in production
  if (
    process.env.NODE_ENV === "production" &&
    req.nextUrl.pathname.includes("/dev/")
  ) {
    return new NextResponse(null, { status: 404 });
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
