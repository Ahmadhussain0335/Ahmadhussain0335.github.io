# SEO notes

Everything on the site is sourced from the CV (`AhmadHussainResumeEU.pdf`) and the GitHub profile README. Before adding a keyword, check it is backed by real experience — search engines and recruiters both penalise pages that read as keyword lists.

## Keyword map

Each search intent has one natural home on the site. Do not create separate pages per keyword.

| Search intent | Where it is covered | How it appears |
| --- | --- | --- |
| Ahmad Hussain (name searches) | `<title>`, H1, JSON-LD `Person`, every project page title | "Ahmad Hussain \| Senior Android & Mobile Engineer · Kotlin, Flutter" |
| Senior Mobile Engineer / Mobile Software Engineer | H1, About, JSON-LD `jobTitle` | H1: "Senior Mobile Engineer — Android (Kotlin) & Flutter" |
| Senior Android Engineer / Senior Android Developer | `<title>`, meta description, About first sentence | "senior Android and mobile engineer with more than nine years of Android application development in Kotlin and Java" |
| Android Kotlin Developer / Kotlin Developer | Hero summary, Skills, Connected Logger Gateway, MTronic | Kotlin, Jetpack Compose, Coroutines & Flow, Hilt |
| Flutter Developer / Senior Flutter Developer | H1, hero summary, NX NextHMI, Mia Vitals, Mafell ZAS | "cross-platform Flutter apps (5+ years)" |
| Jetpack Compose | About, Skills, Connected Logger Gateway, MTronic | |
| IoT Software Engineer / Connected Devices | About, "What I do" band, Connected Logger Gateway, MTronic | "connected devices that the apps discover, pair with and configure over Bluetooth Low Energy" |
| Automotive Software Engineer / Automotive Mobile Engineer | Experience (MRS), NX NextHMI, Connected Logger Gateway | CAN J1939, OBD-II, vehicle gateway |
| BLE / Bluetooth Low Energy Developer | Hero badges, About, Engineering approach, project pages | GATT, secure pairing, reconnection handling, OTA |
| MQTT Developer | Hero summary, Experience, Connected Logger Gateway, MTronic | "MQTT messaging between the devices and the Spoke Zone cloud server" |
| CAN / LIN | Connected Logger Gateway | LIN only as a bus the certified logger records — not claimed as app-level protocol work |
| Smart home | MTronic | |
| Healthcare / telemedicine | Mia Vitals, Experience (AI Nexus Healthcare) | |
| E-commerce / food delivery | FoodRunner, Experience (Eikon7) | |
| Remote Android / Mobile Engineer | Meta description, About (Location row), Contact intro | "Open to remote roles with international teams" — stated once per location |
| Android Developer Pakistan / Mobile Engineer Pakistan | Meta description, About, JSON-LD `address` | "Islamabad, Pakistan" |

### Intentionally not targeted

- **Android Automotive (AAOS)** — no Android Automotive OS work in the CV; the automotive work is BLE/CAN companion apps.
- **Europe / country names** — no relocation statement on the site (by choice). International reach comes from "remote roles with international teams".
- **AI Engineer / LLM / RAG** — AI appears only as daily AI-assisted development and current learning, matching the CV.

## Structured data (JSON-LD)

- Homepage: `WebSite`, `ProfilePage` and `Person` in one `@graph` (`src/lib/structured-data.tsx`).
- Project pages: `BreadcrumbList` (Home → project), `CreativeWork` for the case study, and a `Person` reference.
- Validate after deploy with the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).

## Manual steps after deploying

1. **Domain** — the primary host is `https://ahmadhussain.dev` (no `www`); `www` redirects to it. `NEXT_PUBLIC_SITE_URL` must match the primary host. The old `ahmadhussain-dev.vercel.app` address redirects with a 301.
2. **Google Search Console** — add a *Domain* property for `ahmadhussain.dev` and verify it with the DNS TXT record in Cloudflare (no code change needed).
3. **Sitemap** — in Search Console, submit `https://<your-domain>/sitemap.xml`, then use *URL Inspection → Request indexing* for the homepage.
4. **Bing Webmaster Tools** — import the site from Search Console (covers Bing, DuckDuckGo and Yahoo).
5. **Analytics (optional)** — Cloudflare Web Analytics (`NEXT_PUBLIC_CF_ANALYTICS_TOKEN`) is cookieless and needs no banner; Google Analytics requires a consent banner for EU visitors (GDPR/ePrivacy).
6. **LinkedIn** — add the portfolio URL to *Contact info* and the *Featured* section, and align the headline with the site: "Senior Mobile Engineer — Android (Kotlin) & Flutter | IoT · Automotive · BLE · MQTT".
7. **GitHub** — add the portfolio URL to the profile website field, and update the profile README so its claims match the site and CV (it still mentions HIPAA compliance, 25+ apps and a phone number).
8. **Backlinks** — link the portfolio from your CV PDF, email signature and any conference or community profiles.

## Performance baseline (Lighthouse, local production build)

| Page | Mobile perf | Desktop perf | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- | --- |
| Home | 90 | 100 | 100 | 100 | 100 |
| Project page | 95 | 100 | 100 | 100 | 100 |

Re-run after major changes: `npx lighthouse https://<your-domain> --view`.
