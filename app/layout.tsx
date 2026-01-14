import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Kantumruy_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import { MusicProvider } from "@/lib/music-context"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

// Khmer font - Kantumruy Pro
const kantumruyPro = Kantumruy_Pro({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["khmer", "latin"],
  variable: "--font-khmer",
})

export const metadata: Metadata = {
  title: "Sovandara Rith | Portfolio",
  description: "Year 3 Computer Science Student · Web & Mobile Developer · Aspiring Software Engineer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetbrainsMono.variable} ${kantumruyPro.variable}`}>
      <body className={`font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <MusicProvider>
              {children}
            </MusicProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
