import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Aquaholic Aquarium Services — West Palm Beach, FL'
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #0A1F3D 0%, #061428 55%, #004459 100%)',
          padding: '60px 80px',
          gap: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '460px',
            height: '460px',
            borderRadius: '50%',
            background: 'rgba(0, 180, 216, 0.08)',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 120px rgba(0, 180, 216, 0.25)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Aquaholic logo"
            width={420}
            height={420}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            color: '#ffffff',
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Aquaholic
          </div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 500,
              color: '#00B4D8',
              marginTop: 6,
              letterSpacing: '-0.01em',
            }}
          >
            Aquarium Services
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#C5D0E6',
              marginTop: 36,
              lineHeight: 1.35,
            }}
          >
            Custom installations, maintenance & rare livestock
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#D4AF37',
              marginTop: 28,
              fontWeight: 600,
            }}
          >
            Serving Palm Beach County · (561) 388-7262
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
