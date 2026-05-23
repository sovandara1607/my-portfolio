import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MyFinance | Case Study | Sovandara Rith",
  description:
    "MyFinance — a SwiftUI iOS app for tracking income, expenses, and budgets with charts and insights.",
}

export default function MyfinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
