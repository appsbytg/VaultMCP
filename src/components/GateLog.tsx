import { useState } from 'react'
import { cx } from '../shared/cx'
import { useInterval } from '../shared/hooks'
import type { GateEvent, Stopped } from '../types'
import { Section, SectionHeading, Verdict, Window } from '../ui'

/** The live record of every decision, and what the gate stopped this week. */
export function GateLog({ feed, stopped }: { feed: GateEvent[]; stopped: Stopped[] }) {
  const [n, setN] = useState(6)
  const [calls, setCalls] = useState(12840)
  const [denied, setDenied] = useState(173)
  useInterval(() => {
    const next = feed[n % feed.length]!
    setN((x) => x + 1); setCalls((c) => c + 1); if (!next.ok) setDenied((d) => d + 1)
  }, 2200)
  const rows = Array.from({ length: 6 }, (_, i) => ({ ...feed[(n - 1 - i + feed.length * 10) % feed.length]!, key: n - i }))

  return (
    <Section id="log" label="Gate log">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
        <div>
          <SectionHeading eyebrow="The gate log" title="Every call, decided and written down."
            lede="See what each agent tried, what it was allowed to do and what was stopped. When something goes wrong, “which agent did this?” takes seconds to answer." />
          <p className="mt-10 text-[13px] font-medium text-zk-muted">Stopped this week</p>
          <ul className="mt-3 grid border-t border-zk-line">
            {stopped.map((s) => (
              <li key={s.when + s.agent} className="grid grid-cols-[84px_1fr] gap-3 border-b border-zk-line py-3.5 sm:grid-cols-[96px_1fr] sm:gap-4">
                <span className="font-geist-mono text-[12px] text-zk-amber">{s.when}</span>
                <span className="text-[14.5px] leading-relaxed text-zk-muted"><span className="font-geist-mono text-[12.5px] text-zk-fg">{s.agent}</span> {s.what.charAt(0).toLowerCase() + s.what.slice(1)}. <span className="text-zk-dim">{s.why}.</span></span>
              </li>
            ))}
          </ul>
        </div>

        <Window title="vaultmcp · gate log · live" className="min-w-0 self-start">
          <div className="grid grid-cols-3 border-b border-zk-line">
            {([[calls.toLocaleString('en-US'), 'calls this week'], [denied.toLocaleString('en-US'), 'denied'], ['0', 'keys exposed']] as const).map(([v, l], i) => (
              <div key={l} className={cx('px-3 py-4 sm:px-5 sm:py-5', i > 0 && 'border-l border-zk-line')}>
                <p className="text-[22px] font-semibold tabular-nums tracking-tight text-zk-fg sm:text-[28px]">{v}</p>
                <p className="mt-1 text-[12px] text-zk-muted">{l}</p>
              </div>
            ))}
          </div>
          {/* phone: stacked rows; wider screens: table */}
          <ul className="divide-y divide-zk-line sm:hidden">
            {rows.map((r, i) => (
              <li key={r.key} className={cx('px-4 py-3 font-geist-mono text-[12px]', i === 0 && 'animate-rise motion-reduce:animate-none')}>
                <div className="flex items-center justify-between gap-3"><span className="text-zk-muted">{r.who}</span><Verdict ok={r.ok} label={r.ok ? 'allow' : r.why} /></div>
                <p className="mt-1 truncate text-zk-fg"><span className="text-zk-sky">{r.method}</span> {r.tool}{r.path}</p>
              </li>
            ))}
          </ul>
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[520px] text-left font-geist-mono text-[12.5px]">
              <caption className="sr-only">Recent gate decisions</caption>
              <thead className="text-[11.5px] text-zk-dim"><tr><th className="px-5 py-3 font-normal">Agent</th><th className="py-3 font-normal">Call</th><th className="px-5 py-3 text-right font-normal">Decision</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.key} className={cx('border-t border-zk-line', i === 0 && 'animate-rise motion-reduce:animate-none')}>
                    <td className="whitespace-nowrap px-5 py-3 text-zk-muted">{r.who}</td>
                    <td className="whitespace-nowrap py-3 text-zk-fg"><span className="text-zk-sky">{r.method}</span> {r.tool}{r.path}</td>
                    <td className="px-5 py-3 text-right"><Verdict ok={r.ok} label={r.ok ? 'allow' : r.why} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap justify-between gap-2 border-t border-zk-line px-4 py-3 text-[12px] text-zk-dim sm:px-5">
            <span>Export as CSV or JSON · stream to your SIEM</span><span>Example data</span>
          </div>
        </Window>
      </div>
    </Section>
  )
}
