# Ahmad Hussain — Portfolio

Personal portfolio built with Next.js 16 (App Router), TypeScript, React 19 and Tailwind CSS 4. Fully static (`output: "export"`); deployed to GitHub Pages at https://ahmadhussain.dev, with Cloudflare for DNS and TLS.

## Editing content

All facts live in typed data files under `src/content/`. Components only render them.

| File | Contents |
| --- | --- |
| `site.ts` | Name, title, summary, links, CV path, availability, languages |
| `experience.ts` | Employment timeline |
| `projects.ts` | Project cards and detail pages (`/projects/[slug]`) |
| `skills.ts` | Skill groups and "Exploring" list |
| `education.ts` | Degrees and certifications |
| `engineering.ts` | Engineering approach cards and open-source repositories |

- **Store links**: fill `links.appStore` / `links.playStore` on a project; buttons render only when a URL is set.
- **New project**: add an entry to `projects.ts` with a unique `slug`. The detail page, sitemap entry and Open Graph image are generated automatically.
- **CV**: replace `public/resume/Ahmad-Hussain-CV.pdf`, or point `site.cvPath` at a different file.

## Environment variables

Copy `.env.example` to `.env.local` for local development. For deployment, set them as repository **variables** (Settings → Secrets and variables → Actions → Variables); `NEXT_PUBLIC_*` values end up in the browser bundle, so they are not secrets.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, Open Graph and sitemap. Defaults to `https://ahmadhussain.dev`. |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID. Without it, the contact form opens a prefilled email instead of submitting. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Google Search Console verification token; adds the `google-site-verification` meta tag. Not needed with DNS verification. |
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics token. Without it, no analytics script loads. |

## SEO

See [`docs/SEO.md`](docs/SEO.md) for the keyword map, where each search intent is covered, and the manual steps (Search Console, domain, LinkedIn).

## Development

Requires Node.js 22 (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build      # static site in out/
npx serve out      # preview the export locally
```

## Deployment (GitHub Pages)

`.github/workflows/deploy-pages.yml` lints, type-checks and builds the static export on every pull request, and deploys `out/` to GitHub Pages on every push to `main`.

1. Repository **Settings → Pages → Source**: GitHub Actions.
2. Repository variables: `NEXT_PUBLIC_SITE_URL=https://ahmadhussain.dev`, plus the optional ones above.
3. **Settings → Pages → Custom domain**: `ahmadhussain.dev`, then **Enforce HTTPS** once the certificate is issued. No `CNAME` file is needed with Actions deployments.

Notes for a static host:
- Images are served as they are (`images.unoptimized`), so add pre-sized WebP files instead of large PNGs.
- Share images are generated as real files at `/og/home.png` and `/og/<slug>.png` by `src/app/og/[file]/route.tsx`.
- Do not set `basePath`: the custom domain serves from the root.
