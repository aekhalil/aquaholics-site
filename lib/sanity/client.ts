import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity project IDs may only contain a-z, 0-9 and dashes.
// If the env var is missing or still has the template placeholder value
// (which contains underscores), fall back to a safe dummy so the app
// starts without Sanity configured. Pages will use their built-in
// placeholder data via the try/catch wrappers in each fetch function.
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const isSanityConfigured = /^[a-z0-9][a-z0-9-]{5,}$/.test(rawProjectId)
const projectId = isSanityConfigured ? rawProjectId : 'not-configured'

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

/**
 * Returns a Sanity image URL builder instance for the given source.
 * Use like: urlFor(image).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
