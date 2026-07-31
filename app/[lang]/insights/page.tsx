import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { hasLocale, insights, t } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{lang: string}> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return createPageMetadata({
    lang,
    title: lang === "zh" ? "洞察" : "Insights",
    description: lang === "zh"
      ? "LCX AUTOS 的工程文章、技术分析与设计思考全文。"
      : "Engineering notes, technical analysis and design thinking from LCX AUTOS.",
    pathname: "/insights/",
  });
}

export default async function InsightsPage({ params }: { params: Promise<{lang: string}> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <PageShell lang={lang}>
      <section className="page-hero"><div className="shell">
        <p className="eyebrow">{lang === "en" ? "Insights" : "洞察"}</p>
        <h1>{lang === "en" ? "Engineering notes, analysis and design thinking." : "工程文章、分析与设计思考。"}</h1>
        <p className="lead">{lang === "en" ? "Writing across aerodynamics, autonomous systems, mobility, human systems and engineering education." : "覆盖气动、自主系统、移动、人因系统与工程实践的技术写作。"}</p>
      </div></section>
      <section className="section"><div className="shell list-grid">
        {insights.map((x)=><Link className="content-card" href={`/${lang}/insights/${x.slug}/`} key={x.slug}>
          <span className="type">{x.category} · {x.year}</span><h3>{t(x.title,lang)}</h3><p>{t(x.summary,lang)}</p><span className="card-cta">{lang === "zh" ? "阅读全文" : "Read full text"} →</span>
        </Link>)}
      </div></section>
    </PageShell>
  );
}
