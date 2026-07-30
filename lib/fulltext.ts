import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { FullText, Locale } from "./types";

export function readFullText(data: FullText, lang: Locale) {
  const selected = data.html[lang] ?? data.html[data.sourceLanguage];
  if (!selected) return { html: "", language: data.sourceLanguage, fallback: true };
  const html = readFileSync(join(process.cwd(), "content", "fulltext", selected), "utf8");
  return { html, language: data.html[lang] ? lang : data.sourceLanguage, fallback: !data.html[lang] };
}
