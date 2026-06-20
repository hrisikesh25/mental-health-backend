"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import ChartCard from "../ChartCard"

export default function CCTVChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [bodyTension, setBodyTension] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cctv")
        const json = await res.json()
        setBodyTension(json.bodyTension)
        const chartData = json.trend.map((t: number, i: number) => ({
          time: `${i}h`,
          tension: t,
        }))
        setData(chartData)
      } catch (error) {
        console.error("Error fetching CCTV:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="CCTV / Body Language Stress Score" loading={loading}>
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Current Body Tension</p>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">{(bodyTension * 100).toFixed(1)}%</p>
            <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-full transition-all"
                style={{ width: `${bodyTension * 100}%` }}
              />
            </div>
          </div>
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
            <Line type="monotone" dataKey="tension" stroke="#f97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
