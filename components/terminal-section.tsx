"use client"

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { SectionHeader } from "./section-header"
import { profile } from "@/lib/profile"
import { wallpapers as seedWallpapers } from "@/lib/wallpapers-data"

// ── Types ───────────────────────────────────────────────────────────────────

type LineType = "input" | "output" | "error" | "welcome"

interface TermLine {
  id: number
  type: LineType
  content: React.ReactNode
}

// ── Command output builders ─────────────────────────────────────────────────

function Span({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>
}

const skillColors: Record<string, string> = {
  frontend:  "text-sky-400",
  backend:   "text-emerald-400",
  mobile:    "text-violet-400",
  databases: "text-amber-400",
  design:    "text-rose-400",
  tools:     "text-orange-400",
}

const COMMANDS: Record<string, () => React.ReactNode> = {
  help: () => (
    <div className="space-y-1">
      <p className="text-primary font-semibold mb-2">Available commands:</p>
      {[
        ["whoami",     "About me"],
        ["skills",     "Languages & tools I use"],
        ["projects",   "Projects I've built"],
        ["experience", "Work & leadership experience"],
        ["education",  "Academic background"],
        ["contact",    "How to reach me"],
        ["social",     "Social links"],
        ["resume",     "Download my CV"],
        ["wallpapers", "My wallpaper collection"],
        ["clear",      "Clear the terminal"],
      ].map(([cmd, desc]) => (
        <p key={cmd}>
          <Span className="text-primary w-[110px] inline-block">{cmd}</Span>
          <Span className="text-muted-foreground">— {desc}</Span>
        </p>
      ))}
    </div>
  ),

  whoami: () => (
    <div className="space-y-1.5">
      <p><Span className="text-primary">Name     </Span> {profile.name}</p>
      <p><Span className="text-primary">Role     </Span> {profile.title}</p>
      <p><Span className="text-primary">Location </Span> Phnom Penh, Cambodia</p>
      <p><Span className="text-primary">Bio      </Span> {profile.bio}</p>
      <p><Span className="text-primary">Languages</Span> {profile.languages.join(", ")}</p>
      <p><Span className="text-primary">Interests</Span> {profile.interests.join(", ")}</p>
    </div>
  ),

  skills: () => (
    <div className="space-y-2">
      {(Object.entries(profile.skills) as [keyof typeof profile.skills, readonly string[]][]).map(([key, items]) => (
        <p key={key}>
          <Span className={`${skillColors[key]} w-[100px] inline-block capitalize`}>{key}</Span>
          <Span className="text-foreground/80">{items.join("  ·  ")}</Span>
        </p>
      ))}
    </div>
  ),

  projects: () => (
    <div className="space-y-3">
      <p className="text-primary font-semibold">Academic Projects</p>
      {profile.academicProjects.map(p => (
        <div key={p.name}>
          <p><Span className="text-secondary font-semibold">{p.name}</Span> <Span className="text-muted-foreground text-xs">({p.period})</Span></p>
          <p><Span className="text-muted-foreground text-xs">Stack: </Span>{p.stack.join(", ")}</p>
        </div>
      ))}
      <p className="text-primary font-semibold pt-1">Personal Projects</p>
      {profile.personalProjects.map(p => (
        <div key={p.name}>
          <p><Span className="text-secondary font-semibold">{p.name}</Span> <Span className="text-muted-foreground text-xs">({p.period})</Span></p>
          <p><Span className="text-muted-foreground text-xs">Stack: </Span>{p.stack.join(", ")}</p>
        </div>
      ))}
    </div>
  ),

  experience: () => (
    <div className="space-y-3">
      {profile.experience.map(e => (
        <div key={e.role}>
          <p><Span className="text-primary font-semibold">{e.role}</Span></p>
          <p><Span className="text-secondary">{e.org}</Span> <Span className="text-muted-foreground text-xs">· {e.period}</Span></p>
          {e.bullets.map((b, i) => (
            <p key={i} className="text-foreground/75 pl-2">· {b}</p>
          ))}
        </div>
      ))}
    </div>
  ),

  education: () => (
    <div className="space-y-3">
      {profile.education.map(e => (
        <div key={e.degree}>
          <p><Span className="text-primary font-semibold">{e.degree}</Span></p>
          <p><Span className="text-secondary">{e.school}</Span> <Span className="text-muted-foreground text-xs">· {e.period}</Span></p>
          <p className="text-foreground/70 text-xs">{e.note}</p>
        </div>
      ))}
    </div>
  ),

  contact: () => (
    <div className="space-y-1.5">
      <p><Span className="text-primary w-[90px] inline-block">Email   </Span>
        <a href={`mailto:${profile.contact.email}`} className="underline underline-offset-2 hover:text-primary transition-colors">{profile.contact.email}</a>
      </p>
      <p><Span className="text-primary w-[90px] inline-block">GitHub  </Span>
        <a href="https://github.com/sovandara1607" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">{profile.contact.handle}</a>
      </p>
      <p><Span className="text-primary w-[90px] inline-block">Website </Span>
        <a href={profile.contact.website} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">{profile.contact.website}</a>
      </p>
      <p><Span className="text-primary w-[90px] inline-block">Phone   </Span>{profile.contact.phone}</p>
    </div>
  ),

  social: () => (
    <div className="space-y-1.5">
      <p><Span className="text-primary w-[100px] inline-block">GitHub   </Span>
        <a href="https://github.com/sovandara1607" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">github.com/sovandara1607</a>
      </p>
      <p><Span className="text-primary w-[100px] inline-block">LinkedIn </Span>
        <a href="https://linkedin.com/in/sovandara1607" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">linkedin.com/in/sovandara1607</a>
      </p>
      <p><Span className="text-primary w-[100px] inline-block">Email    </Span>
        <a href={`mailto:${profile.contact.email}`} className="underline underline-offset-2 hover:text-primary transition-colors">{profile.contact.email}</a>
      </p>
    </div>
  ),

  resume: () => (
    <div>
      <p>Opening resume download…</p>
      <p className="text-muted-foreground text-xs mt-1">
        <a href="/Sovandara_Rith_CV.docx" download className="underline underline-offset-2 hover:text-primary transition-colors">
          Click here if it doesn&apos;t start automatically →
        </a>
      </p>
    </div>
  ),

  wallpapers: () => (
    <div className="space-y-1.5">
      <p className="text-primary font-semibold mb-2">Wallpaper Collection</p>
      {seedWallpapers.map(w => (
        <p key={w.slug}>
          <Span className="text-secondary w-[200px] inline-block">{w.title}</Span>
          <Span className="text-muted-foreground text-xs capitalize">{w.category} · {w.year}</Span>
        </p>
      ))}
      <p className="text-muted-foreground text-xs mt-1">
        → <Link href="/#wallpapers" className="underline underline-offset-2 hover:text-primary transition-colors">Browse full collection</Link>
      </p>
    </div>
  ),
}

const COMMAND_NAMES = Object.keys(COMMANDS)

const WELCOME_LINES = [
  "Welcome to Sovandara's portfolio terminal.",
  "Type 'help' to see available commands.",
  "",
]

// ── Terminal Window ─────────────────────────────────────────────────────────

let lineId = 0
const nextId = () => ++lineId

export function TerminalWindow({ embedded = false }: { embedded?: boolean }) {
  const [lines, setLines]         = useState<TermLine[]>([])
  const [input, setInput]         = useState("")
  const [history, setHistory]     = useState<string[]>([])
  const [histIdx, setHistIdx]     = useState(-1)

  const outputRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)
  const welcomedRef = useRef(false)

  // Typewriter welcome on mount
  useEffect(() => {
    if (welcomedRef.current) return
    welcomedRef.current = true

    let i = 0
    const displayNext = () => {
      if (i >= WELCOME_LINES.length) return
      const line = WELCOME_LINES[i]
      i++
      setLines(prev => [
        ...prev,
        {
          id: nextId(),
          type: "welcome",
          content: line === ""
            ? <>&nbsp;</>
            : <TypedLine text={line} onDone={displayNext} />,
        },
      ])
      if (line === "") displayNext()
    }
    displayNext()
  }, [])

  // Auto-scroll to bottom whenever lines change
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  // Download side-effect for 'resume' command
  useEffect(() => {
    const last = lines[lines.length - 1]
    if (last?.type === "output") {
      const cmd = history[0]
      if (cmd === "resume") {
        const a = document.createElement("a")
        a.href = "/Sovandara_Rith_CV.docx"
        a.download = ""
        a.click()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.length])

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setHistory(prev => [cmd, ...prev])
    setHistIdx(-1)

    // Echo the input
    const inputLine: TermLine = { id: nextId(), type: "input", content: cmd }

    if (cmd === "clear") {
      setLines([])
      return
    }

    const handler = COMMANDS[cmd]
    const outputLine: TermLine = handler
      ? { id: nextId(), type: "output", content: handler() }
      : { id: nextId(), type: "error",  content: `command not found: ${cmd}. Type 'help' for available commands.` }

    setLines(prev => [...prev, inputLine, outputLine])
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input)
      setInput("")
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      const newIdx = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(newIdx)
      setInput(history[newIdx] ?? "")
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const newIdx = Math.max(histIdx - 1, -1)
      setHistIdx(newIdx)
      setInput(newIdx === -1 ? "" : history[newIdx])
      return
    }

    if (e.key === "Tab") {
      e.preventDefault()
      if (!input) return
      const match = COMMAND_NAMES.find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
      return
    }
  }

  const outputArea = (
    <div
      ref={outputRef}
      className={`px-5 py-4 overflow-y-auto scrollbar-hide font-[family-name:var(--font-jetbrains)] text-sm leading-relaxed space-y-1.5 ${embedded ? "h-full" : "h-[340px]"}`}
    >
      {lines.map(line => (
        <div key={line.id} className={
          line.type === "input"   ? "flex items-start gap-2" :
          line.type === "error"   ? "text-destructive pl-4" :
          line.type === "welcome" ? "text-muted-foreground" :
          "text-foreground/85 pl-4 space-y-0.5"
        }>
          {line.type === "input" && (
            <span className="text-primary shrink-0 select-none">$</span>
          )}
          {line.content}
        </div>
      ))}

      {/* Active input line */}
      <div className="flex items-center gap-2">
        <span className="text-primary shrink-0 select-none">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-foreground font-[family-name:var(--font-jetbrains)] text-sm caret-primary"
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          aria-label="Terminal input"
        />
      </div>
    </div>
  )

  // Embedded variant (inside a desktop window — no outer chrome / titlebar)
  if (embedded) {
    return (
      <div className="h-full cursor-text" onClick={() => inputRef.current?.focus()}>
        {outputArea}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto glass-card rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(49,49,49,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* macOS title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/40 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 text-center text-xs text-muted-foreground font-mono">
          sovandara@portfolio ~ bash
        </span>
      </div>

      {outputArea}
    </motion.div>
  )
}

// Typewriter for the welcome banner
function TypedLine({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i))
      if (i >= text.length) {
        clearInterval(t)
        // Small pause before next line
        setTimeout(onDone, 60)
      }
    }, 18)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return <>{displayed}</>
}

// ── Section wrapper ─────────────────────────────────────────────────────────

export function TerminalSection() {
  return (
    <section id="terminal" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          kicker="Interactive"
          title="Try the terminal."
        />
        <TerminalWindow />
      </div>
    </section>
  )
}
