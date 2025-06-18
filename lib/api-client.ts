import axios from 'axios';
import { API_ENDPOINTS } from './constants';
import type { 
  Chapter, 
  Member, 
  WeeklyDataSubmission, 
  Leaderboard,
  ApiResponse,
  GameMetrics,
  AuditLog
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API methods
export const api = {
  // Chapters
  async getChapters(): Promise<Chapter[]> {
    const { data } = await apiClient.get(API_ENDPOINTS.chapters);
    return data;
  },

  async getChapterMembers(chapterId: number): Promise<Member[]> {
    const { data } = await apiClient.get(
      API_ENDPOINTS.members.replace(':id', chapterId.toString())
    );
    return data;
  },

  // Scoring
  async submitWeeklyData(submission: WeeklyDataSubmission): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(API_ENDPOINTS.weeklyData, submission);
    return data;
  },

  async getLeaderboard(): Promise<Leaderboard> {
    const { data } = await apiClient.get(API_ENDPOINTS.leaderboard);
    return data;
  },

  async getIndividualScore(memberId: number): Promise<any> {
    const { data } = await apiClient.get(
      API_ENDPOINTS.individualScore.replace(':id', memberId.toString())
    );
    return data;
  },

  // Game Metrics
  async updateGameMetrics(metrics: GameMetrics): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(API_ENDPOINTS.gameMetrics, metrics);
    return data;
  },

  // Google Sheets
  async syncWithSheets(): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(API_ENDPOINTS.sheetsSync);
    return data;
  },

  async downloadTemplate(): Promise<Blob> {
    const { data } = await apiClient.get(API_ENDPOINTS.sheetsTemplate, {
      responseType: 'blob'
    });
    return data;
  },

  // Audit
  async getAuditLogs(page = 1, limit = 100): Promise<{
    logs: AuditLog[];
    pagination: any;
  }> {
    const { data } = await apiClient.get(API_ENDPOINTS.auditLogs, {
      params: { page, limit }
    });
    return data;
  },
};

// Export mock data for development
export const mockData = {
  chapters: [
    { id: 1, name: 'INCREDIBLEZ', captain_name: 'John Doe', coach_name: 'Jane Smith', member_count: 25, created_at: '2025-01-01' },
    { id: 2, name: 'KNIGHTZ', captain_name: 'Mike Johnson', coach_name: 'Sarah Lee', member_count: 28, created_at: '2025-01-01' },
    { id: 3, name: 'ETERNAL', captain_name: 'David Brown', coach_name: 'Lisa White', member_count: 22, created_at: '2025-01-01' },
    { id: 4, name: 'CELEBRATIONS', captain_name: 'Tom Wilson', coach_name: 'Amy Green', member_count: 30, created_at: '2025-01-01' },
    { id: 5, name: 'OPULANCE', captain_name: 'Chris Davis', coach_name: 'Beth Miller', member_count: 26, created_at: '2025-01-01' },
    { id: 6, name: 'EPIC', captain_name: 'Paul Martin', coach_name: 'Kate Anderson', member_count: 24, created_at: '2025-01-01' },
    { id: 7, name: 'VICTORY', captain_name: 'Steve Taylor', coach_name: 'Nancy Clark', member_count: 27, created_at: '2025-01-01' },
    { id: 8, name: 'ACHIEVERZ', captain_name: 'Mark Roberts', coach_name: 'Julia Lewis', member_count: 29, created_at: '2025-01-01' },
  ],
  
  leaderboard: {
    individuals: [
      { id: 1, name: 'Jane Smith', email: 'jane@example.com', chapter_name: 'INCREDIBLEZ', referral_coins: 15, visitor_coins: 150, attendance_coins: 0, testimonial_coins: 10, training_coins: 75, total_coins: 250, rank: 1 },
      { id: 2, name: 'John Doe', email: 'john@example.com', chapter_name: 'KNIGHTZ', referral_coins: 12, visitor_coins: 100, attendance_coins: -10, testimonial_coins: 10, training_coins: 50, total_coins: 162, rank: 2 },
    ],
    chapters: [
      { id: 1, name: 'INCREDIBLEZ', member_count: 25, active_members: 25, total_referrals: 45, total_visitors: 12, attendance_rate: 0.96, capped_testimonials: 15, capped_trainings: 20, total_coins: 8650, rank: 1 },
      { id: 2, name: 'KNIGHTZ', member_count: 28, active_members: 27, total_referrals: 38, total_visitors: 10, attendance_rate: 0.94, capped_testimonials: 12, capped_trainings: 18, total_coins: 7200, rank: 2 },
    ],
    lastUpdated: new Date().toISOString(),
    weekNumber: 3
  }
};

// Use mock data in development if API is not available
export const getMockableApi = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const hasApiUrl = !!process.env.NEXT_PUBLIC_API_URL;
  
  if (!isProduction && !hasApiUrl) {
    return {
      getChapters: async () => mockData.chapters,
      getLeaderboard: async () => mockData.leaderboard,
      // Add other mock methods as needed
      ...api // Fall back to real API for non-mocked methods
    };
  }
  
  return api;
};