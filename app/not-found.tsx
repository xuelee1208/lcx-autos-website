import Link from "next/link";

export default function NotFound() {
  return <main className="empty-state"><div className="shell"><p className="eyebrow">404</p><h1>Page not found.</h1><p>The requested LCX AUTOS page is unavailable.</p><Link className="button button-primary" href="/en/">Return home</Link></div></main>;
}
