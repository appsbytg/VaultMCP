import { useState, type ReactNode } from 'react'
import { cx } from '../shared/cx'
import { Section, SectionHeading } from '../ui'

type Tab = 'MCP config' | 'Python' | 'TypeScript'

const K = ({ children }: { children: ReactNode }) => <span className="text-[#E7C77E]">{children}</span>
const S = ({ children }: { children: ReactNode }) => <span className="text-[#9FE8C4]">{children}</span>
const C = ({ children }: { children: ReactNode }) => <span className="text-white/40">{children}</span>

const snippets: Record<Tab, ReactNode> = {
  'MCP config': (
    <>
      {'{'}{'\n'}
      {'  '}<S>"mcpServers"</S>: {'{'}{'\n'}
      {'    '}<S>"vault"</S>: {'{'}{'\n'}
      {'      '}<S>"url"</S>: <S>"$VAULTMCP_URL"</S>,{'\n'}
      {'      '}<S>"headers"</S>: {'{'} <S>"Authorization"</S>: <S>"Bearer $AGENT_TOKEN"</S> {'}'}{'\n'}
      {'    '}{'}'}{'\n'}
      {'  '}{'}'}{'\n'}
      {'}'}{'\n'}
      <C>{'// one entry replaces every per-tool server and its keys'}</C>
    </>
  ),
  Python: (
    <>
      <K>from</K> mcp.client.streamable_http <K>import</K> streamablehttp_client{'\n\n'}
      <K>async with</K> streamablehttp_client({'\n'}
      {'    '}VAULTMCP_URL,{'\n'}
      {'    '}headers={'{'}<S>"Authorization"</S>: <S>f"Bearer {'{'}AGENT_TOKEN{'}'}"</S>{'}'},{'\n'}
      ) <K>as</K> (read, write, _):{'\n'}
      {'    '}<C># the agent sees only the tools its role allows</C>
    </>
  ),
  TypeScript: (
    <>
      <K>import</K> {'{'} StreamableHTTPClientTransport {'}'} <K>from</K> <S>'@modelcontextprotocol/sdk/client/streamableHttp.js'</S>{'\n\n'}
      <K>const</K> transport = <K>new</K> StreamableHTTPClientTransport({'\n'}
      {'  '}<K>new</K> URL(VAULTMCP_URL),{'\n'}
      {'  '}{'{'} requestInit: {'{'} headers: {'{'} Authorization: <S>`Bearer ${'{'}AGENT_TOKEN{'}'}`</S> {'}'} {'}'} {'}'},{'\n'}
      ){'\n'}
      <C>{'// no Stripe, GitHub or Linear keys anywhere in this process'}</C>
    </>
  ),
}

export function CodeSnippet() {
  const [tab, setTab] = useState<Tab>('MCP config')
  return (
    <Section id="code" label="Integration" className="border-t border-vm-line">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center">
        <SectionHeading eyebrow="One endpoint" title="Swap a folder of keys for one address." lede="Any MCP-compatible client or agent framework connects to VaultMCP like any other server. The agent gets a token for its role, never a provider key." />
        <div className="min-w-0 overflow-hidden rounded-2xl bg-vm-deep shadow-[0_30px_70px_-30px_rgba(8,42,33,.75)]">
          <div role="tablist" aria-label="Client" className="flex gap-1 border-b border-white/10 p-2">
            {(Object.keys(snippets) as Tab[]).map((t) => (
              <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => setTab(t)}
                className={cx('rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition', tab === t ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white')}>{t}</button>
            ))}
          </div>
          <pre className="overflow-x-auto p-6 font-jet text-[13px] leading-7 text-white/90"><code>{snippets[tab]}</code></pre>
        </div>
      </div>
    </Section>
  )
}
