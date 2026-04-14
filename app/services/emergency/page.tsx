import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, Clock, Zap, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: '24/7 Emergency Aquarium Service | Palm Beach County',
  description: '24/7 emergency aquarium service in Palm Beach County. Tank crashes, power failures, sick fish — our team responds within 2 hours. Call (561) 388-7262.',
}

export default function EmergencyPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-red-900 via-navy to-navy py-24 pt-36 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-300 text-sm font-semibold">24/7 Emergency Line Active</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            Aquarium Emergency? <span className="text-red-400">We Answer.</span>
          </h1>
          <p className="text-white/70 text-xl mb-8">
            Tank crash, power failure, disease outbreak, equipment failure — our on-call
            technicians are dispatched within 2 hours, any time of day or night.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" className="bg-red-500 hover:bg-red-600 text-white gap-2">
              <a href="tel:+15613887262"><Phone className="h-5 w-5" /> Call Emergency Line</a>
            </Button>
            <Button asChild variant="outline-white" size="xl">
              <Link href="/quote?service=emergency">Submit Emergency Request</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Clock, title: '2-Hour Response', desc: 'Guaranteed response time for all emergency callouts in Palm Beach County.' },
              { icon: Zap, title: 'Same-Day Service', desc: 'In most cases, our tech will be at your door on the same day you call.' },
              { icon: Shield, title: 'Priority Clients', desc: 'Clients on active maintenance plans get priority dispatch and 20% off callouts.' },
              { icon: Phone, title: '24/7 Staffed Line', desc: 'A real technician answers our emergency line — no voicemail, no callback queue.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center">
            <h2 className="font-display text-3xl font-bold text-navy mb-3">Emergency Pricing</h2>
            <p className="text-gray-600 mb-4">
              Flat $150 callout fee + parts & labor (typically $75–$200 total). Maintenance plan
              clients receive 20% off all emergency services.
            </p>
            <p className="text-gray-500 text-sm">
              <strong className="text-navy">Active maintenance clients:</strong> Add our emergency
              coverage to your plan for unlimited free labor on callouts (parts only charge).
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
