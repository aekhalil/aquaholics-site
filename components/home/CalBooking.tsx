'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle } from 'lucide-react'

/**
 * Cal.com embed for free consultation booking.
 * Loads the Cal.com inline embed script client-side only.
 */
export function CalBooking() {
  const username = process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? 'aquaholic-aquarium'
  const eventSlug = process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG ?? 'free-consultation'

  React.useEffect(() => {
    // Load Cal.com embed script
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
  }, [username, eventSlug])

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

          {/* Right — Cal.com embed */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg min-h-[600px]"
          >
            <div
              id="cal-booking-embed"
              className="w-full min-h-[600px]"
              aria-label="Booking calendar"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
