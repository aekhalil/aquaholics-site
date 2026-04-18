import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aquaholics Aquarium Services',
    short_name: 'Aquaholics',
    description:
      'Aquarium installation, maintenance, and livestock sales in West Palm Beach & Palm Beach County.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0a1f3d',
    theme_color: '#0a1f3d',
    categories: ['business', 'shopping', 'lifestyle'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Request a Quote',
        short_name: 'Quote',
        url: '/quote',
      },
      {
        name: 'Book Service',
        short_name: 'Service',
        url: '/services/maintenance',
      },
      {
        name: 'Contact',
        short_name: 'Contact',
        url: '/contact',
      },
    ],
  }
}
