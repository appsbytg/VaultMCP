import { BetaForm } from '../shared/BetaForm'
import { Container } from '../shared/Container'
import { Check } from '../ui'

export function FinalCta() {
  return (
    <section id="beta" aria-labelledby="vm-beta" className="relative overflow-hidden border-t border-zk-line">
      <div aria-hidden className="zk-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_30%_50%,#000,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(77,107,255,.28),transparent)] blur-2xl" />
      <Container className="relative grid gap-12 py-20 md:py-32 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="mb-4 font-geist-mono text-[13px] text-zk-amber">Private beta</p>
          <h2 id="vm-beta" className="zk-gradient-text text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-tightest">Give your agents tools, not keys.</h2>
          <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed text-zk-muted">We’re opening VaultMCP to a small group of teams running agents against real APIs. Beta teams help shape the product and keep founding-team terms.</p>
          <ul className="mt-8 grid gap-3 text-[15px] text-zk-muted">
            {['Hands-on onboarding for your first three tools', 'Free usage for the whole beta', 'A direct line to the engineers building it'].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><Check className="shrink-0 text-zk-ok" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-gradient-to-b from-zk-line2 to-zk-line p-px">
          <BetaForm
            product="VaultMCP"
            fields={[
              { id: 'company', label: 'Company', type: 'text', placeholder: 'Acme Inc.', autoComplete: 'organization' },
              { id: 'tools', label: 'Tool servers today', type: 'select', options: ['None yet', '1–5', '6–20', '20+'] },
              { id: 'stage', label: 'Where are your agents?', type: 'select', options: ['Exploring', 'Internal pilots', 'In production'] },
              { id: 'client', label: 'Agent framework', type: 'select', options: ['Claude / MCP clients', 'Cursor', 'LangGraph', 'OpenAI Agents SDK', 'Our own', 'Other'] },
            ]}
            footnote="We’ll only use your email to contact you about the beta."
            classes={{
              form: 'relative grid gap-4 rounded-[15px] bg-zk-panel p-5 sm:p-8',
              grid: 'grid gap-4 sm:grid-cols-2',
              label: 'grid gap-2 text-[13.5px] font-medium text-zk-muted',
              input: 'h-12 w-full rounded-lg border border-zk-line2 bg-zk-bg px-3.5 text-[16px] font-normal text-zk-fg placeholder:text-zk-dim focus:border-zk-cobalt focus:outline-none focus:ring-4 focus:ring-zk-cobalt/20 disabled:opacity-60 sm:h-11 sm:text-[15px]',
              button: 'mt-2 h-12 rounded-full bg-white text-[15px] font-medium text-zk-bg transition hover:bg-[#E6E9F2] disabled:opacity-70',
              ok: 'rounded-lg bg-zk-ok/10 px-3.5 py-3 text-[14px] text-zk-ok',
              error: 'rounded-lg bg-zk-bad/10 px-3.5 py-3 text-[14px] text-zk-bad',
              footnote: 'text-[12.5px] text-zk-dim',
              notice: 'mt-2 rounded-xl border border-zk-amber/30 bg-zk-amber/[.07] p-4 text-[14px] leading-relaxed text-zk-fg',
              noticeButton: 'mt-3 h-10 rounded-full bg-white px-4 text-[14px] font-medium text-zk-bg transition hover:bg-[#E6E9F2] disabled:opacity-60',
            }}
          />
        </div>
      </Container>
    </section>
  )
}
