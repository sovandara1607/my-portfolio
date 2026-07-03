"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { Sun, Moon, Monitor, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Mode = "light" | "system" | "dark"

const MODES: { value: Mode; icon: LucideIcon; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Monitor, label: "System" },
  { value: "dark", icon: Moon, label: "Dark" },
]

const TRANSITION_MS = 600

let rippleSeq = 0

/**
 * Premium 3-way theme switcher (Light / System / Dark).
 *
 * The color swap itself is a global cross-fade — every color-bearing
 * property morphs in place over ~600ms (wired up in globals.css via the
 * `.theme-transitioning` class on <html>) — deliberately not a circular
 * wipe/reveal. This component owns the control surface: sliding indicator,
 * icon morph, magnetic hover, ripple, and ambient glow.
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; mode: Mode }[]>([])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 300, damping: 20, mass: 0.5 })
  const springY = useSpring(my, { stiffness: 300, damping: 20, mass: 0.5 })

  useEffect(() => setMounted(true), [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      const max = 5
      mx.set(Math.max(-max, Math.min(max, relX * 0.2)))
      my.set(Math.max(-max, Math.min(max, relY * 0.2)))
    },
    [mx, my, reduceMotion]
  )

  const handlePointerLeave = useCallback(() => {
    mx.set(0)
    my.set(0)
  }, [mx, my])

  const applyTheme = useCallback(
    (mode: Mode, e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const id = rippleSeq++
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, mode }])
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600)

      if (mode === theme) return

      if (reduceMotion) {
        setTheme(mode)
        return
      }

      const root = document.documentElement
      root.classList.add("theme-transitioning")
      setTheme(mode)
      setTimeout(() => root.classList.remove("theme-transitioning"), TRANSITION_MS)
    },
    [theme, setTheme, reduceMotion]
  )

  if (!mounted) {
    return <div className="w-[104px] h-9 rounded-full bg-muted/50" aria-hidden />
  }

  const activeIndex = MODES.findIndex((m) => m.value === (theme ?? "system"))

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className="relative flex items-center gap-0.5 p-1 rounded-full border border-border/60 bg-background/60 backdrop-blur-xl"
      role="radiogroup"
      aria-label="Theme"
    >
      {/* Ambient glow — soft, slow breathing behind the whole control */}
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full blur-md"
          style={{
            background:
              resolvedTheme === "dark"
                ? "radial-gradient(circle, color-mix(in srgb, var(--foreground) 22%, transparent), transparent 70%)"
                : "radial-gradient(circle, color-mix(in srgb, var(--primary) 25%, transparent), transparent 70%)",
          }}
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {MODES.map((m, i) => {
        const Icon = m.icon
        const isActive = activeIndex === i
        return (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={m.label}
            title={m.label}
            onClick={(e) => applyTheme(m.value, e)}
            className={cn(
              "relative z-10 flex items-center justify-center w-7 h-7 rounded-full overflow-hidden",
              "transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="theme-toggle-active"
                className="absolute inset-0 rounded-full bg-muted shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              />
            )}

            {ripples
              .filter((r) => r.mode === m.value)
              .map((r) => (
                <motion.span
                  key={r.id}
                  className="absolute rounded-full bg-foreground/25 pointer-events-none"
                  style={{ left: r.x, top: r.y, transform: "translate(-50%, -50%)" }}
                  initial={{ width: 0, height: 0, opacity: 0.45 }}
                  animate={{ width: 56, height: 56, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}

            <motion.span
              className="relative flex items-center justify-center"
              animate={
                isActive
                  ? { rotate: 0, scale: 1, opacity: 1 }
                  : { rotate: -50, scale: 0.65, opacity: 0.55 }
              }
              whileHover={{ scale: isActive ? 1.12 : 0.85, rotate: isActive ? 8 : -50 }}
              whileTap={{ scale: 0.82 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
            </motion.span>
          </button>
        )
      })}
    </motion.div>
  )
}
