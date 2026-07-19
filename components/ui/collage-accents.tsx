// Shared scrapbook-collage decorations used alongside CutoutText — a fabric
// swatch and a pressed-flower cluster, both drawn in CSS/SVG (no image assets)
// so they can be reused across sections that adopt the cutout-collage style.

// Gingham-fabric swatch, built from two blended stripe patterns.
export function GinghamSwatch({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        backgroundColor: "#eaf3f0",
        backgroundImage: `repeating-linear-gradient(0deg, rgba(31,111,100,0.4) 0px, rgba(31,111,100,0.4) 7px, transparent 7px, transparent 14px),
          repeating-linear-gradient(90deg, rgba(31,111,100,0.4) 0px, rgba(31,111,100,0.4) 7px, transparent 7px, transparent 14px)`,
        backgroundBlendMode: "multiply",
        clipPath: "polygon(0 0, 100% 0, 0 100%)",
      }}
    />
  )
}

// Small flat-vector pressed-flower cluster, echoing the collage without stock photography.
export function FlowerCluster({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 80 80"
      className={className}
      style={{ filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.25))" }}
    >
      <g transform="translate(40 44)">
        <ellipse cx="0" cy="-16" rx="9" ry="15" fill="#7A62B8" transform="rotate(-10)" />
        <ellipse cx="13" cy="-6" rx="9" ry="15" fill="#8F72C4" transform="rotate(55)" />
        <ellipse cx="8" cy="12" rx="9" ry="15" fill="#6B4FA0" transform="rotate(125)" />
        <ellipse cx="-8" cy="12" rx="9" ry="15" fill="#8F72C4" transform="rotate(-125)" />
        <ellipse cx="-13" cy="-6" rx="9" ry="15" fill="#7A62B8" transform="rotate(-55)" />
        <circle cx="0" cy="0" r="6" fill="#C99A2E" />
      </g>
      <g transform="translate(60 20) rotate(20)">
        <ellipse cx="0" cy="-6" rx="4" ry="7" fill="#8F72C4" />
        <ellipse cx="5" cy="2" rx="4" ry="7" fill="#6B4FA0" transform="rotate(115)" />
        <ellipse cx="-5" cy="2" rx="4" ry="7" fill="#7A62B8" transform="rotate(-115)" />
        <circle cx="0" cy="0" r="2.5" fill="#C99A2E" />
      </g>
    </svg>
  )
}
