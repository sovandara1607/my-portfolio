# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **pnpm**.

- `pnpm dev` — start the Next.js dev server (default port 3000)
- `pnpm build` — production build (Next.js 16 / React 19)
- `pnpm start` — run the production build
- `pnpm lint` — ESLint

There is no test runner configured.

## Architecture

Single-page personal portfolio. The entire site is rendered from `app/page.tsx`, which composes a full-screen `<HeroSection />` followed by a vertical stack of `*-section.tsx` components (Work, Projects, Experiences, Contact, Footer). Each section is a self-contained client component with its own data inlined at the top — there is no CMS, no fetching layer, and no backend.

Two case-study subroutes live under `app/projects/` (`fitness-app`, `performative_detector`) for deep-dives linked from the projects grid.

### Global providers

`app/layout.tsx` wraps the tree in three providers, applied in this order: `ThemeProvider` (next-themes, `class` attribute) → `LanguageProvider` → `MusicProvider`. `app/page.tsx` additionally wraps everything in `<LanguageWrapper>`, which applies the `lang-kh` class on the root when Khmer is active so the CSS overrides in `globals.css` swap fonts globally.

### Internationalization

`lib/language-context.tsx` holds the entire translation dictionary inline as `translations: Record<"en" | "kh", Record<string, string>>`. Components call `const { t, language } = useLanguage()` and use `t("key")` for known strings, or branch on `language === "kh"` for inline ternaries (the codebase mixes both styles). When adding UI strings, add the key to **both** locales — missing keys fall back to the key string itself.

The Khmer font (`Kantumruy Pro`) is force-applied through the `.lang-kh` class selector at the bottom of `app/globals.css`; do not rely on the `font-khmer` variable directly on individual elements.

### Music player

`lib/music-context.tsx` owns a single `<audio>` element at the provider level so playback survives route changes. The `<MusicPlayer />` floating control and the navigation's sound-wave visualizer both subscribe to `useMusic()`.

### Styling system

Tailwind CSS v4 with the new `@theme inline` block in `app/globals.css`. Design tokens live in CSS custom properties on `:root` (and `.dark`). Brand palette: primary `#F38020` (orange), secondary `#228B49` (green), neutral `#313131`. Background is warm cream `#f5f0eb` in light mode.

Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables: `--font-epilogue` (headings), `--font-inter` (body), `--font-space-grotesk` (labels/kickers), `--font-jetbrains` (mono), `--font-khmer` (Khmer).

Reusable shadcn-style primitives live in `components/ui/`. The `.glass-card` utility class (defined in `globals.css`) is the recurring card surface — prefer reusing it over re-implementing the blur/border combo.

### Section conventions

Each homepage section follows the same shell pattern:

```tsx
<section id="..." className="py-10 px-...">
  <div className="max-w-6xl mx-auto">
    <div className="mb-5">
      <p className="text-secondary text-sm tracking-wider uppercase ... font-[family-name:var(--font-space-grotesk)]">
        // Section Label
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">Section Title</h2>
    </div>
    {/* content */}
  </div>
</section>
```

Sections are referenced by their `id` from the navigation in `components/navigation.tsx` and from the in-nav search modal. When adding a new section, update both `navLinks` and `allSections` in that file.

### Notable third-party integrations

- **MediaPipe Hands** (`@mediapipe/hands`, `@mediapipe/camera_utils`) — used in the `performative_detector` case-study page for in-browser hand-gesture detection.
- **Framer Motion** — section enter animations and the nav's `layoutId="activeNav"` shared element for the active-link pill.
- **GSAP** (`gsap`, `@gsap/react`) — installed; used by the radial scroll gallery in `components/ui/portfolio-and-image-gallery.tsx`.
- **Vercel Analytics** — wired in `app/layout.tsx`.
