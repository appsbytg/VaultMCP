import { Container } from '../shared/Container'
import { Logo } from './Logo'
import type { FooterContent } from '../types'

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="overflow-hidden bg-vm-paper">
      <Container className="grid gap-12 pb-10 pt-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-[18rem] text-[14px] leading-relaxed text-vm-muted">{content.tagline}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-vm-line bg-vm-card px-3 py-1.5 text-[12.5px] text-vm-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-vm-brass" /> Private beta · onboarding now
          </p>
        </div>
        {content.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-[13px] font-semibold text-vm-ink">{c.title}</p>
            <ul className="mt-4 grid gap-2.5 text-[14px] text-vm-muted">
              {c.links.map(([l, h]) => <li key={l}><a href={h} className="transition hover:text-vm-ink">{l}</a></li>)}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-wrap justify-between gap-3 border-t border-vm-line py-6 text-[12.5px] text-vm-muted">
        <span>© 2026 VaultMCP</span>
        <span>Every call checked. Every decision written down.</span>
      </Container>
      <Container aria-hidden className="pointer-events-none select-none">
        <p className="-mb-[0.18em] text-center font-serif text-[clamp(4.5rem,22vw,17rem)] leading-none text-vm-ink/[.05]">VaultMCP</p>
      </Container>
    </footer>
  )
}
