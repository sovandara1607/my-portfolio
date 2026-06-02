"use client"

import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { HeroBackground } from "@/components/ui/classy-hero"
import { MusicPlayer } from "@/components/music-player"
import { Footer } from "@/components/footer"
import { EdgeMarker } from "@/components/edge-marker"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <HeroBackground />
      <MusicPlayer />
      <EdgeMarker />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperiencesSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
