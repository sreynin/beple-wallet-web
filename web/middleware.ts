import { type NextRequest, NextResponse } from "next/server";

// DEBUG: minimal no-op middleware to diagnose persistent
// `__dirname is not defined` on Vercel Edge. If this also fails,
// the issue is in Next.js / next-intl plugin infra, not user code.
export default function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
