# BNI Independence Games 2.0 Tracker

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Developed by](https://img.shields.io/badge/Developed%20by-Rishav%20Goyal-blue?style=for-the-badge)](https://github.com/thebunnygoyal)

## 🎯 Overview

The BNI Independence Games 2.0 Tracker is a comprehensive web application designed to track and manage the performance metrics for 8 BNI chapters during their 6-week competition period (June 17 - August 1, 2025).

### Key Features
- **Real-time Scoring**: Automated calculation of individual and chapter coins
- **Tamper-proof System**: Server-side calculations with audit trails
- **Google Sheets Integration**: Seamless sync with protected formulas
- **Multi-level Tracking**: Individual, Chapter, and Game-wide metrics
- **Mobile Responsive**: Access from any device

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Components**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation

### Backend
- **API**: Node.js/Express on Azure App Service
- **Database**: PostgreSQL on Azure
- **Authentication**: Azure AD B2C
- **Integration**: Google Sheets API v4

## 📊 Scoring System

### Individual Coins
- Referrals: 1 coin per referral
- Visitors: 50 coins per visitor
- Attendance: -10 coins per absence
- Testimonials: 5 coins each (max 2)
- Trainings: 25 coins each (max 3)

### Chapter Coins
- Complex calculations based on chapter strength
- Attendance penalties for <95% attendance
- Net retention score tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Google Cloud account with Sheets API enabled
- Azure account (for production deployment)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/thebunnygoyal/independence-games.git
cd independence-games

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### Environment Variables

```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999

# Backend (.env)
DATABASE_URL=postgresql://user:password@host/database
JWT_SECRET=your-secret-key
GOOGLE_SERVICE_ACCOUNT_EMAIL=service@account.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
GOOGLE_SHEET_ID=your-sheet-id
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard
│   ├── chapters/          # Chapter management
│   ├── scoring/           # Scoring views
│   ├── admin/             # Admin panel
│   └── team/              # Team credits page
├── components/            # React components
├── lib/                   # Utility functions
├── backend/               # Express backend (separate repo)
├── docs/                  # Documentation
└── templates/             # Excel templates
```

## 🛡️ Security Features

1. **Server-side Calculations**: All scoring happens on the backend
2. **Protected Google Sheets**: Formula cells are locked
3. **Audit Trail**: Every change is logged with timestamp and user
4. **Role-based Access**: Different permissions for coordinators, captains, and members
5. **Data Validation**: Multiple levels of input validation

## 👥 Team

### Games Coordinators
- Yogesh Pugalia - Senior Director Consultant
- Kaushal Mohata - Senior Director Consultant

### Website Developer
- **Rishav Goyal** - Full Stack Developer
  - [WhatsApp](https://wa.me/919999999999)
  - [GitHub](https://github.com/thebunnygoyal)

## 📄 License

This project is private and proprietary to BNI Kolkata CBD(A) & North.

## 🤝 Support

For technical support, contact the developer via WhatsApp.
For game-related queries: benchmarkgames.bnikol@gmail.com

---

*Built with ❤️ for BNI Independence Games 2.0*