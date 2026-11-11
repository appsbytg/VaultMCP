import { useState } from 'react'
import type { NavLink } from '../types'
import { useScrolled } from '../shared/hooks'
import { Container } from '../shared/Container'
import { cx } from '../shared/cx'
import { Button } from '../ui'
import { Logo } from './Logo'

export function Nav({ links }: { links: NavLink[] }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  return (
    <>
      <div aria-hidden className="fixed inset-x-0 top-0 z-50 bg-vm-paper" style={{ height: 'env(safe-area-inset-top, 0px)' }} />
      <header className={cx('sticky z-40 border-b transition-colors duration-300', scrolled ? 'border-vm-line bg-vm-paper/80 backdrop-blur-xl' : 'border-transparent')} style={{ top: 'env(safe-area-inset-top, 0px)' }}>
        <Container className="flex h-16 items-center gap-8">
          <a href="#top" aria-label="VaultMCP home"><Logo /></a>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 text-[14px] text-vm-muted">
              {links.map((l) => <li key={l.href}><a href={l.href} className="rounded-full px-3 py-2 transition hover:bg-vm-sunk hover:text-vm-ink">{l.label}</a></li>)}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button href="#beta" size="sm">Join the beta</Button>
            <button type="button" className="grid h-9 w-9 place-items-center rounded-full text-vm-muted ring-1 ring-inset ring-vm-line2 md:hidden" aria-expanded={open} aria-controls="vm-mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d={open ? 'M3 3l10 10M13 3L3 13' : 'M2 5h12M2 11h12'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </button>
          </div>
        </Container>
        {open && (
          <nav id="vm-mobile-nav" aria-label="Mobile" className="border-t border-vm-line bg-vm-paper md:hidden">
            <Container as="ul" className="grid py-3">
              {links.map((l) => <li key={l.href}><a onClick={() => setOpen(false)} href={l.href} className="block py-3 text-[15px] text-vm-muted">{l.label}</a></li>)}
            </Container>
          </nav>
        )}
      </header>
    </>
  )
}
