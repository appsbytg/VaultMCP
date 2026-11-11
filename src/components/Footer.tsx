import { Container } from '../shared/Container'
import { Logo } from './Logo'
import type { FooterContent } from '../types'

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="relative overflow-hidden border-t border-zk-line">
      <Container className="grid gap-12 pb-10 pt-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[18rem] text-[14px] leading-relaxed text-zk-dim">{content.tagline}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-zk-line px-3 py-1.5 text-[12.5px] text-zk-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-zk-amber" /> Private beta · onboarding now
          </p>
        </div>
        {content.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-[13px] font-medium text-zk-fg">{c.title}</p>
            <ul className="mt-4 grid gap-2.5 text-[14px] text-zk-dim">
              {c.links.map(([l, h]) => <li key={l}><a href={h} className="transition hover:text-zk-fg">{l}</a></li>)}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-wrap justify-between gap-3 border-t border-zk-line py-6 text-[12.5px] text-zk-dim">
        <span>© 2026 VaultMCP</span>
        <span>Every call checked. Every decision written down.</span>
      </Container>
      <Container aria-hidden className="pointer-events-none select-none">
        <p className="-mb-[0.22em] text-center text-[clamp(4rem,19vw,15rem)] font-semibold leading-none tracking-tightest text-white/[.035]">VaultMCP</p>
      </Container>
    </footer>
  )
}
