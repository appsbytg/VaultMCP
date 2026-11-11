import type { Step } from '../types'
import { Section, SectionHeading } from '../ui'

function StepVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="flex flex-wrap gap-2 font-geist-mono text-[12px]">
        {['stripe', 'github', 'linear', '+ your own'].map((t) => (
          <span key={t} className="rounded-full bg-zk-line px-2.5 py-1 text-zk-muted">{t}</span>
        ))}
      </div>
    )
  if (i === 1)
    return (
      <div className="grid gap-1 rounded-lg border border-zk-line bg-zk-bg/60 p-3 font-geist-mono text-[12px]">
        <p><span className="text-zk-ok">allow</span> <span className="text-zk-sky">POST</span> <span className="text-zk-fg">/issues/*/comments</span></p>
        <p><span className="text-zk-bad">deny</span>{'  '}<span className="text-zk-sky">*</span> <span className="text-zk-fg">/refunds</span></p>
      </div>
    )
  return (
    <div className="relative rounded-lg border border-dashed border-zk-amber/50 p-3 font-geist-mono text-[12px] text-zk-muted">
      <span className="absolute -top-2.5 left-3 bg-zk-panel px-1.5 text-[11px] text-zk-amber">one endpoint</span>
      <span className="text-zk-fg">$VAULTMCP_URL</span> · role token only
    </div>
  )
}

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <Section id="how" label="How it works">
      <SectionHeading eyebrow="How it works" title="Set up once. Every call checked after that." lede="No changes to your agents’ code beyond the address they connect to." />
      <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        {steps.map((s, i) => (
          <li key={s.title} className="zk-card flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-geist-mono text-[13px] font-semibold text-zk-bg">{i + 1}</span>
              <span className="h-px flex-1 bg-gradient-to-r from-zk-line2 to-transparent" aria-hidden />
            </div>
            <h3 className="mt-6 text-[19px] font-medium tracking-[-0.01em] text-zk-fg">{s.title}</h3>
            <p className="mt-2 flex-1 text-[15px] leading-relaxed text-zk-muted">{s.body}</p>
            <div className="mt-6"><StepVisual i={i} /></div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
