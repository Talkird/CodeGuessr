import { storage } from "@/utils/storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScoreEntry {
  player: string;
  score: number;
}

interface RankingState {
  scores: ScoreEntry[];
  addEntry: (entry: ScoreEntry) => void;
}

export const useRankingStore = create<RankingState>()(
  persist(
    (set) => ({
      scores: [],
      addEntry: (entry) =>
        set((state) => ({ scores: [...state.scores, entry] })),
    }),
    {
      name: "ranking-storage",
      storage: storage,
    }
  )
);
