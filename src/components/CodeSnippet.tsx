import { useState, type ReactNode } from 'react'
import { trackDemo } from '../shared/analytics'
import { cx } from '../shared/cx'
import { Section, SectionHeading, Window } from '../ui'

type Tab = 'MCP config' | 'Python' | 'TypeScript'
const K = ({ children }: { children: ReactNode }) => <span className="text-zk-sky">{children}</span>
const S = ({ children }: { children: ReactNode }) => <span className="text-zk-ok">{children}</span>
const C = ({ children }: { children: ReactNode }) => <span className="text-zk-dim">{children}</span>

const snippets: Record<Tab, ReactNode> = {
  'MCP config': (
    <>
      {'{'}{'\n'}{'  '}<S>"mcpServers"</S>: {'{'}{'\n'}{'    '}<S>"vault"</S>: {'{'}{'\n'}
      {'      '}<S>"url"</S>: <S>"$VAULTMCP_URL"</S>,{'\n'}
      {'      '}<S>"headers"</S>: {'{'} <S>"Authorization"</S>: <S>"Bearer $AGENT_TOKEN"</S> {'}'}{'\n'}
      {'    '}{'}'}{'\n'}{'  '}{'}'}{'\n'}{'}'}{'\n'}
      <C>{'// one entry replaces every per-tool server and its keys'}</C>
    </>
  ),
  Python: (
    <>
      <K>from</K> mcp.client.streamable_http <K>import</K> streamablehttp_client{'\n\n'}
      <K>async with</K> streamablehttp_client({'\n'}{'    '}VAULTMCP_URL,{'\n'}
      {'    '}headers={'{'}<S>"Authorization"</S>: <S>f"Bearer {'{'}AGENT_TOKEN{'}'}"</S>{'}'},{'\n'}
      ) <K>as</K> (read, write, _):{'\n'}{'    '}<C># the agent sees only the tools its role allows</C>
    </>
  ),
  TypeScript: (
    <>
      <K>import</K> {'{'} StreamableHTTPClientTransport {'}'} <K>from</K>{'\n'}{'  '}<S>'@modelcontextprotocol/sdk/client/streamableHttp.js'</S>{'\n\n'}
      <K>const</K> transport = <K>new</K> StreamableHTTPClientTransport({'\n'}{'  '}<K>new</K> URL(VAULTMCP_URL),{'\n'}
      {'  '}{'{'} requestInit: {'{'} headers: {'{'} Authorization: <S>`Bearer ${'{'}AGENT_TOKEN{'}'}`</S> {'}'} {'}'} {'}'},{'\n'}){'\n'}
      <C>{'// no Stripe, GitHub or Linear keys anywhere in this process'}</C>
    </>
  ),
}

export function CodeSnippet() {
  const [tab, setTab] = useState<Tab>('MCP config')
  return (
    <Section id="code" label="Integration">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-14">
        <SectionHeading eyebrow="One endpoint" title="Swap a folder of keys for one address." lede="Any MCP-compatible client or agent framework connects to VaultMCP like any other server. The agent gets a token for its role, never a provider key." />
        <Window title="connect your agent" className="min-w-0">
          <div role="tablist" aria-label="Client" className="flex gap-1 overflow-x-auto border-b border-zk-line p-2">
            {(Object.keys(snippets) as Tab[]).map((t) => (
              <button key={t} role="tab" type="button" aria-selected={tab === t} onClick={() => { setTab(t); trackDemo('code_tab', { language: t }) }}
                className={cx('shrink-0 rounded-md px-3 py-1.5 text-[13px] transition', tab === t ? 'bg-white/[.08] text-zk-fg' : 'text-zk-muted hover:text-zk-fg')}>{t}</button>
            ))}
          </div>
          <pre className="overflow-x-auto p-5 font-geist-mono text-[12.5px] leading-7 text-zk-fg sm:p-6 sm:text-[13px]"><code>{snippets[tab]}</code></pre>
        </Window>
      </div>
    </Section>
  )
}
