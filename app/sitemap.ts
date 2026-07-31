import type { MetadataRoute } from "next";
import { insights, projects, research } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-07-31");
  const urls: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/`, "zh-CN": `${SITE_URL}/zh/` } },
    },
    {
      url: `${SITE_URL}/zh/`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/`, "zh-CN": `${SITE_URL}/zh/` } },
    },
  ];

  const sections = ["solutions", "projects", "research", "insights", "about", "privacy"];
  for (const section of sections) {
    urls.push(
      {
        url: `${SITE_URL}/en/${section}/`,
        lastModified: updated,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: { en: `${SITE_URL}/en/${section}/`, "zh-CN": `${SITE_URL}/zh/${section}/` } },
      },
      {
        url: `${SITE_URL}/zh/${section}/`,
        lastModified: updated,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: { en: `${SITE_URL}/en/${section}/`, "zh-CN": `${SITE_URL}/zh/${section}/` } },
      },
    );
  }

  for (const item of projects) {
    urls.push(...detailEntries("projects", item.slug, "monthly", 0.8, updated));
  }
  for (const item of research) {
    urls.push(...detailEntries("research", item.slug, "yearly", 0.7, updated));
  }
  for (const item of insights) {
    urls.push(...detailEntries("insights", item.slug, "yearly", 0.6, updated));
  }
  return urls;
}

function detailEntries(
  section: string,
  slug: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
  lastModified: Date,
): MetadataRoute.Sitemap {
  const en = `${SITE_URL}/en/${section}/${slug}/`;
  const zh = `${SITE_URL}/zh/${section}/${slug}/`;
  const alternates = { languages: { en, "zh-CN": zh } };
  return [
    { url: en, lastModified, changeFrequency, priority, alternates },
    { url: zh, lastModified, changeFrequency, priority, alternates },
  ];
}
