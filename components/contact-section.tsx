"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { SectionHeader } from "./section-header"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="04"
          kicker={t("contact.label").replace(/^\/\/\s*/, "")}
          title={t("contact.title")}
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10">
              {t("contact.quote")}
            </p>

            <dl className="border-t border-border">
              {[
                { label: t("contact.portfolio"), value: "sovandararith", href: "#" },
                { label: t("contact.email"), value: "rithsovandara83@gmail.com", href: "mailto:rithsovandara83@gmail.com" },
                { label: t("contact.github"), value: "@sovandara1607", href: "https://github.com/sovandara1607", external: true },
                { label: t("contact.location"), value: t("contact.locationValue") },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] items-baseline py-4 border-b border-border">
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
                    {row.label}
                  </dt>
                  <dd className="text-base text-foreground">
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.external ? "_blank" : undefined}
                        rel={row.external ? "noopener noreferrer" : undefined}
                        className="hover:text-primary transition-colors underline-offset-4 hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Side card — coffee + meta */}
          <motion.aside
            className="lg:col-span-5 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="border border-border p-6 md:p-8 bg-background/50 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.25em] text-primary mb-6 font-[family-name:var(--font-space-grotesk)]">
                ☕ Support
              </p>
              <h3 className="text-2xl font-bold text-foreground leading-tight mb-3">
                {t("contact.buyMeCoffee")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("contact.buyMeCoffeeDesc")}
              </p>
              <a
                href="https://link.payway.com.kh/cg4094277"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold uppercase tracking-widest font-[family-name:var(--font-space-grotesk)] transition-all duration-300 hover:shadow-[0_0_24px_rgba(243,128,32,0.25)]"
              >
                <span>☕</span>
                {t("contact.buyMeCoffeeButton")}
              </a>
            </div>
          </motion.aside>
        </div>

        <div className="mt-20 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-[family-name:var(--font-space-grotesk)]">
            {t("contact.copyright")}
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
            ISSUE — 01 / {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  )
}
