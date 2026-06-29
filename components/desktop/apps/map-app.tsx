"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import { Plus, Minus, MapPin } from "lucide-react"
import { places, STATUS_META, travelStats, Place } from "@/lib/travel-data"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

export function MapApp() {
  const [selected, setSelected] = useState<Place | null>(places.find(p => p.status === "home") ?? null)
  const [position, setPosition] = useState({ coordinates: [40, 20] as [number, number], zoom: 1.1 })

  const zoom = (factor: number) =>
    setPosition(p => ({ ...p, zoom: Math.min(Math.max(p.zoom * factor, 1), 6) }))

  return (
    <div className="h-full flex flex-col">
      {/* Stats bar */}
      <div className="flex items-center gap-4 px-4 h-10 border-b border-border/60 bg-muted/30 shrink-0 text-xs">
        <span className="font-semibold text-foreground font-[family-name:var(--font-space-grotesk)]">Travel Map</span>
        <span className="text-muted-foreground">{travelStats.countriesVisited} countries</span>
        <span className="text-muted-foreground">{travelStats.citiesVisited} cities</span>
        <span className="text-muted-foreground">{travelStats.onWishlist} on wishlist</span>
        <div className="ml-auto flex items-center gap-3">
          {Object.entries(STATUS_META).map(([k, m]) => (
            <span key={k} className="flex items-center gap-1 text-muted-foreground">
              <span className="w-2 h-2 rounded-full" style={{ background: m.color }} /> {m.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Map */}
        <div className="relative flex-1 min-w-0 bg-[#eaf1f5] dark:bg-[#11161b]">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 120 }}
            width={800}
            height={500}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              onMoveEnd={(pos) => setPosition(pos)}
              maxZoom={6}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: "#f5f0eb", stroke: "#d8cfc4", strokeWidth: 0.4, outline: "none" },
                        hover: { fill: "#f3e4d4", stroke: "#F38020", strokeWidth: 0.5, outline: "none" },
                        pressed: { fill: "#f3e4d4", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {places.map(place => {
                const meta = STATUS_META[place.status]
                const isSel = selected?.id === place.id
                return (
                  <Marker
                    key={place.id}
                    coordinates={place.coordinates}
                    onClick={() => setSelected(place)}
                    style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: {} }}
                  >
                    {(place.status !== "visited") && (
                      <circle r={9} fill={meta.color} opacity={0.18}>
                        <animate attributeName="r" values="6;12;6" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.25;0;0.25" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      r={isSel ? 5.5 : 4}
                      fill={meta.color}
                      stroke="#fff"
                      strokeWidth={1.2}
                    />
                  </Marker>
                )
              })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Zoom controls */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-1">
            <button onClick={() => zoom(1.4)} className="w-7 h-7 rounded-md bg-background/90 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Zoom in">
              <Plus className="w-4 h-4" />
            </button>
            <button onClick={() => zoom(1 / 1.4)} className="w-7 h-7 rounded-md bg-background/90 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Zoom out">
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detail panel */}
        <div className="w-56 shrink-0 border-l border-border/60 bg-muted/20 p-4 overflow-y-auto scrollbar-hide">
          {selected ? (
            <div>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-white mb-2"
                style={{ background: STATUS_META[selected.status].color }}
              >
                <MapPin className="w-2.5 h-2.5" /> {STATUS_META[selected.status].label}
              </span>
              <h3 className="text-base font-bold text-foreground">{selected.name}</h3>
              <p className="text-xs text-muted-foreground">{selected.country}{selected.year ? ` · ${selected.year}` : ""}</p>
              {selected.memory && <p className="mt-3 text-xs text-foreground/75 leading-relaxed italic">&ldquo;{selected.memory}&rdquo;</p>}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">Click a marker to see the story behind each place.</p>
          )}

          <div className="mt-5 pt-4 border-t border-border/60">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2 font-[family-name:var(--font-space-grotesk)]">All places</p>
            <div className="space-y-1">
              {places.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-xs text-left transition-colors ${
                    selected?.id === p.id ? "bg-primary/15 text-foreground" : "text-foreground/70 hover:bg-foreground/5"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: STATUS_META[p.status].color }} />
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
