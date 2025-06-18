// TypeScript Type Definitions for BNI Independence Games

export interface Chapter {
  id: number;
  name: string;
  captain_name: string;
  coach_name: string;
  member_count: number;
  active_member_count?: number;
  created_at: string;
  updated_at?: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  chapter_id: number;
  role: 'member' | 'president' | 'vice_president' | 'secretary_treasurer';
  status: 'active' | 'inactive' | 'dropped';
  join_date: string;
  created_at: string;
  updated_at?: string;
}

export interface WeeklyMetrics {
  id?: number;
  week_number: number;
  member_id: number;
  referrals: number;
  visitors: number;
  attendance: 'present' | 'absent' | 'medical';
  visitor_names?: string;
  eoi_submitted: boolean;
  submitted_by?: string;
  submitted_at?: string;
}

export interface GameMetrics {
  id?: number;
  member_id: number;
  testimonials: number;
  trainings: number;
  inductions_given: number;
  inductions_received?: number;
  last_updated?: string;
}

export interface IndividualScore {
  id: number;
  name: string;
  email: string;
  chapter_name: string;
  referral_coins: number;
  visitor_coins: number;
  attendance_coins: number;
  testimonial_coins: number;
  training_coins: number;
  total_coins: number;
  rank?: number;
}

export interface ChapterScore {
  id: number;
  name: string;
  member_count: number;
  active_members: number;
  total_referrals: number;
  total_visitors: number;
  attendance_rate: number;
  capped_testimonials: number;
  capped_trainings: number;
  total_coins: number;
  rank?: number;
}

export interface Leaderboard {
  individuals: IndividualScore[];
  chapters: ChapterScore[];
  lastUpdated: string;
  weekNumber?: number;
}

export interface AuditLog {
  id: number;
  table_name: string;
  record_id?: number;
  action: string;
  old_value?: any;
  new_value?: any;
  user_email: string;
  user_ip?: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface WeeklyDataSubmission {
  weekNumber: number;
  chapterId: number;
  data: WeeklyMetrics[];
  submittedBy: string;
}