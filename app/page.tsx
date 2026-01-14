import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { ProjectsSection } from "@/components/projects-section"
import { MindsetSection } from "@/components/mindset-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <MindsetSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  )
}
