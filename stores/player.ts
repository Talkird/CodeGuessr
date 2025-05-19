import { create } from "zustand";

interface PlayerState {
  name: string;
  setName: (name: string) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
}));
