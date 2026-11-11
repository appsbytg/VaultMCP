import { useState } from 'react'
import { cx } from '../shared/cx'
import { Check, Section, SectionHeading } from '../ui'

interface Rule { id: string; method: string; path: string; plain: string; on: boolean; risky?: boolean }

const initial: Rule[] = [
  { id: 'read', method: 'GET', path: '/issues/*', plain: 'read issues', on: true },
  { id: 'comment', method: 'POST', path: '/issues/*/comments', plain: 'comment', on: true },
  { id: 'label', method: 'PATCH', path: '/issues/*/labels', plain: 'change labels', on: true },
  { id: 'close', method: 'PATCH', path: '/issues/*/state', plain: 'close issues', on: false },
  { id: 'delete', method: 'DELETE', path: '/issues/*', plain: 'delete issues', on: false, risky: true },
  { id: 'members', method: '*', path: '/teams/*/members', plain: 'manage team members', on: false, risky: true },
]
const EXPIRY = ['15 min', '1 hour', 'End of task', 'No expiry'] as const

function list(xs: string[], joiner = 'and') {
  if (xs.length <= 1) return xs[0] ?? ''
  return `${xs.slice(0, -1).join(', ')} ${joiner} ${xs[xs.length - 1]}`
}

/** An editable policy: toggle rules and watch the plain-language summary rewrite itself. */
export function Policies() {
  const [rules, setRules] = useState(initial)
  const [expiry, setExpiry] = useState<(typeof EXPIRY)[number]>('End of task')
  const can = rules.filter((r) => r.on).map((r) => r.plain)
  const cannot = rules.filter((r) => !r.on).map((r) => r.plain)
  const ends = expiry === 'No expiry' ? 'Its access has no end date.' : expiry === 'End of task' ? 'Its access ends when the task does.' : `Its access ends after ${expiry}.`

  return (
    <Section id="policies" label="Policies" className="border-t border-vm-line">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading eyebrow="Policies" title="Decide what an agent can do, down to the single action." lede="Turn actions on and off for each agent. Anything you don’t allow is denied, whatever the agent was told to do." />
          <ul className="mt-8 grid gap-3.5 text-[16px] text-vm-muted">
            {[['Allow by action and endpoint,', 'not by whole service.'], ['Grant access for one task,', 'and let it end on its own.'], ['Deny by default.', 'New endpoints stay closed until you open them.']].map(([b, t]) => (
              <li key={b} className="flex gap-3"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-vm-green text-white"><Check className="h-3 w-3" /></span><span><b className="font-semibold text-vm-ink">{b}</b> {t}</span></li>
            ))}
          </ul>
        </div>

        <div className="vm-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-vm-line px-6 py-4">
            <p className="font-jet text-[13.5px] text-vm-ink">support-agent → Linear</p>
            <label className="flex items-center gap-2 text-[13px] text-vm-muted">
              Access ends
              <select value={expiry} onChange={(e) => setExpiry(e.target.value as (typeof EXPIRY)[number])}
                className="rounded-lg border border-vm-line2 bg-vm-paper px-2 py-1 text-[13px] text-vm-ink focus:border-vm-green focus:outline-none">
                {EXPIRY.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
          </div>
          <ul className="divide-y divide-vm-line">
            {rules.map((r) => (
              <li key={r.id} className="flex items-center gap-4 px-6 py-3">
                <button type="button" role="switch" aria-checked={r.on} aria-label={`Allow ${r.plain}`}
                  onClick={() => setRules((rs) => rs.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))}
                  className={cx('relative h-6 w-11 shrink-0 rounded-full transition-colors', r.on ? (r.risky ? 'bg-vm-deny' : 'bg-vm-green') : 'bg-vm-line2')}>
                  <span className={cx('absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', r.on ? 'translate-x-[22px]' : 'translate-x-0.5')} />
                </button>
                <span className="w-[58px] shrink-0 font-jet text-[12.5px] text-vm-brass">{r.method}</span>
                <span className="min-w-0 flex-1 truncate font-jet text-[12.5px] text-vm-ink">{r.path}</span>
                {r.risky && <span className="hidden rounded-full bg-vm-deny/10 px-2 py-0.5 text-[11px] font-medium text-vm-deny sm:inline">high risk</span>}
              </li>
            ))}
          </ul>
          <div className="border-t border-vm-line bg-vm-paper/70 px-6 py-5" aria-live="polite">
            <p className="text-[12px] font-semibold text-vm-muted">In plain language</p>
            <p className="mt-2 text-[15px] leading-relaxed text-vm-ink">
              {can.length ? <>support-agent can <b className="font-semibold">{list(can)}</b>.</> : <>support-agent can’t do anything in Linear.</>}{' '}
              {cannot.length > 0 && <>It can’t {list(cannot, 'or')}. </>}{ends}
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
