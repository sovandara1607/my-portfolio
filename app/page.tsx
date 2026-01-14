"use client"

import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ProjectsSection } from "@/components/projects-section"
import { MindsetSection } from "@/components/mindset-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { AnimatedTerminal } from "@/components/animated-terminal"
import { GitHubStatsSection } from "@/components/github-stats-section"
import { FloorTilesBackground } from "@/components/floor-tiles-background"
import { ResumeCard } from "@/components/resume-download"
import { LanguageWrapper } from "@/components/language-wrapper"
import { MusicPlayer } from "@/components/music-player"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <LanguageWrapper>
      <main className="min-h-screen bg-background relative">
        <FloorTilesBackground />
        <MusicPlayer />
        <div className="relative z-10">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <AnimatedTerminal />
          <TechStackSection />
          <ProjectsSection />
          <GitHubStatsSection />
          <MindsetSection />
          <AchievementsSection />
          <section className="py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8 text-center">
                <p className="text-primary text-sm tracking-wider mb-2">{t("resume.label") || "// Resume"}</p>
                <h2 className="text-3xl font-bold text-foreground">{t("resume.title") || "Download My CV"}</h2>
              </div>
              <ResumeCard />
            </div>
          </section>
          <ContactSection />
        </div>
      </main>
    </LanguageWrapper>
  )
}
