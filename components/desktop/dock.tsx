"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import { APPS, AppMeta } from "./apps-registry"
import { useDesktop } from "@/lib/desktop-context"

function DockIcon({ app, mouseX }: { app: AppMeta; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLButtonElement>(null)
  const { toggleApp, isOpen } = useDesktop()

  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - b.x - b.width / 2
  })

  const sizeSync = useTransform(distance, [-150, 0, 150], [46, 74, 46])
  const size = useSpring(sizeSync, { stiffness: 300, damping: 22, mass: 0.2 })
  const iconSize = useTransform(size, (s) => s * 0.46)

  const open = isOpen(app.id)

  return (
    <div className="group relative flex flex-col items-center justify-end">
      {/* Tooltip */}
      <span className="absolute -top-9 px-2 py-1 rounded-md bg-foreground text-background text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-[family-name:var(--font-space-grotesk)]">
        {app.name}
      </span>

      <motion.button
        ref={ref}
        style={{ width: size, height: size }}
        onClick={() => toggleApp(app.id, app.size)}
        className="relative origin-bottom"
        aria-label={`Open ${app.name}`}
      >
        <div className={`w-full h-full rounded-[22%] bg-gradient-to-br ${app.tile} shadow-md flex items-center justify-center text-white ring-1 ring-white/20`}>
          <motion.div style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
            <app.Icon className="w-full h-full" strokeWidth={1.8} />
          </motion.div>
        </div>
      </motion.button>

      {/* Running indicator */}
      <span className={`mt-1 w-1 h-1 rounded-full transition-colors ${open ? "bg-foreground/70" : "bg-transparent"}`} />
    </div>
  )
}

export function Dock() {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="absolute bottom-2 inset-x-0 z-[350] flex justify-center pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 26 }}
        className="pointer-events-auto flex items-end gap-3 px-3 pb-2 pt-2 rounded-2xl border border-white/30 bg-background/40 backdrop-blur-2xl shadow-[0_12px_40px_rgba(49,49,49,0.22)]"
      >
        {APPS.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  )
}
