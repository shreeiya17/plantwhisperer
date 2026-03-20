# 🌿 PlantWhisperer

> Your AI-powered plant expert — identify species, diagnose problems, and become a better plant parent.

🔗 **Live Demo**: [plantwhisperer.vercel.app](https://plantwhisperer.vercel.app)

---

## Why I built this

I wanted to build something genuinely useful — not a generic chat wrapper. 
PlantWhisperer is purpose-built for plant parents: every design decision, 
every prompt, every UI detail is designed around the plant care experience.

---

## What it does

- 🔍 **Plant Identification** — Describe your plant and get instant species info
- 🩺 **Symptom Diagnosis** — Explains exactly why your plant is struggling and how to fix it
- 🌱 **Care Guidance** — Watering schedules, light needs, soil types, propagation tips
- 💬 **Conversational** — Remembers context across the conversation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| AI Model | Llama 3.3 70B via Groq API |
| Deployment | Vercel |

---

## Frontend thinking

- **First impression**: Dark botanical theme with glassmorphism and falling leaf particles — immediately communicates the product's purpose
- **Loading states**: Animated typing indicator with bouncing dots so users know the AI is thinking
- **Empty states**: Sample questions appear on first load so users know exactly what to ask
- **Error states**: Friendly error messages with no raw API errors exposed
- **Responsive**: Works on mobile and desktop
- **Markdown rendering**: AI responses render with proper headings, bold text, and bullet points

---

## Run locally
```bash
git clone https://github.com/YOUR_USERNAME/plantwhisperer
cd plantwhisperer
npm install
```

Create `.env.local`:
```
GROQ_API_KEY=your_key_here
```
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## AI Usage

Built with Cursor and Claude as AI coding assistants. Used AI to:
- Scaffold boilerplate faster
- Debug TypeScript errors
- Suggest animation approaches

All prompts were carefully reviewed — no AI slop shipped.
