import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useIsMobile } from '../utils/useIsMobile'

const LIME = '#C5F135'
const DRAG_PURPLE = '#7C3AED'
const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

const CATS = ['All', 'Website', 'Application', 'Mobile', 'Web3', 'Branding']

const PROJECTS = [
  {
    id: 1,
    name: 'Moove',
    description: 'Mobility app redesign that boosted ride completion rates by 23% through simplified UX flows.',
    tags: ['MOBILE', 'UX'],
    year: '2026',
    bg: '#6B35B0',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1620207284057-e6c6b3d1b4c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Application', 'Mobile'],
  },
  {
    id: 2,
    name: 'Metrix',
    description: 'Replaced a dense configuration form with a step-by-step wizard. Setup became 35% faster.',
    tags: ['WEB', 'SAAS'],
    year: '2026',
    bg: '#C75028',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1669101602104-bfa264a17cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Website', 'Application'],
  },
  {
    id: 3,
    name: 'Vox Swap',
    description: 'Designed transaction states and system health dashboards for a DeFi exchange.',
    tags: ['WEB', 'DEFI', 'WEB3'],
    year: '2025',
    bg: '#2B3EB5',
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1639825988283-39e5408b75e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Website', 'Web3'],
  },
  {
    id: 4,
    name: 'Pago',
    description: 'Personal finance tracker with AI-powered insights and automated budget recommendations.',
    tags: ['MOBILE', 'FINTECH'],
    year: '2025',
    bg: '#1A2B50',
    category: 'App',
    image: 'https://images.unsplash.com/photo-1642142784847-83b9b8a22910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Application', 'Mobile'],
  },
  {
    id: 5,
    name: 'Nomo Studio',
    description: 'End-to-end design system and brand identity for a fast-growing B2B SaaS company.',
    tags: ['WEB', 'BRANDING'],
    year: '2024',
    bg: '#1E3D30',
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Website', 'Branding'],
  },
]

export function ProjectsSection() {
  const isMobile = useIsMobile()
  const [activeCat, setActiveCat] = useState('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false })

  const rowRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollOrigin = useRef(0)

  const filtered = activeCat === 'All' ? PROJECTS : PROJECTS.filter(p => p.cats.includes(activeCat))
  const px = isMobile ? 20 : 52

  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true
    dragStartX.current = e.pageX
    scrollOrigin.current = rowRef.current?.scrollLeft ?? 0
  }

  function onMouseMove(e: React.MouseEvent) {
    setCursor({ x: e.clientX, y: e.clientY, show: true })
    if (!dragging.current || !rowRef.current) return
    rowRef.current.scrollLeft = scrollOrigin.current + (dragStartX.current - e.pageX)
  }

  function onMouseUp() { dragging.current = false }

  function onMouseLeave() {
    dragging.current = false
    setCursor(c => ({ ...c, show: false }))
  }

  const cardW = isMobile ? 'min(300px, 82vw)' : 390

  return (
    <>
      {/* DRAG cursor — desktop only */}
      {!isMobile && (
        <motion.div
          animate={{
            x: cursor.x - 46,
            y: cursor.y - 46,
            opacity: cursor.show ? 1 : 0,
            scale: cursor.show ? 1 : 0.55,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.4 }}
          style={{
            position: 'fixed', top: 0, left: 0,
            width: 92, height: 92,
            borderRadius: '50%',
            background: DRAG_PURPLE,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', zIndex: 9999,
          }}
        >
          <span style={{ color: '#fff', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.22em', fontFamily: FH }}>
            DRAG
          </span>
        </motion.div>
      )}

      <section style={{ paddingTop: isMobile ? 44 : 64, background: '#fff', borderTop: '1px solid #efefef' }}>

        {/* ── Section header ── */}
        <div style={{ padding: `0 ${px}px`, marginBottom: isMobile ? 28 : 36 }}>
          <p style={{
            margin: '0 0 8px',
            fontSize: 9.5,
            letterSpacing: '0.18em',
            color: '#bbb',
            textTransform: 'uppercase',
            fontFamily: FB,
          }}>
            WORK
          </p>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: isMobile ? 10 : 0,
          }}>
            <h2 style={{
              margin: 0,
              fontSize: isMobile ? 'clamp(42px, 13vw, 64px)' : 'clamp(64px, 8vw, 96px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#0d0d0d',
              fontFamily: FH,
            }}>
              projects
            </h2>
            <p style={{
              margin: isMobile ? 0 : '0 0 8px',
              fontSize: 13,
              color: '#aaa',
              fontFamily: FB,
              lineHeight: 1.6,
              maxWidth: 280,
              textAlign: isMobile ? 'left' : 'right',
            }}>
              Carefully crafted work that reflects how I think, build, and ship.
            </p>
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div style={{
          display: 'flex', gap: 6,
          padding: `0 ${px}px`,
          marginBottom: isMobile ? 24 : 32,
          flexWrap: 'wrap',
        }}>
          {CATS.map(cat => {
            const active = activeCat === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  background: active ? LIME : '#f5f5f5',
                  color: active ? '#0d0d0d' : '#777',
                  border: 'none',
                  borderRadius: 100,
                  padding: isMobile ? '7px 14px' : '8px 20px',
                  fontSize: isMobile ? 11 : 11.5,
                  fontWeight: active ? 700 : 400,
                  fontFamily: FH,
                  letterSpacing: '0.02em',
                  transition: 'all 0.16s ease',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* ── Cards row ── */}
        <style>{`.proj-row::-webkit-scrollbar{display:none}`}</style>
        <div
          ref={rowRef}
          className="proj-row"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          style={{
            display: 'flex',
            gap: isMobile ? 16 : 6,
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            cursor: isMobile ? 'default' : 'none',
            paddingLeft: px,
            paddingRight: px,
            paddingBottom: isMobile ? 44 : 68,
            userSelect: 'none',
          }}
        >
          {filtered.map(p => (
            <div
              key={p.id}
              style={{
                minWidth: cardW,
                maxWidth: cardW,
                flexShrink: 0,
                background: '#fff',
                // No border/stroke — open card
              }}
              onMouseEnter={() => !isMobile && setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image area with hover overlay */}
              <div style={{
                height: isMobile ? 210 : 272,
                background: p.bg,
                borderRadius: 14,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ImageWithFallback
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: '76%', height: '82%',
                    objectFit: 'cover',
                    borderRadius: 8,
                    boxShadow: '0 28px 64px rgba(0,0,0,0.5)',
                    display: 'block',
                    pointerEvents: 'none',
                    transition: 'transform 0.4s ease',
                    transform: hoveredId === p.id ? 'scale(0.97)' : 'scale(1)',
                  }}
                />

                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredId === p.id && (
                    <motion.div
                      key="overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(0,0,0,0.62)',
                        borderRadius: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* View button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.88, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: 0.06 }}
                        style={{
                          background: '#fff',
                          color: '#0d0d0d',
                          border: 'none',
                          borderRadius: 100,
                          padding: '11px 22px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 7,
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: FH,
                          letterSpacing: '0.08em',
                        }}
                      >
                        VIEW CASE STUDY
                        <ArrowUpRight size={13} strokeWidth={2.5} />
                      </motion.button>

                      {/* Category + name — bottom left */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: 0.08 }}
                        style={{
                          position: 'absolute',
                          bottom: 16, left: 18,
                        }}
                      >
                        <span style={{
                          display: 'block',
                          fontSize: 9.5,
                          letterSpacing: '0.14em',
                          color: LIME,
                          fontFamily: FB,
                          textTransform: 'uppercase',
                          marginBottom: 3,
                        }}>
                          {p.category}
                        </span>
                        <span style={{
                          display: 'block',
                          fontSize: 16,
                          fontWeight: 700,
                          color: '#fff',
                          fontFamily: FH,
                          letterSpacing: '-0.02em',
                        }}>
                          {p.name}
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Text below — no border, open layout */}
              <div style={{ padding: '16px 4px 0' }}>
                {/* Tags + year */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 9, fontWeight: 600, color: '#888',
                        fontFamily: FB, letterSpacing: '0.1em',
                        background: '#f3f3f3', padding: '3px 8px', borderRadius: 4,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: '#ccc', fontFamily: FB }}>{p.year}</span>
                </div>

                {/* Project name */}
                <p style={{
                  margin: '0 0 6px',
                  fontSize: isMobile ? 18 : 20,
                  fontWeight: 700,
                  color: '#0d0d0d',
                  fontFamily: FH,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}>
                  {p.name}
                </p>

                {/* Description */}
                <p style={{
                  margin: 0,
                  fontSize: 12.5,
                  color: '#aaa',
                  fontFamily: FB,
                  lineHeight: 1.65,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                } as React.CSSProperties}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}

          <div style={{ minWidth: 4, flexShrink: 0 }} />
        </div>
      </section>
    </>
  )
}
