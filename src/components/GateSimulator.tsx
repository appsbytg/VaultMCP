import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { matchScenario } from '../gate'
import { cx } from '../shared/cx'
import { useInterval, useReducedMotion } from '../shared/hooks'
import type { Agent, AgentId, Decision, Scenario } from '../types'
import { Check, Cross } from '../ui'

interface Props { agents: Agent[]; scenarios: Scenario[] }

const envFor: Record<string, string[]> = {
  Linear: ['LINEAR_API_KEY'], Stripe: ['STRIPE_SECRET_KEY'], GitHub: ['GITHUB_TOKEN'], HTTP: ['—'], Slack: ['SLACK_BOT_TOKEN'],
}

const tone: Record<Decision, { bar: string; label: string; chip: string }> = {
  allow: { bar: 'bg-vm-green text-white', label: 'Allowed', chip: 'bg-vm-mint text-vm-deep' },
  deny: { bar: 'bg-vm-ink text-white', label: 'Denied', chip: 'bg-[#FF8A78] text-vm-ink' },
  injection: { bar: 'bg-vm-ink text-white', label: 'Blocked and flagged', chip: 'bg-vm-brasslt text-vm-deep' },
}

/** Hero demo: choose an agent and a request, watch the gate check it, see what reaches the tool. */
export function GateSimulator({ agents, scenarios }: Props) {
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
    ['Agent', agent.name],
    ['Tool', sc.tool],
    ['Action', `${sc.method} ${sc.path}`],
    ['Access', agent.grant],
    ['Policy', sc.rule],
  ]
  const decided = phase > checks.length

  useEffect(() => {
    if (reduced) { setPhase(99); return }
    setPhase(0)
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setPhase(n)
      if (n > checks.length) window.clearInterval(id)
    }, 340)
    return () => window.clearInterval(id)
  }, [scenarioId, replay, reduced])

  // cycle through every example until the visitor takes over
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
  }
  function selectScenario(s: Scenario) {
    setTouched(true); setScenarioId(s.id); setText(s.request)
  }
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched(true)
    const s = matchScenario(text, agentId, scenarios)
    if (s.id === scenarioId) setReplay((r) => r + 1)
    else setScenarioId(s.id)
  }

  const allowed = sc.decision === 'allow'
  const t = tone[sc.decision]

  return (
    <div className="vm-card overflow-hidden text-left shadow-[0_40px_100px_-40px_rgba(8,42,33,.55)]">
      {/* top bar: agent picker */}
      <div className="flex flex-wrap items-center gap-3 border-b border-vm-line bg-vm-paper/70 px-4 py-3 sm:px-5">
        <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-vm-ink"><span className="h-2 w-2 animate-pulseDot rounded-full bg-vm-brass motion-reduce:animate-none" />Gate simulator</span>
        <div role="radiogroup" aria-label="Agent" className="grid w-full grid-cols-3 rounded-full bg-vm-card p-1 ring-1 ring-inset ring-vm-line sm:ml-auto sm:flex sm:w-auto">
          {agents.map((a) => (
            <button key={a.id} type="button" role="radio" aria-checked={agentId === a.id} onClick={() => selectAgent(a.id)}
              className={cx('truncate rounded-full px-1.5 py-1.5 font-jet text-[11px] transition sm:px-3.5 sm:text-[12px]', agentId === a.id ? 'bg-vm-green text-white' : 'text-vm-muted hover:text-vm-ink')}>
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* request input */}
      <form onSubmit={onSubmit} className="border-b border-vm-line p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <label htmlFor={inputId} className="text-[12.5px] font-semibold text-vm-muted">What {agent.name} asks for</label>
          <span className="text-[12px] text-vm-muted/80">{agent.role} · {agent.tools.join(', ')}</span>
        </div>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input id={inputId} value={text} onChange={(e) => { setTouched(true); setText(e.target.value) }}
            className="h-12 min-w-0 flex-1 rounded-xl border border-vm-line2 bg-vm-paper px-4 text-[15.5px] text-vm-ink placeholder:text-vm-muted/70 focus:border-vm-green focus:outline-none focus:ring-4 focus:ring-vm-green/15"
            placeholder="e.g. Delete the staging database" />
          <button type="submit" className="h-12 shrink-0 rounded-xl bg-vm-green px-5 text-[15px] font-semibold text-white transition hover:bg-vm-deep">Send through the gate</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {mine.map((s) => (
            <button key={s.id} type="button" onClick={() => selectScenario(s)} aria-pressed={s.id === scenarioId}
              className={cx('inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition', s.id === scenarioId ? 'bg-vm-green/10 text-vm-green ring-1 ring-inset ring-vm-green/40' : 'bg-vm-sunk text-vm-ink/80 hover:bg-vm-line')}>
              <span aria-hidden className={cx('h-1.5 w-1.5 rounded-full', s.decision === 'allow' ? 'bg-vm-allow' : s.decision === 'deny' ? 'bg-vm-deny' : 'bg-vm-brass')} />
              {s.label}
            </button>
          ))}
        </div>
      </form>

      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* what the gate checked */}
        <div className="border-b border-vm-line p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <p className="text-[12.5px] font-semibold text-vm-muted">What the gate checked</p>
          <dl className="mt-3 grid gap-2">
            {checks.map(([k, v], i) => (
              <div key={k} className={cx('grid grid-cols-[64px_1fr] items-baseline gap-3 rounded-lg border border-vm-line px-3 py-2 transition-all duration-300', phase > i ? 'opacity-100' : 'opacity-30')}>
                <dt className="text-[11.5px] text-vm-muted">{k}</dt>
                <dd className="truncate font-jet text-[12.5px] text-vm-ink" title={v}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* the path the call takes */}
        <div className="min-w-0 p-4 sm:p-6">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-2">
            <Node title={agent.name} sub="agent" />
            <Link on={phase >= 1} color="#B08A3E" />
            <div className="relative flex flex-col items-center">
              <div className={cx('relative grid h-[84px] w-[84px] place-items-center rounded-full border-2 bg-vm-deep transition-all duration-500 sm:h-[104px] sm:w-[104px]', decided ? (allowed ? 'border-vm-mint shadow-[0_0_0_8px_rgba(127,224,181,.15)]' : 'border-[#FF8A78] shadow-[0_0_0_8px_rgba(255,138,120,.15)]') : 'border-vm-brasslt/50')}>
                <svg aria-hidden viewBox="0 0 100 100" className={cx('absolute inset-0 h-full w-full text-vm-brasslt/40', !decided && !reduced && 'animate-[spin_6s_linear_infinite]')}>
                  {Array.from({ length: 24 }, (_, i) => {
                    const a = (i * 15 * Math.PI) / 180
                    return <line key={i} x1={50 + 44 * Math.cos(a)} y1={50 + 44 * Math.sin(a)} x2={50 + (i % 6 ? 40 : 36) * Math.cos(a)} y2={50 + (i % 6 ? 40 : 36) * Math.sin(a)} stroke="currentColor" strokeWidth="1.5" />
                  })}
                </svg>
                <span className={cx('relative grid h-9 w-9 place-items-center rounded-full transition-colors duration-500', decided ? (allowed ? 'bg-vm-mint text-vm-deep' : 'bg-[#FF8A78] text-vm-ink') : 'bg-vm-brasslt/20 text-vm-brasslt')}>
                  {decided ? (allowed ? <Check className="h-5 w-5" /> : <Cross className="h-5 w-5" />) : <span className="font-serif text-[18px] leading-none">V</span>}
                </span>
              </div>
              <span className="mt-2 text-[12px] font-semibold text-vm-ink">VaultMCP gate</span>
            </div>
            <Link on={decided && allowed} color="#118457" blocked={decided && !allowed} />
            <Node title={sc.tool} sub={decided ? (allowed ? 'received the call' : 'never reached') : 'tool'} dim={decided && !allowed} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-vm-line bg-vm-paper/60 p-4">
              <p className="text-[12px] font-semibold text-vm-muted">{sc.tool} tool environment</p>
              <ul className="mt-2 grid gap-1 font-jet text-[12.5px]">
                {(envFor[sc.tool] ?? ['API_KEY']).map((k) => (
                  <li key={k} className="flex justify-between gap-3"><span className="text-vm-ink">{k}</span><span className="text-vm-allow">not set</span></li>
                ))}
                <li className="flex justify-between gap-3"><span className="text-vm-ink">secrets on disk</span><span className="text-vm-allow">none</span></li>
              </ul>
            </div>
            <div className="rounded-xl border border-vm-line bg-vm-paper/60 p-4">
              <p className="text-[12px] font-semibold text-vm-muted">Audit log entry</p>
              <p className={cx('mt-2 font-jet text-[12.5px] leading-relaxed transition-opacity duration-300', decided ? 'opacity-100' : 'opacity-30')}>
                <span className="text-vm-muted">14:02:11</span> {agent.name} <span className="text-vm-brass">{sc.method}</span> {sc.tool.toLowerCase()} → <span className={allowed ? 'text-vm-allow' : 'text-vm-deny'}>{allowed ? 'allow' : 'deny'}</span>
                {sc.decision === 'injection' && <span className="ml-1 rounded bg-vm-brasslt/30 px-1.5 text-vm-deep">flagged</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* verdict */}
      <div aria-live="polite" className={cx('flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-vm-line px-4 py-4 transition-colors duration-500 sm:px-5', decided ? t.bar : 'bg-vm-sunk text-vm-muted')}>
        {decided ? (
          <>
            <span className={cx('rounded-full px-3 py-1 text-[12.5px] font-semibold', t.chip)}>{t.label}</span>
            <p className="w-full min-w-0 text-[15px] leading-snug sm:w-auto sm:flex-1">
              {sc.result} {allowed ? `The ${sc.tool} credential was applied by VaultMCP; the agent never saw it.` : 'Logged with the reason.'}
            </p>
            <p className="font-serif text-[30px] leading-none">0 <span className="font-inter text-[13px] text-white/60">keys exposed</span></p>
          </>
        ) : (
          <p className="text-[14.5px]">Checking the request…</p>
        )}
      </div>
      <p className="border-t border-vm-line px-5 py-2.5 text-[12px] text-vm-muted/80">Demo with example agents and policies. Nothing you type leaves this page.</p>
    </div>
  )
}

function Node({ title, sub, dim = false }: { title: string; sub: string; dim?: boolean }) {
  return (
    <div className={cx('min-w-0 rounded-xl border bg-vm-card px-2 py-3 text-center transition-opacity duration-500 sm:px-3', dim ? 'border-dashed border-vm-line2 opacity-50' : 'border-vm-line')}>
      <p className="truncate font-jet text-[12px] text-vm-ink sm:text-[13px]">{title}</p>
      <p className="mt-0.5 truncate text-[11px] text-vm-muted sm:text-[12px]">{sub}</p>
    </div>
  )
}

function Link({ on, color, blocked = false }: { on: boolean; color: string; blocked?: boolean }) {
  return (
    <div aria-hidden className="relative flex w-6 items-center sm:w-14">
      <span className="h-[3px] w-full rounded-full transition-colors duration-500" style={{ background: on ? color : '#E1DFD5' }} />
      {blocked && <span className="absolute left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-vm-deny text-white"><Cross className="h-3 w-3" /></span>}
    </div>
  )
}
