import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a price in USD cents to a dollar string like "$149.00" */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

/** Format a number (e.g. review count) with commas */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

/** Truncate a string to maxLen characters, appending "…" if needed */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen - 1) + '…'
}

/** Convert a slug string to Title Case for display */
export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** Return star-rating aria-label */
export function ratingLabel(rating: number): string {
  return `${rating} out of 5 stars`
}
