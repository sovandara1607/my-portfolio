"use client"

import { useEffect, useRef } from "react"

/**
 * WebGL fluid simulation background.
 * Trimmed port of PavelDoGreat/WebGL-Fluid-Simulation (MIT).
 * Renders cursor-driven dye trails on a transparent canvas.
 * Requires WebGL2 + EXT_color_buffer_float; silently no-ops otherwise.
 */

const CFG = {
  SIM_RESOLUTION: 96,
  DYE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 1.2,
  VELOCITY_DISSIPATION: 0.4,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 20,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 5000,
}

// Sky-blue family, matching the site accent (#38bdf8)
function splatColor() {
  const hues = [199, 202, 205, 197]
  const h = hues[Math.floor(Math.random() * hues.length)] / 360
  const s = 0.85
  const v = 0.9
  // HSV → RGB
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  let r = 0, g = 0, b = 0
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
  }
  const k = 0.18 // intensity — keep trails soft
  return { r: r * k, g: g * k, b: b * k }
}

const BASE_VS = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const DISPLAY_FS = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
out vec4 fragColor;
void main () {
  vec3 c = texture(uTexture, vUv).rgb;
  float a = max(c.r, max(c.g, c.b));
  fragColor = vec4(c, a);
}`

const SPLAT_FS = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
out vec4 fragColor;
void main () {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`

const ADVECTION_FS = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
out vec4 fragColor;
void main () {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  vec4 result = texture(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  fragColor = result / decay;
}`

const DIVERGENCE_FS = `#version 300 es
precision highp float;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  fragColor = vec4(div, 0.0, 0.0, 1.0);
}`

const CURL_FS = `#version 300 es
precision highp float;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  fragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`

const VORTICITY_FS = `#version 300 es
precision highp float;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
out vec4 fragColor;
void main () {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity += force * dt;
  velocity = min(max(velocity, -1000.0), 1000.0);
  fragColor = vec4(velocity, 0.0, 1.0);
}`

const PRESSURE_FS = `#version 300 es
precision highp float;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
out vec4 fragColor;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`

const GRADIENT_SUBTRACT_FS = `#version 300 es
precision highp float;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
out vec4 fragColor;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`

const CLEAR_FS = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTexture;
uniform float value;
out vec4 fragColor;
void main () {
  fragColor = value * texture(uTexture, vUv);
}`

interface FBO {
  texture: WebGLTexture
  fbo: WebGLFramebuffer
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  attach: (id: number) => number
}

interface DoubleFBO {
  read: FBO
  write: FBO
  swap: () => void
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null
    if (!gl) return
    if (!gl.getExtension("EXT_color_buffer_float")) return

    let destroyed = false
    let rafId = 0

    // ── GL helpers ──────────────────────────────────────────────
    function compile(type: number, source: string) {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      return shader
    }

    function createProgram(fsSource: string) {
      const program = gl!.createProgram()!
      gl!.attachShader(program, compile(gl!.VERTEX_SHADER, BASE_VS))
      gl!.attachShader(program, compile(gl!.FRAGMENT_SHADER, fsSource))
      gl!.linkProgram(program)
      const uniforms: Record<string, WebGLUniformLocation> = {}
      const count = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS)
      for (let i = 0; i < count; i++) {
        const name = gl!.getActiveUniform(program, i)!.name
        uniforms[name] = gl!.getUniformLocation(program, name)!
      }
      return { program, uniforms }
    }

    const splatProg = createProgram(SPLAT_FS)
    const advectionProg = createProgram(ADVECTION_FS)
    const divergenceProg = createProgram(DIVERGENCE_FS)
    const curlProg = createProgram(CURL_FS)
    const vorticityProg = createProgram(VORTICITY_FS)
    const pressureProg = createProgram(PRESSURE_FS)
    const gradientProg = createProgram(GRADIENT_SUBTRACT_FS)
    const clearProg = createProgram(CLEAR_FS)
    const displayProg = createProgram(DISPLAY_FS)

    // Fullscreen quad
    const vbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
    const ibo = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(0)

    function blit(target: FBO | null) {
      if (target == null) {
        gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight)
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
      } else {
        gl!.viewport(0, 0, target.width, target.height)
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo)
      }
      gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0)
    }

    function createFBO(w: number, h: number, internalFormat: number, format: number): FBO {
      const texture = gl!.createTexture()!
      gl!.activeTexture(gl!.TEXTURE0)
      gl!.bindTexture(gl!.TEXTURE_2D, texture)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, gl!.HALF_FLOAT, null)
      const fbo = gl!.createFramebuffer()!
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo)
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0)
      gl!.viewport(0, 0, w, h)
      gl!.clearColor(0, 0, 0, 0)
      gl!.clear(gl!.COLOR_BUFFER_BIT)
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id)
          gl!.bindTexture(gl!.TEXTURE_2D, texture)
          return id
        },
      }
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number): DoubleFBO {
      let fbo1 = createFBO(w, h, internalFormat, format)
      let fbo2 = createFBO(w, h, internalFormat, format)
      return {
        get read() { return fbo1 },
        set read(v) { fbo1 = v },
        get write() { return fbo2 },
        set write(v) { fbo2 = v },
        swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t },
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
      } as DoubleFBO
    }

    function getResolution(resolution: number) {
      let aspect = gl!.drawingBufferWidth / gl!.drawingBufferHeight
      if (aspect < 1) aspect = 1 / aspect
      const min = Math.round(resolution)
      const max = Math.round(resolution * aspect)
      return gl!.drawingBufferWidth > gl!.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max }
    }

    // ── Framebuffers ────────────────────────────────────────────
    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.floor(canvas!.clientWidth * dpr)
      const h = Math.floor(canvas!.clientHeight * dpr)
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w
        canvas!.height = h
        return true
      }
      return false
    }
    resizeCanvas()

    let simRes = getResolution(CFG.SIM_RESOLUTION)
    let dyeRes = getResolution(CFG.DYE_RESOLUTION)
    let velocity = createDoubleFBO(simRes.width, simRes.height, gl.RG16F, gl.RG)
    let dye = createDoubleFBO(dyeRes.width, dyeRes.height, gl.RGBA16F, gl.RGBA)
    let divergence = createFBO(simRes.width, simRes.height, gl.R16F, gl.RED)
    let curl = createFBO(simRes.width, simRes.height, gl.R16F, gl.RED)
    let pressure = createDoubleFBO(simRes.width, simRes.height, gl.R16F, gl.RED)

    function reinitFramebuffers() {
      simRes = getResolution(CFG.SIM_RESOLUTION)
      dyeRes = getResolution(CFG.DYE_RESOLUTION)
      velocity = createDoubleFBO(simRes.width, simRes.height, gl!.RG16F, gl!.RG)
      dye = createDoubleFBO(dyeRes.width, dyeRes.height, gl!.RGBA16F, gl!.RGBA)
      divergence = createFBO(simRes.width, simRes.height, gl!.R16F, gl!.RED)
      curl = createFBO(simRes.width, simRes.height, gl!.R16F, gl!.RED)
      pressure = createDoubleFBO(simRes.width, simRes.height, gl!.R16F, gl!.RED)
    }

    // ── Pointer ─────────────────────────────────────────────────
    const pointer = {
      x: 0.5, y: 0.5, dx: 0, dy: 0,
      moved: false, initialized: false,
      color: splatColor(),
    }

    // The sim (curl/vorticity/divergence/20 pressure iterations/advection)
    // is the most expensive loop on the page — only run it while trails are
    // actually settling, not forever with zero interaction.
    const SETTLE_MS = 2500
    let lastActive = performance.now()

    function onPointerMove(e: PointerEvent) {
      const x = e.clientX / window.innerWidth
      const y = 1 - e.clientY / window.innerHeight
      lastActive = performance.now()
      if (!pointer.initialized) {
        pointer.initialized = true
        pointer.x = x
        pointer.y = y
        return
      }
      pointer.dx = (x - pointer.x) * CFG.SPLAT_FORCE
      pointer.dy = (y - pointer.y) * CFG.SPLAT_FORCE
      pointer.x = x
      pointer.y = y
      pointer.moved = Math.abs(pointer.dx) > 0 || Math.abs(pointer.dy) > 0
    }

    function onPointerDown() {
      pointer.color = splatColor()
      lastActive = performance.now()
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })

    // ── Simulation steps ────────────────────────────────────────
    function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
      gl!.useProgram(splatProg.program)
      gl!.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0))
      gl!.uniform1f(splatProg.uniforms.aspectRatio, canvas!.width / canvas!.height)
      gl!.uniform2f(splatProg.uniforms.point, x, y)
      gl!.uniform3f(splatProg.uniforms.color, dx, dy, 0)
      gl!.uniform1f(splatProg.uniforms.radius, CFG.SPLAT_RADIUS / 100)
      blit(velocity.write)
      velocity.swap()

      gl!.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0))
      gl!.uniform3f(splatProg.uniforms.color, color.r, color.g, color.b)
      blit(dye.write)
      dye.swap()
    }

    function step(dt: number) {
      gl!.disable(gl!.BLEND)

      gl!.useProgram(curlProg.program)
      gl!.uniform2f(curlProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl!.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0))
      blit(curl)

      gl!.useProgram(vorticityProg.program)
      gl!.uniform2f(vorticityProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl!.uniform1i(vorticityProg.uniforms.uVelocity, velocity.read.attach(0))
      gl!.uniform1i(vorticityProg.uniforms.uCurl, curl.attach(1))
      gl!.uniform1f(vorticityProg.uniforms.curl, CFG.CURL)
      gl!.uniform1f(vorticityProg.uniforms.dt, dt)
      blit(velocity.write)
      velocity.swap()

      gl!.useProgram(divergenceProg.program)
      gl!.uniform2f(divergenceProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl!.uniform1i(divergenceProg.uniforms.uVelocity, velocity.read.attach(0))
      blit(divergence)

      gl!.useProgram(clearProg.program)
      gl!.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0))
      gl!.uniform1f(clearProg.uniforms.value, CFG.PRESSURE)
      blit(pressure.write)
      pressure.swap()

      gl!.useProgram(pressureProg.program)
      gl!.uniform2f(pressureProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl!.uniform1i(pressureProg.uniforms.uDivergence, divergence.attach(0))
      for (let i = 0; i < CFG.PRESSURE_ITERATIONS; i++) {
        gl!.uniform1i(pressureProg.uniforms.uPressure, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      gl!.useProgram(gradientProg.program)
      gl!.uniform2f(gradientProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl!.uniform1i(gradientProg.uniforms.uPressure, pressure.read.attach(0))
      gl!.uniform1i(gradientProg.uniforms.uVelocity, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      gl!.useProgram(advectionProg.program)
      gl!.uniform2f(advectionProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl!.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0))
      gl!.uniform1i(advectionProg.uniforms.uSource, velocity.read.attach(0))
      gl!.uniform1f(advectionProg.uniforms.dt, dt)
      gl!.uniform1f(advectionProg.uniforms.dissipation, CFG.VELOCITY_DISSIPATION)
      blit(velocity.write)
      velocity.swap()

      gl!.uniform2f(advectionProg.uniforms.texelSize, dye.texelSizeX, dye.texelSizeY)
      gl!.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0))
      gl!.uniform1i(advectionProg.uniforms.uSource, dye.read.attach(1))
      gl!.uniform1f(advectionProg.uniforms.dissipation, CFG.DENSITY_DISSIPATION)
      blit(dye.write)
      dye.swap()
    }

    function render() {
      gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA)
      gl!.enable(gl!.BLEND)
      gl!.useProgram(displayProg.program)
      gl!.uniform1i(displayProg.uniforms.uTexture, dye.read.attach(0))
      blit(null)
    }

    // ── Main loop ───────────────────────────────────────────────
    let lastTime = performance.now()
    function frame() {
      if (destroyed) return
      if (document.hidden) {
        rafId = requestAnimationFrame(frame)
        return
      }
      const now = performance.now()
      const dt = Math.min((now - lastTime) / 1000, 0.016666)
      lastTime = now

      if (resizeCanvas()) reinitFramebuffers()

      if (pointer.moved) {
        pointer.moved = false
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color)
      }

      // Idle: let existing trails settle for a bit, then stop stepping the
      // sim entirely until the next interaction wakes it back up.
      if (now - lastActive < SETTLE_MS) {
        step(dt)
        render()
      }
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      destroyed = true
      cancelAnimationFrame(rafId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-full h-full pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-70"
    />
  )
}
