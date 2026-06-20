"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function PhysiologicalHealthChart({ refreshKey }: { refreshKey: number }) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL not found in .env.local")

        const res = await fetch(`${apiUrl}/api/physiological-health`, {
          headers: { "Content-Type": "application/json" },
        })
        const json = await res.json()

        const chartData = json.data.map((item: any, i: number) => ({
          time: `${i + 1}h`,
          temperature: item.temperature,
          spo2: item.spo2,
          steps: item.steps,
          breathingRate: item.breathingRate,
        }))
        setData(chartData)
      } catch (error) {
        console.error("Error fetching physiological data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey])

  return (
    <ChartCard title="Physiological Health Metrics" loading={loading}>
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
          <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} dot={false} name="Body Temp (°C)" />
          <Line type="monotone" dataKey="spo2" stroke="#0ea5e9" strokeWidth={2} dot={false} name="SpO₂ (%)" />
          <Line type="monotone" dataKey="steps" stroke="#10b981" strokeWidth={2} dot={false} name="Steps" />
          <Line type="monotone" dataKey="breathingRate" stroke="#f59e0b" strokeWidth={2} dot={false} name="Breathing Rate" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
