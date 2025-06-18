'use client';

import { Code, Users } from 'lucide-react';

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            The Team Behind Independence Games 2.0
          </h1>
          <p className="text-center text-xl opacity-90">
            Meet the dedicated individuals making BNI Games a success
          </p>
        </div>
      </div>

      {/* Games Coordinators Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Games Coordinators
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Coordinator Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Yogesh Pugalia</h3>
                  <p className="text-gray-600">Senior Director Consultant</p>
                  <p className="text-sm text-gray-500">Kolkata CBD(A) & North</p>
                </div>
              </div>
            </div>
            
            {/* Coordinator Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Kaushal Mohata</h3>
                  <p className="text-gray-600">Senior Director Consultant</p>
                  <p className="text-sm text-gray-500">Kolkata CBD(A) & North</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Movers Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Game Movers
          </h2>
          
          {/* Managing Director */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-600">
              <h3 className="text-xl font-semibold text-center text-red-600">Managing Director</h3>
              <p className="text-center text-lg mt-2">Vivek Jaiswal</p>
            </div>
          </div>
          
          {/* Associate Area Director */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-center text-red-600">Associate Area Director</h3>
              <p className="text-center text-lg mt-2">Krishna Singh</p>
            </div>
          </div>
          
          {/* Director Consultants */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-center mb-4 text-red-600">Director Consultants</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {['Aditya Himmatsinghka', 'Aditya Agarwal', 'Abhik Chatterjee', 
                'Rahul Agarwal', 'Rishav Choudhary', 'Akkash Banthia'].map((name) => (
                <div key={name} className="bg-white rounded-lg shadow p-4 text-center">
                  <p className="font-medium">{name}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Support Ambassadors */}
          <div>
            <h3 className="text-xl font-semibold text-center mb-4 text-red-600">Support Ambassadors</h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {['Harshit Modi', 'Suhani Dhanania', 'Anil Kumar Gupta'].map((name) => (
                <div key={name} className="bg-white rounded-lg shadow p-4 text-center">
                  <p className="font-medium">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Website Developer Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-red-600 to-amber-500 rounded-2xl p-1">
              <div className="bg-white rounded-2xl p-8">
                <div className="text-center mb-6">
                  <Code className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Website Developed By</h2>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-600">RG</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Rishav Goyal</h3>
                  <p className="text-lg text-gray-600 mb-6">Full Stack Developer</p>
                  
                  {/* WhatsApp Contact Button */}
                  <button 
                    onClick={() => window.open('https://wa.me/' + (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'), '_blank')}
                    data-whatsapp-number="TO_BE_CONFIGURED"
                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Contact Developer
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    For technical support or custom development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            For game-related queries, contact:{' '}
            <a href="mailto:benchmarkgames.bnikol@gmail.com" className="text-red-600 hover:underline">
              benchmarkgames.bnikol@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}