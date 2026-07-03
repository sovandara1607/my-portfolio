"use client"

import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"
import { LogoMarquee } from "./logo-marquee"
import { profile } from "@/lib/profile"

interface SkillGroup {
  key: keyof typeof profile.skills
  label: string
  items: readonly string[]
}

export function SkillsSection() {
  const { t } = useLanguage()

  const groups: SkillGroup[] = [
    { key: "frontend", label: t("skills.frontend"), items: profile.skills.frontend },
    { key: "backend", label: t("skills.backend"), items: profile.skills.backend },
    { key: "mobile", label: t("skills.mobile"), items: profile.skills.mobile },
    { key: "databases", label: t("skills.databases"), items: profile.skills.databases },
    { key: "design", label: t("skills.design"), items: profile.skills.design },
    { key: "tools", label: t("skills.tools"), items: profile.skills.tools },
  ]

  return (
    <section id="skills" className="py-16 md:py-24">
      {/* Section header — constrained width */}
      <div className="px-4 sm:px-6 max-w-3xl mx-auto">
        <SectionHeader kicker="Stack" title="Tools & technologies." />
      </div>

      {/* Logo marquee — visual overview of the stack */}
      <LogoMarquee />

      {/* Grouped breakdown */}
      <div className="px-4 sm:px-6 max-w-3xl mx-auto mt-12 md:mt-16">
        <div className="space-y-8">
          {groups.map((group) => (
            <div
              key={group.key}
              className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-8 items-baseline"
            >
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {group.label}
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs sm:text-sm text-foreground/85"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
