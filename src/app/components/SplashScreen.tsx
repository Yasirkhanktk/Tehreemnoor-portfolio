"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import logoImg from '../../imports/Logo-1.png'

const LIME = '#C5F135'

/**
 * SplashScreen
 * Shows a full-screen animated intro with the logo on first load,
 * then slides/fades out to reveal the site underneath.
 *
 * Props:
 *   onComplete — called when the exit animation fully finishes
 */
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

  useEffect(() => {
    // Phase timeline (ms):
    //  0      → logo starts scaling + fading in   (800 ms)
    //  800    → hold visible                       (850 ms)
    //  1850   → begin exit (curtain lifts)         (900 ms)
    //  2750   → onComplete fires
    const t1 = setTimeout(() => setPhase('hold'), 800)
    const t2 = setTimeout(() => setPhase('exit'), 1850)
    const t3 = setTimeout(() => onComplete(), 2750)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        /* ── Full-screen backdrop ── */
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#0d0d0d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Subtle radial glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 480,
              height: 480,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${LIME}22 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Logo image */}
          <motion.img
            src={typeof logoImg === 'string' ? logoImg : (logoImg as { src: string }).src}
            alt="Tehreem Noor"
            initial={{ opacity: 0, scale: 0.72, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              objectFit: 'cover',
              position: 'relative',
              zIndex: 2,
              boxShadow: `0 0 40px ${LIME}44`,
            }}
          />

          {/* Name below logo */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0, y: phase === 'hold' ? 0 : 14 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              marginTop: 20,
              fontSize: 13,
              letterSpacing: '0.22em',
              color: '#aaa',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              textTransform: 'uppercase',
              position: 'relative',
              zIndex: 2,
            }}
          >
            Tehreem Noor
          </motion.p>

          {/* Thin neon line growing under the name */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: phase === 'hold' ? 1 : 0,
              opacity: phase === 'hold' ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{
              marginTop: 10,
              width: 40,
              height: 1.5,
              background: LIME,
              borderRadius: 2,
              transformOrigin: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          />
        </motion.div>
      ) : null}

      {/* ── Curtain panel — slides UP off the screen on exit ── */}
      {phase === 'exit' && (
        <motion.div
          key="curtain"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={onComplete}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#0d0d0d',
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  )
}
