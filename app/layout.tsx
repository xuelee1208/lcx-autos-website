import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LCX AUTOS — Engineering Intelligence for Future Mobility",
    template: "%s | LCX AUTOS",
  },
  description: "Independent engineering systems studio for autonomous flight, intelligent mobility and safety systems.",
  applicationName: "LCX AUTOS",
  authors: [{ name: "Sebastian Lee", url: SITE_URL }],
  creator: "Sebastian Lee",
  publisher: "LCX AUTOS",
  category: "Engineering",
  keywords: [
    "LCX AUTOS",
    "Autavia",
    "autonomous flight",
    "intelligent mobility",
    "vehicle safety",
    "engineering systems",
    "无人机",
    "自主飞行",
    "智能移动",
    "工程系统",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "LCX AUTOS — Engineering Intelligence for Future Mobility",
    description: "Independent engineering systems studio for autonomous flight, intelligent mobility and safety systems.",
    url: SITE_URL,
    siteName: "LCX AUTOS",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LCX AUTOS — Engineering Intelligence for Future Mobility",
    description: "Independent engineering systems studio for autonomous flight, intelligent mobility and safety systems.",
    images: ["/twitter-image.png"],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "LCX AUTOS",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: "mailto:18221668367@163.com",
      founder: { "@id": `${SITE_URL}/#founder` },
      description: "Independent engineering systems studio for autonomous flight, intelligent mobility and safety systems.",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Sebastian Lee",
      jobTitle: "Founder & Chief Engineer",
      worksFor: { "@id": `${SITE_URL}/#organization` },
      url: `${SITE_URL}/en/about/`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "LCX AUTOS",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en", "zh-CN"],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={siteJsonLd} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
