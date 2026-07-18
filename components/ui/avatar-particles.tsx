"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const PARTICLE_COUNT = 14
const YELLOW_TONES = ["#FFD60A", "#FFC300", "#FFB800", "#FFDD55", "#FFCF40"]

interface Particle {
  angle: number
  radius: number
  size: number
  color: string
  duration: number
  delay: number
  driftX: number
  driftY: number
}

const PARTICLES: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (360 / PARTICLE_COUNT) * i + (i % 2 === 0 ? 8 : -8)
  return {
    angle,
    radius: 58 + ((i * 37) % 34), // 58–92px from center, deterministic spread
    size: 3 + (i % 3),
    color: YELLOW_TONES[i % YELLOW_TONES.length],
    duration: 3.2 + (i % 5) * 0.4,
    delay: (i % 7) * 0.25,
    driftX: (i % 2 === 0 ? 1 : -1) * (4 + (i % 3) * 2),
    driftY: (i % 3 === 0 ? 1 : -1) * (4 + (i % 4) * 1.5),
  }
})

/**
 * A soft halo of drifting, twinkling yellow particles orbiting the hero
 * avatar. Transform/opacity only (no layout-affecting properties) so it
 * stays cheap regardless of particle count. No-ops under
 * prefers-reduced-motion — particles render static and dim instead.
 */
export function AvatarParticles() {
  // Client-only: nothing to gain from server-rendering a purely decorative,
  // infinitely-animating layer, and it sidesteps any SSR/hydration precision
  // mismatch entirely rather than fighting it.
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {PARTICLES.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180
        const x = Math.cos(rad) * p.radius
        const y = Math.sin(rad) * p.radius

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 6px 1px ${p.color}`,
              willChange: "transform, opacity",
            }}
            initial={{ x, y, opacity: 0.3, scale: 0.8 }}
            animate={
              reduceMotion
                ? { x, y, opacity: 0.5, scale: 1 }
                : {
                    x: [x, x + p.driftX, x],
                    y: [y, y + p.driftY, y],
                    opacity: [0.25, 0.9, 0.25],
                    scale: [0.8, 1.15, 0.8],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }
            }
          />
        )
      })}
    </div>
  )
}
