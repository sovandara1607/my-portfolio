"use client"

export function EdgeMarker() {
  return (
    <>
      {/* Left edge — vertical rotated label */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-4 pointer-events-none">
        <span className="block w-px h-12 bg-border" />
        <span
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Sovandara Rith — Portfolio
        </span>
        <span className="block w-px h-12 bg-border" />
      </div>

      {/* Right edge — version */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-4 pointer-events-none">
        <span className="block w-px h-12 bg-border" />
        <span
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-mono"
          style={{ writingMode: "vertical-rl" }}
        >
          {new Date().getFullYear()} / v01
        </span>
        <span className="block w-px h-12 bg-border" />
      </div>
    </>
  )
}
