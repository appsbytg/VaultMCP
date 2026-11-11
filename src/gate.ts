import type { AgentId, Scenario } from './types'

/**
 * Demo-only matcher for the hero gate simulator: maps free text to the closest example
 * scenario for the selected agent. Nothing is sent anywhere.
 */
export function matchScenario(text: string, agent: AgentId, all: Scenario[]): Scenario {
  const t = text.toLowerCase()
  const mine = all.filter((s) => s.agent === agent)
  const pick = (pred: (s: Scenario) => boolean) => mine.find(pred)
  if (/(key|secret|token|password|env|credential|ignore (your|previous))/.test(t)) {
    return pick((s) => s.decision === 'injection') ?? pick((s) => s.decision === 'deny') ?? mine[0]!
  }
  if (/(refund|charge|delete|drop|push|main|upload|paste|send .* to|wire|pay)/.test(t)) {
    return pick((s) => s.decision === 'deny') ?? mine[0]!
  }
  return pick((s) => s.decision === 'allow') ?? mine[0]!
}
