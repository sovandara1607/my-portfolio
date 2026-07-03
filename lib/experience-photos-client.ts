"use client"

import { createClient } from "./supabase/client"
import {
  rowToExperiencePhoto,
  type ExperiencePhoto,
  type ExperiencePhotoRow,
} from "./experience-photos-data"

// Browser-side read used by the homepage Experience section. Returns an empty
// map when Supabase isn't configured or the query fails, so entries simply
// render without photos. Each key can have any number of photos, in upload
// order.
export async function fetchExperiencePhotosClient(): Promise<Record<string, ExperiencePhoto[]>> {
  const supabase = createClient()
  if (!supabase) return {}

  const { data, error } = await supabase
    .from("experience_photos")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error || !data) return {}

  const byKey: Record<string, ExperiencePhoto[]> = {}
  for (const row of data as ExperiencePhotoRow[]) {
    const photo = rowToExperiencePhoto(row)
    ;(byKey[photo.experienceKey] ??= []).push(photo)
  }
  return byKey
}
