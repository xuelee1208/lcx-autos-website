import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { FullTextReader } from "@/components/FullTextReader";
import { getResearch, hasLocale, projects, research, t } from "@/lib/content";

export function generateStaticParams() {
  return ["en","zh"].flatMap((lang) => research.map((item) => ({ lang, slug: item.slug })));
}
export async function generateMetadata({ params }: { params: Promise<{lang: string; slug: string}> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const item = getResearch(slug);
  return item ? { title: t(item.title,lang), description: t(item.summary,lang) } : {};
}
export default async function ResearchDetail({ params }: { params: Promise<{lang: string; slug: string}> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const item = getResearch(slug);
  if (!item) notFound();
  const related = projects.filter((p) => item.relatedProjects.includes(p.slug));
  return (
    <PageShell lang={lang}>
      <article className="article article-wide">
        <header className="article-header">
          <p className="eyebrow">{item.type} · {item.year}</p>
          <h1>{t(item.title,lang)}</h1>
          <p className="summary">{t(item.summary,lang)}</p>
          {(item.authors || item.venue) && <p className="article-record">{item.authors}{item.authors && item.venue ? " · " : ""}{item.venue}</p>}
          {item.doi && <p><a className="text-link" href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">DOI: {item.doi} ↗</a></p>}
        </header>
        <FullTextReader data={item.fullText} lang={lang} />
        {related.length > 0 && <section className="article-related"><h2>{lang === "en" ? "Related projects" : "相关项目"}</h2>
          {related.map((p)=><p key={p.slug}><Link className="text-link" href={`/${lang}/projects/${p.slug}/`}>{t(p.title,lang)} ↗</Link></p>)}</section>}
      </article>
    </PageShell>
  );
}
