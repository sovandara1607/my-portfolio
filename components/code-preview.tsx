"use client"

import { useEffect, useState } from "react"

const codeLines = [
  { text: "const developer = {", color: "text-primary" },
  { text: '  name: "Sovandara Rith",', color: "text-foreground" },
  { text: '  role: "Full-Stack Developer",', color: "text-foreground" },
  { text: "  skills: [", color: "text-foreground" },
  { text: '    "TypeScript", "React",', color: "text-muted-foreground" },
  { text: '    "Flutter", "Node.js"', color: "text-muted-foreground" },
  { text: "  ],", color: "text-foreground" },
  { text: '  passion: "Building impactful apps",', color: "text-foreground" },
  { text: "  openToWork: true,", color: "text-primary" },
  { text: "};", color: "text-primary" },
]

export function CodePreview() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-xl" />
      <div className="relative bg-card border border-border rounded-xl overflow-hidden glow-cyan">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-4 text-xs text-muted-foreground">developer.ts</span>
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-sm">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                index < visibleLines ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
            >
              <span className="text-muted-foreground mr-4 select-none">{String(index + 1).padStart(2, "0")}</span>
              <span className={line.color}>{line.text}</span>
            </div>
          ))}
          <div className="mt-2">
            <span className="text-muted-foreground mr-4 select-none">
              {String(codeLines.length + 1).padStart(2, "0")}
            </span>
            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
