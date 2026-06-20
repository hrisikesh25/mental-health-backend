"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function ContentWatchingChart({ refreshTrigger }: { refreshTrigger: number }) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/content-watching")
      const json = await res.json()
      const chartData = json.data.map((item: any) => ({
        content: item.contentType,
        duration: item.duration,
        engagement: item.engagement,
      }))
      setData(chartData)
    } catch (error) {
      console.error("Error fetching content watching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // fetch only when the global refreshTrigger changes
  useEffect(() => {
    fetchData()
  }, [refreshTrigger])

  return (
    <ChartCard title="Content Watching (Music/Video)" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="content" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
          <Legend />
          <Bar dataKey="duration" fill="#8b5cf6" name="Duration (mins)" />
          <Bar dataKey="engagement" fill="#3b82f6" name="Engagement %" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
