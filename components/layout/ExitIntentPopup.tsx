'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

/**
 * Exit-intent popup.
 * - Desktop: fires when the cursor leaves the viewport upward (classic exit intent).
 * - Touch devices (no cursor): fires after ~70% scroll depth, or after 45s if the
 *   user hangs around without scrolling that far. Touch devices don't emit
 *   `mouseleave`, so without this branch the popup never shows on mobile.
 * Uses localStorage to avoid repeat shows.
 */
export function ExitIntentPopup() {
  const [visible, setVisible] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()
  const triggered = React.useRef(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('exit_popup_dismissed')) return

    const trigger = () => {
      if (triggered.current) return
      triggered.current = true
      setVisible(true)
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches

    if (isTouch) {
      const onScroll = () => {
        const doc = document.documentElement
        const depth = (window.scrollY + window.innerHeight) / doc.scrollHeight
        if (depth >= 0.7) trigger()
      }
      // Wait 8s before wiring scroll (avoid firing during initial reading).
      const scrollArm = setTimeout(() => {
        window.addEventListener('scroll', onScroll, { passive: true })
      }, 8000)
      // Fallback: 45s dwell without scroll-depth trigger.
      const dwellTimer = setTimeout(trigger, 45000)
      return () => {
        clearTimeout(scrollArm)
        clearTimeout(dwellTimer)
        window.removeEventListener('scroll', onScroll)
      }
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) trigger()
    }
    const armTimer = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave)
    }, 5000)
    return () => {
      clearTimeout(armTimer)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('exit_popup_dismissed', '1')
  }

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
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        toast({
          title: 'Check your inbox',
          description: data.passwordSent
            ? 'Your livestock access password is on its way.'
            : "You're on the list — Nick will reach out with access details.",
          variant: 'success' as never,
        })
        dismiss()
      } else {
        toast({
          title: 'Could not subscribe',
          description: data.error ?? 'Please try again.',
          variant: 'destructive',
        })
      }
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-label="Special offer"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto">
              {/* Header gradient */}
              <div className="bg-ocean-gradient p-8 text-white text-center">
                <div className="w-16 h-16 rounded-full bg-aqua/20 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-aqua-200" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2">
                  Wait — want livestock access?
                </h2>
                <p className="text-white/80 text-sm">
                  Drop your email and we&apos;ll send the <strong>shop access password</strong> plus a
                  heads-up the next time new corals, fish, or inverts land.
                </p>
              </div>

              {/* Form */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="exit-email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="exit-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? 'Sending…' : 'Send Me The Password →'}
                  </Button>
                </form>
                <button
                  onClick={dismiss}
                  className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
                >
                  No thanks, I&apos;ll figure it out on my own
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
