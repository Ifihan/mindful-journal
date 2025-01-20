import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = "Generate a thoughtful journal prompt for self-reflection:"
    const result = await model.generateContent(prompt)
    const response = await result.response
    const generatedPrompt = response.text()

    return NextResponse.json({ prompt: generatedPrompt.trim() })
  } catch (error) {
    console.error("Error generating prompt:", error)
    return NextResponse.json({ error: "Error generating prompt" }, { status: 500 })
  }
}

