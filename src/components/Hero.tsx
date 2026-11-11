import { Container } from '../shared/Container'
import type { Agent, Scenario } from '../types'
import { Button } from '../ui'
import { GateSimulator } from './GateSimulator'

export function Hero({ agents, scenarios }: { agents: Agent[]; scenarios: Scenario[] }) {
  return (
    <section id="top" aria-labelledby="vm-h1" className="relative overflow-x-clip">
      <div aria-hidden className="vm-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_10%,#000,transparent_75%)]" />
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -left-56 top-10 hidden h-[560px] w-[560px] text-vm-line2/70 lg:block">
        <g fill="none" stroke="currentColor"><circle cx="200" cy="200" r="196" /><circle cx="200" cy="200" r="150" /><circle cx="200" cy="200" r="100" /></g>
      </svg>
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -right-56 top-0 hidden h-[560px] w-[560px] text-vm-line2/70 lg:block">
        <g fill="none" stroke="currentColor"><circle cx="200" cy="200" r="196" /><circle cx="200" cy="200" r="150" /><circle cx="200" cy="200" r="100" /></g>
      </svg>
      <Container className="relative pt-14 text-center md:pt-20">
        <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-vm-line bg-vm-card py-1 pl-1 pr-4 text-[13px] text-vm-muted shadow-sm motion-reduce:animate-none">
          <span className="shrink-0 whitespace-nowrap rounded-full bg-vm-green px-2.5 py-0.5 text-[12px] font-medium text-white">Private beta</span>
          Secure tool access for AI agents
        </p>
        <h1 id="vm-h1" className="mx-auto mt-8 max-w-[14ch] animate-rise font-serif text-[clamp(3rem,8.2vw,6.4rem)] leading-[0.95] tracking-[-0.02em] text-vm-ink [animation-delay:80ms] motion-reduce:animate-none">
          Your agents get the tools. <em className="text-vm-brass">Never the keys.</em>
        </h1>
        <p className="mx-auto mt-7 max-w-[42rem] animate-rise text-[18.5px] leading-relaxed text-vm-muted [animation-delay:160ms] motion-reduce:animate-none">
          VaultMCP hosts your MCP tool servers and puts a gate in front of every call. Agents can work in Stripe, GitHub, Linear and the rest without an API key ever reaching them, and you decide exactly which actions they may take.
        </p>
        <div className="mt-9 flex animate-rise flex-wrap justify-center gap-3 [animation-delay:240ms] motion-reduce:animate-none">
          <Button href="#beta" size="lg">Request beta access</Button>
          <Button href="#demo" size="lg" variant="ghost">Try the gate</Button>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-medium text-vm-ink/80">
          {['Works with any MCP client', 'Rules per action, not per service', 'Free during the beta'].map((x) => (
            <li key={x} className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-vm-brass" />{x}</li>
          ))}
        </ul>
      </Container>

      <div className="relative mt-14 md:mt-16">
        <div aria-hidden className="vm-noise absolute inset-x-0 bottom-0 top-[30%] overflow-hidden bg-vm-green">
          <div className="vm-dots-dark absolute inset-0" />
        </div>
        <Container className="relative pb-20 md:pb-24">
          <div id="demo" className="mx-auto max-w-[1120px] scroll-mt-24 animate-rise [animation-delay:340ms] motion-reduce:animate-none">
            <GateSimulator agents={agents} scenarios={scenarios} />
          </div>
        </Container>
      </div>
    </section>
  )
}
