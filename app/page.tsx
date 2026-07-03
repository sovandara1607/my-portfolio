"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { TerminalSection } from "@/components/terminal-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { ContactSection } from "@/components/contact-section"
import { WallpapersSection } from "@/components/wallpapers-section"
import { Navigation } from "@/components/navigation"
import { MusicPlayer } from "@/components/music-player"
import { useMusic } from "@/lib/music-context"
import { Footer } from "@/components/footer"
import { Desktop } from "@/components/desktop/desktop"
import { FluidBackground } from "@/components/ui/fluid-background"
import { TvPreloader } from "@/components/tv-preloader"

export default function Home() {
  const [desktopMode, setDesktopMode] = useState(false)
  const { autoStart } = useMusic()

  // Allow nav / command palette to trigger desktop mode via a custom event
  useEffect(() => {
    const enter = () => setDesktopMode(true)
    window.addEventListener("enter-desktop", enter)
    return () => window.removeEventListener("enter-desktop", enter)
  }, [])

  if (desktopMode) {
    return <Desktop onExit={() => setDesktopMode(false)} />
  }

  return (
    <main className="min-h-screen bg-background relative">
      <TvPreloader onComplete={autoStart} />
      <div aria-hidden className="dot-grid fixed inset-0 pointer-events-none" />
      <FluidBackground />
      <MusicPlayer />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <ExperiencesSection />
        <ProjectsSection />
        <SkillsSection />
        <TerminalSection />
        <WallpapersSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
