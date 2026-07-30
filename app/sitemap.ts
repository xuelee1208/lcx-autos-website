import type { MetadataRoute } from "next";
import { insights, projects, research } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lcxautos.com";
  const languages = ["en", "zh"];
  const sections = ["", "solutions", "projects", "research", "insights", "about"];
  const urls: MetadataRoute.Sitemap = [];
  for (const lang of languages) {
    for (const section of sections) {
      urls.push({ url: `${base}/${lang}/${section ? section + "/" : ""}`, changeFrequency: "monthly", priority: section ? 0.8 : 1 });
    }
    for (const item of projects) urls.push({ url: `${base}/${lang}/projects/${item.slug}/`, changeFrequency: "monthly", priority: 0.8 });
    for (const item of research) urls.push({ url: `${base}/${lang}/research/${item.slug}/`, changeFrequency: "yearly", priority: 0.7 });
    for (const item of insights) urls.push({ url: `${base}/${lang}/insights/${item.slug}/`, changeFrequency: "yearly", priority: 0.6 });
  }
  return urls;
}
