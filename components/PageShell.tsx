import type { ReactNode } from "react";
import type { Locale } from "@/lib/types";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">{lang === "en" ? "Skip to content" : "跳至主要内容"}</a>
      <Header lang={lang} />
      <main id="main" lang={lang}>{children}</main>
      <Footer lang={lang} />
    </>
  );
}
