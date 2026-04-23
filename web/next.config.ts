import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // `/` previously relied on a server-component `redirect()` in
    // app/page.tsx. That prerendered to a broken static HTML shell on
    // Vercel (404). Expressing the redirect in next.config routes it at
    // the edge, works identically locally and on Vercel, and doesn't
    // need middleware.
    return [
      {
        source: "/",
        destination: "/ko/onb/language",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
