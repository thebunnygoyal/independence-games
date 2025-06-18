'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatCoins } from '@/lib/utils/scoring';
import { getMockableApi } from '@/lib/api-client';
import type { Leaderboard } from '@/lib/types';

export function LeaderboardComponent() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const api = getMockableApi();

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await api.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading leaderboard...</div>;
  }

  if (!leaderboard) {
    return <div className="text-center p-8">No leaderboard data available</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          Live Leaderboard
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date(leaderboard.lastUpdated).toLocaleString()}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chapters" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="individuals">Individuals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chapters" className="space-y-4">
            {leaderboard.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getRankIcon(chapter.rank || 0)}
                  <div>
                    <h3 className="font-semibold">{chapter.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {chapter.active_members} active members • {Math.round(chapter.attendance_rate * 100)}% attendance
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {formatCoins(chapter.total_coins)}
                  </p>
                  <p className="text-sm text-muted-foreground">coins</p>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="individuals" className="space-y-4">
            {leaderboard.individuals.map((individual) => (
              <div
                key={individual.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getRankIcon(individual.rank || 0)}
                  <div>
                    <h3 className="font-semibold">{individual.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {individual.chapter_name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {formatCoins(individual.total_coins)}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      R: {individual.referral_coins}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      V: {individual.visitor_coins}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}