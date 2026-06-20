"use client"

import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import ChartCard from "../ChartCard"

export default function LightExposureChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/light-exposure")
        const json = await res.json()
        const chartData = json.data.map((item: any, i: number) => ({
          time: `${i}:00`,
          lightLevel: item.lightLevel,
          circadianScore: item.circadianScore,
        }))
        setData(chartData)
      } catch (error) {
        console.error("Error fetching light exposure data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData() // ✅ Fetch once on load (no interval)
  }, [])

  return (
    <ChartCard title="Light Exposure & Circadian Rhythm" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            stroke="#000"
            tick={{ fontSize: 12 }}
          />
          <YAxis stroke="#000" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
            }}
            labelStyle={{ color: "#000" }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          />
          <Area
            type="monotone"
            dataKey="lightLevel"
            fill="#fbbf24"
            stroke="#f59e0b"
            name="Light Level (lux)"
          />
          <Area
            type="monotone"
            dataKey="circadianScore"
            fill="#3b82f6"
            stroke="#0ea5e9"
            name="Circadian Score"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
