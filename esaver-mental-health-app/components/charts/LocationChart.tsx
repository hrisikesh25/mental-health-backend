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

export default function LocationChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        if (!apiUrl) {
          throw new Error("API URL not found. Please set NEXT_PUBLIC_API_URL in .env.local")
        }

        const res = await fetch(`${apiUrl}/api/location`, {
          headers: { "Content-Type": "application/json" },
        })

        const json = await res.json()
        setLocation(json)

        const chartData = json.movement.map((m: number, i: number) => ({
          time: `${i}h`,
          distance: m,
        }))

        setData(chartData)
      } catch (error) {
        console.error("Error fetching location data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ChartCard title="Location & Movement" loading={loading}>
      <div className="space-y-4">
        {location && (
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p className="text-gray-700">
              <strong>City:</strong> {location.city}
            </p>
            <p className="text-gray-700">
              <strong>Coordinates:</strong>{" "}
              {location.coords.lat.toFixed(4)}, {location.coords.lng.toFixed(4)}
            </p>
          </div>
        )}
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
            <Line type="monotone" dataKey="distance" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
