import { Container } from '../shared/Container'
import { SectionHeading } from '../ui'

function Node({ title, sub, accent = false }: { title: string; sub: string; accent?: boolean }) {
  return (
    <div className={`relative z-10 w-full rounded-2xl border px-5 py-5 text-center ${accent ? 'border-vm-brasslt/60 bg-vm-deep text-white shadow-[0_0_0_6px_rgba(231,199,126,.08)]' : 'border-white/15 bg-white/[.04] text-white'}`}>
      <p className={`font-serif text-[24px] leading-none ${accent ? 'text-vm-brasslt' : ''}`}>{title}</p>
      <p className="mt-2 text-[13px] text-white/55">{sub}</p>
    </div>
  )
}

function Link() {
  return (
    <svg aria-hidden className="h-10 w-full md:h-4" viewBox="0 0 100 4" preserveAspectRatio="none">
      <line x1="0" y1="2" x2="100" y2="2" stroke="rgba(231,199,126,.55)" strokeWidth="2" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" className="animate-flowx motion-reduce:animate-none" />
    </svg>
  )
}

/** Abstract path of a tool call. Deliberately shows *what* is checked, not how. */
export function GateFlow() {
  return (
    <section aria-label="How a call is checked" className="vm-noise relative overflow-hidden bg-vm-green text-white">
      <div aria-hidden className="vm-dots-dark absolute inset-0" />
      <Container className="relative py-24 md:py-32">
        <SectionHeading dark align="center" eyebrow="Every call, checked" title="One gate between your agents and everything they can touch." lede="Agents connect to a single endpoint. Each call is matched against your policy before it reaches a tool, and every decision is written down." />
        <div className="mx-auto mt-16 grid max-w-[980px] items-center gap-2 md:grid-cols-[1fr_80px_1.2fr_80px_1fr] md:gap-0">
          <Node title="Your agents" sub="any MCP client" />
          <div className="mx-auto w-px md:w-full"><Link /></div>
          <Node accent title="VaultMCP gate" sub="who · which tool · which action · until when" />
          <div className="mx-auto w-px md:w-full"><Link /></div>
          <Node title="Your tools" sub="hosted, with no keys inside" />
        </div>
        <div className="mx-auto mt-10 grid max-w-[760px] gap-3 text-[14px] sm:grid-cols-3">
          {[['Allowed', 'goes through, logged'], ['Denied', 'stops at the gate, logged'], ['Expired', 'access ends on its own']].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-center"><span className="font-medium text-white">{k}</span> <span className="text-white/55">{v}</span></div>
          ))}
        </div>
      </Container>
    </section>
  )
}
