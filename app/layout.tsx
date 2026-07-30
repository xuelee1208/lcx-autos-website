import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lcxautos.com"),
  title: { default: "LCX AUTOS", template: "%s | LCX AUTOS" },
  description: "Engineering intelligence for future mobility.",
  applicationName: "LCX AUTOS",
  openGraph: {
    title: "LCX AUTOS",
    description: "Engineering intelligence for future mobility.",
    siteName: "LCX AUTOS",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
