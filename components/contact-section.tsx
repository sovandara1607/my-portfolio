"use client"

import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-primary text-sm tracking-wider mb-2">{t("contact.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("contact.title")}</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-8 glow-cyan">
            <div className="glass-subtle rounded-lg p-4 -m-4 mb-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">{t("contact.portfolio")}</span>
                  <a href="#" className="text-foreground hover:text-primary transition-colors">
                    sovandararith
                  </a>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">{t("contact.email")}</span>
                  <a
                    href="mailto:rithsovandara83@gmail.com"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    rithsovandara83@gmail.com
                  </a>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">{t("contact.github")}</span>
                  <a href="https://github.com/sovandara1607" className="text-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                    @sovandara1607
                  </a>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">{t("contact.location")}</span>
                  <span className="text-foreground">{t("contact.locationValue")}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border text-center">
              <p className="text-muted-foreground italic text-sm">
                {t("contact.quote")}
              </p>
            </div>
          </div>

          {/* Buy Me a Coffee */}
          <div className="mt-8 bg-card border border-border rounded-xl p-6 glow-cyan text-center">
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
                className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 cursor-pointer"
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
