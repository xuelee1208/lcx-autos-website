import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { hasLocale, projects } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{lang: string}> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return createPageMetadata({
    lang,
    title: lang === "zh" ? "项目" : "Projects",
    description: lang === "zh" ? "LCX AUTOS 工程项目库，涵盖自主飞行、移动安全与工程实践。" : "LCX AUTOS engineering project library across autonomous flight, mobility safety and engineering practice.",
    pathname: "/projects/",
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{lang: string}> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <PageShell lang={lang}>
      <section className="page-hero"><div className="shell">
        <p className="eyebrow">{lang === "en" ? "Project library" : "项目库"}</p>
        <h1>{lang === "en" ? "Engineering systems, documented by project." : "以项目记录工程系统。"}</h1>
        <p className="lead">{lang === "en" ? "Explore flight platforms, mobility-safety systems, rider-safety prototypes and engineering programmes." : "浏览飞行平台、移动安全系统、骑行安全原型与工程实践项目。"}</p>
      </div></section>
      <section className="section"><div className="shell"><ProjectExplorer items={projects} lang={lang}/></div></section>
    </PageShell>
  );
}
