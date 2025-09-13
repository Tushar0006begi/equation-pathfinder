import { Equation } from '../types/game';

// Generate equations based on difficulty level
export const generateEquation = (difficulty: 1 | 2 | 3 | 4 | 5): Equation => {
  const id = Math.random().toString(36).substr(2, 9);
  
  switch (difficulty) {
    case 1: {
      // Simple addition/subtraction: x + 5 = 12
      const answer = Math.floor(Math.random() * 20) + 1;
      const addend = Math.floor(Math.random() * 15) + 1;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      if (operation === '+') {
        const result = answer + addend;
        return {
          id,
          expression: `x + ${addend} = ${result}`,
          answer,
          difficulty,
          hint: `To solve x + ${addend} = ${result}, subtract ${addend} from both sides.`
        };
      } else {
        const result = answer - addend;
        return {
          id,
          expression: `x - ${addend} = ${result}`,
          answer,
          difficulty,
          hint: `To solve x - ${addend} = ${result}, add ${addend} to both sides.`
        };
      }
    }
    
    case 2: {
      // Simple multiplication/division: 3x = 15
      const answer = Math.floor(Math.random() * 10) + 1;
      const coefficient = Math.floor(Math.random() * 8) + 2;
      const operation = Math.random() > 0.5 ? '*' : '/';
      
      if (operation === '*') {
        const result = answer * coefficient;
        return {
          id,
          expression: `${coefficient}x = ${result}`,
          answer,
          difficulty,
          hint: `To solve ${coefficient}x = ${result}, divide both sides by ${coefficient}.`
        };
      } else {
        const result = Math.floor(answer / coefficient);
        const actualAnswer = result * coefficient;
        return {
          id,
          expression: `x ÷ ${coefficient} = ${result}`,
          answer: actualAnswer,
          difficulty,
          hint: `To solve x ÷ ${coefficient} = ${result}, multiply both sides by ${coefficient}.`
        };
      }
    }
    
    case 3: {
      // Two-step equations: 2x + 5 = 15
      const answer = Math.floor(Math.random() * 15) + 1;
      const coefficient = Math.floor(Math.random() * 5) + 2;
      const constant = Math.floor(Math.random() * 20) + 1;
      const operation = Math.random() > 0.5 ? '+' : '-';
      
      if (operation === '+') {
        const result = coefficient * answer + constant;
        return {
          id,
          expression: `${coefficient}x + ${constant} = ${result}`,
          answer,
          difficulty,
          hint: `First subtract ${constant} from both sides, then divide by ${coefficient}.`
        };
      } else {
        const result = coefficient * answer - constant;
        return {
          id,
          expression: `${coefficient}x - ${constant} = ${result}`,
          answer,
          difficulty,
          hint: `First add ${constant} to both sides, then divide by ${coefficient}.`
        };
      }
    }
    
    case 4: {
      // Equations with variables on both sides: 3x + 2 = x + 10
      const answer = Math.floor(Math.random() * 12) + 1;
      const leftCoeff = Math.floor(Math.random() * 4) + 2;
      const leftConst = Math.floor(Math.random() * 15) + 1;
      const rightCoeff = Math.floor(Math.random() * 3) + 1;
      
      const rightConst = leftCoeff * answer + leftConst - rightCoeff * answer;
      
      return {
        id,
        expression: `${leftCoeff}x + ${leftConst} = ${rightCoeff}x + ${rightConst}`,
        answer,
        difficulty,
        hint: `Move all x terms to one side and constants to the other side.`
      };
    }
    
    case 5: {
      // Complex multi-step: 2(x + 3) = 4x - 2
      const answer = Math.floor(Math.random() * 8) + 1;
      const outerCoeff = Math.floor(Math.random() * 3) + 2;
      const innerConst = Math.floor(Math.random() * 5) + 1;
      const rightCoeff = Math.floor(Math.random() * 5) + 2;
      
      const rightConst = outerCoeff * (answer + innerConst) - rightCoeff * answer;
      
      return {
        id,
        expression: `${outerCoeff}(x + ${innerConst}) = ${rightCoeff}x - ${rightConst}`,
        answer,
        difficulty,
        hint: `First distribute, then solve like a regular equation.`
      };
    }
    
    default:
      return generateEquation(1);
  }
};

// Validate player's answer
export const validateAnswer = (equation: Equation, userAnswer: number): boolean => {
  return Math.abs(equation.answer - userAnswer) < 0.001; // Handle floating point precision
};

// Get step-by-step solution
export const getSolution = (equation: Equation): string[] => {
  // This would contain step-by-step solutions for each equation type
  // For now, return the hint as a simple solution
  return [equation.hint || "Solve for x by isolating the variable."];
};