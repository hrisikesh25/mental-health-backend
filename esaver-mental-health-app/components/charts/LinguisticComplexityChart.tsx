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

export default function LinguisticComplexityChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/linguistic-complexity")
        const json = await res.json()
        const chartData = json.data.map((item: any, i: number) => ({
          entry: `Entry ${i + 1}`,
          vocabularyRichness: item.vocabularyRichness,
          sentenceVariation: item.sentenceVariation,
          complexity: item.complexity,
        }))
        setData(chartData)
      } catch (error) {
        console.error("Error fetching linguistic data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData() // ✅ Only fetch once (no refresh interval)
  }, [])

  return (
    <ChartCard title="Linguistic Complexity" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="entry" stroke="#000" tick={{ fontSize: 12 }} />
          <YAxis stroke="#000" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }}
            labelStyle={{ color: "#000" }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "12px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          />
          <Line
            type="monotone"
            dataKey="vocabularyRichness"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={false}
            name="Vocabulary Richness"
          />
          <Line
            type="monotone"
            dataKey="sentenceVariation"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={false}
            name="Sentence Variation"
          />
          <Line
            type="monotone"
            dataKey="complexity"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={false}
            name="Complexity"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
