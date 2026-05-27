"use client"

import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

const LIME = '#C5F135'
const DARK = '#0d0d0d'

/** Parse an rgb/rgba string and return [r, g, b] or null */
function parseRgb(str: string): [number, number, number] | null {
  const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return null
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])]
}

/** Walk up the DOM tree to find the first element that has a non-transparent background */
function getEffectiveBgColor(el: HTMLElement | null): string {
  let node = el
  while (node && node !== document.documentElement) {
    const bg = getComputedStyle(node).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg
    node = node.parentElement
  }
  // Fallback: check body/html background
  const bodyBg = getComputedStyle(document.body).backgroundColor
  if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)') return bodyBg
  return 'rgb(255, 255, 255)' // assume white
}

/** Return perceived luminance 0–255 */
function luminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

export function GlobalCursor() {
  const [pos, setPos]           = useState({ x: -200, y: -200 })
  const [isPointer, setIsPointer] = useState(false)
  const [hidden, setHidden]     = useState(false)
  const [onDark, setOnDark]     = useState(false)  // true → neon green, false → dark
  const posRef = useRef({ x: -200, y: -200 })

  useEffect(() => {
    // Inject global cursor:none but allow overrides
    const style = document.createElement('style')
    style.id = '__global-cursor__'
    style.textContent = `
      @media (min-width: 768px) and (pointer: fine) {
        body, .custom-cursor-area { cursor: none; }
        a, button, input, select, textarea, [role="button"], .pointer-override { cursor: none; }
      }
      @media (max-width: 767px), (pointer: coarse) {
        .custom-cursor-element {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)

    const checkElement = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      if (!el) return

      // Hide over the drag scroll row — the DRAG circle cursor handles it
      const inDragZone = !!el.closest('.proj-row')
      setHidden(inDragZone)

      if (!inDragZone) {
        const isInteractive = !!el.closest('button, a, input, textarea, select, [role="button"], .interactive')
        setIsPointer(isInteractive)
      }

      // Determine background brightness
      const bgColor = getEffectiveBgColor(el)
      const rgb = parseRgb(bgColor)
      if (rgb) {
        const lum = luminance(rgb[0], rgb[1], rgb[2])
        setOnDark(lum < 128) // dark bg → neon green, light bg → dark cursor
      }
    }

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })
      checkElement(e.clientX, e.clientY)
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    // Re-evaluate cursor state on clicks and scrolls, since elements might move under the static mouse
    const onInteraction = () => {
      setTimeout(() => {
        checkElement(posRef.current.x, posRef.current.y)
      }, 50)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onInteraction)
    window.addEventListener('scroll', onInteraction, true) // capture phase for scroll inside divs
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.getElementById('__global-cursor__')?.remove()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onInteraction)
      window.removeEventListener('scroll', onInteraction, true)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, []) // no deps — uses posRef for stable closure

  const cursorColor = onDark ? LIME : DARK

  return (
    <>
      {/* Trailing ring — lagging spring */}
      <motion.div
        className="custom-cursor-element"
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
          border: `1.5px solid ${cursorColor}`,
          pointerEvents: 'none',
          zIndex: 999998,
          mixBlendMode: 'normal',
          transition: 'border-color 0.25s ease',
        }}
      />
      {/* Dot — snaps instantly */}
      <motion.div
        className="custom-cursor-element"
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
          background: cursorColor,
          pointerEvents: 'none',
          zIndex: 999999,
          transition: 'background 0.25s ease',
        }}
      />
    </>
  )
}
