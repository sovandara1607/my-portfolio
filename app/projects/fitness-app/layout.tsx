import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Track Your Fitness | Case Study | Sovandara Rith",
  description: "A deep dive into building a modern fitness tracking application with React Native and Expo",
}

export default function FitnessAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
