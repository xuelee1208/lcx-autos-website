import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  lang: "en",
  canonicalPath: "/",
  alternatePaths: { en: "/", zh: "/zh/" },
  description: "LCX AUTOS is an independent engineering systems studio for autonomous flight, intelligent mobility and safety systems.",
});

export default function RootPage() {
  return <HomePage lang="en" />;
}
