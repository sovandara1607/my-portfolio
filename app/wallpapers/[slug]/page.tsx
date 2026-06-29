import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getWallpaperBySlug, getRelatedWallpapers, getAllWallpapers } from "@/lib/wallpapers"

// Re-generate at most once a minute; new uploads render on demand.
export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const all = await getAllWallpapers()
  return all.map((w) => ({ slug: w.slug }))
}

export default async function WallpaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const wallpaper = await getWallpaperBySlug(slug)

  if (!wallpaper) notFound()

  const related = await getRelatedWallpapers(wallpaper.slug, wallpaper.category)

  return (
    <main className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link
            href="/#wallpapers"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-sm font-[family-name:var(--font-space-grotesk)]">Wallpapers</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground hidden sm:block tabular-nums">
              {wallpaper.resolutions[0].dimensions}
            </span>
            <a href={wallpaper.resolutions[0].downloadPath} download>
              <Button
                size="sm"
                className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-space-grotesk)] text-xs tracking-wider uppercase"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Download
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* Full-Width Hero — real image when uploaded, gradient otherwise.
          The shimmer sits behind the image and shows through until it loads. */}
      <div className="pt-[57px]">
        {wallpaper.imageUrl ? (
          <div className="relative w-full aspect-video max-h-[80vh] skeleton-shimmer overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={wallpaper.imageUrl}
              alt={`${wallpaper.title} wallpaper preview`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            className="w-full aspect-video max-h-[80vh]"
            style={{ background: wallpaper.gradient }}
            aria-label={`${wallpaper.title} wallpaper preview`}
          />
        )}
      </div>

      {/* Detail Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-[1fr_260px] gap-12 md:gap-20">

          {/* Left — Title, Description, Tags, Downloads */}
          <div>
            {/* Kicker */}
            <div className="flex items-baseline gap-2 sm:gap-3 mb-5">
              <span className="text-[10px] sm:text-xs font-mono text-primary tabular-nums tracking-widest">
                [{wallpaper.id}]
              </span>
              <span className="h-px w-8 sm:w-12 bg-border" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
                {wallpaper.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.05] mb-6">
              {wallpaper.title}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-prose mb-8">
              {wallpaper.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10 md:mb-12">
              {wallpaper.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs font-mono rounded-md">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Resolution Downloads */}
            <div>
              <div className="flex items-baseline gap-4 mb-5">
                <h3 className="text-xs font-bold text-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                  Available Resolutions
                </h3>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="flex flex-wrap gap-3">
                {wallpaper.resolutions.map((res) => (
                  <a key={res.label} href={res.downloadPath} download>
                    <Button
                      variant="outline"
                      className="rounded-none border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 group gap-2"
                    >
                      <Download className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      <span className="font-[family-name:var(--font-space-grotesk)] text-xs tracking-wider uppercase">
                        {res.label}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground group-hover:text-primary/70 transition-colors">
                        {res.dimensions}
                      </span>
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Metadata Sidebar */}
          <div className="space-y-8 md:pt-1">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)] mb-2">
                Year
              </p>
              <p className="text-2xl font-bold text-foreground font-mono tabular-nums">
                {wallpaper.year}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)] mb-2">
                Category
              </p>
              <p className="text-sm font-medium text-foreground capitalize">{wallpaper.category}</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)] mb-3">
                Formats
              </p>
              <div className="space-y-2">
                {wallpaper.resolutions.map((res) => (
                  <div key={res.label} className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-foreground">{res.label}</span>
                    <span className="text-muted-foreground font-mono text-xs tabular-nums">
                      {res.dimensions}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)] mb-2">
                Artist
              </p>
              <p className="text-sm font-medium text-foreground">Sovandara Rith</p>
            </div>
          </div>
        </div>

        {/* Related Wallpapers */}
        {related.length > 0 && (
          <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-border">
            <div className="flex items-baseline gap-4 mb-8 md:mb-10">
              <h3 className="text-xs font-bold text-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
                Related Wallpapers
              </h3>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((w) => (
                <Link key={w.id} href={`/wallpapers/${w.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-xl aspect-video mb-3 bg-muted">
                    {w.thumbnailUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={w.thumbnailUrl}
                        alt={w.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{ background: w.gradient }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {w.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono tabular-nums mt-0.5">
                    {w.resolutions[0].dimensions}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
