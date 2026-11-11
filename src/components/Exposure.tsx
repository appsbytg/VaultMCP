import { useEffect, useState } from 'react'
import { trackDemo } from '../shared/analytics'
import { Section, SectionHeading, Slider } from '../ui'

/** Counts how many secrets agents can reach today, next to the same setup on VaultMCP. */
export function Exposure() {
  const [servers, setServers] = useState(8)
  const [keys, setKeys] = useState(2)
  const [agents, setAgents] = useState(5)
  const [moved, setMoved] = useState(false)
  const readable = servers * keys
  const paths = readable * agents
  useEffect(() => { if (moved) trackDemo('exposure_check', { servers, keysPerServer: keys, agents, exposedKeys: readable }, 1200) }, [moved, servers, keys, agents, readable])
  const on = (f: (n: number) => void) => (n: number) => { setMoved(true); f(n) }

  return (
    <Section id="exposure" label="Exposure check">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="Exposure check" title="How many keys can your agents reach today?" lede="Set your current numbers. Every secret loaded into a tool server is one an agent can be talked into revealing." />
          <div className="zk-card mt-8 overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-zk-line px-4 py-3 text-[12px] text-zk-dim sm:px-5"><span className="font-geist-mono">tool-server/.env</span><span>readable by agents</span></div>
            <pre className="overflow-x-auto px-4 py-4 font-geist-mono text-[12.5px] leading-7 text-zk-muted sm:px-5">
              {[['STRIPE_SECRET_KEY', 'sk_live_'], ['GITHUB_TOKEN', 'ghp_'], ['LINEAR_API_KEY', 'lin_api_']].map(([k, v]) => (
                <span key={k} className="block whitespace-nowrap">{k}=<span className="text-zk-bad">{v}••••••••••</span></span>
              ))}
            </pre>
          </div>
        </div>
        <div className="zk-card overflow-hidden">
          <div className="grid gap-7 p-6 md:p-8">
            <Slider id="vm-servers" label="MCP tool servers you run" value={servers} min={1} max={40} onChange={on(setServers)} />
            <Slider id="vm-keys" label="Secrets loaded per server" value={keys} min={1} max={6} onChange={on(setKeys)} />
            <Slider id="vm-agents" label="Agents that can call them" value={agents} min={1} max={50} onChange={on(setAgents)} />
          </div>
          <div className="grid grid-cols-2 border-t border-zk-line">
            <div className="p-5 sm:p-7">
              <p className="text-[12.5px] font-medium text-zk-bad">Today</p>
              <p className="mt-2 text-[40px] font-semibold leading-none tabular-nums tracking-tightest text-zk-fg sm:text-[44px]">{readable}</p>
              <p className="mt-1.5 text-[13px] text-zk-muted">secrets in agent reach</p>
              <p className="mt-4 font-geist-mono text-[12.5px] tabular-nums text-zk-fg">{paths.toLocaleString('en-US')} <span className="font-geist text-zk-dim">agent-to-key paths</span></p>
              <p className="mt-1 font-geist-mono text-[12.5px] tabular-nums text-zk-fg">{servers} <span className="font-geist text-zk-dim">servers to run</span></p>
            </div>
            <div className="border-l border-zk-line bg-zk-cobalt/[.08] p-5 sm:p-7">
              <p className="text-[12.5px] font-medium text-zk-ok">With VaultMCP</p>
              <p className="mt-2 text-[40px] font-semibold leading-none tracking-tightest text-zk-ok sm:text-[44px]">0</p>
              <p className="mt-1.5 text-[13px] text-zk-muted">secrets in agent reach</p>
              <p className="mt-4 font-geist-mono text-[12.5px] text-zk-fg">0 <span className="font-geist text-zk-dim">agent-to-key paths</span></p>
              <p className="mt-1 font-geist-mono text-[12.5px] text-zk-fg">0 <span className="font-geist text-zk-dim">servers to run</span></p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
