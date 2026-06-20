"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { ChevronDown } from "lucide-react"

interface PermissionManagerProps {
  charts: Array<{ id: string; title: string }>
  permissions: Record<string, boolean>
  onPermissionChange: (chartId: string, enabled: boolean) => void
}

export default function PermissionManager({ charts, permissions, onPermissionChange }: PermissionManagerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Count how many permissions are enabled
  const enabledCount = Object.values(permissions).filter(Boolean).length-1

  const totalMetrics = charts.length

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">Data Collection Settings</h3>
          {/* Shows correct count based on actual charts array */}
          <span className="text-sm text-gray-600">
            {enabledCount} of {totalMetrics} data collection
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200"
          >
            <div className="px-6 py-4 space-y-3 bg-gray-50">
              <p className="text-sm text-gray-600 mb-4">
                Enable or disable continuous data collection for each metric. Data is collected in real-time when
                enabled.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {charts.map((chart) => (
                  <div
                    key={chart.id}
                    className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
                  >
                    <label className="text-sm font-medium text-gray-700 cursor-pointer">{chart.title}</label>
                    <Switch
                      checked={permissions[chart.id] !== false}
                      onCheckedChange={(checked) => onPermissionChange(chart.id, checked)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
