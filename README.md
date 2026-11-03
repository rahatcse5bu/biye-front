# বিবাহ (Bibaho) — Frontend

Live site: **https://www.bibaho.org**

Bibaho is a Bangladeshi matrimony platform open to every religion (Islam, Hinduism, Christianity). Brides, grooms and their guardians submit marriage biodatas, browse and filter other biodatas, and contact the guardian of a match they like. The interface is in Bengali.

This repository is the public website and user dashboard. It is a Next.js (App Router) app that talks to the separate `biye-backend` API. The admin panel lives in `biye-admin`.

## How the platform works

1. **Sign up / log in** with email and password or Google.
2. **Submit a biodata** through a step-by-step form: general info, address, education, family, personal, professional and marital info, expected partner, and a guardian consent pledge (ongikar nama). A biodata is published only after review and with a guardian's consent. Edits to a published biodata go back into review.
3. **Browse biodatas** at `/biodatas` and filter them by type (groom/bride), religion, age, height, location (division/district), occupation, education, marital status and more. A natural-language filter turns Bengali or English queries into the same filters.
4. **Unlock contact details** in two steps paid with points:
   - send a request (30 points), which the biodata owner approves;
   - then unlock the guardian's contact (70 points).
5. **Buy points** with bKash from `/points-package`. Refunds are handled under `/refund` and the refund policy.

Users also get likes/dislikes, a shortlist, reactions, reports, featured biodata requests, notifications and a purchase history in their dashboard.

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/biodatas` | Search and filter all biodatas |
| `/biodata/[id]` | Single biodata view |
| `/biodata-submit` | Create a biodata |
| `/points-package` | Point packages and pricing |
| `/pay`, `/pay/success`, `/pay/fail` | bKash payment flow |
| `/refund`, `/refund/success`, `/refund/fail` | Refund flow |
| `/user/account/dashboard` | User dashboard |
| `/user/account/edit-biodata` | Edit own biodata |
| `/user/account/bio-requests` | Contact requests sent and received |
| `/user/account/purchases` | Unlocked contacts |
| `/user/account/shortlist`, `likes`, `dislikes`, `reactions` | Saved and reacted biodatas |
| `/user/account/settings` | Password change, account deactivation and deletion |
| `/admin/refund` | Admin refund handling |
| `/blog`, `/blog/[slug]` | Blog (content served by the backend) |
| `/faq`, `/about-us`, `/contact-us` | Info pages |
| `/privacy-policy`, `/terms-and-condition`, `/refund-policy` | Legal pages |
| `/sitemap-v2.xml`, `/robots.txt`, `/llms.txt` | Generated SEO files |

## Tech stack

- **Next.js 15** (App Router) and **React 18**
- **Tailwind CSS**, Material Tailwind and MUI for UI
- **TanStack Query** and **axios** for data fetching
- **@react-oauth/google** for Google sign-in, JWT stored in cookies
- **Ably** for real-time notifications
- GA4, Meta Pixel and TikTok Pixel, each loaded only after cookie consent
- Deployed on **Vercel** (region `bom1`)

## Project structure

```
src/
  app/          Next.js routes, layouts, sitemap, robots, llms.txt
  views/        Page-level components used by the routes
  components/   Reusable UI (biodata forms, filters, header, modals, ...)
  services/     API calls to the backend, one file per resource
  contexts/     React contexts (user, biodata, filters, religion preference)
  hooks/        Custom hooks
  lib/          SEO helpers, blog fetching, sitemap, backend URL
  utils/        axios instance, cookies, analytics, formatting helpers
  constants/    Static content (FAQ, colors, sidebar data)
public/         Logos, OG image, location data (divisions, districts, upazilas, post codes)
tests/          Node test runner tests
```

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
cp .env.example .env    # then fill in the values below
npm run dev             # http://localhost:3000
```

In development the app expects the backend at `http://localhost:5000/api/v1` unless `BACKEND_API_URL` is set. Run `biye-backend` locally, or point `BACKEND_API_URL` at a deployed backend.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `node --test tests/` | Run the tests |

### Environment variables

| Variable | Description |
| --- | --- |
| `BACKEND_API_URL` | Backend API base URL. Server-only: the browser calls `/api/v1` and Next.js proxies it here. Defaults to `https://biye-backend.vercel.app/api/v1` in production. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for SEO, sitemap and links (`https://www.bibaho.org`). |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID for Google sign-in. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (optional). |
| `NEXT_PUBLIC_FB_PIXEL_ID` | Meta Pixel ID (optional). |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel ID (optional). |

`NEXT_PUBLIC_*` values are compiled into the browser bundle. Do not mark them as "Sensitive" in Vercel, or CI builds cannot read them.

## Deployment

Pushes to `main` deploy to production on Vercel through the GitHub Actions workflow in `.github/workflows/main.yml`. Pull requests get preview deployments. The workflow needs the `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` repository secrets.

Old domains (`bibaho.org`, `pncnikah.com`, `www.pncnikah.com`) redirect permanently to `https://www.bibaho.org`. Security headers (CSP, HSTS and others) are set in `next.config.mjs`.

## Support

Email: bibahosupport@gmail.com
