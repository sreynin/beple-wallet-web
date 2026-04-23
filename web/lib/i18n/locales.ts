// Plain locale constants — no next-intl imports so they're safe to import
// from Edge middleware (where Node-only deps break the bundle).
export const locales = ["ko", "en", "zh", "ja", "es"] as const;
export const defaultLocale = "ko" as const;
export type Locale = (typeof locales)[number];
