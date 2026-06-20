"use client"

import { useEffect, useState } from "react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import ChartCard from "../ChartCard"

export default function FacialEmotionChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Use environment variable for API base URL
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          throw new Error("API URL not found. Please set NEXT_PUBLIC_API_URL in .env.local")
        }

        const res = await fetch(`${apiUrl}/api/facialemotion`, {
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const json = await res.json()

        setData([
          { emotion: "Joy", value: json.joy * 100 },
          { emotion: "Neutral", value: json.neutral * 100 },
          { emotion: "Fear", value: json.fear * 100 },
          { emotion: "Disgust", value: json.disgust * 100 },
          { emotion: "Surprise", value: json.surprise * 100 },
        ])
      } catch (error) {
        console.error("Error fetching facial emotion data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="Facial Emotion Recognition" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="emotion" stroke="#000" />
          <PolarRadiusAxis stroke="#000" />
          <Radar
            name="Emotion"
            dataKey="value"
            stroke="#06b6d4"
            fill="#06b6d4"
            fillOpacity={0.6}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
