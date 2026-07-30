import type { FullText, Locale } from "@/lib/types";
import { readFullText } from "@/lib/fulltext";

export function FullTextReader({ data, lang }: { data: FullText; lang: Locale }) {
  const result = readFullText(data, lang);
  const sourceName = result.language === "zh" ? (lang === "zh" ? "中文" : "Chinese") : (lang === "zh" ? "英文" : "English");
  return (
    <section className="fulltext-reader" aria-labelledby="fulltext-title">
      <div className="fulltext-heading">
        <p className="eyebrow">{lang === "zh" ? "全文" : "Full text"}</p>
        <h2 id="fulltext-title">{lang === "zh" ? "阅读全文" : "Read the complete text"}</h2>
        {result.fallback && <p className="language-note">{lang === "zh" ? `本页呈现${sourceName}原文。` : `The complete original text is presented in ${sourceName}.`}</p>}
      </div>
      <div className={`fulltext-content ${result.language === "zh" ? "lang-zh" : "lang-en"}`} dangerouslySetInnerHTML={{ __html: result.html }} />
    </section>
  );
}
