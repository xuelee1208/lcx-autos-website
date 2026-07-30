import projectsData from "@/content/projects.json";
import researchData from "@/content/research.json";
import insightsData from "@/content/insights.json";
import solutionsData from "@/content/solutions.json";
import aboutData from "@/content/about.json";
import siteData from "@/content/site.json";
import type { Insight, Locale, Project, Research, Solution } from "./types";

export const projects = projectsData as Project[];
export const research = researchData as Research[];
export const insights = insightsData as Insight[];
export const solutions = solutionsData as Solution[];
export const about = aboutData;
export const site = siteData;

export function hasLocale(lang: string): lang is Locale {
  return lang === "en" || lang === "zh";
}
export function t<T extends { en: string; zh: string }>(value: T, lang: Locale) {
  return value[lang];
}
export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}
export function getResearch(slug: string) {
  return research.find((item) => item.slug === slug);
}
export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug);
}
export function domainName(domain: string, lang: Locale) {
  const names: Record<string, {en: string; zh: string}> = {
    flight: { en: "Autonomous Flight", zh: "自主飞行" },
    mobility: { en: "Intelligent Mobility", zh: "智能移动" },
    rider: { en: "Rider Safety", zh: "骑行安全" },
    education: { en: "Engineering Education", zh: "工程实践" },
    autonomy: { en: "Autonomous Systems", zh: "自主系统" },
    safety: { en: "Safety Systems", zh: "安全系统" },
    systems: { en: "Engineering Systems", zh: "工程系统" },
    simulation: { en: "Simulation", zh: "仿真" },
  };
  return names[domain]?.[lang] ?? domain;
}
