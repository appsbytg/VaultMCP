import type { Outcome } from '../types'
import { Section, SectionHeading } from '../ui'

const icons = [
  'M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5zM12 15v2',
  'M4 6h16M4 12h10M4 18h6M17 15l2 2 3-4',
  'M5 4h14v16H5zM9 8h6M9 12h6M9 16h3',
  'M4 7h16v4H4zM4 13h16v4H4zM8 9h.01M8 15h.01',
]

/** "What you get": four concrete results, each with a line of evidence. */
export function Outcomes({ items }: { items: Outcome[] }) {
  return (
    <Section id="get" label="What you get">
      <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-end md:gap-12">
        <SectionHeading eyebrow="What you get" title="Agents that act on real systems, safely." />
        <p className="max-w-[34rem] text-[16.5px] leading-relaxed text-zk-muted md:pb-2">
          Today, giving an agent a tool means giving it a key. VaultMCP separates the two, so you can say yes to agents without handing out credentials.
        </p>
      </div>
      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-zk-line bg-zk-line md:mt-14 md:grid-cols-2">
        {items.map((o, i) => (
          <li key={o.title} className="flex flex-col bg-zk-panel p-6 md:p-9">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-zk-cobalt/10 text-zk-sky ring-1 ring-inset ring-zk-cobalt/25">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={icons[i]} /></svg>
            </span>
            <h3 className="mt-6 text-[20px] font-medium leading-snug tracking-[-0.015em] text-zk-fg md:text-[21px]">{o.title}</h3>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-zk-muted md:text-[15.5px]">{o.body}</p>
            <p className="mt-6 inline-flex w-fit max-w-full items-center gap-2 rounded-lg bg-zk-bg/70 px-3 py-2 font-geist-mono text-[12px] text-zk-ok ring-1 ring-inset ring-zk-line md:text-[12.5px]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zk-ok" aria-hidden /><span className="truncate">{o.proof}</span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
