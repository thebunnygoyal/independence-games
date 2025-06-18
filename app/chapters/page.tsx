import { Navigation } from "@/components/navigation"
import { ChapterManagement } from "@/components/chapter-management"

export default function ChaptersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <ChapterManagement />
      </main>
    </div>
  )
}
