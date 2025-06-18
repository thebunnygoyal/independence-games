"use client"

import { useState } from "react"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const chapterLeaderboard = [
  { rank: 1, name: "INCREDIBLEZ", coins: 8650, members: 25, captain: "John Doe", trend: "up" },
  { rank: 2, name: "KNIGHTZ", coins: 8200, members: 28, captain: "Jane Smith", trend: "up" },
  { rank: 3, name: "ETERNAL", coins: 7890, members: 22, captain: "Mike Johnson", trend: "down" },
  { rank: 4, name: "CELEBRATIONS", coins: 7650, members: 26, captain: "Sarah Wilson", trend: "up" },
  { rank: 5, name: "OPULANCE", coins: 7420, members: 24, captain: "David Brown", trend: "same" },
  { rank: 6, name: "EPIC", coins: 7200, members: 23, captain: "Lisa Davis", trend: "up" },
  { rank: 7, name: "VICTORY", coins: 6980, members: 25, captain: "Tom Miller", trend: "down" },
  { rank: 8, name: "ACHIEVERZ", coins: 6750, members: 21, captain: "Amy Taylor", trend: "up" },
]

const individualLeaderboard = [
  { rank: 1, name: "Rajesh Kumar", chapter: "INCREDIBLEZ", coins: 450, referrals: 12, visitors: 3 },
  { rank: 2, name: "Priya Sharma", chapter: "KNIGHTZ", coins: 420, referrals: 10, visitors: 4 },
  { rank: 3, name: "Amit Patel", chapter: "ETERNAL", coins: 390, referrals: 11, visitors: 2 },
  { rank: 4, name: "Sneha Gupta", chapter: "CELEBRATIONS", coins: 380, referrals: 9, visitors: 3 },
  { rank: 5, name: "Vikram Singh", chapter: "OPULANCE", coins: 360, referrals: 8, visitors: 4 },
]

export function LiveLeaderboard() {
  const [activeTab, setActiveTab] = useState("chapters")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-[#D32F2F]" />
          <span>Live Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="space-y-4">
            <div className="space-y-3">
              {chapterLeaderboard.map((chapter) => (
                <div
                  key={chapter.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    chapter.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200" : "bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {getRankIcon(chapter.rank)}
                    <div>
                      <div className="font-semibold text-gray-900">{chapter.name}</div>
                      <div className="text-sm text-gray-500">
                        Captain: {chapter.captain} • {chapter.members} members
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(chapter.trend)}
                    <Badge variant="secondary" className="animate-coin-flip">
                      {chapter.coins.toLocaleString()} coins
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="individuals" className="space-y-4">
            <div className="space-y-3">
              {individualLeaderboard.map((individual) => (
                <div
                  key={individual.rank}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    individual.rank <= 3 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200" : "bg-white"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {getRankIcon(individual.rank)}
                    <div>
                      <div className="font-semibold text-gray-900">{individual.name}</div>
                      <div className="text-sm text-gray-500">
                        {individual.chapter} • {individual.referrals} referrals • {individual.visitors} visitors
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="animate-coin-flip">
                    {individual.coins} coins
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
