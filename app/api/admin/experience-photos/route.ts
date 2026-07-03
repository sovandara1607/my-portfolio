import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary-server"

interface CreateBody {
  experienceKey: string
  photoPublicId: string
  photoUrl: string
  width?: number
  height?: number
  link?: string
}

// Appends a new photo to one experience entry (keyed by profile.ts's static
// `key`). Requires an authenticated admin. The image itself is already
// uploaded to Cloudinary by the browser before this is called.
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

  if (!body.experienceKey || !body.photoPublicId || !body.photoUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // New photos go to the end of that entry's gallery.
  const { count } = await supabase
    .from("experience_photos")
    .select("id", { count: "exact", head: true })
    .eq("experience_key", body.experienceKey)

  const { data, error } = await supabase
    .from("experience_photos")
    .insert({
      experience_key: body.experienceKey,
      photo_public_id: body.photoPublicId,
      photo_url: body.photoUrl,
      width: body.width ?? null,
      height: body.height ?? null,
      link: body.link?.trim() || null,
      sort_order: count ?? 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ photo: data }, { status: 201 })
}

interface PatchBody {
  id: string
  link: string | null
}

// Updates the link on an existing photo. Requires an authenticated admin.
export async function PATCH(request: Request) {
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

  const body = (await request.json()) as PatchBody
  if (!body.id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("experience_photos")
    .update({ link: body.link?.trim() || null })
    .eq("id", body.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ photo: data })
}

// Removes a single photo (by row id) and its Cloudinary asset.
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

  const { data: row } = await supabase
    .from("experience_photos")
    .select("photo_public_id")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("experience_photos").delete().eq("id", id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (row?.photo_public_id && isCloudinaryConfigured) {
    try {
      await cloudinary.uploader.destroy(row.photo_public_id)
    } catch (err) {
      console.error("[experience-photos] Cloudinary destroy failed:", err)
    }
  }

  return NextResponse.json({ ok: true })
}
