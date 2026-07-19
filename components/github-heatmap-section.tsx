"use client"

import { CutoutText } from "@/components/ui/cutout-text"
import { GinghamSwatch, FlowerCluster } from "@/components/ui/collage-accents"

const GITHUB_USERNAME = "sovandara1607"

export function GithubHeatmapSection() {
  return (
    <section id="github-activity" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto mb-10 md:mb-14">
        <CutoutText text="GITHUB" letterClassName="text-3xl sm:text-4xl" />
        <p className="mt-3 font-[family-name:var(--font-caveat)] font-bold text-[#D9622B] text-2xl sm:text-3xl -rotate-2 origin-left">
          Recent activity.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Same cream paper card as the hero stat strip — the embedded chart's
            empty-day cells are a hardcoded light gray that reads as broken on
            the dark theme's near-black surfaces, so this stays a fixed light card. */}
        <div className="relative">
          <GinghamSwatch className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 -rotate-6 z-0" />
          <FlowerCluster className="absolute -bottom-6 -right-4 w-16 h-16 sm:w-20 sm:h-20 rotate-6 z-0" />

          <div className="relative z-10 rounded-sm border border-black/10 bg-[#F3EDE3] p-6 sm:p-8 overflow-x-auto shadow-[3px_5px_14px_rgba(0,0,0,0.3)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/1F6F64/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
              className="w-full min-w-[600px]"
            />
          </div>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-[family-name:var(--font-caveat)] font-bold text-lg text-[#D9622B] hover:opacity-80 transition-opacity"
        >
          View full profile on GitHub →
        </a>
      </div>
    </section>
  )
}
