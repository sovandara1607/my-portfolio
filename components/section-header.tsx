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
    <div className={`flex flex-col ${alignClass} mb-8 md:mb-12`}>
      <div className="flex items-baseline gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
        <span className="text-[10px] sm:text-xs font-mono text-primary tabular-nums tracking-widest">
          [{index}]
        </span>
        <span className="h-px w-8 sm:w-12 bg-border" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
          {kicker}
        </span>
      </div>
      <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.05] max-w-2xl">
        {title}
      </h2>
    </div>
  )
}
