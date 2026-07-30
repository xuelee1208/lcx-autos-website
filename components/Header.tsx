"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/types";

const labels = {
  en: { solutions: "Solutions", projects: "Projects", research: "Research", insights: "Insights", about: "About", menu: "Menu" },
  zh: { solutions: "解决方案", projects: "项目", research: "研究", insights: "洞察", about: "关于", menu: "菜单" },
};

export function Header({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const other = lang === "en" ? "zh" : "en";
  const languageHref = pathname?.match(/^\/(en|zh)(\/|$)/)
    ? pathname.replace(/^\/(en|zh)/, `/${other}`)
    : `/${other}/`;
  const nav = [
    ["solutions", labels[lang].solutions],
    ["projects", labels[lang].projects],
    ["research", labels[lang].research],
    ["insights", labels[lang].insights],
    ["about", labels[lang].about],
  ];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href={`/${lang}/`} className="brand" aria-label="LCX AUTOS home">
          <img src="/media/images/lcx-mark-white.png" alt="" width="28" height="28" />
          <span>LCX AUTOS</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([path, label]) => <Link key={path} href={`/${lang}/${path}/`}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="lang-switch" href={languageHref} aria-label={lang === "en" ? "切换至中文" : "Switch to English"}>
            {other.toUpperCase()}
          </Link>
          <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={labels[lang].menu}>
            <span/><span/>
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <div className="shell">
            {nav.map(([path, label]) => <Link key={path} href={`/${lang}/${path}/`} onClick={() => setOpen(false)}>{label}</Link>)}
          </div>
        </nav>
      )}
    </header>
  );
}
