import { MessageSquare, User, Grid3X3, ChevronRight, Globe } from 'lucide-react'
import { ImageWithFallback } from './components/figma/ImageWithFallback'
import { ProjectsSection } from './components/ProjectsSection'
import { AboutSection } from './components/AboutSection'
import { CapabilitiesSection } from './components/CapabilitiesSection'
import { SkillsBubbles } from './components/SkillsBubbles'
import { Footer } from './components/Footer'

// ─── Design tokens ─────────────────────────────────────────────────────────────
const LIME = '#C5F135'
const SIDEBAR_BG = '#0F0F0F'
const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

// ─── Sidebar brand-logo strip ─────────────────────────────────────────────────
const tools = [
  { label: 'Fg', color: '#F24E1E' },
  { label: 'Xd', color: '#FF61F6' },
  { label: 'Ai', color: '#FF9A00' },
  { label: 'Ps', color: '#31A8FF' },
  { label: 'Wf', color: '#4353FF' },
]

// ─── Nav logo ─────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div style={{
      width: 30, height: 30,
      background: LIME,
      borderRadius: 6,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 3.5H14L2 12.5H14" stroke="#000" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ─── Left sidebar ─────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <aside style={{
      width: 205, minWidth: 205,
      background: SIDEBAR_BG,
      height: '100vh',
      position: 'sticky', top: 0,
      display: 'flex', flexDirection: 'column',
      padding: '26px 18px 24px',
      boxSizing: 'border-box',
      borderRight: '1px solid #1a1a1a',
      flexShrink: 0,
    }}>
      {/* Avatar */}
      <div style={{ marginBottom: 13 }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1771072428050-1492abb58f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200"
          alt="Tehreem Noor"
          style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      {/* Name / handle / title */}
      <p style={{ margin: '0 0 2px', color: '#fff', fontSize: 14.5, fontWeight: 700, fontFamily: FH }}>Tehreem Noor</p>
      <p style={{ margin: '0 0 1px', color: '#666', fontSize: 11, fontFamily: FB }}>@tehreemnoor &bull; 24</p>
      <p style={{ margin: '0 0 18px', color: '#666', fontSize: 11, fontFamily: FB }}>UI/UX Designer</p>

      {/* Experience strip */}
      <p style={{
        margin: '0 0 7px', color: '#444', fontSize: 10,
        letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: FB,
      }}>
        Tools &amp; Skills
      </p>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 18 }}>
        {tools.map(t => (
          <div key={t.label} style={{
            width: 24, height: 24,
            background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ fontSize: 7.5, color: t.color, fontWeight: 700, fontFamily: FB, lineHeight: 1 }}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Message button */}
      <button style={{
        background: LIME, color: '#0d0d0d', border: 'none', borderRadius: 8,
        padding: '9px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        cursor: 'pointer', width: '100%',
        fontSize: 13, fontWeight: 600, fontFamily: FH, marginBottom: 20,
      }}>
        <MessageSquare size={13} strokeWidth={2.5} />
        Message
      </button>

      {/* Divider */}
      <div style={{ height: 1, background: '#202020', marginBottom: 14 }} />

      {/* Nav items */}
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
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

// ─── Sticky top navigation ─────────────────────────────────────────────────────
function TopNav() {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 44px', height: 58,
      borderBottom: '1px solid #ebebeb',
      background: '#fff',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <LogoMark />

      <nav style={{ display: 'flex', gap: 34 }}>
        {['ABOUT', 'WORK', 'CONTACT'].map(item => (
          <a key={item} href="#" style={{
            fontSize: 10.5, letterSpacing: '0.13em',
            color: '#222', textDecoration: 'none',
            fontFamily: FH, fontWeight: 500,
          }}>
            {item}
          </a>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          <Globe size={12} color="#777" strokeWidth={1.75} />
          <span style={{ fontSize: 10.5, color: '#777', fontFamily: FB }}>EN</span>
        </div>
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          border: '1px solid #ddd',
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
    </header>
  )
}

// ─── Hero section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: 'calc(100vh - 58px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 52px 56px',
      background: '#fff',
    }}>
      {/* Breadcrumb */}
      <p style={{
        margin: '0 0 26px',
        fontSize: 9.5, letterSpacing: '0.14em', color: '#bbb',
        textTransform: 'uppercase', fontFamily: FB, fontWeight: 400,
      }}>
        HI I'M TEHREEM NOOR — 24 Y/O UI/UX DESIGNER, WORKING GLOBALLY
      </p>

      {/* Giant heading */}
      <h1 style={{
        margin: '0 0 24px',
        fontSize: 'clamp(54px, 7.8vw, 90px)',
        fontWeight: 700,
        lineHeight: 0.95,
        letterSpacing: '-0.025em',
        color: '#0d0d0d',
        fontFamily: FH,
      }}>
        UI/UX designer
        <br />
        &amp; product thinker
      </h1>

      {/* Subtitle */}
      <p style={{
        margin: '0 0 38px',
        fontSize: 13, color: '#888', lineHeight: 1.7,
        maxWidth: 340, fontFamily: FB, fontWeight: 400,
      }}>
        Designing intuitive digital products that balance
        <br />
        clarity, beauty, and real-world function.
      </p>

      {/* CTA */}
      <div>
        <button style={{
          background: LIME, color: '#0d0d0d', border: 'none',
          borderRadius: 100, padding: '12px 26px',
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
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>
      <Sidebar />
      <div id="main-scroll" style={{ flex: 1, overflowY: 'auto', height: '100vh' }}>
        <TopNav />
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <CapabilitiesSection />
        <SkillsBubbles />
        <Footer />
      </div>
    </div>
  )
}
