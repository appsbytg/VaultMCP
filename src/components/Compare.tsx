import { cx } from '../shared/cx'
import type { Alternative, CompareRow, Support } from '../types'
import { Check, Cross, Section, SectionHeading } from '../ui'

function Mark({ v, ours }: { v: Support; ours: boolean }) {
  if (v === 'yes') return <span className={cx('inline-grid h-6 w-6 place-items-center rounded-full', ours ? 'bg-vm-brasslt text-vm-deep' : 'bg-vm-allow/10 text-vm-allow')}><Check className="h-3.5 w-3.5" /><span className="sr-only">Yes</span></span>
  if (v === 'no') return <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-vm-sunk text-vm-muted"><Cross className="h-3.5 w-3.5" /><span className="sr-only">No</span></span>
  return <span className="font-jet text-[12px] text-vm-muted">{v}</span>
}

export function Compare({ alternatives, rows }: { alternatives: Alternative[]; rows: CompareRow[] }) {
  const ours = alternatives.length - 1
  return (
    <Section id="compare" label="Compare" className="border-t border-vm-line bg-vm-sunk/60">
      <SectionHeading eyebrow="Why VaultMCP" title="A secrets manager stores keys. It doesn’t keep them from agents." lede="Every common setup still ends with a live key inside the process an agent controls. Here’s how they compare." />
      <div className="vm-card mt-12 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">VaultMCP compared with other ways of giving agents tools</caption>
          <thead>
            <tr className="border-b border-vm-line align-bottom">
              <th scope="col" className="w-[30%] px-6 py-5"><span className="sr-only">Capability</span></th>
              {alternatives.map((a, i) => (
                <th key={a.name} scope="col" className={cx('px-4 py-5 text-center', i === ours && 'bg-vm-green')}>
                  <span className={cx('block font-serif text-[19px] font-normal', i === ours ? 'text-white' : 'text-vm-ink')}>{a.name}</span>
                  <span className={cx('mt-1 block text-[12px] font-normal leading-snug', i === ours ? 'text-white/60' : 'text-vm-muted')}>{a.note}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, vals], r) => (
              <tr key={label} className={r < rows.length - 1 ? 'border-b border-vm-line' : ''}>
                <th scope="row" className="px-6 py-4 text-[15px] font-medium text-vm-ink">{label}</th>
                {vals.map((v, i) => <td key={i} className={cx('px-4 py-4 text-center', i === ours && 'bg-vm-green/[.06]')}><Mark v={v} ours={i === ours} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[12.5px] text-vm-muted">Typical setups in each category. Individual products vary.</p>
    </Section>
  )
}
