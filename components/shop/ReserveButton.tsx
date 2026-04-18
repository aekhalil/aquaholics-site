'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  productId: string
  productName: string
  inStock: boolean
  stockCount?: number
}

export function ReserveButton({ productId, productName, inStock, stockCount }: Props) {
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [quantity, setQuantity] = React.useState(1)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const max = stockCount ?? 20

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/shop/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          quantity,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          message: message.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Reserve failed.')
      toast({
        title: 'Hold requested',
        description: `Nick will reach out about ${productName}.`,
        variant: 'success' as never,
      })
      setOpen(false)
      setMessage('')
    } catch (err) {
      toast({
        title: 'Could not submit',
        description: err instanceof Error ? err.message : 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (!inStock) {
    return (
      <Button disabled variant="navy" size="lg" className="w-full">
        Currently unavailable
      </Button>
    )
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} variant="navy" size="lg" className="w-full">
        Ask Nick to hold this
      </Button>
    )
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-gray-200 bg-gray-50 p-5 space-y-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="hold-name" className="block text-sm font-medium text-navy mb-1.5">
            Your name
          </label>
          <Input
            id="hold-name"
            name="name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hold-phone" className="block text-sm font-medium text-navy mb-1.5">
            Phone
          </label>
          <Input
            id="hold-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="hold-email" className="block text-sm font-medium text-navy mb-1.5">
          Email <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <Input
          id="hold-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">Quantity</label>
        <div className="inline-flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 hover:bg-gray-100 font-bold"
            aria-label="Decrease"
          >
            −
          </button>
          <span className="px-4 py-2 min-w-[48px] text-center font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(max, q + 1))}
            className="px-4 py-2 hover:bg-gray-100 font-bold"
            aria-label="Increase"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="hold-note" className="block text-sm font-medium text-navy mb-1.5">
          Anything Nick should know?{' '}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="hold-note"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          maxLength={1000}
          placeholder="Pickup vs next service visit, tank compatibility, etc."
          className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <p className="text-xs text-gray-500">
        This isn&apos;t a charge — Nick will text or email to confirm pricing and arrange pickup or
        a service-visit drop-off.
      </p>

      <div className="flex gap-2">
        <Button type="submit" disabled={submitting} variant="navy" className="flex-1">
          {submitting ? 'Sending…' : 'Send hold request'}
        </Button>
        <Button
          type="button"
          onClick={() => setOpen(false)}
          disabled={submitting}
          variant="ghost"
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
