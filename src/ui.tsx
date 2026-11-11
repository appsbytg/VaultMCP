import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Container } from './shared/Container'
import { cx } from './shared/cx'

type ButtonVariant = 'primary' | 'cobalt' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonBase = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode }
type ButtonProps =
  | (ButtonBase & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBase>)
  | (ButtonBase & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBase>)

const sizes: Record<ButtonSize, string> = { sm: 'h-9 px-4 text-[13.5px]', md: 'h-11 px-5 text-[15px]', lg: 'h-12 px-6 text-[15.5px]' }
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-white text-zk-bg hover:bg-[#E6E9F2] shadow-[0_0_0_1px_rgba(255,255,255,.1),0_8px_30px_-8px_rgba(77,107,255,.6)]',
  cobalt: 'bg-zk-cobalt text-white hover:bg-[#5E7AFF] shadow-[0_8px_30px_-10px_rgba(77,107,255,.9)]',
  ghost: 'bg-white/[.03] text-zk-fg ring-1 ring-inset ring-zk-line2 hover:bg-white/[.07]',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  const cls = cx(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
    sizes[size], variants[variant], className,
  )
  if (rest.href !== undefined) {
    return <a className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>
  }
  return <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx('inline-flex max-w-full items-center gap-2 rounded-full border border-zk-line2 bg-zk-panel/80 px-1 py-1 pr-3.5 text-left text-[12.5px] text-zk-muted backdrop-blur sm:text-[13px]', className)}>
      {children}
    </span>
  )
}

interface SectionProps {
  id?: string
  label?: string
  className?: string
  innerClassName?: string
  rails?: boolean
  children: ReactNode
}

/** A section framed by the page's vertical rails, with plus marks where lines cross. */
export function Section({ id, className, innerClassName, children, rails = true, label }: SectionProps) {
  return (
    <section id={id} aria-label={label} className={cx('relative overflow-x-clip border-t border-zk-line', className)}>
      <Container className={cx('relative', rails && 'zk-rails')}>
        {rails && (
          <>
            <Plus className="-left-[5px] -top-[5px]" />
            <Plus className="-right-[5px] -top-[5px]" />
          </>
        )}
        <div className={cx('py-24 md:py-32', innerClassName)}>{children}</div>
      </Container>
    </section>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg aria-hidden width="11" height="11" viewBox="0 0 11 11" className={cx('absolute z-10 hidden text-zk-dim md:block', className)}>
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, lede, align = 'left', className }: SectionHeadingProps) {
  return (
    <div className={cx('max-w-[44rem]', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="mb-4 font-geist-mono text-[13px] text-zk-sky">{eyebrow}</p>}
      <h2 className="zk-gradient-text text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.04] tracking-tightest">{title}</h2>
      {lede && <p className="mt-5 text-[17.5px] leading-relaxed text-zk-muted">{lede}</p>}
    </div>
  )
}

interface WindowProps { title: string; right?: ReactNode; className?: string; children: ReactNode }

/** App-window chrome used around product mockups. */
export function Window({ title, right, className, children }: WindowProps) {
  return (
    <div className={cx('zk-card overflow-hidden', className)}>
      <div className="flex items-center gap-3 border-b border-zk-line bg-white/[.015] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-zk-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-zk-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-zk-line2" />
        </div>
        <span className="truncate font-geist-mono text-[12px] text-zk-dim">{title}</span>
        <span className="ml-auto">{right}</span>
      </div>
      {children}
    </div>
  )
}

export function SealBadge({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <span className={cx('inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-zk-amber/10 px-2.5 py-1 font-geist-mono text-[11.5px] text-zk-amber ring-1 ring-inset ring-zk-amber/25', className)}>
      <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-zk-amber motion-reduce:animate-none" />
      {children ?? 'sealed · 0 keys'}
    </span>
  )
}

export const Check = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 16 16" className={cx('h-4 w-4', className)}><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const Cross = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 16 16" className={cx('h-4 w-4', className)}><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
)

export function Verdict({ ok, label, className }: { ok: boolean; label?: string; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-geist-mono text-[11px]', ok ? 'bg-zk-ok/10 text-zk-ok' : 'bg-zk-bad/10 text-zk-bad', className)}>
      {ok ? <Check className="h-3 w-3" /> : <Cross className="h-3 w-3" />}{label ?? (ok ? 'allow' : 'deny')}
    </span>
  )
}

/** Small range slider in the ZeroKey style. */
export function Slider({ id, label, value, min, max, step = 1, format = String, onChange }: {
  id: string; label: string; value: number; min: number; max: number; step?: number; format?: (n: number) => string; onChange: (n: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14px] text-zk-muted">{label}</label>
        <output htmlFor={id} className="font-geist-mono text-[15px] tabular-nums text-zk-fg">{format(value)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="zk-range mt-3 w-full" style={{ background: `linear-gradient(to right, #4D6BFF ${pct}%, #1A2136 ${pct}%)` }} />
    </div>
  )
}
