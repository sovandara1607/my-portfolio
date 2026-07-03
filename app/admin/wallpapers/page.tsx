"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2, LogOut, Trash2, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin/admin-nav"
import { ImageUploader, type UploadedImage } from "@/components/admin/image-uploader"
import { fetchWallpapersClient } from "@/lib/wallpapers-client"
import type { Wallpaper, WallpaperCategory } from "@/lib/wallpapers-data"

const cloudinaryConfigured = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

export default function AdminWallpapersPage() {
  const [list, setList] = useState<Wallpaper[]>([])
  const [loadingList, setLoadingList] = useState(true)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<WallpaperCategory>("abstract")
  const [tags, setTags] = useState("")
  const [year, setYear] = useState(new Date().getFullYear())
  const [accentColor, setAccentColor] = useState("#f38020")
  const [image, setImage] = useState<UploadedImage | null>(null)

  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

  const refreshList = useCallback(async () => {
    setLoadingList(true)
    const data = await fetchWallpapersClient()
    setList(data ?? [])
    setLoadingList(false)
  }, [])

  useEffect(() => {
    refreshList()
  }, [refreshList])

  function resetForm() {
    setTitle("")
    setDescription("")
    setCategory("abstract")
    setTags("")
    setYear(new Date().getFullYear())
    setAccentColor("#f38020")
    setImage(null)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setFeedback(null)

    if (!image) {
      setFeedback({ type: "err", msg: "Upload an image first." })
      return
    }

    setSaving(true)
    const res = await fetch("/api/admin/wallpapers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        category,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        year,
        accentColor,
        imagePublicId: image.publicId,
        imageUrl: image.url,
        width: image.width,
        height: image.height,
      }),
    })
    setSaving(false)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setFeedback({ type: "err", msg: data.error || "Failed to save wallpaper." })
      return
    }

    setFeedback({ type: "ok", msg: "Wallpaper published." })
    resetForm()
    refreshList()
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this wallpaper? This also removes the image from Cloudinary.")) return
    const res = await fetch(`/api/admin/wallpapers?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      setList((prev) => prev.filter((w) => w.id !== id))
    } else {
      setFeedback({ type: "err", msg: "Failed to delete." })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
              Admin
            </p>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Wallpaper Studio</h1>
          </div>
          <div className="flex items-center gap-3">
            <AdminNav />
            <form action="/auth/signout" method="post">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="rounded-none border-border hover:border-primary/40 gap-2 text-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_1fr] gap-10">
        {/* Upload form */}
        <section>
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="text-xs font-bold text-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
              New Wallpaper
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {!cloudinaryConfigured && (
            <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2 mb-5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Cloudinary isn&apos;t configured. Add your env vars to enable uploads.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            {/* Image uploader */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-[family-name:var(--font-space-grotesk)]">
                Image
              </label>
              {image ? (
                <div className="relative group rounded-xl overflow-hidden aspect-video border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Replace
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                    {image.width}×{image.height}
                  </div>
                </div>
              ) : (
                <ImageUploader onUploaded={setImage} disabled={!cloudinaryConfigured} />
              )}
            </div>

            <Field label="Title">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder="Auroral Gradient"
              />
            </Field>

            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`${inputClass} resize-none py-2`}
                placeholder="A warm sweep of amber and cream…"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as WallpaperCategory)}
                  className={inputClass}
                >
                  <option value="abstract">Abstract</option>
                  <option value="typography">Typography</option>
                </select>
              </Field>
              <Field label="Year">
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Tags (comma separated)">
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={inputClass}
                placeholder="gradient, warm, minimal"
              />
            </Field>

            <Field label="Accent Color">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-md border border-border bg-transparent cursor-pointer"
                />
                <input
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className={`${inputClass} font-mono`}
                />
              </div>
            </Field>

            {feedback && (
              <p
                className={`flex items-center gap-2 text-xs rounded-md px-3 py-2 ${
                  feedback.type === "ok"
                    ? "text-secondary bg-secondary/10 border border-secondary/20"
                    : "text-destructive bg-destructive/10 border border-destructive/20"
                }`}
              >
                {feedback.type === "ok" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {feedback.msg}
              </p>
            )}

            <Button
              type="submit"
              disabled={saving}
              className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-[family-name:var(--font-space-grotesk)] text-xs tracking-wider uppercase"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Wallpaper"}
            </Button>
          </form>
        </section>

        {/* Existing list */}
        <section>
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="text-xs font-bold text-foreground tracking-[0.25em] uppercase font-[family-name:var(--font-space-grotesk)]">
              Published
            </h2>
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-mono text-muted-foreground/50 tabular-nums">
              {list.length.toString().padStart(2, "0")}
            </span>
          </div>

          {loadingList ? (
            <ul className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex items-center gap-3 glass-card p-2.5">
                  <div className="w-16 h-10 rounded-md shrink-0 skeleton-shimmer" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="h-3 w-32 rounded skeleton-shimmer" />
                    <div className="h-2.5 w-20 rounded skeleton-shimmer" />
                  </div>
                </li>
              ))}
            </ul>
          ) : list.length === 0 ? (
            <p className="text-sm text-muted-foreground py-16 text-center">
              No wallpapers yet. Upload your first one.
            </p>
          ) : (
            <ul className="space-y-3">
              {list.map((w) => (
                <li
                  key={w.id}
                  className="flex items-center gap-3 glass-card p-2.5 group"
                >
                  <div
                    className="w-16 h-10 rounded-md overflow-hidden shrink-0 bg-muted"
                    style={!w.thumbnailUrl ? { background: w.gradient } : undefined}
                  >
                    {w.thumbnailUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={w.thumbnailUrl}
                        alt={w.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{w.title}</p>
                    <p className="text-[11px] text-muted-foreground capitalize">
                      {w.category} · {w.year}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(w.id)}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    aria-label={`Delete ${w.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

const inputClass =
  "w-full h-10 px-3 bg-background/50 border border-border rounded-md text-sm text-foreground outline-none focus:border-primary/50 transition-colors"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2 font-[family-name:var(--font-space-grotesk)]">
        {label}
      </label>
      {children}
    </div>
  )
}
