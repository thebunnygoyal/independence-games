import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chapter, Member, Leaderboard } from '@/lib/types';

interface GameStore {
  // State
  chapters: Chapter[];
  currentChapter: Chapter | null;
  members: Member[];
  leaderboard: Leaderboard | null;
  currentWeek: number;
  loading: boolean;
  error: string | null;

  // Actions
  setChapters: (chapters: Chapter[]) => void;
  setCurrentChapter: (chapter: Chapter | null) => void;
  setMembers: (members: Member[]) => void;
  setLeaderboard: (leaderboard: Leaderboard) => void;
  setCurrentWeek: (week: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  chapters: [],
  currentChapter: null,
  members: [],
  leaderboard: null,
  currentWeek: 1,
  loading: false,
  error: null,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      setChapters: (chapters) => set({ chapters }),
      setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
      setMembers: (members) => set({ members }),
      setLeaderboard: (leaderboard) => set({ leaderboard }),
      setCurrentWeek: (week) => set({ currentWeek: week }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      reset: () => set(initialState),
    }),
    {
      name: 'bni-game-store',
      partialize: (state) => ({
        currentChapter: state.currentChapter,
        currentWeek: state.currentWeek,
      }),
    }
  )
);