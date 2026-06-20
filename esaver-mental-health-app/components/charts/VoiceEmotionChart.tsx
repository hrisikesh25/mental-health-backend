"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function VoiceEmotionChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          throw new Error("API URL not found. Please set NEXT_PUBLIC_API_URL in .env.local")
        }

        const res = await fetch(`${apiUrl}/api/voiceemotion`, {
          headers: { "Content-Type": "application/json" },
        })

        const json = await res.json()
        setData([
          { emotion: "Calm", value: json.calm * 100 },
          { emotion: "Happy", value: json.happy * 100 },
          { emotion: "Angry", value: json.angry * 100 },
          { emotion: "Sad", value: json.sad * 100 },
        ])
      } catch (error) {
        console.error("Error fetching voice emotion:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="Voice Emotion Analysis" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="emotion" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
          <Bar dataKey="value" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
