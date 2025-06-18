import { Navigation } from "@/components/navigation"
import { ScoringDashboard } from "@/components/scoring-dashboard"

export default function ScoringPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ScoringDashboard />
      </main>
    </div>
  )
}
