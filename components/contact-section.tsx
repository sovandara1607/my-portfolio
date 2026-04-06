"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-secondary text-sm tracking-wider uppercase mb-2 font-[family-name:var(--font-space-grotesk)]">{t("contact.label")}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("contact.title")}</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="glass-card p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-sm text-muted-foreground">{t("contact.portfolio")}</span>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  sovandararith
                </a>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-sm text-muted-foreground">{t("contact.email")}</span>
                <a
                  href="mailto:rithsovandara83@gmail.com"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  rithsovandara83@gmail.com
                </a>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-sm text-muted-foreground">{t("contact.github")}</span>
                <a href="https://github.com/sovandara1607" className="text-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                  @sovandara1607
                </a>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-sm text-muted-foreground">{t("contact.location")}</span>
                <span className="text-foreground">{t("contact.locationValue")}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border text-center">
              <p className="text-muted-foreground italic text-sm">
                {t("contact.quote")}
              </p>
            </div>
          </motion.div>

          {/* Buy Me a Coffee */}
          <motion.div 
            className="mt-8 glass-card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(243,128,32,0.3)]"
              >
                <span>☕</span>
                {t("contact.buyMeCoffeeButton")}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">{t("contact.copyright")}</p>
        </div>
      </div>
    </section>
  )
}
