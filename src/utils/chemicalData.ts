import { Chemical, Reaction, GameLevel } from '@/types/chemistry';

export const chemicals: { [key: string]: Chemical } = {
  H2SO4: {
    id: 'H2SO4',
    name: 'Sulfuric Acid',
    formula: 'H₂SO₄',
    color: '#FFE135', // Pale yellow
    concentration: 1.0,
    volume: 100,
    description: 'A strong acid used in many industrial processes'
  },
  NaOH: {
    id: 'NaOH',
    name: 'Sodium Hydroxide',
    formula: 'NaOH',
    color: '#E3F2FD', // Pale blue
    concentration: 1.0,
    volume: 100,
    description: 'A strong base, also known as caustic soda'
  },
  HCl: {
    id: 'HCl',
    name: 'Hydrochloric Acid',
    formula: 'HCl',
    color: '#FFCDD2', // Pale red
    concentration: 1.0,
    volume: 100,
    description: 'A strong acid found in stomach acid'
  },
  NH3: {
    id: 'NH3',
    name: 'Ammonia',
    formula: 'NH₃',
    color: '#E8F5E8', // Pale green
    concentration: 1.0,
    volume: 100,
    description: 'A weak base with a pungent smell'
  }
};

export const reactions: { [key: string]: Reaction } = {
  acidBase1: {
    id: 'acidBase1',
    reactants: [
      { formula: 'H₂SO₄', ratio: 1 },
      { formula: 'NaOH', ratio: 2 }
    ],
    products: [
      { formula: 'Na₂SO₄', ratio: 1 },
      { formula: 'H₂O', ratio: 2 }
    ],
    name: 'Acid-Base Neutralization',
    description: 'Sulfuric acid reacts with sodium hydroxide',
    correctRatio: [1, 2],
    resultColor: '#C8E6C9' // Light green for successful neutralization
  },
  acidBase2: {
    id: 'acidBase2',
    reactants: [
      { formula: 'HCl', ratio: 1 },
      { formula: 'NaOH', ratio: 1 }
    ],
    products: [
      { formula: 'NaCl', ratio: 1 },
      { formula: 'H₂O', ratio: 1 }
    ],
    name: 'Simple Neutralization',
    description: 'Hydrochloric acid reacts with sodium hydroxide',
    correctRatio: [1, 1],
    resultColor: '#E1F5FE' // Light blue for salt formation
  }
};

export const createChemistryLevels = (): GameLevel[] => [
  {
    id: 'level1',
    title: 'Basic Neutralization',
    description: 'Mix H₂SO₄ and NaOH in the correct 1:2 ratio to neutralize the solution',
    targetReaction: reactions.acidBase1,
    availableChemicals: [chemicals.H2SO4, chemicals.NaOH],
    maxAttempts: 3,
    scoreMultiplier: 1,
    isUnlocked: true,
    isCompleted: false
  },
  {
    id: 'level2',
    title: 'Simple Salt Formation',
    description: 'Create salt water by mixing HCl and NaOH in equal proportions',
    targetReaction: reactions.acidBase2,
    availableChemicals: [chemicals.HCl, chemicals.NaOH],
    maxAttempts: 3,
    scoreMultiplier: 1.5,
    isUnlocked: false,
    isCompleted: false
  }
];

export const saveChemistryProgress = (gameState: any) => {
  localStorage.setItem('chemistryGameProgress', JSON.stringify(gameState));
};

export const loadChemistryProgress = () => {
  const saved = localStorage.getItem('chemistryGameProgress');
  return saved ? JSON.parse(saved) : null;
};