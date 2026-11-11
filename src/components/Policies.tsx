import { useState } from 'react'
import { trackDemo } from '../shared/analytics'
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
type Expiry = (typeof EXPIRY)[number]

const list = (xs: string[], joiner = 'and') =>
  xs.length <= 1 ? xs[0] ?? '' : `${xs.slice(0, -1).join(', ')} ${joiner} ${xs[xs.length - 1]}`

/** An editable policy: toggle rules and watch the plain-language summary rewrite itself. */
export function Policies() {
  const [rules, setRules] = useState(initial)
  const [expiry, setExpiry] = useState<Expiry>('End of task')
  const can = rules.filter((r) => r.on).map((r) => r.plain)
  const cannot = rules.filter((r) => !r.on).map((r) => r.plain)
  const ends = expiry === 'No expiry' ? 'Its access has no end date.' : expiry === 'End of task' ? 'Its access ends when the task does.' : `Its access ends after ${expiry}.`

  function toggle(r: Rule) {
    setRules((rs) => rs.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))
    trackDemo('policy_toggle', { rule: r.id, on: !r.on })
  }

  return (
    <Section id="policies" label="Policies">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading eyebrow="Policies" title="Decide what an agent can do, down to the single action." lede="Turn actions on and off for each agent. Anything you don’t allow is denied, whatever the agent was told to do." />
          <ul className="mt-8 grid gap-4 text-[15.5px] text-zk-muted">
            {[['Allow by action and endpoint,', 'not by whole service.'], ['Grant access for one task,', 'and let it end on its own.'], ['Deny by default.', 'New endpoints stay closed until you open them.']].map(([b, t]) => (
              <li key={b} className="flex gap-3"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-zk-ok/15 text-zk-ok"><Check className="h-3 w-3" /></span><span><b className="font-medium text-zk-fg">{b}</b> {t}</span></li>
            ))}
          </ul>
        </div>

        <div className="zk-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zk-line px-4 py-3.5 sm:px-6">
            <p className="font-geist-mono text-[13px] text-zk-fg">support-agent → Linear</p>
            <label className="flex items-center gap-2 text-[13px] text-zk-muted">
              Access ends
              <select value={expiry} onChange={(e) => { setExpiry(e.target.value as Expiry); trackDemo('policy_expiry', { expiry: e.target.value }) }}
                className="rounded-lg border border-zk-line2 bg-zk-bg px-2 py-1.5 text-[13px] text-zk-fg focus:border-zk-cobalt focus:outline-none">
                {EXPIRY.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
          </div>
          <ul className="divide-y divide-zk-line">
            {rules.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
                <button type="button" role="switch" aria-checked={r.on} aria-label={`Allow ${r.plain}`} onClick={() => toggle(r)}
                  className={cx('relative h-6 w-11 shrink-0 rounded-full transition-colors', r.on ? (r.risky ? 'bg-zk-bad' : 'bg-zk-cobalt') : 'bg-zk-line2')}>
                  <span className={cx('absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', r.on ? 'translate-x-[22px]' : 'translate-x-0.5')} />
                </button>
                <span className="w-[52px] shrink-0 font-geist-mono text-[12px] text-zk-sky sm:w-[58px]">{r.method}</span>
                <span className="min-w-0 flex-1 truncate font-geist-mono text-[12px] text-zk-fg sm:text-[12.5px]">{r.path}</span>
                {r.risky && <span className="hidden rounded-full bg-zk-bad/10 px-2 py-0.5 text-[11px] text-zk-bad sm:inline">high risk</span>}
              </li>
            ))}
          </ul>
          <div className="border-t border-zk-line bg-white/[.02] px-4 py-5 sm:px-6" aria-live="polite">
            <p className="text-[12.5px] font-medium text-zk-muted">In plain language</p>
            <p className="mt-2 text-[15px] leading-relaxed text-zk-fg">
              {can.length ? <>support-agent can <b className="font-medium text-white">{list(can)}</b>.</> : <>support-agent can’t do anything in Linear.</>}{' '}
              {cannot.length > 0 && <span className="text-zk-muted">It can’t {list(cannot, 'or')}. </span>}<span className="text-zk-muted">{ends}</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
