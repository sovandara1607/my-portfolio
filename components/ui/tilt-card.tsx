"use client"

import { useRef } from "react"
import { createAnimatable } from "animejs"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

/**
 * Wraps children in a physical, "playable card" hover interaction: it tilts
 * toward the cursor and lifts slightly, then springs back flat on mouse
 * leave. A padded surface (bg/shadow) fades in on hover so the tilt reads
 * against something, without adding a static box at rest.
 */
export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const animatableRef = useRef<ReturnType<typeof createAnimatable> | null>(null)

  function getAnimatable() {
    if (!animatableRef.current && ref.current) {
      animatableRef.current = createAnimatable(ref.current, {
        rotateX: { duration: 300, ease: "outQuad" },
        rotateY: { duration: 300, ease: "outQuad" },
        translateZ: { duration: 300, ease: "outQuad" },
      })
    }
    return animatableRef.current
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const animatable = getAnimatable()
    if (!animatable) return
    animatable.rotateY(px * maxTilt * 2)
    animatable.rotateX(-py * maxTilt * 2)
    animatable.translateZ(12)
  }

  function handleMouseLeave() {
    const animatable = getAnimatable()
    if (!animatable) return
    animatable.rotateX(0, 500, "outElastic(1, .6)")
    animatable.rotateY(0, 500, "outElastic(1, .6)")
    animatable.translateZ(0, 500, "outElastic(1, .6)")
  }

  return (
    <div style={{ perspective: 800 }}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "rounded-2xl p-4 sm:p-6 -mx-4 sm:-mx-6 transition-colors duration-300 hover:bg-card hover:shadow-xl hover:shadow-black/[0.06] dark:hover:shadow-black/30",
          className
        )}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  )
}
