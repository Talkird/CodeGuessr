import { create } from "zustand";

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

  generateAnswer: () => {
    const digits = String(Math.floor(1000 + Math.random() * 9000));
    set({ answer: digits });
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

    console.log("Answer:", answer);
    console.log("Guess:", guess);
    console.log("Correct:", correct);
    console.log("Partial:", partial);
    console.log("Incorrect:", incorrect);
    console.log("Won:", hasWon);
    console.log("Lost:", hasLost);
    console.log("Attempts:", attemptsLeft);

    set({
      attempts: [...attempts, { guess, correct, partial, incorrect }],
      attemptsLeft: newAttemptsLeft,
      hasWon,
      hasLost,
    });
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
