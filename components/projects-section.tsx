"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Pin,
  FileCode,
  Sparkles,
} from "lucide-react"
import { Fragment } from "react"
import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"
import { profile } from "@/lib/profile"

const projectSlugByName: Record<string, string> = {
  "Online Resume Builder Platform": "resume-builder",
  "TaskFlow — Task Management Mobile App": "taskflow",
  "MyFinance — Finance Tracking App": "myfinance",
}

function SubHeader({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4">
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

export function ProjectsSection() {
  const { t } = useLanguage()

  const academicAndPersonal = [
    ...profile.academicProjects.map((p, i) => ({
      type: "ACADEMIC" as const,
      serial: `PROJ-A${String(i + 1).padStart(2, "0")}`,
      name: p.name,
      meta: p.course,
      period: p.period,
      stack: p.stack as readonly string[],
      summary: p.bullets[0],
      slug: projectSlugByName[p.name],
    })),
    ...profile.personalProjects.map((p, i) => ({
      type: "PERSONAL" as const,
      serial: `PROJ-P${String(i + 1).padStart(2, "0")}`,
      name: p.name,
      meta: p.platform,
      period: p.period,
      stack: p.stack as readonly string[],
      summary: p.bullets[0],
      slug: projectSlugByName[p.name],
    })),
  ]

  const featured = [
    {
      number: "001",
      title: t("projects.fitnessTitle"),
      description: t("projects.fitnessDesc"),
      tech: ["TypeScript", "React Native", "Expo"],
      pinned: true,
      github: "https://github.com/sovandara1607/Track-Your-Fitness",
      demo: "https://track-your-fitness-beta.vercel.app/",
      caseStudy: "/projects/fitness-app",
      filename: "fitness-app.tsx",
      role: "Mobile / Full-stack",
      code: [
        { text: "const FitnessApp = () => {", color: "text-primary" },
        { text: "  const features = [", color: "text-foreground" },
        { text: '    "workout-tracking",', color: "text-muted-foreground" },
        { text: '    "progress-analytics",', color: "text-muted-foreground" },
        { text: '    "social-challenges"', color: "text-muted-foreground" },
        { text: "  ];", color: "text-foreground" },
        { text: "", color: "text-foreground" },
        { text: "  return <App features={features} />;", color: "text-foreground" },
        { text: "};", color: "text-primary" },
      ],
    },
    {
      number: "002",
      title: "Performative Detector",
      description:
        "A fun Python project using MediaPipe and computer vision to detect when you're holding a cup and plays music on Spotify.",
      tech: ["Python", "MediaPipe", "OpenCV", "Spotify API"],
      pinned: false,
      github: "https://github.com/sovandara1607/performative_detector",
      demo: "https://youtu.be/dQw4w9WgXcQ",
      caseStudy: "/projects/performative_detector",
      filename: "performative_detector.py",
      role: "Computer Vision / Fun",
      code: [
        { text: "def detect_holding(self):", color: "text-primary" },
        { text: "  hands = self.mp_hands.process(frame)", color: "text-foreground" },
        { text: "  if hands.multi_hand_landmarks:", color: "text-foreground" },
        { text: "    is_holding = self.check_grip()", color: "text-foreground" },
        { text: "    if is_holding:", color: "text-foreground" },
        { text: '      self.display("PERFORMATIVE")', color: "text-muted-foreground" },
        { text: "      self.spotify.play()", color: "text-foreground" },
        { text: "  return is_holding", color: "text-foreground" },
      ],
    },
  ]

  return (
    <section id="projects" className="py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          kicker={t("projects.label").replace(/^\/\/\s*/, "")}
          title={t("projects.title")}
        />

        {/* ── Featured Projects — Zigzag Editorial Spread ─────────── */}
        <SubHeader index="01" label="Featured" />

        <div className="space-y-12 md:space-y-20 mb-24">
          {featured.map((project, index) => {
            const flip = index % 2 === 1
            return (
              <article
                key={project.number}
                className="group relative"
              >
                {/* Decorative spine number — giant outlined digit */}
                <div
                  aria-hidden
                  className={`absolute -top-8 ${flip ? "right-0 md:right-2" : "left-0 md:left-2"} text-[100px] md:text-[140px] leading-none font-bold text-transparent pointer-events-none select-none font-[family-name:var(--font-space-grotesk)]`}
                  style={{ WebkitTextStroke: "1px var(--color-border)" }}
                >
                  {project.number}
                </div>

                <div
                  className={`grid md:grid-cols-2 gap-6 md:gap-10 items-stretch relative z-10`}
                >
                  {/* CODE PREVIEW PANEL */}
                  <div className={`${flip ? "md:order-2" : ""}`}>
                    <div className="relative glass-card overflow-hidden h-full">
                      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febd2f]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                        <span className="ml-4 text-xs text-muted-foreground flex items-center gap-1.5">
                          <FileCode className="w-3 h-3" />
                          {project.filename}
                        </span>
                        {project.pinned && (
                          <span className="ml-auto flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            <Pin className="w-2.5 h-2.5" />
                            <span className="tracking-wider font-[family-name:var(--font-space-grotesk)] uppercase">
                              {t("projects.pinned").replace(/[●·\s]/g, "")}
                            </span>
                          </span>
                        )}
                      </div>

                      <div className="p-4 font-mono text-sm">
                        {project.code.map((line, lineIndex) => (
                          <div key={lineIndex} className="leading-6">
                            <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                              {String(lineIndex + 1).padStart(2, "0")}
                            </span>
                            <span className={line.color}>{line.text}</span>
                          </div>
                        ))}
                        <div className="mt-1">
                          <span className="text-muted-foreground/40 mr-4 select-none text-xs">
                            {String(project.code.length + 1).padStart(2, "0")}
                          </span>
                          <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INFO PANEL */}
                  <div className={`${flip ? "md:order-1" : ""} flex flex-col justify-center`}>
                    {/* Kicker line */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs text-secondary tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
                        {project.number} / {project.role}
                      </span>
                      <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Display title */}
                    <h4 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.05] mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech stack as editorial inline list */}
                    <div className="mb-6">
                      <div className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)] mb-2">
                        Stack
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-foreground/90">
                        {project.tech.map((item, i) => (
                          <Fragment key={item}>
                            {i > 0 && (
                              <span className="text-muted-foreground/30 select-none">·</span>
                            )}
                            <span className="hover:text-primary transition-colors cursor-default">
                              {item}
                            </span>
                          </Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Action row — link-style with arrows */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{t("projects.code")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{t("projects.demo")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all" />
                      </a>
                      <Link
                        href={project.caseStudy}
                        className="group/link inline-flex items-center gap-1.5 text-primary font-medium"
                      >
                        <span>{t("projects.caseStudy")}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ── Academic & Personal — Press / Catalog Sheet ─────────── */}
        <SubHeader index="02" label={t("projects.academicHeading")} />

        {/* Catalog meta strip */}
        <div className="flex items-end justify-between mb-2 -mt-2 max-w-2xl">
          <p className="text-sm text-muted-foreground">
            {t("projects.academicSubheading")}
          </p>
        </div>
        <div className="flex items-center justify-between mb-8 pt-4 border-t border-border">
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            Catalog · {String(academicAndPersonal.length).padStart(2, "0")} entries
          </span>
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            Vol. I / 2025–2026
          </span>
        </div>

        <div>
          {academicAndPersonal.map((project, projIdx) => {
            const isLast = projIdx === academicAndPersonal.length - 1
            const isAcademic = project.type === "ACADEMIC"
            return (
              <Link
                key={project.name}
                href={`/projects/${project.slug}`}
                className={`group block relative ${isLast ? "" : "border-b border-border"}`}
              >
                {/* Hover row tint */}
                <div className="absolute inset-0 bg-muted/0 group-hover:bg-muted/30 transition-colors pointer-events-none" />

                <article className="relative grid md:grid-cols-[180px_1fr_260px] gap-6 md:gap-10 py-8 md:py-12 px-2">
                  {/* ── Col 1 · Vertical kicker + giant serial + period ── */}
                  <div className="flex md:flex-col gap-4 md:gap-0 items-baseline md:items-start md:justify-between">
                    <div>
                      <div className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)] mb-1">
                        Released
                      </div>
                      <div
                        className="text-4xl md:text-6xl font-bold leading-none tracking-tight text-transparent font-[family-name:var(--font-space-grotesk)]"
                        style={{ WebkitTextStroke: "1.5px var(--color-foreground)" }}
                      >
                        {project.serial.replace("PROJ-", "")}
                      </div>
                    </div>

                    <div className="md:mt-auto md:pt-6 flex md:block items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)] px-2 py-0.5 rounded-full ${
                          isAcademic
                            ? "text-secondary bg-secondary/10"
                            : "text-primary bg-primary/10"
                        }`}
                      >
                        {!isAcademic && <Sparkles className="w-2.5 h-2.5" />}
                        {project.type}
                      </span>
                      <span className="md:block md:mt-2 text-xs text-muted-foreground/70 font-[family-name:var(--font-space-grotesk)] tracking-wider">
                        {project.period}
                      </span>
                    </div>
                  </div>

                  {/* ── Col 2 · Title + meta + lede ── */}
                  <div className="flex flex-col gap-4 min-w-0">
                    <h4 className="text-2xl md:text-4xl font-bold text-foreground leading-[1.05] tracking-tight group-hover:text-primary transition-colors">
                      {project.name}
                    </h4>

                    <div className="flex items-center gap-3">
                      <span className="inline-block w-6 h-px bg-secondary" />
                      <span className="text-xs md:text-sm text-secondary tracking-wider font-[family-name:var(--font-space-grotesk)]">
                        {project.meta}
                      </span>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed max-w-prose">
                      {project.summary}
                    </p>
                  </div>

                  {/* ── Col 3 · Stack spec + circular CTA ── */}
                  <div className="flex flex-col justify-between gap-6 md:border-l md:border-border md:pl-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
                          Built With
                        </div>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <ul className="space-y-1.5">
                        {project.stack.map((item) => (
                          <li
                            key={item}
                            className="text-sm text-foreground/85 font-mono flex items-center gap-2.5"
                          >
                            <span className="text-muted-foreground/40">/</span>
                            <span className="group-hover:text-primary transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-dashed border-border">
                      <span className="text-[11px] text-foreground/80 tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)] font-medium group-hover:text-primary transition-colors">
                        Read Case
                      </span>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-primary group-hover:bg-primary text-foreground group-hover:text-primary-foreground transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* Catalog footer rule */}
        <div className="mt-2 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            End of catalog
          </span>
          <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase font-[family-name:var(--font-space-grotesk)]">
            ✦
          </span>
        </div>
      </div>
    </section>
  )
}
