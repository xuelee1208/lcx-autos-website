import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/content";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <div data-locale={lang as Locale}>{children}</div>;
}
