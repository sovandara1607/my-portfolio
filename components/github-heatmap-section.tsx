"use client"

import { SectionHeader } from "./section-header"

const GITHUB_USERNAME = "sovandara1607"

export function GithubHeatmapSection() {
  return (
    <section id="github-activity" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader kicker="GitHub" title="Recent activity." />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Fixed light surface — the embedded chart's empty-day cells are a
            hardcoded light gray that reads as broken on the dark theme's
            near-black card background, so this box opts out of theming. */}
        <div className="rounded-2xl border border-border/60 bg-white p-6 sm:p-8 overflow-x-auto shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/228B49/${GITHUB_USERNAME}`}
            alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
            className="w-full min-w-[600px]"
          />
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View full profile on GitHub →
        </a>
      </div>
    </section>
  )
}
