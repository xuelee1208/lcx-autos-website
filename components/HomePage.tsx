import Link from "next/link";
import type { Locale } from "@/lib/types";
import { about, insights, projects, research, solutions, t } from "@/lib/content";
import { PageShell } from "./PageShell";
import { ProjectCard } from "./ProjectCard";

export function HomePage({ lang }: { lang: Locale }) {
  const featured = projects.filter((p) => ["autavia-type-7-3","apollo-lx1","l-in-eye","autavia-f1"].includes(p.slug));
  return (
    <PageShell lang={lang}>
      <section className="hero">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">LCX AUTOS</p>
            <h1>{lang === "en" ? <>Engineering Intelligence<br/>for Future Mobility</> : <>以工程智能，<br/>构建未来移动</>}</h1>
            <p className="lead">{lang === "en"
              ? "Designing autonomous flight systems, intelligent safety and mission-oriented engineering platforms."
              : "设计自主飞行系统、智能安全方案与面向任务的工程平台。"}</p>
            <div className="hero-actions">
              <Link className="button button-primary" href={`/${lang}/projects/`}>{lang === "en" ? "Explore projects" : "浏览项目"}</Link>
              <Link className="button button-ghost" href={`/${lang}/solutions/`}>{lang === "en" ? "View solutions" : "查看解决方案"}</Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <img src="/media/images/autavia-type7-3.webp" alt="" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">{lang === "en" ? "Engineering systems" : "工程系统"}</p>
              <h2>{lang === "en" ? "Four domains. One connected method." : "四个领域，一套连贯方法。"}</h2></div>
            <p>{lang === "en"
              ? "LCX AUTOS connects platform design, perception, planning, safety and technical communication across future mobility."
              : "LCX AUTOS 将平台设计、感知、规划、安全与技术表达连接至未来移动系统。"}</p>
          </div>
          <div className="domain-grid">
            {solutions.map((s) => (
              <Link className="domain-card" href={`/${lang}/solutions/#${s.slug}`} key={s.slug}>
                <div><p className="eyebrow">{s.slug.replaceAll("-", " ")}</p><h3>{t(s.title,lang)}</h3><p>{t(s.summary,lang)}</p></div>
                <div className="capability-list">{s.capabilities.slice(0,3).map((c,i)=><span className="pill" key={i}>{t(c,lang)}</span>)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">{lang === "en" ? "Selected projects" : "精选项目"}</p>
              <h2>{lang === "en" ? "Systems developed through real engineering work." : "在工程实践中持续发展的系统。"}</h2></div>
            <p>{lang === "en" ? "Explore platforms, prototypes and design studies across flight, mobility and safety." : "浏览自主飞行、智能移动与安全领域的平台、原型及设计研究。"}</p>
          </div>
          <div className="project-grid">{featured.map((p)=><ProjectCard key={p.slug} project={p} lang={lang}/>)}</div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">{lang === "en" ? "Engineering journey" : "工程历程"}</p>
              <h2>{lang === "en" ? "From everyday safety to autonomous missions." : "从日常安全走向自主任务。"}</h2></div>
            <p>{lang === "en" ? "Each project adds a new layer: mechanism, perception, platform, planning and system intelligence." : "每个项目增加一层能力：机构、感知、平台、规划与系统智能。"}</p>
          </div>
          <div className="journey">
            {about.journey.map((j)=><div className="journey-item" key={j.year}><strong>{j.year}</strong><span>{t(j.title,lang)}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">{lang === "en" ? "Research & insights" : "研究与洞察"}</p>
              <h2>{lang === "en" ? "The methods and ideas behind the systems." : "系统背后的方法与思考。"}</h2></div>
            <p>{lang === "en" ? "Published research, technical studies and engineering notes form a connected knowledge layer." : "论文、技术研究与工程文章共同构成连贯的知识层。"}</p>
          </div>
          <div className="list-grid">
            {research.slice(0,2).map((x)=><Link className="content-card" href={`/${lang}/research/${x.slug}/`} key={x.slug}><span className="type">{x.type} · {x.year}</span><h3>{t(x.title,lang)}</h3><p>{t(x.summary,lang)}</p></Link>)}
            {insights.slice(0,2).map((x)=><Link className="content-card" href={`/${lang}/insights/${x.slug}/`} key={x.slug}><span className="type">{x.category} · {x.year}</span><h3>{t(x.title,lang)}</h3><p>{t(x.summary,lang)}</p></Link>)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
