"use client"

import { useCallback, useRef, useState } from "react"
import { ImagePlus, AlertCircle, Loader2 } from "lucide-react"

export interface UploadedImage {
  publicId: string
  url: string
  width: number
  height: number
}

interface ImageUploaderProps {
  onUploaded: (image: UploadedImage) => void
  disabled?: boolean
}

const MAX_BYTES = 25 * 1024 * 1024 // 25 MB safety cap

// Custom presigned uploader: fetches a signature from our API, then streams the
// file straight to Cloudinary with an XHR so we get real upload progress.
export function ImageUploader({ onUploaded, disabled }: ImageUploaderProps) {
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const uploading = progress !== null

  const upload = useCallback(
    async (file: File) => {
      setError(null)

      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file.")
        return
      }
      if (file.size > MAX_BYTES) {
        setError("That image is over 25 MB.")
        return
      }

      setProgress(0)

      // 1. Get a signature from our auth-gated endpoint.
      let sig: {
        timestamp: number
        signature: string
        folder: string
        apiKey: string
        cloudName: string
      }
      try {
        const res = await fetch("/api/admin/upload-signature", { method: "POST" })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Could not start upload.")
        }
        sig = await res.json()
      } catch (err) {
        setProgress(null)
        setError(err instanceof Error ? err.message : "Could not start upload.")
        return
      }

      // 2. Upload directly to Cloudinary with progress tracking.
      const form = new FormData()
      form.append("file", file)
      form.append("api_key", sig.apiKey)
      form.append("timestamp", String(sig.timestamp))
      form.append("signature", sig.signature)
      form.append("folder", sig.folder)

      const xhr = new XMLHttpRequest()
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100))
        }
      }

      xhr.onload = () => {
        setProgress(null)
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText)
            onUploaded({
              publicId: res.public_id,
              url: res.secure_url,
              width: res.width,
              height: res.height,
            })
          } catch {
            setError("Unexpected response from Cloudinary.")
          }
        } else {
          setError("Upload failed. Please try again.")
        }
      }

      xhr.onerror = () => {
        setProgress(null)
        setError("Network error during upload.")
      }

      xhr.send(form)
    },
    [onUploaded]
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      if (disabled || uploading) return
      const file = e.dataTransfer.files?.[0]
      if (file) upload(file)
    },
    [disabled, uploading, upload]
  )

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) upload(file)
          e.target.value = "" // allow re-selecting the same file
        }}
      />

      <button
        type="button"
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled && !uploading) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`w-full aspect-video rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground disabled:cursor-not-allowed ${
          dragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/40 hover:bg-primary/5"
        } ${disabled ? "opacity-50" : ""}`}
      >
        {uploading ? (
          <div className="w-full max-w-[200px] px-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-foreground tabular-nums">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <ImagePlus className="w-6 h-6" />
            <span className="text-sm">
              {disabled ? "Cloudinary not configured" : "Click or drag an image here"}
            </span>
            {!disabled && (
              <span className="text-[11px] text-muted-foreground/60">
                Direct to Cloudinary · up to 25 MB
              </span>
            )}
          </>
        )}
      </button>

      {error && (
        <p className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2 mt-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
