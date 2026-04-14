'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Zod schema for the complete form ────────────────────────────────────────
const quoteSchema = z.object({
  tankSize: z.string().min(1, 'Please select a tank size'),
  waterType: z.enum(['saltwater', 'freshwater', 'brackish']),
  serviceType: z.string().min(1, 'Please select a service type'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  city: z.string().min(1, 'City is required'),
  message: z.string().optional(),
  hearAbout: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

// ── Step definitions ─────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Tank Details' },
  { id: 2, label: 'Service Type' },
  { id: 3, label: 'Budget & Timeline' },
  { id: 4, label: 'Your Info' },
]

const TANK_SIZES = [
  { value: 'nano', label: 'Nano (< 30 gal)', emoji: '🐠' },
  { value: 'small', label: 'Small (30–75 gal)', emoji: '🐡' },
  { value: 'medium', label: 'Medium (75–150 gal)', emoji: '🦈' },
  { value: 'large', label: 'Large (150–300 gal)', emoji: '🐋' },
  { value: 'xlarge', label: 'XL (300–600 gal)', emoji: '🌊' },
  { value: 'xxlarge', label: 'XXL (600+ gal)', emoji: '🏊' },
]

const SERVICE_TYPES = [
  { value: 'installation', label: 'New Installation', desc: 'Design & build a new tank from scratch' },
  { value: 'commercial', label: 'Commercial Project', desc: 'Office, hotel, restaurant, or large-scale build' },
  { value: 'maintenance', label: 'Maintenance Plan', desc: 'Recurring weekly or bi-weekly service' },
  { value: 'aquascaping', label: 'Aquascaping / Redesign', desc: 'Transform your existing tank' },
  { value: 'relocation', label: 'Tank Relocation', desc: 'Safe move of an existing system' },
  { value: 'emergency', label: 'Emergency Service', desc: 'Urgent tank issue — need help ASAP' },
  { value: 'livestock', label: 'Livestock / Equipment', desc: 'I want to buy corals, fish, or gear' },
  { value: 'consultation', label: 'Consultation Only', desc: 'Advice and guidance for my setup' },
]

const BUDGETS = [
  { value: 'under1k', label: 'Under $1,000' },
  { value: '1k-3k', label: '$1,000 – $3,000' },
  { value: '3k-7k', label: '$3,000 – $7,000' },
  { value: '7k-15k', label: '$7,000 – $15,000' },
  { value: '15k-50k', label: '$15,000 – $50,000' },
  { value: 'over50k', label: '$50,000+ (commercial)' },
  { value: 'unsure', label: "I'm not sure yet" },
]

const TIMELINES = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1month', label: 'Within 1 month' },
  { value: '3months', label: 'Within 3 months' },
  { value: '6months', label: 'Within 6 months' },
  { value: 'flexible', label: 'Flexible / Just planning' },
]

// ── Option button component ──────────────────────────────────────────────────
function OptionButton({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative w-full text-left p-4 rounded-xl border-2 transition-all duration-150',
        selected
          ? 'border-aqua bg-aqua/5 text-navy'
          : 'border-gray-200 hover:border-aqua/50 hover:bg-gray-50 text-gray-700',
        className
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-aqua flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </span>
      )}
      {children}
    </button>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export function QuoteForm() {
  const [step, setStep] = React.useState(1)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      waterType: 'saltwater',
    },
  })

  const watchedValues = watch()

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  // Validate current step before advancing
  const canAdvance = () => {
    if (step === 1) return !!watchedValues.tankSize && !!watchedValues.waterType
    if (step === 2) return !!watchedValues.serviceType
    if (step === 3) return !!watchedValues.budget
    return true
  }

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'quote_form' }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or call us directly at (561) 388-7262.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-emerald-500" />
        </div>
        <h2 className="font-display text-3xl font-bold text-navy mb-3">
          We&apos;ve Got Your Request!
        </h2>
        <p className="text-gray-500 text-lg mb-6">
          Expect a personalised proposal in your inbox within{' '}
          <strong className="text-navy">24 business hours</strong>. If you need immediate
          assistance, call us at{' '}
          <a href="tel:+15613887262" className="text-aqua font-semibold">
            (561) 388-7262
          </a>
          .
        </p>
        <div className="bg-gray-50 rounded-2xl p-6 text-left">
          <h3 className="font-semibold text-navy mb-2">What happens next?</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2"><span className="text-aqua font-bold">1.</span> Our team reviews your request and prepares a custom proposal</li>
            <li className="flex gap-2"><span className="text-aqua font-bold">2.</span> You receive an email with pricing and next steps within 24 hours</li>
            <li className="flex gap-2"><span className="text-aqua font-bold">3.</span> We schedule a free in-person or virtual consultation at your convenience</li>
          </ol>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="px-8 pt-8">
        <div className="flex items-center gap-2 mb-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all',
                  step > s.id
                    ? 'bg-emerald-500 text-white'
                    : step === s.id
                    ? 'bg-aqua text-white'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {step > s.id ? <Check className="h-4 w-4" /> : s.id}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-1 rounded-full transition-all',
                    step > s.id ? 'bg-emerald-500' : 'bg-gray-100'
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Step {step} of {STEPS.length} — <span className="text-navy font-medium">{STEPS[step - 1].label}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Tank Details ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-display text-2xl font-bold text-navy mb-1">About Your Tank</h2>
                <p className="text-gray-500 mb-6">Tell us about the system you have or want.</p>

                <div className="mb-6">
                  <Label className="text-navy font-semibold mb-3 block">Tank Size</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TANK_SIZES.map((size) => (
                      <OptionButton
                        key={size.value}
                        selected={watchedValues.tankSize === size.value}
                        onClick={() => setValue('tankSize', size.value)}
                      >
                        <span className="text-2xl block mb-1">{size.emoji}</span>
                        <span className="font-medium text-sm">{size.label}</span>
                      </OptionButton>
                    ))}
                  </div>
                  {errors.tankSize && (
                    <p className="text-red-500 text-sm mt-2">{errors.tankSize.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-navy font-semibold mb-3 block">Water Type</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['saltwater', 'freshwater', 'brackish'] as const).map((type) => (
                      <OptionButton
                        key={type}
                        selected={watchedValues.waterType === type}
                        onClick={() => setValue('waterType', type)}
                      >
                        <span className="font-medium text-sm capitalize">{type}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Service Type ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-display text-2xl font-bold text-navy mb-1">What Do You Need?</h2>
                <p className="text-gray-500 mb-6">Select the service that best describes your situation.</p>
                <div className="space-y-3">
                  {SERVICE_TYPES.map((svc) => (
                    <OptionButton
                      key={svc.value}
                      selected={watchedValues.serviceType === svc.value}
                      onClick={() => setValue('serviceType', svc.value)}
                    >
                      <span className="font-semibold text-sm block">{svc.label}</span>
                      <span className="text-xs text-gray-500">{svc.desc}</span>
                    </OptionButton>
                  ))}
                </div>
                {errors.serviceType && (
                  <p className="text-red-500 text-sm mt-2">{errors.serviceType.message}</p>
                )}
              </motion.div>
            )}

            {/* ── Step 3: Budget & Timeline ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-display text-2xl font-bold text-navy mb-1">Budget & Timeline</h2>
                <p className="text-gray-500 mb-6">Helps us tailor the right solution for you.</p>

                <div className="mb-6">
                  <Label className="text-navy font-semibold mb-3 block">Budget Range</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {BUDGETS.map((b) => (
                      <OptionButton
                        key={b.value}
                        selected={watchedValues.budget === b.value}
                        onClick={() => setValue('budget', b.value)}
                      >
                        <span className="font-medium text-sm">{b.label}</span>
                      </OptionButton>
                    ))}
                  </div>
                  {errors.budget && (
                    <p className="text-red-500 text-sm mt-2">{errors.budget.message}</p>
                  )}
                </div>

                <div>
                  <Label className="text-navy font-semibold mb-3 block">Timeline (optional)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {TIMELINES.map((t) => (
                      <OptionButton
                        key={t.value}
                        selected={watchedValues.timeline === t.value}
                        onClick={() => setValue('timeline', t.value)}
                      >
                        <span className="font-medium text-sm">{t.label}</span>
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Step 4: Contact Info ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="font-display text-2xl font-bold text-navy mb-1">Your Information</h2>
                <p className="text-gray-500 mb-6">We&apos;ll send your personalised quote here.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" {...register('firstName')} className="mt-1" />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" {...register('lastName')} className="mt-1" />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" {...register('email')} className="mt-1" />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" {...register('phone')} className="mt-1" />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City / Neighborhood *</Label>
                    <Input id="city" placeholder="e.g. West Palm Beach" {...register('city')} className="mt-1" />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="message">Additional Details (optional)</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      className="mt-1"
                      placeholder="Tank dimensions, current setup, specific requests..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hearAbout">How did you hear about us? (optional)</Label>
                    <Input id="hearAbout" {...register('hearAbout')} className="mt-1" placeholder="Google, referral, Instagram..." />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-8 pb-8 flex justify-between items-center border-t border-gray-100 pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {step < STEPS.length ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canAdvance()}
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" variant="gold" size="lg" disabled={submitting} className="gap-2">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Submit Quote Request
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
