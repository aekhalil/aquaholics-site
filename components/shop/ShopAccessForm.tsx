'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ShopAccessForm() {
  const params = useSearchParams()
  const redirect = params.get('redirect') || '/shop'
  const target = redirect.startsWith('/shop') ? redirect : '/shop'
  const [submitting, setSubmitting] = React.useState(false)
  const [slow, setSlow] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSlow(false)
    setSubmitting(true)

    // Show "taking longer than usual" message after 5s
    const slowTimer = setTimeout(() => setSlow(true), 5000)

    try {
      const res = await fetch('/api/shop-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: String(new FormData(e.currentTarget).get('password') ?? '') }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Incorrect password.')
      // Hard navigation (not router.push) so the browser sends a fresh
      // request with the just-set SHOP_COOKIE and Next's router cache
      // cannot serve a stale redirect from when the user was unauthed.
      // A prior revision used router.push + a prefetched target; the
      // prefetch was captured pre-cookie and cached middleware's
      // redirect-to-/shop-access response, which left the button stuck
      // on "Checking…" because push silently resolved to the same URL.
      window.location.assign(target)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitting(false)
      setSlow(false)
    } finally {
      clearTimeout(slowTimer)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-navy mb-1.5">
          Access password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {slow && !error && (
        <p className="text-sm text-gray-500">
          Taking a moment to wake up — hang tight…
        </p>
      )}

      <Button type="submit" variant="navy" size="lg" disabled={submitting} className="w-full">
        {submitting ? 'Checking…' : 'Enter'}
      </Button>
    </form>
  )
}
