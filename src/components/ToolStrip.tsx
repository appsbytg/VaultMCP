import { useState } from 'react'
import { Container } from '../shared/Container'
import { Marquee } from '../shared/Marquee'
import type { Tool } from '../types'

// Simple Icons, pinned so the icons can't change under us. Black SVGs, tinted below to match the theme.
const ICONS = 'https://cdn.jsdelivr.net/npm/simple-icons@16.35.0/icons'

function ToolBadge({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false)
  return (
    <span className="group inline-flex items-center gap-2.5 text-zk-dim transition-colors hover:text-zk-muted">
      {!failed && (
        <img
          src={`${ICONS}/${tool.icon}.svg`}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-5 w-5 shrink-0 opacity-50 invert transition-opacity group-hover:opacity-80"
        />
      )}
      <span className="text-[17px] font-medium tracking-[-0.01em]">{tool.name}</span>
    </span>
  )
}

export function ToolStrip({ items }: { items: Tool[] }) {
  return (
    <section aria-label="Tools you can connect" className="border-t border-zk-line">
      <Container className="grid items-center gap-6 py-10 md:grid-cols-[220px_1fr]">
        <p className="text-[14px] leading-snug text-zk-muted">Put a gate in front of the tools your agents already use</p>
        <Marquee items={items.map((t) => <ToolBadge key={t.name} tool={t} />)} fadeFrom="from-zk-bg" />
      </Container>
      <p className="sr-only">{items.map((t) => t.name).join(', ')}</p>
    </section>
  )
}
