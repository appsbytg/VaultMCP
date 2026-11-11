import { useState, type FormEvent } from 'react'
import { submitBetaSignup, type BetaRecord } from './betaSignup'
import { cx } from './cx'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type BetaField =
  | { id: string; label: string; type: 'text'; placeholder?: string; autoComplete?: string }
  | { id: string; label: string; type: 'select'; options: string[] }

export interface BetaFormClasses {
  form?: string
  grid?: string
  label?: string
  input?: string
  button?: string
  ok?: string
  error?: string
  footnote?: string
}

interface BetaFormProps {
  product: string
  fields?: BetaField[]
  classes?: BetaFormClasses
  submitLabel?: string
  footnote?: string
}

type Status = 'idle' | 'sending' | 'done' | 'error'

/** Beta signup form. `fields` describes the extra inputs; `classes` themes it. */
export function BetaForm({ product, fields = [], classes = {}, submitLabel = 'Request beta access', footnote }: BetaFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const slug = product.toLowerCase().replace(/\W+/g, '-')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const form = new FormData(formEl)
    const value = String(form.get('email') ?? '').trim()
    if (!EMAIL.test(value)) {
      setStatus('error')
      setMessage('Enter a work email address, like you@company.com.')
      formEl.querySelector<HTMLInputElement>('[name=email]')?.focus()
      return
    }
    setStatus('sending')
    setMessage('')
    try {
      const rec: BetaRecord = { product, email: value }
      fields.forEach((f) => { rec[f.id] = String(form.get(f.id) ?? '').trim() })
      await submitBetaSignup(rec)
      setStatus('done')
      setMessage(`You’re on the list. We’ll email ${value} when a beta slot opens.`)
    } catch {
      setStatus('error')
      setMessage('We couldn’t save your request from this page, so nothing was sent. Try again while signed in, or contact the team directly.')
    }
  }

  const done = status === 'done'
  return (
    <form noValidate onSubmit={onSubmit} className={classes.form}>
      <label htmlFor={`${slug}-email`} className={classes.label}>
        Work email
        <input
          id={`${slug}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
          disabled={done}
          required
        />
      </label>
      <div className={classes.grid}>
        {fields.map((f) => (
          <label key={f.id} htmlFor={`${slug}-${f.id}`} className={classes.label}>
            {f.label}
            {f.type === 'select' ? (
              <select id={`${slug}-${f.id}`} name={f.id} className={classes.input} disabled={done}>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <input
                id={`${slug}-${f.id}`}
                name={f.id}
                type="text"
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                className={classes.input}
                disabled={done}
              />
            )}
          </label>
        ))}
      </div>
      <button type="submit" className={classes.button} disabled={status === 'sending' || done}>
        {done ? 'Request sent' : status === 'sending' ? 'Sending request…' : submitLabel}
      </button>
      <div role="status" aria-live="polite">
        {message && <p className={cx(done ? classes.ok : classes.error)}>{message}</p>}
      </div>
      {footnote && <p className={classes.footnote}>{footnote}</p>}
    </form>
  )
}
