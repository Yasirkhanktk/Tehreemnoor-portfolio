import { useState, useEffect } from 'react'
import { MessageSquare, User, Grid3X3, ChevronRight, Globe, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { ImageWithFallback } from './components/figma/ImageWithFallback'
import { ProjectsSection } from './components/ProjectsSection'
import { AboutSection } from './components/AboutSection'
import { CapabilitiesSection } from './components/CapabilitiesSection'
import { SkillsBubbles } from './components/SkillsBubbles'
import { Footer } from './components/Footer'
import { useIsMobile } from './utils/useIsMobile'

// ─── Tokens ───────────────────────────────────────────────────────────────────
const LIME      = '#C5F135'
const SIDEBAR_BG = '#0F0F0F'
const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

const tools = [
  { label: 'Fg', color: '#F24E1E' },
  { label: 'Xd', color: '#FF61F6' },
  { label: 'Ai', color: '#FF9A00' },
  { label: 'Ps', color: '#31A8FF' },
  { label: 'Wf', color: '#4353FF' },
]

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, background: LIME,
      borderRadius: 6, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width={size * 0.53} height={size * 0.53} viewBox="0 0 16 16" fill="none">
        <path d="M2 3.5H14L2 12.5H14" stroke="#000" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ─── Sidebar content (shared between desktop & mobile drawer) ─────────────────
function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: SIDEBAR_BG,
      display: 'flex', flexDirection: 'column',
      padding: '26px 18px 24px',
      boxSizing: 'border-box',
    }}>
      {/* Close button — mobile only */}
      {onClose && (
        <button onClick={onClose} style={{
          alignSelf: 'flex-end', background: 'none', border: 'none',
          cursor: 'pointer', color: '#666', padding: '0 0 16px',
        }}>
          <X size={20} color="#666" />
        </button>
      )}

      {/* Avatar */}
      <div style={{ marginBottom: 13 }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1771072428050-1492abb58f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
          alt="Tehreem Noor"
          style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      <p style={{ margin: '0 0 2px', color: '#fff', fontSize: 14.5, fontWeight: 700, fontFamily: FH }}>Tehreem Noor</p>
      <p style={{ margin: '0 0 1px', color: '#666', fontSize: 11, fontFamily: FB }}>@tehreemnoor &bull; 24</p>
      <p style={{ margin: '0 0 18px', color: '#666', fontSize: 11, fontFamily: FB }}>UI/UX Designer</p>

      <p style={{ margin: '0 0 7px', color: '#444', fontSize: 10, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: FB }}>
        Tools &amp; Skills
      </p>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 18 }}>
        {tools.map(t => (
          <div key={t.label} style={{
            width: 24, height: 24, background: '#1c1c1c', border: '1px solid #2a2a2a',
            borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontSize: 7.5, color: t.color, fontWeight: 700, fontFamily: FB, lineHeight: 1 }}>{t.label}</span>
          </div>
        ))}
      </div>

      <button style={{
        background: LIME, color: '#0d0d0d', border: 'none', borderRadius: 8,
        padding: '9px 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 7, cursor: 'pointer', width: '100%',
        fontSize: 13, fontWeight: 600, fontFamily: FH, marginBottom: 20,
      }}>
        <MessageSquare size={13} strokeWidth={2.5} />
        Message
      </button>

      <div style={{ height: 1, background: '#202020', marginBottom: 14 }} />

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[
          { icon: <User size={14} strokeWidth={1.75} />, label: 'Profile' },
          { icon: <Grid3X3 size={14} strokeWidth={1.75} />, label: 'Portfolio' },
        ].map(({ icon, label }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 9,
            color: '#777', background: 'transparent', border: 'none',
            cursor: 'pointer', padding: '8px 6px', borderRadius: 6,
            fontSize: 13, fontFamily: FH, textAlign: 'left', width: '100%',
          }}>
            {icon}{label}
          </button>
        ))}
      </nav>
    </div>
  )
}

// ─── Top navigation ────────────────────────────────────────────────────────────
function TopNav({ isMobile, onMenuOpen }: { isMobile: boolean; onMenuOpen: () => void }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 20px' : '0 44px',
      height: 58,
      borderBottom: '1px solid #ebebeb',
      background: '#fff',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <LogoMark />

      {isMobile ? (
        /* Mobile: just the hamburger */
        <button onClick={onMenuOpen} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          display: 'flex', alignItems: 'center',
        }}>
          <Menu size={22} color="#333" />
        </button>
      ) : (
        /* Desktop: full nav */
        <>
          <nav style={{ display: 'flex', gap: 34 }}>
            {['ABOUT', 'WORK', 'CONTACT'].map(item => (
              <a key={item} href="#" style={{
                fontSize: 10.5, letterSpacing: '0.13em', color: '#222',
                textDecoration: 'none', fontFamily: FH, fontWeight: 500,
              }}>{item}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <Globe size={12} color="#777" strokeWidth={1.75} />
              <span style={{ fontSize: 10.5, color: '#777', fontFamily: FB }}>EN</span>
            </div>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', border: '1px solid #ddd',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 9, color: '#555', fontFamily: FB, fontWeight: 600 }}>in</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f0f0ec', borderRadius: 20, padding: '5px 11px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'block', flexShrink: 0 }} />
              <span style={{ fontSize: 10.5, color: '#333', fontFamily: FB, whiteSpace: 'nowrap' }}>Available for projects</span>
            </div>
          </div>
        </>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{
      minHeight: 'calc(100vh - 58px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: isMobile ? '0 24px 48px' : '0 52px 56px',
      background: '#fff',
    }}>
      <p style={{
        margin: '0 0 22px',
        fontSize: isMobile ? 8.5 : 9.5,
        letterSpacing: '0.13em', color: '#bbb',
        textTransform: 'uppercase', fontFamily: FB, fontWeight: 400,
        lineHeight: 1.6,
      }}>
        HI I'M TEHREEM NOOR — 24 Y/O UI/UX DESIGNER, WORKING GLOBALLY
      </p>

      <h1 style={{
        margin: '0 0 22px',
        fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(54px, 7.8vw, 90px)',
        fontWeight: 700,
        lineHeight: 0.96,
        letterSpacing: '-0.025em',
        color: '#0d0d0d',
        fontFamily: FH,
      }}>
        UI/UX designer
        <br />
        &amp; product thinker
      </h1>

      <p style={{
        margin: '0 0 36px',
        fontSize: isMobile ? 13 : 13,
        color: '#888', lineHeight: 1.7,
        maxWidth: 340, fontFamily: FB, fontWeight: 400,
      }}>
        Designing intuitive digital products that balance
        {isMobile ? ' ' : <br />}
        clarity, beauty, and real-world function.
      </p>

      <div>
        <button style={{
          background: LIME, color: '#0d0d0d', border: 'none',
          borderRadius: 100, padding: isMobile ? '11px 22px' : '12px 26px',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          cursor: 'pointer',
          fontSize: 11, fontWeight: 600, fontFamily: FH, letterSpacing: '0.1em',
        }}>
          VIEW WORK
          <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  // Auto-close drawer when switching to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>

      {/* ── Desktop sidebar ── */}
      {!isMobile && (
        <aside style={{
          width: 205, minWidth: 205, height: '100vh',
          position: 'sticky', top: 0,
          borderRight: '1px solid #1a1a1a', flexShrink: 0,
        }}>
          <SidebarContent />
        </aside>
      )}

      {/* ── Mobile drawer + backdrop ── */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.55)',
                zIndex: 100,
              }}
            />
            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: -220 }} animate={{ x: 0 }} exit={{ x: -220 }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              style={{
                position: 'fixed', left: 0, top: 0, bottom: 0,
                width: 220, zIndex: 101,
              }}
            >
              <SidebarContent onClose={() => setMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Scrollable content ── */}
      <div id="main-scroll" style={{ flex: 1, overflowY: 'auto', height: '100vh' }}>
        <TopNav isMobile={isMobile} onMenuOpen={() => setMenuOpen(true)} />
        <Hero isMobile={isMobile} />
        <ProjectsSection />
        <AboutSection />
        <CapabilitiesSection />
        <SkillsBubbles />
        <Footer />
      </div>
    </div>
  )
}
