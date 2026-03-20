"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Search, Bug, Leaf } from "lucide-react"
import { useEffect, useState } from "react"

// ---- Floating Leaves Background ----
function FloatingLeaves() {
  const leaves = [
    { left: "5%",  delay: 0,   duration: 12, size: 14 },
    { left: "15%", delay: 2,   duration: 16, size: 18 },
    { left: "25%", delay: 5,   duration: 14, size: 12 },
    { left: "35%", delay: 1,   duration: 18, size: 16 },
    { left: "45%", delay: 7,   duration: 13, size: 20 },
    { left: "55%", delay: 3,   duration: 15, size: 14 },
    { left: "65%", delay: 9,   duration: 17, size: 12 },
    { left: "75%", delay: 4,   duration: 14, size: 18 },
    { left: "85%", delay: 6,   duration: 16, size: 16 },
    { left: "92%", delay: 8,   duration: 12, size: 14 },
    { left: "10%", delay: 11,  duration: 19, size: 10 },
    { left: "50%", delay: 13,  duration: 15, size: 22 },
  ]

  return (
    <>
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="leaf"
          style={{
            left: leaf.left,
            top: "-30px",
            fontSize: `${leaf.size}px`,
            animationDuration: `${leaf.duration}s, ${leaf.duration * 0.6}s`,
            animationDelay: `${leaf.delay}s, ${leaf.delay}s`,
          }}
        >
          {i % 3 === 0 ? "🍃" : i % 3 === 1 ? "🌿" : "☘️"}
        </div>
      ))}
    </>
  )
}

// ---- Animated Counter ----
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const step = target / 60
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 25)
    return () => clearInterval(timer)
  }, [target])
  return <span>{count.toLocaleString()}{suffix}</span>
}

const features = [
  {
    icon: Search,
    title: "Identify Any Plant",
    description: "Describe your plant and instantly know the species, family, origin, and everything about it.",
    stat: "300K+",
    statLabel: "plant species",
  },
  {
    icon: Bug,
    title: "Diagnose Problems",
    description: "Yellow leaves? Brown tips? Get expert diagnosis and a step-by-step treatment plan.",
    stat: "95%",
    statLabel: "accuracy rate",
    featured: true,
  },
  {
    icon: Leaf,
    title: "Care Guidance",
    description: "Personalized watering schedules, light requirements, and seasonal care tips.",
    stat: "24/7",
    statLabel: "always available",
  },
]

const sampleQuestions = [
  "Why are my monstera leaves turning yellow?",
  "What plant thrives in a dark bathroom?",
  "How do I propagate pothos?",
  "My succulent is turning mushy — help!",
]

export default function HomePage() {
  return (
    <div className="min-h-screen mesh-bg text-white relative overflow-hidden">
      <FloatingLeaves />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-green-900/30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-green-300 text-lg tracking-tight">PlantWhisperer</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/chat"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-full text-sm transition-all glow-btn hover:scale-105 active:scale-95"
            >
              Start chatting <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 pt-36 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-green-300 mb-8 border border-green-500/20"
          >
            <Sparkles size={13} className="text-green-400" />
            AI-Powered Plant Expert
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-[1.05] tracking-tight"
          >
            <span className="text-white">Talk to your</span>
            <br />
            <span className="text-green-400 text-glow">plants.</span>
            <br />
            <span className="text-white/70 text-5xl md:text-6xl">We translate.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-green-100/50 mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Identify species, diagnose problems, and become the plant parent
            your green friends deserve — powered by AI.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/chat"
              className="group flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-full text-lg font-bold transition-all glow-btn hover:scale-105 active:scale-95"
            >
              <span>🌱</span>
              Talk to a Plant
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
           
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-12 mt-16 text-center"
          >
            {[
              { value: 300000, suffix: "+", label: "Plant species" },
              { value: 50000, suffix: "+", label: "Questions answered" },
              { value: 99, suffix: "%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-green-400">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-green-500/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-5xl mx-auto mt-28 grid md:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className={`relative p-6 rounded-2xl transition-all hover:-translate-y-1 hover:border-green-500/30 cursor-default
                  ${feature.featured
                    ? "glass-strong glow-green border-green-500/30"
                    : "glass border-green-900/20"
                  }`}
              >
                {feature.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    Most asked
                  </div>
                )}
                <div className="w-11 h-11 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-green-400" />
                </div>
                <h3 className="font-semibold text-white text-base mb-2">{feature.title}</h3>
                <p className="text-green-100/40 text-sm leading-relaxed mb-4">{feature.description}</p>
                <div className="border-t border-green-900/30 pt-3 flex items-baseline gap-1">
                  <span className="text-green-400 font-bold text-lg">{feature.stat}</span>
                  <span className="text-green-500/40 text-xs">{feature.statLabel}</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sample Questions */}
        <div className="max-w-3xl mx-auto mt-24 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-green-500/40 text-xs uppercase tracking-widest mb-6"
          >
            People are asking
          </motion.p>
          <div className="flex flex-wrap gap-3 justify-center">
            {sampleQuestions.map((q, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <Link
                  href={`/chat?q=${encodeURIComponent(q)}`}
                  className="inline-block glass hover:border-green-500/30 text-green-300/70 hover:text-green-300 px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
                >
                  {q}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}