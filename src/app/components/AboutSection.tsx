import { Download } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useIsMobile } from '../utils/useIsMobile'

const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

const PREV_COMPANIES = ['Anemoia.dev', 'Renosoft']

export function AboutSection() {
  const isMobile = useIsMobile()

  return (
    <section style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: isMobile ? 'auto' : 660,
      background: '#fff',
      borderTop: '1px solid #efefef',
    }}>

      {/* ── Photo ──────────────────────────────────── */}
      <div style={{
        flex: isMobile ? 'none' : '0 0 42%',
        height: isMobile ? 300 : undefined,
        minHeight: isMobile ? undefined : 660,
        position: 'relative',
        overflow: 'hidden',
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

      {/* ── Content ────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '36px 24px 44px' : '64px 52px 52px 60px',
        position: 'relative',
      }}>

        {/* Decorative circle — desktop only */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: 40,
            right: 52,
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '1.5px solid #d8d8d8',
          }} />
        )}

        {/* ── Heading ── */}
        <h2 style={{
          margin: '0 0 24px',
          fontFamily: FH,
          fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(34px, 4vw, 52px)',
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: '#0d0d0d',
        }}>
          <span style={{ fontWeight: 700 }}>I design systems,</span>
          <br />
          <span style={{ fontWeight: 400 }}>not just screens.</span>
        </h2>

        {/* ── Bio paragraphs ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
          {[
            `I've spent the last 3+ years designing digital products that people actually want to use from mobile apps and SaaS dashboards to full design systems. The interface is just the surface; I care about what lives beneath: the flows, the decisions, the moments where clarity matters most.`,
            `My process blends user research, visual systems, and interaction design. I work closely with product and engineering teams to ship things that are both beautiful and functional without losing precision along the way.`,
            `Every project I take on, I treat as a systems problem designing at scale, across real user needs, business constraints, and technical realities.`,
          ].map((text, i) => (
            <p key={i} style={{
              margin: 0,
              fontSize: 13,
              color: '#777',
              lineHeight: 1.75,
              fontFamily: FB,
              maxWidth: 480,
            }}>
              {text}
            </p>
          ))}
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
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 10,
            flexWrap: 'wrap',
          }}>
            {/* Company pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
            </div>

            {!isMobile && <div style={{ flex: 1 }} />}

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
              alignSelf: isMobile ? 'flex-start' : 'auto',
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
