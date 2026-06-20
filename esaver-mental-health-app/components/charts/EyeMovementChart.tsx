"use client"

import { useEffect, useState } from "react"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function EyeMovementChart({ refreshTrigger }: { refreshTrigger: number }) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/eye-movement")
      const json = await res.json()
      setData(json.data)
    } catch (error) {
      console.error("Error fetching eye movement data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch only when refreshTrigger changes
  useEffect(() => {
    fetchData()
  }, [refreshTrigger])

  return (
    <ChartCard title="Eye Movement Tracking" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="x" stroke="#000" name="X Position" />
          <YAxis dataKey="y" stroke="#000" name="Y Position" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
          <Legend />
          <Scatter name="Attention Focus" data={data} fill="#10b981" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
