export interface Equation {
  id: string;
  expression: string;
  answer: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  hint?: string;
}

export interface GameLevel {
  id: string;
  name: string;
  description: string;
  equations: Equation[];
  isUnlocked: boolean;
  isCompleted: boolean;
  reward: string;
  storyText: string;
}

export interface GameState {
  currentLevel: number;
  levels: GameLevel[];
  inventory: string[];
  totalScore: number;
  hintsUsed: number;
}

export interface PlayerProgress {
  completedLevels: string[];
  currentScore: number;
  achievementsUnlocked: string[];
  lastPlayedDate: string;
}