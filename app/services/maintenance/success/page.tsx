import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export const metadata: Metadata = { title: 'Subscription Confirmed!', robots: { index: false } }

export default function MaintenanceSuccess() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 max-w-xl text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-emerald-500" />
          </div>
          <h1 className="font-display text-3xl font-bold text-navy mb-3">Welcome to Aquaholics!</h1>
          <p className="text-gray-500 mb-6">
            Your maintenance plan is confirmed. Our team will contact you within 24 hours to
            schedule your first service visit.
          </p>
          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
            <h3 className="font-semibold text-navy mb-3">What Happens Next</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-aqua font-bold">1.</span> You&apos;ll receive a welcome email with your plan details</li>
              <li className="flex gap-2"><span className="text-aqua font-bold">2.</span> Our scheduling team will call you to set your first visit</li>
              <li className="flex gap-2"><span className="text-aqua font-bold">3.</span> Your dedicated technician will introduce themselves before arrival</li>
            </ol>
          </div>
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
