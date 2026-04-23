import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MSWProvider } from "@/components/MSWProvider";

export const metadata: Metadata = {
  title: "Beple Wallet",
  description: "비플월렛 — 코인을 원화로, 국내 어디서든 결제.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // eslint-disable-next-line no-restricted-syntax
  themeColor: "#0D84FF",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
