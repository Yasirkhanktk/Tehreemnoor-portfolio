import { Download } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

const PREV_COMPANIES = ['Nexora', 'Pixel Co', 'ShapeKit']

export function AboutSection() {
  return (
    <section style={{
      display: 'flex',
      minHeight: 660,
      background: '#fff',
      borderTop: '1px solid #efefef',
    }}>

      {/* ── Left: Portrait photo ──────────────────────────────────── */}
      <div style={{
        flex: '0 0 42%',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 660,
      }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1771072428050-1492abb58f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
          alt="Tehreem Noor — UI/UX Designer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            filter: 'grayscale(18%) contrast(1.05)',
          }}
        />
      </div>

      {/* ── Right: Content ────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 52px 52px 60px',
        position: 'relative',
      }}>

        {/* Decorative circle — top right */}
        <div style={{
          position: 'absolute',
          top: 40,
          right: 52,
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '1.5px solid #d8d8d8',
        }} />

        {/* ── Heading ── */}
        <h2 style={{
          margin: '0 0 28px',
          fontFamily: FH,
          fontSize: 'clamp(34px, 4vw, 52px)',
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: '#0d0d0d',
        }}>
          <span style={{ fontWeight: 700 }}>I design systems,</span>
          <br />
          <span style={{ fontWeight: 400 }}>not just screens.</span>
        </h2>

        {/* ── Bio paragraphs ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          <p style={{
            margin: 0,
            fontSize: 13,
            color: '#777',
            lineHeight: 1.75,
            fontFamily: FB,
            maxWidth: 480,
          }}>
            At 24, I've spent the last 3+ years designing digital products that people
            actually want to use — from mobile apps and SaaS dashboards to full design
            systems. The interface is just the surface; I care about what lives beneath:
            the flows, the decisions, the moments where clarity matters most.
          </p>
          <p style={{
            margin: 0,
            fontSize: 13,
            color: '#777',
            lineHeight: 1.75,
            fontFamily: FB,
            maxWidth: 480,
          }}>
            My process blends user research, visual systems, and interaction design.
            I work closely with product and engineering teams to ship things that are
            both beautiful and functional — without losing precision along the way.
          </p>
          <p style={{
            margin: 0,
            fontSize: 13,
            color: '#777',
            lineHeight: 1.75,
            fontFamily: FB,
            maxWidth: 480,
          }}>
            Every project I take on, I treat as a systems problem — designing at scale,
            across real user needs, business constraints, and technical realities.
          </p>
        </div>

        {/* ── Previously worked with ── */}
        <div>
          <p style={{
            margin: '0 0 12px',
            fontSize: 9.5,
            letterSpacing: '0.16em',
            color: '#aaa',
            textTransform: 'uppercase',
            fontFamily: FB,
          }}>
            Previously Worked With
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
          }}>
            {/* Company pills */}
            {PREV_COMPANIES.map(name => (
              <span key={name} style={{
                fontSize: 11.5,
                fontFamily: FH,
                fontWeight: 500,
                color: '#444',
                border: '1px solid #e0e0e0',
                borderRadius: 100,
                padding: '5px 14px',
                background: '#fafafa',
              }}>
                {name}
              </span>
            ))}

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Download Resume button */}
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#0d0d0d',
              color: '#fff',
              border: 'none',
              borderRadius: 100,
              padding: '10px 20px',
              fontSize: 11,
              fontWeight: 600,
              fontFamily: FH,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              <Download size={12} strokeWidth={2.5} />
              DOWNLOAD RESUME
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
