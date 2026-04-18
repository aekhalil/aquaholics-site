import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Offline',
  description: 'You are currently offline.',
  robots: { index: false, follow: false },
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <h1 className="font-serif text-4xl tracking-tight text-[#0a1f3d]">
          You&apos;re offline
        </h1>
        <p className="mt-4 text-base text-slate-600">
          We can&apos;t reach the network right now. Reconnect and reload, or give us a call and
          we&apos;ll take care of it.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="tel:+15613887262"
            className="inline-flex items-center justify-center rounded-md bg-[#0a1f3d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#15325c]"
          >
            Call (561) 388-7262
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Try home page
          </Link>
        </div>
      </div>
    </div>
  )
}
