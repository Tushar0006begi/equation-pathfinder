import { GameLevel } from '../types/game';
import { generateEquation } from './equations';

export const createGameLevels = (): GameLevel[] => [
  {
    id: 'dungeon-entrance',
    name: 'The Dungeon Entrance',
    description: 'A mysterious door blocks your path. Solve the magical equation to unlock it.',
    equations: [
      generateEquation(1),
      generateEquation(1),
    ],
    isUnlocked: true,
    isCompleted: false,
    reward: 'Ancient Key',
    storyText: 'You stand before an ancient stone door covered in glowing runes. The magic responds to mathematical truth...'
  },
  {
    id: 'treasure-chamber',
    name: 'The First Treasure Chamber',
    description: 'Golden chests await, but each requires solving an equation to open.',
    equations: [
      generateEquation(2),
      generateEquation(2),
      generateEquation(1),
    ],
    isUnlocked: false,
    isCompleted: false,
    reward: 'Magic Scroll',
    storyText: 'The chamber gleams with golden light. Three treasure chests pulse with magical energy, each sealed with a mathematical lock.'
  },
  {
    id: 'bridge-puzzle',
    name: 'The Bridge of Variables',
    description: 'A mystical bridge appears only when you solve the guardian\'s riddles.',
    equations: [
      generateEquation(3),
      generateEquation(3),
    ],
    isUnlocked: false,
    isCompleted: false,
    reward: 'Crystal of Power',
    storyText: 'Before you lies a chasm spanned by shimmering magical energy. The bridge guardian speaks: "Answer my riddles to cross."'
  },
  {
    id: 'dragons-lair',
    name: 'The Dragon\'s Mathematical Lair',
    description: 'Face the ancient dragon in a battle of wits and equations.',
    equations: [
      generateEquation(4),
      generateEquation(4),
      generateEquation(3),
    ],
    isUnlocked: false,
    isCompleted: false,
    reward: 'Dragon Scale Shield',
    storyText: 'The dragon raises its mighty head, eyes glowing with ancient wisdom. "Prove your mathematical prowess, young adventurer!"'
  },
  {
    id: 'final-sanctuary',
    name: 'The Ultimate Sanctuary',
    description: 'The final challenge awaits. Master the most complex equations to claim victory.',
    equations: [
      generateEquation(5),
      generateEquation(5),
      generateEquation(4),
      generateEquation(4),
    ],
    isUnlocked: false,
    isCompleted: false,
    reward: 'Crown of Mathematical Mastery',
    storyText: 'At the heart of the dungeon lies the Ultimate Sanctuary, where only the most skilled mathematicians may enter...'
  }
];

// Save game progress to localStorage
export const saveGameProgress = (gameState: any) => {
  try {
    localStorage.setItem('algebraic-adventure-progress', JSON.stringify({
      ...gameState,
      lastSaved: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to save game progress:', error);
  }
};

// Load game progress from localStorage
export const loadGameProgress = () => {
  try {
    const saved = localStorage.getItem('algebraic-adventure-progress');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load game progress:', error);
  }
  return null;
};