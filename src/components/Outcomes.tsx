import type { Outcome } from '../types'
import { Section, SectionHeading } from '../ui'

const marks = ['i', 'ii', 'iii', 'iv']

/** "What you get": four concrete results, each with a line of evidence. */
export function Outcomes({ items }: { items: Outcome[] }) {
  return (
    <Section id="get" label="What you get" className="border-t border-vm-line">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
        <SectionHeading eyebrow="What you get" title="Agents that can act on real systems, safely." />
        <p className="max-w-[32rem] text-[17px] leading-relaxed text-vm-muted md:pb-2">
          Today, giving an agent a tool means giving it a key. VaultMCP separates the two, so you can say yes to agents without handing out credentials.
        </p>
      </div>
      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {items.map((o, i) => (
          <li key={o.title} className="vm-card relative flex flex-col overflow-hidden p-7 md:p-9">
            <span aria-hidden className="absolute right-7 top-6 font-serif text-[44px] leading-none text-vm-brass/30">{marks[i]}</span>
            <h3 className="max-w-[20ch] font-serif text-[28px] leading-[1.1] text-vm-ink">{o.title}</h3>
            <p className="mt-3 flex-1 text-[15.5px] leading-relaxed text-vm-muted">{o.body}</p>
            <p className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-vm-sunk px-3 py-2 font-jet text-[12.5px] text-vm-ink">
              <span className="h-2 w-2 rounded-full bg-vm-brass" aria-hidden />{o.proof}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
