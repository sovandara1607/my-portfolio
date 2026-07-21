"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

interface Blob {
  mesh: THREE.Mesh
  geometry: THREE.IcosahedronGeometry
  base: Float32Array
  seed: number
  speed: number
  freq: number
  amp: number
  spin: THREE.Vector3
}

function pseudoNoise(x: number, y: number, z: number, t: number, seed: number) {
  return (
    Math.sin(x * 1.4 + t + seed) * 0.5 +
    Math.cos(y * 1.7 - t * 0.8 + seed) * 0.3 +
    Math.sin(z * 1.1 + t * 0.6 + seed) * 0.2
  )
}

/**
 * Applies theme-dependent colors/intensities to an already-built scene, so
 * switching theme never needs to tear down and recreate the WebGL context —
 * that's the single most expensive thing this component could do per click.
 */
function applyBlobTheme(
  isDark: boolean,
  ambient: THREE.AmbientLight,
  key: THREE.DirectionalLight,
  rim: THREE.PointLight,
  blobs: Blob[]
) {
  const surfaceColor = isDark ? 0x3a3a3a : 0xffffff
  ambient.intensity = isDark ? 0.5 : 0.7
  key.intensity = isDark ? 1.1 : 1.4
  rim.intensity = isDark ? 2.2 : 1.6

  const opacities = [isDark ? 0.28 : 0.3, isDark ? 0.24 : 0.26]
  blobs.forEach((blob, i) => {
    if (i === 2) return // accent blob's color/opacity doesn't depend on theme
    const material = blob.mesh.material as THREE.MeshStandardMaterial
    material.color.setHex(surfaceColor)
    material.opacity = opacities[i]
  })
}

/**
 * Soft, lit, slowly breathing blobs — a natural counterpart to the hero's
 * angular wireframe grid, scoped to the top of the Projects section. Each
 * blob is a smooth noise-displaced sphere shaded with real lights (so it
 * reads as a solid volume, not an outline), drifting and pulsing gently.
 * Monochrome with one sky-400 accent blob that also emits a soft glow.
 * No-ops under prefers-reduced-motion or when WebGL is unavailable.
 */
export function OrganicBlobField() {
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
    const surfaceColor = isDark ? 0x3a3a3a : 0xffffff
    const accentColor = 0x38bdf8

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50)
    camera.position.set(0, 0, 11)
    camera.lookAt(0, 0, 0)

    const ambient = new THREE.AmbientLight(0xffffff, isDark ? 0.5 : 0.7)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, isDark ? 1.1 : 1.4)
    key.position.set(4, 5, 6)
    scene.add(key)

    const rim = new THREE.PointLight(accentColor, isDark ? 2.2 : 1.6, 30)
    rim.position.set(-4, -2, 4)
    scene.add(rim)

    const blobConfigs = [
      { radius: 2.2, detail: 4, position: [4.4, 1.1, -3], color: surfaceColor, opacity: isDark ? 0.28 : 0.3, freq: 0.5, amp: 0.16, speed: 0.16, emissive: 0x000000, emissiveIntensity: 0 },
      { radius: 1.4, detail: 4, position: [5.6, -1.4, -1.5], color: surfaceColor, opacity: isDark ? 0.24 : 0.26, freq: 0.6, amp: 0.14, speed: 0.22, emissive: 0x000000, emissiveIntensity: 0 },
      { radius: 0.9, detail: 3, position: [2.6, 1.9, 0.5], color: accentColor, opacity: 0.55, freq: 0.7, amp: 0.18, speed: 0.28, emissive: accentColor, emissiveIntensity: 0.3 },
    ] as const

    const blobs: Blob[] = blobConfigs.map((cfg, i) => {
      const geometry = new THREE.IcosahedronGeometry(cfg.radius, cfg.detail)
      const base = new Float32Array((geometry.attributes.position as THREE.BufferAttribute).array)

      const material = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.45,
        metalness: 0.1,
        transparent: true,
        opacity: cfg.opacity,
        emissive: cfg.emissive,
        emissiveIntensity: cfg.emissiveIntensity,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(cfg.position[0], cfg.position[1], cfg.position[2])
      scene.add(mesh)

      return {
        mesh,
        geometry,
        base,
        seed: i * 13.7,
        speed: cfg.speed,
        freq: cfg.freq,
        amp: cfg.amp,
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.03
        ),
      }
    })

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

    applyThemeRef.current = (nextIsDark) => applyBlobTheme(nextIsDark, ambient, key, rim, blobs)

    function breathe(t: number) {
      for (const blob of blobs) {
        const posAttr = blob.geometry.attributes.position as THREE.BufferAttribute
        const count = posAttr.count
        for (let i = 0; i < count; i++) {
          const bx = blob.base[i * 3]
          const by = blob.base[i * 3 + 1]
          const bz = blob.base[i * 3 + 2]
          const n = pseudoNoise(bx * blob.freq, by * blob.freq, bz * blob.freq, t * blob.speed, blob.seed)
          const scale = 1 + n * blob.amp
          posAttr.setXYZ(i, bx * scale, by * scale, bz * scale)
        }
        posAttr.needsUpdate = true
        blob.geometry.computeVertexNormals()

        blob.mesh.rotation.x += blob.spin.x * 0.02
        blob.mesh.rotation.y += blob.spin.y * 0.02
        blob.mesh.rotation.z += blob.spin.z * 0.02
      }
    }

    let visible = true

    const start = performance.now()
    function frame() {
      if (disposed || !visible) {
        rafId = 0
        return
      }
      const t = (performance.now() - start) / 1000
      breathe(t)
      rim.position.x = -4 + Math.sin(t * 0.2) * 2
      rim.position.y = -2 + Math.cos(t * 0.15) * 1.5
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      renderer.render(scene, camera)
    } else {
      rafId = requestAnimationFrame(frame)
    }

    // Scrolled off-screen (e.g. down at Contact) for the rest of the
    // session otherwise — recomputing displaced geometry + vertex normals
    // for 3 blobs every frame forever is the heaviest loop on the page.
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
      for (const blob of blobs) {
        blob.geometry.dispose()
        ;(blob.mesh.material as THREE.Material).dispose()
      }
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
      className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_65%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_65%,transparent)]"
    />
  )
}
