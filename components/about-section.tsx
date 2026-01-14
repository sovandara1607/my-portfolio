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
    t("about.interest6"),
  ]

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("about.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("about.title")}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-8 glow-cyan-hover transition-all duration-300">
            <div className="glass-subtle rounded-lg p-4 -m-4 mb-4">
              <p className="text-muted-foreground leading-relaxed">
                {t("about.description1")}
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("about.description2")}
            </p>
            <div className="pt-4 border-t border-border">
              <span className="text-sm text-primary font-medium">{t("about.careerGoal")}</span>
              <p className="mt-2 text-foreground">{t("about.careerGoalText")}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">{t("about.interests")}</h3>
            {interests.map((interest, index) => (
              <div
                key={index}
                className="p-4 bg-card border border-border rounded-lg glow-cyan-hover transition-all duration-300"
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
