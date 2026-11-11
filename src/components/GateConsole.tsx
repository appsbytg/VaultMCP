import { useState } from 'react'
import { useInterval } from '../shared/hooks'
import { cx } from '../shared/cx'
import { Verdict } from '../ui'
import type { GateEvent } from '../types'

const TABS = ['Gate log', 'Policy', 'Audit'] as const

function GateLog({ feed }: { feed: GateEvent[] }) {
  const [n, setN] = useState(6)
  const [calls, setCalls] = useState(1284)
  const [denied, setDenied] = useState(17)
  useInterval(() => {
    const next = feed[n % feed.length]
    setN((x) => x + 1); setCalls((c) => c + 1); if (!next.ok) setDenied((d) => d + 1)
  }, 2000)
  const rows = Array.from({ length: 6 }, (_, i) => ({ ...feed[(n - 1 - i + feed.length * 10) % feed.length], key: n - i }))
  return (
    <div>
      <div className="grid grid-cols-3 border-b border-vm-line">
        {([[calls.toLocaleString('en-US'), 'calls today'], [String(denied), 'denied by policy'], ['0', 'keys in tool env']] as const).map(([v, l], i) => (
          <div key={l} className={cx('px-5 py-4 text-left', i > 0 && 'border-l border-vm-line')}>
            <p className="font-serif text-[30px] leading-none tabular-nums text-vm-ink">{v}</p>
            <p className="mt-1.5 text-[12.5px] text-vm-muted">{l}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-left font-jet sm:min-w-[620px] text-[12.5px]">
          <thead className="text-[11.5px] text-vm-muted">
            <tr className="border-b border-vm-line"><th className="px-5 py-2.5 font-normal">Agent</th><th className="px-3 py-2.5 font-normal">Call</th><th className="hidden px-3 py-2.5 font-normal sm:table-cell">Reason</th><th className="px-5 py-2.5 text-right font-normal">Decision</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.key} className={cx('border-b border-vm-line/70 last:border-0', i === 0 && 'animate-rise motion-reduce:animate-none')}>
                <td className="whitespace-nowrap px-5 py-3 text-vm-muted">{r.who}</td>
                <td className="whitespace-nowrap px-3 py-3 text-vm-ink"><span className="text-vm-brass">{r.method}</span> {r.tool}{r.path}</td>
                <td className="hidden whitespace-nowrap px-3 py-3 text-vm-muted sm:table-cell">{r.ok ? 'policy match' : r.why}</td>
                <td className="px-5 py-3 text-right"><Verdict ok={r.ok} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/** [allowed, HTTP method, path] */
export const policyRules: Array<[ok: boolean, method: string, path: string]> = [
  [true, 'GET', '/issues/*'], [true, 'POST', '/issues/*/comments'], [true, 'PATCH', '/issues/*/labels'],
  [false, 'DELETE', '*'], [false, '*', '/teams/*/members'], [false, '*', 'any other host'],
]

export function PolicyView() {
  return (
    <div className="grid md:grid-cols-[1.2fr_1fr]">
      <div className="min-w-0 border-b border-vm-line p-5 md:border-b-0 md:border-r">
        <div className="mb-3 flex items-center justify-between text-[13px]">
          <span className="font-medium text-vm-ink">support-agent → Linear</span>
          <span className="rounded-full bg-vm-sunk px-2.5 py-0.5 font-jet text-[11.5px] text-vm-muted">expires in 14 min</span>
        </div>
        <ul className="grid gap-1 font-jet text-[12.5px]">
          {policyRules.map(([ok, m, p]) => (
            <li key={m + p} className="grid grid-cols-[78px_64px_1fr] items-center gap-2 rounded-md px-2 py-1.5 hover:bg-vm-sunk">
              <Verdict ok={ok} className="justify-self-start" />
              <span className="text-vm-brass">{m}</span>
              <span className="truncate text-vm-ink">{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-5 text-left">
        <p className="text-[13px] font-medium text-vm-ink">In plain language</p>
        <p className="mt-2 text-[14.5px] leading-relaxed text-vm-muted">The support agent can read issues, comment and relabel. It can’t delete anything or touch team membership, and its access ends when the task does.</p>
      </div>
    </div>
  )
}

function AuditView() {
  const ev: Array<[time: string, who: string, what: string, ok: boolean]> = [
    ['14:02:11', 'support-agent', 'commented on ENG-412', true],
    ['14:02:09', 'support-agent', 'tried POST stripe /refunds', false],
    ['14:01:55', 'support-agent', 'read ENG-412', true],
    ['14:01:54', 'maya@acme.com', 'granted support-agent → Linear for 20 min', true],
  ]
  return (
    <ol className="grid gap-0 p-5 text-left">
      {ev.map(([t, who, what, ok]) => (
        <li key={t} className="grid grid-cols-[72px_14px_1fr] items-start gap-3 border-b border-vm-line/70 py-3 last:border-0">
          <span className="font-jet text-[12px] tabular-nums text-vm-muted">{t}</span>
          <span className={cx('mt-1.5 h-2 w-2 rounded-full', ok ? 'bg-vm-allow' : 'bg-vm-deny')} />
          <span className="text-[14px] text-vm-ink"><span className="font-medium">{who}</span> <span className="text-vm-muted">{what}</span></span>
        </li>
      ))}
    </ol>
  )
}

/** Hero product mock with three switchable views. */
export function GateConsole({ feed }: { feed: GateEvent[] }) {
  const [tab, setTab] = useState(0)
  return (
    <div className="vm-card overflow-hidden shadow-[0_40px_100px_-40px_rgba(8,42,33,.55)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-vm-line bg-vm-paper/60 px-4 py-2.5">
        <div role="tablist" aria-label="Console views" className="flex gap-1 rounded-full bg-vm-sunk p-1">
          {TABS.map((t, i) => (
            <button key={t} role="tab" type="button" aria-selected={tab === i} onClick={() => setTab(i)}
              className={cx('rounded-full px-3.5 py-1.5 text-[13px] font-medium transition', tab === i ? 'bg-vm-card text-vm-ink shadow-sm' : 'text-vm-muted hover:text-vm-ink')}>
              {t}
            </button>
          ))}
        </div>
        <span className="ml-auto inline-flex items-center gap-2 text-[12.5px] text-vm-muted">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-vm-allow motion-reduce:animate-none" /> Live example
        </span>
      </div>
      <div role="tabpanel" aria-label={TABS[tab]}>
        {tab === 0 && <GateLog feed={feed} />}
        {tab === 1 && <PolicyView />}
        {tab === 2 && <AuditView />}
      </div>
    </div>
  )
}
