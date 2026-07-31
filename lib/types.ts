export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export type Bilingual = { en: string; zh: string };
export type ProjectFact = { label: Bilingual; value: Bilingual };
export type ProjectItem = { label?: string; title: Bilingual; body: Bilingual };
export type MediaItem = {
  kind?: "image" | "video";
  asset: string;
  poster?: string;
  caption: Bilingual;
};
export type ProjectSection = {
  id: string;
  title: Bilingual;
  lead: Bilingual[];
  items: ProjectItem[];
  media: MediaItem[];
};
export type Project = {
  slug: string;
  family: string;
  domain: string;
  year: string;
  stage: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
  summary: Bilingual;
  hero: string;
  facts: ProjectFact[];
  sections: ProjectSection[];
  relatedResearch: string[];
  relatedInsights: string[];
};
export type FullText = {
  sourceLanguage: Locale;
  html: Partial<Record<Locale, string>>;
  origin: "original" | "editorial";
};
export type Research = {
  slug: string; year: string; domain: string; type: string; title: Bilingual;
  authors: string; venue: string; doi: string; summary: Bilingual; body: Bilingual[];
  relatedProjects: string[]; fullText: FullText;
};
export type Insight = {
  slug: string; year: string; category: string; title: Bilingual; summary: Bilingual;
  body: Bilingual[]; relatedProjects: string[]; fullText: FullText;
};
export type Solution = {
  slug: string; domain: string; title: Bilingual; summary: Bilingual;
  capabilities: Bilingual[]; projects: string[];
};
