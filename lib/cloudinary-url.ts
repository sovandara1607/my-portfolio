// Pure Cloudinary delivery-URL builders. No SDK, no secrets — safe to use in
// both server and browser code. Only the public cloud name is needed.

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

function base(transform: string, publicId: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`
}

// Small, optimised image for the grid cards.
export function cldThumbnail(publicId: string) {
  return base("c_limit,w_800,f_auto,q_auto", publicId)
}

// Larger optimised image for the detail hero / previews.
export function cldPreview(publicId: string) {
  return base("c_limit,w_1920,f_auto,q_auto", publicId)
}

export interface ResolutionDownload {
  label: string
  dimensions: string
  downloadUrl: string
}

// Standard wallpaper widths offered for download. `c_limit` never upscales and
// never crops, so smaller masters simply expose fewer options.
const PRESETS: { label: string; width: number }[] = [
  { label: "4K", width: 3840 },
  { label: "QHD", width: 2560 },
  { label: "FHD", width: 1920 },
]

// `fl_attachment` forces the browser to download rather than display.
export function buildResolutions(
  publicId: string,
  width?: number | null,
  height?: number | null
): ResolutionDownload[] {
  const w = width ?? 0
  const h = height ?? 0

  const results: ResolutionDownload[] = []

  // Original — always available.
  results.push({
    label: "Original",
    dimensions: w && h ? `${w}×${h}` : "Full size",
    downloadUrl: base("fl_attachment", publicId),
  })

  // Downscaled presets, only when smaller than the master.
  for (const preset of PRESETS) {
    if (!w || preset.width < w) {
      const scaledHeight = w && h ? Math.round((h * preset.width) / w) : 0
      results.push({
        label: preset.label,
        dimensions: scaledHeight ? `${preset.width}×${scaledHeight}` : `${preset.width}w`,
        downloadUrl: base(`c_limit,w_${preset.width},fl_attachment`, publicId),
      })
    }
  }

  return results
}
