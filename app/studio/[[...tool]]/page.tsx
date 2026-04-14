/**
 * Embedded Sanity Studio at /studio
 * Only accessible to authenticated Sanity users.
 * In production, protect this route with Sanity's built-in auth or
 * a middleware-based IP allowlist.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
