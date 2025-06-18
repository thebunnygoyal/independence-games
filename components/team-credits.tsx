"use client"

import { MessageCircle, Users, Trophy, Code } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const gamesCoordinators = [
  {
    name: "Yogesh Pugalia",
    title: "Senior Director Consultant",
    subtitle: "Kolkata CBD(A) & North",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    name: "Kaushal Mohata",
    title: "Senior Director Consultant",
    subtitle: "Kolkata CBD(A) & North",
    image: "/placeholder.svg?height=120&width=120",
  },
]

const gameMovers = {
  managingDirector: {
    name: "Vivek Jaiswal",
    title: "Managing Director",
    image: "/placeholder.svg?height=100&width=100",
  },
  associateAreaDirector: {
    name: "Krishna Singh",
    title: "Associate Area Director",
    image: "/placeholder.svg?height=100&width=100",
  },
  directorConsultants: [
    "Aditya Himmatsinghka",
    "Aditya Agarwal",
    "Abhik Chatterjee",
    "Rahul Agarwal",
    "Rishav Choudhary",
    "Akkash Banthia",
  ],
  supportAmbassadors: ["Harshit Modi", "Suhani Dhanania", "Anil Kumar Gupta"],
}

export function TeamCredits() {
  const handleWhatsAppContact = () => {
    // This will be configured later with actual phone number
    const phoneNumber = "919999999999" // Placeholder
    window.open(`https://wa.me/${phoneNumber}`, "_blank")
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">The Team Behind Independence Games 2.0</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet the dedicated professionals who make the BNI Independence Games possible
        </p>
      </div>

      {/* Games Coordinators */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#D32F2F] mb-2">Games Coordinators</h2>
          <div className="w-24 h-1 bg-[#D32F2F] mx-auto rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {gamesCoordinators.map((coordinator) => (
            <Card key={coordinator.name} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#D32F2F]">
                  <img
                    src={coordinator.image || "/placeholder.svg"}
                    alt={coordinator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{coordinator.name}</h3>
                <p className="text-[#D32F2F] font-semibold mb-1">{coordinator.title}</p>
                <p className="text-gray-600">{coordinator.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Game Movers */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#D32F2F] mb-2">Game Movers</h2>
          <div className="w-24 h-1 bg-[#D32F2F] mx-auto rounded"></div>
        </div>

        <div className="space-y-8">
          {/* Managing Director */}
          <Card className="max-w-md mx-auto shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#FFC107]">
                <img
                  src={gameMovers.managingDirector.image || "/placeholder.svg"}
                  alt={gameMovers.managingDirector.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{gameMovers.managingDirector.name}</h3>
              <p className="text-[#FFC107] font-semibold">{gameMovers.managingDirector.title}</p>
            </CardContent>
          </Card>

          {/* Associate Area Director */}
          <Card className="max-w-md mx-auto shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#757575]">
                <img
                  src={gameMovers.associateAreaDirector.image || "/placeholder.svg"}
                  alt={gameMovers.associateAreaDirector.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{gameMovers.associateAreaDirector.name}</h3>
              <p className="text-[#757575] font-semibold">{gameMovers.associateAreaDirector.title}</p>
            </CardContent>
          </Card>

          {/* Director Consultants */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">Director Consultants</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {gameMovers.directorConsultants.map((name) => (
                <Card key={name} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-500" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
                    <p className="text-xs text-gray-600">Director Consultant</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Ambassadors */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">Support Ambassadors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {gameMovers.supportAmbassadors.map((name) => (
                <Card key={name} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm">{name}</h4>
                    <p className="text-xs text-gray-600">Support Ambassador</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Website Developer */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#D32F2F] mb-2">Website Developer</h2>
          <div className="w-24 h-1 bg-[#D32F2F] mx-auto rounded"></div>
        </div>

        <Card className="max-w-md mx-auto shadow-2xl overflow-hidden">
          <div className="gradient-bg p-6 text-white text-center">
            <Code className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Website Developed By</h3>
          </div>
          <CardContent className="p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#D32F2F]">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="Rishav Goyal"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Rishav Goyal</h3>
            <p className="text-[#D32F2F] font-semibold mb-6">Full Stack Developer</p>

            <Button
              onClick={handleWhatsAppContact}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto"
              data-whatsapp-number="919999999999"
            >
              <MessageCircle className="h-5 w-5" />
              Contact Developer
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
