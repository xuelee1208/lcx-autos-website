# LCX AUTOS Website — Next.js v0.4

Phase C production architecture for the LCX AUTOS website.

## Stack
- Next.js 16.2.11
- React 19
- TypeScript
- Tailwind CSS 4.3
- App Router
- JSON content layer
- Static export (`output: "export"`)

## Routes
- `/en/` and `/zh/`
- `/[lang]/solutions/`
- `/[lang]/projects/`
- `/[lang]/projects/[slug]/`
- `/[lang]/research/`
- `/[lang]/research/[slug]/`
- `/[lang]/insights/`
- `/[lang]/insights/[slug]/`
- `/[lang]/about/`

The root `/` renders the English home page. The production canonical URL can be set to `/en/` after domain registration.

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run typecheck
npm run build
```

Static output is generated in `out/` and can be hosted on Vercel or any static web server.

## Content updates
Public content lives in `content/`. The website imports JSON directly during the build. To add a project:

1. Add a validated record to `content/projects.json`.
2. Copy media to `public/media/images/` or `public/media/video/`.
3. Add related research and insight slugs.
4. Run the type check and production build.
5. Review English and Chinese routes.

## Publishing notes
- Replace the domain in metadata and sitemap after domain registration.
- Confirm Apollo version naming before publishing detailed product-tier comparisons.
- Internal claim-review and source files are intentionally excluded from this project.
- Public pages do not expose editorial review labels or disclosure classifications.
