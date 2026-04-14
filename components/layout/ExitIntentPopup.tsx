'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

/**
 * Exit-intent popup — fires when the user's cursor leaves the viewport upward.
 * Uses localStorage to avoid repeat shows. Lead magnet: free coral care guide PDF.
 */
export function ExitIntentPopup() {
  const [visible, setVisible] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()
  const triggered = React.useRef(false)

  React.useEffect(() => {
    // Don't show if already dismissed this session
    if (typeof window !== 'undefined' && localStorage.getItem('exit_popup_dismissed')) return

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered.current) {
        triggered.current = true
        setVisible(true)
      }
    }
    // Small delay so it doesn't fire on page load scroll
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handler)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handler)
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
      if (res.ok) {
        toast({ title: 'Check your inbox!', description: 'Your free coral care guide is on its way.', variant: 'success' as never })
        dismiss()
      }
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try again.', variant: 'destructive' })
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
                  Wait — Free Coral Care Guide!
                </h2>
                <p className="text-white/80 text-sm">
                  Get our 20-page <strong>Beginner&apos;s Reef Keeping Guide</strong> + 10% off your
                  first livestock order.
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
                    {loading ? 'Sending…' : 'Send My Free Guide →'}
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
