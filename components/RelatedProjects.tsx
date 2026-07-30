import type { Locale, Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

export function RelatedProjects({ items, lang, title }: { items: Project[]; lang: Locale; title?: string }) {
  if (!items.length) return null;
  return (
    <section className="section section-soft">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">{lang === "en" ? "Related work" : "相关项目"}</p>
          <h2>{title ?? (lang === "en" ? "Continue exploring." : "继续浏览。")}</h2>
        </div>
        <div className="project-grid compact">
          {items.slice(0,3).map((p) => <ProjectCard key={p.slug} project={p} lang={lang} />)}
        </div>
      </div>
    </section>
  );
}
