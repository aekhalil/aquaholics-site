const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function escapeHtml(value: unknown): string {
  if (value == null) return ''
  return String(value).replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch] ?? ch)
}

// For values interpolated into `tel:`, `mailto:`, or other URL-ish attributes.
// Strips control chars and percent-encodes characters that would break out of
// an href attribute. The caller is still responsible for wrapping in quotes.
export function escapeAttr(value: unknown): string {
  if (value == null) return ''
  return encodeURI(String(value).replace(/[\r\n\t\0]/g, '')).replace(
    /[<>"'`]/g,
    (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`
  )
}
