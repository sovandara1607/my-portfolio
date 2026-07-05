"use client"

import { Button } from "@/components/ui/button"
import { ResumeDownload } from "./resume-download"
import { TextRotator } from "@/components/ui/classy-hero"
import { HeroWireframeGrid } from "@/components/ui/hero-wireframe-grid"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: "3rd", label: "Year CS student" },
  { value: "6+", label: "Projects built" },
  { value: "10+", label: "Technologies" },
  { value: "2", label: "Roles right now" },
]

const socials = [
  { name: "GitHub", href: "https://github.com/sovandara1607", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/sovandara1607", icon: Linkedin },
  { name: "Email", href: "mailto:rithsovandara83@gmail.com", icon: Mail },
]

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
      <HeroWireframeGrid />
      <div className="relative z-10 max-w-2xl mx-auto w-full flex flex-col items-center text-center">
        {/* Avatar */}
        <FadeIn>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-1 ring-border mb-6">
            <Image
              src="/profile.PNG"
              alt="Sovandara Rith"
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>

        {/* Availability badge */}
        <FadeIn delay={0.05}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for work · Phnom Penh
          </div>
        </FadeIn>

        {/* Name */}
        <FadeIn delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05] font-[family-name:var(--font-display)]">
            Sovandara Rith<span className="text-sky-400">.</span>
          </h1>
        </FadeIn>

        {/* Rotating role */}
        <FadeIn delay={0.15} className="mt-4">
          <TextRotator
            words={[
              "Junior Web Developer",
              "Junior Mobile Developer",
              "Systems Design Enthusiast",
              "Open Source Contributor",
              "UI/UX Design Enthusiast",
            ]}
            className="text-sm sm:text-base font-mono text-muted-foreground tracking-wide"
            interval={3000}
            letterAnimation
            textGradient={false}
          />
        </FadeIn>

        {/* Tagline */}
        <FadeIn delay={0.2}>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
            Year 3 Computer Science student.
          </p>
        </FadeIn>

        {/* Stat cards */}
        <FadeIn delay={0.3} className="w-full">
          <div className="mt-10 glass-card overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "px-4 py-5 flex flex-col items-center gap-1",
                    i % 2 === 0 && "border-r",
                    i < 2 && "border-b sm:border-b-0",
                    i === 1 && "sm:border-r"
                  )}
                >
                  <span className="text-2xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              className="rounded-full px-6 h-11 bg-foreground text-background hover:bg-foreground/85 text-sm font-medium transition-colors"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t("nav.getInTouch")}
            </Button>
            <ResumeDownload />
          </div>
        </FadeIn>

        {/* Socials */}
        <FadeIn delay={0.5}>
          <div className="mt-8 flex items-center justify-center gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <social.icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
