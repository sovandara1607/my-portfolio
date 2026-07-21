"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

/**
 * Applies theme-dependent color/opacity to an already-built scene, so
 * switching theme never needs to tear down and recreate the WebGL context —
 * that's the single most expensive thing this component could do per click.
 */
function applyGridTheme(isDark: boolean, material: THREE.MeshBasicMaterial) {
  material.color.setHex(isDark ? 0xf5f5f5 : 0x171717)
  material.opacity = isDark ? 0.16 : 0.14
}

/**
 * Abstract 3D wireframe horizon, scoped to the hero section.
 * A tilted, undulating wireframe plane rendered with three.js — reads as a
 * stylized landscape rolling away from the viewer. Monochrome (uses
 * --foreground) to stay inside the site's minimal palette; a CSS mask fades
 * it out at the edges so the hero text stays crisp. No-ops entirely under
 * prefers-reduced-motion or when WebGL is unavailable.
 */
export function HeroWireframeGrid() {
  const mountRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const applyThemeRef = useRef<(isDark: boolean) => void>(() => {})

  useEffect(() => {
    applyThemeRef.current(resolvedTheme === "dark")
  }, [resolvedTheme])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return
    }

    let disposed = false
    let rafId = 0

    const isDark = resolvedTheme === "dark"
    const lineColor = isDark ? 0xf5f5f5 : 0x171717

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50)
    camera.position.set(0, 1.5, 3.2)
    camera.lookAt(0, -0.4, -8)

    const WIDTH = 20
    const DEPTH = 32
    const SEG_W = 42
    const SEG_D = 64
    const geometry = new THREE.PlaneGeometry(WIDTH, DEPTH, SEG_W, SEG_D)
    const material = new THREE.MeshBasicMaterial({
      color: lineColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.16 : 0.14,
    })
    const grid = new THREE.Mesh(geometry, material)
    grid.rotation.x = -Math.PI / 2
    grid.position.set(0, -1.2, -DEPTH / 2 + 2)
    scene.add(grid)

    const pos = geometry.attributes.position as THREE.BufferAttribute
    const baseX = new Float32Array(pos.count)
    const baseY = new Float32Array(pos.count)
    for (let i = 0; i < pos.count; i++) {
      baseX[i] = pos.getX(i)
      baseY[i] = pos.getY(i)
    }

    function wave(t: number) {
      for (let i = 0; i < pos.count; i++) {
        const x = baseX[i]
        const y = baseY[i]
        const z =
          Math.sin(x * 0.35 + t * 0.5) * 0.22 +
          Math.sin(y * 0.22 - t * 0.35) * 0.16 +
          Math.sin((x + y) * 0.12 + t * 0.22) * 0.1
        pos.setZ(i, z)
      }
      pos.needsUpdate = true
    }
    wave(0)

    function fit() {
      const w = mount!.clientWidth
      const h = mount!.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)
    fit()

    const resizeObserver = new ResizeObserver(fit)
    resizeObserver.observe(mount)

    applyThemeRef.current = (nextIsDark) => applyGridTheme(nextIsDark, material)

    let visible = true

    const start = performance.now()
    function frame() {
      if (disposed || !visible) {
        rafId = 0
        return
      }
      const t = (performance.now() - start) / 1000
      wave(t)
      camera.position.y = 1.5 + Math.sin(t * 0.15) * 0.05
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      renderer.render(scene, camera)
    } else {
      rafId = requestAnimationFrame(frame)
    }

    // Scrolled off-screen for the rest of the session otherwise — this
    // scene would keep recomputing every vertex every frame forever.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !reduceMotion && rafId === 0) {
          rafId = requestAnimationFrame(frame)
        }
      },
      { threshold: 0 }
    )
    visibilityObserver.observe(mount)

    return () => {
      disposed = true
      applyThemeRef.current = () => {}
      cancelAnimationFrame(rafId)
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
    // Deliberately mount-only: rebuilding the WebGL context on every theme
    // change is the single most expensive thing this component could do.
    // Color updates are handled by the applyThemeRef effect above instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_85%_65%_at_50%_40%,black_35%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_85%_65%_at_50%_40%,black_35%,transparent_100%)]"
    />
  )
}
