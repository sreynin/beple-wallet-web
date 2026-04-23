import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // nodeMiddleware is accepted at runtime (Next 15.2+) but missing
    // from the ExperimentalConfig TS type in 15.5. Needed so Vercel
    // runs middleware on Node.js runtime instead of Edge, avoiding
    // `__dirname is not defined` from next-intl internals that pull
    // in node:async_hooks / node:buffer.
    // @ts-expect-error -- key not yet in types
    nodeMiddleware: true,
  },
};

export default withNextIntl(nextConfig);
