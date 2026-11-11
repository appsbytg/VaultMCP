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
    src/components/CodeSnippet.tsx
    src/components/Compare.tsx
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
    src/components/Pricing.tsx
    src/components/ToolStrip.tsx
    src/content.ts
    src/gate.ts
    src/index.css
    src/main.tsx
    src/shared/Accordion.tsx
    src/shared/BetaForm.tsx
    src/shared/Container.tsx
    src/shared/Marquee.tsx
    src/shared/betaSignup.ts
    src/shared/cx.ts
    src/shared/hooks.ts
    src/types.ts
    src/ui.tsx
    src/vite-env.d.ts

- `content.ts`: all copy and demo data, typed by `types.ts`. Edit wording here.
- `ui.tsx`: site-level primitives (Button, Section, SectionHeading and more).
- `components/`: one file per page section, put together in order in `App.tsx`.
- `shared/`: Container, Marquee, Accordion, BetaForm, signup logic and hooks.
- Design tokens (colours, fonts, animations) live in `tailwind.config.ts`.

## Beta signups

Copy `.env.example` to `.env` and set `VITE_BETA_ENDPOINT` to any URL that accepts a JSON POST (Formspree, a Supabase function or your own API).
Without it, the form saves to the claude.ai Artifact store when it runs as an artifact. Anywhere else it tells the visitor nothing was sent.

## Deploy

`npm run build`, then upload `dist/` to Vercel, Netlify, Cloudflare Pages or any static host.

## Before launch

Agent names, gate-log events, counts and the stopped-calls list in `content.ts` are example data, and the page labels them that way. The comparison table describes typical setups, not specific products. Review both before you publish.
