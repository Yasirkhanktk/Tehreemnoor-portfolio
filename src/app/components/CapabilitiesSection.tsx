import { useState } from 'react'
import { Plus, X } from 'lucide-react'
// Plus used only for the accordion toggle
import { motion, AnimatePresence } from 'motion/react'
import { useIsMobile } from '../utils/useIsMobile'

const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"
const LIME = '#C5F135'

// ─── Capability data with dynamic project references ──────────────────────────
const CAPABILITIES = [
  {
    id: 1,
    number: '01',
    title: 'Product Design',
    tags: ['UI/UX', 'DESIGN SYSTEMS', 'VISUAL CRAFT'],
    description:
      'I design complex digital products by aligning user needs, business goals, and technical constraints — from early discovery to scalable, production-ready systems.',
    appliedContexts: ['Banking onboarding', 'Matching flows', 'SaaS dashboards'],
    seenIn: ['Moove', 'Metrix', 'Pago', 'Nomo Studio'],
  },
  {
    id: 2,
    number: '02',
    title: 'User Research',
    tags: ['DISCOVERY', 'TESTING', 'INSIGHTS'],
    description:
      'Turning ambiguity into clarity through structured user interviews, usability testing, and behavioural analysis. I surface the insights that shape smarter product decisions.',
    appliedContexts: ['Usability testing', 'Discovery sprints', 'Behavioural analysis'],
    seenIn: ['Moove', 'Pago'],
  },
  {
    id: 3,
    number: '03',
    title: 'Systems Thinking',
    tags: ['FLOWS', 'DEPENDENCIES', 'SCALABILITY'],
    description:
      'Building scalable design architectures that work across products, platforms, and teams. I create component libraries, design tokens, and documentation that scale without chaos.',
    appliedContexts: ['Component libraries', 'Token architecture', 'Multi-product systems'],
    seenIn: ['Nomo Studio', 'Vox Swap', 'Metrix'],
  },
  {
    id: 4,
    number: '04',
    title: 'Design Engineering',
    tags: ['PROTOTYPING', 'MOTION', 'FRONT-END'],
    description:
      'Bridging design and code through high-fidelity prototypes, micro-interactions, and front-end collaboration. I speak both languages fluently to reduce handoff friction.',
    appliedContexts: ['Interactive prototypes', 'Micro-interactions', 'Motion design'],
    seenIn: ['Vox Swap', 'Moove', 'Nomo Studio'],
  },
]

export function CapabilitiesSection() {
  const isMobile = useIsMobile()
  const [openId, setOpenId] = useState<number | null>(1)

  const px = isMobile ? 20 : 52

  function toggle(id: number) {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <section style={{
      background: '#fff',
      borderTop: '1px solid #efefef',
      padding: `${isMobile ? 44 : 72}px 0 ${isMobile ? 52 : 80}px`,
    }}>

      {/* ── Section header ── */}
      <div style={{ padding: `0 ${px}px`, marginBottom: isMobile ? 40 : 56 }}>
        <p style={{
          margin: '0 0 14px',
          fontSize: 9.5,
          letterSpacing: '0.18em',
          color: '#bbb',
          textTransform: 'uppercase',
          fontFamily: FB,
        }}>
          CAPABILITIES
        </p>
        <h2 style={{
          margin: '0 0 14px',
          fontSize: isMobile ? 'clamp(28px, 8vw, 42px)' : 'clamp(40px, 5.2vw, 62px)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: '#0d0d0d',
          fontFamily: FH,
        }}>
          What I do{' '}
          <span style={{ fontWeight: 400, color: '#555' }}>—</span>
          {' '}and how I think
        </h2>
        <p style={{
          margin: 0,
          fontSize: 13,
          color: '#aaa',
          fontFamily: FB,
          lineHeight: 1.6,
        }}>
          A closer look at how I design, research, and build digital products.
        </p>
      </div>

      {/* ── Accordion list ── */}
      <div style={{ padding: `0 ${px}px` }}>
        {CAPABILITIES.map((cap) => {
          const isOpen = openId === cap.id
          return (
            <div
              key={cap.id}
              style={{
                borderTop: '1px solid #eaeaea',
                borderLeft: isOpen ? `3px solid ${LIME}` : '3px solid transparent',
                transition: 'border-left-color 0.25s ease',
                paddingLeft: isOpen ? 20 : 22,
              }}
            >
              {/* ── Row ── */}
              <button
                onClick={() => toggle(cap.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? 10 : 20,
                  padding: isMobile ? '20px 0' : '26px 0',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                }}
              >
                {/* Number */}
                <span style={{
                  fontSize: 10,
                  color: '#ccc',
                  fontFamily: FB,
                  minWidth: 22,
                  flexShrink: 0,
                }}>
                  {cap.number}
                </span>

                {/* Title */}
                <span style={{
                  fontSize: isMobile ? 'clamp(17px, 4.8vw, 22px)' : 'clamp(20px, 2.2vw, 26px)',
                  fontWeight: 700,
                  color: '#0d0d0d',
                  fontFamily: FH,
                  letterSpacing: '-0.02em',
                  flex: 1,
                }}>
                  {cap.title}
                </span>

                {/* Tags — hidden on mobile */}
                {!isMobile && (
                  <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexShrink: 0 }}>
                    {cap.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 9.5,
                        fontWeight: 500,
                        color: '#bbb',
                        fontFamily: FB,
                        letterSpacing: '0.1em',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Toggle */}
                <div style={{
                  width: 28, height: 28,
                  borderRadius: '50%',
                  flexShrink: 0,
                  marginLeft: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isOpen ? '#0d0d0d' : 'transparent',
                  border: `1.5px solid ${isOpen ? '#0d0d0d' : '#d8d8d8'}`,
                  transition: 'all 0.2s ease',
                }}>
                  {isOpen
                    ? <X size={12} color="#fff" strokeWidth={2.5} />
                    : <Plus size={12} color="#888" strokeWidth={2.5} />
                  }
                </div>
              </button>

              {/* ── Expanded content ── */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingLeft: isMobile ? 32 : 42, paddingBottom: 28 }}>

                      {/* Tags on mobile inside expanded */}
                      {isMobile && (
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                          {cap.tags.map(tag => (
                            <span key={tag} style={{
                              fontSize: 9.5, color: '#bbb', fontFamily: FB, letterSpacing: '0.1em',
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Description */}
                      <p style={{
                        margin: '0 0 22px',
                        fontSize: 13,
                        color: '#777',
                        lineHeight: 1.78,
                        fontFamily: FB,
                        maxWidth: 520,
                      }}>
                        {cap.description}
                      </p>

                      {/* ── Applied in ── */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {/* Context pill — no icon */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <div style={{
                            display: 'inline-flex', alignItems: 'center',
                            background: 'rgba(197,241,53,0.12)',
                            border: `1px solid rgba(197,241,53,0.35)`,
                            borderRadius: 100,
                            padding: '5px 14px',
                          }}>
                            <span style={{
                              fontSize: 11.5,
                              color: '#3a4a00',
                              fontFamily: FH,
                              fontWeight: 500,
                            }}>
                              {cap.appliedContexts.join(', ')}
                            </span>
                          </div>
                        </div>

                        {/* Applied in */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: 11,
                            color: '#bbb',
                            fontFamily: FB,
                            whiteSpace: 'nowrap',
                          }}>
                            Applied in:
                          </span>
                          {cap.seenIn.map(project => (
                            <span key={project} style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: '#555',
                              fontFamily: FH,
                              background: '#f5f5f5',
                              borderRadius: 100,
                              padding: '4px 12px',
                              letterSpacing: '-0.01em',
                            }}>
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {/* Bottom border */}
        <div style={{ borderTop: '1px solid #eaeaea' }} />
      </div>

    </section>
  )
}
