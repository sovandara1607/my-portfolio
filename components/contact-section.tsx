"use client"

import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import { CutoutText } from "@/components/ui/cutout-text"
import { GinghamSwatch, FlowerCluster } from "@/components/ui/collage-accents"
import { ArrowUpRight, Mail } from "lucide-react"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 md:mb-14">
          <CutoutText text="GET IN TOUCH" letterClassName="text-2xl sm:text-3xl" />
          <p className="mt-3 font-[family-name:var(--font-caveat)] font-bold text-[#D9622B] text-2xl sm:text-3xl -rotate-2 origin-left">
            {t("contact.title")}
          </p>
        </div>

        {/* Same cream-paper material as the hero stat strip and GitHub card —
            fixed light colors throughout so text stays legible against the
            card regardless of site theme. */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GinghamSwatch className="absolute -top-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 -rotate-6 z-0" />
          <FlowerCluster className="absolute -bottom-6 -right-4 w-16 h-16 sm:w-20 sm:h-20 rotate-6 z-0" />

          <div className="relative z-10 rounded-sm border border-black/10 bg-[#F3EDE3] p-6 sm:p-8 shadow-[3px_5px_14px_rgba(0,0,0,0.3)]">
            <p className="text-base sm:text-lg text-[#3b2a1f] leading-relaxed max-w-xl mb-6">
              {t("contact.quote")}
            </p>

            <a
              href="mailto:rithsovandara83@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-[#7A2426] text-[#F3EDE3] px-6 h-11 text-sm font-medium hover:bg-[#5c1a1c] transition-colors mb-8"
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
                  className="flex flex-col sm:grid sm:grid-cols-[160px_1fr] sm:items-baseline gap-1 sm:gap-8 py-4 border-b border-[#7A2426]/15 first:border-t"
                >
                  <dt className="text-xs font-medium uppercase tracking-[0.2em] text-[#6b4226]">
                    {row.label}
                  </dt>
                  <dd className="text-sm sm:text-base text-[#3b2a1f] break-all sm:break-normal">
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.external ? "_blank" : undefined}
                        rel={row.external ? "noopener noreferrer" : undefined}
                        className="hover:text-[#1F6F64] transition-colors underline-offset-4 hover:underline"
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
          </div>
        </motion.div>

        {/* Support card — same paper material, kept quiet (no corner flourish
            or cutout lettering) so the header above stays the one bold move */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="rounded-sm border border-black/10 bg-[#F3EDE3] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-[#3b2a1f] mb-1.5 font-[family-name:var(--font-fraunces)]">
                {t("contact.buyMeCoffee")}
              </h3>
              <p className="text-sm text-[#6b4226] leading-relaxed max-w-md">
                {t("contact.buyMeCoffeeDesc")}
              </p>
            </div>
            <a
              href="https://link.payway.com.kh/cg4094277"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full bg-[#C99A2E] text-[#1A1A1A] px-5 h-10 text-sm font-medium hover:bg-[#a97f1f] transition-colors whitespace-nowrap"
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
