'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, Phone, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '+15613887262'
const PHONE_DISPLAY = '(561) 388-7262'

/**
 * Cal.com embed for free consultation booking.
 * Falls back to a phone/quote CTA when Cal.com env vars aren't configured
 * (handle must be a real cal.com account that resolves — the previous
 * `aquaholic-aquarium` default 404s).
 */
export function CalBooking() {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME
  const eventSlug = process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG
  const enabled = process.env.NEXT_PUBLIC_CALCOM_ENABLED === '1' && username && eventSlug

  React.useEffect(() => {
    if (!enabled) return
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if(typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["-","init", "eventName", ar]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "free-consultation", {origin:"https://cal.com"});
      Cal.ns["free-consultation"]("inline", {
        elementOrSelector: "#cal-booking-embed",
        config: {"layout":"month_view","theme":"light"},
        calLink: "${username}/${eventSlug}",
      });
      Cal.ns["free-consultation"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [username, eventSlug, enabled])

  return (
    <section className="py-24 bg-white" aria-labelledby="booking-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-aqua/10 text-aqua text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Free Consultation
            </div>
            <h2
              id="booking-heading"
              className="font-display text-4xl sm:text-5xl font-bold text-navy mb-6"
            >
              Book a Free 30-Minute Consultation
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Talk with one of our aquarium specialists. We&apos;ll assess your space, discuss
              your vision, and give you an honest recommendation — no pressure, no obligation.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                { icon: Calendar, text: 'Pick a time that works for you — 7 days a week' },
                { icon: Clock, text: '30-minute video or phone call with a certified technician' },
                { icon: CheckCircle, text: 'Get a written quote within 24 hours of your call' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-aqua/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-aqua" />
                  </div>
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-sm text-gray-500 italic">
                &ldquo;I booked a consultation expecting a hard sell. Instead I got 30 minutes of
                genuinely useful advice about my current tank setup — even before I became a
                client. That&apos;s rare.&rdquo;
              </p>
              <p className="text-sm font-semibold text-navy mt-3">— Marcus T., Lake Worth</p>
            </div>
          </motion.div>

          {/* Right — Cal.com embed, or CTA fallback when Cal.com isn't configured */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg min-h-[600px]"
          >
            {enabled ? (
              <div
                id="cal-booking-embed"
                className="w-full min-h-[600px]"
                aria-label="Booking calendar"
              />
            ) : (
              <div className="flex flex-col justify-center gap-6 p-10 min-h-[600px] bg-gradient-to-br from-navy to-navy-900 text-white">
                <div className="inline-flex items-center gap-2 text-aqua text-sm font-semibold">
                  <Calendar className="h-4 w-4" /> Book your free consultation
                </div>
                <h3 className="font-display text-3xl font-bold leading-tight">
                  Call or request a quote — Nick gets back to every message within one business day.
                </h3>
                <p className="text-white/80">
                  We keep scheduling simple. Reach out the way that works for you and we&apos;ll line
                  up a 30-minute call to talk through your tank.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Button asChild variant="gold" size="lg" className="w-full sm:w-auto">
                    <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
                    <Link href="/quote" className="inline-flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Request a quote
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-white/60 mt-4">
                  Prefer email? Reach Nick at{' '}
                  <a href="mailto:nick@aquaholicspb.com" className="underline">
                    nick@aquaholicspb.com
                  </a>
                  .
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
