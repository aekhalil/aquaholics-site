'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ShopAccessForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') || '/shop'
  const target = redirect.startsWith('/shop') ? redirect : '/shop'
  const [submitting, setSubmitting] = React.useState(false)
  const [slow, setSlow] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Prefetch the target /shop route while the user is typing, so the RSC
  // navigation + middleware check + products fetch is already warm by the
  // time they hit Enter. Removes ~1s of perceived wait on mobile.
  React.useEffect(() => {
    router.prefetch(target)
  }, [router, target])

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
      // router.push alone triggers a fresh RSC load of the target — the
      // previous router.refresh() on top of it was a redundant round trip
      // that added ~500ms for no benefit.
      router.push(target)
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
