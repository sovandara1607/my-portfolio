import { cldPreview, cldThumbnail } from "./cloudinary-url"

export type ProjectImageType = "logo" | "cover"

export interface ProjectPhoto {
  id: string
  projectKey: string
  imageType: ProjectImageType
  logoUrl: string
  coverUrl: string
  width: number | null
  height: number | null
}

// Shape of a row in the Supabase `project_photos` table.
export interface ProjectPhotoRow {
  id: string
  project_key: string
  image_type: ProjectImageType
  photo_public_id: string
  photo_url: string
  width: number | null
  height: number | null
  created_at: string
}

export function rowToProjectPhoto(row: ProjectPhotoRow): ProjectPhoto {
  return {
    id: row.id,
    projectKey: row.project_key,
    imageType: row.image_type,
    logoUrl: cldThumbnail(row.photo_public_id),
    coverUrl: cldPreview(row.photo_public_id),
    width: row.width,
    height: row.height,
  }
}
