import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TaskFlow | Case Study | Sovandara Rith",
  description:
    "TaskFlow — a Flutter task management mobile app built for CS 361 — Full-Stack Development.",
}

export default function TaskflowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
