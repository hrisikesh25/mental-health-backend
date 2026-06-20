"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function NoiseChart({ refreshTrigger }: { refreshTrigger: number }) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/noise")
      const json = await res.json()
      const chartData = json.decibels.map((db: number, i: number) => ({
        time: `${i}h`,
        decibels: db,
        aqi: json.aqi ? json.aqi[i] : 0,
      }))
      setData(chartData)
    } catch (error) {
      console.error("Error fetching noise:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch new data only when refreshTrigger changes
  useEffect(() => {
    fetchData()
  }, [refreshTrigger])

  return (
    <ChartCard title="Noise Level & Air Quality" loading={loading}>
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
          <Line type="monotone" dataKey="decibels" stroke="#ef4444" strokeWidth={2} dot={false} name="Noise (dB)" />
          <Line type="monotone" dataKey="aqi" stroke="#f59e0b" strokeWidth={2} dot={false} name="Air Quality Index" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
