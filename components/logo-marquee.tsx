"use client"

import { useRef, useState, useEffect, useCallback } from "react"

const LOGOS = [
  { name: "HTML",         file: "html" },
  { name: "CSS",          file: "css" },
  { name: "JavaScript",   file: "javascript" },
  { name: "Tailwind",     file: "tailwind" },
  { name: "PHP",          file: "php" },
  { name: "Laravel",      file: "laravel" },
  { name: "Go",           file: "go" },
  { name: "Java",         file: "java" },
  { name: "Dart",         file: "dart" },
  { name: "Flutter",      file: "flutter" },
  { name: "Swift",        file: "swift" },
  { name: "MySQL",        file: "mysql" },
  { name: "PostgreSQL",   file: "postgresql" },
  { name: "Redis",        file: "redis" },
  { name: "MongoDB",      file: "mongodb" },
  { name: "Figma",        file: "figma" },
  { name: "Docker",       file: "docker" },
  { name: "Git",          file: "git" },
  { name: "Gitea",        file: "gitea" },
  { name: "DigitalOcean", file: "digitalocean" },
  { name: "Vercel",       file: "vercel" },
  { name: "Railway",      file: "railway" },
  { name: "Supabase",     file: "supabase" },
  { name: "Cloudinary",   file: "cloudinary" },
]

const TRACK = [...LOGOS, ...LOGOS]
const SCROLL_SPEED = 38 // px per second

function LogoTile({ name, file }: { name: string; file: string }) {
  const maskStyle = {
    WebkitMaskImage: `url(/logos/${file}.svg)`,
    maskImage: `url(/logos/${file}.svg)`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  } as React.CSSProperties

  return (
    <div className="group shrink-0 select-none flex flex-col items-center justify-center gap-2.5 w-[80px] py-5 px-2 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/[0.05] transition-all duration-250 ease-out">
      {/* Icon — monochrome at rest, primary accent on hover */}
      <span
        aria-hidden
        style={maskStyle}
        className="block w-8 h-8 bg-foreground/30 group-hover:bg-primary group-hover:scale-110 transition-all duration-250 ease-out"
      />
      {/* Name */}
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors duration-250 font-[family-name:var(--font-space-grotesk)] text-center leading-none whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export function LogoMarquee() {
  const scrollRef   = useRef<HTMLDivElement>(null)
  const rafRef      = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const isHoveredRef  = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragScrollRef = useRef(0)
  const [grabbing, setGrabbing] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const tick = (ts: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = ts
      const delta = ts - lastTimeRef.current
      lastTimeRef.current = ts

      if (!isHoveredRef.current && !isDraggingRef.current) {
        const half = el.scrollWidth / 2
        if (half > 0) {
          el.scrollLeft += (delta / 1000) * SCROLL_SPEED
          if (el.scrollLeft >= half) el.scrollLeft -= half
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return
    isDraggingRef.current = true
    setGrabbing(true)
    dragStartXRef.current = e.clientX
    dragScrollRef.current = scrollRef.current.scrollLeft
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return
    const half = scrollRef.current.scrollWidth / 2
    let next = dragScrollRef.current + (dragStartXRef.current - e.clientX)
    if (half > 0) {
      if (next < 0)     next += half
      if (next >= half) next -= half
    }
    scrollRef.current.scrollLeft = next
  }, [])

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false
    setGrabbing(false)
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => { isHoveredRef.current = true }}
      onMouseLeave={() => {
        isHoveredRef.current  = false
        isDraggingRef.current = false
        setGrabbing(false)
      }}
    >
      {/* Edge fades */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
      />

      <div
        ref={scrollRef}
        className={`flex overflow-x-scroll scrollbar-hide py-2 ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="list"
        aria-label="Technologies and tools"
      >
        <div className="shrink-0 w-6" aria-hidden />
        {TRACK.map((logo, i) => (
          <LogoTile key={`${logo.file}-${i}`} name={logo.name} file={logo.file} />
        ))}
        <div className="shrink-0 w-6" aria-hidden />
      </div>
    </div>
  )
}
