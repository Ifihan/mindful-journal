"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { createEntry } from "@/lib/api"

export default function JournalPage() {
  const [content, setContent] = useState("")
  const [mood, setMood] = useState(5)
  const [prompt, setPrompt] = useState("")

  useEffect(() => {
    fetchPrompt()
  }, [])

  const fetchPrompt = async () => {
    try {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPrompt(data.prompt)
    } catch (error) {
      console.error("Error fetching prompt:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createEntry({ content, mood })
      setContent("")
      setMood(5)
      alert("Journal entry saved successfully!")
    } catch (error) {
      console.error("Error saving journal entry:", error)
      alert("Error saving journal entry. Please try again.")
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Today's Journal Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">How are you feeling today?</label>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(Number.parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs">
              <span>😢</span>
              <span>😐</span>
              <span>😊</span>
            </div>
          </div>
          {prompt && (
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm font-medium text-blue-800">{prompt}</p>
            </div>
          )}
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-[200px]"
          />
          <Button type="submit">Save Entry</Button>
        </form>
      </CardContent>
    </Card>
  )
}

