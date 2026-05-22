import { useEffect, useRef } from 'react'
import Matter from 'matter-js'
import { useIsMobile } from '../utils/useIsMobile'

const FH = "'Space Grotesk', sans-serif"
const FB = "'Inter', sans-serif"

// ─── Capsule body dimensions ───────────────────────────────────────────────
const BH = 62           // body height (pill height)
const CR = BH / 2       // chamfer = perfect pill ends

// ─── Colour themes ────────────────────────────────────────────────────────
type Col = 'gray' | 'blue' | 'lime'
const THEME: Record<Col, { border: string; text: string; bg: string }> = {
  gray: { border: '#888',   text: '#444',   bg: 'rgba(120,120,120,0.08)' },
  blue: { border: '#5B6AF4',text: '#2E3FC0', bg: 'rgba(91,106,244,0.07)' },
  lime: { border: '#9DBB00',text: '#526500', bg: 'rgba(157,187,0,0.07)'  },
}

// ─── Capsule data — w must roughly match rendered width ───────────────────
interface Cap { id: number; label: string; col: Col; w: number }
const CAPS: Cap[] = [
  // Gray cluster
  { id: 1,  label: 'Research',           col: 'gray', w: 148 },
  { id: 2,  label: 'Edge Cases',         col: 'gray', w: 150 },
  { id: 3,  label: 'Roadmapping',        col: 'gray', w: 162 },
  { id: 4,  label: 'Product Logic',      col: 'gray', w: 176 },
  { id: 5,  label: 'Prototyping',        col: 'gray', w: 162 },
  { id: 6,  label: 'App Design',         col: 'gray', w: 150 },
  { id: 7,  label: 'Accessibility',      col: 'gray', w: 174 },
  // Blue cluster
  { id: 8,  label: 'Wireframes',         col: 'blue', w: 158 },
  { id: 9,  label: 'User Flows',         col: 'blue', w: 152 },
  { id: 10, label: 'Interaction Design', col: 'blue', w: 216 },
  { id: 11, label: 'Design Systems',     col: 'blue', w: 190 },
  { id: 12, label: 'Developer Handoff',  col: 'blue', w: 212 },
  { id: 13, label: 'Usability Testing',  col: 'blue', w: 210 },
  { id: 14, label: 'System Thinking',    col: 'blue', w: 194 },
  { id: 15, label: 'Responsive Apps',    col: 'blue', w: 192 },
  // Lime cluster
  { id: 16, label: 'Visual Craft',       col: 'lime', w: 170 },
  { id: 17, label: 'Motion',             col: 'lime', w: 122 },
  { id: 18, label: 'UI Design',          col: 'lime', w: 140 },
  { id: 19, label: 'UX Design',          col: 'lime', w: 140 },
  { id: 20, label: 'SaaS Platforms',     col: 'lime', w: 184 },
  { id: 21, label: 'Website Design',     col: 'lime', w: 186 },
  { id: 22, label: 'Landing Page',       col: 'lime', w: 168 },
  { id: 23, label: 'Dashboard Designs',  col: 'lime', w: 212 },
]

// ─── Physics setup — called fresh whenever container gets a real width ─────
function setupPhysics(field: HTMLDivElement, elemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) {
  const W = field.offsetWidth
  const H = field.offsetHeight
  if (W < 80) return undefined

  // Engine — light gravity so they fall & tilt naturally
  const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.55 } })

  // Bodies — stagger them above the container so they cascade in
  const bodies = CAPS.map((cap, i) => {
    const col4 = i % 4
    const row  = Math.floor(i / 4)
    // Spread x evenly across container width
    const x = Math.max(
      cap.w / 2 + 8,
      Math.min(
        W - cap.w / 2 - 8,
        ((col4 + 0.5) / 4) * W + (Math.random() - 0.5) * 80
      )
    )
    // Start above the visible field so they fall into frame
    const y = -(BH + row * (BH + 14) + Math.random() * 30 + 20)

    return Matter.Bodies.rectangle(x, y, cap.w, BH, {
      chamfer: { radius: CR },
      restitution: 0.28,
      friction: 0.18,
      frictionAir: 0.035,
      density: 0.0018,
      label: String(cap.id),
      angle: (Math.random() - 0.5) * 0.6,   // initial random tilt
    })
  })

  // Invisible walls — ceiling is far above so falling capsules aren't blocked
  const WO = { isStatic: true, restitution: 0.2, friction: 0.25 }
  const ground  = Matter.Bodies.rectangle(W / 2, H + 30, W + 400, 60, WO)
  const lWall   = Matter.Bodies.rectangle(-32, H / 2, 64, H + 800, WO)
  const rWall   = Matter.Bodies.rectangle(W + 32, H / 2, 64, H + 800, WO)
  // No top ceiling — let them fall from above freely

  Matter.World.add(engine.world, [...bodies, ground, lWall, rWall])

  const runner = Matter.Runner.create()
  Matter.Runner.run(runner, engine)

  // ── Direct DOM sync (no setState → zero re-renders) ─────────────────────
  let rafId = 0
  const sync = () => {
    bodies.forEach((body, i) => {
      const el = elemRefs.current[i]
      if (!el) return
      const x = body.position.x - CAPS[i].w / 2
      const y = body.position.y - BH / 2
      el.style.transform = `translate(${x}px,${y}px) rotate(${body.angle}rad)`
    })
    rafId = requestAnimationFrame(sync)
  }
  rafId = requestAnimationFrame(sync)

  // ── Interaction ──────────────────────────────────────────────────────────
  let dragBody: Matter.Body | null = null
  let dragOffX = 0, dragOffY = 0
  let didDrag  = false

  const local = (e: MouseEvent | TouchEvent) => {
    const r = field.getBoundingClientRect()
    const s = 'touches' in e ? e.touches[0] : e as MouseEvent
    return { x: s.clientX - r.left, y: s.clientY - r.top }
  }

  const onDown = (e: MouseEvent | TouchEvent) => {
    didDrag = false
    const p = local(e)
    const hit = Matter.Query.point(bodies, p)
    if (!hit.length) return
    dragBody = hit[0]
    dragOffX = dragBody.position.x - p.x
    dragOffY = dragBody.position.y - p.y
    Matter.Body.setVelocity(dragBody, { x: 0, y: 0 })
    Matter.Body.setStatic(dragBody, true)
    field.style.cursor = 'grabbing'
  }

  const onMove = (e: MouseEvent | TouchEvent) => {
    if (!dragBody) return
    didDrag = true
    const p = local(e)
    Matter.Body.setPosition(dragBody, { x: p.x + dragOffX, y: p.y + dragOffY })
  }

  const onUp = () => {
    if (!dragBody) return
    Matter.Body.setStatic(dragBody, false)
    dragBody = null
    field.style.cursor = 'default'
  }

  // Click any capsule → ALL capsules get an electric shock
  const onClick = (e: MouseEvent) => {
    if (didDrag) return
    const p = local(e)
    if (!Matter.Query.point(bodies, p).length) return  // must click a capsule

    bodies.forEach(body => {
      if (body.isStatic) return
      const θ = Math.random() * Math.PI * 2
      const m = 0.06 + Math.random() * 0.12
      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(θ) * m,
        y: Math.sin(θ) * m - 0.1,   // upward bias
      })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 1.2)
    })
  }

  field.addEventListener('mousedown', onDown)
  field.addEventListener('touchstart', onDown, { passive: true })
  window.addEventListener('mousemove', onMove)
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchend', onUp)
  field.addEventListener('click', onClick)

  // Return cleanup
  return () => {
    cancelAnimationFrame(rafId)
    Matter.Runner.stop(runner)
    Matter.World.clear(engine.world, false)
    Matter.Engine.clear(engine)
    field.removeEventListener('mousedown', onDown)
    field.removeEventListener('touchstart', onDown)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('touchend', onUp)
    field.removeEventListener('click', onClick)
  }
}

// ─── Component ────────────────────────────────────────────────────────────
export function SkillsBubbles() {
  const isMobile   = useIsMobile()
  const fieldRef   = useRef<HTMLDivElement>(null)
  const elemRefs   = useRef<(HTMLDivElement | null)[]>([])
  const cleanupRef = useRef<(() => void) | undefined>(undefined)

  useEffect(() => {
    const field = fieldRef.current
    if (!field) return

    // ResizeObserver fires whenever the container gets a real width
    // (handles initial mount AND window resize / fullscreen toggle)
    let prevW = 0
    const ro = new ResizeObserver(entries => {
      const W = Math.round(entries[0].contentRect.width)
      // Only re-init when width changes meaningfully (>30 px) to avoid thrash
      if (W < 80 || Math.abs(W - prevW) < 30) return
      prevW = W
      cleanupRef.current?.()
      cleanupRef.current = setupPhysics(field, elemRefs) ?? undefined
    })
    ro.observe(field)

    return () => {
      ro.disconnect()
      cleanupRef.current?.()
    }
  }, [])

  const px = isMobile ? 20 : 52

  return (
    <section style={{
      background: '#F0F0EC',
      borderTop: '1px solid #e8e8e8',
      padding: `${isMobile ? 36 : 52}px ${px}px 0`,
      overflow: 'hidden',
    }}>
      {/* Intro text */}
      <p style={{ margin: '0 0 5px', fontSize: 13, color: '#888', fontFamily: FB }}>
        A closer look at what the work actually involves.
      </p>
      <p style={{ margin: 0, fontSize: 13, color: '#bbb', fontFamily: FB }}>
        Tools, decisions, and the recurring concerns that shape every project.
      </p>

      {/* Physics field */}
      <div
        ref={fieldRef}
        style={{
          position: 'relative',
          height: isMobile ? 560 : 420,
          marginTop: 10,
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        {CAPS.map((cap, i) => {
          const t = THEME[cap.col]
          return (
            <div
              key={cap.id}
              ref={el => { elemRefs.current[i] = el }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: cap.w,
                height: BH,
                willChange: 'transform',
                cursor: 'grab',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                border: `2px solid ${t.border}`,
                background: t.bg,
                borderRadius: BH / 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                fontWeight: 500,
                color: t.text,
                fontFamily: FH,
                whiteSpace: 'nowrap',
                boxSizing: 'border-box',
              }}>
                {cap.label}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
