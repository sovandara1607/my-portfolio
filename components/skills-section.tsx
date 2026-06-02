"use client"

import { Fragment } from "react"
import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"
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
    <section id="skills" className="py-16 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="01"
          kicker="Tech Stack"
          title="Technologies I Use."
        />

        <div className="border-t border-border">
          {groups.map((group, index) => (
            <div
              key={group.key}
              className="group grid md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-8 md:py-10 border-b border-border transition-colors hover:bg-muted/20"
            >
              <div className="flex md:block items-baseline gap-3">
                <span className="text-[11px] text-muted-foreground/60 font-[family-name:var(--font-space-grotesk)] tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm md:text-base font-bold text-foreground tracking-[0.2em] uppercase font-[family-name:var(--font-space-grotesk)] md:mt-2">
                  {group.label}
                </h3>
                <div className="hidden md:block mt-3 h-px w-8 bg-primary transition-all duration-300 group-hover:w-16" />
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 text-lg md:text-xl text-foreground/90 leading-relaxed">
                {group.items.map((item, i) => (
                  <Fragment key={item}>
                    {i > 0 && (
                      <span className="text-muted-foreground/30 select-none" aria-hidden>
                        ·
                      </span>
                    )}
                    <span className="cursor-default transition-colors hover:text-primary">
                      {item}
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
