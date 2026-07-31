import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LCX AUTOS",
    short_name: "LCX AUTOS",
    description: "Engineering intelligence for future mobility.",
    start_url: "/en/",
    scope: "/",
    display: "standalone",
    background_color: "#06152e",
    theme_color: "#06152e",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
