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
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-8 overflow-hidden">
      {/* Ambient light sources */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        <motion.div 
          className="space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Profile Picture with Name */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <motion.div 
              className="relative group flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-2xl overflow-hidden border border-border shadow-2xl">
                <Image
                  src="/profile.PNG"
                  alt="Sovandara Rith"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
            
            <div className="space-y-2 flex-1">
              <motion.p 
                className="text-secondary text-sm tracking-wider uppercase font-[family-name:var(--font-space-grotesk)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t("hero.welcome")}
              </motion.p>
              <motion.h1 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {t("hero.greeting")}{" "}
                <span className="text-primary">
                  {language === "kh" ? t("hero.name") : "Sovandara Rith"}
                </span>
              </motion.h1>
            </div>
          </div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Status badge */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm text-muted-foreground tracking-wide font-[family-name:var(--font-space-grotesk)]">
                  {language === "kh" ? "និស្សិតឆ្នាំទី៣ · វិទ្យាសាស្ត្រកុំព្យូទ័រ" : "Year 3 · Computer Science"}
                </span>
              </div>
            </div>

            <TextRotator
              words={[
                "Junior Web Developer",
                "Junior Mobile Developer", 
                "Senior Video Editor",
              ]}
              className="text-lg lg:text-xl"
              interval={3000}
              textGradient
              letterAnimation
            />
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(243,128,32,0.25)]  font-[family-name:var(--font-space-grotesk)]  uppercase tracking-wider text-sm"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t("hero.viewProjects")}
            </Button>
            <ResumeDownload />
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full max-w-md mx-auto lg:max-w-none"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-card p-1">
            <CodePreview />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
