import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact | Aquaholic Aquarium Services',
  description: 'Contact Aquaholic Aquarium Services in West Palm Beach, FL. Call (561) 388-7262 or send us a message.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl font-bold text-navy mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-xl">We respond to all inquiries within 24 hours.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <div className="space-y-6 mb-10">
              {[
                { icon: Phone, label: 'Phone', value: '(561) 388-7262', href: 'tel:+15613887262' },
                { icon: Mail, label: 'Email', value: 'nick@aquaholicspb.com', href: 'mailto:nick@aquaholicspb.com' },
                { icon: MapPin, label: 'Address', value: '3140 Laurel Ridge Circle, Riviera Beach, FL 33410', href: null },
                { icon: Clock, label: 'Hours', value: 'Mon–Fri 8am–6pm · Sat 9am–4pm · 24/7 Emergency', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-aqua/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-aqua" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-0.5 font-medium">{label}</p>
                    {href ? (
                      <a href={href} className="text-navy font-medium hover:text-aqua transition-colors">{value}</a>
                    ) : (
                      <p className="text-navy font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-56">
              <iframe
                title="Aquaholic location"
                src="https://maps.google.com/maps?q=3140+Laurel+Ridge+Circle,+Riviera+Beach,+FL+33410&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
