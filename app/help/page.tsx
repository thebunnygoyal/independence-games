import { Navigation } from "@/components/navigation"
import { HelpCenter } from "@/components/help-center"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <HelpCenter />
      </main>
    </div>
  )
}
