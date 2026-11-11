import { Container } from '../shared/Container'
import { Marquee } from '../shared/Marquee'

export function ToolStrip({ items }: { items: string[] }) {
  return (
    <section aria-label="Tools you can connect" className="border-t border-zk-line">
      <Container className="grid items-center gap-6 py-10 md:grid-cols-[220px_1fr]">
        <p className="text-[14px] leading-snug text-zk-muted">Put a gate in front of the tools your agents already use</p>
        <Marquee items={items} fadeFrom="from-zk-bg" itemClassName="text-[17px] font-medium tracking-[-0.01em] text-zk-dim" />
      </Container>
    </section>
  )
}
