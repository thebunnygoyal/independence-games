"use client"

import { useState } from "react"
import { Users, UserCheck, UserX, Plus, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const chapters = [
  { id: 1, name: "INCREDIBLEZ", memberCount: 25, captain: "John Doe", coach: "Alice Johnson" },
  { id: 2, name: "KNIGHTZ", memberCount: 28, captain: "Jane Smith", coach: "Bob Wilson" },
  { id: 3, name: "ETERNAL", memberCount: 22, captain: "Mike Johnson", coach: "Carol Davis" },
  { id: 4, name: "CELEBRATIONS", memberCount: 26, captain: "Sarah Wilson", coach: "David Brown" },
  { id: 5, name: "OPULANCE", memberCount: 24, captain: "David Brown", coach: "Eva Miller" },
  { id: 6, name: "EPIC", memberCount: 23, captain: "Lisa Davis", coach: "Frank Taylor" },
  { id: 7, name: "VICTORY", memberCount: 25, captain: "Tom Miller", coach: "Grace Lee" },
  { id: 8, name: "ACHIEVERZ", memberCount: 21, captain: "Amy Taylor", coach: "Henry Clark" },
]

const mockMembers = [
  { id: 1, name: "Rajesh Kumar", role: "Member", referrals: 12, visitors: 3, attendance: 95, coins: 450 },
  { id: 2, name: "Priya Sharma", role: "President", referrals: 10, visitors: 4, attendance: 100, coins: 420 },
  { id: 3, name: "Amit Patel", role: "Vice President", referrals: 11, visitors: 2, attendance: 90, coins: 390 },
  { id: 4, name: "Sneha Gupta", role: "Secretary", referrals: 9, visitors: 3, attendance: 95, coins: 380 },
  { id: 5, name: "Vikram Singh", role: "Member", referrals: 8, visitors: 4, attendance: 85, coins: 360 },
]

export function ChapterManagement() {
  const [selectedChapter, setSelectedChapter] = useState<string>("")
  const selectedChapterData = chapters.find((c) => c.id.toString() === selectedChapter)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chapter Management</h1>
          <p className="text-gray-600 mt-2">Manage your chapter members and track their performance</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#D32F2F] hover:bg-[#B71C1C]">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Chapter Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Chapter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chapter</label>
              <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id.toString()}>
                      {chapter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedChapterData && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Captain</label>
                  <div className="p-2 bg-gray-50 rounded border">{selectedChapterData.captain}</div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Coach</label>
                  <div className="p-2 bg-gray-50 rounded border">{selectedChapterData.coach}</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chapter Stats */}
      {selectedChapterData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-[#D32F2F]" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold">{selectedChapterData.memberCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Members</p>
                  <p className="text-2xl font-bold">{selectedChapterData.memberCount - 2}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <UserX className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive Members</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-[#FFC107]" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                  <p className="text-2xl font-bold">96.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Member Roster */}
      {selectedChapterData && (
        <Card>
          <CardHeader>
            <CardTitle>Member Roster - {selectedChapterData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Visitors</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Coins</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <Badge variant={member.role === "Member" ? "secondary" : "default"}>{member.role}</Badge>
                    </TableCell>
                    <TableCell>{member.referrals}</TableCell>
                    <TableCell>{member.visitors}</TableCell>
                    <TableCell>
                      <span
                        className={
                          member.attendance >= 95
                            ? "text-green-600"
                            : member.attendance >= 90
                              ? "text-yellow-600"
                              : "text-red-600"
                        }
                      >
                        {member.attendance}%
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">{member.coins}</TableCell>
                    <TableCell>
                      <Badge variant={member.attendance >= 95 ? "default" : "destructive"}>
                        {member.attendance >= 95 ? "Active" : "At Risk"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
