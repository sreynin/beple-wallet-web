import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { routing } from "@/lib/i18n/routing";
import { QueryProvider } from "@/lib/query-provider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <QueryProvider>
        <div className="mx-auto flex min-h-dvh w-full flex-col bg-bg pb-[env(safe-area-inset-bottom)] sm:max-w-[420px]">
          {children}
        </div>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
