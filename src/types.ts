export interface NavLink { label: string; href: string }

export type AgentId = 'support' | 'release' | 'finance'
export interface Agent { id: AgentId; name: string; role: string; tools: string[]; grant: string }

export type Decision = 'allow' | 'deny' | 'injection'
export interface Scenario {
  id: string
  agent: AgentId
  label: string
  /** What the agent asked for, in its own words */
  request: string
  tool: string
  method: string
  path: string
  decision: Decision
  rule: string
  result: string
}

export interface GateEvent { who: string; tool: string; method: string; path: string; ok: boolean; why?: string }
export interface Outcome { title: string; body: string; proof: string }
export interface Step { title: string; body: string }
export interface Stopped { when: string; agent: string; what: string; why: string }

export type Support = 'yes' | 'no' | 'partly' | 'varies'
export interface Alternative { name: string; note: string }
export type CompareRow = [label: string, values: [Support, Support, Support, Support]]

export interface FooterColumn { title: string; links: Array<[label: string, href: string]> }
export interface FooterContent { tagline: string; columns: FooterColumn[] }

export interface Delivery {
  name: string
  summary: string
  youGet: string[]
  steps: string[]
  /** What runs where: shown as a three-part diagram */
  yourSide: { title: string; items: string[] }
  ourSide: { title: string; items: string[] }
  reaches: { title: string; items: string[] }
  code: Array<{ label: string; title: string; body: string }>
  worksWith: string[]
}
