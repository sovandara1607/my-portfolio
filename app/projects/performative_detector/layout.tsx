import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Performative Detector | Case Study | Sovandara Rith",
  description: "A Python project using MediaPipe and OpenCV for computer vision to detect when you're holding a cup and plays music on Spotify",
}

export default function PerformativeDetectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
