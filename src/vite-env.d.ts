/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BETA_ENDPOINT?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Minimal shape of the claude.ai Artifact runtime used by the beta form. Absent everywhere else. */
interface ClaudeDocRef { set(data: Record<string, unknown>): Promise<unknown> }
interface ClaudeDb { doc(path: string): ClaudeDocRef }
interface ClaudeUser { id(): Promise<string> }
interface Window {
  claude?: { use(name: 'db'): Promise<ClaudeDb | null>; use(name: 'user'): Promise<ClaudeUser | null>; use(name: string): Promise<unknown> }
}
