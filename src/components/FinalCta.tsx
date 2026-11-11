import { BetaForm } from '../shared/BetaForm'
import { Container } from '../shared/Container'
import { Check } from '../ui'

export function FinalCta() {
  return (
    <section id="beta" aria-labelledby="vm-beta" className="vm-noise relative overflow-hidden bg-vm-deep text-white">
      <div aria-hidden className="vm-dots-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_80%_at_20%_40%,#000,transparent)]" />
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -right-48 -top-40 h-[640px] w-[640px] text-white/[.06]">
        <g fill="none" stroke="currentColor"><circle cx="200" cy="200" r="196" /><circle cx="200" cy="200" r="150" /><circle cx="200" cy="200" r="100" /><circle cx="200" cy="200" r="40" /></g>
      </svg>
      <Container className="relative grid gap-14 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 text-[14px] font-medium text-vm-brasslt"><span className="h-px w-6 bg-vm-brasslt" />Private beta</p>
          <h2 id="vm-beta" className="font-serif text-[clamp(2.5rem,5.6vw,4.4rem)] leading-[1] tracking-[-0.015em]">Put your agents’ keys <em className="text-vm-brasslt">somewhere safer.</em></h2>
          <p className="mt-6 max-w-[30rem] text-[17.5px] leading-relaxed text-white/65">We’re opening VaultMCP to a small group of teams running agents against real APIs. Beta teams help shape the product and keep founding-team pricing.</p>
          <ul className="mt-8 grid gap-3 text-[15.5px] text-white/75">
            {['Hands-on onboarding for your first three tools', 'A direct line to the engineers building it', 'Free usage for the whole beta'].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="grid h-5 w-5 place-items-center rounded-full bg-vm-brasslt text-vm-deep"><Check className="h-3 w-3" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <BetaForm
          product="VaultMCP"
          fields={[
            { id: 'company', label: 'Company', type: 'text', placeholder: 'Acme Inc.', autoComplete: 'organization' },
            { id: 'tools', label: 'Tool servers today', type: 'select', options: ['None yet', '1–5', '6–20', '20+'] },
            { id: 'stage', label: 'Where are your agents?', type: 'select', options: ['Exploring', 'Internal pilots', 'In production'] },
            { id: 'client', label: 'Agent framework', type: 'select', options: ['Claude / MCP clients', 'LangGraph', 'OpenAI Agents SDK', 'Our own', 'Other'] },
          ]}
          footnote="We’ll only use your email to contact you about the beta."
          classes={{
            form: 'vm-card grid gap-4 self-start p-6 text-vm-ink sm:p-8',
            grid: 'grid gap-4 sm:grid-cols-2',
            label: 'grid gap-2 text-[13.5px] font-medium text-vm-ink',
            input: 'h-11 w-full rounded-lg border border-vm-line2 bg-vm-paper px-3.5 text-[15px] font-normal text-vm-ink placeholder:text-vm-muted/70 focus:border-vm-green focus:outline-none focus:ring-4 focus:ring-vm-green/15 disabled:opacity-60',
            button: 'mt-2 h-12 rounded-full bg-vm-green text-[15px] font-medium text-white transition hover:bg-vm-deep disabled:opacity-70',
            ok: 'rounded-lg bg-vm-allow/10 px-3.5 py-3 text-[14px] text-vm-allow',
            error: 'rounded-lg bg-vm-deny/10 px-3.5 py-3 text-[14px] text-vm-deny',
            footnote: 'text-[12.5px] text-vm-muted',
          }}
        />
      </Container>
    </section>
  )
}
