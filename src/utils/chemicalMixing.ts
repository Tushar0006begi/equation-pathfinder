import { Chemical, Reaction, MixingResult } from '@/types/chemistry';
import { chemicals } from './chemicalData';

export const mixChemicals = (
  chemical1: Chemical,
  volume1: number,
  chemical2: Chemical,
  volume2: number,
  targetReaction: Reaction
): MixingResult => {
  // Find the reactants in the target reaction
  const reactant1 = targetReaction.reactants.find(r => r.formula === chemical1.formula);
  const reactant2 = targetReaction.reactants.find(r => r.formula === chemical2.formula);
  
  if (!reactant1 || !reactant2) {
    return {
      success: false,
      resultChemical: null,
      feedback: "These chemicals don't react according to the target reaction!",
      scoreEarned: 0,
      isOptimalRatio: false
    };
  }
  
  // Calculate the ratio
  const actualRatio = volume1 / volume2;
  const expectedRatio = reactant1.ratio / reactant2.ratio;
  const tolerance = 0.2; // 20% tolerance
  
  const isOptimalRatio = Math.abs(actualRatio - expectedRatio) / expectedRatio <= tolerance;
  
  if (isOptimalRatio) {
    // Create result chemical
    const totalVolume = volume1 + volume2;
    const resultChemical: Chemical = {
      id: 'result',
      name: `${targetReaction.products.map(p => p.formula).join(' + ')}`,
      formula: targetReaction.products.map(p => p.formula).join(' + '),
      color: targetReaction.resultColor,
      concentration: 1.0,
      volume: totalVolume,
      description: `Product of ${targetReaction.name}`
    };
    
    const scoreEarned = Math.floor(100 * (1 - Math.abs(actualRatio - expectedRatio) / expectedRatio));
    
    return {
      success: true,
      resultChemical,
      feedback: `Perfect! You successfully performed ${targetReaction.name}!`,
      scoreEarned: Math.max(scoreEarned, 50),
      isOptimalRatio: true
    };
  } else {
    // Partial reaction or wrong ratio
    const totalVolume = volume1 + volume2;
    const mixedColor = blendColors(chemical1.color, chemical2.color, volume1 / totalVolume);
    
    const resultChemical: Chemical = {
      id: 'mixture',
      name: 'Incomplete Mixture',
      formula: `${chemical1.formula} + ${chemical2.formula}`,
      color: mixedColor,
      concentration: 0.5,
      volume: totalVolume,
      description: 'The reaction was incomplete due to incorrect ratio'
    };
    
    const scoreEarned = Math.max(20, 50 - Math.floor(Math.abs(actualRatio - expectedRatio) * 10));
    
    return {
      success: false,
      resultChemical,
      feedback: `Close, but the ratio isn't quite right. Try ${expectedRatio.toFixed(1)}:1 ratio.`,
      scoreEarned,
      isOptimalRatio: false
    };
  }
};

const blendColors = (color1: string, color2: string, ratio: number): string => {
  // Simple color blending - in a real app you'd use proper color space conversion
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  const r = Math.round(r1 * ratio + r2 * (1 - ratio));
  const g = Math.round(g1 * ratio + g2 * (1 - ratio));
  const b = Math.round(b1 * ratio + b2 * (1 - ratio));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export const calculateOptimalVolumes = (reaction: Reaction, totalVolume: number = 100) => {
  const ratio1 = reaction.correctRatio[0];
  const ratio2 = reaction.correctRatio[1];
  const total = ratio1 + ratio2;
  
  return {
    volume1: (ratio1 / total) * totalVolume,
    volume2: (ratio2 / total) * totalVolume
  };
};