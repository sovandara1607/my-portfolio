import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ESP32 Web Server | Case Study | Sovandara Rith",
  description: "Building a web-based IoT controller for ESP32 hardware with real-time monitoring",
}

export default function ESP32Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
