import { Button, Check, Section, SectionHeading } from '../ui'

const plans = [
  { name: 'Beta', price: '$0', unit: 'during the beta', cta: 'Request beta access', featured: true,
    items: ['Unlimited tool calls', 'Hosted MCP servers', 'Policies, grants and audit log', 'Onboarding for your first three tools'] },
  { name: 'Team', price: 'Per call', unit: 'set with beta teams', cta: 'Get notified', featured: false,
    items: ['Idle servers cost almost nothing', 'SSO and roles for your team', 'Log export and SIEM streaming', 'EU and US regions'] },
]

export function Pricing() {
  return (
    <Section id="pricing" label="Pricing">
      <SectionHeading align="center" eyebrow="Pricing" title="Pay for the calls agents make. Never per seat." lede="Idle tool servers sleep, so you only pay when your agents are working." />
      <div className="mx-auto mt-14 grid max-w-[860px] gap-5 md:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className={p.featured ? 'rounded-2xl bg-gradient-to-b from-zk-cobalt/70 via-zk-line2 to-zk-line p-px' : 'rounded-2xl bg-zk-line p-px'}>
            <div className="flex h-full flex-col rounded-[15px] bg-zk-panel p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-medium text-zk-fg">{p.name}</h3>
                {p.featured && <span className="rounded-full bg-zk-amber/10 px-2.5 py-0.5 text-[12px] text-zk-amber ring-1 ring-inset ring-zk-amber/25">Open now</span>}
              </div>
              <p className="mt-6 text-[40px] font-semibold leading-none tracking-tightest text-zk-fg">{p.price}</p>
              <p className="mt-2 text-[13.5px] text-zk-dim">{p.unit}</p>
              <ul className="mt-7 grid flex-1 gap-3 text-[14.5px] text-zk-muted">
                {p.items.map((it) => <li key={it} className="flex items-center gap-2.5"><Check className="shrink-0 text-zk-ok" />{it}</li>)}
              </ul>
              <Button href="#beta" variant={p.featured ? 'primary' : 'ghost'} className="mt-8 w-full">{p.cta}</Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
