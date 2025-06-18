"use client"

import { useState } from "react"
import { Settings, Users, Calendar, AlertTriangle, Download, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-12-18 14:30:00",
    user: "John Doe",
    action: "Updated weekly data",
    chapter: "INCREDIBLEZ",
    status: "success",
  },
  {
    id: 2,
    timestamp: "2024-12-18 14:25:00",
    user: "Jane Smith",
    action: "Added new member",
    chapter: "KNIGHTZ",
    status: "success",
  },
  {
    id: 3,
    timestamp: "2024-12-18 14:20:00",
    user: "Mike Johnson",
    action: "Synced Google Sheets",
    chapter: "ETERNAL",
    status: "success",
  },
  {
    id: 4,
    timestamp: "2024-12-18 14:15:00",
    user: "Sarah Wilson",
    action: "Disputed score calculation",
    chapter: "CELEBRATIONS",
    status: "pending",
  },
  {
    id: 5,
    timestamp: "2024-12-18 14:10:00",
    user: "System",
    action: "Automated backup",
    chapter: "All",
    status: "success",
  },
]

const gameSettings = {
  startDate: "2025-06-17",
  endDate: "2025-08-01",
  referralCoins: 1,
  visitorCoins: 50,
  absenceCoins: -10,
  testimonialCoins: 5,
  trainingCoins: 25,
}

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users")
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

  const handleSync = () => {
    setSyncStatus("syncing")
    setTimeout(() => {
      setSyncStatus("success")
      setTimeout(() => setSyncStatus("idle"), 2000)
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage users, settings, and monitor system activity</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSync} disabled={syncStatus === "syncing"} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${syncStatus === "syncing" ? "animate-spin" : ""}`} />
            {syncStatus === "syncing" ? "Syncing..." : "Force Sync"}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">Game Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Captains & Coaches</h3>
                  <Button className="bg-[#D32F2F] hover:bg-[#B71C1C]">Add User</Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Chapter</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>
                        <Badge>Captain</Badge>
                      </TableCell>
                      <TableCell>INCREDIBLEZ</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>2024-12-18 14:30</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Alice Johnson</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Coach</Badge>
                      </TableCell>
                      <TableCell>INCREDIBLEZ</TableCell>
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>2024-12-18 13:45</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Game Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="startDate">Game Start Date</Label>
                    <Input id="startDate" type="date" value={gameSettings.startDate} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Game End Date</Label>
                    <Input id="endDate" type="date" value={gameSettings.endDate} className="mt-1" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Coin Values</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="referralCoins">Referral Coins</Label>
                      <Input id="referralCoins" type="number" value={gameSettings.referralCoins} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="visitorCoins">Visitor Coins</Label>
                      <Input id="visitorCoins" type="number" value={gameSettings.visitorCoins} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="absenceCoins">Absence Penalty</Label>
                      <Input id="absenceCoins" type="number" value={gameSettings.absenceCoins} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="testimonialCoins">Testimonial Coins</Label>
                      <Input
                        id="testimonialCoins"
                        type="number"
                        value={gameSettings.testimonialCoins}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button className="bg-[#D32F2F] hover:bg-[#B71C1C]">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Audit Log</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Chapter</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.chapter}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.status === "success"
                              ? "default"
                              : log.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Dispute Resolution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Score Calculation Dispute</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        CELEBRATIONS chapter disputes visitor count for Week 3
                      </p>
                      <p className="text-xs text-gray-500 mt-2">Submitted by: Sarah Wilson • 2024-12-18 14:15</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                      <Button size="sm" className="bg-[#D32F2F] hover:bg-[#B71C1C]">
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No other disputes pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
