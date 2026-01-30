"use client"

import { useLanguage } from "@/lib/language-context"

export function AchievementsSection() {
  const { t } = useLanguage()

  const achievements = [
    {
      title: t("achievements.pullShark"),
      description: t("achievements.pullSharkDesc"),
      tier: "gold",
      emoji: "🦈",
    },
    {
      title: t("achievements.yolo"),
      description: t("achievements.yoloDesc"),
      tier: "default",
      emoji: "🚀",
    },
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("achievements.label")}</p>
          <h2 className="text-lg md:text-xl font-bold text-foreground font-pixel">{t("achievements.title")}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-6 text-center transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 shadow-[4px_4px_0_rgba(0,0,0,0.35)] glow-mc-hover`}
            >
              <div className="glass-subtle p-4 -m-2">
                <span className="text-2xl mb-4 block">{achievement.emoji}</span>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-[#80FF20] transition-colors">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
