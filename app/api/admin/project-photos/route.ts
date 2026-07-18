import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary-server"
import type { ProjectImageType } from "@/lib/project-photos-data"

interface UpsertBody {
  projectKey: string
  imageType: ProjectImageType
  photoPublicId: string
  photoUrl: string
  width?: number
  height?: number
}

// Replaces the photo for one project (keyed by lib/project-catalog.ts's
// static keys). One photo per project — re-uploading replaces the previous
// Cloudinary asset. Requires an authenticated admin.
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

  const body = (await request.json()) as UpsertBody

  if (!body.projectKey || !body.imageType || !body.photoPublicId || !body.photoUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data: existing } = await supabase
    .from("project_photos")
    .select("photo_public_id")
    .eq("project_key", body.projectKey)
    .maybeSingle()

  const { data, error } = await supabase
    .from("project_photos")
    .upsert(
      {
        project_key: body.projectKey,
        image_type: body.imageType,
        photo_public_id: body.photoPublicId,
        photo_url: body.photoUrl,
        width: body.width ?? null,
        height: body.height ?? null,
      },
      { onConflict: "project_key" }
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (
    existing?.photo_public_id &&
    existing.photo_public_id !== body.photoPublicId &&
    isCloudinaryConfigured
  ) {
    try {
      await cloudinary.uploader.destroy(existing.photo_public_id)
    } catch (err) {
      console.error("[project-photos] Cloudinary destroy failed:", err)
    }
  }

  return NextResponse.json({ photo: data }, { status: 201 })
}

interface PatchBody {
  id: string
  imageType: ProjectImageType
}

// Toggles logo/cover treatment for an existing photo, no re-upload needed.
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
  if (!body.id || !body.imageType) {
    return NextResponse.json({ error: "Missing id or imageType" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("project_photos")
    .update({ image_type: body.imageType })
    .eq("id", body.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ photo: data })
}

// Removes a project's photo (by row id) and its Cloudinary asset.
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
    .from("project_photos")
    .select("photo_public_id")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("project_photos").delete().eq("id", id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (row?.photo_public_id && isCloudinaryConfigured) {
    try {
      await cloudinary.uploader.destroy(row.photo_public_id)
    } catch (err) {
      console.error("[project-photos] Cloudinary destroy failed:", err)
    }
  }

  return NextResponse.json({ ok: true })
}
