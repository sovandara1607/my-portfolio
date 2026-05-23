"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Smartphone,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export interface CaseStudyScreenshot {
  src: string
  alt: string
  caption?: string
}

export interface CaseStudyDesignNote {
  title: string
  body: string
}

export interface CaseStudyLink {
  label: string
  href: string
  external?: boolean
}

interface CaseStudyTemplateProps {
  name: string
  tagline?: string
  course?: string
  platform?: string
  period: string
  stack: readonly string[]
  bullets: readonly string[]
  /** Long-form narrative paragraphs shown above the highlights list */
  overview?: readonly string[]
  /** Screenshot gallery — rendered only if at least one entry */
  screenshots?: readonly CaseStudyScreenshot[]
  /** Design / engineering decisions worth calling out */
  designNotes?: readonly CaseStudyDesignNote[]
  /** External links (GitHub, App Store, demo, etc.) shown in the sidebar */
  links?: readonly CaseStudyLink[]
}

export function CaseStudyTemplate({
  name,
  tagline,
  course,
  platform,
  period,
  stack,
  bullets,
  overview,
  screenshots,
  designNotes,
  links,
}: CaseStudyTemplateProps) {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-background relative">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm sm:text-base">{t("caseStudy.back")}</span>
          </Link>
        </div>
      </nav>

      <div className="relative z-10">
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <Badge variant="outline" className="rounded-full border-border bg-muted">
              {t("caseStudy.label")}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {name}
            </h1>
            {tagline && (
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
                {tagline}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{period}</span>
              </div>
              {course && (
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>{course}</span>
                </div>
              )}
              {platform && (
                <div className="flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" />
                  <span>{platform}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="pb-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {overview && overview.length > 0 && (
                <div className="glass-card p-6">
                  <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                    {t("caseStudy.overview")}
                  </h2>
                  <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {overview.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-card p-6">
                <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                  {t("caseStudy.highlights")}
                </h2>
                <ul className="space-y-3">
                  {bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {designNotes && designNotes.length > 0 && (
                <div className="glass-card p-6">
                  <h2 className="text-sm font-semibold text-foreground mb-5 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
                    <Lightbulb className="h-3.5 w-3.5 text-primary" />
                    Design Notes
                  </h2>
                  <div className="space-y-5">
                    {designNotes.map((note, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-xs text-secondary tracking-widest font-[family-name:var(--font-space-grotesk)] mt-0.5 w-8 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-foreground mb-1">
                            {note.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {note.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {screenshots && screenshots.length > 0 && (
                <div className="glass-card p-6">
                  <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                    Screens
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {screenshots.map((shot, i) => (
                      <figure
                        key={i}
                        className="rounded-xl overflow-hidden border border-border bg-muted/30"
                      >
                        <div className="relative aspect-[9/16] bg-muted">
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        {shot.caption && (
                          <figcaption className="px-4 py-3 text-xs text-muted-foreground border-t border-border">
                            {shot.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                  {t("caseStudy.stack")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stack.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border font-[family-name:var(--font-space-grotesk)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {links && links.length > 0 && (
                <div className="glass-card p-6">
                  <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider font-[family-name:var(--font-space-grotesk)]">
                    Links
                  </h2>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          {...(link.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          className="group flex items-center justify-between gap-2 text-sm text-foreground hover:text-primary transition-colors"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link href="/#projects" className="block">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-border bg-transparent hover:bg-primary/5"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("caseStudy.back")}
                </Button>
              </Link>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
