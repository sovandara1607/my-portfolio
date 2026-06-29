"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import ForceGraph2D from "react-force-graph-2d"
import { graphNodes, graphLinks, GROUP_LABELS, NodeGroup, GraphNode } from "@/lib/graph-data"

const GROUP_COLORS: Record<NodeGroup, string> = {
  core: "#F38020",
  language: "#228B49",
  framework: "#E06810",
  database: "#2F855A",
  cloud: "#4B5563",
  design: "#D9480F",
  tool: "#9CA3AF",
  ai: "#B45309",
}

interface FGNode extends GraphNode {
  x?: number
  y?: number
}

export function GraphApp() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<any>(null)
  const [dims, setDims] = useState({ w: 600, h: 460 })
  const [selected, setSelected] = useState<FGNode | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  // Clone so the force engine doesn't mutate module-level data
  const data = useMemo(
    () => ({
      nodes: graphNodes.map(n => ({ ...n })),
      links: graphLinks.map(l => ({ ...l })),
    }),
    []
  )

  // Neighbor set for highlight
  const neighbors = useMemo(() => {
    const map: Record<string, Set<string>> = {}
    graphLinks.forEach(l => {
      ;(map[l.source] ??= new Set()).add(l.target)
      ;(map[l.target] ??= new Set()).add(l.source)
    })
    return map
  }, [])

  useEffect(() => {
    if (!wrapRef.current) return
    const ro = new ResizeObserver(entries => {
      const r = entries[0].contentRect
      setDims({ w: r.width, h: r.height })
    })
    ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  const nodeCanvas = useCallback(
    (node: FGNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const r = Math.sqrt(node.val) * 2.2
      const color = GROUP_COLORS[node.group]
      const isActive = hovered === node.id || selected?.id === node.id
      const isNeighbor =
        (hovered && neighbors[hovered]?.has(node.id)) ||
        (selected && neighbors[selected.id]?.has(node.id))
      const dim = (hovered || selected) && !isActive && !isNeighbor

      ctx.globalAlpha = dim ? 0.25 : 1

      // glow on active
      if (isActive) {
        ctx.beginPath()
        ctx.arc(node.x!, node.y!, r + 4, 0, 2 * Math.PI)
        ctx.fillStyle = color + "33"
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
      ctx.lineWidth = 1.5 / globalScale
      ctx.strokeStyle = "#f5f0eb"
      ctx.stroke()

      // label
      const showLabel = node.val >= 6 || isActive || isNeighbor || globalScale > 1.6
      if (showLabel) {
        const fontSize = Math.max(3.5, 11 / globalScale)
        ctx.font = `${node.group === "core" ? "600 " : ""}${fontSize}px Inter, sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillStyle = "#313131"
        ctx.globalAlpha = dim ? 0.2 : 0.9
        ctx.fillText(node.id, node.x!, node.y! + r + 1.5)
      }
      ctx.globalAlpha = 1
    },
    [hovered, selected, neighbors]
  )

  return (
    <div className="h-full flex">
      {/* Graph canvas */}
      <div ref={wrapRef} className="relative flex-1 min-w-0 bg-[#f5f0eb]">
        {dims.w > 0 && (
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
            width={dims.w}
            height={dims.h}
            backgroundColor="rgba(0,0,0,0)"
            nodeRelSize={4}
            nodeVal={(n: any) => n.val}
            nodeCanvasObject={nodeCanvas as any}
            nodePointerAreaPaint={(node: any, color, ctx) => {
              const r = Math.sqrt(node.val) * 2.2 + 2
              ctx.fillStyle = color
              ctx.beginPath()
              ctx.arc(node.x, node.y, r, 0, 2 * Math.PI)
              ctx.fill()
            }}
            linkColor={(l: any) => {
              const s = typeof l.source === "object" ? l.source.id : l.source
              const t = typeof l.target === "object" ? l.target.id : l.target
              const active = hovered ?? selected?.id
              if (active && (s === active || t === active)) return "rgba(243,128,32,0.5)"
              return "rgba(49,49,49,0.12)"
            }}
            linkWidth={(l: any) => {
              const s = typeof l.source === "object" ? l.source.id : l.source
              const t = typeof l.target === "object" ? l.target.id : l.target
              const active = hovered ?? selected?.id
              return active && (s === active || t === active) ? 1.5 : 0.5
            }}
            onNodeHover={(n: any) => setHovered(n?.id ?? null)}
            onNodeClick={(n: any) => setSelected(n)}
            onBackgroundClick={() => setSelected(null)}
            cooldownTicks={120}
            onEngineStop={() => fgRef.current?.zoomToFit(400, 40)}
            d3VelocityDecay={0.3}
          />
        )}
        <div className="absolute top-3 left-3 text-[11px] text-muted-foreground bg-background/70 backdrop-blur px-2 py-1 rounded-md border border-border/60 pointer-events-none">
          Scroll to zoom · drag to pan · click a node
        </div>
      </div>

      {/* Side panel */}
      <div className="w-52 shrink-0 border-l border-border/60 bg-muted/20 p-4 overflow-y-auto scrollbar-hide">
        {selected ? (
          <div>
            <span
              className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium text-white mb-2"
              style={{ background: GROUP_COLORS[selected.group] }}
            >
              {GROUP_LABELS[selected.group]}
            </span>
            <h3 className="text-base font-bold text-foreground">{selected.id}</h3>
            {selected.desc && <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{selected.desc}</p>}
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-1">Connected to</p>
              <div className="flex flex-wrap gap-1">
                {[...(neighbors[selected.id] ?? [])].map(n => (
                  <span key={n} className="px-1.5 py-0.5 text-[10px] rounded bg-muted text-foreground/70 border border-border">{n}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Skill Graph</h3>
            <p className="text-xs text-muted-foreground mb-4">Explore how my languages, frameworks, and tools connect.</p>
            <div className="space-y-1.5">
              {(Object.keys(GROUP_LABELS) as NodeGroup[]).map(g => (
                <div key={g} className="flex items-center gap-2 text-xs text-foreground/75">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: GROUP_COLORS[g] }} />
                  {GROUP_LABELS[g]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
