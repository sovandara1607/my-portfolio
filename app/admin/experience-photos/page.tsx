"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2, LogOut, Trash2, Check, AlertCircle, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin/admin-nav"
import { ImageUploader, type UploadedImage } from "@/components/admin/image-uploader"
import { fetchExperiencePhotosClient } from "@/lib/experience-photos-client"
import type { ExperiencePhoto } from "@/lib/experience-photos-data"
import { profile } from "@/lib/profile"

const cloudinaryConfigured = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)

export default function AdminExperiencePhotosPage() {
  const [photos, setPhotos] = useState<Record<string, ExperiencePhoto[]>>({})
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [savingLinkId, setSavingLinkId] = useState<string | null>(null)
  const [linkDrafts, setLinkDrafts] = useState<Record<string, string>>({})
  const [feedback, setFeedback] = useState<{ type: "ok" | "err"; msg: string } | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    const data = await fetchExperiencePhotosClient()
    setPhotos(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function handleUpload(experienceKey: string, image: UploadedImage) {
    setFeedback(null)
    setSavingKey(experienceKey)

    const res = await fetch("/api/admin/experience-photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experienceKey,
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

    setFeedback({ type: "ok", msg: "Photo added." })
    refresh()
  }

  async function handleSaveLink(photoId: string, link: string) {
    setSavingLinkId(photoId)
    const res = await fetch("/api/admin/experience-photos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photoId, link: link.trim() || null }),
    })
    setSavingLinkId(null)

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setFeedback({ type: "err", msg: data.error || "Failed to save link." })
      return
    }

    setPhotos((prev) => {
      const next: Record<string, ExperiencePhoto[]> = {}
      for (const [key, list] of Object.entries(prev)) {
        next[key] = list.map((p) => (p.id === photoId ? { ...p, link: link.trim() || null } : p))
      }
      return next
    })
  }

  async function handleDelete(photoId: string) {
    if (!confirm("Remove this photo? This also deletes it from Cloudinary.")) return
    setDeletingId(photoId)
    const res = await fetch(`/api/admin/experience-photos?id=${photoId}`, { method: "DELETE" })
    setDeletingId(null)

    if (res.ok) {
      setPhotos((prev) => {
        const next: Record<string, ExperiencePhoto[]> = {}
        for (const [key, list] of Object.entries(prev)) {
          next[key] = list.filter((p) => p.id !== photoId)
        }
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
            <h1 className="text-lg font-bold text-foreground tracking-tight">Experience Photos</h1>
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
          Add as many photos as you like per experience entry. Uploads go straight to
          Cloudinary; the homepage picks them up automatically.
        </p>

        <div className="space-y-8">
          {profile.experience.map((work) => {
            const list = photos[work.key] ?? []
            return (
              <div key={work.key} className="glass-card p-5">
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">{work.role}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{work.org}</p>
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground/50 tabular-nums shrink-0">
                    {list.length} photo{list.length === 1 ? "" : "s"}
                  </span>
                </div>

                {loading ? (
                  <div className="w-full aspect-video rounded-xl skeleton-shimmer" />
                ) : (
                  <>
                    {list.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                        {list.map((photo) => {
                          const draft = linkDrafts[photo.id] ?? photo.link ?? ""
                          return (
                            <div key={photo.id} className="space-y-1.5">
                              <div className="relative group rounded-xl overflow-hidden aspect-video border border-border">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={photo.url}
                                  alt={work.role}
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleDelete(photo.id)}
                                  disabled={deletingId === photo.id}
                                  aria-label="Remove photo"
                                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100"
                                >
                                  {deletingId === photo.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Link2 className="w-3 h-3 text-muted-foreground shrink-0" />
                                <input
                                  value={draft}
                                  onChange={(e) =>
                                    setLinkDrafts((prev) => ({ ...prev, [photo.id]: e.target.value }))
                                  }
                                  onBlur={() => {
                                    if (draft !== (photo.link ?? "")) handleSaveLink(photo.id, draft)
                                  }}
                                  placeholder="Link (optional)"
                                  className="w-full h-7 px-1.5 bg-background/50 border border-border rounded text-[11px] text-foreground outline-none focus:border-primary/50 transition-colors"
                                />
                                {savingLinkId === photo.id && (
                                  <Loader2 className="w-3 h-3 animate-spin text-muted-foreground shrink-0" />
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    <ImageUploader
                      onUploaded={(img) => handleUpload(work.key, img)}
                      disabled={!cloudinaryConfigured || savingKey === work.key}
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
