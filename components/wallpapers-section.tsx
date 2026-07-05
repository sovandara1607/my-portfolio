"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SectionHeader } from "./section-header"
import { WallpapersWall, type WallpaperTile } from "./ui/wallpapers-wall"
import { wallpapers as seedWallpapers, type Wallpaper, type WallpaperCategory } from "@/lib/wallpapers-data"
import { fetchWallpapersClient } from "@/lib/wallpapers-client"

// The wall is a decorative mosaic, not the browsable grid — cycle the small
// seed/live list a few times so the scroll has enough rows to feel alive.
function toWallTiles(list: Wallpaper[], minCount = 24): WallpaperTile[] {
  if (list.length === 0) return []
  const reps = Math.max(1, Math.ceil(minCount / list.length))
  return Array.from({ length: reps * list.length }, (_, i) => {
    const w = list[i % list.length]
    return { slug: w.slug, title: w.title, gradient: w.gradient, thumbnailUrl: w.thumbnailUrl }
  })
}

type FilterCategory = "all" | WallpaperCategory

const categoryLabels: Record<FilterCategory, string> = {
  all: "All",
  abstract: "Abstract",
  typography: "Typography",
}

function WallpaperCard({ wallpaper, index }: { wallpaper: Wallpaper; index: number }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/wallpapers/${wallpaper.slug}`} className="group block">
        {/* Preview — real image when uploaded, gradient otherwise */}
        <div className="relative overflow-hidden rounded-xl aspect-video mb-3 bg-muted">
          {wallpaper.thumbnailUrl ? (
            <>
              {/* Shimmer placeholder until the image decodes */}
              {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={wallpaper.thumbnailUrl}
                alt={wallpaper.title}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ background: wallpaper.gradient }}
            />
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-end justify-between p-3.5">
            {/* Resolution pills — bottom left */}
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              {wallpaper.resolutions.map((r) => (
                <span
                  key={r.label}
                  className="text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md tracking-wider"
                >
                  {r.label}
                </span>
              ))}
            </div>

            {/* Arrow icon — bottom right */}
            <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
              <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Card Meta */}
        <div className="flex items-start justify-between gap-3 px-0.5">
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
              {wallpaper.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-[family-name:var(--font-space-grotesk)]">
                {wallpaper.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-border inline-block" />
              <span className="text-[11px] text-muted-foreground font-mono tabular-nums">
                {wallpaper.year}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground/60 tabular-nums mt-0.5 shrink-0">
            {wallpaper.resolutions[0].dimensions}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

function WallpaperCardSkeleton() {
  return (
    <div>
      <div className="relative overflow-hidden rounded-xl aspect-video mb-3 skeleton-shimmer" />
      <div className="flex items-start justify-between gap-3 px-0.5">
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 rounded skeleton-shimmer" />
          <div className="h-2.5 w-20 rounded skeleton-shimmer" />
        </div>
        <div className="h-2 w-14 rounded skeleton-shimmer mt-1" />
      </div>
    </div>
  )
}

export function WallpapersSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all")
  // null = still loading; otherwise live DB data, falling back to the seed.
  const [items, setItems] = useState<Wallpaper[] | null>(null)

  useEffect(() => {
    let active = true
    fetchWallpapersClient().then((data) => {
      if (active) setItems(data ?? seedWallpapers)
    })
    return () => {
      active = false
    }
  }, [])

  const loading = items === null
  const list = items ?? []
  const filtered =
    activeFilter === "all" ? list : list.filter((w) => w.category === activeFilter)
  const wallTiles = useMemo(() => toWallTiles(list), [list])

  return (
    <section id="wallpapers" className="py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader kicker="Collection" title="Wallpapers." />

        {!loading && wallTiles.length > 0 && (
          <WallpapersWall wallpapers={wallTiles} totalCount={list.length} className="mb-10 md:mb-12" />
        )}

        {/* Category Filter */}
        <div className="flex items-center gap-1 mb-10 md:mb-12">
          {(["all", "abstract", "typography"] as FilterCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`
                px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-all duration-200
                font-[family-name:var(--font-space-grotesk)]
                ${
                  activeFilter === cat
                    ? "bg-foreground text-background"
                    : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }
              `}
            >
              {categoryLabels[cat]}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono text-muted-foreground/50 tabular-nums">
            {loading ? (
              <span className="inline-block h-2 w-6 rounded skeleton-shimmer align-middle" />
            ) : (
              filtered.length.toString().padStart(2, "0")
            )}
          </span>
        </div>

        {/* Wallpaper Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <WallpaperCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filtered.map((wallpaper, i) => (
                <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
