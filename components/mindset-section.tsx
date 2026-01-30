"use client"

import { useLanguage } from "@/lib/language-context"

export function MindsetSection() {
  const { t } = useLanguage()

  const principles = [
    t("mindset.p1"),
    t("mindset.p2"),
    t("mindset.p3"),
    t("mindset.p4"),
    t("mindset.p5"),
    t("mindset.p6"),
    t("mindset.p7"),
    t("mindset.p8"),
  ]

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("mindset.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("mindset.title")}</h2>
        </div>

        <div className="bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-8 shadow-[4px_4px_0_rgba(0,0,0,0.35)] glow-mc">
          <div className="glass-subtle p-4 -m-4">
            <div className="grid md:grid-cols-2 gap-4">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary">→</span>
                  <p className="text-foreground">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
