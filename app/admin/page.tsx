import { Navigation } from "@/components/navigation"
import { AdminPanel } from "@/components/admin-panel"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <AdminPanel />
      </main>
    </div>
  )
}
