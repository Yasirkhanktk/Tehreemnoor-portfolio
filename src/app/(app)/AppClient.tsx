"use client"

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Globe, Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import logoImg from '../../imports/Logo-light.png'
import { ProjectsSection } from '../components/ProjectsSection'
import { AboutSection } from '../components/AboutSection'
import { CapabilitiesSection } from '../components/CapabilitiesSection'
import { SkillsBubbles } from '../components/SkillsBubbles'
import { Footer } from '../components/Footer'
import { GlobalCursor } from '../components/GlobalCursor'
import { CaseStudy } from '../components/CaseStudy'
import { SplashScreen } from '../components/SplashScreen'
import { useIsMobile } from '../utils/useIsMobile'
import type { ProjectData } from '../data/projects'

const LIME = '#C5F135'
const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src={typeof logoImg === 'string' ? logoImg : logoImg.src}
      alt="Tehreem Noor logo"
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0, display: 'block' }}
    />
  )
}

// ─── Scroll to section helper ─────────────────────────────────────────────────
function scrollToSection(id: string) {
  const scroller = document.getElementById('main-scroll')
  const target   = document.getElementById(id)
  if (!scroller || !target) return
  const top = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
  scroller.scrollTo({ top: top - 64, behavior: 'smooth' })
}

// ─── Top navigation ────────────────────────────────────────────────────────────
function TopNav({
  isMobile,
  onMenuOpen,
  onNavClick,
  onLogoClick,
}: {
  isMobile: boolean
  onMenuOpen: () => void
  onNavClick: (section: string) => void
  onLogoClick: () => void
}) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '0 20px' : '0 52px',
      height: 64,
      borderBottom: '1px solid #ebebeb',
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {/* Logo + name */}
      <button 
        onClick={onLogoClick}
        style={{ 
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'none', border: 'none', padding: 0, cursor: 'pointer'
        }}
      >
        <LogoMark />
        {!isMobile && (
          <span style={{ fontSize: 13, fontWeight: 600, color: '#0d0d0d', fontFamily: FH, letterSpacing: '-0.01em' }}>
            Tehreem Noor
          </span>
        )}
      </button>

      {isMobile ? (
        <button onClick={onMenuOpen} style={{
          background: 'none', border: 'none', padding: 4,
          display: 'flex', alignItems: 'center',
        }}>
          <Menu size={22} color="#333" />
        </button>
      ) : (
        <>
          <nav style={{ display: 'flex', gap: 36 }}>
            {[
              { label: 'ABOUT',   id: 'about' },
              { label: 'WORK',    id: 'work' },
              { label: 'CONTACT', id: 'contact' },
            ].map(({ label, id }) => (
              <a
                key={label}
                href="#"
                onClick={e => { e.preventDefault(); onNavClick(id) }}
                style={{
                  fontSize: 10.5, letterSpacing: '0.13em', color: '#222',
                  textDecoration: 'none', fontFamily: FH, fontWeight: 500,
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Globe size={12} color="#777" strokeWidth={1.75} />
              <span style={{ fontSize: 10.5, color: '#777', fontFamily: FB }}>EN</span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f0f0ec', borderRadius: 20, padding: '5px 12px',
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
function Hero({ isMobile, onViewWork, onContact }: { isMobile: boolean; onViewWork: () => void; onContact: () => void }) {
  return (
    <section style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '60px 28px 80px' : '80px 80px 100px',
      background: '#fff',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '8%', right: '4%',
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197,241,53,0.1) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '14%', left: '2%',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(197,241,53,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Intro label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          margin: '0 0 26px',
          fontSize: isMobile ? 8.5 : 10,
          letterSpacing: '0.16em',
          color: '#b8b8b8',
          textTransform: 'uppercase',
          fontFamily: FB,
          fontWeight: 400,
        }}
      >
        HI I'M TEHREEM NOOR — 24 Y/O UI/UX DESIGNER, WORKING GLOBALLY
      </motion.p>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
        style={{
          margin: '0 0 28px',
          fontSize: isMobile ? 'clamp(36px, 10.5vw, 52px)' : 'clamp(58px, 7.2vw, 92px)',
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: '#0d0d0d',
          fontFamily: FH,
          maxWidth: isMobile ? '100%' : 980,
        }}
      >
        UI UX Designer{' '}
        <span style={{ color: LIME }}>&</span>
        <br />
        Designing Experiences,
        <br />
        Not Just Screens
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{
          margin: '0 0 48px',
          fontSize: isMobile ? 14 : 15,
          color: '#888',
          lineHeight: 1.75,
          maxWidth: 460,
          fontFamily: FB,
          fontWeight: 400,
        }}
      >
        Crafting scalable digital products focused on usability, clarity, and business impact.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.28 }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <button
          onClick={onViewWork}
          style={{
            background: LIME, color: '#0d0d0d', border: 'none',
            borderRadius: 100, padding: isMobile ? '12px 26px' : '14px 32px',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 700, fontFamily: FH, letterSpacing: '0.1em',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.transform = 'translateY(-2px)'
            b.style.boxShadow = '0 10px 28px rgba(197,241,53,0.38)'
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.transform = ''
            b.style.boxShadow = ''
          }}
        >
          VIEW WORK
          <ChevronRight size={13} strokeWidth={2.5} />
        </button>

        <button
          onClick={onContact}
          style={{
            background: 'transparent', color: '#0d0d0d',
            border: '1.5px solid #d0d0d0',
            borderRadius: 100, padding: isMobile ? '12px 26px' : '14px 32px',
            display: 'inline-flex', alignItems: 'center',
            fontSize: 11, fontWeight: 600, fontFamily: FH, letterSpacing: '0.04em',
            transition: 'border-color 0.18s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#0d0d0d' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#d0d0d0' }}
        >
          Let's Talk
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        style={{
          position: 'absolute',
          bottom: isMobile ? 28 : 38,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.2em', color: '#ccc', fontFamily: FB, textTransform: 'uppercase' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 26, background: 'linear-gradient(to bottom, #ccc, transparent)' }}
        />
      </motion.div>
    </section>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AppClient({ initialProjects }: { initialProjects: ProjectData[] }) {
  const PROJECTS = initialProjects
  const isMobile  = useIsMobile()
  const [menuOpen, setMenuOpen]     = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const wasViewingProject = useRef(false)

  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  // Track scrolling for Go to Top button
  useEffect(() => {
    const scroller = document.getElementById('main-scroll')
    if (!scroller) return
    const handleScroll = () => {
      setShowScrollTop(scroller.scrollTop > 400)
    }
    scroller.addEventListener('scroll', handleScroll)
    return () => scroller.removeEventListener('scroll', handleScroll)
  }, [])

  // Only scroll back to top when *closing* a case study, never on initial mount
  useEffect(() => {
    if (!selectedProject && wasViewingProject.current) {
      setTimeout(() => {
        document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })
      }, 80)
    }
    wasViewingProject.current = !!selectedProject
  }, [selectedProject])

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project)
    document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNavClick = (section: string) => {
    if (selectedProject) {
      setSelectedProject(null)
      setTimeout(() => scrollToSection(section), 120)
    } else {
      scrollToSection(section)
    }
    setMenuOpen(false)
  }

  const handleLogoClick = () => {
    if (selectedProject) setSelectedProject(null)
    setMenuOpen(false)
    document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScrollTopClick = () => {
    document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const nextProject = (() => {
    if (!selectedProject) return null
    // Find projects that share the exact same primary category (the first item in cats array)
    const primaryCat = selectedProject.cats[0]
    const sameCatProjects = PROJECTS.filter(p => p.cats[0] === primaryCat)
    
    if (sameCatProjects.length > 1) {
      const idx = sameCatProjects.findIndex(p => p.id === selectedProject.id)
      return sameCatProjects[(idx + 1) % sameCatProjects.length]
    }
    // Fallback if no other projects share the exact category
    return PROJECTS[(PROJECTS.findIndex(p => p.id === selectedProject.id) + 1) % PROJECTS.length]
  })()

  return (
    <div style={{ background: '#fff' }}>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <GlobalCursor />

      {/* Go to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={handleScrollTopClick}
            style={{
              position: 'fixed',
              bottom: isMobile ? 24 : 40,
              right: isMobile ? 24 : 40,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: LIME,
              color: '#000',
              border: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 90,
            }}
          >
            <ArrowUpRight size={20} style={{ transform: 'rotate(-45deg)' }} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <div
        id="main-scroll"
        style={{
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollSnapType: selectedProject ? 'y mandatory' : 'none',
          scrollBehavior: 'smooth',
        }}
      >

        {/* Case study view */}
        {selectedProject ? (
          <CaseStudy
            project={selectedProject}
            nextProject={nextProject}
            onClose={() => setSelectedProject(null)}
            onLogoClick={handleLogoClick}
            onNavigate={(id) => {
              const p = PROJECTS.find(x => x.id === id)
              if (p) handleProjectClick(p)
            }}
          />
        ) : (
          <>
            <TopNav isMobile={isMobile} onMenuOpen={() => setMenuOpen(true)} onNavClick={handleNavClick} onLogoClick={handleLogoClick} />

            {/* Mobile nav dropdown */}
            <AnimatePresence>
              {isMobile && menuOpen && (
                <>
                  <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => setMenuOpen(false)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 100 }}
                  />
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'fixed', top: 64, left: 0, right: 0,
                      background: '#fff', borderBottom: '1px solid #ebebeb',
                      zIndex: 101, padding: '8px 0 16px',
                    }}
                  >
                    <button onClick={() => setMenuOpen(false)} style={{
                      position: 'absolute', top: 12, right: 16,
                      background: 'none', border: 'none', padding: 4,
                    }}>
                      <X size={18} color="#555" />
                    </button>
                    {[
                      { label: 'ABOUT',   id: 'about' },
                      { label: 'WORK',    id: 'work' },
                      { label: 'CONTACT', id: 'contact' },
                    ].map(({ label, id }) => (
                      <button key={label} onClick={() => handleNavClick(id)} style={{
                        display: 'block', width: '100%',
                        padding: '14px 24px', background: 'none', border: 'none',
                        fontSize: 13, letterSpacing: '0.1em', color: '#222',
                        fontFamily: FH, fontWeight: 500, textAlign: 'left',
                      }}>
                        {label}
                      </button>
                    ))}
                    <div style={{ padding: '10px 24px 0' }}>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: '#f0f0ec', borderRadius: 20, padding: '6px 12px',
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
                        <span style={{ fontSize: 11, color: '#333', fontFamily: FB }}>Available for projects</span>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <Hero isMobile={isMobile} onViewWork={() => scrollToSection('work')} onContact={() => scrollToSection('contact')} />
            <div id="work"><ProjectsSection onProjectClick={handleProjectClick} initialProjects={PROJECTS} /></div>
            <div id="about"><AboutSection /></div>
            <CapabilitiesSection />
            <SkillsBubbles />
            <div id="contact"><Footer /></div>
          </>
        )}
      </div>
    </div>
  )
}
