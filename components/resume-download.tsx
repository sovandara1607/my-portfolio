"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    
    // Simulate download delay for UX
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Create download link
    const link = document.createElement("a")
    link.href = "/resume/Sovandara_Rith_Resume.pdf"
    link.download = "Sovandara_Rith_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setIsDownloading(false)
    setDownloaded(true)
    
    // Reset after 3 seconds
    setTimeout(() => setDownloaded(false), 3000)
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      variant="outline"
      className={`
        relative overflow-hidden border-border text-foreground 
        hover:bg-secondary hover:text-secondary-foreground bg-transparent
        transition-all duration-300 group
        ${downloaded ? "border-green-500 text-green-500" : ""}
      `}
    >
      <span className="relative flex items-center gap-2">
        {isDownloading ? (
          <>
            <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Downloading...
          </>
        ) : downloaded ? (
          <>
            ✓ Downloaded
          </>
        ) : (
          <>
            Download Resume ↓
          </>
        )}
      </span>
    </Button>
  )
}

export function ResumeCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`
        absolute -inset-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 
        rounded-2xl blur-xl transition-opacity duration-500
        ${isHovered ? "opacity-100" : "opacity-0"}
      `} />
      
      <div className="relative bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-6 shadow-[4px_4px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[4px_4px_0_rgba(93,155,53,0.3),0_0_15px_rgba(128,255,32,0.1)] hover:border-primary/40 glow-mc-hover">
        <div className="glass-subtle p-4 -m-4">
          <div className="flex items-start gap-4">
            {/* PDF Preview */}
            <div className="w-12 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-red-400 text-xs font-bold">PDF</span>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Sovandara Rith - Resume</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Full-Stack Developer · Computer Science Student
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <span className="bg-secondary/60 px-2 py-1 rounded">Updated Jan 2026</span>
                <span className="bg-secondary/60 px-2 py-1 rounded">~150 KB</span>
              </div>
              <ResumeDownload />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
