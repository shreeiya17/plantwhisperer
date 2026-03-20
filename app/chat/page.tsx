"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Send, ArrowLeft, Leaf, RotateCcw } from "lucide-react"
import ReactMarkdown from "react-markdown"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

// ---- Typing Indicator ----
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-end gap-2 mb-4"
    >
      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-sm flex-shrink-0">
        🌿
      </div>
      <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-green-400 rounded-full"
              animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ---- Message Bubble ----
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-end gap-2 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold
        ${isUser
          ? "bg-green-500 text-black"
          : "bg-green-500/10 border border-green-500/20"
        }`}
      >
        {isUser ? "U" : "🌿"}
      </div>
      <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed
  ${isUser
    ? "bg-green-500 text-black font-medium rounded-br-sm"
    : "glass text-green-100/90 rounded-bl-sm border-green-500/10"
  }`}
>
  {isUser ? message.content : (
    <ReactMarkdown
      components={{
        h1: ({children}) => <h1 className="text-green-300 font-bold text-base mb-2 mt-3 first:mt-0">{children}</h1>,
        h2: ({children}) => <h2 className="text-green-300 font-bold text-base mb-2 mt-3 first:mt-0">{children}</h2>,
        h3: ({children}) => <h3 className="text-green-400 font-semibold text-sm mb-2 mt-3 first:mt-0 uppercase tracking-wide">{children}</h3>,
        p: ({children}) => <p className="mb-2 last:mb-0 text-green-100/80">{children}</p>,
        strong: ({children}) => <strong className="text-green-300 font-semibold">{children}</strong>,
        ul: ({children}) => <ul className="mb-2 space-y-1">{children}</ul>,
        ol: ({children}) => <ol className="mb-2 space-y-1 list-none counter-reset-none">{children}</ol>,
        li: ({children}) => (
          <li className="flex items-start gap-2 text-green-100/80">
            <span className="text-green-500 mt-0.5 flex-shrink-0">▸</span>
            <span>{children}</span>
          </li>
        ),
        code: ({children}) => <code className="bg-green-900/40 text-green-300 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>,
        hr: () => <hr className="border-green-900/40 my-3" />,
      }}
    >
      {message.content}
    </ReactMarkdown>
  )}
</div>
    </motion.div>
  )
}

const SAMPLE_QUESTIONS = [
  "Why are my monstera leaves turning yellow?",
  "How often should I water a succulent?",
  "What's a good plant for low light?",
  "My plant has brown tips — what's wrong?",
]

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hi! I'm PlantWhisperer 🌿 Your personal plant expert. Ask me anything about identifying plants, diagnosing problems, or caring for your green friends!",
}

// ---- Main Chat Page ----
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error)

      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
      }])
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-screen mesh-bg text-white relative overflow-hidden">

      {/* Subtle leaf particles */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        {["5%","25%","50%","75%","90%"].map((left, i) => (
          <div key={i} className="leaf" style={{
            left,
            fontSize: "11px",
            animationDuration: `${14 + i * 3}s, ${9 + i * 2}s`,
            animationDelay: `${i * 4}s`,
          }}>🍃</div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 glass border-b border-green-900/30 px-4 py-3 flex items-center gap-3 flex-shrink-0">
        <Link href="/" className="p-2 hover:bg-green-500/10 rounded-full transition-colors">
          <ArrowLeft size={17} className="text-green-400" />
        </Link>
        <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          🌿
        </div>
        <div>
          <h1 className="font-semibold text-green-300 text-sm">PlantWhisperer</h1>
          <p className="text-xs text-green-500/60 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Online — ready to help
          </p>
        </div>
        <button
          onClick={() => setMessages([WELCOME])}
          className="ml-auto flex items-center gap-1.5 text-xs text-green-500/60 hover:text-green-400 glass px-3 py-1.5 rounded-full transition-all hover:border-green-500/30"
        >
          <RotateCcw size={11} /> New chat
        </button>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 max-w-2xl w-full mx-auto">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        <AnimatePresence>
          {isLoading && <TypingIndicator />}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-400 text-sm py-2 bg-red-500/10 border border-red-500/20 rounded-xl mb-4"
          >
            {error}
          </motion.div>
        )}

        {/* Sample questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <p className="text-xs text-green-500/40 mb-3 text-center uppercase tracking-widest">Try asking</p>
            <div className="flex flex-col gap-2">
              {SAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm text-green-300/70 hover:text-green-300 glass hover:border-green-500/30 px-4 py-3 rounded-xl transition-all hover:translate-x-1"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="relative z-10 glass border-t border-green-900/30 px-4 py-3 flex-shrink-0">
        <div className="max-w-2xl mx-auto flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your plant..."
            rows={1}
            className="flex-1 resize-none bg-white/5 border border-green-900/40 focus:border-green-500/40 rounded-2xl px-4 py-3 text-sm text-green-100 placeholder-green-500/30 focus:outline-none focus:ring-1 focus:ring-green-500/20 transition-all"
            style={{ maxHeight: "120px" }}
            onInput={(e) => {
              const t = e.target as HTMLTextAreaElement
              t.style.height = "auto"
              t.style.height = t.scrollHeight + "px"
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 bg-green-500 hover:bg-green-400 disabled:bg-green-500/20 disabled:cursor-not-allowed text-black font-bold rounded-full flex items-center justify-center transition-all active:scale-95 hover:scale-105 glow-btn flex-shrink-0"
          >
            {isLoading
              ? <Leaf size={15} className="animate-spin text-green-300" />
              : <Send size={15} />
            }
          </button>
        </div>
        <p className="text-center text-xs text-green-500/20 mt-2">
          PlantWhisperer · Powered by AI
        </p>
      </div>
    </div>
  )
}