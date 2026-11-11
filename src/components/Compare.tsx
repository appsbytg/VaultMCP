import { cx } from '../shared/cx'
import type { Alternative, CompareRow, Support } from '../types'
import { Check, Cross, Section, SectionHeading } from '../ui'

function Mark({ v, ours }: { v: Support; ours: boolean }) {
  if (v === 'yes')
    return <span className={cx('inline-grid h-6 w-6 place-items-center rounded-full', ours ? 'bg-zk-ok text-zk-bg' : 'bg-zk-ok/15 text-zk-ok')}><Check className="h-3.5 w-3.5" /><span className="sr-only">Yes</span></span>
  if (v === 'no')
    return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-zk-line text-zk-dim"><Cross className="h-3.5 w-3.5" /><span className="sr-only">No</span></span>
  return <span className="font-geist-mono text-[12px] text-zk-dim">{v}</span>
}

export function Compare({ alternatives, rows }: { alternatives: Alternative[]; rows: CompareRow[] }) {
  const ours = alternatives.length - 1
  return (
    <Section id="compare" label="Why VaultMCP">
      <SectionHeading eyebrow="Why VaultMCP" title="A secrets manager stores keys. It doesn’t keep them from agents."
        lede="Every common setup still ends with a live key inside the process an agent controls. Here’s how they compare." />

      {/* phone: one card per capability */}
      <ul className="mt-10 grid gap-3 md:hidden">
        {rows.map(([label, vals]) => (
          <li key={label} className="zk-card p-4">
            <p className="text-[15px] font-medium text-zk-fg">{label}</p>
            <dl className="mt-3 grid grid-cols-2 gap-2">
              {alternatives.map((a, i) => (
                <div key={a.name} className={cx('flex items-center justify-between gap-2 rounded-lg px-3 py-2', i === ours ? 'bg-zk-cobalt/[.14] ring-1 ring-inset ring-zk-cobalt/40' : 'bg-white/[.03]')}>
                  <dt className={cx('truncate text-[12px]', i === ours ? 'text-zk-fg' : 'text-zk-muted')}>{a.name}</dt>
                  <dd><Mark v={vals[i]!} ours={i === ours} /></dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* wider screens: table */}
      <div className="mt-14 hidden overflow-x-auto rounded-2xl border border-zk-line md:block">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">VaultMCP compared with other ways of giving agents tools</caption>
          <thead>
            <tr className="border-b border-zk-line align-bottom">
              <th scope="col" className="w-[30%] px-6 py-5"><span className="sr-only">Capability</span></th>
              {alternatives.map((a, i) => (
                <th key={a.name} scope="col" className={cx('px-4 py-5 text-center', i === ours && 'bg-zk-cobalt/[.12]')}>
                  <span className={cx('block text-[14px] font-medium', i === ours ? 'text-zk-fg' : 'text-zk-muted')}>{a.name}</span>
                  <span className="mt-1 block text-[12px] font-normal leading-snug text-zk-dim">{a.note}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, vals], r) => (
              <tr key={label} className={r < rows.length - 1 ? 'border-b border-zk-line' : ''}>
                <th scope="row" className="px-6 py-4 text-[14.5px] font-normal text-zk-fg">{label}</th>
                {vals.map((v, i) => <td key={i} className={cx('px-4 py-4 text-center', i === ours && 'bg-zk-cobalt/[.12]')}><Mark v={v} ours={i === ours} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[12.5px] text-zk-dim">Typical setups in each category. Individual products vary.</p>
    </Section>
  )
}
