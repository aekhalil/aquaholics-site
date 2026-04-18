export const SHOP_COOKIE = 'aquaholics_shop_access'
export const SHOP_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function getSalt(): string {
  return process.env.SHOP_ACCESS_SALT || 'aquaholics-shop-default-salt'
}

export async function hashShopToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${password}::${getSalt()}`)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function getSanityUrl(): string | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'
  if (!projectId || !/^[a-z0-9][a-z0-9-]{5,}$/.test(projectId)) return null
  const query = encodeURIComponent(
    '*[_type == "siteSettings"] | order(_updatedAt desc)[0].shopPassword'
  )
  return `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`
}

export async function getShopPassword(): Promise<string | null> {
  const url = getSanityUrl()
  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 30 } })
      if (res.ok) {
        const data = (await res.json()) as { result?: string | null }
        if (typeof data.result === 'string' && data.result.length > 0) {
          return data.result
        }
      }
    } catch {
      // fall through to dev fallback
    }
  }

  // Dev-only fallback so the gate can be tested without Sanity configured.
  // Never used in production builds.
  if (process.env.NODE_ENV !== 'production' && process.env.DEV_SHOP_PASSWORD) {
    return process.env.DEV_SHOP_PASSWORD
  }

  return null
}
