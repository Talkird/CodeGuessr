import { create } from "zustand";
import { usePlayerStore } from "./player";
import { useRankingStore } from "./ranking";

interface Attempt {
  guess: string;
  correct: number;
  partial: number;
  incorrect: number;
}

interface GameState {
  answer: string;
  attemptsLeft: number;
  attempts: Attempt[];
  hasWon: boolean;
  hasLost: boolean;
  repeatedDigits: boolean;
  setRepeatedDigits: (value: boolean) => void;

  generateAnswer: () => void;
  takeGuess: (guess: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  answer: "",
  attemptsLeft: 10,
  attempts: [],
  hasWon: false,
  hasLost: false,
  repeatedDigits: false,

  setRepeatedDigits: (value) => set({ repeatedDigits: value }),

  generateAnswer: () => {
    let generatedAnswer = "";
    if (get().repeatedDigits) {
      // Digitos repetidos
      generatedAnswer = "";
      for (let i = 0; i < 4; i++) {
        generatedAnswer += Math.floor(Math.random() * 10).toString();
      }
    } else {
      // No repetidos
      const digits: number[] = [];
      while (digits.length < 4) {
        const digit = Math.floor(Math.random() * 10);
        if (digits.length === 0 && digit === 0) continue; // No leading zero
        if (!digits.includes(digit)) digits.push(digit);
      }
      generatedAnswer = digits.join("");
    }
    set({ answer: generatedAnswer });
  },

  takeGuess: (guess: string) => {
    const { answer, attemptsLeft, attempts } = get();
    if (attemptsLeft <= 0) return;

    const answerArr = answer.split("");
    const guessArr = guess.split("");

    let correct = 0;
    let partial = 0;

    const answerCount: Record<string, number> = {};
    const guessCount: Record<string, number> = {};

    for (let i = 0; i < 4; i++) {
      if (guessArr[i] === answerArr[i]) {
        correct++;
      } else {
        answerCount[answerArr[i]] = (answerCount[answerArr[i]] || 0) + 1;
        guessCount[guessArr[i]] = (guessCount[guessArr[i]] || 0) + 1;
      }
    }

    for (const digit in guessCount) {
      if (answerCount[digit]) {
        partial += Math.min(guessCount[digit], answerCount[digit]);
      }
    }

    const incorrect = 4 - correct - partial;
    const hasWon = correct === 4;
    const newAttemptsLeft = attemptsLeft - 1;
    const hasLost = !hasWon && newAttemptsLeft === 0;

    set({
      attempts: [...attempts, { guess, correct, partial, incorrect }],
      attemptsLeft: newAttemptsLeft,
      hasWon,
      hasLost,
    });

    if (hasWon) {
      const player = usePlayerStore.getState().name;
      useRankingStore.getState().addEntry(player);
    } else if (hasLost) {
      const player = usePlayerStore.getState().name;
      useRankingStore.getState().addLoss(player);
    }
  },

  resetGame: () => {
    set({
      answer: "",
      attempts: [],
      attemptsLeft: 10,
      hasWon: false,
      hasLost: false,
    });

    get().generateAnswer();
  },
}));
