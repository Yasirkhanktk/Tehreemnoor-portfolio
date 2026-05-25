import { ArrowRight, ArrowUp } from 'lucide-react'
import { motion } from 'motion/react'
import { useIsMobile } from '../utils/useIsMobile'
import logoImg from '../../imports/Logo-1.png'

const LIME = '#C5F135'
const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

const TICKER_TEXT =
  'PRODUCT DESIGN · DESIGN ENGINEERING · SYSTEMS THINKING · STRATEGY & DISCOVERY · VISUAL CRAFT · FRONT-END · '

function LogoMark() {
  return (
    <img
      src={typeof logoImg === 'string' ? logoImg : logoImg.src}
      alt="Tehreem Noor logo"
      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
    />
  )
}

export function Footer({ noBridge = false }: { noBridge?: boolean }) {
  const isMobile = useIsMobile()
  const px = isMobile ? 20 : 52

  function scrollToTop() {
    const scroller = document.getElementById('main-scroll')
    if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {!noBridge && (
        <div style={{
          height: 80,
          background: 'linear-gradient(to bottom, #F0F0EC 0%, #0d0d0d 100%)',
          flexShrink: 0,
        }} />
      )}

      <footer style={{ background: '#0d0d0d', color: '#fff' }}>

        {/* ── Ticker strip ── */}
        <div style={{
          borderTop: `1.5px solid ${LIME}`,
          borderBottom: `1px solid #222`,
          overflow: 'hidden',
          padding: '10px 0',
          background: '#0d0d0d',
        }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            <span style={{ fontSize: 10.5, letterSpacing: '0.14em', color: '#555', fontFamily: FH }}>
              {(TICKER_TEXT).repeat(8)}
            </span>
          </motion.div>
        </div>

        {/* ── Main content ── */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          padding: isMobile ? `52px ${px}px 44px` : `80px ${px}px 72px`,
          minHeight: isMobile ? 'auto' : 380,
          gap: isMobile ? 40 : 40,
        }}>

          {/* Left — heading + CTA */}
          <div style={{ flex: isMobile ? 'none' : '0 0 52%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{
                margin: '0 0 20px',
                fontSize: isMobile ? 'clamp(32px, 9vw, 48px)' : 'clamp(40px, 5.5vw, 64px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#fff',
                fontFamily: FH,
              }}>
                got a complex<br />problem to solve?
              </h2>

              <p style={{
                margin: '0 0 32px',
                fontSize: 13,
                color: '#666',
                fontFamily: FB,
                lineHeight: 1.65,
              }}>
                Let's talk about what you're building.
              </p>

              <a 
                href="mailto:tehreemnoor466@gmail.com?subject=Inquiry%20about%20UI%2FUX%20Project%20Design&body=Hi%20Tehreem%2C%0A%0AI%20reached%20out%20through%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20UI%2FUX%20project%20with%20you.%20Below%20are%20some%20details%3A%0A%0A-%20Project%20Name%3A%20%0A-%20Project%20Description%3A%20%0A-%20Expected%20Timeline%2FBudget%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C"
                style={{
                  background: LIME,
                  color: '#0d0d0d',
                  border: 'none',
                  borderRadius: 6,
                  padding: '14px 26px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: FH,
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                CONTACT ME
                <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Vertical divider — desktop only */}
          {!isMobile && (
            <div style={{ width: 1, background: '#1e1e1e', flexShrink: 0, alignSelf: 'stretch' }} />
          )}

          {/* Horizontal divider — mobile only */}
          {isMobile && (
            <div style={{ height: 1, background: '#1e1e1e' }} />
          )}

          {/* Right — social links */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            position: 'relative',
          }}>
            {!isMobile && (
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 36, height: 36, borderRadius: '50%',
                border: '1.5px solid #2a2a2a',
              }} />
            )}

            <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
              <p style={{
                margin: '0 0 18px',
                fontSize: 9.5,
                letterSpacing: '0.16em',
                color: '#444',
                textTransform: 'uppercase',
                fontFamily: FB,
              }}>
                Find Me Here:
              </p>
              {[
                { label: 'tehreemnoor466@gmail.com', href: 'mailto:tehreemnoor466@gmail.com?subject=Inquiry%20about%20UI%2FUX%20Project%20Design&body=Hi%20Tehreem%2C%0A%0AI%20reached%20out%20through%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20UI%2FUX%20project%20with%20you.%20Below%20are%20some%20details%3A%0A%0A-%20Project%20Name%3A%20%0A-%20Project%20Description%3A%20%0A-%20Expected%20Timeline%2FBudget%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!%0A%0ABest%20regards%2C' },
                { label: 'Behance', href: '#' },
                { label: 'LinkedIn', href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: 'block',
                    fontSize: isMobile ? 15 : 14,
                    color: '#fff',
                    textDecoration: 'none',
                    fontFamily: FH,
                    fontWeight: 500,
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom strip ── */}
        <div style={{ borderTop: '1px solid #1a1a1a', padding: `0 ${px}px` }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '18px 0',
            borderBottom: '1px solid #161616',
          }}>
            <span style={{ fontSize: 9.5, letterSpacing: '0.14em', color: '#444', textTransform: 'uppercase', fontFamily: FB }}>
              Available for Projects
            </span>
            <span style={{ fontSize: 9.5, letterSpacing: '0.14em', color: '#444', textTransform: 'uppercase', fontFamily: FB }}>
              Working Globally
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
          }}>
            <span style={{ fontSize: 11, color: '#333', fontFamily: FB }}>© 2026</span>
            <LogoMark />
            <button
              onClick={scrollToTop}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 11, color: '#555', fontFamily: FB, padding: 0,
              }}
            >
              Back to top
              <ArrowUp size={12} strokeWidth={2} />
            </button>
          </div>
        </div>

      </footer>
    </>
  )
}
