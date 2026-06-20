"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">Esaver</h1>
          <p className="text-xl text-white/90 mb-2">Your Mental Health Companion</p>
          <p className="text-white/70 mb-8">Track your wellbeing with AI-powered insights.</p>

          <div className="flex flex-col gap-4">
            <Link href="/login" className="w-full">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Login</Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button variant="outline" className="w-full border-white text-white hover:bg-white/10 bg-transparent">
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
