"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { animate, createTimeline } from "animejs"

/**
 * Cinematic boot preloader — galekto.com-style TV loader, upgraded to 3D.
 *
 * A CRT television modeled in three.js; its screen is a live CanvasTexture
 * showing (1) SMPTE color bars + static + glitch bursts with a
 * "PORTFOLIO LOADING" progress panel, (2) a fake BIOS boot sequence,
 * (3) a CRT power-off collapse — then the page blinks in like a CRT
 * warming up. anime.js drives the entrance, shake, and blink reveal.
 *
 * Shown on every visit. Skippable (Space/Esc/click) from the 2nd visit,
 * mirroring galekto's localStorage visit counter. Disabled entirely for
 * prefers-reduced-motion.
 */

const VISIT_KEY = "sovandara_vc"

// ── Timeline (ms) ─────────────────────────────────────────────
const PROGRESS_DONE = 4300 // progress hits 100%
const BIOS_START = 4700
const BIOS_LINE_EVERY = 170
const POWEROFF_HOLD = 500 // pause after last BIOS line
const POWEROFF_DUR = 650

const SMPTE = ["#bfbfbf", "#bfbf00", "#00bfbf", "#00bf00", "#bf00bf", "#bf0000", "#0000bf"]
const SMPTE_BOTTOM = ["#0000bf", "#131313", "#bf00bf", "#131313", "#00bfbf", "#131313", "#bfbfbf"]

const BURST_AT = [600, 1700, 2900, 4000]
const BURST_DUR = 220

const BIOS_LINES = [
  "S O V A N D A R A D R O M E",
  "CREATIVE PORTFOLIO SYSTEM  ■  v2026",
  "",
  "SOVANDARA NEURAL BOOT SEQUENCE v1.3",
  "════════════════════════════════════════",
  "CPU ......... CREATIVITY CORE @ 3.0GHZ [ OK ]",
  "MEM ......... 640K COFFEE BUFFER ...... [ OK ]",
  "GPU ......... IMAGINATION ACCEL ....... [ OK ]",
  "────────────────────────────────────────",
  "LOADING MODULES",
  "NEXT.JS 16 ............................ [ OK ]",
  "REACT 19 .............................. [ OK ]",
  "TAILWIND V4 ........................... [ OK ]",
  "FLUID SIMULATION ...................... [ OK ]",
  "MUSIC PLAYER .......................... [ OK ]",
  "WALLPAPER ARCHIVE ................ [ MOUNTED ]",
  "",
  "BOOT COMPLETE — LAUNCHING PORTFOLIO...",
]

export function TvPreloader({ onComplete }: { onComplete?: () => void } = {}) {
  const [gone, setGone] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLSpanElement>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const overlay = overlayRef.current
    const mount = mountRef.current
    if (!overlay || !mount) return

    const markDone = () => {
      setGone(true)
      onCompleteRef.current?.()
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markDone()
      return
    }

    // ── Visit counter → skip availability (galekto-exact) ─────
    let visits = 0
    try {
      visits = (parseInt(localStorage.getItem(VISIT_KEY) || "0", 10) || 0) + 1
      localStorage.setItem(VISIT_KEY, String(visits))
    } catch {
      visits = 2 // storage blocked — err on the side of allowing skip
    }
    const canSkip = visits >= 2

    const isDark = document.documentElement.classList.contains("dark")

    let disposed = false
    let finished = false
    let rafId = 0
    const timers: ReturnType<typeof setTimeout>[] = []
    const animations: { cancel: () => void }[] = []

    // ══════════════════════════════════════════════════════════
    // Screen canvas (drawn every frame, uploaded as a texture)
    // ══════════════════════════════════════════════════════════
    const SW = 1024
    const SH = 768
    const screen = document.createElement("canvas")
    screen.width = SW
    screen.height = SH
    const ctx = screen.getContext("2d")!

    // Static noise tile, regenerated every few frames
    const noise = document.createElement("canvas")
    noise.width = 128
    noise.height = 96
    const nctx = noise.getContext("2d")!
    function regenNoise() {
      const img = nctx.createImageData(128, 96)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0
        d[i] = d[i + 1] = d[i + 2] = v
        d[i + 3] = 255
      }
      nctx.putImageData(img, 0, 0)
    }
    regenNoise()

    // Scanline pattern
    const scan = document.createElement("canvas")
    scan.width = 4
    scan.height = 4
    const sctx = scan.getContext("2d")!
    sctx.fillStyle = "rgba(0,0,0,0.22)"
    sctx.fillRect(0, 3, 4, 1)
    const scanPattern = ctx.createPattern(scan, "repeat")!

    // Barcode pattern (precomputed random widths)
    const barcode: number[] = []
    for (let x = 0; x < SW;) {
      const w = 2 + Math.floor(Math.random() * 10)
      barcode.push(x, w, Math.random())
      x += w + 2 + Math.floor(Math.random() * 8)
    }

    // Chaos blocks, re-randomized periodically
    let chaos: { x: number; y: number; w: number; h: number; c: number }[] = []
    function regenChaos() {
      chaos = Array.from({ length: 18 }, () => ({
        x: Math.random() * SW,
        y: SH * 0.64 + Math.random() * SH * 0.22,
        w: 8 + Math.random() * 70,
        h: 4 + Math.random() * 22,
        c: Math.random(),
      }))
    }
    regenChaos()
    const chaosTimer = setInterval(regenChaos, 220)

    // Glitch burst state (strip displacement, like galekto)
    const stripOffsets = new Float32Array(SMPTE.length)
    const stripTargets = new Float32Array(SMPTE.length)
    let burstActive = false
    let burstEnd = 0
    let nextBurst = 0

    // Progress (random increments, like galekto's loadTimer)
    let progress = 0
    const progressTimer = setInterval(() => {
      progress += Math.random() > 0.4 ? 2 : 1
      if (progress >= 100) {
        progress = 100
        clearInterval(progressTimer)
      }
    }, PROGRESS_DONE / 66)

    let grainTick = 0
    const start = performance.now()
    let phase: "tv" | "bios" | "poweroff" = "tv"
    let poweroffStart = 0
    let biosShown = 0

    const MONO = '"JetBrains Mono", ui-monospace, monospace'
    const HEAD = '"Space Grotesk", "Epilogue", system-ui, sans-serif'

    function drawTv(elapsed: number) {
      // Bursts
      if (!burstActive && nextBurst < BURST_AT.length && elapsed >= BURST_AT[nextBurst]) {
        burstActive = true
        burstEnd = elapsed + BURST_DUR
        for (let i = 0; i < stripTargets.length; i++) stripTargets[i] = (Math.random() - 0.5) * 90
        shake()
        nextBurst++
      }
      if (burstActive && elapsed >= burstEnd) {
        burstActive = false
        stripOffsets.fill(0)
      }

      ctx.fillStyle = "#0d0d0d"
      ctx.fillRect(0, 0, SW, SH)

      // SMPTE bars (displaced during bursts)
      const barW = SW / SMPTE.length
      const barsH = SH * 0.58
      for (let i = 0; i < SMPTE.length; i++) {
        if (burstActive) {
          stripOffsets[i] += (stripTargets[i] - stripOffsets[i]) * 0.35
          if (Math.random() < 0.18) stripTargets[i] = (Math.random() - 0.5) * 90
        }
        ctx.fillStyle = SMPTE[i]
        ctx.fillRect(i * barW + stripOffsets[i], 0, barW + 1, barsH)
      }
      // Bottom strip
      for (let i = 0; i < SMPTE_BOTTOM.length; i++) {
        ctx.fillStyle = SMPTE_BOTTOM[i]
        ctx.fillRect(i * barW, barsH, barW + 1, SH * 0.08)
      }
      // Barcodes
      for (let i = 0; i < barcode.length; i += 3) {
        ctx.fillStyle = barcode[i + 2] > 0.5 ? "#e8e8e8" : "#1a1a1a"
        ctx.fillRect(barcode[i], SH * 0.66, barcode[i + 1], SH * 0.05)
      }
      // Chaos blocks
      for (const b of chaos) {
        const v = (b.c * 200 + 20) | 0
        ctx.fillStyle = `rgb(${v},${v},${v})`
        ctx.fillRect(b.x, b.y, b.w, b.h)
      }

      // Burst snow
      if (burstActive) {
        ctx.globalAlpha = 0.55
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(noise, 0, 0, SW, SH)
        ctx.globalAlpha = 1
      }

      // Center panel
      const pw = SW * 0.44
      const ph = SH * 0.34
      const px = (SW - pw) / 2
      const py = SH * 0.30
      ctx.fillStyle = "rgba(8,8,8,0.88)"
      ctx.strokeStyle = "rgba(255,255,255,0.25)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(px, py, pw, ph, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = "#f2f2f2"
      ctx.font = `700 ${SH * 0.062}px ${HEAD}`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("PORTFOLIO", SW / 2, py + ph * 0.28)
      ctx.fillText("LOADING", SW / 2, py + ph * 0.50)

      // Segmented progress bar (galekto's repeating-segment fill)
      const bw = pw * 0.72
      const bh = 14
      const bx = SW / 2 - bw / 2
      const by = py + ph * 0.74
      ctx.strokeStyle = "rgba(255,255,255,0.4)"
      ctx.lineWidth = 1
      ctx.strokeRect(bx, by, bw, bh)
      const segN = Math.max(1, Math.floor(bw / 14))
      const segW = bw / segN
      const visN = progress >= 100 ? segN : Math.floor((progress * segN) / 100)
      ctx.fillStyle = "rgba(255,255,255,0.95)"
      for (let i = 0; i < visN; i++) {
        ctx.fillRect(bx + i * segW + 1, by + 2, segW * (10 / 14), bh - 4)
      }
      ctx.fillStyle = "#dcdcdc"
      ctx.font = `600 ${SH * 0.03}px ${MONO}`
      ctx.textAlign = "left"
      ctx.fillText(`${progress}%`, bx + bw + 14, by + bh / 2)
    }

    function drawBios(elapsed: number) {
      ctx.fillStyle = "#060906"
      ctx.fillRect(0, 0, SW, SH)
      biosShown = Math.min(
        BIOS_LINES.length,
        Math.floor((elapsed - BIOS_START) / BIOS_LINE_EVERY)
      )
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      const lh = SH * 0.045
      for (let i = 0; i < biosShown; i++) {
        const line = BIOS_LINES[i]
        if (i === 0) {
          ctx.fillStyle = "#c8ff9e"
          ctx.font = `700 ${SH * 0.05}px ${MONO}`
        } else if (i === BIOS_LINES.length - 1) {
          ctx.fillStyle = "#ffffff"
          ctx.font = `700 ${SH * 0.034}px ${MONO}`
        } else {
          ctx.fillStyle = "#8fdd66"
          ctx.font = `400 ${SH * 0.03}px ${MONO}`
        }
        ctx.fillText(line, SW * 0.07, SH * 0.07 + i * lh + (i > 0 ? lh * 0.4 : 0))
      }
      // Blinking cursor
      if (Math.floor(elapsed / 320) % 2 === 0) {
        ctx.fillStyle = "#8fdd66"
        ctx.fillRect(SW * 0.07, SH * 0.07 + biosShown * lh + lh * 0.4, SW * 0.018, lh * 0.7)
      }
    }

    function drawPoweroff(elapsed: number) {
      const t = Math.min((elapsed - poweroffStart) / POWEROFF_DUR, 1)
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, SW, SH)
      ctx.fillStyle = "#ffffff"
      if (t < 0.15) {
        // flash
        ctx.globalAlpha = 0.9
        ctx.fillRect(0, 0, SW, SH)
        ctx.globalAlpha = 1
      } else if (t < 0.6) {
        // collapse to a horizontal line
        const k = 1 - (t - 0.15) / 0.45
        const h = Math.max(SH * k * k, 4)
        ctx.fillRect(0, (SH - h) / 2, SW, h)
      } else {
        // line shrinks to a dot, then fades
        const k = 1 - (t - 0.6) / 0.4
        const w = Math.max(SW * k, 8)
        ctx.globalAlpha = Math.min(1, k + 0.3)
        ctx.fillRect((SW - w) / 2, SH / 2 - 2, w, 4)
        ctx.globalAlpha = 1
      }
    }

    function drawScreen(elapsed: number) {
      if (phase === "tv") drawTv(elapsed)
      else if (phase === "bios") drawBios(elapsed)
      else drawPoweroff(elapsed)

      if (phase !== "poweroff") {
        // Grain
        grainTick++
        if (grainTick % 4 === 0) regenNoise()
        ctx.globalAlpha = 0.09
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(noise, 0, 0, SW, SH)
        ctx.globalAlpha = 1
        ctx.imageSmoothingEnabled = true
        // Scanlines
        ctx.fillStyle = scanPattern
        ctx.fillRect(0, 0, SW, SH)
      }
      // Vignette
      const vg = ctx.createRadialGradient(SW / 2, SH / 2, SH * 0.35, SW / 2, SH / 2, SH * 0.75)
      vg.addColorStop(0, "rgba(0,0,0,0)")
      vg.addColorStop(1, "rgba(0,0,0,0.5)")
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, SW, SH)
    }

    // ══════════════════════════════════════════════════════════
    // three.js — the CRT television
    // ══════════════════════════════════════════════════════════
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      // No WebGL available — skip the loader entirely
      clearInterval(chaosTimer)
      clearInterval(progressTimer)
      markDone()
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0.15, 8.2)

    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 1.1))
    const key = new THREE.DirectionalLight(0xffffff, isDark ? 1.4 : 1.8)
    key.position.set(3, 4, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x88ccff, 0.5)
    rim.position.set(-4, 2, -3)
    scene.add(rim)

    const tv = new THREE.Group()
    scene.add(tv)

    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []
    function mat(color: number, rough = 0.55) {
      const m = new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.15 })
      materials.push(m)
      return m
    }
    function box(w: number, h: number, d: number, m: THREE.Material) {
      const g = new THREE.BoxGeometry(w, h, d)
      geometries.push(g)
      return new THREE.Mesh(g, m)
    }

    const shellColor = isDark ? 0x2b2b2b : 0xd8d2ca
    const bezelColor = isDark ? 0x1c1c1c : 0xbfb8ae
    const darkDetail = isDark ? 0x141414 : 0x8a8378

    // Body
    const body = box(4.7, 3.6, 2.3, mat(shellColor))
    tv.add(body)
    // Front bezel
    const bezel = box(4.5, 3.4, 0.25, mat(bezelColor, 0.7))
    bezel.position.z = 1.2
    tv.add(bezel)

    // Curved screen with the live canvas texture
    const texture = new THREE.CanvasTexture(screen)
    texture.colorSpace = THREE.SRGBColorSpace
    const screenGeo = new THREE.PlaneGeometry(3.55, 2.65, 32, 24)
    geometries.push(screenGeo)
    {
      const pos = screenGeo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        const nx = pos.getX(i) / (3.55 / 2)
        const ny = pos.getY(i) / (2.65 / 2)
        pos.setZ(i, 0.16 * (1 - nx * nx * 0.55) * (1 - ny * ny * 0.55))
      }
      pos.needsUpdate = true
      screenGeo.computeVertexNormals()
    }
    const screenMat = new THREE.MeshBasicMaterial({ map: texture })
    materials.push(screenMat)
    const screenMesh = new THREE.Mesh(screenGeo, screenMat)
    screenMesh.position.set(-0.25, 0, 1.28)
    screenMesh.scale.setScalar(0.88)
    tv.add(screenMesh)

    // Control column (right side): two knobs + speaker slats
    const knobGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.12, 24)
    geometries.push(knobGeo)
    for (const y of [0.9, 0.45]) {
      const knob = new THREE.Mesh(knobGeo, mat(darkDetail, 0.4))
      knob.rotation.x = Math.PI / 2
      knob.position.set(1.85, y, 1.35)
      tv.add(knob)
    }
    for (let i = 0; i < 5; i++) {
      const slat = box(0.5, 0.045, 0.06, mat(darkDetail))
      slat.position.set(1.85, -0.1 - i * 0.16, 1.34)
      tv.add(slat)
    }

    // Antenna
    const antGeo = new THREE.CylinderGeometry(0.02, 0.035, 1.7, 8)
    geometries.push(antGeo)
    const tipGeo = new THREE.SphereGeometry(0.06, 12, 12)
    geometries.push(tipGeo)
    for (const dir of [-1, 1]) {
      const ant = new THREE.Mesh(antGeo, mat(darkDetail, 0.3))
      ant.position.set(dir * 0.55, 2.5, 0)
      ant.rotation.z = dir * -0.5
      tv.add(ant)
      const tip = new THREE.Mesh(tipGeo, mat(darkDetail, 0.3))
      tip.position.set(dir * (0.55 + Math.sin(0.5) * 0.85), 2.5 + Math.cos(0.5) * 0.85, 0)
      tv.add(tip)
    }

    // Feet
    for (const dir of [-1, 1]) {
      const foot = box(0.5, 0.18, 1.6, mat(darkDetail))
      foot.position.set(dir * 1.7, -1.9, 0)
      tv.add(foot)
    }

    // Fit TV into view — "cover" the viewport (like object-fit: cover) so the
    // TV always fills the screen edge-to-edge instead of floating in empty
    // space, whatever the window's aspect ratio.
    const TV_BOUND_W = 4.9 // body width
    const TV_BOUND_H = 5.3 // feet-to-antenna-tip height
    // The bound box is measured at the TV group's local z=0 plane, but the body's
    // back corners sit ~1.15 units behind that (perspective makes them ~14% larger
    // than the flat estimate), so overscan needs real headroom, not just a hair.
    const OVERSCAN = 0.75
    let baseScale = 1

    function computeFillScale() {
      const aspect = window.innerWidth / window.innerHeight
      const vFovRad = (camera.fov * Math.PI) / 180
      const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z
      const visibleWidth = visibleHeight * aspect
      return Math.max(
        (visibleWidth * OVERSCAN) / TV_BOUND_W,
        (visibleHeight * OVERSCAN) / TV_BOUND_H
      )
    }

    function fit() {
      const aspect = window.innerWidth / window.innerHeight
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      baseScale = computeFillScale()
    }
    fit()
    window.addEventListener("resize", fit)

    // Entrance + shake (anime.js)
    const pose = { scale: 0.55, y: -0.55, shakeX: 0 }
    animations.push(
      animate(pose, {
        scale: 1,
        y: 0,
        duration: 1100,
        ease: "outElastic(1, .6)",
      })
    )
    function shake() {
      animations.push(
        animate(pose, {
          shakeX: [
            { to: 0.09, duration: 30 },
            { to: -0.08, duration: 30 },
            { to: 0.06, duration: 30 },
            { to: -0.05, duration: 40 },
            { to: 0.03, duration: 40 },
            { to: 0, duration: 50 },
          ],
        })
      )
    }

    // ── Finish / reveal ────────────────────────────────────────
    const finish = (skipped: boolean) => {
      if (finished) return
      finished = true
      window.removeEventListener("keydown", onKey)
      overlay.removeEventListener("pointerdown", onTap)

      if (skipped) {
        animations.push(
          animate(overlay, {
            opacity: 0,
            duration: 300,
            ease: "outQuad",
            onComplete: () => markDone(),
          })
        )
        return
      }
      // CRT blink reveal — the page flashes in like a warming tube
      const tl = createTimeline({
        defaults: { duration: 60, ease: "steps(1)" },
        onComplete: () => markDone(),
      })
      tl.add(overlay, { opacity: 0 })
        .add(overlay, { opacity: 1 }, "+=70")
        .add(overlay, { opacity: 0 }, "+=60")
        .add(overlay, { opacity: 1 }, "+=90")
        .add(overlay, { opacity: 0 }, "+=70")
        .add(overlay, { opacity: 0.7 }, "+=140")
        .add(overlay, { opacity: 0 }, "+=90")
        .add(overlay, { opacity: 1 }, "+=200")
        .add(overlay, { opacity: 0, duration: 400, ease: "outQuad" }, "+=120")
      animations.push(tl)
    }

    // Skip (2nd visit onward — galekto behavior)
    const onKey = (e: KeyboardEvent) => {
      if (!canSkip) return
      if (e.key === " " || e.key === "Escape") {
        e.preventDefault()
        finish(true)
      }
    }
    const onTap = () => {
      if (canSkip) finish(true)
    }
    window.addEventListener("keydown", onKey)
    overlay.addEventListener("pointerdown", onTap)
    if (canSkip && hintRef.current) {
      const hint = hintRef.current
      timers.push(
        setTimeout(() => {
          hint.style.opacity = "1"
        }, 1400)
      )
    }

    // Wall-clock master timer — the sequence always completes
    const biosTotal = BIOS_START + BIOS_LINES.length * BIOS_LINE_EVERY + POWEROFF_HOLD
    timers.push(
      setTimeout(() => {
        phase = "bios"
      }, BIOS_START)
    )
    timers.push(
      setTimeout(() => {
        phase = "poweroff"
        poweroffStart = performance.now() - start
      }, biosTotal)
    )
    timers.push(setTimeout(() => finish(false), biosTotal + POWEROFF_DUR + 100))

    // ── Render loop ────────────────────────────────────────────
    function frame() {
      if (disposed) return
      const elapsed = performance.now() - start

      drawScreen(elapsed)
      texture.needsUpdate = true

      const t = elapsed / 1000
      tv.rotation.y = Math.sin(t * 0.5) * 0.09 - 0.04
      tv.rotation.x = Math.sin(t * 0.35) * 0.035
      tv.position.set(pose.shakeX, pose.y, 0)
      tv.scale.setScalar(baseScale * pose.scale)

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      clearInterval(chaosTimer)
      clearInterval(progressTimer)
      timers.forEach(clearTimeout)
      animations.forEach((a) => a.cancel())
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", fit)
      overlay.removeEventListener("pointerdown", onTap)
      texture.dispose()
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  if (gone) return null

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="fixed inset-0 z-[200] bg-background"
    >
      {/* Soft glow behind the TV */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_48%,rgba(56,189,248,0.10),transparent_70%)] dark:bg-[radial-gradient(ellipse_50%_45%_at_50%_48%,rgba(56,189,248,0.07),transparent_70%)]" />
      <div ref={mountRef} className="absolute inset-0" />
      <span
        ref={hintRef}
        className="absolute bottom-8 left-0 right-0 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70 opacity-0 transition-opacity duration-500"
      >
        <span className="hidden sm:inline">Press Space or Esc to skip</span>
        <span className="sm:hidden">Tap to skip</span>
      </span>
    </div>
  )
}
