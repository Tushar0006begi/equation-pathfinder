import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lock, Trophy, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { GameLevel as GameLevelType } from '@/types/game';
import { EquationSolver } from './EquationSolver';

interface GameLevelProps {
  level: GameLevelType;
  onComplete: (levelId: string, reward: string) => void;
  onBack: () => void;
}

export const GameLevel = ({ level, onComplete, onBack }: GameLevelProps) => {
  const [currentEquationIndex, setCurrentEquationIndex] = useState(0);
  const [completedEquations, setCompletedEquations] = useState<boolean[]>(
    new Array(level.equations.length).fill(false)
  );
  const [showStory, setShowStory] = useState(true);
  const [hintsUsed, setHintsUsed] = useState(0);

  const currentEquation = level.equations[currentEquationIndex];
  const progressPercentage = (completedEquations.filter(Boolean).length / level.equations.length) * 100;
  const isLevelComplete = completedEquations.every(Boolean);

  const handleEquationSolved = (correct: boolean) => {
    if (correct) {
      const newCompleted = [...completedEquations];
      newCompleted[currentEquationIndex] = true;
      setCompletedEquations(newCompleted);

      // Move to next equation or complete level
      if (currentEquationIndex < level.equations.length - 1) {
        setTimeout(() => {
          setCurrentEquationIndex(currentEquationIndex + 1);
        }, 2000);
      } else {
        // Level complete!
        setTimeout(() => {
          onComplete(level.id, level.reward);
        }, 2000);
      }
    }
  };

  const handleHintRequest = () => {
    setHintsUsed(prev => prev + 1);
  };

  if (showStory) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-card/95 backdrop-blur-sm shadow-card-adventure">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-magic" />
            <CardTitle className="text-2xl font-bold bg-gradient-treasure bg-clip-text text-transparent">
              {level.name}
            </CardTitle>
            <BookOpen className="h-6 w-6 text-magic" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="p-6 bg-gradient-adventure rounded-lg border border-border/30">
            <p className="text-foreground leading-relaxed text-center">
              {level.storyText}
            </p>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">{level.description}</p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className="border-magic/30 bg-magic/10">
                {level.equations.length} Equations to Solve
              </Badge>
              <Badge variant="outline" className="border-treasure/30 bg-treasure/10">
                Reward: {level.reward}
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={onBack}>
              Return to Map
            </Button>
            <Button 
              onClick={() => setShowStory(false)}
              className="bg-gradient-magic hover:shadow-magical transition-all duration-300"
            >
              Begin Adventure
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLevelComplete) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-card/95 backdrop-blur-sm shadow-treasure animate-treasure-bounce">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-treasure animate-pulse" />
            <CardTitle className="text-3xl font-bold bg-gradient-treasure bg-clip-text text-transparent">
              Victory!
            </CardTitle>
            <Trophy className="h-8 w-8 text-treasure animate-pulse" />
          </div>
          <CardDescription className="text-lg">
            You have conquered {level.name}!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div className="p-6 bg-gradient-success rounded-lg border border-success/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-success" />
              <span className="font-bold text-success">Reward Unlocked!</span>
              <Sparkles className="h-5 w-5 text-success" />
            </div>
            <p className="text-2xl font-bold text-success">{level.reward}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-muted-foreground">Your Performance:</p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline">
                Equations Solved: {level.equations.length}
              </Badge>
              <Badge variant="outline">
                Hints Used: {hintsUsed}
              </Badge>
            </div>
          </div>
          
          <Button 
            onClick={onBack}
            className="bg-gradient-treasure hover:shadow-treasure transition-all duration-300"
          >
            Continue Journey
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Level Header */}
      <Card className="bg-card/95 backdrop-blur-sm shadow-card-adventure">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-treasure">
                {level.name}
              </CardTitle>
              <CardDescription>
                Equation {currentEquationIndex + 1} of {level.equations.length}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onBack}>
              Back to Map
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Current Equation */}
      <div className="flex justify-center">
        <EquationSolver
          key={currentEquation.id}
          equation={currentEquation}
          onSolved={handleEquationSolved}
          showHint={true}
          onHintRequest={handleHintRequest}
        />
      </div>
      
      {/* Equation Progress Indicators */}
      <div className="flex justify-center gap-2">
        {level.equations.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              completedEquations[index]
                ? 'bg-success shadow-success'
                : index === currentEquationIndex
                ? 'bg-magic animate-magical-glow'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};