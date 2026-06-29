"use client"

import { createClient } from "./supabase/client"
import { rowToWallpaper, type Wallpaper, type WallpaperRow } from "./wallpapers-data"

// Browser-side wallpaper read used by the homepage section. Returns null when
// Supabase isn't configured or the query fails, so the caller keeps its static
// seed data.
export async function fetchWallpapersClient(): Promise<Wallpaper[] | null> {
  const supabase = createClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error || !data || data.length === 0) return null

  return (data as WallpaperRow[]).map(rowToWallpaper)
}
