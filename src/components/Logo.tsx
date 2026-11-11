export function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const c = dark ? '#E7C77E' : '#0F3D31'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <circle cx="14" cy="14" r="12.5" fill="none" stroke={c} strokeWidth="2" />
        <circle cx="14" cy="14" r="4.5" fill={c} />
        <path d="M14 1.5v5M14 21.5v5M1.5 14h5M21.5 14h5" stroke={c} strokeWidth="2" />
      </svg>
      <span className={`font-serif text-[23px] leading-none ${dark ? 'text-white' : 'text-vm-ink'}`}>VaultMCP</span>
    </span>
  )
}
