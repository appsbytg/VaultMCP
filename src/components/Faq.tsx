import { Accordion, type FaqItem } from '../shared/Accordion'
import { Section, SectionHeading } from '../ui'

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <Section id="faq" label="Questions">
      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <SectionHeading eyebrow="FAQ" title="Questions teams ask first." />
        <Accordion
          items={items}
          classes={{
            root: 'border-t border-zk-line',
            item: 'border-b border-zk-line',
            button: 'py-5 text-[16.5px] font-medium text-zk-fg hover:text-white',
            icon: 'text-zk-muted ring-1 ring-inset ring-zk-line2',
            answer: 'max-w-[40rem] pb-6 text-[15.5px] leading-relaxed text-zk-muted',
          }}
        />
      </div>
    </Section>
  )
}
