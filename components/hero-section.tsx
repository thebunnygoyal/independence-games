"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-08-01T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          BNI Independence Games
          <span className="block text-[#D32F2F]">2.0</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your chapter's progress in the ultimate BNI competition. Bonding • Business • Growth
        </p>
      </div>

      {/* Countdown Timer */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="h-5 w-5 text-[#D32F2F]" />
            <span className="text-sm font-medium text-gray-600">Games End: August 1, 2025</span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="bg-[#D32F2F] text-white rounded-lg p-4 mb-2">
                  <div className="text-2xl md:text-3xl font-bold">{item.value.toString().padStart(2, "0")}</div>
                </div>
                <div className="text-sm font-medium text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Period */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <Clock className="h-4 w-4" />
        <span>Game Period: June 17 - August 1, 2025 (6 Weeks)</span>
      </div>
    </div>
  )
}
