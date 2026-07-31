import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullTextReader } from "@/components/FullTextReader";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { getResearch, hasLocale, projects, research, t } from "@/lib/content";
import { absoluteUrl, createPageMetadata, localizedPath } from "@/lib/seo";

export function generateStaticParams() {
  return ["en","zh"].flatMap((lang) => research.map((item) => ({ lang, slug: item.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{lang: string; slug: string}> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const item = getResearch(slug);
  return item ? createPageMetadata({
    lang,
    title: t(item.title,lang),
    description: t(item.summary,lang),
    pathname: `/research/${slug}/`,
    type: "article",
  }) : {};
}

export default async function ResearchDetail({ params }: { params: Promise<{lang: string; slug: string}> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const item = getResearch(slug);
  if (!item) notFound();
  const related = projects.filter((p) => item.relatedProjects.includes(p.slug));
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": item.type.toLowerCase().includes("paper") ? "ScholarlyArticle" : "TechArticle",
    headline: t(item.title,lang),
    description: t(item.summary,lang),
    url: absoluteUrl(localizedPath(lang, `/research/${slug}/`)),
    datePublished: item.year,
    inLanguage: lang === "zh" ? "zh-CN" : "en",
    author: item.authors ? { "@type": "Person", name: item.authors } : { "@id": "https://lcxautos.com/#founder" },
    publisher: { "@id": "https://lcxautos.com/#organization" },
    isPartOf: { "@id": "https://lcxautos.com/#website" },
    sameAs: item.doi ? `https://doi.org/${item.doi}` : undefined,
  };
  return (
    <PageShell lang={lang}>
      <JsonLd data={articleJsonLd} />
      <article className="article article-wide">
        <header className="article-header">
          <p className="eyebrow">{item.type} · {item.year}</p>
          <h1>{t(item.title,lang)}</h1>
          <p className="summary">{t(item.summary,lang)}</p>
          {(item.authors || item.venue) && <p className="article-record">{item.authors}{item.authors && item.venue ? " · " : ""}{item.venue}</p>}
          {item.doi && <p><a className="text-link" href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">DOI: {item.doi} ↗</a></p>}
        </header>
        <FullTextReader data={item.fullText} lang={lang} />
        {related.length > 0 && <section className="article-related"><h2>{lang === "en" ? "Related projects" : "相关项目"}</h2>{related.map((p)=><p key={p.slug}><Link className="text-link" href={`/${lang}/projects/${p.slug}/`}>{t(p.title,lang)} ↗</Link></p>)}</section>}
      </article>
    </PageShell>
  );
}
