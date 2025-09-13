import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { Equation } from '@/types/game';
import { validateAnswer } from '@/utils/equations';

interface EquationSolverProps {
  equation: Equation;
  onSolved: (correct: boolean) => void;
  showHint?: boolean;
  onHintRequest?: () => void;
}

export const EquationSolver = ({ equation, onSolved, showHint, onHintRequest }: EquationSolverProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHintText, setShowHintText] = useState(false);

  // Reset solver state when a new equation arrives
  useEffect(() => {
    setUserAnswer('');
    setFeedback(null);
    setShowHintText(false);
  }, [equation.id]);

  const handleSubmit = () => {
    const numericAnswer = parseFloat(userAnswer);
    if (isNaN(numericAnswer)) {
      setFeedback('incorrect');
      return;
    }

    const isCorrect = validateAnswer(equation, numericAnswer);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setTimeout(() => onSolved(true), 1500);
    }
  };

  const handleHintClick = () => {
    setShowHintText(true);
    onHintRequest?.();
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-success text-success-foreground';
      case 2: return 'bg-primary text-primary-foreground';
      case 3: return 'bg-accent text-accent-foreground';
      case 4: return 'bg-magic text-white';
      case 5: return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyText = (difficulty: number) => {
    const levels = ['', 'Novice', 'Apprentice', 'Adept', 'Expert', 'Master'];
    return levels[difficulty] || 'Unknown';
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm shadow-card-adventure border-border/50">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-magic animate-pulse" />
          <Badge className={getDifficultyColor(equation.difficulty)}>
            {getDifficultyText(equation.difficulty)} Level
          </Badge>
          <Sparkles className="h-5 w-5 text-magic animate-pulse" />
        </div>
        <CardTitle className="text-xl font-bold text-treasure">
          Solve the Magical Equation
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Find the value of x to continue your adventure
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Equation Display */}
        <div className="text-center p-6 bg-gradient-adventure rounded-lg border border-border/30">
          <div className="text-2xl font-mono font-bold text-foreground mb-2">
            {equation.expression}
          </div>
          <div className="text-sm text-muted-foreground">
            What is the value of x?
          </div>
        </div>

        {/* Answer Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Your Answer:
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter x value..."
              className="flex-1"
              disabled={feedback === 'correct'}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button 
              onClick={handleSubmit}
              disabled={!userAnswer || feedback === 'correct'}
              variant={feedback === 'correct' ? 'default' : 'secondary'}
              className="min-w-[100px]"
            >
              {feedback === 'correct' ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                'Solve'
              )}
            </Button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`p-3 rounded-lg text-center font-medium ${
            feedback === 'correct' 
              ? 'bg-success/20 text-success border border-success/30' 
              : 'bg-destructive/20 text-destructive border border-destructive/30'
          }`}>
            {feedback === 'correct' ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Excellent! The magic responds to your wisdom!
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <XCircle className="h-5 w-5" />
                Not quite right. Try again, brave adventurer!
              </div>
            )}
          </div>
        )}

        {/* Hint Section */}
        {showHint && (
          <div className="space-y-2">
            {!showHintText ? (
              <Button
                variant="outline"
                onClick={handleHintClick}
                className="w-full border-magic/30 hover:bg-magic/10"
              >
                <Lightbulb className="h-4 w-4 mr-2 text-magic" />
                Need a hint? (Uses magical wisdom)
              </Button>
            ) : (
              <div className="p-3 bg-magic/10 border border-magic/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-magic mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-magic mb-1">Magical Hint:</div>
                    <div className="text-sm text-muted-foreground">
                      {equation.hint}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};