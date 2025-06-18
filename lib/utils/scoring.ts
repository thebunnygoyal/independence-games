import { SCORING_RULES } from '../constants';
import type { WeeklyMetrics, GameMetrics, Chapter } from '../types';

/**
 * Calculate individual coins based on metrics
 */
export function calculateIndividualCoins(
  weeklyMetrics: WeeklyMetrics[],
  gameMetrics?: GameMetrics
) {
  const coins = {
    referrals: 0,
    visitors: 0,
    attendance: 0,
    testimonials: 0,
    trainings: 0,
    total: 0
  };

  // Calculate weekly metrics coins
  weeklyMetrics.forEach(metric => {
    coins.referrals += metric.referrals * SCORING_RULES.individual.referrals;
    coins.visitors += metric.visitors * SCORING_RULES.individual.visitors;
    if (metric.attendance === 'absent') {
      coins.attendance += SCORING_RULES.individual.attendance;
    }
  });

  // Calculate game metrics coins
  if (gameMetrics) {
    const cappedTestimonials = Math.min(
      gameMetrics.testimonials,
      SCORING_RULES.individual.testimonials.max
    );
    const cappedTrainings = Math.min(
      gameMetrics.trainings,
      SCORING_RULES.individual.trainings.max
    );

    coins.testimonials = cappedTestimonials * SCORING_RULES.individual.testimonials.value;
    coins.trainings = cappedTrainings * SCORING_RULES.individual.trainings.value;
  }

  coins.total = Object.values(coins).reduce((sum, value) => sum + value, 0);
  return coins;
}

/**
 * Calculate chapter coins based on aggregated metrics
 */
export function calculateChapterCoins(
  chapter: Chapter,
  totalReferrals: number,
  totalVisitors: number,
  attendanceRate: number,
  cappedTestimonials: number,
  cappedTrainings: number
) {
  const memberCount = chapter.member_count || 1; // Avoid division by zero

  const coins = {
    referrals: (totalReferrals / memberCount) * SCORING_RULES.chapter.referrals,
    visitors: (totalVisitors / memberCount) * SCORING_RULES.chapter.visitors,
    attendance: attendanceRate < 0.95 ? SCORING_RULES.chapter.attendancePenalty : 0,
    testimonials: (cappedTestimonials / memberCount) * SCORING_RULES.chapter.testimonials,
    trainings: (cappedTrainings / memberCount) * SCORING_RULES.chapter.trainings,
    total: 0
  };

  coins.total = Object.values(coins).reduce((sum, value) => sum + value, 0);
  return coins;
}

/**
 * Calculate net retention score
 */
export function calculateRetentionScore(
  inductions: number,
  renewals: number,
  drops: number
): number {
  return inductions + renewals - drops;
}

/**
 * Calculate induction points based on type
 */
export function calculateInductionPoints(
  organic: number,
  nonOrganicGiven: number,
  nonOrganicReceived: number
) {
  return {
    organic: organic * 1,
    given: nonOrganicGiven * 1,
    received: nonOrganicReceived * 0.5,
    total: organic + nonOrganicGiven + (nonOrganicReceived * 0.5)
  };
}

/**
 * Format coins display with proper styling
 */
export function formatCoins(coins: number): string {
  return new Intl.NumberFormat('en-IN').format(Math.round(coins));
}

/**
 * Calculate attendance percentage
 */
export function calculateAttendancePercentage(
  present: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((present / total) * 100);
}