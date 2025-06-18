import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { LiveLeaderboard } from "@/components/live-leaderboard"
import { QuickStats } from "@/components/quick-stats"
import { ActionButtons } from "@/components/action-buttons"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <HeroSection />
        <QuickStats />
        <ActionButtons />
        <LiveLeaderboard />
      </main>
    </div>
  )
}
