"use client"

import { TerminalWindow } from "@/components/terminal-section"

export function TerminalApp() {
  return (
    <div className="h-full bg-background/80">
      <TerminalWindow embedded />
    </div>
  )
}
