"use client"

import { useLayoutEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import Link from "next/link"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"

export interface WallpaperTile {
  slug: string
  title: string
  gradient: string
  thumbnailUrl?: string
}

export interface WallpapersWallProps {
  title?: string
  subtitle?: ReactNode
  wallpapers: WallpaperTile[]
  totalCount?: number
  columns?: number
  tilt?: number
  perspective?: number
  speed?: number
  height?: number | string
  className?: string
}

interface TooltipState {
  title: string
  left: number
  top: number
}

const GAP = 12

// Repeats tiles until the last row is full, keeping the mosaic rectangular.
function padToGrid(items: WallpaperTile[], columns: number): WallpaperTile[] {
  if (items.length === 0) return items
  const remainder = items.length % columns
  if (remainder === 0) return items
  const fill = columns - remainder
  return items.concat(Array.from({ length: fill }, (_, i) => items[i % items.length]))
}

export function WallpapersWall({
  title,
  subtitle,
  wallpapers,
  totalCount,
  columns = 8,
  tilt = 18,
  perspective = 1100,
  speed = 20,
  height = 280,
  className,
}: WallpapersWallProps) {
  const wallRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [blockHeight, setBlockHeight] = useState(0)

  const tiles = useMemo(() => padToGrid(wallpapers, columns), [wallpapers, columns])
  const count = totalCount ?? wallpapers.length

  // Measure one grid copy's height so the scroll can loop without a seam.
  useLayoutEffect(() => {
    const block = blockRef.current
    if (!block) return
    const measure = () => setBlockHeight(block.offsetHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(block)
    return () => ro.disconnect()
  }, [tiles, columns])

  // Scrolls upward continuously; pauses on tile hover so it stays readable.
  const y = useMotionValue(0)
  useAnimationFrame((_, delta) => {
    if (tooltip || blockHeight === 0) return
    const wrap = blockHeight + GAP
    let next = y.get() - (speed * delta) / 1000
    if (next <= -wrap) next += wrap
    y.set(next)
  })

  const handleEnter = (e: React.MouseEvent<HTMLElement>, tileTitle: string) => {
    const wall = wallRef.current
    if (!wall) return
    const tile = e.currentTarget.getBoundingClientRect()
    const box = wall.getBoundingClientRect()
    setTooltip({
      title: tileTitle,
      left: tile.left - box.left + tile.width / 2,
      top: tile.top - box.top,
    })
  }

  const planeStyle: CSSProperties = {
    transform: `rotateX(${tilt}deg)`,
    transformStyle: "preserve-3d",
  }
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: GAP,
  }

  const renderGrid = (copy: number, ref?: React.Ref<HTMLDivElement>) => (
    <div ref={ref} className="grid w-full" style={gridStyle}>
      {tiles.map((w, i) => (
        <Link
          key={`${copy}-${w.slug}-${i}`}
          href={`/wallpapers/${w.slug}`}
          aria-label={w.title}
          onMouseEnter={(e) => handleEnter(e, w.title)}
          className="group relative block aspect-square outline-none"
        >
          {/* The hit area stays fixed size; only this inner layer scales up, so the
              cursor never falls off the tile mid-hover. */}
          <span className="absolute inset-0 overflow-hidden rounded-[3px] transition-transform duration-300 ease-out group-hover:z-20 group-hover:scale-[1.28] group-focus-visible:z-20 group-focus-visible:scale-[1.28]">
            {w.thumbnailUrl ? (
              <img
                src={w.thumbnailUrl}
                alt={w.title}
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover grayscale brightness-95 transition duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-focus-visible:grayscale-0 group-focus-visible:brightness-100"
              />
            ) : (
              <div
                className="h-full w-full grayscale brightness-95 transition duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-focus-visible:grayscale-0 group-focus-visible:brightness-100"
                style={{ background: w.gradient }}
              />
            )}
            <span className="pointer-events-none absolute inset-0 rounded-[3px] ring-1 ring-inset ring-black/[0.08] transition group-hover:ring-black/30 dark:ring-white/[0.06] dark:group-hover:ring-white/40" />
          </span>
        </Link>
      ))}
    </div>
  )

  return (
    <div className={`w-full ${className ?? ""}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold tracking-tight whitespace-nowrap text-foreground">
                {title}
              </h3>
              <span className="h-px flex-1 bg-border" />
            </div>
          )}
          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle ?? (
              <>
                A rotating wall of <span className="font-semibold text-foreground/80">{count}+</span> wallpapers.
              </>
            )}
          </p>
        </div>
      )}

      <div
        ref={wallRef}
        className="relative mx-auto overflow-hidden rounded-xl"
        style={{ perspective: `${perspective}px`, perspectiveOrigin: "50% 50%", height }}
        onMouseLeave={() => setTooltip(null)}
      >
        <div className="h-full" style={planeStyle}>
          {/* Two stacked, identical copies create the illusion of an infinite loop. */}
          <motion.div className="flex w-full flex-col" style={{ y, gap: GAP }}>
            {renderGrid(0, blockRef)}
            {renderGrid(1)}
          </motion.div>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(130% 95% at 50% 50%, transparent 30%, var(--background) 82%),
              linear-gradient(to bottom, var(--background) 0%, transparent 16%, transparent 84%, var(--background) 100%),
              linear-gradient(to right, var(--background) 0%, transparent 12%, transparent 88%, var(--background) 100%)
            `,
          }}
        />

        {tooltip && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-lg shadow-black/10"
            style={{ left: tooltip.left, top: tooltip.top }}
          >
            {tooltip.title}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-border bg-card" />
          </div>
        )}
      </div>
    </div>
  )
}
