"use client"

import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"

export interface ThemePrismBurstHandle {
  fire: (x: number, y: number) => void
}

interface Burst {
  id: number
  x: number
  y: number
  reach: number
}

const RAY_COUNT = 12
const RAY_COLORS = [
  "#F38020",
  "#228B49",
  "#F38020",
  "rgba(255,255,255,0.85)",
  "#228B49",
  "#F38020",
]
const SPARK_COUNT = 6
const DURATION_MS = 700

let burstSeq = 0

function Ray({ angle, reach, color, delay }: { angle: number; reach: number; color: string; delay: number }) {
  const length = reach * (0.32 + Math.random() * 0.16)
  return (
    <motion.div
      className="absolute left-0 top-0 origin-left rounded-full"
      style={{
        width: length,
        height: 2,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        rotate: angle,
        willChange: "transform, opacity",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: [0, 1, 0] }}
      transition={{ duration: DURATION_MS / 1000, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

function Spark({ angle, reach, color, delay }: { angle: number; reach: number; color: string; delay: number }) {
  const dist = reach * (0.18 + Math.random() * 0.22)
  const rad = (angle * Math.PI) / 180
  return (
    <motion.div
      className="absolute left-0 top-0 rounded-full"
      style={{ width: 3, height: 3, background: color, willChange: "transform, opacity" }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{ duration: DURATION_MS / 1000, delay, ease: "easeOut" }}
    />
  )
}

function PrismBurst({ x, y, reach }: Burst) {
  const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
    const jitter = (Math.random() - 0.5) * (360 / RAY_COUNT) * 0.6
    return {
      angle: (360 / RAY_COUNT) * i + jitter,
      color: RAY_COLORS[i % RAY_COLORS.length],
      delay: Math.random() * 0.08,
    }
  })
  const sparks = Array.from({ length: SPARK_COUNT }, (_, i) => ({
    angle: (360 / SPARK_COUNT) * i + Math.random() * 20,
    color: RAY_COLORS[i % RAY_COLORS.length],
    delay: 0.03 + Math.random() * 0.1,
  }))

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none" aria-hidden>
      {/* Screen wash — a full-viewport gradient anchored at the click point.
          Sized to the corner via `farthest-corner` so it already covers the
          whole screen; only opacity animates, so it's compositor-only (no
          per-frame layout/paint work) even though it reads as a full wipe. */}
      <motion.div
        className="absolute inset-0"
        style={{
          willChange: "opacity",
          background: `radial-gradient(circle farthest-corner at ${x}px ${y}px, color-mix(in srgb, var(--primary) 30%, transparent) 0%, color-mix(in srgb, var(--secondary) 16%, transparent) 45%, transparent 78%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: DURATION_MS / 1000, times: [0, 0.35, 1], ease: "easeOut" }}
      />

      {/* Prism rays */}
      <div className="absolute" style={{ left: x, top: y }}>
        {rays.map((r, i) => (
          <Ray key={i} angle={r.angle} reach={reach} color={r.color} delay={r.delay} />
        ))}
        {sparks.map((s, i) => (
          <Spark key={i} angle={s.angle} reach={reach} color={s.color} delay={s.delay} />
        ))}
      </div>
    </div>
  )
}

/**
 * Portaled to document.body (not nested under <nav>) because nav's
 * backdrop-blur establishes a containing block that would break this
 * component's `position: fixed` full-viewport escape.
 */
export const ThemePrismBurst = forwardRef<ThemePrismBurstHandle>((_props, ref) => {
  const [bursts, setBursts] = useState<Burst[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useImperativeHandle(ref, () => ({
    fire(x: number, y: number) {
      const reach = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      const id = burstSeq++
      setBursts((b) => [...b, { id, x, y, reach }])
      setTimeout(() => setBursts((b) => b.filter((burst) => burst.id !== id)), DURATION_MS)
    },
  }))

  if (!mounted || typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {bursts.map((b) => (
        <PrismBurst key={b.id} {...b} />
      ))}
    </AnimatePresence>,
    document.body
  )
})

ThemePrismBurst.displayName = "ThemePrismBurst"
