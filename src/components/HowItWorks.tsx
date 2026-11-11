import type { Step } from '../types'
import { Section, SectionHeading } from '../ui'

/** Three steps on one brass rail. */
export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <Section id="how" label="How it works" className="border-t border-vm-line bg-vm-sunk/60">
      <SectionHeading align="center" eyebrow="How it works" title="Set up once. Every call checked after that." lede="No changes to your agents’ code beyond the address they connect to." />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        <span aria-hidden className="absolute left-[24px] top-6 hidden h-[3px] rounded-full bg-gradient-to-r from-vm-brass via-vm-green to-vm-allow md:block" style={{ width: 'calc(100% - 48px)' }} />
        <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-[3px] rounded-full bg-gradient-to-b from-vm-brass via-vm-green to-vm-allow md:hidden" />
        {steps.map((s, i) => (
          <li key={s.title} className="relative pl-16 md:pl-0">
            <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border-[3px] border-vm-brass bg-vm-paper font-serif text-[22px] text-vm-ink md:relative">{i + 1}</span>
            <h3 className="font-serif text-[27px] leading-tight text-vm-ink md:mt-6">{s.title}</h3>
            <p className="mt-2 max-w-[22rem] text-[15.5px] leading-relaxed text-vm-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
