import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { hasLocale, research, t } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{lang: string}> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "zh" ? "研究" : "Research" };
}

export default async function ResearchPage({ params }: { params: Promise<{lang: string}> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <PageShell lang={lang}>
      <section className="page-hero"><div className="shell">
        <p className="eyebrow">{lang === "en" ? "Research" : "研究"}</p>
        <h1>{lang === "en" ? "Research that extends the engineering system." : "扩展工程系统的研究。"}</h1>
        <p className="lead">{lang === "en" ? "Published work, technical reports and simulation studies across flight, autonomy, safety and low-altitude systems." : "覆盖飞行、自主系统、安全与低空体系的论文、技术报告及仿真研究。"}</p>
      </div></section>
      <section className="section"><div className="shell list-grid">
        {research.map((x)=><Link className="content-card" href={`/${lang}/research/${x.slug}/`} key={x.slug}>
          <span className="type">{x.type} · {x.year}</span><h3>{t(x.title,lang)}</h3><p>{t(x.summary,lang)}</p><span className="card-cta">{lang === "zh" ? "阅读全文" : "Read full text"} →</span>
        </Link>)}
      </div></section>
    </PageShell>
  );
}
