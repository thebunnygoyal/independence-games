import { Plus, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ActionButtons() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Submit Weekly Data
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Rules
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
