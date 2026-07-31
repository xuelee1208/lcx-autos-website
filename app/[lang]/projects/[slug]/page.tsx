import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { RelatedProjects } from "@/components/RelatedProjects";
import { getProject, hasLocale, insights, projects, research, t } from "@/lib/content";

export function generateStaticParams() {
  return ["en","zh"].flatMap((lang) => projects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{lang: string; slug: string}> }): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = getProject(slug);
  if (!project) return {};
  return { title: t(project.title,lang), description: t(project.summary,lang) };
}

export default async function ProjectPage({ params }: { params: Promise<{lang: string; slug: string}> }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  const related = projects.filter((p) => p.family === project.family && p.slug !== project.slug);
  const projectResearch = research.filter((x) => project.relatedResearch.includes(x.slug));
  const projectInsights = insights.filter((x) => project.relatedInsights.includes(x.slug));
  return (
    <PageShell lang={lang}>
      <section className="project-hero">
        <div className="shell project-hero-inner">
          <div className="project-hero-copy">
            <p className="eyebrow">{project.family} · {project.year}</p>
            <p className="subtitle">{t(project.subtitle,lang)}</p>
            <h1>{t(project.title,lang)}</h1>
            <p className="summary">{t(project.summary,lang)}</p>
          </div>
          <div className="project-hero-image"><img src={`/media/images/${project.hero}`} alt={t(project.title,lang)}/></div>
        </div>
      </section>
      <section className="section"><div className="shell">
        <div className="fact-grid">
          {project.facts.map((fact,i)=><div className="fact" key={i}><small>{t(fact.label,lang)}</small><strong>{t(fact.value,lang)}</strong></div>)}
        </div>
      </div></section>
      {project.sections.map((section,index) => (
        <section className="story-section" id={section.id} key={section.id}>
          <div className="shell story-grid">
            <div className="story-index">{String(index+1).padStart(2,"0")} / {section.id.replaceAll("-"," ")}</div>
            <div className="story-content">
              <h2>{t(section.title,lang)}</h2>
              <div className="lead-stack">{section.lead.map((p,i)=><p key={i}>{t(p,lang)}</p>)}</div>
              {section.items.length > 0 && <div className="block-grid">{section.items.map((item,i)=>
                <div className="info-block" key={i}><span className="number">{item.label || String(i+1).padStart(2,"0")}</span><h3>{t(item.title,lang)}</h3><p>{t(item.body,lang)}</p></div>)}</div>}
              {section.media.length > 0 && <div className={`media-grid${section.media.some((media) => media.kind === "video") ? " media-grid--video" : ""}`}>{section.media.map((media,i)=>
                <figure className={`media-figure${media.kind === "video" ? " media-figure--video" : ""}`} key={i}>
                  {media.kind === "video" ? (
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={media.poster ? `/media/images/${media.poster}` : undefined}
                      aria-label={t(media.caption,lang)}
                    >
                      <source src={`/media/video/${media.asset}`} type="video/mp4" />
                      {lang === "en" ? "Your browser does not support embedded video." : "当前浏览器不支持嵌入式视频播放。"}
                    </video>
                  ) : (
                    <img src={`/media/images/${media.asset}`} alt={t(media.caption,lang)} loading="lazy"/>
                  )}
                  <figcaption>{t(media.caption,lang)}</figcaption>
                </figure>)}</div>}
            </div>
          </div>
        </section>
      ))}
      {(projectResearch.length > 0 || projectInsights.length > 0) && <section className="section"><div className="shell">
        <div className="section-heading"><div><p className="eyebrow">{lang === "en" ? "Connected knowledge" : "关联知识"}</p><h2>{lang === "en" ? "Research and engineering notes." : "研究与工程文章。"}</h2></div></div>
        <div className="list-grid">
          {projectResearch.map((x)=><Link className="content-card" href={`/${lang}/research/${x.slug}/`} key={x.slug}><span className="type">{x.type} · {x.year}</span><h3>{t(x.title,lang)}</h3><p>{t(x.summary,lang)}</p></Link>)}
          {projectInsights.map((x)=><Link className="content-card" href={`/${lang}/insights/${x.slug}/`} key={x.slug}><span className="type">{x.category} · {x.year}</span><h3>{t(x.title,lang)}</h3><p>{t(x.summary,lang)}</p></Link>)}
        </div>
      </div></section>}
      <RelatedProjects items={related} lang={lang}/>
    </PageShell>
  );
}
