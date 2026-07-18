"use client"

import { SectionHeader } from "./section-header"
import { LogoMarquee } from "./logo-marquee"

export function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24">
      {/* Section header — constrained width */}
      <div className="px-4 sm:px-6 max-w-3xl mx-auto">
        <SectionHeader kicker="Stack" title="Tools & technologies." />
      </div>

      {/* Logo marquee — visual overview of the stack */}
      <LogoMarquee />
    </section>
  )
}
