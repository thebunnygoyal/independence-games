"use client"

import { TrendingUp, Users, UserCheck, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Referrals",
    value: "1,247",
    change: "+12%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Total Visitors",
    value: "89",
    change: "+8%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Attendance Rate",
    value: "96.5%",
    change: "+2.1%",
    icon: UserCheck,
    color: "text-[#D32F2F]",
  },
  {
    title: "Active Members",
    value: "203",
    change: "+5",
    icon: Award,
    color: "text-[#FFC107]",
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} from last week</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
