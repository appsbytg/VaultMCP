import { useId, useState } from 'react'
import { Section, SectionHeading } from '../ui'

interface SliderProps { label: string; value: number; min: number; max: number; onChange: (n: number) => void }

function Slider({ label, value, min, max, onChange }: SliderProps) {
  const id = useId()
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14.5px] font-medium text-vm-ink">{label}</label>
        <output htmlFor={id} className="font-jet text-[16px] tabular-nums text-vm-ink">{value}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={1} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="vm-range mt-3 w-full" style={{ background: `linear-gradient(to right, #0F3D31 ${pct}%, #E1DFD5 ${pct}%)` }} />
    </div>
  )
}

/** A quick count of how many secrets agents can reach today, next to the same setup on VaultMCP. */
export function Exposure() {
  const [servers, setServers] = useState(8)
  const [keys, setKeys] = useState(2)
  const [agents, setAgents] = useState(5)
  const readable = servers * keys
  const paths = readable * agents
  return (
    <Section id="exposure" label="Exposure check" className="border-t border-vm-line">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="Exposure check" title="How many keys can your agents reach today?" lede="Set your current numbers. Every secret loaded into a tool server is a secret an agent can be talked into revealing." />
          <div className="mt-8 overflow-hidden rounded-2xl bg-vm-deep text-left">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[12.5px] text-white/50"><span className="font-jet">tool-server/.env</span><span>readable by agents</span></div>
            <pre className="overflow-x-auto px-5 py-4 font-jet text-[13px] leading-7 text-white/80">
              {['STRIPE_SECRET_KEY=sk_live_', 'GITHUB_TOKEN=ghp_', 'LINEAR_API_KEY=lin_api_'].map((l) => {
                const [k, v] = l.split('=')
                return <span key={l} className="block whitespace-nowrap">{k}=<span className="text-[#FF9B8A]">{v}••••••••••</span></span>
              })}
            </pre>
          </div>
        </div>
        <div className="vm-card overflow-hidden">
          <div className="grid gap-7 p-7 md:p-9">
            <Slider label="MCP tool servers you run" value={servers} min={1} max={40} onChange={setServers} />
            <Slider label="Secrets loaded per server" value={keys} min={1} max={6} onChange={setKeys} />
            <Slider label="Agents that can call them" value={agents} min={1} max={50} onChange={setAgents} />
          </div>
          <div className="grid border-t border-vm-line sm:grid-cols-2">
            <div className="p-7">
              <p className="text-[13px] font-semibold text-vm-deny">Today</p>
              <p className="mt-2 font-serif text-[48px] leading-none tabular-nums text-vm-ink">{readable}</p>
              <p className="mt-1 text-[13.5px] text-vm-muted">secrets inside agent reach</p>
              <p className="mt-4 font-jet text-[13px] tabular-nums text-vm-ink">{paths.toLocaleString('en-US')} <span className="font-inter text-vm-muted">agent-to-key paths</span></p>
              <p className="mt-1 font-jet text-[13px] tabular-nums text-vm-ink">{servers} <span className="font-inter text-vm-muted">servers to patch and run</span></p>
            </div>
            <div className="border-t border-vm-line bg-vm-green p-7 text-white sm:border-l sm:border-t-0">
              <p className="text-[13px] font-semibold text-vm-mint">With VaultMCP</p>
              <p className="mt-2 font-serif text-[48px] leading-none">0</p>
              <p className="mt-1 text-[13.5px] text-white/65">secrets inside agent reach</p>
              <p className="mt-4 font-jet text-[13px]">0 <span className="font-inter text-white/65">agent-to-key paths</span></p>
              <p className="mt-1 font-jet text-[13px]">0 <span className="font-inter text-white/65">servers for you to run</span></p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
