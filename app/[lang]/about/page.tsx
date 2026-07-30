import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { about, hasLocale, t } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{lang: string}> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "zh" ? "关于" : "About" };
}

export default async function AboutPage({ params }: { params: Promise<{lang: string}> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <PageShell lang={lang}>
      <section className="page-hero"><div className="shell">
        <p className="eyebrow">LCX AUTOS</p>
        <h1>{lang === "en" ? "An independent engineering studio for future mobility." : "面向未来移动的独立工程工作室。"}</h1>
        <p className="lead">{t(about.intro,lang)}</p>
      </div></section>
      <section className="section"><div className="shell about-grid">
        <div>
          <p className="eyebrow">{lang === "en" ? "Mission" : "使命"}</p>
          <h2>{t(about.mission,lang)}</h2>
          <p style={{fontSize:20,color:"var(--muted)"}}>{t(about.philosophy,lang)}</p>
          <div className="block-grid" style={{marginTop:40}}>
            {about.collaboration.map((item,i)=><div className="info-block" key={i}><span className="number">{String(i+1).padStart(2,"0")}</span><h3>{t(item,lang)}</h3></div>)}
          </div>
        </div>
        <aside className="about-card">
          <p className="eyebrow">{lang === "en" ? "Founder" : "创始人"}</p>
          <h2 style={{fontSize:42}}>{about.identity.name}</h2>
          <p>{t(about.identity.role,lang)}</p>
          <p>{lang === "en" ? "For engineering collaboration, research exchange and project enquiries:" : "工程合作、研究交流与项目咨询："}</p>
          <a className="contact-link" href={`mailto:${about.identity.email}`}>{about.identity.email}</a>
        </aside>
      </div></section>
      <section className="section section-dark"><div className="shell">
        <div className="section-heading"><div><p className="eyebrow">{lang === "en" ? "Engineering journey" : "工程历程"}</p><h2>{lang === "en" ? "A growing system of projects and methods." : "持续发展的项目与方法体系。"}</h2></div></div>
        <div className="journey">{about.journey.map((j)=><div className="journey-item" key={j.year}><strong>{j.year}</strong><span>{t(j.title,lang)}</span></div>)}</div>
      </div></section>
    </PageShell>
  );
}
