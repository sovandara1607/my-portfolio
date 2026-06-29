import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Now — Sovandara Rith",
  description: "What I'm currently working on, learning, and thinking about.",
}

export default function NowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
