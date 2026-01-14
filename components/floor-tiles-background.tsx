"use client"

import { useEffect, useRef } from "react"

export function FloorTilesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    // Tile settings
    const tileSize = 60
    const perspective = 800
    const vanishingPointY = canvas.height * 0.4

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      )
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw floor tiles with perspective
      const startY = vanishingPointY
      const rows = 20
      const cols = Math.ceil(canvas.width / tileSize) + 4

      for (let row = 0; row < rows; row++) {
        const y = startY + row * (tileSize * 0.8)
        const scale = 1 + (row / rows) * 2
        const rowWidth = canvas.width * scale
        const startX = (canvas.width - rowWidth) / 2

        for (let col = 0; col < cols * scale; col++) {
          const x = startX + col * tileSize
          const centerX = x + tileSize / 2
          const centerY = y + tileSize / 2

          // Calculate distance from mouse
          const dx = centerX - mouseX
          const dy = centerY - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 300

          // Calculate glow intensity based on distance
          const glowIntensity = Math.max(0, 1 - distance / maxDistance)

          // Draw tile
          ctx.save()
          ctx.translate(centerX, centerY)
          
          // Apply perspective skew
          const skewFactor = (row / rows) * 0.3
          ctx.transform(1, skewFactor, 0, 1 - row * 0.02, 0, 0)

          // Tile border
          const baseAlpha = 0.03 + (row / rows) * 0.02
          const alpha = baseAlpha + glowIntensity * 0.15
          
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`
          ctx.lineWidth = 0.5 + glowIntensity * 1.5
          ctx.strokeRect(-tileSize / 2, -tileSize / 2, tileSize, tileSize)

          // Add glow effect for tiles near mouse
          if (glowIntensity > 0) {
            ctx.fillStyle = `rgba(56, 189, 248, ${glowIntensity * 0.05})`
            ctx.fillRect(-tileSize / 2, -tileSize / 2, tileSize, tileSize)
          }

          // Corner dots
          const dotSize = 1.5 + glowIntensity * 2
          ctx.fillStyle = `rgba(56, 189, 248, ${0.1 + glowIntensity * 0.4})`
          ctx.beginPath()
          ctx.arc(-tileSize / 2, -tileSize / 2, dotSize, 0, Math.PI * 2)
          ctx.fill()

          ctx.restore()
        }
      }

      // Add scan line effect
      const time = Date.now() * 0.001
      const scanLineY = ((time * 50) % canvas.height)
      ctx.fillStyle = "rgba(56, 189, 248, 0.03)"
      ctx.fillRect(0, scanLineY, canvas.width, 2)

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
