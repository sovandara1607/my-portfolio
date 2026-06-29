"use client"

import {
  Briefcase,
  GraduationCap,
  School,
  Award,
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
  const { t } = useLanguage()

  const work = profile.experience[0]
  const [startYear, endYear] = work.period.split(" – ")

  return (
    <section id="experiences" className="py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="03"
          kicker="Experiences"
          title="What I've Done."
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

        {/* ── 02 · Education — Academic Record Sheet ──────────────── */}
        <SubHeader index="02" label={t("experiences.education")} />

        {/* Catalog meta strip */}
        <div className="flex items-center justify-between mb-8 pt-4 border-t border-border">
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            Academic Record · {String(profile.education.length).padStart(2, "0")} entries
          </span>
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            Phnom Penh · Cambodia
          </span>
        </div>

        <div className="mb-12">
          {profile.education.map((edu, i) => {
            const Icon = educationIcons[i] ?? GraduationCap
            const isLast = i === profile.education.length - 1
            const isCurrent = edu.period.toLowerCase().includes("present")
            const endYear = edu.period.split("–").pop()?.trim() ?? edu.period
            const startYear = edu.period.split("–")[0]?.trim() ?? ""
            const bigYear = isCurrent ? "2026" : endYear
            const shortCode = edu.school
              .split(" ")
              .filter((w) => w[0] === w[0]?.toUpperCase())
              .map((w) => w[0])
              .join("")
              .slice(0, 4)
            return (
              <div
                key={edu.school}
                className={`group relative ${isLast ? "" : "border-b border-border"}`}
              >
                <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/20 transition-colors pointer-events-none" />

                <article className="relative grid md:grid-cols-[180px_1fr_220px] gap-6 md:gap-10 py-8 md:py-12 px-2">
                  {/* Col 1 · Conferred year + status */}
                  <div className="flex md:flex-col gap-4 md:gap-0 items-baseline md:items-start md:justify-between">
                    <div>
                      <div className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)] mb-1">
                        {isCurrent ? "Expected" : "Conferred"}
                      </div>
                      <div
                        className="text-4xl md:text-6xl font-bold leading-none tracking-tight text-transparent font-[family-name:var(--font-space-grotesk)]"
                        style={{ WebkitTextStroke: "1.5px var(--color-foreground)" }}
                      >
                        {bigYear}
                      </div>
                    </div>

                    <div className="md:mt-auto md:pt-6 flex md:block items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)] px-2 py-0.5 rounded-full ${
                          isCurrent
                            ? "text-primary bg-primary/10"
                            : "text-secondary bg-secondary/10"
                        }`}
                      >
                        {isCurrent && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        )}
                        {isCurrent ? "In progress" : "Graduated"}
                      </span>
                      <span className="md:block md:mt-2 text-xs text-muted-foreground/70 font-[family-name:var(--font-space-grotesk)] tracking-wider">
                        {startYear} → {endYear}
                      </span>
                    </div>
                  </div>

                  {/* Col 2 · Degree + school + note */}
                  <div className="flex flex-col gap-4 min-w-0">
                    <h4 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.05] tracking-tight group-hover:text-primary transition-colors">
                      {edu.degree}
                    </h4>

                    <div className="flex items-center gap-3">
                      <span className="inline-block w-6 h-px bg-secondary" />
                      <span className="text-xs md:text-sm text-secondary tracking-wider font-[family-name:var(--font-space-grotesk)]">
                        {edu.school}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Award className="w-3.5 h-3.5 text-primary" />
                      <span className="text-sm text-foreground/90 italic">
                        {edu.note}
                      </span>
                    </div>
                  </div>

                  {/* Col 3 · Diploma seal */}
                  <div className="flex md:items-center md:justify-end md:border-l md:border-border md:pl-8">
                    <div className="relative w-28 h-28">
                      {/* Outer dashed ring */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-border" />
                      {/* Inner solid ring */}
                      <div className="absolute inset-2 rounded-full border border-border bg-muted/30 flex flex-col items-center justify-center">
                        <Icon className="w-6 h-6 text-secondary mb-1" />
                        <span className="text-[9px] text-muted-foreground tracking-[0.2em] font-[family-name:var(--font-space-grotesk)]">
                          {shortCode}
                        </span>
                      </div>
                      {/* Tiny corner stars */}
                      <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-[10px] text-primary/60">
                        ✦
                      </span>
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[10px] text-primary/60">
                        ✦
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        {/* Catalog footer rule */}
        <div className="mt-2 pt-4 border-t border-border flex items-center justify-between mb-16">
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            End of record
          </span>
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            Year 3 · Ongoing
          </span>
        </div>

        {/* ── 03 · Personal Index — Three Editorial Blocks ────────── */}
        <SubHeader index="03" label="Personal Index" />

        <div className="flex items-center justify-between mb-8 pt-4 border-t border-border">
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            Personal Index · 03 categories
          </span>
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            Analog · Off-Screen
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr_1.3fr] gap-5">
          {/* ─── A · Soft Skills — pull quotes ─── */}
          <div className="glass-card p-6 flex flex-col relative overflow-hidden">
            <Quote
              aria-hidden
              className="absolute -top-2 -right-2 w-20 h-20 text-primary/5"
            />

            <div className="flex items-center justify-between mb-1 relative z-10">
              <span className="text-[10px] text-foreground tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)] font-semibold">
                A · {t("experiences.softSkills")}
              </span>
              <span className="text-[9px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                Vol. {String(profile.softSkills.length).padStart(2, "0")}
              </span>
            </div>
            <div className="h-px bg-border mb-6 relative z-10" />

            <div className="space-y-6 flex-1 relative z-10">
              {profile.softSkills.map((skill, i) => (
                <div key={skill} className="relative">
                  <span className="absolute -left-1 -top-3 text-5xl text-primary/40 leading-none font-serif select-none">
                    “
                  </span>
                  <p className="pl-6 text-sm text-foreground/90 italic leading-relaxed">
                    {skill}
                  </p>
                  <div className="pl-6 mt-3 flex items-center gap-2">
                    <span className="inline-block h-px w-6 bg-primary/40" />
                    <span className="text-[10px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                      Trait {String(i + 1).padStart(2, "0")} / {String(profile.softSkills.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-border flex items-center justify-between relative z-10">
              <span className="text-[9px] text-muted-foreground/60 tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                Soft / Human
              </span>
              <span className="text-[9px] text-primary/60">✦</span>
            </div>
          </div>

          {/* ─── B · Languages — ranked records ─── */}
          <div className="glass-card p-6 flex flex-col relative overflow-hidden">
            {/* Decorative giant outlined count */}
            <span
              aria-hidden
              className="absolute -bottom-4 -right-2 text-[80px] leading-none font-bold text-transparent font-[family-name:var(--font-space-grotesk)] select-none pointer-events-none"
              style={{ WebkitTextStroke: "1px var(--color-border)" }}
            >
              {String(profile.languages.length).padStart(2, "0")}
            </span>

            <div className="flex items-center justify-between mb-1 relative z-10">
              <span className="text-[10px] text-foreground tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)] font-semibold">
                B · {t("experiences.languages")}
              </span>
              <span className="text-[9px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                Spoken
              </span>
            </div>
            <div className="h-px bg-border mb-6 relative z-10" />

            <div className="space-y-5 flex-1 relative z-10">
              {profile.languages.map((lang, i) => {
                const isNative = lang.toLowerCase().includes("native")
                const filledDots = isNative ? 5 : 4
                return (
                  <div key={lang} className="space-y-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs text-secondary tracking-wider font-[family-name:var(--font-space-grotesk)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-lg font-bold text-foreground tracking-tight">
                          {lang.split(" (")[0]}
                        </span>
                      </div>
                      {isNative ? (
                        <span className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full tracking-[0.2em] font-[family-name:var(--font-space-grotesk)] uppercase">
                          Native
                        </span>
                      ) : (
                        <span className="text-[9px] text-muted-foreground border border-border px-2 py-0.5 rounded-full tracking-[0.2em] font-[family-name:var(--font-space-grotesk)] uppercase">
                          Fluent
                        </span>
                      )}
                    </div>

                    {/* Proficiency dots */}
                    <div className="flex items-center gap-1.5 pl-7">
                      {[...Array(5)].map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`inline-block w-2 h-2 rounded-full ${
                            dotIdx < filledDots
                              ? isNative
                                ? "bg-primary"
                                : "bg-secondary"
                              : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-border flex items-center justify-between relative z-10">
              <span className="text-[9px] text-muted-foreground/60 tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                Read · Write · Speak
              </span>
              <span className="text-[9px] text-primary/60">✦</span>
            </div>
          </div>

          {/* ─── C · Interests — specimen tiles ─── */}
          <div className="glass-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-foreground tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)] font-semibold">
                C · {t("experiences.interests")}
              </span>
              <span className="text-[9px] text-muted-foreground/60 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                {String(profile.interests.length).padStart(2, "0")} Pursuits
              </span>
            </div>
            <div className="h-px bg-border mb-6" />

            <div className="grid grid-cols-2 gap-3 flex-1">
              {profile.interests.map((interest, i) => {
                const Icon = interestIconMap[interest] ?? Leaf
                return (
                  <div
                    key={interest}
                    className="group/tile relative flex flex-col p-4 rounded-xl bg-muted/30 border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Corner serial */}
                    <span className="absolute top-2 left-3 text-[9px] text-muted-foreground/50 tracking-widest font-[family-name:var(--font-space-grotesk)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Corner accent */}
                    <span className="absolute top-2 right-3 text-[10px] text-primary/30 group-hover/tile:text-primary/70 transition-colors">
                      ✦
                    </span>

                    <div className="mt-4 mb-3 flex items-center justify-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-border text-primary group-hover/tile:scale-110 group-hover/tile:border-primary/40 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-bold text-foreground">
                        {interest}
                      </div>
                      <div className="h-px w-6 mx-auto mt-1.5 bg-border group-hover/tile:bg-primary transition-colors" />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-border flex items-center justify-between">
              <span className="text-[9px] text-muted-foreground/60 tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                Off the keyboard
              </span>
              <span className="text-[9px] text-primary/60">✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
