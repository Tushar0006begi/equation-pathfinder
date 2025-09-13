export interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
  concentration: number;
  volume: number; // in mL
  description: string;
}

export interface Reaction {
  id: string;
  reactants: { formula: string; ratio: number }[];
  products: { formula: string; ratio: number }[];
  name: string;
  description: string;
  correctRatio: number[]; // Expected ratio for reactants
  resultColor: string;
}

export interface GameLevel {
  id: string;
  title: string;
  description: string;
  targetReaction: Reaction;
  availableChemicals: Chemical[];
  maxAttempts: number;
  scoreMultiplier: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface ChemistryGameState {
  currentLevel: number;
  levels: GameLevel[];
  totalScore: number;
  achievements: string[];
  experimentsCompleted: number;
}

export interface MixingResult {
  success: boolean;
  resultChemical: Chemical | null;
  feedback: string;
  scoreEarned: number;
  isOptimalRatio: boolean;
}