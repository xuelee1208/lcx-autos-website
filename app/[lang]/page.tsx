import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { hasLocale } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return createPageMetadata({
    lang,
    canonicalPath: lang === "en" ? "/" : "/zh/",
    alternatePaths: { en: "/", zh: "/zh/" },
    description: lang === "zh"
      ? "LCX AUTOS 是面向自主飞行、智能移动与安全系统的独立工程系统工作室。"
      : "LCX AUTOS is an independent engineering systems studio for autonomous flight, intelligent mobility and safety systems.",
  });
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <HomePage lang={lang} />;
}
