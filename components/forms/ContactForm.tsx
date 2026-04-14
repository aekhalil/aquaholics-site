'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Check } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Please write a bit more'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, firstName: data.name.split(' ')[0], lastName: data.name.split(' ').slice(1).join(' ') || '', city: '', source: 'contact_form' }),
      })
      if (res.ok) setSubmitted(true)
      else throw new Error()
    } catch {
      toast({ title: 'Error', description: 'Please try again or call us.', variant: 'destructive' })
    }
  }

  if (submitted) return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
        <Check className="h-8 w-8 text-emerald-500" />
      </div>
      <h2 className="font-display text-2xl font-bold text-navy mb-2">Message Sent!</h2>
      <p className="text-gray-500">We&apos;ll reply within 24 hours.</p>
    </div>
  )

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      <h2 className="font-display text-2xl font-bold text-navy mb-6">Send a Message</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="c-name">Full Name *</Label>
            <Input id="c-name" {...register('name')} className="mt-1" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="c-phone">Phone</Label>
            <Input id="c-phone" type="tel" {...register('phone')} className="mt-1" />
          </div>
        </div>
        <div>
          <Label htmlFor="c-email">Email *</Label>
          <Input id="c-email" type="email" {...register('email')} className="mt-1" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="c-subject">Subject *</Label>
          <Input id="c-subject" {...register('subject')} className="mt-1" />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
        </div>
        <div>
          <Label htmlFor="c-message">Message *</Label>
          <Textarea id="c-message" {...register('message')} rows={5} className="mt-1" />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
