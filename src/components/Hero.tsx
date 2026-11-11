import { Container } from '../shared/Container'
import type { Agent, Scenario } from '../types'
import { Button, Pill } from '../ui'
import { GateSimulator } from './GateSimulator'

const facts = [
  { value: '0', label: 'keys inside agent reach' },
  { value: '1', label: 'gate for every tool call' },
  { value: '100%', label: 'of calls written to the log' },
]

export function Hero({ agents, scenarios }: { agents: Agent[]; scenarios: Scenario[] }) {
  return (
    <section id="top" className="relative overflow-hidden" aria-labelledby="vm-h1">
      <div aria-hidden className="zk-grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_30%,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-280px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(77,107,255,.32),transparent)] blur-2xl" />

      <Container className="relative pb-16 pt-12 sm:pt-16 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-[1040px] text-center">
          <div className="animate-rise motion-reduce:animate-none">
            <Pill>
              <span className="shrink-0 whitespace-nowrap rounded-full bg-zk-amber px-2.5 py-0.5 text-[12px] font-semibold text-[#1A1200]">Private beta</span>
              Secure tool access for AI agents
            </Pill>
          </div>
          <h1 id="vm-h1" className="mt-7 animate-rise text-[clamp(2.4rem,7vw,5.4rem)] font-semibold leading-[0.98] tracking-tightest [animation-delay:80ms] motion-reduce:animate-none sm:mt-8">
            <span className="zk-gradient-text block">Your agents get the tools.</span>
            <span className="block text-zk-dim">Never the keys.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[40rem] animate-rise text-[16.5px] leading-relaxed text-zk-muted [animation-delay:160ms] motion-reduce:animate-none sm:mt-7 sm:text-[18px]">
            VaultMCP hosts your MCP tool servers and puts a gate in front of every call. Agents work in Stripe, GitHub, Linear and the rest without an API key ever reaching them, and you decide exactly which actions they may take.
          </p>
          <div className="mt-8 flex animate-rise flex-col items-stretch justify-center gap-3 [animation-delay:240ms] motion-reduce:animate-none sm:mt-9 sm:flex-row sm:items-center">
            <Button href="#beta" size="lg">Request beta access</Button>
            <Button href="#demo" size="lg" variant="ghost">Try the gate</Button>
          </div>
          <p className="mt-5 text-[13.5px] text-zk-dim">Works with any MCP client. Free during the beta.</p>
          <dl className="mx-auto mt-10 grid max-w-[720px] grid-cols-3 divide-x divide-zk-line rounded-2xl border border-zk-line bg-zk-panel/60 backdrop-blur sm:mt-12">
            {facts.map((f) => (
              <div key={f.label} className="px-2 py-4 sm:px-6 sm:py-5">
                <dt className="sr-only">{f.label}</dt>
                <dd className="text-[clamp(1.35rem,3.4vw,2rem)] font-semibold tabular-nums tracking-tightest text-zk-fg">{f.value}</dd>
                <dd className="mt-1 text-[12px] leading-snug text-zk-muted sm:text-[13.5px]">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="demo" data-section="gate-simulator" className="relative mx-auto mt-14 max-w-[1080px] scroll-mt-24 animate-rise [animation-delay:340ms] motion-reduce:animate-none md:mt-20">
          <div aria-hidden className="absolute -inset-x-10 -top-10 bottom-0 rounded-[40px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(77,107,255,.18),transparent)]" />
          <GateSimulator agents={agents} scenarios={scenarios} />
        </div>
      </Container>
    </section>
  )
}
