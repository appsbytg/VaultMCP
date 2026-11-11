import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { matchScenario } from '../gate'
import { trackDemo } from '../shared/analytics'
import { cx } from '../shared/cx'
import { useInterval, useReducedMotion } from '../shared/hooks'
import type { Agent, AgentId, Decision, Scenario } from '../types'
import { Check, Cross, SealBadge, Window } from '../ui'

const envFor: Record<string, string> = { Linear: 'LINEAR_API_KEY', Stripe: 'STRIPE_SECRET_KEY', GitHub: 'GITHUB_TOKEN', HTTP: 'OUTBOUND_TOKEN', Slack: 'SLACK_BOT_TOKEN' }
const verdict: Record<Decision, { label: string; tone: string }> = {
  allow: { label: 'Allowed', tone: 'bg-zk-ok/15 text-zk-ok ring-zk-ok/30' },
  deny: { label: 'Denied', tone: 'bg-zk-bad/15 text-zk-bad ring-zk-bad/30' },
  injection: { label: 'Blocked and flagged', tone: 'bg-zk-amber/15 text-zk-amber ring-zk-amber/30' },
}

/** Hero demo: choose an agent and a request, watch the gate check it, see what reaches the tool. */
export function GateSimulator({ agents, scenarios }: { agents: Agent[]; scenarios: Scenario[] }) {
  const reduced = useReducedMotion()
  const inputId = useId()
  const [agentId, setAgentId] = useState<AgentId>('support')
  const [scenarioId, setScenarioId] = useState('s1')
  const [text, setText] = useState(scenarios[0]?.request ?? '')
  const [phase, setPhase] = useState(reduced ? 99 : 0)
  const [touched, setTouched] = useState(false)
  const [replay, setReplay] = useState(0)

  const agent = agents.find((a) => a.id === agentId)!
  const sc = scenarios.find((s) => s.id === scenarioId)!
  const mine = useMemo(() => scenarios.filter((s) => s.agent === agentId), [scenarios, agentId])
  const checks: Array<[string, string]> = [
    ['Agent', agent.name], ['Tool', sc.tool], ['Action', `${sc.method} ${sc.path}`], ['Access', agent.grant], ['Policy', sc.rule],
  ]
  const decided = phase > checks.length
  const allowed = sc.decision === 'allow'

  useEffect(() => {
    if (reduced) { setPhase(99); return }
    setPhase(0)
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setPhase(n)
      if (n > 5) window.clearInterval(id)
    }, 320)
    return () => window.clearInterval(id)
  }, [scenarioId, replay, reduced])

  useInterval(() => {
    if (touched) return
    const i = scenarios.findIndex((s) => s.id === scenarioId)
    const next = scenarios[(i + 1) % scenarios.length]!
    setAgentId(next.agent); setScenarioId(next.id); setText(next.request)
  }, touched ? null : 6500)

  function selectAgent(id: AgentId) {
    setTouched(true)
    setAgentId(id)
    const first = scenarios.find((s) => s.agent === id)!
    setScenarioId(first.id); setText(first.request)
    trackDemo('gate_agent', { agent: id })
  }
  function selectScenario(s: Scenario) {
    setTouched(true); setScenarioId(s.id); setText(s.request)
    trackDemo('gate_scenario', { agent: s.agent, scenario: s.label, decision: s.decision })
  }
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched(true)
    const s = matchScenario(text, agentId, scenarios)
    trackDemo('gate_custom_request', { agent: agentId, text: text.slice(0, 200), decision: s.decision })
    if (s.id === scenarioId) setReplay((r) => r + 1)
    else setScenarioId(s.id)
  }

  return (
    <Window title="vaultmcp · gate simulator" right={<SealBadge>0 keys in tools</SealBadge>} className="text-left shadow-[0_40px_120px_-40px_rgba(0,0,0,.9)]">
      {/* agent picker */}
      <div className="border-b border-zk-line p-4 sm:p-5">
        <div role="radiogroup" aria-label="Agent" className="grid grid-cols-3 gap-1 rounded-xl bg-zk-bg/70 p-1 ring-1 ring-inset ring-zk-line sm:inline-grid">
          {agents.map((a) => (
            <button key={a.id} type="button" role="radio" aria-checked={agentId === a.id} onClick={() => selectAgent(a.id)}
              className={cx('min-w-0 truncate rounded-lg px-2 py-2 font-geist-mono text-[11.5px] transition sm:px-4 sm:text-[12.5px]', agentId === a.id ? 'bg-white text-zk-bg' : 'text-zk-muted hover:text-zk-fg')}>
              <span className="sm:hidden">{a.name.replace(/-agent$/, '')}</span><span className="hidden sm:inline">{a.name}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-zk-dim">{agent.role} · <span className="text-zk-muted">{agent.tools.join(', ')}</span></p>
      </div>

      {/* request */}
      <form onSubmit={onSubmit} className="border-b border-zk-line p-4 sm:p-5">
        <label htmlFor={inputId} className="text-[13px] font-medium text-zk-muted">What {agent.name} asks for</label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input id={inputId} value={text} onChange={(e) => { setTouched(true); setText(e.target.value) }}
            className="h-12 min-w-0 flex-1 rounded-lg border border-zk-line2 bg-zk-bg px-3.5 text-[16px] text-zk-fg placeholder:text-zk-dim focus:border-zk-cobalt focus:outline-none focus:ring-4 focus:ring-zk-cobalt/20 sm:text-[15px]"
            placeholder="e.g. Delete the staging database" />
          <button type="submit" className="h-12 shrink-0 rounded-lg bg-white px-5 text-[15px] font-medium text-zk-bg transition hover:bg-[#E6E9F2]">Send through the gate</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {mine.map((s) => (
            <button key={s.id} type="button" onClick={() => selectScenario(s)} aria-pressed={s.id === scenarioId}
              className={cx('inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] transition', s.id === scenarioId ? 'bg-zk-cobalt/15 text-zk-fg ring-1 ring-inset ring-zk-cobalt/50' : 'bg-white/[.04] text-zk-muted ring-1 ring-inset ring-zk-line2 hover:text-zk-fg')}>
              <span aria-hidden className={cx('h-1.5 w-1.5 rounded-full', s.decision === 'allow' ? 'bg-zk-ok' : s.decision === 'deny' ? 'bg-zk-bad' : 'bg-zk-amber')} />
              {s.label}
            </button>
          ))}
        </div>
      </form>

      <div className="grid md:grid-cols-[280px_1fr]">
        {/* checks */}
        <div className="border-b border-zk-line p-4 sm:p-5 md:border-b-0 md:border-r">
          <p className="text-[13px] font-medium text-zk-muted">What the gate checked</p>
          <ol className="mt-3 grid gap-1.5 font-geist-mono text-[12.5px]">
            {checks.map(([k, v], i) => (
              <li key={k} className={cx('grid grid-cols-[62px_1fr] items-baseline gap-2 rounded-md px-2 py-1.5 transition-all duration-300', phase > i ? 'bg-white/[.03] opacity-100' : 'opacity-25')}>
                <span className="text-zk-dim">{k}</span>
                <span className="truncate text-zk-fg" title={v}>{v}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* path */}
        <div className="min-w-0 p-4 sm:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_20px_auto_20px_minmax(0,1fr)] items-center gap-1 sm:grid-cols-[minmax(0,1fr)_48px_auto_48px_minmax(0,1fr)] sm:gap-2">
            <Node title={agent.name} sub="agent" />
            <Wire on={phase >= 1} color="#FFB224" />
            <div className="flex flex-col items-center">
              <div className={cx('relative grid h-16 w-16 place-items-center rounded-full border bg-zk-bg transition-all duration-500 sm:h-24 sm:w-24',
                decided ? (allowed ? 'border-zk-ok/60 shadow-[0_0_0_6px_rgba(60,214,140,.12)]' : 'border-zk-bad/60 shadow-[0_0_0_6px_rgba(255,107,94,.12)]') : 'border-zk-line2')}>
                <svg aria-hidden viewBox="0 0 100 100" className={cx('absolute inset-0 h-full w-full text-zk-line2', !decided && !reduced && 'animate-[spin_6s_linear_infinite]')}>
                  {Array.from({ length: 24 }, (_, i) => {
                    const a = (i * 15 * Math.PI) / 180
                    const r2 = i % 6 ? 40 : 35
                    return <line key={i} x1={50 + 45 * Math.cos(a)} y1={50 + 45 * Math.sin(a)} x2={50 + r2 * Math.cos(a)} y2={50 + r2 * Math.sin(a)} stroke="currentColor" strokeWidth="2" />
                  })}
                </svg>
                <span className={cx('relative grid h-8 w-8 place-items-center rounded-full transition-colors duration-500 sm:h-10 sm:w-10', decided ? (allowed ? 'bg-zk-ok text-zk-bg' : 'bg-zk-bad text-zk-bg') : 'bg-zk-line text-zk-muted')}>
                  {decided ? (allowed ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <Cross className="h-4 w-4 sm:h-5 sm:w-5" />) : <span className="h-2 w-2 rounded-full bg-zk-amber" />}
                </span>
              </div>
              <span className="mt-2 whitespace-nowrap text-[11.5px] font-medium text-zk-fg sm:text-[12.5px]">VaultMCP gate</span>
            </div>
            <Wire on={decided && allowed} color="#3CD68C" blocked={decided && !allowed} />
            <Node title={sc.tool} sub={decided ? (allowed ? 'received it' : 'never reached') : 'tool'} dim={decided && !allowed} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-zk-line bg-zk-bg/60 p-3.5 font-geist-mono text-[12px] leading-6">
              <p className="font-geist text-[12.5px] text-zk-muted">{sc.tool} tool environment</p>
              <p className="mt-1.5 flex justify-between gap-3"><span className="truncate text-zk-fg">{envFor[sc.tool] ?? 'API_KEY'}</span><span className="text-zk-ok">not set</span></p>
              <p className="flex justify-between gap-3"><span className="text-zk-fg">secrets on disk</span><span className="text-zk-ok">none</span></p>
            </div>
            <div className="rounded-lg border border-zk-line bg-zk-bg/60 p-3.5 font-geist-mono text-[12px] leading-6">
              <p className="font-geist text-[12.5px] text-zk-muted">Audit log</p>
              <p className={cx('mt-1.5 break-words transition-opacity duration-300', decided ? 'opacity-100' : 'opacity-30')}>
                <span className="text-zk-dim">14:02:11</span> {agent.name} <span className="text-zk-sky">{sc.method}</span> {sc.tool.toLowerCase()} → <span className={allowed ? 'text-zk-ok' : 'text-zk-bad'}>{allowed ? 'allow' : 'deny'}</span>
                {sc.decision === 'injection' && <span className="ml-1.5 rounded bg-zk-amber/15 px-1.5 text-zk-amber">flagged</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* verdict */}
      <div aria-live="polite" className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-zk-line bg-white/[.02] px-4 py-4 sm:px-6">
        {decided ? (
          <>
            <span className={cx('rounded-full px-3 py-1 text-[12.5px] font-medium ring-1 ring-inset', verdict[sc.decision].tone)}>{verdict[sc.decision].label}</span>
            <p className="w-full min-w-0 text-[14.5px] leading-snug text-zk-fg sm:w-auto sm:flex-1">
              {sc.result} <span className="text-zk-muted">{allowed ? `VaultMCP applied the ${sc.tool} credential; the agent never saw it.` : 'Logged with the reason.'}</span>
            </p>
            <p className="font-geist-mono text-[13px] text-zk-muted"><span className="text-[22px] font-medium text-zk-fg">0</span> keys exposed</p>
          </>
        ) : (
          <p className="text-[14px] text-zk-muted">Checking the request…</p>
        )}
      </div>
      <p className="border-t border-zk-line px-4 py-2.5 text-[12px] text-zk-dim sm:px-6">Example agents and policies. Nothing you type leaves this page.</p>
    </Window>
  )
}

function Node({ title, sub, dim = false }: { title: string; sub: string; dim?: boolean }) {
  return (
    <div className={cx('min-w-0 rounded-lg border px-1.5 py-2.5 text-center transition-opacity duration-500 sm:px-3 sm:py-3', dim ? 'border-dashed border-zk-line2 opacity-45' : 'border-zk-line bg-white/[.02]')}>
      <p className="truncate font-geist-mono text-[11px] text-zk-fg sm:text-[12.5px]">{title}</p>
      <p className="mt-0.5 truncate text-[10.5px] text-zk-dim sm:text-[12px]">{sub}</p>
    </div>
  )
}

function Wire({ on, color, blocked = false }: { on: boolean; color: string; blocked?: boolean }) {
  return (
    <div aria-hidden className="relative flex items-center">
      <span className="h-[2px] w-full rounded-full transition-colors duration-500" style={{ background: on ? color : '#252E4A' }} />
      {blocked && <span className="absolute left-1/2 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full bg-zk-bad text-zk-bg sm:h-5 sm:w-5"><Cross className="h-2.5 w-2.5 sm:h-3 sm:w-3" /></span>}
    </div>
  )
}
