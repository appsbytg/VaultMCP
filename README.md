# VaultMCP landing page

A standalone React 18 + TypeScript + Tailwind CSS 3 site, built with Vite 5. It is served at `/`.

## Run

    npm install
    npm run dev           # http://localhost:5173/
    npm run typecheck     # strict TypeScript, no emit
    npm run build         # static site in dist/ (index.html + assets/)
    npm run build:single  # one self-contained dist-single/index.html

`index.html` is only Vite's entry shell: a `<div id="root">` and a script tag that loads `src/main.tsx`. Every part of the page is a React component.

## Structure

    src/App.tsx
    src/components/Compare.tsx
    src/components/Delivery.tsx
    src/components/Exposure.tsx
    src/components/Faq.tsx
    src/components/FinalCta.tsx
    src/components/Footer.tsx
    src/components/GateLog.tsx
    src/components/GateSimulator.tsx
    src/components/Hero.tsx
    src/components/HowItWorks.tsx
    src/components/Logo.tsx
    src/components/Nav.tsx
    src/components/Outcomes.tsx
    src/components/Policies.tsx
    src/components/ToolStrip.tsx
    src/content.ts
    src/gate.ts
    src/index.css
    src/main.tsx
    src/shared/Accordion.tsx
    src/shared/BetaForm.tsx
    src/shared/Container.tsx
    src/shared/Marquee.tsx
    src/shared/analytics.ts
    src/shared/apiStatus.ts
    src/shared/betaSignup.ts
    src/shared/cx.ts
    src/shared/hooks.ts
    src/shared/posthog.ts
    src/shared/siteConfig.ts
    src/types.ts
    src/ui.tsx
    src/vite-env.d.ts

- `content.ts`: all copy and demo data, typed by `types.ts`. Edit wording here.
- `ui.tsx`: site-level primitives (Button, Section, SectionHeading and more).
- `components/`: one file per page section, put together in order in `App.tsx`.
- `shared/`: Container, Marquee, Accordion, BetaForm, signup logic and hooks.
- Design tokens (colours, fonts, animations) live in `tailwind.config.ts`.

## Configure: API, PostHog, Pages path

Everything you need to change is in the `SITE` block at the top of `vite.config.ts`:

| Setting | What it is |
|---|---|
| `appName` | `'vaultmcp'`. How this site appears in landing-backend and PostHog. Don't change it once live. |
| `apiUrl` | Your landing-backend URL, e.g. `https://api.your-domain.com`. |
| `posthogKey` | PostHog project key (`phc_…`). Empty = PostHog off. |
| `posthogHost` | `https://us.i.posthog.com`, `https://eu.i.posthog.com` or self-hosted. |
| `posthogRecordSessions` | Session replays on or off (inputs are masked). |
| `PAGES_BASE` | GitHub Pages path; must match the repo name exactly. |

In CI you can override `apiUrl` and the PostHog values with `VITE_API_URL`, `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` (see `.env.example`) instead of editing the file.

**Tracking** (`src/shared/analytics.ts`) records the visit's source (UTM, click ids, referrer), active time, sections viewed and time in each, scroll depth, clicks, demo use and the signup funnel. It sends batches to the backend and mirrors key events to PostHog.

**Signup availability:** the page checks `apiUrl/health` on load. If the API doesn't answer (or `apiUrl` is still the placeholder), the form shows "Signups are paused for a moment" with a Try again button, and re-checks every 30 seconds. Inside a claude.ai Artifact it falls back to the Artifact's own store instead.

## How it's delivered

The "How you'll use it" section (`components/Delivery.tsx`, content in `delivery` in `content.ts`) shows the one way customers use the product: a hosted service on our servers. It covers what runs on their side and on ours, what they get, the setup steps and a copyable snippet. Interest is tracked: time on the section, snippet copies and "get early access" clicks. Compare it across sites with:

    GET /v1/admin/apps/vaultmcp/summary  ->  setup.viewedSessions / copiedSessions / requestedSessions

## Deploy

GitHub Pages: `vite.config.ts` sets `base: '/VaultMCP/'` for normal builds, so the site works at `https://<user>.github.io/VaultMCP/`. If your repository has a different name, change that value to `/<repo-name>/`. Then `npm ci && npm run build` and publish the `dist/` folder.

Other static hosts (Vercel, Netlify, Cloudflare Pages) serve from the root: set `base` to `'/'` there.

Only files reachable from `src/main.tsx` are type-checked (`files` in `tsconfig.json`), so a leftover component that nothing imports won't fail the build. Delete it anyway to keep the repo tidy.

## Before launch

Agent names, gate-log events, counts and the stopped-calls list in `content.ts` are example data, and the page labels them that way. The comparison table describes typical setups, not specific products. Review both before you publish.
