"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import ChartCard from "../ChartCard"

export default function StressDataChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [verdict, setVerdict] = useState("")
  const [stressScore, setStressScore] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          throw new Error("API URL not found. Please set NEXT_PUBLIC_API_URL in .env.local")
        }

        const res = await fetch(`${apiUrl}/api/stressdata`, {
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
          throw new Error(`Failed to fetch stress data: ${res.statusText}`)
        }

        const json = await res.json()
        setStressScore(json.stressScore)

        const chartData = json.predicted.map((pred: number, i: number) => ({
          time: `${i + 1}h`,
          predicted: pred,
          actual: json.actual[i],
        }))
        setData(chartData)

        // Determine verdict based on stress score
        if (json.stressScore < 0.4) {
          setVerdict("You're calm and balanced 🌿")
        } else if (json.stressScore <= 0.7) {
          setVerdict("Moderate stress detected. Take short breaks 💆‍♀️")
        } else {
          setVerdict("High stress detected ⚠️ – please rest.")
        }
      } catch (error) {
        console.error("Error fetching stress data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="Final Stress Fusion Model" loading={loading}>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Stress Score</p>
          <p className="text-3xl font-bold text-gray-900">{(stressScore * 100).toFixed(1)}%</p>
          <p className="text-sm text-gray-700 mt-2">{verdict}</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
              labelStyle={{ color: "#000" }}
            />
            <Legend />
            <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
