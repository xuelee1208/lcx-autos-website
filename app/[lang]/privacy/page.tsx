import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { hasLocale } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return createPageMetadata({
    lang,
    title: lang === "zh" ? "隐私说明" : "Privacy Notice",
    description: lang === "zh" ? "LCX AUTOS 网站的隐私与访问数据说明。" : "Privacy and website-usage notice for LCX AUTOS.",
    pathname: "/privacy/",
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const zh = lang === "zh";
  return (
    <PageShell lang={lang}>
      <article className="article article-wide">
        <header className="article-header">
          <p className="eyebrow">LCX AUTOS</p>
          <h1>{zh ? "隐私说明" : "Privacy Notice"}</h1>
          <p className="summary">{zh ? "本说明介绍网站在运行、性能分析与邮件联系过程中涉及的信息。" : "This notice explains the information involved in operating the site, measuring performance and handling email enquiries."}</p>
          <p className="article-record">{zh ? "更新日期：2026 年 7 月 31 日" : "Last updated: 31 July 2026"}</p>
        </header>
        <section className="article-body privacy-copy">
          <h2>{zh ? "网站访问数据" : "Website usage data"}</h2>
          <p>{zh ? "本网站部署于 Vercel，并使用 Vercel Web Analytics 与 Speed Insights 了解总体访问情况和页面性能。相关服务可能处理页面地址、设备与浏览器类型、访问时间、网络与性能指标等技术信息。" : "This website is deployed on Vercel and uses Vercel Web Analytics and Speed Insights to understand aggregate usage and page performance. These services may process technical information such as page URLs, device and browser type, visit time, network information and performance metrics."}</p>
          <p>{zh ? "这些数据用于网站维护、内容改进与性能优化。LCX AUTOS 不通过本网站建立用户账户，也不在网站中设置在线支付功能。" : "The data is used for site maintenance, content improvement and performance optimisation. LCX AUTOS does not create user accounts through this website and does not operate online payment functions on the site."}</p>

          <h2>{zh ? "邮件联系" : "Email enquiries"}</h2>
          <p>{zh ? "当你通过网站展示的邮箱主动联系时，邮件内容、发件地址和相关附件将由邮件服务提供商处理，并用于回复工程合作、研究交流或项目咨询。请勿通过普通邮件发送密码、访问密钥或无需披露的敏感工程资料。" : "When you contact the published email address, the message, sender address and any attachments are processed by the relevant email providers and used to respond to engineering collaboration, research exchange or project enquiries. Do not send passwords, access keys or engineering material that does not need to be disclosed through ordinary email."}</p>

          <h2>{zh ? "外部链接与媒体" : "External links and media"}</h2>
          <p>{zh ? "部分页面可能包含 DOI、外部研究页面或其他第三方入口。访问这些链接后，相关第三方的隐私政策与服务条款将适用。" : "Some pages may link to DOI records, external research pages or other third-party resources. The privacy policies and terms of those third parties apply after you follow those links."}</p>

          <h2>{zh ? "联系方式" : "Contact"}</h2>
          <p>{zh ? "如需询问本网站的数据与隐私事项，请联系：" : "For questions about this website and its handling of information, contact:"}</p>
          <p><a className="text-link" href="mailto:18221668367@163.com">18221668367@163.com</a></p>
        </section>
      </article>
    </PageShell>
  );
}
