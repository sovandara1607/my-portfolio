"use client"

import { useLanguage } from "@/lib/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  const interests = [
    t("about.interest1"),
    t("about.interest2"),
    t("about.interest3"),
    t("about.interest4"),
    t("about.interest5"),
  ]

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("about.label")}</p>
          <h2 className="text-lg md:text-xl font-bold text-foreground font-pixel">{t("about.title")}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-8 shadow-[4px_4px_0_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[4px_4px_0_rgba(93,155,53,0.3),0_0_15px_rgba(128,255,32,0.1)]">
            <div className="glass-subtle p-4 -m-4 mb-4">
              <p className="text-muted-foreground leading-relaxed">
                {t("about.description1")}
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("about.description2")}
            </p>
            <div className="pt-4 border-t-3 border-t-[rgba(255,255,255,0.05)]">
              <span className="text-sm text-[#80FF20] font-medium drop-shadow-[0_0_4px_rgba(128,255,32,0.4)]">{t("about.careerGoal")}</span>
              <p className="mt-2 text-foreground">{t("about.careerGoalText")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">{t("about.interests")}</h3>
            {interests.map((interest, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-b from-card to-card/90 border-3 border-t-[rgba(255,255,255,0.08)] border-l-[rgba(255,255,255,0.08)] border-b-[rgba(0,0,0,0.25)] border-r-[rgba(0,0,0,0.25)] shadow-[3px_3px_0_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[3px_3px_0_rgba(93,155,53,0.25),0_0_12px_rgba(128,255,32,0.08)] hover:border-primary/40"
              >
                <span className="text-foreground">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
