"use client"

import { useState } from "react"
import { HelpCircle, FileText, Calculator, Users, Settings, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqCategories = [
  {
    id: "scoring",
    title: "Scoring & Calculations",
    icon: Calculator,
    faqs: [
      {
        question: "How are individual coins calculated?",
        answer:
          "Individual coins are calculated based on: Referrals (1 coin each), Visitors (50 coins each), Attendance (-10 coins per absence), Testimonials (5 coins each, max 2), and Trainings (25 coins each, max 3).",
      },
      {
        question: "What is the chapter scoring formula?",
        answer:
          "Chapter scoring includes: Referral Coins = (Chapter Referrals/Strength) × 500, Visitor Coins = (Total Visitors/Strength) × 10000, Attendance penalty of -1000 if below 95%, Testimonial Coins = (Capped Testimonials/Strength) × 1000, Training Coins = (Capped Trainings/Strength) × 5000.",
      },
      {
        question: "How does the Net Retention Score work?",
        answer:
          "Net Retention Score = (Inductions + Renewals) - Drops. All teams start from 0, minimum qualifier is +3. Tie breakers are: 1) Least Drops, 2) Higher Inductions, 3) Member traffic lights highest % in Green and Amber.",
      },
    ],
  },
  {
    id: "rules",
    title: "Game Rules",
    icon: FileText,
    faqs: [
      {
        question: "What are the visitor eligibility rules?",
        answer:
          "Visitors cannot be immediate family members, partners, or staff. EOI form filling is mandatory within 24 hours of the meeting. Coffee session visitors count with photo and EOI form.",
      },
      {
        question: "How is attendance tracked?",
        answer:
          "Attendance requires a picture of all members present matched with the attendance sheet. The photo must be sent by 9AM of the meeting day. Medical absences require approval email within 24 hours.",
      },
      {
        question: "What are the testimonial and training limits?",
        answer:
          "Each player gets points for maximum 2 testimonials and 3 trainings. Total capped testimonials per team is 2 per player, and total capped trainings is 3 per player maximum.",
      },
    ],
  },
  {
    id: "chapters",
    title: "Chapter Management",
    icon: Users,
    faqs: [
      {
        question: "How do I add new members to my chapter?",
        answer:
          "Contact your Games Coordinator to add new members. All member additions must be approved and verified before they can participate in scoring.",
      },
      {
        question: "What are the captain and coach responsibilities?",
        answer:
          "Captains are responsible for their team and follow the coach. Any disputes must be directed to Games Coordinators via Captain only. Coaches must attend team strategy meetings.",
      },
      {
        question: "How is chapter strength calculated?",
        answer:
          "Chapter strength for weekly calculations is taken as per weekly PALMS data. Chapter strength for entire duration calculations is taken as of August 1, 2025.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: Settings,
    faqs: [
      {
        question: "How do I submit weekly data?",
        answer:
          'Use the "Submit Weekly Data" button on the dashboard. Fill in all required fields including referrals, visitors, attendance, testimonials, and trainings. Data is validated in real-time.',
      },
      {
        question: "How does Google Sheets integration work?",
        answer:
          'The system automatically syncs with Google Sheets. You can check sync status in the navigation bar. Use "Force Sync" if needed, and download templates for offline data entry.',
      },
      {
        question: "What if I encounter a technical issue?",
        answer:
          "Contact the developer through the WhatsApp button on the Team page, or report issues to your Games Coordinator. Include screenshots and error messages when possible.",
      },
    ],
  },
]

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Help Center</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about BNI Independence Games 2.0
        </p>
      </div>

      {/* Search */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="relative">
            <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <FileText className="h-12 w-12 text-[#D32F2F] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Game Rules</h3>
            <p className="text-gray-600 text-sm">Complete rules and regulations for Independence Games 2.0</p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Calculator className="h-12 w-12 text-[#FFC107] mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Scoring Guide</h3>
            <p className="text-gray-600 text-sm">Understand how coins are calculated for individuals and chapters</p>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm">Get help from Games Coordinators or technical support</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredFAQs.map((category) => {
          const Icon = category.icon
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-[#D32F2F]" />
                  <span>{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`${category.id}-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Contact Information */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Still Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Contact the Games Coordinators for additional support</p>
          <div className="space-y-2">
            <p className="font-semibold">Yogesh Pugalia & Kaushal Mohata</p>
            <p className="text-sm text-gray-600">Senior Director Consultants - Kolkata CBD(A) & North</p>
          </div>
          <Button className="bg-[#D32F2F] hover:bg-[#B71C1C]">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Coordinators
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
