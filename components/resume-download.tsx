"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, CheckCircle } from "lucide-react"
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
      {/* Animated background */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      
      <span className="relative flex items-center gap-2">
        {isDownloading ? (
          <>
            <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Downloading...
          </>
        ) : downloaded ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            Downloaded!
          </>
        ) : (
          <>
            <Download className="h-4 w-4 group-hover:animate-bounce" />
            Download Resume
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
        absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 
        rounded-2xl blur-xl transition-opacity duration-500
        ${isHovered ? "opacity-100" : "opacity-0"}
      `} />
      
      <div className="relative bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/50 glow-cyan-hover">
        <div className="flex items-start gap-4">
          {/* PDF Icon */}
          <div className="relative">
            <div className="w-16 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg flex items-center justify-center">
              <FileText className="w-8 h-8 text-red-400" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
              PDF
            </span>
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-1">Sovandara Rith - Resume</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Full-Stack Developer · Computer Science Student
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <span className="bg-secondary px-2 py-1 rounded">Updated Jan 2026</span>
              <span className="bg-secondary px-2 py-1 rounded">~150 KB</span>
            </div>
            <ResumeDownload />
          </div>
        </div>
      </div>
    </div>
  )
}
