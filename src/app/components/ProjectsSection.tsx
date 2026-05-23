import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { useIsMobile } from '../utils/useIsMobile'
import { PROJECTS } from '../data/projects'
import type { ProjectData } from '../data/projects'

const LIME = '#C5F135'
const DRAG_PURPLE = '#7C3AED'
const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

const CATS = ['All', 'Website', 'Application', 'Mobile', 'Web3', 'Branding']

export function ProjectsSection({ onProjectClick }: { onProjectClick: (project: ProjectData) => void }) {
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              margin: '0 0 8px',
              fontSize: 9.5,
              letterSpacing: '0.18em',
              color: '#bbb',
              textTransform: 'uppercase',
              fontFamily: FB,
            }}
          >
            WORK
          </motion.p>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            gap: isMobile ? 10 : 0,
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay: 0.07 }}
              style={{
                margin: 0,
                fontSize: isMobile ? 'clamp(42px, 13vw, 64px)' : 'clamp(64px, 8vw, 96px)',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: '#0d0d0d',
                fontFamily: FH,
              }}
            >
              projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              style={{
                margin: isMobile ? 0 : '0 0 8px',
                fontSize: 13,
                color: '#aaa',
                fontFamily: FB,
                lineHeight: 1.6,
                maxWidth: 280,
                textAlign: isMobile ? 'left' : 'right',
              }}
            >
              Carefully crafted work that reflects how I think, build, and ship.
            </motion.p>
          </div>
        </div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            display: 'flex', gap: 6,
            padding: `0 ${px}px`,
            marginBottom: isMobile ? 24 : 32,
            flexWrap: 'wrap',
          }}
        >
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
        </motion.div>

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
                        onClick={() => onProjectClick(p)}
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
