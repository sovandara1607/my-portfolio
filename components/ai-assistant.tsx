"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const SUGGESTED = [
  "What projects have you built?",
  "What's your tech stack?",
  "How can I contact you?",
  "Tell me about your experience.",
]

const EASE = [0.22, 1, 0.36, 1] as const

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

export function AIAssistant() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]     = useState("")
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const send = async (text: string) => {
    if (!text.trim() || loading) return

    const next: Message[] = [...messages, { role: "user", content: text }]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json() as { reply?: string; error?: string }
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.reply ?? data.error ?? "Sorry, something went wrong." },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="fixed bottom-24 right-6 z-[150] flex flex-col items-end gap-3">
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="glass-card w-[340px] sm:w-[380px] shadow-[0_16px_50px_rgba(49,49,49,0.15)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-muted/30 shrink-0">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground font-[family-name:var(--font-space-grotesk)]">Ask about Sovandara</p>
                <p className="text-[10px] text-muted-foreground font-mono">Powered by Gemini</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-hide font-[family-name:var(--font-inter)]">
              {messages.length === 0 && !loading ? (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground text-center py-2">
                    Ask me anything about Sovandara&apos;s skills, projects, or experience.
                  </p>
                  <div className="space-y-1.5">
                    {SUGGESTED.map(q => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="w-full text-left text-xs px-3 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-150 font-[family-name:var(--font-space-grotesk)]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] text-xs leading-relaxed px-3 py-2 rounded-2xl ${
                          m.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-bl-sm">
                        <TypingDots />
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 px-3 py-2.5 border-t border-border bg-background/50 shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none font-[family-name:var(--font-inter)]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-7 h-7 flex items-center justify-center bg-primary text-primary-foreground rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0"
                aria-label="Send"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(243,128,32,0.35)] hover:bg-primary/90 hover:shadow-[0_4px_24px_rgba(243,128,32,0.45)] transition-all duration-200 flex items-center justify-center"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
