import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Lock } from 'lucide-react'
import { ShopAccessForm } from '@/components/shop/ShopAccessForm'
import { client } from '@/lib/sanity/client'

export const metadata: Metadata = {
  title: 'Livestock Access',
  description: 'Enter the access password to view available livestock at Aquaholic.',
  robots: { index: false, follow: false },
}

export const revalidate = 30

async function getMessage(): Promise<string | null> {
  try {
    return await client.fetch<string | null>(
      `*[_type == "siteSettings"] | order(_updatedAt desc)[0].shopAccessMessage`
    )
  } catch {
    return null
  }
}

export default async function ShopAccessPage() {
  const message = await getMessage()

  return (
    <main className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="w-12 h-12 rounded-full bg-aqua/10 flex items-center justify-center mb-5">
            <Lock className="h-5 w-5 text-aqua" />
          </div>
          <h1 className="font-display text-3xl font-bold text-navy mb-2">Livestock access</h1>
          <p className="text-gray-500 text-sm mb-6 whitespace-pre-line">
            {message ??
              `Aquaholic isn't a retail store and doesn't ship. Available livestock is shown only to clients Nick works with. If you don't have the access password, text (561) 388-7262.`}
          </p>
          <Suspense fallback={null}>
            <ShopAccessForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
