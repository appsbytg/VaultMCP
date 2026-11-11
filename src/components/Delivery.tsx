import { useState } from 'react'
import { trackDemo } from '../shared/analytics'
import { cx } from '../shared/cx'
import type { Delivery as DeliveryContent } from '../types'
import { Button, Check, Section, SectionHeading, Window } from '../ui'

function Arrow() {
  return (
    <div aria-hidden className="flex items-center justify-center text-zk-dim">
      <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M14 6l6 6-6 6" /></svg>
    </div>
  )
}

function Box({ title, items, highlight = false }: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className={cx('rounded-2xl border p-5', highlight ? 'border-zk-cobalt/50 bg-zk-cobalt/[.08] shadow-[0_0_0_1px_rgba(77,107,255,.25)]' : 'border-zk-line bg-zk-panel/60')}>
      <p className={cx('text-[13px] font-medium', highlight ? 'text-zk-sky' : 'text-zk-muted')}>{title}</p>
      <ul className="mt-3 grid gap-2 font-geist-mono text-[12.5px] text-zk-fg">
        {items.map((t) => <li key={t} className="flex items-center gap-2"><span className={cx('h-1.5 w-1.5 shrink-0 rounded-full', highlight ? 'bg-zk-sky' : 'bg-zk-line2')} />{t}</li>)}
      </ul>
    </div>
  )
}

/** "How you'll use it": the one way VaultMCP is delivered, what runs where, and the setup. */
export function Delivery({ content: d }: { content: DeliveryContent }) {
  const [tab, setTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const code = d.code[tab] ?? d.code[0]!

  async function copy() {
    try { await navigator.clipboard.writeText(code.body); setCopied(true); window.setTimeout(() => setCopied(false), 1600) } catch { setCopied(false) }
    trackDemo('delivery_copy', { snippet: code.label })
  }

  return (
    <Section id="delivery" label="How you'll use it">
      <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-end md:gap-12">
        <SectionHeading eyebrow="How you’ll use it" title="A hosted gateway. Connect it like any MCP server." />
        <p className="max-w-[34rem] text-[16.5px] leading-relaxed text-zk-muted md:pb-2">{d.summary}</p>
      </div>

      {/* what runs where */}
      <div className="mt-12 grid items-center gap-3 md:mt-14 md:grid-cols-[1fr_36px_1.25fr_36px_1fr]">
        <Box title={d.yourSide.title} items={d.yourSide.items} />
        <Arrow />
        <Box title={d.ourSide.title} items={d.ourSide.items} highlight />
        <Arrow />
        <Box title={d.reaches.title} items={d.reaches.items} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="zk-card grid content-start gap-7 p-6 md:p-8">
          <div>
            <p className="text-[13px] font-medium text-zk-muted">What you get</p>
            <ul className="mt-3 grid gap-2.5 text-[15px] leading-snug text-zk-fg">
              {d.youGet.map((t) => <li key={t} className="flex gap-2.5"><Check className="mt-0.5 shrink-0 text-zk-ok" />{t}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-[13px] font-medium text-zk-muted">Setup, about ten minutes</p>
            <ol className="mt-3 grid gap-3 text-[15px] leading-snug text-zk-fg">
              {d.steps.map((t, i) => (
                <li key={t} className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white font-geist-mono text-[11.5px] font-semibold text-zk-bg">{i + 1}</span><span>{t}</span></li>
              ))}
            </ol>
          </div>
        </div>

        <Window title={`vaultmcp · ${code.title}`} className="min-w-0 self-start"
          right={<button type="button" onClick={copy} className="rounded-md bg-white/[.06] px-2.5 py-1 text-[12px] text-zk-muted ring-1 ring-inset ring-zk-line2 transition hover:text-zk-fg">{copied ? 'Copied' : 'Copy'}</button>}>
          {d.code.length > 1 && (
            <div role="tablist" aria-label="Snippet" className="flex gap-1 border-b border-zk-line p-2">
              {d.code.map((c, i) => (
                <button key={c.label} role="tab" type="button" aria-selected={tab === i} onClick={() => { setTab(i); trackDemo('code_tab', { language: c.label }) }}
                  className={cx('rounded-md px-3 py-1.5 text-[13px] transition', tab === i ? 'bg-white/[.08] text-zk-fg' : 'text-zk-muted hover:text-zk-fg')}>{c.label}</button>
              ))}
            </div>
          )}
          <pre className="overflow-x-auto p-5 font-geist-mono text-[12.5px] leading-6 text-zk-fg sm:p-6">
            <code>{code.body.split('\n').map((line, i) => (
              <span key={i} className={cx('block', /^\s*(#|\/\/)/.test(line) ? 'text-zk-dim' : '')}>{line || ' '}</span>
            ))}</code>
          </pre>
          <div className="border-t border-zk-line px-5 py-4 sm:px-6">
            <p className="text-[12.5px] text-zk-dim">Works with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {d.worksWith.map((w) => <li key={w} className="rounded-full bg-white/[.04] px-2.5 py-1 text-[12.5px] text-zk-muted ring-1 ring-inset ring-zk-line2">{w}</li>)}
            </ul>
          </div>
          <div className="flex flex-col items-stretch justify-between gap-3 border-t border-zk-line bg-white/[.02] px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <p className="text-[12.5px] text-zk-dim">Preview: names may change before launch.</p>
            <Button href="#beta" size="sm" data-cta="" onClick={() => trackDemo('delivery_request', { method: 'hosted' })}>Get early access</Button>
          </div>
        </Window>
      </div>
    </Section>
  )
}
