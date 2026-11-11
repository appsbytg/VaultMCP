export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
        <rect x=".5" y=".5" width="25" height="25" rx="7" fill="#0F1424" stroke="#252E4A" />
        <circle cx="13" cy="13" r="7" fill="none" stroke="#EDF0F7" strokeWidth="2" />
        <circle cx="13" cy="13" r="2.4" fill="#FFB224" />
        <path d="M13 3.5v3M13 19.5v3M3.5 13h3M19.5 13h3" stroke="#EDF0F7" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-zk-fg">Vault<span className="text-zk-muted">MCP</span></span>
    </span>
  )
}
