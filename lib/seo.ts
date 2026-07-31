import type { Metadata } from "next";
import type { Locale } from "./types";

export const SITE_URL = "https://lcxautos.com";
export const SHARE_IMAGE = "/opengraph-image.png";

const HOME_TITLE = {
  en: "LCX AUTOS — Engineering Intelligence for Future Mobility",
  zh: "LCX AUTOS — 以工程智能，构建未来移动",
};

export function localizedPath(lang: Locale, pathname = "") {
  const suffix = pathname ? (pathname.startsWith("/") ? pathname : `/${pathname}`) : "/";
  return `/${lang}${suffix}`.replace(/\/+/g, "/");
}

export function createPageMetadata({
  lang,
  title,
  description,
  pathname = "",
  type = "website",
  canonicalPath,
  alternatePaths,
}: {
  lang: Locale;
  title?: string;
  description: string;
  pathname?: string;
  type?: "website" | "article";
  canonicalPath?: string;
  alternatePaths?: { en: string; zh: string };
}): Metadata {
  const canonical = canonicalPath ?? localizedPath(lang, pathname);
  const enPath = alternatePaths?.en ?? localizedPath("en", pathname);
  const zhPath = alternatePaths?.zh ?? localizedPath("zh", pathname);
  const displayTitle = title ?? HOME_TITLE[lang];

  return {
    title: title ? title : { absolute: displayTitle },
    description,
    alternates: {
      canonical,
      languages: {
        en: enPath,
        "zh-CN": zhPath,
        "x-default": enPath,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: displayTitle,
      description,
      url: canonical,
      siteName: "LCX AUTOS",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      alternateLocale: lang === "zh" ? ["en_US"] : ["zh_CN"],
      type,
      images: [
        {
          url: SHARE_IMAGE,
          width: 1200,
          height: 630,
          alt: "LCX AUTOS — Engineering Intelligence for Future Mobility",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
      images: [SHARE_IMAGE],
    },
  };
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}
