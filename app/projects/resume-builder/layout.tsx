import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Online Resume Builder | Case Study | Sovandara Rith",
  description:
    "A Laravel + MySQL web app for creating and managing professional resumes online, built for CS 262 — Full-Stack Development.",
}

export default function ResumeBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
