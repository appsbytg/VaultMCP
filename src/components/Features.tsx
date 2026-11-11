import { cx } from '../shared/cx'
import { Section, SectionHeading } from '../ui'

type IconName = 'lock' | 'host' | 'log' | 'clock' | 'plug' | 'roles'
interface Feature { icon: IconName; title: string; body: string; wide?: boolean }

const paths: Record<IconName, string> = {
  lock: 'M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5z',
  host: 'M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01',
  log: 'M5 6h14M5 12h10M5 18h12',
  clock: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2',
  plug: 'M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0zM12 16v5',
  roles: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M21 20a5 5 0 0 0-4-4.9',
}
const items: Feature[] = [
  { icon: 'lock', title: 'Keys never enter the tool’s environment', body: 'Tool servers run with no secrets loaded. Credentials stay sealed with VaultMCP and are applied only to calls your policy allows, so there is nothing to read, print or leak.', wide: true },
  { icon: 'host', title: 'Hosted tool servers', body: 'Deploy any MCP server into an isolated environment. Idle servers sleep and cost almost nothing.' },
  { icon: 'log', title: 'Per-call audit trail', body: 'Who called which tool, with what, and what came back. Exportable for security reviews and the EU AI Act.' },
  { icon: 'clock', title: 'Time-limited grants', body: 'Give an agent write access for one task and twenty minutes. It ends by itself.' },
  { icon: 'plug', title: 'One endpoint for every client', body: 'Point any MCP-compatible agent at one URL. It sees only the tools its role allows.' },
  { icon: 'roles', title: 'Roles for agents and teams', body: 'Group tools and rules by role, so a support agent and a release agent see different worlds.' },
]

export function Features() {
  return (
    <Section id="features" label="Features">
      <SectionHeading eyebrow="Features" title="Host, govern and audit every tool your agents use." />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {items.map((f) => (
          <article key={f.title} className={cx('vm-card flex flex-col p-7', f.wide && 'relative overflow-hidden bg-vm-deep text-white md:col-span-2 md:row-span-2 md:p-10')}>
            <span className={cx('grid h-11 w-11 place-items-center rounded-xl', f.wide ? 'bg-white/10 text-vm-brasslt' : 'bg-vm-sunk text-vm-green')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={paths[f.icon]} /></svg>
            </span>
            <h3 className={cx('mt-6 font-semibold tracking-[-0.01em]', f.wide ? 'max-w-[18ch] font-serif text-[clamp(2rem,3.4vw,2.8rem)] font-normal leading-[1.05]' : 'text-[18px] text-vm-ink')}>{f.title}</h3>
            <p className={cx('mt-3 leading-relaxed', f.wide ? 'max-w-[34rem] text-[16.5px] text-white/65' : 'text-[15px] text-vm-muted')}>{f.body}</p>
            {f.wide && (
              <div className="mt-auto pt-10">
                <div className="grid gap-2 rounded-xl border border-white/10 bg-black/20 p-4 font-jet text-[12.5px] sm:grid-cols-2">
                  <p className="text-white/45">tool environment</p><p className="text-white/45">VaultMCP vault</p>
                  <p className="text-[#9FE8C4]">STRIPE_SECRET_KEY — not set</p><p className="text-vm-brasslt">stripe · sealed</p>
                  <p className="text-[#9FE8C4]">GITHUB_TOKEN — not set</p><p className="text-vm-brasslt">github · sealed</p>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}
