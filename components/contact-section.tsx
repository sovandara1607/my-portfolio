"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { SectionHeader } from "./section-header"
import { ArrowUpRight, Mail } from "lucide-react"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          kicker={t("contact.label").replace(/^\/\/\s*/, "")}
          title={t("contact.title")}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            {t("contact.quote")}
          </p>

          <a
            href="mailto:rithsovandara83@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 h-11 text-sm font-medium hover:bg-foreground/85 transition-colors mb-14"
          >
            <Mail className="w-4 h-4" />
            {t("nav.getInTouch")}
          </a>

          <dl>
            {[
              { label: t("contact.email"), value: "rithsovandara83@gmail.com", href: "mailto:rithsovandara83@gmail.com" },
              { label: t("contact.github"), value: "@sovandara1607", href: "https://github.com/sovandara1607", external: true },
              { label: t("contact.location"), value: t("contact.locationValue") },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-col sm:grid sm:grid-cols-[160px_1fr] sm:items-baseline gap-1 sm:gap-8 py-4 border-b border-border first:border-t"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-sm sm:text-base text-foreground break-all sm:break-normal">
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.external ? "_blank" : undefined}
                      rel={row.external ? "noopener noreferrer" : undefined}
                      className="hover:text-muted-foreground transition-colors underline-offset-4 hover:underline"
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

        {/* Support card */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1.5">
                {t("contact.buyMeCoffee")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                {t("contact.buyMeCoffeeDesc")}
              </p>
            </div>
            <a
              href="https://link.payway.com.kh/cg4094277"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-border px-5 h-10 text-sm font-medium text-foreground hover:bg-muted transition-colors whitespace-nowrap"
            >
              ☕ {t("contact.buyMeCoffeeButton")}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
