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
import { HeroBackground } from "@/components/ui/classy-hero"
import { MusicPlayer } from "@/components/music-player"
import { Footer } from "@/components/footer"
import { EdgeMarker } from "@/components/edge-marker"
import { Desktop } from "@/components/desktop/desktop"

export default function Home() {
  const [desktopMode, setDesktopMode] = useState(false)

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
      <HeroBackground />
      <MusicPlayer />
      <EdgeMarker />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <TerminalSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperiencesSection />
        <ContactSection />
        <WallpapersSection />
        <Footer />
      </div>
    </main>
  )
}
