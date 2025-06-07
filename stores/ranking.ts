import { storage } from "@/utils/storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WinEntry {
  player: string;
  wins: number;
  losses: number;
}

interface RankingState {
  scores: WinEntry[];
  addEntry: (player: string) => void;
  addLoss: (player: string) => void;
  reset: () => void;
}

export const useRankingStore = create<RankingState>()(
  persist(
    (set, get) => ({
      scores: [],
      addEntry: (player) =>
        set((state) => {
          const idx = state.scores.findIndex((e) => e.player === player);
          if (idx !== -1) {
            // Increment wins for existing player
            const updated = [...state.scores];
            updated[idx] = { ...updated[idx], wins: updated[idx].wins + 1 };
            return { scores: updated };
          } else {
            // Add new player with 1 win
            return {
              scores: [...state.scores, { player, wins: 1, losses: 0 }],
            };
          }
        }),
      addLoss: (player) =>
        set((state) => {
          const idx = state.scores.findIndex((e) => e.player === player);
          if (idx !== -1) {
            const updated = [...state.scores];
            updated[idx] = {
              ...updated[idx],
              losses: (updated[idx].losses ?? 0) + 1,
            };
            return { scores: updated };
          } else {
            return {
              scores: [...state.scores, { player, wins: 0, losses: 1 }],
            };
          }
        }),
      reset: () => set({ scores: [] }),
    }),
    {
      name: "ranking-storage",
      storage: storage,
    }
  )
);
