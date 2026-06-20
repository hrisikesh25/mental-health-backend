"use client"

import { useEffect, useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function BodyLanguageChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/bodylanguage")
        const json = await res.json()
        const chartData = json.balanceScore.map((score: number, i: number) => ({
          time: `${i}h`,
          balance: score,
          activity: json.activityLevel[i],
        }))
        setData(chartData)
      } catch (error) {
        console.error("Error fetching body language:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="Body Language Monitoring" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
          <Legend />
          <Area type="monotone" dataKey="balance" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          <Area type="monotone" dataKey="activity" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
