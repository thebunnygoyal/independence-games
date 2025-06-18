"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Trophy, Download, FileSpreadsheet, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const chapterScores = [
  {
    name: "INCREDIBLEZ",
    coins: 8650,
    referrals: 2500,
    visitors: 3200,
    attendance: 1950,
    testimonials: 500,
    trainings: 500,
  },
  {
    name: "KNIGHTZ",
    coins: 8200,
    referrals: 2300,
    visitors: 3100,
    attendance: 1800,
    testimonials: 500,
    trainings: 500,
  },
  {
    name: "ETERNAL",
    coins: 7890,
    referrals: 2200,
    visitors: 2900,
    attendance: 1790,
    testimonials: 500,
    trainings: 500,
  },
  {
    name: "CELEBRATIONS",
    coins: 7650,
    referrals: 2100,
    visitors: 2800,
    attendance: 1750,
    testimonials: 500,
    trainings: 500,
  },
  {
    name: "OPULANCE",
    coins: 7420,
    referrals: 2000,
    visitors: 2700,
    attendance: 1720,
    testimonials: 500,
    trainings: 500,
  },
  { name: "EPIC", coins: 7200, referrals: 1900, visitors: 2600, attendance: 1700, testimonials: 500, trainings: 500 },
  {
    name: "VICTORY",
    coins: 6980,
    referrals: 1800,
    visitors: 2500,
    attendance: 1680,
    testimonials: 500,
    trainings: 500,
  },
  {
    name: "ACHIEVERZ",
    coins: 6750,
    referrals: 1700,
    visitors: 2400,
    attendance: 1650,
    testimonials: 500,
    trainings: 500,
  },
]

const individualScores = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    chapter: "INCREDIBLEZ",
    coins: 450,
    referrals: 12,
    visitors: 3,
    attendance: 95,
    testimonials: 2,
    trainings: 3,
  },
  {
    rank: 2,
    name: "Priya Sharma",
    chapter: "KNIGHTZ",
    coins: 420,
    referrals: 10,
    visitors: 4,
    attendance: 100,
    testimonials: 2,
    trainings: 2,
  },
  {
    rank: 3,
    name: "Amit Patel",
    chapter: "ETERNAL",
    coins: 390,
    referrals: 11,
    visitors: 2,
    attendance: 90,
    testimonials: 1,
    trainings: 3,
  },
  {
    rank: 4,
    name: "Sneha Gupta",
    chapter: "CELEBRATIONS",
    coins: 380,
    referrals: 9,
    visitors: 3,
    attendance: 95,
    testimonials: 2,
    trainings: 2,
  },
  {
    rank: 5,
    name: "Vikram Singh",
    chapter: "OPULANCE",
    coins: 360,
    referrals: 8,
    visitors: 4,
    attendance: 85,
    testimonials: 1,
    trainings: 3,
  },
]

const metricsBreakdown = [
  { name: "Referrals", value: 35, color: "#D32F2F" },
  { name: "Visitors", value: 40, color: "#FFC107" },
  { name: "Attendance", value: 15, color: "#4CAF50" },
  { name: "Testimonials", value: 5, color: "#2196F3" },
  { name: "Trainings", value: 5, color: "#9C27B0" },
]

export function ScoringDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scoring Dashboard</h1>
          <p className="text-gray-600 mt-2">Track individual and chapter performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="chapters">Chapter Scores</TabsTrigger>
          <TabsTrigger value="individuals">Individual Scores</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Metrics Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Scoring Metrics Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={metricsBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {metricsBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chapter Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chapterScores.slice(0, 4)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="coins" fill="#D32F2F" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-[#D32F2F]" />
                  <span>Top Chapters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chapterScores.slice(0, 3).map((chapter, index) => (
                    <div key={chapter.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-semibold">{chapter.name}</span>
                      </div>
                      <span className="font-bold text-[#D32F2F]">{chapter.coins.toLocaleString()} coins</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-[#D32F2F]" />
                  <span>Top Individuals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {individualScores.slice(0, 3).map((individual, index) => (
                    <div key={individual.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-semibold block">{individual.name}</span>
                          <span className="text-sm text-gray-600">{individual.chapter}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#D32F2F]">{individual.coins} coins</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Scores Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Chapter</TableHead>
                    <TableHead>Total Coins</TableHead>
                    <TableHead>Referrals</TableHead>
                    <TableHead>Visitors</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Testimonials</TableHead>
                    <TableHead>Trainings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chapterScores.map((chapter, index) => (
                    <TableRow key={chapter.name}>
                      <TableCell>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                  ? "bg-amber-600"
                                  : "bg-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{chapter.name}</TableCell>
                      <TableCell className="font-bold text-[#D32F2F]">{chapter.coins.toLocaleString()}</TableCell>
                      <TableCell>{chapter.referrals.toLocaleString()}</TableCell>
                      <TableCell>{chapter.visitors.toLocaleString()}</TableCell>
                      <TableCell>{chapter.attendance.toLocaleString()}</TableCell>
                      <TableCell>{chapter.testimonials}</TableCell>
                      <TableCell>{chapter.trainings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individuals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Individual Scores Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Chapter</TableHead>
                    <TableHead>Total Coins</TableHead>
                    <TableHead>Referrals</TableHead>
                    <TableHead>Visitors</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Testimonials</TableHead>
                    <TableHead>Trainings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {individualScores.map((individual) => (
                    <TableRow key={individual.name}>
                      <TableCell>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            individual.rank === 1
                              ? "bg-yellow-500"
                              : individual.rank === 2
                                ? "bg-gray-400"
                                : individual.rank === 3
                                  ? "bg-amber-600"
                                  : "bg-gray-300"
                          }`}
                        >
                          {individual.rank}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{individual.name}</TableCell>
                      <TableCell>{individual.chapter}</TableCell>
                      <TableCell className="font-bold text-[#D32F2F]">{individual.coins}</TableCell>
                      <TableCell>{individual.referrals}</TableCell>
                      <TableCell>{individual.visitors}</TableCell>
                      <TableCell>
                        <span
                          className={
                            individual.attendance >= 95
                              ? "text-green-600"
                              : individual.attendance >= 90
                                ? "text-yellow-600"
                                : "text-red-600"
                          }
                        >
                          {individual.attendance}%
                        </span>
                      </TableCell>
                      <TableCell>{individual.testimonials}</TableCell>
                      <TableCell>{individual.trainings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
