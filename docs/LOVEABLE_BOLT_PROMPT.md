# BNI Independence Games 2.0 Tracker - Loveable/Bolt Prompt

Build a BNI Chapter Games tracking system called "BNI GameTracker Pro" with these EXACT specifications:

## BRAND IMPLEMENTATION
- Primary Color: #D32F2F (BNI Red) - Use for headers, CTAs, active states
- Secondary Color: #757575 (Gray) - Use for borders, secondary text
- Accent Color: #FFC107 (Amber) - Use for highlights, badges, notifications
- Typography: Inter for headers, Roboto for body text
- Logo: "BNI GameTracker" text with a trophy icon
- Voice: Professional yet motivating - use encouraging language

## PAGES REQUIRED

### 1. Landing/Dashboard Page
- **Hero Section**: "BNI Independence Games 2.0" with live countdown to Aug 1, 2025
- **Live Leaderboard**: Two tabs - "Chapters" and "Individuals"
- **Quick Stats**: Total referrals, visitors, attendance rate, active members
- **Action Buttons**: "Submit Weekly Data", "Download Template", "View Rules"

### 2. Chapter Management
- **Chapter Selector**: Dropdown to select from 8 chapters
- **Member Roster**: Table with member names, roles, and current stats
- **Weekly Data Entry**: Form for referrals, attendance, visitors
- **Validation**: Real-time error checking against rules

### 3. Scoring Dashboard
- **Individual Scores**: Sortable table with coin breakdowns
- **Chapter Scores**: Bar chart comparing all chapters
- **Metrics Breakdown**: Visual representation of scoring categories
- **Export Options**: Download as Excel or PDF

### 4. Admin Panel
- **User Management**: Add/remove captains and coaches
- **Game Settings**: Configure dates, rules, coin values
- **Audit Log**: Table of all changes with timestamps
- **Dispute Resolution**: Flag and resolve scoring issues

### 5. Google Sheets Integration
- **Connection Status**: Show sync status with Google Sheets
- **Template Download**: Button to download Excel template
- **Manual Sync**: Force sync button with progress indicator
- **Protected Ranges**: Visual indicator of locked cells

### 6. Credits/Team Page
- **Page Title**: "The Team Behind Independence Games 2.0"
- **Games Coordinators Section**: 
  - Yogesh Pugalia (Senior Director Consultant - Kolkata CBD(A) & North)
  - Kaushal Mohata (Senior Director Consultant - Kolkata CBD(A) & North)
- **Game Movers Section**:
  - Managing Director: Vivek Jaiswal
  - Associate Area Director: Krishna Singh
  - Director Consultants: Aditya Himmatsinghka, Aditya Agarwal, Abhik Chatterjee, Rahul Agarwal, Rishav Choudhary, Akkash Banthia
  - Support Ambassadors: Harshit Modi, Suhani Dhanania, Anil Kumar Gupta
- **Website Developer Section**:
  - "Website Developed By" section with modern card design
  - Name: Rishav Goyal
  - Title: Full Stack Developer
  - WhatsApp button with icon and "Contact Developer" text
  - LinkedIn/GitHub icons (optional)
- **Design**: Use cards with subtle shadows, professional headshots placeholder, gradient backgrounds

## COMPONENTS TO BUILD

### Navigation
- Logo with "BNI GameTracker Pro"
- Main menu: Dashboard, Chapters, Scoring, Admin, Team, Help
- User dropdown with role indicator
- Sync status indicator (green/yellow/red)

### Leaderboard Component
```jsx
// Shows top 3 with gold/silver/bronze styling
// Animated coin counters
// Click to expand full rankings
// Filter by category (referrals, visitors, etc.)
```

### Data Entry Form
```jsx
// Week selector (1-6)
// Member multi-select with search
// Input fields with validation:
  - Referrals (min: 0)
  - Visitors (min: 0)
  - Attendance (Present/Absent/Medical)
  - Testimonials (max: 2 per member)
  - Trainings (max: 3 per member)
// Auto-save with confirmation
```

### Scoring Engine Component
```jsx
// Real-time calculation display
// Show formula being applied
// Breakdown by category
// Tamper-proof indicator
```

### Google Sheets Sync Component
```jsx
// Connection status with last sync time
// Sheet selector
// Column mapping interface
// Error log display
```

### Team/Credits Page Component
```jsx
// Games Coordinators Cards
// - Photo placeholder (circular)
// - Name and designation
// - Styled with BNI red accent

// Game Movers Grid
// - Hierarchical layout
// - Managing Director at top
// - Directors in grid layout
// - Support Ambassadors at bottom

// Developer Credit Card (Special highlight)
// - Gradient background (#D32F2F to #FFC107)
// - "Website Developed By" header
// - Rishav Goyal - Full Stack Developer
// - WhatsApp button with icon:
//   <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full">
//     <WhatsAppIcon /> Contact Developer
//   </button>
// - onClick: window.open('https://wa.me/[PHONE_NUMBER]', '_blank')
// - Add data attribute for later API configuration: data-whatsapp-number="[TO_BE_CONFIGURED]"

// Use Lucide React icons:
import { MessageCircle, Users, Trophy, Code } from 'lucide-react';
```

## TECHNICAL SPECIFICATIONS

### Frontend Architecture (THIS IS WHAT YOU BUILD)
```javascript
// Next.js 14 with App Router
// State Management: Zustand
// UI Components: Tailwind + Shadcn/ui
// Charts: Recharts
// Forms: React Hook Form + Zod
// Tables: TanStack Table

// IMPORTANT: This is a FRONTEND ONLY build
// Backend API will be deployed separately on Azure
// Use environment variable for API URL: process.env.NEXT_PUBLIC_API_URL
```

### API Integration (FRONTEND CONNECTS TO THESE)
```javascript
// Use these endpoints but DO NOT implement the backend
// Backend will be deployed separately on Azure

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Example API calls to implement in frontend:
async function fetchChapters() {
  const res = await fetch(`${API_BASE}/api/chapters`);
  return res.json();
}

async function submitWeeklyData(data) {
  const res = await fetch(`${API_BASE}/api/scoring/weekly`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// API Endpoints the frontend will call:
// GET /api/chapters - List all chapters
// POST /api/chapters/:id/members - Get chapter members
// POST /api/scoring/weekly - Submit weekly data
// GET /api/scoring/leaderboard - Get current standings
// GET /api/scoring/individual/:memberId - Get individual scores
// POST /api/sheets/sync - Trigger Google Sheets sync
// GET /api/sheets/template - Download template
// GET /api/audit/logs - View audit trail
```

### Mock Data for Development
```javascript
// Include mock API responses for development
// This allows frontend to work before backend is connected

const MOCK_CHAPTERS = [
  { id: 1, name: 'INCREDIBLEZ', memberCount: 25, captain: 'John Doe' },
  { id: 2, name: 'KNIGHTZ', memberCount: 28, captain: 'Jane Smith' },
  // ... other chapters
];

const MOCK_LEADERBOARD = [
  { rank: 1, chapter: 'INCREDIBLEZ', coins: 8650, members: 25 },
  { rank: 2, chapter: 'KNIGHTZ', coins: 8200, members: 28 },
  // ... other chapters
];

// Use mock data when API_URL is not set
const useAPI = process.env.NEXT_PUBLIC_API_URL ? false : true;
```

### Data Validation Rules
```javascript
const validationRules = {
  referrals: z.number().min(0),
  visitors: z.number().min(0),
  attendance: z.enum(['present', 'absent', 'medical']),
  testimonials: z.number().max(2),
  trainings: z.number().max(3),
  // Visitor cannot be family member
  // EOI form must be submitted within 24 hours
  // Chapter attendance must be ≥ 95% to avoid penalty
}
```

### Scoring Calculations
```javascript
// Individual Scoring
function calculateIndividualCoins(member) {
  const coins = {
    referrals: member.referrals * 1,
    visitors: member.visitors * 50,
    attendance: member.absences * -10,
    testimonials: Math.min(member.testimonials, 2) * 5,
    trainings: Math.min(member.trainings, 3) * 25
  };
  return Object.values(coins).reduce((a, b) => a + b, 0);
}

// Chapter Scoring
function calculateChapterCoins(chapter) {
  const strength = chapter.memberCount;
  return {
    referrals: (chapter.totalReferrals / strength) * 500,
    visitors: (chapter.totalVisitors / strength) * 10000,
    attendance: chapter.attendanceRate < 0.95 ? -1000 : 0,
    testimonials: (chapter.cappedTestimonials / strength) * 1000,
    trainings: (chapter.cappedTrainings / strength) * 5000
  };
}

// Net Retention Score
function calculateRetentionScore(chapter) {
  return chapter.inductions + chapter.renewals - chapter.drops;
}
```

### Security Features
```javascript
// Tamper-proof mechanisms
- Server-side calculations only
- Cryptographic signatures on all data
- Role-based access control
- Audit trail for every change
- Automated anomaly detection
```

## RESPONSIVE DESIGN
- Mobile: Single column layout, swipeable tabs
- Tablet: Two column layout for forms
- Desktop: Full dashboard with sidebar
- Print: Optimized reports with page breaks

## INTEGRATION POINTS
```javascript
// Google Sheets API
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

// Protected ranges in sheet
const PROTECTED_RANGES = [
  'Calculations!A:Z',
  'Totals!A:Z',
  'Formulas!A:Z'
];

// Azure backend
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// WhatsApp configuration (to be added later)
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
```

## NAVIGATION ROUTES
```javascript
const routes = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/chapters', label: 'Chapters', icon: 'Users' },
  { path: '/scoring', label: 'Scoring', icon: 'Trophy' },
  { path: '/admin', label: 'Admin', icon: 'Settings' },
  { path: '/team', label: 'Team', icon: 'Users2' },
  { path: '/help', label: 'Help', icon: 'HelpCircle' }
];
```

## OUTPUT REQUIREMENTS
- Progressive Web App (PWA) capable
- Offline data entry with sync
- Excel export functionality
- PDF report generation
- Real-time updates via WebSockets
- Lighthouse score > 95

## DEMO DATA
Include sample data for all 8 chapters:
- INCREDIBLEZ, KNIGHTZ, ETERNAL, CELEBRATIONS
- OPULANCE, EPIC, VICTORY, ACHIEVERZ
- 20-30 members per chapter
- 3 weeks of historical data

BUILD THIS EXACT PRODUCT. NO DEVIATIONS. NO QUESTIONS.