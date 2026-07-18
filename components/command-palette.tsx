"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import {
  Hash, ArrowRight, Code2, ImageIcon,
  Mail, Github, Globe, Download, Sun, Moon,
  ExternalLink, Clock, TerminalSquare, MonitorPlay,
} from "lucide-react"
import { profile } from "@/lib/profile"
import { wallpapers as seedWallpapers } from "@/lib/wallpapers-data"

// ── Static data indexed for search ─────────────────────────────────────────

const NAV_SECTIONS = [
  { label: "Skills & Tech Stack", id: "#skills" },
  { label: "GitHub Activity", id: "#github-activity" },
  { label: "Projects", id: "#projects" },
  { label: "Experiences", id: "#experiences" },
  { label: "Contact", id: "#contact" },
  { label: "Wallpapers", id: "#wallpapers" },
  { label: "Terminal", id: "#terminal" },
]

const PROJECTS = [
  { name: "Fitness App", slug: "fitness-app",          keywords: "react typescript web fitness tracker" },
  { name: "MyFinance",  slug: "myfinance",             keywords: "swift swiftui ios finance budget" },
  { name: "Performative Detector", slug: "performative_detector", keywords: "mediapipe hands gesture detection" },
  { name: "Resume Builder", slug: "resume-builder",   keywords: "laravel php mysql web resume" },
  { name: "TaskFlow",   slug: "taskflow",              keywords: "flutter dart mobile task management" },
]

// ── Shared style tokens ─────────────────────────────────────────────────────

const GROUP_CLASS =
  "overflow-hidden p-1 " +
  "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-2 " +
  "[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase " +
  "[&_[cmdk-group-heading]]:tracking-[0.2em] [&_[cmdk-group-heading]]:text-muted-foreground/55 " +
  "[&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:font-[family-name:var(--font-space-grotesk)]"

const ITEM_CLASS =
  "flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer text-sm " +
  "text-foreground/70 hover:text-foreground hover:bg-primary/[0.06] " +
  "data-[selected=true]:bg-primary/[0.08] data-[selected=true]:text-foreground " +
  "transition-colors duration-100 font-[family-name:var(--font-space-grotesk)] outline-none select-none"

const SEP_CLASS = "h-px bg-border mx-1 my-1"

// ── Component ───────────────────────────────────────────────────────────────

export function CommandPalette() {
  const [open, setOpen]     = useState(false)
  const [recents, setRecents] = useState<string[]>([])
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()

  // Global keyboard shortcut + custom event (from nav search button)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(v => !v)
      }
      if (e.key === "Escape") setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener("cmd-palette:open", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("cmd-palette:open", onOpen)
    }
  }, [])

  // Reload recents from localStorage every time the palette opens
  useEffect(() => {
    if (!open) return
    try {
      const raw = localStorage.getItem("cmd-recent")
      if (raw) setRecents(JSON.parse(raw).slice(0, 5))
    } catch {}
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  const trackRecent = useCallback((label: string) => {
    try {
      setRecents(prev => {
        const next = [label, ...prev.filter(r => r !== label)].slice(0, 5)
        localStorage.setItem("cmd-recent", JSON.stringify(next))
        return next
      })
    } catch {}
  }, [])

  const scrollTo = (id: string, label: string) => {
    close()
    trackRecent(label)
    // defer so the palette finishes closing first
    requestAnimationFrame(() => {
      if (id === "#") window.scrollTo({ top: 0, behavior: "smooth" })
      else document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    })
  }

  const navigateTo = (href: string, label: string) => {
    close()
    trackRecent(label)
    router.push(href)
  }

  const openHref = (href: string, label: string) => {
    close()
    trackRecent(label)
    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-lg"
            onClick={close}
          />

          {/* Palette panel */}
          <motion.div
            initial={{ y: -14, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[580px] glass-card overflow-hidden shadow-[0_24px_60px_rgba(49,49,49,0.15)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
          >
            <Command label="Command Palette" shouldFilter className="flex flex-col">

              {/* ── Input ─────────────────────────────────────────────── */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
                <Command.Input
                  autoFocus
                  placeholder="Search sections, projects, wallpapers…"
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-[family-name:var(--font-space-grotesk)]"
                />
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <kbd className="px-1.5 py-0.5 text-[10px] text-muted-foreground bg-muted/80 border border-border rounded font-mono">ESC</kbd>
                </div>
              </div>

              {/* ── Results list ─────────────────────────────────────── */}
              <Command.List className="max-h-[380px] overflow-y-auto py-1 scrollbar-hide">
                <Command.Empty className="py-10 text-center text-sm text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
                  No results found.
                </Command.Empty>

                {/* Recent searches */}
                {recents.length > 0 && (
                  <Command.Group heading="Recent" className={GROUP_CLASS}>
                    {recents.map(label => (
                      <Command.Item
                        key={label}
                        value={label}
                        className={ITEM_CLASS}
                        onSelect={() => {
                          // find matching nav section and scroll, otherwise just close
                          const match = NAV_SECTIONS.find(s => s.label === label)
                          if (match) scrollTo(match.id, label)
                          else close()
                        }}
                      >
                        <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span>{label}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Navigate */}
                <Command.Group heading="Navigate" className={GROUP_CLASS}>
                  {NAV_SECTIONS.map(s => (
                    <Command.Item
                      key={s.id}
                      value={s.label + " navigate section"}
                      className={ITEM_CLASS}
                      onSelect={() => scrollTo(s.id, s.label)}
                    >
                      <Hash className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{s.label}</span>
                      <ArrowRight className="ml-auto w-3 h-3 text-muted-foreground/40 shrink-0" />
                    </Command.Item>
                  ))}
                  <Command.Item
                    value="now page status current"
                    className={ITEM_CLASS}
                    onSelect={() => navigateTo("/now", "Now")}
                  >
                    <TerminalSquare className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span>Now</span>
                    <span className="ml-auto text-[10px] text-muted-foreground/40 font-mono">page</span>
                  </Command.Item>
                </Command.Group>

                <div className={SEP_CLASS} />

                {/* Projects */}
                <Command.Group heading="Projects" className={GROUP_CLASS}>
                  {PROJECTS.map(p => (
                    <Command.Item
                      key={p.slug}
                      value={p.name + " project " + p.keywords}
                      className={ITEM_CLASS}
                      onSelect={() => navigateTo(`/projects/${p.slug}`, p.name)}
                    >
                      <Code2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{p.name}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground/50 font-mono shrink-0">
                        {p.keywords.split(" ")[0]}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <div className={SEP_CLASS} />

                {/* Wallpapers */}
                <Command.Group heading="Wallpapers" className={GROUP_CLASS}>
                  {seedWallpapers.map(w => (
                    <Command.Item
                      key={w.slug}
                      value={w.title + " wallpaper " + w.category + " " + w.tags.join(" ")}
                      className={ITEM_CLASS}
                      onSelect={() => navigateTo(`/wallpapers/${w.slug}`, w.title)}
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span>{w.title}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground/50 font-mono capitalize shrink-0">
                        {w.category}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <div className={SEP_CLASS} />

                {/* Contact */}
                <Command.Group heading="Contact" className={GROUP_CLASS}>
                  {[
                    {
                      value: "email contact " + profile.contact.email,
                      label: "Email — " + profile.contact.email,
                      href: "mailto:" + profile.contact.email,
                      Icon: Mail,
                    },
                    {
                      value: "github code " + profile.contact.handle,
                      label: "GitHub — " + profile.contact.handle,
                      href: "https://github.com/sovandara1607",
                      Icon: Github,
                    },
                    {
                      value: "website portfolio " + profile.contact.website,
                      label: "Website — " + profile.contact.website,
                      href: profile.contact.website,
                      Icon: Globe,
                    },
                  ].map(({ value, label, href, Icon }) => (
                    <Command.Item
                      key={href}
                      value={value}
                      className={ITEM_CLASS}
                      onSelect={() => openHref(href, label)}
                    >
                      <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="truncate">{label}</span>
                      <ExternalLink className="ml-auto w-3 h-3 text-muted-foreground/40 shrink-0" />
                    </Command.Item>
                  ))}
                </Command.Group>

                <div className={SEP_CLASS} />

                {/* Actions */}
                <Command.Group heading="Actions" className={GROUP_CLASS}>
                  <Command.Item
                    value="desktop mode macos experience launch os"
                    className={ITEM_CLASS}
                    onSelect={() => { close(); window.dispatchEvent(new CustomEvent("enter-desktop")) }}
                  >
                    <MonitorPlay className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span>Enter Desktop Mode</span>
                    <span className="ml-auto text-[10px] text-muted-foreground/40 font-mono">macOS</span>
                  </Command.Item>
                  <Command.Item
                    value="toggle theme dark light mode appearance switch"
                    className={ITEM_CLASS}
                    onSelect={() => { close(); setTheme(resolvedTheme === "dark" ? "light" : "dark") }}
                  >
                    {resolvedTheme === "dark"
                      ? <Sun className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      : <Moon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    }
                    <span>Switch to {resolvedTheme === "dark" ? "Light" : "Dark"} Mode</span>
                  </Command.Item>
                  <Command.Item
                    value="download resume cv curriculum vitae pdf"
                    className={ITEM_CLASS}
                    onSelect={() => { close(); window.open("/Sovandara_Rith_CV.docx") }}
                  >
                    <Download className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span>Download Resume</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* ── Footer hints ─────────────────────────────────────── */}
              <div className="border-t border-border px-4 py-2 flex items-center gap-4 bg-muted/10">
                {[
                  { key: "↑↓", hint: "navigate" },
                  { key: "↵",  hint: "select" },
                  { key: "ESC", hint: "close" },
                ].map(({ key, hint }) => (
                  <span key={key} className="flex items-center gap-1 text-[10px] text-muted-foreground/50 font-[family-name:var(--font-space-grotesk)]">
                    <kbd className="px-1 py-px bg-background border border-border rounded text-[9px] font-mono leading-tight">{key}</kbd>
                    {hint}
                  </span>
                ))}
                <span className="ml-auto text-[10px] text-muted-foreground/35 font-[family-name:var(--font-space-grotesk)] font-mono">
                  ⌘K
                </span>
              </div>

            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
