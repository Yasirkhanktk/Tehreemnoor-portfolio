import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const LIME = '#C5F135'

export function GlobalCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [isPointer, setIsPointer] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Inject global cursor:none
    const style = document.createElement('style')
    style.id = '__global-cursor__'
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `
    document.head.appendChild(style)

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (!el) return
      // Hide over the drag scroll row — the DRAG circle cursor handles it
      const inDragZone = !!el.closest('.proj-row')
      setHidden(inDragZone)
      if (!inDragZone) {
        const isInteractive = !!el.closest('button, a, input, textarea, select, [role="button"]')
        setIsPointer(isInteractive)
      }
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.getElementById('__global-cursor__')?.remove()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      {/* Trailing ring — lagging spring */}
      <motion.div
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isPointer ? 1.55 : 1,
          opacity: hidden ? 0 : 0.75,
        }}
        transition={{ type: 'spring', stiffness: 190, damping: 22, mass: 0.55 }}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: `1.5px solid ${LIME}`,
          pointerEvents: 'none',
          zIndex: 999998,
          mixBlendMode: 'normal',
        }}
      />
      {/* Dot — snaps instantly */}
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          scale: isPointer ? 0 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 32, mass: 0.15 }}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: LIME,
          pointerEvents: 'none',
          zIndex: 999999,
        }}
      />
    </>
  )
}
