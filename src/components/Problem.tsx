import { Section, SectionHeading } from '../ui'
import type { ProblemItem } from '../types'

const env = [
  ['STRIPE_SECRET_KEY', 'sk_live_'], ['GITHUB_TOKEN', 'ghp_'], ['LINEAR_API_KEY', 'lin_api_'], ['SLACK_BOT_TOKEN', 'xoxb-'],
]

export function Problem({ problems }: { problems: ProblemItem[] }) {
  return (
    <Section id="problem" label="The problem">
      <div className="grid gap-14 md:grid-cols-[1fr_1.15fr] md:items-start">
        <div className="md:sticky md:top-28">
          <SectionHeading eyebrow="The problem" title="Every MCP server you run is a keyring left on the desk." />
          <div className="mt-10 overflow-hidden rounded-2xl bg-vm-deep text-left shadow-[0_30px_60px_-30px_rgba(8,42,33,.7)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[12.5px] text-white/50">
              <span className="font-jet">tool-server/.env</span><span>readable by any code the agent runs</span>
            </div>
            <pre className="overflow-x-auto px-5 py-4 font-jet text-[13px] leading-7 text-white/80">
              {env.map(([k, v]) => (
                <span key={k} className="block whitespace-nowrap">{k}=<span className="text-[#FF9B8A]">{v}••••••••••••</span></span>
              ))}
            </pre>
          </div>
        </div>
        <ol className="grid gap-4">
          {problems.map((p, i) => (
            <li key={p.title} className="vm-card grid grid-cols-[auto_1fr] gap-5 p-6 md:p-7">
              <span className="font-serif text-[32px] leading-none text-vm-brass">{['i', 'ii', 'iii', 'iv'][i]}</span>
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-vm-ink">{p.title}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-vm-muted">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
