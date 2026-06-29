import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary-server"
import type { WallpaperCategory } from "@/lib/wallpapers-data"

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

interface CreateBody {
  title: string
  description?: string
  category: WallpaperCategory
  tags?: string[]
  year?: number
  accentColor?: string
  imagePublicId: string
  imageUrl: string
  width?: number
  height?: number
}

// Inserts a new wallpaper row after the image has already been uploaded to
// Cloudinary by the browser. Requires an authenticated admin.
export async function POST(request: Request) {
  const supabase = await createClient()
  if (!supabase) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 503 })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as CreateBody

  if (!body.title || !body.category || !body.imagePublicId || !body.imageUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Build a unique slug (append a short suffix on collision).
  let slug = slugify(body.title)
  const { data: existing } = await supabase
    .from("wallpapers")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle()
  if (existing) slug = `${slug}-${Date.now().toString(36).slice(-4)}`

  const { data, error } = await supabase
    .from("wallpapers")
    .insert({
      slug,
      title: body.title,
      description: body.description ?? "",
      category: body.category,
      tags: body.tags ?? [],
      year: body.year ?? new Date().getFullYear(),
      accent_color: body.accentColor ?? "#f38020",
      image_public_id: body.imagePublicId,
      image_url: body.imageUrl,
      width: body.width ?? null,
      height: body.height ?? null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ wallpaper: data }, { status: 201 })
}

// Deletes a wallpaper row and its Cloudinary asset.
export async function DELETE(request: Request) {
  const supabase = await createClient()
  if (!supabase) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 503 })
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  // Look up the asset so we can remove it from Cloudinary too.
  const { data: row } = await supabase
    .from("wallpapers")
    .select("image_public_id")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("wallpapers").delete().eq("id", id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (row?.image_public_id && isCloudinaryConfigured) {
    try {
      await cloudinary.uploader.destroy(row.image_public_id)
    } catch (err) {
      console.error("[wallpapers] Cloudinary destroy failed:", err)
    }
  }

  return NextResponse.json({ ok: true })
}
