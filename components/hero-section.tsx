"use client"

import { Button } from "@/components/ui/button"
import { CodePreview } from "./code-preview"
import { ResumeDownload } from "./resume-download"
import { TextRotator } from "@/components/ui/classy-hero"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

// ── Word-reveal headline ────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

function WordReveal({
  words,
  className,
}: {
  words: { text: string; className?: string }[]
  className?: string
}) {
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: EASE }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: i < words.length - 1 ? undefined : undefined }}
        >
          {w.text}
        </motion.span>
      ))}
    </span>
  )
}

// ── Section ─────────────────────────────────────────────────────────────────

export function HeroSection() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()

  // Parallax transforms: blobs move up as user scrolls
  const blobY1 = useTransform(scrollY, [0, 600], [0, -80])
  const blobY2 = useTransform(scrollY, [0, 600], [0, -50])
  // Text container: subtle push-up
  const textY  = useTransform(scrollY, [0, 600], [0, 28])

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 pt-24 sm:pt-32 pb-16 overflow-hidden">
      {/* Parallax ambient blobs */}
      <motion.div style={{ y: blobY1 }} className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <motion.div style={{ y: blobY2 }} className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Editorial running header */}
      <div className="absolute top-28 left-0 right-0 hidden md:flex items-center justify-between px-6 max-w-6xl mx-auto z-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
          The Portfolio — Volume 01
        </span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
        </span>
      </div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left column — editorial copy */}
        <motion.div
          style={{ y: textY }}
          className="lg:col-span-7 space-y-6 sm:space-y-8 text-left order-2 lg:order-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-baseline gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs font-mono text-primary tabular-nums tracking-widest">[00]</span>
            <span className="h-px w-12 bg-border" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
              Now Open
            </span>
          </motion.div>

          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95] tracking-tight break-words overflow-hidden">
            <WordReveal
              words={[
                { text: "Sovandara" },
              ]}
            />
            <br />
            <WordReveal
              words={[
                { text: "Rith", className: "text-primary italic font-light" },
                { text: ".", className: "text-foreground" },
              ]}
            />
          </h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Year 3 Computer Science student — building web and mobile interfaces with an obsession for typography, rhythm, and detail.
          </motion.p>

          <motion.div
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <TextRotator
              words={[
                "Junior Web Developer",
                "Junior Mobile Developer",
                "Senior Video Editor",
              ]}
              className="text-sm md:text-base font-mono tracking-wide"
              interval={3000}
              letterAnimation
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-none px-5 sm:px-7 py-5 sm:py-6 transition-all duration-300 font-[family-name:var(--font-space-grotesk)] uppercase tracking-[0.2em] text-xs"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t("hero.viewProjects")}
            </Button>
            <ResumeDownload />
          </motion.div>
        </motion.div>

        {/* Right column — portrait + meta card */}
        <motion.div
          className="lg:col-span-5 space-y-4 order-1 lg:order-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Floating ambient badge */}
          <motion.div
            className="hidden lg:flex items-center gap-2 ml-auto w-fit mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="animate-float px-3 py-1.5 border border-border/60 bg-background/60 backdrop-blur-sm text-[10px] font-[family-name:var(--font-space-grotesk)] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              CS Student · Phnom Penh
            </div>
          </motion.div>

          <div className="relative aspect-[4/5] w-full max-w-[260px] sm:max-w-sm mx-auto lg:ml-auto overflow-hidden border border-border ring-1 ring-border/40 shadow-2xl">
            <Image
              src="/profile.PNG"
              alt="Sovandara Rith"
              fill
              className="object-cover grayscale-[15%]"
              priority
            />
            <div className="absolute top-3 left-3 right-3 flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/90 mix-blend-difference">
              <span>fig. 01</span>
              <span>SR / portrait</span>
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] font-mono uppercase tracking-widest text-white/90 mix-blend-difference">
              <span>Phnom Penh</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Available
              </span>
            </div>
          </div>
          <div className="hidden lg:block max-w-sm mx-auto lg:ml-auto">
            <div className="border border-border p-3 bg-background/40 backdrop-blur-sm">
              <CodePreview />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-4 sm:left-6 hidden sm:flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
          Scroll to continue
        </span>
      </motion.div>
    </section>
  )
}
