"use client"

import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"
import { profile } from "@/lib/profile"

const projectSlugByName: Record<string, string> = {
  "Online Resume Builder Platform": "resume-builder",
  "TaskFlow — Task Management Mobile App": "taskflow",
  "MyFinance — Finance Tracking App": "myfinance",
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "featured" | "neutral"
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
        tone === "featured"
          ? "bg-foreground text-background"
          : "bg-muted text-muted-foreground"
      }`}
    >
      {children}
    </span>
  )
}

function TechPills({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function ProjectsSection() {
  const { t } = useLanguage()

  const featured = [
    {
      title: t("projects.fitnessTitle"),
      description: t("projects.fitnessDesc"),
      tech: ["TypeScript", "React Native", "Expo"],
      github: "https://github.com/sovandara1607/Track-Your-Fitness",
      demo: "https://track-your-fitness-beta.vercel.app/",
      caseStudy: "/projects/fitness-app",
    },
    {
      title: "Performative Detector",
      description:
        "A fun Python project using MediaPipe and computer vision to detect when you're holding a cup and plays music on Spotify.",
      tech: ["Python", "MediaPipe", "OpenCV", "Spotify API"],
      github: "https://github.com/sovandara1607/performative_detector",
      demo: "https://youtu.be/dQw4w9WgXcQ",
      caseStudy: "/projects/performative_detector",
    },
  ]

  const catalog = [
    ...profile.academicProjects.map((p) => ({
      badge: "Academic",
      title: p.name,
      meta: p.course,
      period: p.period,
      tech: p.stack as readonly string[],
      description: p.bullets[0],
      slug: projectSlugByName[p.name],
    })),
    ...profile.personalProjects.map((p) => ({
      badge: "Personal",
      title: p.name,
      meta: p.platform,
      period: p.period,
      tech: p.stack as readonly string[],
      description: p.bullets[0],
      slug: projectSlugByName[p.name],
    })),
  ]

  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          kicker={t("projects.label").replace(/^\/\/\s*/, "")}
          title={t("projects.title")}
        />

        {/* ── Featured ─────────────────────────────────────────────── */}
        <div className="space-y-5 mb-14">
          {featured.map((project) => (
            <article key={project.title} className="glass-card p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge tone="featured">Featured</Badge>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="mb-6">
                <TechPills items={project.tech} />
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t("projects.demo")}
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  {t("projects.code")}
                </a>
                <Link
                  href={project.caseStudy}
                  className="group inline-flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors"
                >
                  {t("projects.caseStudy")}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* ── Academic & Personal ──────────────────────────────────── */}
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {t("projects.academicHeading")}
        </h3>
        <p className="text-sm text-muted-foreground mb-8">
          {t("projects.academicSubheading")}
        </p>

        <div className="space-y-5">
          {catalog.map((project) => {
            const inner = (
              <article className="glass-card p-6 sm:p-8 h-full">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <Badge>{project.badge}</Badge>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {project.period}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-foreground tracking-tight mb-1">
                  {project.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-3">{project.meta}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <TechPills items={project.tech} />
                  {project.slug && (
                    <span className="group inline-flex items-center gap-1 text-sm font-medium text-foreground">
                      {t("projects.caseStudy")}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  )}
                </div>
              </article>
            )

            return project.slug ? (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
                className="block group"
              >
                {inner}
              </Link>
            ) : (
              <div key={project.title}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
