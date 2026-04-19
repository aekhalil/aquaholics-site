import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Aquaholic Aquarium Services',
  description: 'Privacy Policy for Aquaholic Aquarium Services LLC — how we collect, use, and protect your personal information.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  const lastUpdated = 'April 14, 2025'

  return (
    <main className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-navy mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: {lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">1. Who We Are</h2>
            <p>
              Aquaholic Aquarium Services LLC (&quot;Aquaholic,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{' '}
              <strong>aquaholicspb.com</strong> and provides aquarium installation, maintenance, and livestock
              services in Palm Beach County, Florida. Our contact information:
            </p>
            <ul className="list-none mt-3 space-y-1 text-sm">
              <li><strong>Email:</strong> <a href="mailto:nick@aquaholicspb.com" className="text-aqua hover:underline">nick@aquaholicspb.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+15613887262" className="text-aqua hover:underline">(561) 388-7262</a></li>
              <li><strong>Address:</strong> 3140 Laurel Ridge Circle, Riviera Beach, FL 33410</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">2. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li><strong>Contact & quote forms:</strong> Name, email address, phone number, city, and project details.</li>
              <li><strong>Newsletter sign-up:</strong> Email address and first name.</li>
              <li><strong>Livestock client accounts:</strong> Name, email, phone, and optional city / setup notes. Passwords are stored only as a salted hash — we never see or store the plaintext.</li>
              <li><strong>Maintenance plan subscriptions:</strong> Billing information processed by Stripe.</li>
              <li><strong>Service bookings:</strong> Name, email, and appointment details via Cal.com.</li>
            </ul>
            <p className="mt-3">
              We also collect certain technical data automatically, including IP address, browser type, pages visited,
              and referring URLs via analytics tools (Google Analytics 4). This data is aggregated and not used to identify
              you personally.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To respond to your inquiries and provide aquarium services</li>
              <li>To process orders and manage subscription plans</li>
              <li>To send service confirmations, invoices, and appointment reminders</li>
              <li>To send our newsletter (only if you opted in — you can unsubscribe at any time)</li>
              <li>To improve our website and services through analytics</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell, rent, or trade your personal information to third parties for their
              marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li><strong>Stripe</strong> — Payment processing. Subject to <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-aqua hover:underline">Stripe's Privacy Policy</a>.</li>
              <li><strong>Resend</strong> — Transactional and marketing email delivery.</li>
              <li><strong>Sanity</strong> — Content management system (CMS) for website content.</li>
              <li><strong>Cal.com</strong> — Appointment booking. Subject to <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-aqua hover:underline">Cal.com's Privacy Policy</a>.</li>
              <li><strong>Google Analytics 4</strong> — Website analytics. You may opt out via <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-aqua hover:underline">Google's opt-out tool</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">5. Cookies</h2>
            <p>
              Our website uses cookies and similar technologies to maintain session state (e.g., shopping cart) and
              to collect analytics data. You can control cookies through your browser settings. Disabling cookies may
              affect the functionality of the shopping cart and booking features.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes described in this
              policy or as required by law. Order and subscription records are retained for 7 years for tax and
              accounting purposes. Newsletter subscribers are retained until they unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal retention requirements)</li>
              <li>Opt out of marketing emails at any time using the unsubscribe link in any email</li>
              <li>Request that we not sell your personal data (we do not sell it)</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:nick@aquaholicspb.com" className="text-aqua hover:underline">nick@aquaholicspb.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">8. Children's Privacy</h2>
            <p>
              Our website is not directed at children under 13. We do not knowingly collect personal information from
              children under 13. If you believe a child has submitted personal information, please contact us and we
              will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">9. Security</h2>
            <p>
              We implement industry-standard security measures including HTTPS encryption, secure payment processing
              via Stripe (PCI-DSS compliant), and access controls. No transmission over the internet is 100% secure;
              we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will update the &quot;Last updated&quot; date at the
              top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-navy mb-3">11. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none mt-3 space-y-1 text-sm">
              <li><strong>Email:</strong> <a href="mailto:nick@aquaholicspb.com" className="text-aqua hover:underline">nick@aquaholicspb.com</a></li>
              <li><strong>Phone:</strong> <a href="tel:+15613887262" className="text-aqua hover:underline">(561) 388-7262</a></li>
              <li><strong>Mail:</strong> Aquaholic Aquarium Services LLC, 3140 Laurel Ridge Circle, Riviera Beach, FL 33410</li>
            </ul>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400 flex flex-wrap gap-4">
          <Link href="/terms" className="hover:text-navy transition-colors">Terms of Service</Link>
          <Link href="/" className="hover:text-navy transition-colors">Back to Home</Link>
        </div>
      </div>
    </main>
  )
}
