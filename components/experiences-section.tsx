"use client"

import {
  Briefcase,
  GraduationCap,
  School,
  Quote,
  Camera,
  Video,
  Leaf,
  Music,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"
import { profile } from "@/lib/profile"

const interestIconMap: Record<string, LucideIcon> = {
  Photography: Camera,
  Videography: Video,
  Nature: Leaf,
  Music: Music,
}

const educationIcons: LucideIcon[] = [GraduationCap, School]

function SubHeader({
  index,
  label,
}: {
  index: string
  label: string
}) {
  return (
    <div className="mb-5 flex items-baseline gap-4">
      <span className="text-[11px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
        {index}
      </span>
      <h3 className="text-xs md:text-sm font-bold text-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
        {label}
      </h3>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

export function ExperiencesSection() {
  const { t, language } = useLanguage()

  const work = profile.experience[0]
  const [startYear, endYear] = work.period.split(" – ")

  return (
    <section id="experiences" className="py-16 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="03"
          kicker={language === "kh" ? "បទពិសោធន៍" : "Experiences"}
          title={language === "kh" ? "អ្វីដែលខ្ញុំបានធ្វើ" : "What I've Done."}
        />

        {/* ── Hero Work card ───────────────────────────────────────── */}
        <SubHeader index="01" label={t("experiences.work")} />

        <div className="glass-card p-6 md:p-10 mb-16 relative overflow-hidden">
          {/* Decorative corner stamp */}
          <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 text-[10px] text-muted-foreground/50 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Current · No. 001</span>
          </div>

          <div className="grid md:grid-cols-[1fr_140px] gap-8 md:gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-secondary tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                  Leadership Role
                </span>
              </div>

              <div>
                <h4 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  {work.role}
                </h4>
                <p className="mt-2 text-base text-primary/90 font-medium">
                  {work.org}
                </p>
                <p className="text-sm text-muted-foreground/80 italic">
                  {work.subtitle}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {work.bullets.map((bullet, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 py-1"
                  >
                    <span className="text-xs text-secondary font-[family-name:var(--font-space-grotesk)] tracking-wider mt-1 w-6 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-border mt-3 flex-shrink-0 transition-all duration-300 group-hover:w-10 group-hover:bg-primary" />
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical date rail */}
            <div className="hidden md:flex flex-col items-center justify-between border-l border-border pl-6">
              <div className="text-center">
                <div className="text-[10px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                  START
                </div>
                <div className="text-3xl font-bold text-foreground mt-1 font-[family-name:var(--font-space-grotesk)]">
                  {startYear}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 my-4">
                <div className="w-px flex-1 h-12 bg-gradient-to-b from-primary/60 via-border to-secondary/60" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-px flex-1 h-12 bg-gradient-to-b from-secondary/60 via-border to-primary/60" />
              </div>

              <div className="text-center">
                <div className="text-[10px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                  END
                </div>
                <div className="text-3xl font-bold text-foreground mt-1 font-[family-name:var(--font-space-grotesk)]">
                  {endYear}
                </div>
              </div>
            </div>

            {/* Mobile date pill */}
            <div className="md:hidden flex items-center gap-3 text-xs text-muted-foreground font-[family-name:var(--font-space-grotesk)] tracking-wider">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span>{work.period}</span>
            </div>
          </div>
        </div>

        {/* ── Education ─────────────────────────────────────────────── */}
        <SubHeader index="02" label={t("experiences.education")} />

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {profile.education.map((edu, i) => {
            const Icon = educationIcons[i] ?? GraduationCap
            return (
              <div
                key={edu.school}
                className="glass-card p-6 group hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                    {edu.period}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {edu.degree}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {edu.school}
                </p>

                <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-xs text-primary/80 font-medium">
                    {edu.note}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Personal: Soft Skills · Languages · Interests ─────────── */}
        <SubHeader index="03" label="Personal" />

        <div className="grid md:grid-cols-[1fr_1fr_1.4fr] gap-5">
          {/* Soft Skills — pull quotes */}
          <div className="glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                {t("experiences.softSkills")}
              </span>
              <Quote className="w-4 h-4 text-primary/40" />
            </div>

            <div className="space-y-5 flex-1">
              {profile.softSkills.map((skill, i) => (
                <div key={skill} className="relative pl-4">
                  <span className="absolute left-0 top-0 text-2xl text-primary/40 leading-none font-serif">
                    “
                  </span>
                  <p className="text-sm text-foreground/90 italic leading-relaxed">
                    {skill}
                  </p>
                  <span className="block mt-2 text-[10px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                    {String(i + 1).padStart(2, "0")} / {String(profile.softSkills.length).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages — ranked pills */}
          <div className="glass-card p-6 flex flex-col">
            <span className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)] mb-5">
              {t("experiences.languages")}
            </span>

            <div className="space-y-3 flex-1">
              {profile.languages.map((lang, i) => {
                const isNative = lang.toLowerCase().includes("native")
                return (
                  <div
                    key={lang}
                    className="flex items-center justify-between gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-secondary tracking-wider font-[family-name:var(--font-space-grotesk)] w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-medium text-foreground">
                        {lang.split(" (")[0]}
                      </span>
                    </div>
                    {isNative ? (
                      <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full tracking-wider font-[family-name:var(--font-space-grotesk)] uppercase">
                        Native
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded-full tracking-wider font-[family-name:var(--font-space-grotesk)] uppercase">
                        Fluent
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Interests — iconified grid */}
          <div className="glass-card p-6 flex flex-col">
            <span className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)] mb-5">
              {t("experiences.interests")}
            </span>

            <div className="grid grid-cols-2 gap-3 flex-1">
              {profile.interests.map((interest) => {
                const Icon = interestIconMap[interest] ?? Leaf
                return (
                  <div
                    key={interest}
                    className="group relative flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-background text-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-foreground font-medium">
                      {interest}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
