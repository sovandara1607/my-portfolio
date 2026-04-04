"use client"

import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperiencesSection } from "@/components/experiences-section"
import { WorkSection } from "@/components/work-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { HeroBackground } from "@/components/ui/classy-hero"
import { LanguageWrapper } from "@/components/language-wrapper"
import { MusicPlayer } from "@/components/music-player"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <LanguageWrapper>
      <main className="min-h-screen bg-black relative">
        <HeroBackground />
        <MusicPlayer />
        <div className="relative z-10">
          <Navigation />
          <HeroSection />
          <WorkSection />
          <ProjectsSection />
          <ExperiencesSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </LanguageWrapper>
  )
}
