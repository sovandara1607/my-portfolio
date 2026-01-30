"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function FloorTilesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = -1000
    let mouseY = -1000

    const isDark = resolvedTheme === "dark"
    
    // Simple consistent colors for the grid
    // Light mode: very subtle grid on white background
    const gridColor = isDark 
      ? "rgba(93, 155, 53, 0.15)" 
      : "rgba(93, 155, 53, 0.08)"
    const glowColor = "rgba(128, 255, 32, 0.4)"
    const backgroundColor = isDark ? "transparent" : "#ffffff"

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    // Minecraft-style tile settings
    const tileSize = 48

    const draw = () => {
      // Fill with background color first (white in light mode)
      if (!isDark) {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      // Draw simple grid covering the entire screen
      const rows = Math.ceil(canvas.height / tileSize) + 1
      const cols = Math.ceil(canvas.width / tileSize) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * tileSize
          const y = row * tileSize
          const centerX = x + tileSize / 2
          const centerY = y + tileSize / 2

          // Calculate distance from mouse for glow effect
          const dx = centerX - mouseX
          const dy = centerY - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150
          const glowIntensity = Math.max(0, 1 - distance / maxDistance)

          // Draw grid line border only
          ctx.strokeStyle = glowIntensity > 0.1 
            ? `rgba(128, 255, 32, ${0.15 + glowIntensity * 0.4})`
            : gridColor
          ctx.lineWidth = glowIntensity > 0.1 ? 1.5 : 1
          ctx.strokeRect(x + 0.5, y + 0.5, tileSize - 1, tileSize - 1)

          // Add corner dots
          if (glowIntensity > 0.1) {
            const dotSize = 2
            ctx.fillStyle = `rgba(128, 255, 32, ${glowIntensity * 0.5})`
            ctx.fillRect(x, y, dotSize, dotSize)
            ctx.fillRect(x + tileSize - dotSize, y, dotSize, dotSize)
            ctx.fillRect(x, y + tileSize - dotSize, dotSize, dotSize)
            ctx.fillRect(x + tileSize - dotSize, y + tileSize - dotSize, dotSize, dotSize)
          }
        }
      }

      // Subtle floating particles
      const time = Date.now() * 0.001
      for (let i = 0; i < 3; i++) {
        const particleX = (Math.sin(time * 0.5 + i * 2) * 0.4 + 0.5) * canvas.width
        const particleY = ((time * 0.02 + i * 0.33) % 1) * canvas.height
        const particleAlpha = Math.sin((time + i) * 1.5) * 0.02 + 0.025
        
        ctx.fillStyle = `rgba(128, 255, 32, ${particleAlpha})`
        ctx.beginPath()
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
