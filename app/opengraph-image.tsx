import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Aquaholic Aquarium Services'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const logoBuffer = readFileSync(join(process.cwd(), 'public', 'Images', 'Hero_logo.PNG'))
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #0A1F3D 0%, #061428 55%, #004459 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Soft aqua glow behind the logo — gives depth on dark BG without
            adding text that would get cropped in iMessage / SMS thumbnails. */}
        <div
          style={{
            display: 'flex',
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'rgba(0, 180, 216, 0.10)',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 180px rgba(0, 180, 216, 0.35)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Aquaholic Aquarium Services logo"
            width={520}
            height={520}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
