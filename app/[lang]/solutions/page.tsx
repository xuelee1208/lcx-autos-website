import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { hasLocale, projects, solutions, t } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{lang: string}> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return createPageMetadata({
    lang,
    title: lang === "zh" ? "解决方案" : "Solutions",
    description: lang === "zh"
      ? "自主飞行、智能移动、骑行安全与工程智能解决方案。"
      : "Engineering solutions across autonomous flight, intelligent mobility, rider safety and engineering intelligence.",
    pathname: "/solutions/",
  });
}

export default async function SolutionsPage({ params }: { params: Promise<{lang: string}> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <PageShell lang={lang}>
      <section className="page-hero"><div className="shell">
        <p className="eyebrow">{lang === "en" ? "Solutions" : "解决方案"}</p>
        <h1>{lang === "en" ? "From mission definition to integrated engineering systems." : "从任务定义走向集成工程系统。"}</h1>
        <p className="lead">{lang === "en" ? "LCX AUTOS organises capabilities around real operating problems in flight, mobility, safety and engineering intelligence." : "LCX AUTOS 围绕飞行、移动、安全与工程智能中的真实运行问题组织技术能力。"}</p>
      </div></section>
      <section className="section"><div className="shell solution-stack">
        {solutions.map((s) => (
          <article className="solution-panel" id={s.slug} key={s.slug}>
            <div><p className="eyebrow">{s.slug.replaceAll("-"," ")}</p><h2>{t(s.title,lang)}</h2><p>{t(s.summary,lang)}</p></div>
            <div>
              <div className="capability-grid">{s.capabilities.map((c,i)=><div className="capability" key={i}>{t(c,lang)}</div>)}</div>
              <div style={{marginTop:24, display:"flex", flexWrap:"wrap", gap:10}}>
                {s.projects.map((slug) => {
                  const p = projects.find((item)=>item.slug===slug);
                  return p ? <Link className="text-link" href={`/${lang}/projects/${slug}/`} key={slug}>{t(p.title,lang)} ↗</Link> : null;
                })}
              </div>
            </div>
          </article>
        ))}
      </div></section>
    </PageShell>
  );
}
