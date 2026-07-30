import Link from "next/link";
import type { Locale } from "@/lib/types";

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">LCX AUTOS</p>
          <h2>{lang === "en" ? "Engineering intelligence for future mobility." : "以工程智能，构建未来移动。"}</h2>
        </div>
        <div className="footer-links">
          <a href="mailto:18221668367@163.com">18221668367@163.com</a>
          <Link href={`/${lang}/about/`}>{lang === "en" ? "About the studio" : "关于工作室"}</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 LCX AUTOS</span>
        <span>Sebastian Lee — Founder &amp; Chief Engineer</span>
      </div>
    </footer>
  );
}
