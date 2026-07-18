# Theme toggle prism burst

## Summary

When the theme toggle (`components/theme-toggle.tsx`) switches mode, add a short
light-splitting particle effect: thin brand-colored rays fan out from the exact
click point, plus a radial screen wash centered on that same point, both
resolving over the same 600ms window as the existing color cross-fade
(`.theme-transitioning` in `app/globals.css`).

## Visual concept

- **Prism rays** — ~16 thin, tapered rays radiate from the click point at
  varied angles, lengths, and stagger delays, in brand colors (orange
  `#F38020`, green `#228B49`, plus a couple of neutral/white rays for
  contrast), fading out as they travel. A handful of small sparkle dots add
  texture alongside the rays.
- **Radial wash** — a soft radial gradient centered on the click point expands
  from 0 to beyond the viewport and fades out over the same duration, so the
  screen-wide part of the effect visibly originates from the toggle rather
  than feeling disconnected.
- Ray colors are fixed brand-spectrum regardless of switch direction (light→dark
  or dark→light look the same).

## Component

New file: `components/theme-prism-burst.tsx`.

- Rendered once, portaled into `document.body` via `createPortal` — not
  nested under `<nav>`, because `nav`'s `backdrop-blur` establishes a CSS
  containing block that would break `position: fixed` full-viewport escape.
- Exposes a ref-based imperative handle: `{ fire(x: number, y: number): void }`,
  obtained via `useImperativeHandle` on a `forwardRef` component (matches the
  "trigger from an event handler elsewhere" need without prop-drilling state
  through the tree).
- Internally holds a small array of burst records (`{ id, x, y }`), same
  pattern as the existing `ripples` state in `theme-toggle.tsx`. Each burst
  renders its own set of ray + wash + sparkle elements and is removed from
  the array via `setTimeout` after ~700ms (matches the existing ripple
  cleanup pattern).
- All animated elements use Framer Motion `motion.div`, animating only
  `transform` and `opacity` (GPU-cheap, no layout thrash). No canvas, no new
  dependencies.

## Integration

- `theme-toggle.tsx` renders `<ThemePrismBurst ref={burstRef} />` once,
  alongside its existing JSX.
- In `applyTheme`, right where `root.classList.add("theme-transitioning")`
  already fires (i.e. only on an actual mode change, after the
  `mode === theme` early return), also call `burstRef.current?.fire(e.clientX,
  e.clientY)`.
- Reuses the existing `TRANSITION_MS = 600` constant so the burst and the
  color cross-fade resolve together.

## Accessibility / edge cases

- Respects `useReducedMotion()` exactly like the rest of `theme-toggle.tsx`:
  when reduced motion is on, `fire` is never called (guarded at the call
  site, same branch that already skips the ripple/transition-class
  choreography).
- Keyboard-triggered activation (Enter/Space on a focused toggle button)
  still dispatches a synthetic `click` event with usable `clientX/clientY`
  (browsers center it on the target element), so no special-casing is
  needed.
- Rapid re-toggling: each burst is an independent, self-cleaning array entry,
  so overlapping clicks layer multiple bursts without interfering with each
  other or with the ripple/glow effects already in the toggle.
- No burst fires when clicking the already-active mode (matches the existing
  `if (mode === theme) return` guard).

## Out of scope

- No changes to the existing ripple, ambient glow, sliding indicator, or
  icon-morph behavior in `theme-toggle.tsx` — this is additive.
- No settings/toggle to disable the effect independent of
  `prefers-reduced-motion`.
- No canvas/WebGL particle system — DOM + Framer Motion only, to match the
  rest of the toggle's implementation.

## Testing / verification plan

- Manual verification via dev server + Playwright: toggle each mode
  transition (light→dark, dark→light, →system), confirm rays/wash render at
  the click point and clean up after ~700ms with no leftover DOM nodes.
- Confirm no burst fires when clicking the currently-active mode.
- Confirm the effect is fully suppressed with `prefers-reduced-motion:
  reduce` (via Playwright's `page.emulateMedia`).
- `pnpm exec tsc --noEmit` clean for the new file and its integration point.
