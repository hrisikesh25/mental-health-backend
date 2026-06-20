"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface ChartCardProps {
  title: string
  loading: boolean
  children: React.ReactNode
}

export default function ChartCard({ title, loading, children }: ChartCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        children
      )}
    </motion.div>
  )
}
