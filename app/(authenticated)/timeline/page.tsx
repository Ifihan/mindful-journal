"use client"

import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getEntries } from "@/lib/api"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function TimelinePage() {
  interface Entry {
    createdAt: string;
    mood: number;
  }

  const [entries, setEntries] = useState<Entry[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getEntries()
      setEntries(data)
    }
    fetchEntries()
  }, [])

  const chartData = {
    labels: entries.map((entry) => new Date(entry.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Mood",
        data: entries.map((entry) => entry.mood),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: "Mood",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Mood Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  )
}

