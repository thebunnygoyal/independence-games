'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, TrendingUp, Calendar } from 'lucide-react';
import { GAME_CONFIG } from '@/lib/constants';

interface StatsCardsProps {
  totalMembers: number;
  totalReferrals: number;
  totalVisitors: number;
  currentWeek: number;
}

export function StatsCards({
  totalMembers,
  totalReferrals,
  totalVisitors,
  currentWeek
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Active Members',
      value: totalMembers,
      icon: Users,
      description: 'Across all chapters',
      color: 'text-blue-600'
    },
    {
      title: 'Total Referrals',
      value: totalReferrals,
      icon: Target,
      description: 'This week',
      color: 'text-green-600'
    },
    {
      title: 'Total Visitors',
      value: totalVisitors,
      icon: TrendingUp,
      description: 'This week',
      color: 'text-purple-600'
    },
    {
      title: 'Current Week',
      value: `${currentWeek} / ${GAME_CONFIG.totalWeeks}`,
      icon: Calendar,
      description: 'Game progress',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}