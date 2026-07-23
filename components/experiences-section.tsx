"use client"

import { useEffect, useState } from "react"
import {
  Briefcase,
  GraduationCap,
  School,
  Camera,
  Video,
  Leaf,
  Music,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { SectionHeader } from "./section-header"
import { profile } from "@/lib/profile"
import { fetchExperiencePhotosClient } from "@/lib/experience-photos-client"
import type { ExperiencePhoto } from "@/lib/experience-photos-data"

interface LightboxState {
  photos: ExperiencePhoto[]
  index: number
}

function ExperienceThumbs({
  photos,
  onOpen,
}: {
  photos: ExperiencePhoto[]
  onOpen: (index: number) => void
}) {
  if (photos.length === 1) {
    return (
      <button
        type="button"
        onClick={() => onOpen(0)}
        className="flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-border hover:border-foreground/30 transition-colors"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[0].url} alt="" className="w-full h-full object-cover" />
      </button>
    )
  }

  const shown = photos.slice(0, 4)
  const extra = photos.length - shown.length

  return (
    <div className="flex-shrink-0 w-11 h-11 grid grid-cols-2 gap-0.5">
      {shown.map((photo, i) => (
        <button
          key={photo.id}
          type="button"
          onClick={() => onOpen(i)}
          className="relative rounded-[3px] overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.url} alt="" className="w-full h-full object-cover" />
          {i === shown.length - 1 && extra > 0 && (
            <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[9px] font-semibold">
              +{extra}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

function ExperienceLightbox({
  state,
  onIndexChange,
  onClose,
}: {
  state: LightboxState
  onIndexChange: (index: number) => void
  onClose: () => void
}) {
  const { photos, index } = state
  const photo = photos[index]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onIndexChange((index + 1) % photos.length)
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + photos.length) % photos.length)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [index, photos.length, onIndexChange, onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onIndexChange((index - 1 + photos.length) % photos.length)
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onIndexChange((index + 1) % photos.length)
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-lg"
      />

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        {photo.link && (
          <a
            href={photo.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3.5 py-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View link
          </a>
        )}
        {photos.length > 1 && (
          <div className="text-white/70 text-xs font-mono tabular-nums">
            {index + 1} / {photos.length}
          </div>
        )}
      </div>
    </div>
  )
}

const interestIconMap: Record<string, LucideIcon> = {
  Photography: Camera,
  Videography: Video,
  Nature: Leaf,
  Music: Music,
}

const educationIcons: LucideIcon[] = [GraduationCap, School]

function GroupLabel({ label }: { label: string }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-6">
      {label}
    </h3>
  )
}

export function ExperiencesSection() {
  const { t } = useLanguage()
  const [photos, setPhotos] = useState<Record<string, ExperiencePhoto[]>>({})
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  useEffect(() => {
    fetchExperiencePhotosClient().then(setPhotos)
  }, [])

  return (
    <section id="experiences" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader kicker="Experience" title="What I've done." />

        {/* ── Work ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <GroupLabel label={t("experiences.work")} />

          <div className="space-y-10">
            {profile.experience.map((work) => {
              const list = photos[work.key] ?? []

              const body = (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-1.5">
                      {work.role}
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open link for ${work.role}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </h4>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {work.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {work.org} · {work.subtitle}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {work.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2.5"
                      >
                        <span className="text-muted-foreground/50 mt-[2px]">–</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )

              return (
                <div key={work.key} className="flex gap-4 sm:gap-5">
                  {list.length > 0 ? (
                    <ExperienceThumbs
                      photos={list}
                      onOpen={(index) => setLightbox({ photos: list, index })}
                    />
                  ) : (
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-foreground">
                      <Briefcase className="w-4.5 h-4.5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">{body}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Volunteering ─────────────────────────────────────────── */}
        <div className="mb-16">
          <GroupLabel label={t("experiences.volunteering")} />

          <div className="space-y-10">
            {profile.volunteering.map((role) => (
              <div key={role.key} className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-foreground">
                  <HeartHandshake className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">
                      {role.role}
                    </h4>
                    {role.period && (
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {role.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {role.org} · {role.cause}
                  </p>
                  {role.bullets.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {role.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-relaxed flex gap-2.5"
                        >
                          <span className="text-muted-foreground/50 mt-[2px]">–</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {lightbox && (
          <ExperienceLightbox
            state={lightbox}
            onIndexChange={(index) => setLightbox({ photos: lightbox.photos, index })}
            onClose={() => setLightbox(null)}
          />
        )}

        {/* ── Education ────────────────────────────────────────────── */}
        <div className="mb-16">
          <GroupLabel label={t("experiences.education")} />

          <div className="space-y-8">
            {profile.education.map((edu, i) => {
              const Icon = educationIcons[i] ?? GraduationCap
              const isCurrent = edu.period.toLowerCase().includes("present")
              return (
                <div key={edu.school} className="flex gap-4 sm:gap-5">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-foreground">
                    <Icon className="w-4.5 h-4.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-base sm:text-lg font-semibold text-foreground">
                        {edu.degree}
                      </h4>
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {edu.school}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs ${
                          isCurrent
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCurrent && (
                          <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        )}
                        {edu.note}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Beyond code ──────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
          <div>
            <GroupLabel label={t("experiences.softSkills")} />
            <ul className="space-y-2">
              {profile.softSkills.map((skill) => (
                <li key={skill} className="text-sm text-muted-foreground leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <GroupLabel label={t("experiences.languages")} />
            <ul className="space-y-2">
              {profile.languages.map((lang) => (
                <li key={lang} className="text-sm text-muted-foreground">
                  {lang}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <GroupLabel label={t("experiences.interests")} />
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => {
                const Icon = interestIconMap[interest] ?? Leaf
                return (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                  >
                    <Icon className="w-3 h-3" />
                    {interest}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
