import { GoogleGenAI } from "@google/genai"
import { NextRequest, NextResponse } from "next/server"
import { buildSystemPrompt } from "@/lib/chat-system-prompt"

const MAX_EXCHANGES = 10

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not set in .env.local" }, { status: 500 })
  }

  try {
    const { messages } = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[]
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 })
    }

    const trimmed = messages.slice(-MAX_EXCHANGES * 2)

    const ai = new GoogleGenAI({ apiKey })

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: buildSystemPrompt(),
      },
      contents: trimmed.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    })

    const reply = result.text ?? ""
    return NextResponse.json({ reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[chat route]", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
