# Creative Core — website

Next.js (App Router, TypeScript) build of the Creative Core marketing site, sourced from the
Claude Design project "Creative Core visual identity system" (Design System doc + PRD docx) and
scoped to three pages: **Home**, **Services**, **Start a Project**. About / Insights / Privacy /
Terms / 404 were drafts in the design project and are intentionally not built yet — nothing here
blocks adding them later.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you have. Everything is optional for local
development — without `RESEND_API_KEY`/`INQUIRY_TO_EMAIL`, submissions on **Start a Project** are
logged to the server console instead of emailed, so the full form flow is still testable.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` | Delivers Start a Project inquiries via [Resend](https://resend.com). |
| `WHATSAPP_API_TOKEN`, `WHATSAPP_NOTIFY_NUMBER` | Optional internal WhatsApp notification on new inquiries. Leave unset to skip entirely. |

## Project structure

- `app/page.tsx`, `app/services/page.tsx`, `app/start-a-project/page.tsx` — the three pages.
- `app/api/inquiry/route.ts` — the Start a Project backend: zod validation, honeypot + best-effort
  in-memory rate limiting, email delivery, optional WhatsApp notification.
- `components/` — shared UI: `CoreMark`/`CoreBackdrop`/`CoreDefs` (the vector "Core" mark and its
  chrome gradients), `Button`, `MagneticButton`, `Reveal` (scroll-in animation), `Nav`, `Footer`,
  `InkBoneWipe` (the ink↔bone environment transition), `SceneDivider`, and
  `sequence/CreateBuildGrowSequence` (the pinned CREATE→BUILD→GROW cinematic scroll sequence).
- `lib/content.ts` — copy and structured content transcribed from the design prototypes, shared
  between Home and Services so discipline copy isn't duplicated.
- `lib/inquiry.ts` — the inquiry zod schema + option lists + email template, shared by the form and
  the API route.
- `lib/motion.ts` — GSAP/ScrollTrigger setup and a `useReducedMotion` hook honoring
  `prefers-reduced-motion` throughout.
- `styles/tokens.css` — design tokens (color, type, spacing, motion durations/easings) lifted from
  the Design System doc.

## Dev server: webpack, not Turbopack

`npm run dev` runs `next dev --webpack`, not the Turbopack dev server Next 16 defaults to. Turbopack's
dev mode here has a reproducible bug: any client-side navigation (clicking a `<Link>`, e.g. the nav's
"Start a Project" button) throws `Uncaught NotFoundError: Failed to execute 'removeChild' on 'Node'`
and the page breaks, on every page, regardless of which components are mounted. Confirmed via:
`next dev` (Turbopack) → crashes every time · `next dev --webpack` → clean · `next build && next start`
(production, Turbopack) → clean. So this is a Turbopack **dev-server** issue in this Next.js version,
not a bug in this app's code and not something that affects the deployed production build — it only
matters for local development. Safe to remove `--webpack` and re-test next time Next.js is upgraded.

## Known gaps / decisions still needed

Carried over from the PRD's own "decisions required before production" list — none of these block
running or previewing the site, only going live:

- **Logo**: the two chrome logo PNGs in the design project are 2400×2400px and exceeded the
  design-sync tool's read cap, so the site currently uses the flat vector Core mark everywhere
  (which is also what the design system specifies below 96px). Swap in the real PNG via
  `public/` once it's exported, and use it in `components/CoreDefs.tsx` consumers where a raster
  mark is wanted at large sizes.
- **Business inbox email, WhatsApp approach, domain, legal business name, analytics provider**:
  all implemented behind the env vars above; nothing is hardcoded or invented.
- Footer contact/social details are intentionally left as `[ ... — tbc ]` placeholders — the PRD
  explicitly prohibits publishing unverified contact info.
- The in-memory rate limiter in `lib/rate-limit.ts` is a V1 shortcut (resets on cold start, not
  shared across serverless instances). Documented upgrade path to Upstash Redis is in that file.

## Deploying

Built for Vercel. Connect the repo, set the environment variables above in the Vercel project
settings (Preview vs Production as needed), and deploy — no other configuration required.
