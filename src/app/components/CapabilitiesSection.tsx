import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useIsMobile } from '../utils/useIsMobile'

const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"
const LIME = '#C5F135'

const CAPABILITIES = [
  {
    id: 1,
    number: '01',
    title: 'Product Design',
    tags: ['UI/UX', 'DESIGN SYSTEMS', 'VISUAL CRAFT'],
    description:
      'Interaction design, information architecture, and visual craft for complex digital products. From early discovery to final delivery, including design systems that teams can actually maintain.',
  },
  {
    id: 2,
    number: '02',
    title: 'User Research',
    tags: ['DISCOVERY', 'TESTING', 'INSIGHTS'],
    description:
      'Turning ambiguity into clarity through structured user interviews, usability testing, and behavioural analysis. I surface the insights that shape smarter product decisions.',
  },
  {
    id: 3,
    number: '03',
    title: 'Systems Thinking',
    tags: ['FINTECH', 'WEB3', 'AI PRODUCTS'],
    description:
      'Building scalable design architectures that work across products, platforms, and teams. I create component libraries, design tokens, and documentation that scale without chaos.',
  },
  {
    id: 4,
    number: '04',
    title: 'Design Engineering',
    tags: ['PROTOTYPING', 'MOTION', 'FRONT-END'],
    description:
      'Bridging design and code through high-fidelity prototypes, micro-interactions, and front-end collaboration. I speak both languages fluently to reduce handoff friction.',
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
    <section style={{ background: '#fff', borderTop: '1px solid #efefef', padding: `${isMobile ? 44 : 64}px 0 ${isMobile ? 52 : 72}px` }}>

      {/* ── Section header ── */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'flex-start',
        padding: `0 ${px}px`,
        marginBottom: isMobile ? 36 : 52,
        gap: isMobile ? 12 : 0,
      }}>
        <div>
          <p style={{
            margin: '0 0 10px',
            fontSize: 9.5,
            letterSpacing: '0.16em',
            color: '#aaa',
            textTransform: 'uppercase',
            fontFamily: FB,
          }}>
            CAPABILITIES
          </p>
          <h2 style={{
            margin: 0,
            fontSize: isMobile ? 'clamp(32px, 9vw, 48px)' : 'clamp(38px, 5vw, 60px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: '#0d0d0d',
            fontFamily: FH,
          }}>
            what i do
          </h2>
        </div>

        <p style={{
          margin: isMobile ? 0 : '14px 0 0',
          fontSize: 13,
          color: '#888',
          fontFamily: FB,
          maxWidth: isMobile ? '100%' : 340,
          lineHeight: 1.6,
          textAlign: isMobile ? 'left' : 'right',
        }}>
          A closer look at what the work actually involves.
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
                borderTop: '1px solid #e8e8e8',
                borderLeft: isOpen ? `3px solid ${LIME}` : '3px solid transparent',
                transition: 'border-left-color 0.25s ease',
                paddingLeft: isOpen ? 22 : 24,
              }}
            >
              {/* ── Row header ── */}
              <button
                onClick={() => toggle(cap.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? 12 : 24,
                  padding: isMobile ? '20px 0' : '28px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {/* Number */}
                <span style={{
                  fontSize: 11,
                  color: '#ccc',
                  fontFamily: FB,
                  fontWeight: 400,
                  minWidth: 24,
                  flexShrink: 0,
                }}>
                  {cap.number}
                </span>

                {/* Title */}
                <span style={{
                  fontSize: isMobile ? 'clamp(16px, 4.5vw, 22px)' : 'clamp(18px, 2.2vw, 26px)',
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
                  <div style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'center',
                    flexShrink: 0,
                  }}>
                    {cap.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 10,
                        fontWeight: 500,
                        color: '#aaa',
                        fontFamily: FB,
                        letterSpacing: '0.1em',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Toggle button */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: '1.5px solid #d0d0d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: isMobile ? 8 : 16,
                  color: '#444',
                  transition: 'all 0.2s ease',
                  background: isOpen ? '#0d0d0d' : 'transparent',
                  borderColor: isOpen ? '#0d0d0d' : '#d0d0d0',
                }}>
                  {isOpen
                    ? <X size={12} color="#fff" strokeWidth={2.5} />
                    : <Plus size={12} color="#555" strokeWidth={2.5} />
                  }
                </div>
              </button>

              {/* ── Expanded content ── */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 0, 0, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Tags inline on mobile inside expanded content */}
                    {isMobile && (
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12, paddingLeft: 36 }}>
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
                    <p style={{
                      margin: '0 0 28px',
                      paddingLeft: isMobile ? 36 : 48,
                      fontSize: 13,
                      color: '#777',
                      lineHeight: 1.75,
                      fontFamily: FB,
                      maxWidth: 420,
                    }}>
                      {cap.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}

        {/* Bottom border */}
        <div style={{ borderTop: '1px solid #e8e8e8' }} />
      </div>

    </section>
  )
}
