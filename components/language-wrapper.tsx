"use client"

import { useLanguage } from "@/lib/language-context"
import { ReactNode } from "react"

export function LanguageWrapper({ children }: { children: ReactNode }) {
  const { language } = useLanguage()
  
  return (
    <div className={language === "kh" ? "lang-kh" : ""}>
      {children}
    </div>
  )
}
