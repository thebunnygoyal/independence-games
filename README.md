# BNI Independence Games 2.0 Tracker

A comprehensive tracking system for BNI Independence Games with real-time scoring, leaderboards, and Google Sheets integration.

## Quick Start

### Prerequisites
- Node.js 18+
- Git
- Azure account (for backend)
- Google Cloud account (for Sheets API)

### Local Development

```bash
# Clone repository
git clone https://github.com/thebunnygoyal/independence-games.git
cd independence-games

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
```

### Deploy Frontend to GitHub Pages

The deployment is automatic! Just push to main:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will automatically build and deploy to GitHub Pages.

## Core Features

### MVP (Currently Implemented)
- Real-time Leaderboards - Individual and chapter rankings
- Automated Scoring - Tamper-proof calculations
- Team Management - Complete team directory with WhatsApp integration
- Responsive Design - Works on all devices
- Excel Integration - Download templates and sync data

### V2 (Post-Feedback)
- Weekly Data Entry - Forms for submitting metrics
- Google Sheets Sync - Real-time bidirectional sync
- Audit Logs - Complete change tracking
- Advanced Analytics - Performance insights
- Admin Dashboard - Management interface

## Technical Details

### Frontend Stack
- Framework: Next.js 15 with App Router
- Styling: Tailwind CSS + Shadcn/UI
- State Management: Zustand
- Charts: Recharts
- Icons: Lucide React
- Deployment: GitHub Pages (Static Export)

### Backend Stack (Separate Repository)
- Framework: Node.js + Express
- Database: PostgreSQL on Azure
- Authentication: JWT Tokens
- APIs: Google Sheets v4
- Deployment: Azure App Service

## Team

### Games Coordinators
- Yogesh Pugalia - Senior Director Consultant
- Kaushal Mohata - Senior Director Consultant

### Developer
- Rishav Goyal - Full Stack Developer
- Contact: Via WhatsApp button on Team page
- GitHub: @thebunnygoyal

## Support

- Game Rules: benchmarkgames.bnikol@gmail.com
- Technical Support: Contact developer via WhatsApp
- Issues: GitHub Issues

Built with love for BNI Independence Games 2.0