import { notFound } from "next/navigation";
import type { ReactNode } from "react";

// Replaces the /dev/* production block that used to live in middleware.ts.
// The middleware was removed because `createNextIntlPlugin` / next-intl
// internals leak Node-only deps into every Edge bundle, crashing Vercel.
export default function DevLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <>{children}</>;
}
