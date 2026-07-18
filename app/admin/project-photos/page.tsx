"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2, LogOut, Trash2, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin/admin-nav"
import { ImageUploader, type UploadedImage } from "@/components/admin/image-uploader"
import { fetchProjectPhotosClient } from "@/lib/project-photos-client"
import type { ProjectImageType, ProjectPhoto } from "@/lib/project-photos-data"
import { ALL_PROJECT_ENTRIES } from "@/lib/project-catalog"

const cloudinaryConfigured = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

export default function AdminProjectPhotosPage() {
  const [photos, setPhotos] = useState<Record<string, ProjectPhoto>>({})
  const [loading, setLoading] = useState(true)
  const [pendingType, setPendingType] = useState<Record<string, ProjectImageType>>({})
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [deletingKey, setDeletingKey] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    const data = await fetchProjectPhotosClient()
    setPhotos(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function handleUpload(projectKey: string, image: UploadedImage) {
    setFeedback(null)
    setSavingKey(projectKey)

    const res = await fetch("/api/admin/project-photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectKey,
        imageType: pendingType[projectKey] ?? "logo",
        photoPublicId: image.publicId,
        photoUrl: image.url,
        width: image.width,
        height: image.height,
      }),
    })
    setSavingKey(null)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setFeedback({ type: "err", msg: data.error || "Failed to save photo." })
      return
    }

    setFeedback({ type: "ok", msg: "Photo saved." })
    refresh()
  }

  async function handleTypeChange(photo: ProjectPhoto, imageType: ProjectImageType) {
    setPhotos((prev) => ({ ...prev, [photo.projectKey]: { ...photo, imageType } }))
    const res = await fetch("/api/admin/project-photos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id, imageType }),
    })
    if (!res.ok) {
      setFeedback({ type: "err", msg: "Failed to update image type." })
      refresh()
    }
  }

  async function handleDelete(projectKey: string, photoId: string) {
    if (!confirm("Remove this photo? This also deletes it from Cloudinary.")) return
    setDeletingKey(projectKey)
    const res = await fetch(`/api/admin/project-photos?id=${photoId}`, { method: "DELETE" })
    setDeletingKey(null)

    if (res.ok) {
      setPhotos((prev) => {
        const next = { ...prev }
        delete next[projectKey]
        return next
      })
    } else {
      setFeedback({ type: "err", msg: "Failed to delete." })
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
              Admin
            </p>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Project Photos</h1>
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {!cloudinaryConfigured && (
          <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Cloudinary isn&apos;t configured. Add your env vars to enable uploads.</span>
          </div>
        )}

        {feedback && (
          <p
            className={`flex items-center gap-2 text-xs rounded-md px-3 py-2 mb-6 ${
              feedback.type === "ok"
                ? "text-secondary bg-secondary/10 border border-secondary/20"
                : "text-destructive bg-destructive/10 border border-destructive/20"
            }`}
          >
            {feedback.type === "ok" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {feedback.msg}
          </p>
        )}

        <p className="text-sm text-muted-foreground mb-8">
          One image per project — either a small square logo shown next to the title, or a
          wide cover image shown across the card. Uploads go straight to Cloudinary; the
          homepage picks them up automatically.
        </p>

        <div className="space-y-8">
          {ALL_PROJECT_ENTRIES.map((entry) => {
            const photo = photos[entry.key]
            const type = photo?.imageType ?? pendingType[entry.key] ?? "logo"

            return (
              <div key={entry.key} className="glass-card p-5">
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h2 className="text-sm font-semibold text-foreground">{entry.title}</h2>
                  <span className="text-[11px] font-mono text-muted-foreground/50 shrink-0">
                    {entry.key}
                  </span>
                </div>

                {loading ? (
                  <div className="w-full aspect-video rounded-xl skeleton-shimmer" />
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 mb-3">
                      {(["logo", "cover"] as ProjectImageType[]).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            photo
                              ? handleTypeChange(photo, option)
                              : setPendingType((prev) => ({ ...prev, [entry.key]: option }))
                          }
                          className={`rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-colors ${
                            type === option
                              ? "bg-foreground text-background"
                              : "bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {photo && (
                      <div className="relative group mb-4 rounded-xl overflow-hidden border border-border">
                        <div
                          className={photo.imageType === "logo" ? "w-16 aspect-square" : "w-full aspect-video"}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={photo.imageType === "logo" ? photo.logoUrl : photo.coverUrl}
                            alt={entry.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDelete(entry.key, photo.id)}
                          disabled={deletingKey === entry.key}
                          aria-label="Remove photo"
                          className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100"
                        >
                          {deletingKey === entry.key ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                    <ImageUploader
                      onUploaded={(img) => handleUpload(entry.key, img)}
                      disabled={!cloudinaryConfigured || savingKey === entry.key}
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
