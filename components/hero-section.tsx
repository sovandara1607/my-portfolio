"use client"

import { Button } from "@/components/ui/button"
import { CodePreview } from "./code-preview"
import { ResumeDownload } from "./resume-download"
import { TextRotator } from "@/components/ui/classy-hero"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center px-6 pt-32 pb-16 overflow-hidden">
      {/* Ambient light sources */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Editorial running header */}
      <div className="absolute top-28 left-0 right-0 hidden md:flex items-center justify-between px-6 max-w-6xl mx-auto z-10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
          The Portfolio — Volume 01
        </span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
        </span>
      </div>

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        {/* Left column — editorial copy */}
        <motion.div
          className="lg:col-span-7 space-y-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
              {language === "kh" ? "ស្វាគមន៍" : "Now Open"}
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {language === "kh" ? t("hero.name") : "Sovandara"}
            <br />
            <span className="text-primary italic font-light">Rith</span>
            <span className="text-foreground">.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {language === "kh"
              ? "និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រឆ្នាំទី៣ — បង្កើតកម្មវិធីគេហទំព័រ និងទូរស័ព្ទ ដោយការយកចិត្តទុកដាក់ចំពោះការរចនា និងលម្អិត។"
              : "Year 3 Computer Science student — building web and mobile interfaces with an obsession for typography, rhythm, and detail."}
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
              className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-none px-7 py-6 transition-all duration-300 font-[family-name:var(--font-space-grotesk)] uppercase tracking-[0.2em] text-xs"
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
          className="lg:col-span-5 space-y-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] max-w-sm mx-auto lg:ml-auto overflow-hidden border border-border">
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
        className="absolute bottom-8 left-6 flex items-center gap-3"
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
