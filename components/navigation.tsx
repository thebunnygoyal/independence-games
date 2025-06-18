"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Trophy, LayoutDashboard, Users, Settings, Users2, HelpCircle, Menu, X, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const routes = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/chapters", label: "Chapters", icon: Users },
  { path: "/scoring", label: "Scoring", icon: Trophy },
  { path: "/admin", label: "Admin", icon: Settings },
  { path: "/team", label: "Team", icon: Users2 },
  { path: "/help", label: "Help", icon: HelpCircle },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [syncStatus] = useState<"connected" | "syncing" | "error">("connected")

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-[#D32F2F]" />
            <span className="text-xl font-bold text-gray-900">BNI GameTracker Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {routes.map((route) => {
              const Icon = route.icon
              const isActive = pathname === route.path
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "text-[#D32F2F] bg-red-50" : "text-gray-600 hover:text-[#D32F2F] hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{route.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Sync Status */}
            <div className="flex items-center space-x-2">
              {syncStatus === "connected" && <Wifi className="h-4 w-4 text-green-500" />}
              {syncStatus === "syncing" && <Wifi className="h-4 w-4 text-yellow-500 animate-pulse" />}
              {syncStatus === "error" && <WifiOff className="h-4 w-4 text-red-500" />}
              <Badge variant={syncStatus === "connected" ? "default" : "destructive"}>
                {syncStatus === "connected" ? "Synced" : syncStatus === "syncing" ? "Syncing..." : "Error"}
              </Badge>
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Captain
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {routes.map((route) => {
                const Icon = route.icon
                const isActive = pathname === route.path
                return (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? "text-[#D32F2F] bg-red-50" : "text-gray-600 hover:text-[#D32F2F] hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
