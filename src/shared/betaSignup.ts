/**
 * Where beta requests go.
 *
 * 1. If VITE_BETA_ENDPOINT is set at build time, the request is POSTed there as JSON.
 * 2. Otherwise, when the page runs as a claude.ai Artifact with the `db` capability,
 *    it is saved to that artifact's private store.
 * 3. Otherwise the call rejects with code "no_destination" and the form says nothing was sent.
 */
export type BetaRecord = { product: string; email: string } & Record<string, string>

export class SignupError extends Error {
  constructor(public code: string) {
    super(code)
  }
}

type Caps = [ClaudeDb | null, ClaudeUser | null]
let capsPromise: Promise<Caps> | null = null

function claudeCaps(): Promise<Caps> {
  if (capsPromise) return capsPromise
  const claude = typeof window !== 'undefined' ? window.claude : undefined
  capsPromise = claude
    ? Promise.race<Caps>([
        Promise.all([claude.use('db'), claude.use('user')]),
        new Promise<Caps>((resolve) => setTimeout(() => resolve([null, null]), 10_000)),
      ]).catch((): Caps => [null, null])
    : Promise.resolve<Caps>([null, null])
  return capsPromise
}
if (typeof window !== 'undefined') void claudeCaps()

export async function submitBetaSignup(record: BetaRecord): Promise<void> {
  const payload = { ...record, at: new Date().toISOString() }
  const endpoint = import.meta.env.VITE_BETA_ENDPOINT
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new SignupError(`http_${res.status}`)
    return
  }
  const [db, user] = await claudeCaps()
  if (db && user) {
    const id = await user.id()
    await db.doc(`signups/${id}`).set(payload)
    return
  }
  throw new SignupError('no_destination')
}
