"use client"

import { ReactNode, useRef, useState, RefObject, PointerEvent as ReactPointerEvent } from "react"
import { motion, useMotionValue, useDragControls } from "framer-motion"

interface WindowProps {
  appId: string
  title: string
  icon?: ReactNode
  z: number
  active: boolean
  minimized: boolean
  initial: { x: number; y: number; w: number; h: number }
  constraintsRef: RefObject<HTMLDivElement | null>
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  children: ReactNode
}

const MENUBAR_H = 32
const DOCK_RESERVE = 96
const MIN_W = 360
const MIN_H = 260

export function Window({
  title,
  icon,
  z,
  active,
  minimized,
  initial,
  constraintsRef,
  onClose,
  onMinimize,
  onFocus,
  children,
}: WindowProps) {
  const controls = useDragControls()
  const x = useMotionValue(initial.x)
  const y = useMotionValue(initial.y)
  const [size, setSize] = useState({ w: initial.w, h: initial.h })
  const [maximized, setMaximized] = useState(false)
  const restore = useRef<{ x: number; y: number; w: number; h: number } | null>(null)

  const startDrag = (e: ReactPointerEvent) => {
    if (maximized) return
    controls.start(e)
  }

  const toggleMaximize = () => {
    if (typeof window === "undefined") return
    if (maximized && restore.current) {
      x.set(restore.current.x)
      y.set(restore.current.y)
      setSize({ w: restore.current.w, h: restore.current.h })
      setMaximized(false)
    } else {
      restore.current = { x: x.get(), y: y.get(), w: size.w, h: size.h }
      x.set(16)
      y.set(MENUBAR_H + 8)
      setSize({
        w: window.innerWidth - 32,
        h: window.innerHeight - MENUBAR_H - DOCK_RESERVE,
      })
      setMaximized(true)
    }
  }

  // Bottom-right resize handle
  const onResizePointerDown = (e: ReactPointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onFocus()
    const startX = e.clientX
    const startY = e.clientY
    const startW = size.w
    const startH = size.h
    const move = (ev: PointerEvent) => {
      setSize({
        w: Math.max(MIN_W, startW + (ev.clientX - startX)),
        h: Math.max(MIN_H, startH + (ev.clientY - startY)),
      })
    }
    const up = () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  return (
    <motion.div
      drag={!maximized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{
        opacity: minimized ? 0 : 1,
        scale: minimized ? 0.85 : 1,
        y: minimized ? 60 : 0,
        pointerEvents: minimized ? "none" : "auto",
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      style={{ x, y, width: size.w, height: size.h, zIndex: z, position: "absolute", top: 0, left: 0 }}
      className={`flex flex-col rounded-xl overflow-hidden border bg-background/95 backdrop-blur-2xl
        ${active ? "border-border shadow-[0_24px_70px_rgba(49,49,49,0.28)]" : "border-border/60 shadow-[0_12px_40px_rgba(49,49,49,0.14)]"}`}
    >
      {/* Title bar */}
      <div
        onPointerDown={startDrag}
        onDoubleClick={toggleMaximize}
        className="relative flex items-center gap-2 h-9 px-3 shrink-0 cursor-default select-none border-b border-border/60 bg-muted/40"
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2 group">
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center text-[#7a0000]/0 group-hover:text-[#7a0000] transition-colors"
            aria-label="Close"
          >
            <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100"><path d="M1 1l4 4M5 1L1 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize() }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center text-[#7a4b00]/0 group-hover:text-[#7a4b00] transition-colors"
            aria-label="Minimize"
          >
            <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100"><path d="M1 3h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize() }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center text-[#005c00]/0 group-hover:text-[#005c00] transition-colors"
            aria-label="Maximize"
          >
            <svg width="6" height="6" viewBox="0 0 6 6" className="opacity-0 group-hover:opacity-100"><path d="M1.5 1.5h3v3z" fill="currentColor" /></svg>
          </button>
        </div>

        {/* Centered title */}
        <div className="absolute inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
          {icon && <span className="w-3.5 h-3.5 flex items-center justify-center text-muted-foreground">{icon}</span>}
          <span className="text-xs font-medium text-muted-foreground font-[family-name:var(--font-space-grotesk)]">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden bg-background/60">{children}</div>

      {/* Resize handle */}
      {!maximized && (
        <div
          onPointerDown={onResizePointerDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10"
          style={{ touchAction: "none" }}
        />
      )}
    </motion.div>
  )
}
