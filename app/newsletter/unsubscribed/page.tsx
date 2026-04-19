import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Unsubscribed',
  robots: { index: false, follow: false },
}

export default async function UnsubscribedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const invalid = status === 'invalid'

  return (
    <main className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-md text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
          <div
            className={`w-14 h-14 rounded-full ${invalid ? 'bg-amber-100' : 'bg-emerald-100'} flex items-center justify-center mx-auto mb-4`}
          >
            {invalid ? (
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            ) : (
              <Check className="h-6 w-6 text-emerald-600" />
            )}
          </div>
          <h1 className="font-display text-3xl font-bold text-navy mb-3">
            {invalid ? 'Link not valid' : "You're unsubscribed"}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {invalid
              ? "We couldn't verify that unsubscribe link. It may be expired or the email address may not match. Text (561) 388-7262 and we'll remove you manually."
              : "You won't get any more livestock alerts from Aquaholic. If this was a mistake, text (561) 388-7262 and we'll add you back."}
          </p>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
