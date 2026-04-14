'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export function NewsletterBanner() {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Subscribe failed')
      }
    } catch {
      toast({ title: 'Oops!', description: 'Something went wrong. Please try again.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-navy" aria-label="Newsletter signup">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 rounded-full bg-aqua/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-7 w-7 text-aqua" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Get Restock Alerts + Reef Tips
          </h2>
          <p className="text-white/60 mb-8">
            New livestock every Thursday. Be first to know — plus get our free Beginner&apos;s Reef
            Keeping Guide when you subscribe.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-emerald-400">
              <Check className="h-6 w-6" />
              <span className="font-semibold text-lg">You&apos;re on the list! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-aqua flex-1"
                aria-label="Email address"
              />
              <Button type="submit" variant="gold" disabled={loading} className="flex-shrink-0">
                {loading ? 'Subscribing…' : 'Subscribe Free'}
              </Button>
            </form>
          )}

          <p className="text-white/30 text-xs mt-4">
            No spam. Unsubscribe any time. We send 1–2 emails per week.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
