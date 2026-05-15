import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ImageWithFallback } from './figma/ImageWithFallback'

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
    image: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    cats: ['Website', 'Branding'],
  },
]

export function ProjectsSection() {
  const [activeCat, setActiveCat] = useState('All')
  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false })

  const rowRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const scrollOrigin = useRef(0)

  const filtered = activeCat === 'All' ? PROJECTS : PROJECTS.filter(p => p.cats.includes(activeCat))

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

  return (
    <>
      {/* ── Custom drag cursor (fixed, follows mouse) ── */}
      <motion.div
        animate={{
          x: cursor.x - 46,
          y: cursor.y - 46,
          opacity: cursor.show ? 1 : 0,
          scale: cursor.show ? 1 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.4 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 92,
          height: 92,
          borderRadius: '50%',
          background: DRAG_PURPLE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        <span style={{
          color: '#fff',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.22em',
          fontFamily: FH,
        }}>
          DRAG
        </span>
      </motion.div>

      <section style={{ paddingTop: 60, background: '#fff' }}>

        {/* ── Section header ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 52px',
          marginBottom: 26,
        }}>
          <div>
            <p style={{
              margin: '0 0 7px',
              fontSize: 9.5,
              letterSpacing: '0.16em',
              color: '#aaa',
              textTransform: 'uppercase',
              fontFamily: FB,
            }}>
              SELECTED WORK
            </p>
            <p style={{ margin: 0, fontSize: 13, color: '#888', fontFamily: FB, lineHeight: 1.5 }}>
              Projects that reflect how I think, build, and ship.
            </p>
          </div>
          <h2 style={{
            margin: 0,
            fontSize: 'clamp(42px, 5.5vw, 74px)',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#0d0d0d',
            fontFamily: FH,
          }}>
            projects
          </h2>
        </div>

        {/* ── Category filter pills ── */}
        <div style={{
          display: 'flex',
          gap: 7,
          padding: '0 52px',
          marginBottom: 30,
          flexWrap: 'wrap',
        }}>
          {CATS.map(cat => {
            const active = activeCat === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  background: active ? LIME : 'transparent',
                  color: active ? '#0d0d0d' : '#888',
                  border: `1px solid ${active ? LIME : '#e2e2e2'}`,
                  borderRadius: 100,
                  padding: '6px 18px',
                  fontSize: 11.5,
                  fontWeight: active ? 600 : 400,
                  fontFamily: FH,
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  transition: 'all 0.16s ease',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* ── Draggable cards row ── */}
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
            gap: 4,
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            cursor: 'none',
            paddingLeft: 52,
            paddingRight: 52,
            paddingBottom: 64,
            userSelect: 'none',
          }}
        >
          {filtered.map(p => (
            <div
              key={p.id}
              style={{
                minWidth: 378,
                maxWidth: 378,
                borderRadius: 12,
                overflow: 'hidden',
                flexShrink: 0,
                background: '#fff',
                border: '1px solid #eeeeee',
              }}
            >
              {/* Coloured image area */}
              <div style={{
                height: 258,
                background: p.bg,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ImageWithFallback
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: '76%',
                    height: '82%',
                    objectFit: 'cover',
                    borderRadius: 8,
                    boxShadow: '0 28px 64px rgba(0,0,0,0.5)',
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Info area */}
              <div style={{ padding: '18px 22px 24px' }}>
                {/* Tags + year */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 9,
                        fontWeight: 600,
                        color: '#555',
                        fontFamily: FB,
                        letterSpacing: '0.1em',
                        background: '#f3f3f3',
                        padding: '3px 8px',
                        borderRadius: 4,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: '#ccc', fontFamily: FB }}>{p.year}</span>
                </div>

                {/* Project name */}
                <p style={{
                  margin: '0 0 7px',
                  fontSize: 20,
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
                  color: '#999',
                  fontFamily: FB,
                  lineHeight: 1.6,
                }}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}

          {/* Trailing spacer so last card doesn't hug the right edge */}
          <div style={{ minWidth: 4, flexShrink: 0 }} />
        </div>
      </section>
    </>
  )
}
