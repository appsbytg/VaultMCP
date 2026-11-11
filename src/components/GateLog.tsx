import { useState } from 'react'
import { Container } from '../shared/Container'
import { cx } from '../shared/cx'
import { useInterval } from '../shared/hooks'
import type { GateEvent, Stopped } from '../types'
import { Check, Cross, SectionHeading } from '../ui'

/** Dark band: the live record of every decision, and what the gate stopped. */
export function GateLog({ feed, stopped }: { feed: GateEvent[]; stopped: Stopped[] }) {
  const [n, setN] = useState(6)
  const [calls, setCalls] = useState(12840)
  const [denied, setDenied] = useState(173)
  useInterval(() => {
    const next = feed[n % feed.length]!
    setN((x) => x + 1); setCalls((c) => c + 1); if (!next.ok) setDenied((d) => d + 1)
  }, 2200)
  const rows = Array.from({ length: 7 }, (_, i) => ({ ...feed[(n - 1 - i + feed.length * 10) % feed.length]!, key: n - i }))

  return (
    <section id="log" aria-labelledby="vm-log" className="vm-noise relative overflow-hidden bg-vm-deep text-white">
      <div aria-hidden className="vm-dots-dark absolute inset-0" />
      <Container className="relative py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          <div>
            <SectionHeading dark eyebrow="The gate log" title={<span id="vm-log">Every call, decided and written down.</span>}
              lede="See what each agent tried, what it was allowed to do and what was stopped. When something goes wrong, the answer to “which agent did this?” takes seconds." />
            <p className="mt-10 text-[13px] font-semibold text-white/50">Stopped this week</p>
            <ul className="mt-3 grid border-t border-white/10">
              {stopped.map((s) => (
                <li key={s.when + s.agent} className="grid grid-cols-[92px_1fr] gap-4 border-b border-white/10 py-4">
                  <span className="font-jet text-[12px] text-vm-brasslt">{s.when}</span>
                  <span className="text-[14.5px] text-white/80"><span className="font-jet text-[12.5px] text-white">{s.agent}</span> {s.what.charAt(0).toLowerCase() + s.what.slice(1)}. <span className="text-white/50">{s.why}.</span></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 self-start overflow-hidden rounded-2xl border border-white/10 bg-white/[.03]">
            <div className="grid grid-cols-3 border-b border-white/10">
              {([[calls.toLocaleString('en-US'), 'calls this week'], [denied.toLocaleString('en-US'), 'denied by policy'], ['0', 'keys exposed']] as const).map(([v, l], i) => (
                <div key={l} className={cx('px-5 py-5', i > 0 && 'border-l border-white/10')}>
                  <p className="font-serif text-[34px] leading-none tabular-nums">{v}</p>
                  <p className="mt-1.5 text-[12.5px] text-white/50">{l}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left font-jet text-[12.5px]">
                <caption className="sr-only">Recent gate decisions</caption>
                <thead className="text-[11.5px] text-white/40"><tr><th className="px-5 py-3 font-normal">Agent</th><th className="py-3 font-normal">Call</th><th className="px-5 py-3 text-right font-normal">Decision</th></tr></thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.key} className={cx('border-t border-white/[.07]', i === 0 && 'animate-rise motion-reduce:animate-none')}>
                      <td className="whitespace-nowrap px-5 py-3 text-white/55">{r.who}</td>
                      <td className="whitespace-nowrap py-3 text-white"><span className="text-vm-brasslt">{r.method}</span> {r.tool}{r.path}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={cx('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px]', r.ok ? 'bg-vm-mint/15 text-vm-mint' : 'bg-[#FF8A78]/15 text-[#FF8A78]')}>
                          {r.ok ? <Check className="h-3 w-3" /> : <Cross className="h-3 w-3" />}{r.ok ? 'allow' : r.why}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 px-5 py-3 text-[12px] text-white/45">
              <span>Export as CSV or JSON · stream to your SIEM</span><span>Example data</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
