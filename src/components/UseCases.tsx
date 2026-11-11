import { useState } from 'react'
import { cx } from '../shared/cx'
import { Check, Cross, Section, SectionHeading } from '../ui'
import type { UseCase } from '../types'

export function UseCases({ cases }: { cases: UseCase[] }) {
  const [active, setActive] = useState(cases[0]?.id ?? '')
  const c = cases.find((x) => x.id === active) ?? cases[0]
  if (!c) return null
  return (
    <Section id="use-cases" label="Use cases" className="border-t border-vm-line bg-vm-sunk/60">
      <SectionHeading align="center" eyebrow="Use cases" title="Each agent sees its own, smaller world." />
      <div role="tablist" aria-label="Example agents" className="mx-auto mt-12 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-full border border-vm-line bg-vm-card p-1.5">
        {cases.map((x) => (
          <button key={x.id} role="tab" type="button" aria-selected={active === x.id} onClick={() => setActive(x.id)}
            className={cx('rounded-full px-4 py-2 text-[14px] font-medium transition', active === x.id ? 'bg-vm-green text-white' : 'text-vm-muted hover:text-vm-ink')}>
            {x.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={c.label} className="vm-card mx-auto mt-8 max-w-[920px] overflow-hidden">
        <p className="border-b border-vm-line px-7 py-5 font-serif text-[24px] leading-snug text-vm-ink">{c.summary}</p>
        <div className="grid md:grid-cols-2">
          {([['Can', c.allow, true], ['Can’t', c.deny, false]] as const).map(([h, list, ok], i) => (
            <div key={h} className={cx('p-7', i === 1 && 'border-t border-vm-line md:border-l md:border-t-0')}>
              <p className={cx('text-[13px] font-semibold', ok ? 'text-vm-allow' : 'text-vm-deny')}>{h}</p>
              <ul className="mt-4 grid gap-3 text-[15.5px] text-vm-ink">
                {list.map((it) => (
                  <li key={it} className="flex items-center gap-3">
                    <span className={cx('grid h-6 w-6 shrink-0 place-items-center rounded-full', ok ? 'bg-vm-allow/10 text-vm-allow' : 'bg-vm-deny/10 text-vm-deny')}>{ok ? <Check className="h-3.5 w-3.5" /> : <Cross className="h-3.5 w-3.5" />}</span>{it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
