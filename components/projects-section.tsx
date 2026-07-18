"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"
import { OrganicBlobField } from "./ui/organic-blob-field"
import { TiltCard } from "./ui/tilt-card"
import { profile } from "@/lib/profile"
import { CASE_STUDY_SLUGS, FEATURED_PROJECT_KEYS, projectSlugByName } from "@/lib/project-catalog"
import { fetchProjectPhotosClient } from "@/lib/project-photos-client"
import type { ProjectPhoto } from "@/lib/project-photos-data"

function ProjectLogo({ photo, size = "w-11 h-11" }: { photo?: ProjectPhoto; size?: string }) {
  if (!photo || photo.imageType !== "logo") return null
  return (
    <div className={`${size} shrink-0 rounded-xl overflow-hidden border border-border bg-muted`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.logoUrl} alt="" className="w-full h-full object-cover" />
    </div>
  )
}

function ProjectCover({ photo, className = "" }: { photo?: ProjectPhoto; className?: string }) {
  if (!photo || photo.imageType !== "cover") return null
  return (
    <div className={`rounded-xl overflow-hidden border border-border aspect-video ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.coverUrl} alt="" className="w-full h-full object-cover" />
    </div>
  )
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
          ? "bg-sky-400 text-white"
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
          className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function ProjectsSection() {
  const { t } = useLanguage()
  const [photos, setPhotos] = useState<Record<string, ProjectPhoto>>({})

  useEffect(() => {
    fetchProjectPhotosClient().then(setPhotos)
  }, [])

  const featured = [
    {
      key: FEATURED_PROJECT_KEYS.jgdo,
      title: "JgDo",
      description:
        "A lightweight macOS menu bar app for window management with instant snapping with 10+ layouts, a searchable app switcher, clipboard history, and saved workspaces.",
      tech: ["Swift", "SwiftUI"],
      github: "https://github.com/sovandara1607/jgdo-app",
      demo: "https://jgdo.sovandara.lol/",
    },
    {
      key: FEATURED_PROJECT_KEYS.fitnessApp,
      title: t("projects.fitnessTitle"),
      description: t("projects.fitnessDesc"),
      tech: ["React Native", "Expo"],
      github: "https://github.com/sovandara1607/Track-Your-Fitness",
      demo: "https://track-your-fitness-beta.vercel.app/",
      caseStudy: "/projects/fitness-app",
    },
    {
      key: FEATURED_PROJECT_KEYS.handDetector,
      title: "Hand Detector, a Hand Gesture Recognition App",
      description:
        "A fun Python project using MediaPipe and computer vision to detect hand gestures and perform actions like playing music on Spotify.",
      tech: ["Python", "MediaPipe", "OpenCV", "Spotify API"],
      github: "https://github.com/sovandara1607/Hand-Detector",
      demo: "https://youtu.be/dQw4w9WgXcQ",
      caseStudy: "/projects/hand-detector",
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
      photoKey: projectSlugByName[p.name],
      slug: CASE_STUDY_SLUGS.has(projectSlugByName[p.name]) ? projectSlugByName[p.name] : undefined,
      demo: p.demo,
    })),
    ...profile.personalProjects.map((p) => ({
      badge: "Personal",
      title: p.name,
      meta: p.platform,
      period: p.period,
      tech: p.stack as readonly string[],
      description: p.bullets[0],
      photoKey: projectSlugByName[p.name],
      slug: CASE_STUDY_SLUGS.has(projectSlugByName[p.name]) ? projectSlugByName[p.name] : undefined,
      demo: p.demo,
    })),
  ]

  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[640px]">
        <OrganicBlobField />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <SectionHeader
          kicker={t("projects.label").replace(/^\/\/\s*/, "")}
          title={t("projects.title")}
        />

        {/* ── Featured ─────────────────────────────────────────────── */}
        <div className="space-y-10 mb-16">
          {featured.map((project) => {
            const photo = photos[project.key]
            return (
            <TiltCard key={project.title}>
              <article className="group border-l-4 border-sky-400 pl-6 sm:pl-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge tone="featured">Featured</Badge>
                </div>

                <ProjectCover photo={photo} className="mb-5" />

                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <ProjectLogo photo={photo} />
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 max-w-xl">
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
                  {project.caseStudy && (
                    <Link
                      href={project.caseStudy}
                      className="group inline-flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {t("projects.caseStudy")}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </article>
            </TiltCard>
            )
          })}
        </div>

        {/* ── Academic & Personal ──────────────────────────────────── */}
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {t("projects.academicHeading")}
        </h3>
        <p className="text-sm text-muted-foreground mb-8">
          {t("projects.academicSubheading")}
        </p>

        <div className="space-y-8">
          {catalog.map((project) => {
            const isLinked = Boolean(project.slug || project.demo)
            const photo = photos[project.photoKey]
            const inner = (
              <article
                className={`border-l-2 pl-5 sm:pl-6 transition-colors ${
                  isLinked
                    ? "border-border group-hover:border-sky-400"
                    : "border-border"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <Badge>{project.badge}</Badge>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {project.period}
                  </span>
                </div>

                <ProjectCover photo={photo} className="mb-4" />

                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ProjectLogo photo={photo} size="w-9 h-9" />
                    <h4 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                      {project.title}
                    </h4>
                  </div>
                  {isLinked && (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-sky-400" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{project.meta}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {project.description}
                </p>

                <TechPills items={project.tech} />
              </article>
            )

            if (project.slug) {
              return (
                <Link
                  key={project.title}
                  href={`/projects/${project.slug}`}
                  className="block group"
                >
                  <TiltCard>{inner}</TiltCard>
                </Link>
              )
            }

            if (project.demo) {
              return (
                <a
                  key={project.title}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <TiltCard>{inner}</TiltCard>
                </a>
              )
            }

            return (
              <div key={project.title}>
                <TiltCard>{inner}</TiltCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
