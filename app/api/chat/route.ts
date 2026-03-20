import Groq from "groq-sdk"
import { NextRequest, NextResponse } from "next/server"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are PlantWhisperer, a warm and knowledgeable AI assistant specializing entirely in plants. You help plant parents with:

1. **Plant Identification**: When given a description, identify the plant species, common name, family, and origin.
2. **Symptom Diagnosis**: When a user describes problems (yellow leaves, brown tips, wilting, spots, etc.), diagnose the issue and provide clear step-by-step treatment advice.
3. **Plant Care**: Answer questions about watering schedules, sunlight needs, soil types, fertilizing, repotting, and propagation.
4. **Plant Discovery**: Help users find the right plant for their space, lifestyle, and experience level.

Your personality:
- Warm, encouraging, and never condescending
- Specific and actionable — don't say "water regularly", say "water every 7-10 days when the top 2 inches of soil are dry"
- Use plant emojis occasionally 🌿
- If asked about something unrelated to plants, kindly redirect: "I'm specialized in plants — but I'd love to help you with your green friends!"

Format responses with clear sections when appropriate. Keep responses concise but complete.`

type Message = {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((msg: Message) => ({
          role: msg.role,
          content: msg.content,
        })),
      ],
      max_tokens: 1024,
      temperature: 0.7,
    })

    const message = response.choices[0]?.message?.content || ""

    return NextResponse.json({ message })

  } catch (error) {
    console.error("PlantWhisperer API Error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}