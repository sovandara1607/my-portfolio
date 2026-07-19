// Ransom-note / magazine-clipping lettering: each character gets its own
// paper-patch color, font, tilt, and skewed "torn edge" so the word reads as
// a collage of separately cut-out letters rather than one typeset string.

const PATCHES = [
  { bg: "#1A1A1A", ink: "#F3EDE3", font: "var(--font-unbounded)" },
  { bg: "#7A2426", ink: "#F3EDE3", font: "var(--font-fraunces)" },
  { bg: "#1F6F64", ink: "#F3EDE3", font: "var(--font-epilogue)" },
  { bg: "#C99A2E", ink: "#1A1A1A", font: "var(--font-fraunces)" },
  { bg: "#5B6B3F", ink: "#F3EDE3", font: "var(--font-unbounded)" },
]

const ROTATIONS = [-7, 5, -4, 6, -6, 3, -3, 7]

const CLIP_PATHS = [
  "polygon(6% 0%, 100% 4%, 96% 100%, 2% 96%)",
  "polygon(0% 6%, 94% 0%, 100% 92%, 8% 100%)",
  "polygon(3% 3%, 97% 0%, 100% 97%, 4% 100%)",
  "polygon(0% 2%, 96% 5%, 100% 98%, 5% 95%)",
]

export function CutoutText({
  text,
  className = "",
  letterClassName = "text-3xl sm:text-4xl",
}: {
  text: string
  className?: string
  letterClassName?: string
}) {
  return (
    <span className={`inline-flex items-center flex-wrap ${className}`}>
      {text.split("").map((char, i) => {
        if (char === " ") {
          return <span key={i} className="w-2" aria-hidden />
        }
        const patch = PATCHES[i % PATCHES.length]
        const rotation = ROTATIONS[i % ROTATIONS.length]
        const clipPath = CLIP_PATHS[i % CLIP_PATHS.length]
        return (
          <span
            key={i}
            className={`inline-block font-bold leading-none px-1.5 py-1 -mx-0.5 select-none ${letterClassName}`}
            style={{
              backgroundColor: patch.bg,
              color: patch.ink,
              fontFamily: patch.font,
              transform: `rotate(${rotation}deg)`,
              clipPath,
              boxShadow: "1px 2px 3px rgba(0,0,0,0.35)",
            }}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}
