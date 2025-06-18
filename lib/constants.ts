// BNI Independence Games 2.0 Constants

export const GAME_CONFIG = {
  startDate: '2025-06-17',
  endDate: '2025-08-01',
  totalWeeks: 6,
  chapters: [
    'INCREDIBLEZ',
    'KNIGHTZ', 
    'ETERNAL',
    'CELEBRATIONS',
    'OPULANCE',
    'EPIC',
    'VICTORY',
    'ACHIEVERZ'
  ]
};

export const SCORING_RULES = {
  individual: {
    referrals: 1,
    visitors: 50,
    attendance: -10, // per absence
    testimonials: { value: 5, max: 2 },
    trainings: { value: 25, max: 3 }
  },
  chapter: {
    referrals: 500, // per member ratio
    visitors: 10000, // per member ratio
    attendancePenalty: -1000, // if < 95%
    testimonials: 1000, // per member ratio
    trainings: 5000 // per member ratio
  }
};

export const WILD_CARDS = {
  teamMeeting: {
    full: 1000,    // 100% attendance
    high: 750,     // 95-99% attendance
    medium: 500,   // 90-95% attendance
    low: 0         // <90% attendance
  },
  hotCategories: 250 // for 15 categories
};

export const COLORS = {
  primary: '#D32F2F', // BNI Red
  secondary: '#757575', // Gray
  accent: '#FFC107', // Amber
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  whatsapp: '#25D366'
};

export const API_ENDPOINTS = {
  chapters: '/api/chapters',
  members: '/api/chapters/:id/members',
  weeklyData: '/api/scoring/weekly',
  leaderboard: '/api/scoring/leaderboard',
  individualScore: '/api/scoring/individual/:id',
  sheetsSync: '/api/sheets/sync',
  sheetsTemplate: '/api/sheets/template',
  gameMetrics: '/api/metrics/game',
  auditLogs: '/api/audit/logs'
};