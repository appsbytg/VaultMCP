import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Container } from './shared/Container'
import { cx } from './shared/cx'

type ButtonVariant = 'primary' | 'brass' | 'ghost' | 'ghostDark'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonBase = { variant?: ButtonVariant; size?: ButtonSize; className?: string; children: ReactNode }
type ButtonProps =
  | (ButtonBase & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBase>)
  | (ButtonBase & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBase>)

const sizes: Record<ButtonSize, string> = { sm: 'h-9 px-4 text-[13.5px]', md: 'h-11 px-5 text-[15px]', lg: 'h-12 px-6 text-[15.5px]' }
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-vm-green text-white hover:bg-vm-deep shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_8px_24px_-10px_rgba(15,61,49,.7)]',
  brass: 'bg-vm-brasslt text-vm-deep hover:bg-[#EFD495] shadow-[inset_0_1px_0_rgba(255,255,255,.5)]',
  ghost: 'bg-vm-card text-vm-ink ring-1 ring-inset ring-vm-line2 hover:bg-vm-sunk',
  ghostDark: 'bg-white/5 text-white ring-1 ring-inset ring-white/20 hover:bg-white/10',
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

interface SectionProps { id?: string; label?: string; className?: string; innerClassName?: string; children: ReactNode }

export function Section({ id, label, className, innerClassName, children }: SectionProps) {
  return (
    <section id={id} aria-label={label} className={cx('relative overflow-x-clip', className)}>
      <Container className={cx('py-24 md:py-32', innerClassName)}>{children}</Container>
    </section>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionHeading({ eyebrow, title, lede, align = 'left', dark = false, className }: SectionHeadingProps) {
  return (
    <div className={cx('max-w-[46rem]', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cx('mb-5 inline-flex items-center gap-2 text-[14px] font-medium', dark ? 'text-vm-brasslt' : 'text-vm-brass')}>
          <span className={cx('h-px w-6', dark ? 'bg-vm-brasslt' : 'bg-vm-brass')} aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className={cx('font-serif text-[clamp(2.3rem,5vw,3.9rem)] font-normal leading-[1.02] tracking-[-0.015em]', dark ? 'text-white' : 'text-vm-ink')}>{title}</h2>
      {lede && <p className={cx('mt-5 text-[17.5px] leading-relaxed', dark ? 'text-white/65' : 'text-vm-muted')}>{lede}</p>}
    </div>
  )
}

export const Check = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 16 16" className={cx('h-4 w-4', className)}><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const Cross = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 16 16" className={cx('h-4 w-4', className)}><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
)

export function Verdict({ ok, className }: { ok: boolean; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-jet text-[11px] font-medium', ok ? 'bg-vm-allow/10 text-vm-allow' : 'bg-vm-deny/10 text-vm-deny', className)}>
      {ok ? <Check className="h-3 w-3" /> : <Cross className="h-3 w-3" />}{ok ? 'allow' : 'deny'}
    </span>
  )
}
