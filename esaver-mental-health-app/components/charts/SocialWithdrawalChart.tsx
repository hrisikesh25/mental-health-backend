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

export default function SocialWithdrawalChart({ refreshKey }: { refreshKey?: number }) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/social-withdrawal")
        const json = await res.json()
        const chartData = json.data.map((item: any, i: number) => ({
          time: `Day ${i + 1}`,
          calls: item.calls,
          texts: item.texts,
          frequency: item.frequency,
        }))
        setData(chartData)
      } catch (error) {
        console.error("Error fetching social withdrawal data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey])

  return (
    <ChartCard title="Social Withdrawal (Calls & Texts)" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 25, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#000" tick={{ fontSize: 12 }} interval={0} />
          <YAxis stroke="#000" tick={{ fontSize: 13 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "12px",
              fontSize: "16px", // 🔥 increased legend font size
              fontWeight: "600",
            }}
          />
          <Line
            type="monotone"
            dataKey="calls"
            stroke="#e11d48"
            strokeWidth={2}
            dot={false}
            name="Calls"
          />
          <Line
            type="monotone"
            dataKey="texts"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={false}
            name="Texts"
          />
          <Line
            type="monotone"
            dataKey="frequency"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            name="Frequency"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
