"use client"

import { useEffect, useRef, useState } from "react"
import { Wifi, Search, BatteryFull, Volume2 } from "lucide-react"

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 17" className={className} fill="currentColor" aria-hidden>
      <path d="M11.6 9c0-1.5.7-2.5 2-3.2-.7-1-1.8-1.6-3.2-1.7-1.3-.1-2.8.8-3.3.8-.5 0-1.7-.8-2.8-.8C1.9 4.1.4 5.6.4 8.6c0 .9.2 1.9.5 2.9.5 1.3 2 4.5 3.5 4.4.8 0 1.3-.5 2.3-.5s1.5.5 2.3.5c1.6 0 2.9-2.9 3.4-4.2-2.1-1-2.8-2.6-2.8-2.7zM9.4 3c.7-.8 1.1-1.9 1-3-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.6-1.3z" />
    </svg>
  )
}

const MENUS = ["File", "Edit", "View", "Window", "Help"]

export function MenuBar({
  activeAppName,
  onExit,
  onOpenAbout,
}: {
  activeAppName: string
  onExit: () => void
  onOpenAbout: () => void
}) {
  const [now, setNow] = useState(() => new Date())
  const [appleOpen, setAppleOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 20)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setAppleOpen(false)
    }
    window.addEventListener("mousedown", onClick)
    return () => window.removeEventListener("mousedown", onClick)
  }, [])

  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  return (
    <div className="absolute top-0 inset-x-0 h-8 z-[400] flex items-center justify-between px-3 text-[13px] text-foreground/90 bg-background/70 backdrop-blur-2xl border-b border-border/50 select-none">
      {/* Left */}
      <div className="flex items-center gap-1.5" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setAppleOpen(v => !v)}
            className="px-1.5 py-0.5 rounded hover:bg-foreground/10 transition-colors"
            aria-label="Apple menu"
          >
            <AppleLogo className="w-3.5 h-4" />
          </button>
          {appleOpen && (
            <div className="absolute top-7 left-0 w-56 py-1 rounded-lg border border-border bg-background/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(49,49,49,0.25)] text-sm">
              <button
                onClick={() => { setAppleOpen(false); onOpenAbout() }}
                className="w-full text-left px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                About Sovandara
              </button>
              <div className="my-1 h-px bg-border" />
              <div className="px-3 py-1.5 text-muted-foreground/60 text-xs">System Preferences…</div>
              <div className="my-1 h-px bg-border" />
              <button
                onClick={() => { setAppleOpen(false); onExit() }}
                className="w-full text-left px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Exit Desktop Mode
              </button>
            </div>
          )}
        </div>

        <span className="font-semibold px-1.5">{activeAppName}</span>
        <div className="hidden sm:flex items-center">
          {MENUS.map(m => (
            <span key={m} className="px-2 py-0.5 rounded hover:bg-foreground/10 transition-colors cursor-default text-foreground/75">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Volume2 className="w-4 h-4 text-foreground/70 hidden sm:block" />
        <Wifi className="w-4 h-4 text-foreground/70" />
        <BatteryFull className="w-5 h-5 text-foreground/70 hidden sm:block" />
        <Search className="w-4 h-4 text-foreground/70 hidden sm:block" />
        <span className="text-foreground/80 hidden sm:inline tabular-nums">{date}</span>
        <span className="text-foreground/90 tabular-nums font-medium">{time}</span>
      </div>
    </div>
  )
}
