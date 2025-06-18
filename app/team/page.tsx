import { Navigation } from "@/components/navigation"
import { TeamCredits } from "@/components/team-credits"

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <TeamCredits />
      </main>
    </div>
  )
}
