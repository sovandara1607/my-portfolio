"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Circle, MapPin, Calendar } from "lucide-react"
import { nowData } from "@/lib/now-data"

const EASE = [0.22, 1, 0.36, 1] as const

function Card({
  children,
  delay = 0,
  accent = false,
}: {
  children: React.ReactNode
  delay?: number
  accent?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className={`glass-card p-6 ${accent ? "border-l-2 border-l-primary" : ""}`}
    >
      {children}
    </motion.div>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-[family-name:var(--font-space-grotesk)] mb-3">
      {children}
    </p>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 text-[11px] border border-border text-muted-foreground font-mono rounded-sm">
      {label}
    </span>
  )
}

export default function NowPage() {
  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Top nav */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center justify-between mb-12"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-space-grotesk)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Dangkao, Phnom Penh, Cambodia
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> Updated {nowData.updatedAt}
            </span>
          </div>
        </motion.div>

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10"
        >
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)] mb-4">
            // Status
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight">
            What I&apos;m doing{" "}
            <span className="text-primary italic font-light">now.</span>
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
            A living snapshot of what I&apos;m focused on — inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              nownownow.com
            </a>
            .
          </p>
        </motion.div>

        <div className="space-y-6">

          {/* Current Focus quote */}
          <Card delay={0.05} accent>
            <Kicker>Current Focus</Kicker>
            <blockquote className="text-xl sm:text-2xl font-medium text-foreground leading-snug tracking-tight">
              &ldquo;{nowData.focus}&rdquo;
            </blockquote>
          </Card>

          {/* Building */}
          <Card delay={0.1} accent>
            <Kicker>Currently Building</Kicker>
            <div className="space-y-5">
              {nowData.building.map(item => (
                <div key={item.name}>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.stack.map(t => <Tag key={t} label={t} />)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning */}
          <Card delay={0.15} accent>
            <Kicker>Currently Learning</Kicker>
            <ul className="space-y-2">
              {nowData.learning.map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="text-primary mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Recently Completed */}
          <Card delay={0.2}>
            <Kicker>Recently Completed</Kicker>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-4">
                {nowData.recentlyCompleted.map(item => (
                  <div key={item.name} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-secondary border-2 border-background" />
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{item.when}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Reading */}
          <Card delay={0.25}>
            <Kicker>Reading</Kicker>
            <ul className="space-y-2">
              {nowData.reading.map(book => (
                <li key={book} className="text-sm text-foreground/80 leading-snug">{book}</li>
              ))}
            </ul>
          </Card>

          {/* Goals */}
          <Card delay={0.35}>
            <Kicker>Goals</Kicker>
            <ul className="space-y-3">
              {nowData.goals.map(goal => (
                <li key={goal.label} className="flex items-start gap-2.5 text-sm">
                  {goal.done
                    ? <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    : <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                  }
                  <span className={goal.done ? "line-through text-muted-foreground" : "text-foreground/85"}>
                    {goal.label}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-xs text-muted-foreground font-mono">
            Last updated: {nowData.updatedAt}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors font-[family-name:var(--font-space-grotesk)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to portfolio
          </Link>
        </motion.div>

      </div>
    </main>
  )
}
