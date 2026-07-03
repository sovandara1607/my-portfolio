import { cldPreview } from "./cloudinary-url"

export interface ExperiencePhoto {
  id: string
  experienceKey: string
  url: string
  width: number | null
  height: number | null
  link: string | null
  sortOrder: number
}

// Shape of a row in the Supabase `experience_photos` table.
export interface ExperiencePhotoRow {
  id: string
  experience_key: string
  photo_public_id: string
  photo_url: string
  width: number | null
  height: number | null
  link: string | null
  sort_order: number
  created_at: string
}

export function rowToExperiencePhoto(row: ExperiencePhotoRow): ExperiencePhoto {
  return {
    id: row.id,
    experienceKey: row.experience_key,
    url: cldPreview(row.photo_public_id),
    width: row.width,
    height: row.height,
    link: row.link,
    sortOrder: row.sort_order,
  }
}
