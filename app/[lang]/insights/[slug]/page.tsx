import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullTextReader } from "@/components/FullTextReader";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { getInsight, hasLocale, insights, projects, t } from "@/lib/content";
import { absoluteUrl, createPageMetadata, localizedPath } from "@/lib/seo";

export function generateStaticParams() {
  return ["en","zh"].flatMap((lang) => insights.map((item) => ({ lang, slug: item.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{lang: string; slug: string}> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const item = getInsight(slug);
  return item ? createPageMetadata({
    lang,
    title: t(item.title,lang),
    description: t(item.summary,lang),
    pathname: `/insights/${slug}/`,
    type: "article",
  }) : {};
}

export default async function InsightDetail({ params }: { params: Promise<{lang: string; slug: string}> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const item = getInsight(slug);
  if (!item) notFound();
  const related = projects.filter((p) => item.relatedProjects.includes(p.slug));
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(item.title,lang),
    description: t(item.summary,lang),
    url: absoluteUrl(localizedPath(lang, `/insights/${slug}/`)),
    datePublished: item.year,
    inLanguage: lang === "zh" ? "zh-CN" : "en",
    author: { "@id": "https://lcxautos.com/#founder" },
    publisher: { "@id": "https://lcxautos.com/#organization" },
    isPartOf: { "@id": "https://lcxautos.com/#website" },
  };
  return (
    <PageShell lang={lang}>
      <JsonLd data={articleJsonLd} />
      <article className="article article-wide">
        <header className="article-header">
          <p className="eyebrow">{item.category} · {item.year}</p>
          <h1>{t(item.title,lang)}</h1>
          <p className="summary">{t(item.summary,lang)}</p>
        </header>
        <FullTextReader data={item.fullText} lang={lang} />
        {related.length > 0 && <section className="article-related"><h2>{lang === "en" ? "Related projects" : "相关项目"}</h2>{related.map((p)=><p key={p.slug}><Link className="text-link" href={`/${lang}/projects/${p.slug}/`}>{t(p.title,lang)} ↗</Link></p>)}</section>}
      </article>
    </PageShell>
  );
}
