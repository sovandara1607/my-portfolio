import "server-only"

import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./supabase/config"
import {
  rowToWallpaper,
  wallpapers as seedWallpapers,
  type Wallpaper,
  type WallpaperCategory,
  type WallpaperRow,
} from "./wallpapers-data"

// Public wallpaper reads use a cookie-less anon client (public RLS allows
// SELECT). This keeps the detail pages statically generatable + ISR-cached,
// independent of any user session. When Supabase isn't configured — or a query
// fails — we fall back to the bundled seed data so the site always renders.
function publicClient() {
  if (!isSupabaseConfigured) return null
  return createSupabaseClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  })
}

export async function getAllWallpapers(): Promise<Wallpaper[]> {
  const supabase = publicClient()
  if (!supabase) return seedWallpapers

  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error || !data) {
    console.error("[wallpapers] falling back to seed:", error?.message)
    return seedWallpapers
  }
  if (data.length === 0) return seedWallpapers

  return (data as WallpaperRow[]).map(rowToWallpaper)
}

export async function getWallpaperBySlug(slug: string): Promise<Wallpaper | undefined> {
  const supabase = publicClient()
  if (!supabase) return seedWallpapers.find((w) => w.slug === slug)

  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) {
    console.error("[wallpapers] slug lookup failed:", error.message)
    return seedWallpapers.find((w) => w.slug === slug)
  }
  if (!data) return seedWallpapers.find((w) => w.slug === slug)

  return rowToWallpaper(data as WallpaperRow)
}

export async function getRelatedWallpapers(
  currentSlug: string,
  category: WallpaperCategory,
  limit = 3
): Promise<Wallpaper[]> {
  const all = await getAllWallpapers()
  return all.filter((w) => w.slug !== currentSlug && w.category === category).slice(0, limit)
}
