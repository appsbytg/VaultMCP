import { Accordion, type FaqItem } from '../shared/Accordion'
import { Section, SectionHeading } from '../ui'

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <Section id="faq" label="Questions" className="border-t border-vm-line">
      <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <SectionHeading eyebrow="FAQ" title="Questions teams ask first." />
        <Accordion
          items={items}
          classes={{
            root: 'border-t border-vm-line2',
            item: 'border-b border-vm-line2',
            button: 'py-5 text-[17px] font-medium text-vm-ink',
            icon: 'bg-vm-card text-vm-green ring-1 ring-inset ring-vm-line2',
            answer: 'max-w-[40rem] pb-6 text-[15.5px] leading-relaxed text-vm-muted',
          }}
        />
      </div>
    </Section>
  )
}
