import { z } from 'zod';
import { GAME_CONFIG } from '../constants';

// Weekly data validation schema
export const weeklyDataSchema = z.object({
  weekNumber: z.number().min(1).max(GAME_CONFIG.totalWeeks),
  memberId: z.number().positive(),
  referrals: z.number().min(0),
  visitors: z.number().min(0),
  attendance: z.enum(['present', 'absent', 'medical']),
  visitorNames: z.string().optional(),
  eoiSubmitted: z.boolean().default(false)
});

// Game metrics validation schema
export const gameMetricsSchema = z.object({
  memberId: z.number().positive(),
  testimonials: z.number().min(0).max(2),
  trainings: z.number().min(0).max(3),
  inductionsGiven: z.number().min(0).default(0)
});

// Chapter validation schema
export const chapterSchema = z.object({
  name: z.string().min(1).max(50),
  captainName: z.string().min(1).max(100),
  coachName: z.string().min(1).max(100),
  memberCount: z.number().min(0).default(0)
});

// Member validation schema
export const memberSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  chapterId: z.number().positive(),
  role: z.enum(['member', 'president', 'vice_president', 'secretary_treasurer']).default('member'),
  status: z.enum(['active', 'inactive', 'dropped']).default('active')
});

// Validate visitor rules
export function validateVisitorRules(visitorName: string, memberName: string): boolean {
  // Check if visitor is not immediate family member
  const familyKeywords = ['wife', 'husband', 'son', 'daughter', 'father', 'mother', 'brother', 'sister'];
  const lowerVisitorName = visitorName.toLowerCase();
  
  for (const keyword of familyKeywords) {
    if (lowerVisitorName.includes(keyword)) {
      return false;
    }
  }
  
  // Check if visitor is not partner or staff
  const restrictedKeywords = ['partner', 'staff', 'employee', 'colleague'];
  for (const keyword of restrictedKeywords) {
    if (lowerVisitorName.includes(keyword)) {
      return false;
    }
  }
  
  return true;
}

// Validate EOI submission timing (within 24 hours)
export function validateEOITiming(meetingDate: Date, submissionDate: Date): boolean {
  const hoursDifference = (submissionDate.getTime() - meetingDate.getTime()) / (1000 * 60 * 60);
  return hoursDifference <= 24 && hoursDifference >= 0;
}

// Validate week number based on current date
export function getCurrentWeekNumber(): number {
  const startDate = new Date(GAME_CONFIG.startDate);
  const currentDate = new Date();
  const daysDifference = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const weekNumber = Math.ceil((daysDifference + 1) / 7);
  
  return Math.min(Math.max(weekNumber, 1), GAME_CONFIG.totalWeeks);
}

// Validate if game is active
export function isGameActive(): boolean {
  const currentDate = new Date();
  const startDate = new Date(GAME_CONFIG.startDate);
  const endDate = new Date(GAME_CONFIG.endDate);
  
  return currentDate >= startDate && currentDate <= endDate;
}