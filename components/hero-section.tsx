"use client"

import { Button } from "@/components/ui/button"
import { CodePreview } from "./code-preview"
import { ResumeDownload } from "./resume-download"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24 pb-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left">
          {/* Profile Picture with Name - Combined */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-3 border-primary/40 shadow-xl theme-transition-card">
                <Image
                  src="/profile.PNG"
                  alt="Sovandara Rith"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="space-y-2 flex-1">
              <p className="text-primary text-sm tracking-wider">{t("hero.welcome")}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {t("hero.greeting")} <span className="text-primary text-glow">{language === "kh" ? t("hero.name") : "Sovandara Rith"}</span>
              </h1>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg lg:text-xl text-muted-foreground">{t("hero.subtitle")}</p>
            <p className="text-muted-foreground">{t("hero.aspiring")}</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan-hover"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {t("hero.viewProjects")}
            </Button>
            <ResumeDownload />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:max-w-none">
          <CodePreview />
        </div>
      </div>
    </section>
  )
}
