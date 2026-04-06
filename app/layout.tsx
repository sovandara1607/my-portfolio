import type React from "react"
import type { Metadata } from "next"
import { Epilogue, Inter, Space_Grotesk, JetBrains_Mono, Kantumruy_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import { MusicProvider } from "@/lib/music-context"
import "./globals.css"

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

const kantumruyPro = Kantumruy_Pro({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["khmer", "latin"],
  variable: "--font-khmer",
})

export const metadata: Metadata = {
  title: "Sovandara Rith | Portfolio",
  description: "Year 3 Computer Science Student · Web & Mobile Developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${epilogue.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${kantumruyPro.variable}`}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
