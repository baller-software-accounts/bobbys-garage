# Bobby's Garage — Marketing Site

Mobile-first marketing site for **Bobby's Garage & Mobile Service**, an independent, family-owned auto repair shop in Rockwall, TX.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server                 |
| `npm run lint`  | Run ESLint                           |
| `npm run build` | Production build (all pages static)  |
| `npm run start` | Serve the production build           |

## Project layout

```
src/
  app/
    layout.tsx        Root layout: fonts, header/footer, mobile call bar, AutoRepair JSON-LD
    page.tsx          Home
    services/         Services
    about/            About (Bobby & Christian)
    reviews/          Curated Google review quotes
    contact/          Contact + demo "Request service" form
    sitemap.ts, robots.ts, icon.svg
  components/         Header, Footer, MobileMenu, OpenStatus, ContactForm, icons, shared UI
  lib/
    business.ts       ← Single source of truth: name, phone, address, hours, reviews, links, SITE_URL
    services.ts       Service categories and typical work
    jsonld.ts         schema.org AutoRepair builder
public/images/        hero.jpg, shop-bay.jpg, mobile-service.jpg, engine-work.jpg
```

## Editing content

- **Business facts** (phone, hours, address, rating, review quotes): edit `src/lib/business.ts`. Every page, the footer and the JSON-LD read from it.
- **Services**: edit `src/lib/services.ts`.
- **Production domain**: set `SITE_URL` in `src/lib/business.ts` (currently a placeholder). It drives canonical URLs, Open Graph, the sitemap, robots.txt and the JSON-LD.

## Notes

- Client components are limited to the mobile menu/nav state, the open/closed status and hours highlight, and the contact form. Everything else renders on the server.
- Open/closed status is computed in the browser for `America/Chicago` using `useSyncExternalStore`. The server renders a neutral hint, so the client value never causes a hydration mismatch.
- The contact form is **client-side only (demo)**. It validates input and shows a success state but sends nothing. Hook it up to an email or CRM endpoint before launch.
- Only the four verbatim Google review quotes in `business.ts` should be used on the site.

## Deployment

- **Live:** https://bobbys-garage.vercel.app (Vercel team `greg152s-projects`, project `bobbys-garage`).
- **How it deploys today:** via the Vercel MCP `create_deployment`, which builds the exact public GitHub commit server-side — no personal Vercel token needed.
- **GitHub Actions** (`.github/workflows/vercel.yml`):
  - `Lint & build` runs on every push/PR (no secrets).
  - `Deploy to Vercel` runs only if `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets exist (org/project IDs are already set). Without a token it skips cleanly.
- **Alternative:** install the Vercel GitHub app on `baller-software-accounts` to get automatic preview/production deploys on every push (then don't also enable the Actions deploy job).
