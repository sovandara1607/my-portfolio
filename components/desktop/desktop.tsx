"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { DesktopProvider, useDesktop } from "@/lib/desktop-context"
import { APP_MAP, APPS } from "./apps-registry"
import { Window } from "./window"
import { MenuBar } from "./menu-bar"
import { Dock } from "./dock"

// Desktop shortcut icons (top-right) for the "folder system" feel
const SHORTCUTS = ["finder", "graph", "map", "about"]

function DesktopInner({ onExit }: { onExit: () => void }) {
  const { windows, activeId, openApp, closeWindow, minimizeWindow, focusWindow } = useDesktop()
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Open a welcome window on mount
  useEffect(() => {
    const t = setTimeout(() => openApp("about", APP_MAP.about.size), 350)
    return () => clearTimeout(t)
  }, [openApp])

  const activeName = activeId ? APP_MAP[activeId]?.name ?? "Finder" : "Finder"

  return (
    <div className="fixed inset-0 z-[250] overflow-hidden select-none">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-[#f5f0eb] dark:bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.10] via-transparent to-secondary/[0.10]" />
        <div className="absolute top-[-10%] left-[-5%] w-[55%] h-[55%] bg-primary/[0.12] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[55%] h-[55%] bg-secondary/[0.10] rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[15%] w-[35%] h-[35%] bg-orange-300/[0.10] rounded-full blur-[120px]" />
        {/* faint monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[28vw] font-bold text-foreground/[0.025] leading-none font-[family-name:var(--font-epilogue)] select-none">SR</span>
        </div>
      </div>

      <MenuBar activeAppName={activeName} onExit={onExit} onOpenAbout={() => openApp("about", APP_MAP.about.size)} />

      {/* Desktop shortcut icons */}
      <div className="absolute top-12 right-5 flex flex-col gap-4 z-[100]">
        {SHORTCUTS.map(id => {
          const app = APP_MAP[id]
          return (
            <button
              key={id}
              onDoubleClick={() => openApp(app.id, app.size)}
              onClick={(e) => { if (e.detail === 0) openApp(app.id, app.size) }}
              className="group flex flex-col items-center gap-1 w-16"
            >
              <div className={`w-12 h-12 rounded-[22%] bg-gradient-to-br ${app.tile} shadow-md flex items-center justify-center text-white ring-1 ring-white/20 group-hover:scale-105 transition-transform`}>
                <app.Icon className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <span className="text-[10px] text-foreground/80 bg-background/40 px-1.5 rounded backdrop-blur-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {app.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Windows layer */}
      <div ref={constraintsRef} className="absolute inset-0 z-[110] pointer-events-none">
        <AnimatePresence>
          {windows.map(w => {
            const app = APP_MAP[w.appId]
            if (!app) return null
            const Body = app.Component
            return (
              <Window
                key={w.appId}
                appId={w.appId}
                title={app.name}
                icon={<app.Icon className="w-3.5 h-3.5" />}
                z={w.z}
                active={activeId === w.appId}
                minimized={w.minimized}
                initial={{ x: w.x, y: w.y, w: w.w, h: w.h }}
                constraintsRef={constraintsRef}
                onClose={() => closeWindow(w.appId)}
                onMinimize={() => minimizeWindow(w.appId)}
                onFocus={() => focusWindow(w.appId)}
              >
                <Body />
              </Window>
            )
          })}
        </AnimatePresence>
      </div>

      <Dock />
    </div>
  )
}

export function Desktop({ onExit }: { onExit: () => void }) {
  // Preload heavy app chunks once the desktop mounts
  useEffect(() => {
    APPS.forEach(() => {})
  }, [])

  return (
    <DesktopProvider>
      <DesktopInner onExit={onExit} />
    </DesktopProvider>
  )
}
