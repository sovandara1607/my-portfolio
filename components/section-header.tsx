"use client"

interface SectionHeaderProps {
  index: string
  kicker: string
  title: string
  align?: "left" | "center"
}

export function SectionHeader({ index, kicker, title, align = "left" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left"

  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16`}>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-xs font-mono text-primary tabular-nums tracking-widest">
          [{index}]
        </span>
        <span className="h-px w-12 bg-border" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
          {kicker}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.05] max-w-2xl">
        {title}
      </h2>
    </div>
  )
}
