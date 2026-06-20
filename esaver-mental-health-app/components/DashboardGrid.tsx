"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import VoiceEmotionChart from "./charts/VoiceEmotionChart"
import HeartRateChart from "./charts/HeartRateChart"
import FacialEmotionChart from "./charts/FacialEmotionChart"
import BodyLanguageChart from "./charts/BodyLanguageChart"
import EnvironmentChart from "./charts/EnvironmentChart"
import NoiseChart from "./charts/NoiseChart"
import EDAChart from "./charts/EDAChart"
import LocationChart from "./charts/LocationChart"
import StressDataChart from "./charts/StressDataChart"
import CCTVChart from "./charts/CCTVChart"
import PhysiologicalHealthChart from "./charts/PhysiologicalHealthChart"
import ContentWatchingChart from "./charts/ContentWatchingChart"
import SocialWithdrawalChart from "./charts/SocialWithdrawalChart"
import KeyboardSentimentChart from "./charts/KeyboardSentimentChart"
import LinguisticComplexityChart from "./charts/LinguisticComplexityChart"
import EyeMovementChart from "./charts/EyeMovementChart"
import LightExposureChart from "./charts/LightExposureChart"
import PermissionManager from "./PermissionManager"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

// ✅ All 19 chart definitions
const charts = [
  { id: "heart-rate", component: HeartRateChart, title: "Heart Rate & Sleep" },
  { id: "voice-emotion", component: VoiceEmotionChart, title: "Voice Emotion Analysis" },
  { id: "facial-emotion", component: FacialEmotionChart, title: "Facial Emotion Recognition" },
  { id: "body-language", component: BodyLanguageChart, title: "Body Language Monitoring" },
  { id: "environment", component: EnvironmentChart, title: "Environmental Context" },
  { id: "noise", component: NoiseChart, title: "Noise & Air Quality" },
  { id: "eda", component: EDAChart, title: "Electrodermal Activity" },
  { id: "location", component: LocationChart, title: "Location & Movement" },
  { id: "physiological-health", component: PhysiologicalHealthChart, title: "Physiological Health Metrics" },
  { id: "content-watching", component: ContentWatchingChart, title: "Content Watching (Music/Video)" },
  { id: "social-withdrawal", component: SocialWithdrawalChart, title: "Social Withdrawal (Calls & Texts)" },
  { id: "keyboard-sentiment", component: KeyboardSentimentChart, title: "Keyboard Sentiment Detection" },
  { id: "linguistic-complexity", component: LinguisticComplexityChart, title: "Linguistic Complexity" },
  { id: "eye-movement", component: EyeMovementChart, title: "Eye Movement Tracking" },
  { id: "light-exposure", component: LightExposureChart, title: "Light Exposure & Circadian Rhythm" },
  { id: "cctv", component: CCTVChart, title: "CCTV / Body Language Stress" },
  { id: "stress-data", component: StressDataChart, title: "Final Stress Fusion Model" },
  
]

export default function DashboardGrid() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})

  // ✅ Initialize permissions (auto-enable all 19 metrics on first load)
  useEffect(() => {
    const savedPermissions = localStorage.getItem("permissions")

    if (savedPermissions) {
      setPermissions(JSON.parse(savedPermissions))
    } else {
      const defaultPermissions: Record<string, boolean> = {}
      charts.forEach((chart) => {
        defaultPermissions[chart.id] = true
      })
      setPermissions(defaultPermissions)
      localStorage.setItem("permissions", JSON.stringify(defaultPermissions))
    }
  }, [])

  // ✅ Refresh button handler
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  // ✅ Toggle switch handler
  const handlePermissionChange = (chartId: string, enabled: boolean) => {
    const updated = { ...permissions, [chartId]: enabled }
    setPermissions(updated)
    localStorage.setItem("permissions", JSON.stringify(updated))
  }

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Health Metrics</h2>
        <Button
          onClick={handleRefresh}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh All Data
        </Button>
      </div>

      {/* Permission Manager section (19 metrics) */}
      <PermissionManager charts={charts} permissions={permissions} onPermissionChange={handlePermissionChange} />

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => {
          const ChartComponent = chart.component
          const isEnabled = permissions[chart.id] !== false

          if (!isEnabled) return null

          return (
            <motion.div
              key={`${chart.id}-${refreshKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ChartComponent />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
