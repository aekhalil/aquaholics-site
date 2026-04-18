import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Aquaholics Aquarium Services',
  description: 'Terms of Service for Aquaholics Aquarium Services LLC — governing the use of our website, services, and products.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  const lastUpdated = 'April 14, 2025'

  return (
    <main className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-navy mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website at <strong>aquaholicspb.com</strong> or engaging the
              services of Aquaholics Aquarium Services LLC (&quot;Aquaholics,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be
              bound by these Terms of Service. If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">2. Services</h2>
            <p>
              Aquaholics provides aquarium installation, maintenance, aquascaping, emergency service, and livestock
              sales to residential and commercial clients in Palm Beach County, Florida and surrounding areas.
              Specific service terms (scope, pricing, scheduling) are outlined in individual service agreements
              provided at the time of booking.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">3. Maintenance Plan Subscriptions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintenance plans are billed monthly and auto-renew until cancelled.</li>
              <li>You may cancel your subscription at any time by contacting us at least 7 days before the next billing date. No refunds are issued for the current billing period.</li>
              <li>We reserve the right to adjust plan pricing with 30 days' written notice.</li>
              <li>We may suspend or terminate service if payment fails and is not resolved within 5 business days.</li>
              <li>Service visits are scheduled by mutual agreement. Missed visits due to client unavailability are forfeited; we will make one reschedule attempt.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">4. Installation Projects</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All installation projects begin with a written proposal. Work commences only after written approval and deposit payment (typically 50% of total project cost).</li>
              <li>The remaining balance is due upon completion before livestock introduction.</li>
              <li>All installations carry a <strong>90-day workmanship warranty</strong> covering defects in installation labor. Equipment manufacturer warranties apply separately.</li>
              <li>We are not responsible for pre-existing structural issues, water damage caused by client modifications after handover, or livestock losses resulting from client error.</li>
              <li>Project timelines are estimates. We are not liable for delays caused by equipment backorders, shipping issues, or circumstances beyond our control.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">5. Livestock Sales</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aquaholics is not a retail store and does not ship livestock. All livestock is held locally in Riviera Beach, FL and sold only to approved service clients for local pickup or drop-off during scheduled service visits.</li>
              <li>A client account is required to view availability. Approval is at our sole discretion.</li>
              <li>All livestock sales are final. We do not accept returns on live animals.</li>
              <li>Because livestock is picked up or delivered locally in person, risk of loss transfers to the client at the moment of pickup or delivery. We are not responsible for losses resulting from transport, acclimation, water parameters, or equipment after that point.</li>
              <li>All prices are in USD and subject to change without notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">6. Emergency Services</h2>
            <p>
              Emergency callouts are billed at a flat $150 callout fee plus parts and labor, charged at the time
              of service or invoiced within 24 hours. Emergency service is provided on a best-effort basis and
              response times may vary based on technician availability and geographic location. We do not guarantee
              specific outcomes for emergency interventions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">7. Website Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may use this website for lawful purposes only.</li>
              <li>You may not scrape, copy, redistribute, or commercially exploit any content from this site without our written consent.</li>
              <li>You may not use this site to submit false, fraudulent, or misleading information.</li>
              <li>We reserve the right to terminate access to users who violate these terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">8. Intellectual Property</h2>
            <p>
              All website content — including text, images, logos, graphics, and code — is the property of
              Aquaholics Aquarium Services LLC or its licensors. You may not reproduce or distribute any content
              without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">9. Disclaimer of Warranties</h2>
            <p>
              Our website and its content are provided &quot;as is&quot; without warranties of any kind, express or implied.
              We do not warrant that the website will be uninterrupted, error-free, or free of viruses. Aquarium
              keeping involves inherent risks, including livestock loss; we provide professional-grade care but
              cannot guarantee zero losses.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Aquaholics Aquarium Services LLC shall not be liable for
              any indirect, incidental, special, or consequential damages arising from use of our website or
              services. Our total liability for any claim shall not exceed the amount paid by you for the
              specific service giving rise to the claim in the 30 days prior to the incident.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Aquaholics Aquarium Services LLC and its principals,
              employees, and agents from any claims, damages, or expenses arising from your violation of these
              Terms or misuse of our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Florida. Any disputes shall be resolved in
              the courts of Palm Beach County, Florida.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Changes take effect upon posting. Your continued
              use of the website or services constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">14. Contact</h2>
            <ul className="list-none mt-3 space-y-1 text-sm">
              <li><strong>Email:</strong> <a href="mailto:nick@aquaholicspb.com" className="text-aqua hover:underline">nick@aquaholicspb.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+15613887262" className="text-aqua hover:underline">(561) 388-7262</a></li>
              <li><strong>Address:</strong> 3140 Laurel Ridge Circle, Riviera Beach, FL 33410</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400 flex flex-wrap gap-4">
          <Link href="/privacy" className="hover:text-navy transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-navy transition-colors">Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
