"use client"

import { useEffect, useState, useRef } from "react"

interface TerminalLine {
  type: "command" | "output" | "info" | "success" | "error"
  text: string
  delay?: number
}

const terminalSequence: TerminalLine[] = [
  { type: "command", text: "whoami", delay: 0 },
  { type: "output", text: "sovandara-rith", delay: 800 },
  { type: "command", text: "cat skills.json", delay: 1500 },
  { type: "output", text: "{", delay: 2000 },
  { type: "output", text: '  "frontend": ["React", "Next.js", "TypeScript"],', delay: 2200 },
  { type: "output", text: '  "mobile": ["React Native", "Flutter", "Expo"],', delay: 2400 },
  { type: "output", text: '  "backend": ["Node.js", "PHP", "Python", "PostgreSQL"],', delay: 2600 },
  { type: "output", text: '  "tools": ["Git", "Docker", "Figma"]', delay: 2800 },
  { type: "output", text: "}", delay: 3000 },
  { type: "command", text: "git log --oneline -3", delay: 3800 },
  { type: "success", text: "a1b2c3d feat: implemented dark mode", delay: 4300 },
  { type: "success", text: "e4f5g6h fix: resolved auth bug", delay: 4500 },
  { type: "success", text: "i7j8k9l chore: updated dependencies", delay: 4700 },
  { type: "command", text: "npm run build", delay: 5500 },
  { type: "info", text: "Creating optimized production build...", delay: 6000 },
  { type: "success", text: "✓ Compiled successfully!", delay: 6800 },
  { type: "success", text: "✓ Ready for deployment", delay: 7200 },
  { type: "command", text: "echo $STATUS", delay: 8000 },
  { type: "success", text: "🚀 Open to new opportunities!", delay: 8500 },
]

export function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([])
  const [currentTyping, setCurrentTyping] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lineIndex >= terminalSequence.length) return

    const currentLine = terminalSequence[lineIndex]
    const delay = lineIndex === 0 ? 500 : (currentLine.delay || 0) - (terminalSequence[lineIndex - 1]?.delay || 0)

    const timer = setTimeout(() => {
      if (currentLine.type === "command") {
        // Type out command character by character
        setIsTyping(true)
        let charIndex = 0
        const typeInterval = setInterval(() => {
          if (charIndex <= currentLine.text.length) {
            setCurrentTyping(currentLine.text.slice(0, charIndex))
            charIndex++
          } else {
            clearInterval(typeInterval)
            setCurrentTyping("")
            setIsTyping(false)
            setVisibleLines((prev) => [...prev, currentLine])
            setLineIndex((prev) => prev + 1)
          }
        }, 50)
      } else {
        setVisibleLines((prev) => [...prev, currentLine])
        setLineIndex((prev) => prev + 1)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [lineIndex])

  useEffect(() => {
    // Auto-scroll to bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleLines, currentTyping])

  const getLineClass = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-primary"
      case "output":
        return "text-foreground"
      case "info":
        return "text-yellow-400"
      case "success":
        return "text-green-400"
      case "error":
        return "text-red-400"
      default:
        return "text-foreground"
    }
  }

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-primary text-sm tracking-wider mb-2">{"// Interactive Terminal"}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Live Development Preview</h2>
        </div>

        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          
          <div className="relative bg-card border border-border rounded-xl overflow-hidden glow-cyan">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="ml-4 text-xs text-muted-foreground">sovandara@portfolio ~ zsh</span>
            </div>

            {/* Terminal Content */}
            <div
              ref={containerRef}
              className="p-4 font-mono text-sm h-72 overflow-y-auto glass-subtle"
            >
              {visibleLines.map((line, index) => (
                <div
                  key={index}
                  className={`mb-1 ${getLineClass(line.type)} animate-fade-in-up`}
                >
                  {line.type === "command" ? (
                    <span>
                      <span className="text-green-400">➜</span>{" "}
                      <span className="text-primary">~</span>{" "}
                      <span className="text-foreground">{line.text}</span>
                    </span>
                  ) : (
                    <span className="pl-4">{line.text}</span>
                  )}
                </div>
              ))}
              
              {/* Current typing line */}
              {isTyping && (
                <div className="mb-1 text-foreground">
                  <span className="text-green-400">➜</span>{" "}
                  <span className="text-primary">~</span>{" "}
                  <span>{currentTyping}</span>
                  <span className="inline-block w-1.5 h-4 bg-primary terminal-cursor ml-0.5" />
                </div>
              )}
              
              {/* Waiting cursor */}
              {!isTyping && lineIndex >= terminalSequence.length && (
                <div className="mb-1 text-foreground">
                  <span className="text-green-400">➜</span>{" "}
                  <span className="text-primary">~</span>{" "}
                  <span className="inline-block w-1.5 h-4 bg-primary terminal-cursor ml-1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
