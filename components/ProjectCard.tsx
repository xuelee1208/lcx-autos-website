import Link from "next/link";
import type { Locale, Project } from "@/lib/types";
import { domainName, t } from "@/lib/content";

export function ProjectCard({ project, lang }: { project: Project; lang: Locale }) {
  return (
    <Link className="project-card" href={`/${lang}/projects/${project.slug}/`}>
      <div className={`project-media media-${project.domain}`}>
        <img src={`/media/images/${project.hero}`} alt={t(project.title, lang)} loading="lazy" />
      </div>
      <div className="project-card-copy">
        <div className="meta-row">
          <span>{domainName(project.domain, lang)}</span>
          <span>{project.year}</span>
        </div>
        <h3>{t(project.title, lang)}</h3>
        <p>{t(project.subtitle, lang)}</p>
        <span className="text-link">{lang === "en" ? "Explore project" : "查看项目"} <b>↗</b></span>
      </div>
    </Link>
  );
}
