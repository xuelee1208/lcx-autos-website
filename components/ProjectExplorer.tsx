"use client";

import { useMemo, useState } from "react";
import type { Locale, Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

const filters = {
  en: [
    ["all", "All projects"], ["flight", "Autonomous flight"], ["mobility", "Intelligent mobility"],
    ["rider", "Rider safety"], ["education", "Engineering education"],
  ],
  zh: [
    ["all", "全部项目"], ["flight", "自主飞行"], ["mobility", "智能移动"],
    ["rider", "骑行安全"], ["education", "工程实践"],
  ],
};

export function ProjectExplorer({ items, lang }: { items: Project[]; lang: Locale }) {
  const [filter, setFilter] = useState("all");
  const visible = useMemo(() => filter === "all" ? items : items.filter((item) => item.domain === filter), [filter, items]);
  return (
    <>
      <div className="filter-row" role="group" aria-label={lang === "en" ? "Project filters" : "项目筛选"}>
        {filters[lang].map(([key, label]) => (
          <button key={key} type="button" className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>{label}</button>
        ))}
      </div>
      <div className="project-grid">
        {visible.map((project) => <ProjectCard key={project.slug} project={project} lang={lang} />)}
      </div>
    </>
  );
}
