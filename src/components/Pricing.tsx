import { Button, Check, Section, SectionHeading } from '../ui'

const plans = [
  { name: 'Beta', price: 'Free', unit: 'for the whole beta', cta: 'Request beta access', featured: true,
    items: ['Unlimited tool calls', 'Hosted MCP servers', 'Policies, grants and audit log', 'Onboarding for your first three tools'] },
  { name: 'Team', price: 'Per tool call', unit: 'final pricing set with beta teams', cta: 'Get notified', featured: false,
    items: ['Idle servers cost almost nothing', 'SSO and roles for your team', 'Log export and SIEM streaming', 'EU and US regions'] },
]

export function Pricing() {
  return (
    <Section id="pricing" label="Pricing" className="border-t border-vm-line">
      <SectionHeading align="center" eyebrow="Pricing" title="Pay for the calls your agents make, not for seats." />
      <div className="mx-auto mt-14 grid max-w-[880px] gap-5 md:grid-cols-2">
        {plans.map((p) => (
          <div key={p.name} className={p.featured ? 'vm-noise relative flex flex-col overflow-hidden rounded-2xl bg-vm-green p-8 text-white shadow-[0_30px_60px_-30px_rgba(8,42,33,.7)]' : 'vm-card flex flex-col p-8'}>
            <div className="relative flex items-center justify-between">
              <h3 className="font-serif text-[24px]">{p.name}</h3>
              {p.featured && <span className="rounded-full bg-vm-brasslt px-2.5 py-0.5 text-[12px] font-semibold text-vm-deep">Open now</span>}
            </div>
            <p className="relative mt-6 font-serif text-[46px] leading-none">{p.price}</p>
            <p className={p.featured ? 'relative mt-2 text-[14px] text-white/60' : 'mt-2 text-[14px] text-vm-muted'}>{p.unit}</p>
            <ul className={p.featured ? 'relative mt-7 grid flex-1 gap-3 text-[15px] text-white/85' : 'mt-7 grid flex-1 gap-3 text-[15px] text-vm-ink'}>
              {p.items.map((it) => <li key={it} className="flex items-center gap-2.5"><Check className={p.featured ? 'text-vm-brasslt' : 'text-vm-green'} />{it}</li>)}
            </ul>
            <Button href="#beta" variant={p.featured ? 'brass' : 'ghost'} className="relative mt-8 w-full">{p.cta}</Button>
          </div>
        ))}
      </div>
    </Section>
  )
}
