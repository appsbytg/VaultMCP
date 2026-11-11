import { Container } from '../shared/Container'
import { Marquee } from '../shared/Marquee'

export function ToolStrip({ items }: { items: string[] }) {
  return (
    <section aria-label="Tools you can connect">
      <Container className="py-12">
        <p className="text-center text-[14px] text-vm-muted">Put a gate in front of the tools your agents already use</p>
        <Marquee items={items} className="mt-7" fadeFrom="from-vm-paper" itemClassName="font-serif text-[26px] text-vm-ink/45" />
      </Container>
    </section>
  )
}
