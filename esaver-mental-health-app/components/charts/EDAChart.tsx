"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function EDAChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/eda")
        const json = await res.json()
        const chartData = json.conductance.map((cond: number, i: number) => ({
          time: `${i}h`,
          conductance: cond,
        }))
        setData(chartData)
      } catch (error) {
        console.error("Error fetching EDA:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="Electrodermal Activity (EDA)" loading={loading}>
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
          <Line type="monotone" dataKey="conductance" stroke="#06b6d4" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
