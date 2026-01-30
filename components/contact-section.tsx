"use client"

import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-primary text-sm tracking-wider mb-2">{t("contact.label")}</p>
          <h2 className="text-lg md:text-xl font-bold text-foreground font-pixel">{t("contact.title")}</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-8 shadow-[5px_5px_0_rgba(0,0,0,0.4)] glow-mc">
            <div className="glass-subtle p-4 -m-4 mb-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b-2 border-b-[rgba(255,255,255,0.05)]">
                  <span className="text-sm text-muted-foreground">{t("contact.portfolio")}</span>
                  <a href="#" className="text-foreground hover:text-[#80FF20] transition-colors">
                    sovandararith
                  </a>
                </div>

                <div className="flex justify-between items-center py-2 border-b-2 border-b-[rgba(255,255,255,0.05)]">
                  <span className="text-sm text-muted-foreground">{t("contact.email")}</span>
                  <a
                    href="mailto:rithsovandara83@gmail.com"
                    className="text-foreground hover:text-[#80FF20] transition-colors"
                  >
                    rithsovandara83@gmail.com
                  </a>
                </div>

                <div className="flex justify-between items-center py-2 border-b-2 border-b-[rgba(255,255,255,0.05)]">
                  <span className="text-sm text-muted-foreground">{t("contact.github")}</span>
                  <a href="https://github.com/sovandara1607" className="text-foreground hover:text-[#80FF20] transition-colors" target="_blank" rel="noopener noreferrer">
                    @sovandara1607
                  </a>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">{t("contact.location")}</span>
                  <span className="text-foreground">{t("contact.locationValue")}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-3 border-t-[rgba(255,255,255,0.05)] text-center">
              <p className="text-muted-foreground italic text-sm">
                {t("contact.quote")}
              </p>
            </div>
          </div>

          {/* Buy Me a Coffee */}
          <div className="mt-8 bg-gradient-to-b from-card to-card/90 border-4 border-t-[rgba(255,255,255,0.1)] border-l-[rgba(255,255,255,0.1)] border-b-[rgba(0,0,0,0.3)] border-r-[rgba(0,0,0,0.3)] p-6 shadow-[4px_4px_0_rgba(0,0,0,0.35)] glow-mc text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl">☕</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t("contact.buyMeCoffee")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("contact.buyMeCoffeeDesc")}
                </p>
              </div>
              <a
                href="https://link.payway.com.kh/cg4094277"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#FCDB00] to-[#C4A800] text-[#1a1a1a] font-medium border-2 border-t-[#FFE860] border-l-[#FFE860] border-b-[#8B7500] border-r-[#8B7500] shadow-[3px_3px_0_rgba(0,0,0,0.4)] transition-all hover:from-[#FFE530] hover:to-[#D4B800] active:shadow-[1px_1px_0_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
              >
                <span>☕</span>
                {t("contact.buyMeCoffeeButton")}
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">{t("contact.copyright")}</p>
        </div>
      </div>
    </section>
  )
}
