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

export default function HeartRateChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          throw new Error("API URL not found. Please set NEXT_PUBLIC_API_URL in .env.local")
        }

        const res = await fetch(`${apiUrl}/api/healthdata`, {
          headers: { "Content-Type": "application/json" },
        })

        const text = await res.text()
        let json
        try {
          json = JSON.parse(text)
        } catch {
          console.error("Invalid JSON response:", text)
          throw new Error("Invalid JSON received from backend")
        }

        const chartData = json.heartRate.map((hr: number, i: number) => ({
          time: `${i + 1}h`,
          heartRate: hr,
          sleep: json.sleep[i],
          hrv: json.hrv[i],
        }))

        setData(chartData)
      } catch (error) {
        console.error("Error fetching health data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="Heart Rate, Sleep & HRV Trends" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
          <Legend />

          {/* ❤️ Heart Rate */}
          <Line type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} dot={false} />

          {/* 😴 Sleep */}
          <Line type="monotone" dataKey="sleep" stroke="#3b82f6" strokeWidth={2} dot={false} />

          {/* 💓 HRV */}
          <Line type="monotone" dataKey="hrv" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
