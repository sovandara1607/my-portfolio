"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Wifi, Search, BatteryFull, Volume2, Check } from "lucide-react"
import { useDesktop } from "@/lib/desktop-context"
import { APP_MAP } from "./apps-registry"

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 17" className={className} fill="currentColor" aria-hidden>
      <path d="M11.6 9c0-1.5.7-2.5 2-3.2-.7-1-1.8-1.6-3.2-1.7-1.3-.1-2.8.8-3.3.8-.5 0-1.7-.8-2.8-.8C1.9 4.1.4 5.6.4 8.6c0 .9.2 1.9.5 2.9.5 1.3 2 4.5 3.5 4.4.8 0 1.3-.5 2.3-.5s1.5.5 2.3.5c1.6 0 2.9-2.9 3.4-4.2-2.1-1-2.8-2.6-2.8-2.7zM9.4 3c.7-.8 1.1-1.9 1-3-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2-.5 2.6-1.3z" />
    </svg>
  )
}

type MenuEntry =
  | {
      kind: "item"
      label: string
      onSelect?: () => void
      disabled?: boolean
      checked?: boolean
    }
  | {
      kind: "divider"
    }

function menuItem(label: string, onSelect?: () => void, opts?: { disabled?: boolean; checked?: boolean }): MenuEntry {
  return { kind: "item", label, onSelect, disabled: opts?.disabled, checked: opts?.checked }
}

const DIVIDER: MenuEntry = { kind: "divider" }

function DropdownMenu({
  label,
  entries,
  open,
  onToggle,
  onClose,
  bold,
}: {
  label: string
  entries: MenuEntry[]
  open: boolean
  onToggle: () => void
  onClose: () => void
  bold?: boolean
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`px-2 py-0.5 rounded transition-colors cursor-default ${
          bold ? "font-semibold" : "text-foreground/75"
        } ${open ? "bg-primary text-primary-foreground" : "hover:bg-foreground/10"}`}
      >
        {label}
      </button>
      {open && (
        <div className="absolute top-7 left-0 w-64 py-1 rounded-lg border border-border bg-background/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(49,49,49,0.25)] text-sm z-50">
          {entries.map((entry, i) =>
            entry.kind === "divider" ? (
              <div key={i} className="my-1 h-px bg-border" />
            ) : (
              <button
                key={i}
                disabled={entry.disabled}
                onClick={() => {
                  if (entry.disabled) return
                  onClose()
                  entry.onSelect?.()
                }}
                className={`w-full flex items-center gap-2 text-left px-3 py-1.5 transition-colors ${
                  entry.disabled
                    ? "text-muted-foreground/40 cursor-default"
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <span className="w-3.5 shrink-0">{entry.checked && <Check className="w-3.5 h-3.5" />}</span>
                {entry.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

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
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const { windows, activeId, openApp, closeWindow, minimizeWindow, focusWindow } = useDesktop()

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 20)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null)
    }
    window.addEventListener("mousedown", onClick)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("mousedown", onClick)
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  const date = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })

  const toggle = (id: string) => setOpenMenu(m => (m === id ? null : id))
  const close = () => setOpenMenu(null)

  const appleEntries: MenuEntry[] = [
    menuItem("About Sovandara", onOpenAbout),
    DIVIDER,
    menuItem("Exit Desktop Mode", onExit),
  ]

  const fileEntries: MenuEntry[] = [
    menuItem("New Finder Window", () => openApp("finder", APP_MAP.finder.size)),
    menuItem("Close Window", () => activeId && closeWindow(activeId), { disabled: !activeId }),
  ]

  const editEntries: MenuEntry[] = [
    menuItem("Undo", undefined, { disabled: true }),
    menuItem("Redo", undefined, { disabled: true }),
    DIVIDER,
    menuItem("Cut", undefined, { disabled: true }),
    menuItem("Copy", undefined, { disabled: true }),
    menuItem("Paste", undefined, { disabled: true }),
  ]

  const viewEntries: MenuEntry[] = [
    menuItem("Light Appearance", () => setTheme("light"), { checked: resolvedTheme === "light" }),
    menuItem("Dark Appearance", () => setTheme("dark"), { checked: resolvedTheme === "dark" }),
  ]

  const windowEntries: MenuEntry[] =
    windows.length === 0
      ? [menuItem("No Open Windows", undefined, { disabled: true })]
      : [
          ...windows.map(w =>
            menuItem(APP_MAP[w.appId]?.name ?? w.appId, () => focusWindow(w.appId), {
              checked: activeId === w.appId,
            })
          ),
          DIVIDER,
          menuItem("Minimize", () => activeId && minimizeWindow(activeId), { disabled: !activeId }),
        ]

  const helpEntries: MenuEntry[] = [
    menuItem("View Source on GitHub", () =>
      window.open("https://github.com/sovandara1607", "_blank", "noopener,noreferrer")
    ),
    menuItem("Send Feedback", () => window.open("mailto:rithsovandara83@gmail.com", "_blank")),
  ]

  return (
    <div className="absolute top-0 inset-x-0 h-8 z-[400] flex items-center justify-between px-3 text-[13px] text-foreground/90 bg-background/70 backdrop-blur-2xl border-b border-border/50 select-none">
      {/* Left */}
      <div className="flex items-center gap-1.5" ref={menuRef}>
        <button
          onClick={() => toggle("apple")}
          className={`px-1.5 py-0.5 rounded transition-colors ${openMenu === "apple" ? "bg-primary text-primary-foreground" : "hover:bg-foreground/10"}`}
          aria-label="Apple menu"
        >
          <AppleLogo className="w-3.5 h-4" />
        </button>
        {openMenu === "apple" && (
          <div className="absolute top-7 left-0 w-56 py-1 rounded-lg border border-border bg-background/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(49,49,49,0.25)] text-sm z-50">
            {appleEntries.map((entry, i) =>
              entry.kind === "divider" ? (
                <div key={i} className="my-1 h-px bg-border" />
              ) : (
                <button
                  key={i}
                  onClick={() => { close(); entry.onSelect?.() }}
                  className="w-full text-left px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {entry.label}
                </button>
              )
            )}
          </div>
        )}

        <span className="font-semibold px-1.5">{activeAppName}</span>
        <div className="hidden sm:flex items-center">
          <DropdownMenu label="File" entries={fileEntries} open={openMenu === "file"} onToggle={() => toggle("file")} onClose={close} />
          <DropdownMenu label="Edit" entries={editEntries} open={openMenu === "edit"} onToggle={() => toggle("edit")} onClose={close} />
          <DropdownMenu label="View" entries={viewEntries} open={openMenu === "view"} onToggle={() => toggle("view")} onClose={close} />
          <DropdownMenu label="Window" entries={windowEntries} open={openMenu === "window"} onToggle={() => toggle("window")} onClose={close} />
          <DropdownMenu label="Help" entries={helpEntries} open={openMenu === "help"} onToggle={() => toggle("help")} onClose={close} />
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
