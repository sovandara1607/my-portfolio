"use client"

import { createClient } from "./supabase/client"
import {
  rowToProjectPhoto,
  type ProjectPhoto,
  type ProjectPhotoRow,
} from "./project-photos-data"

// Browser-side read used by the homepage Projects section. Returns an empty
// map when Supabase isn't configured or the query fails, so cards simply
// render without an image. One photo per project key.
export async function fetchProjectPhotosClient(): Promise<Record<string, ProjectPhoto>> {
  const supabase = createClient()
  if (!supabase) return {}

  const { data, error } = await supabase.from("project_photos").select("*")
  if (error || !data) return {}

  const byKey: Record<string, ProjectPhoto> = {}
  for (const row of data as ProjectPhotoRow[]) {
    const photo = rowToProjectPhoto(row)
    byKey[photo.projectKey] = photo
  }
  return byKey
}
