import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { hasLocale } from "@/lib/content";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <HomePage lang={lang} />;
}
