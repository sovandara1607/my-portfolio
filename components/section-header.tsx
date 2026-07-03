"use client"

interface SectionHeaderProps {
  index?: string
  kicker: string
  title: string
  align?: "left" | "center"
}

export function SectionHeader({ kicker, title, align = "left" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left"

  return (
    <div className={`flex flex-col ${alignClass} mb-10 md:mb-14`}>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-3">
        {kicker}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.1] max-w-2xl">
        {title}
      </h2>
    </div>
  )
}
