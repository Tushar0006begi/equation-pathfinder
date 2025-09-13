import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Beaker } from './Beaker';
import { ChemistryGameState, Chemical, MixingResult } from '@/types/chemistry';
import { createChemistryLevels, saveChemistryProgress, loadChemistryProgress } from '@/utils/chemicalData';
import { mixChemicals, calculateOptimalVolumes } from '@/utils/chemicalMixing';
import { FlaskConical, Trophy, Zap, RotateCcw, Info } from 'lucide-react';

export const ChemistryLab = () => {
  const [gameState, setGameState] = useState<ChemistryGameState>({
    currentLevel: 0,
    levels: createChemistryLevels(),
    totalScore: 0,
    achievements: [],
    experimentsCompleted: 0
  });
  
  const [volume1, setVolume1] = useState(50);
  const [volume2, setVolume2] = useState(50);
  const [resultChemical, setResultChemical] = useState<Chemical | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [showHint, setShowHint] = useState(false);
  const [isExperimenting, setIsExperimenting] = useState(false);

  const currentLevel = gameState.levels[gameState.currentLevel];
  const chemical1 = currentLevel?.availableChemicals[0];
  const chemical2 = currentLevel?.availableChemicals[1];

  // Load saved progress
  useEffect(() => {
    const savedProgress = loadChemistryProgress();
    if (savedProgress) {
      setGameState(prevState => ({
        ...prevState,
        ...savedProgress,
        levels: prevState.levels.map((level, index) => {
          const savedLevel = savedProgress.levels?.[index];
          return savedLevel || level;
        }),
      }));
      toast.success('Welcome back to the Chemistry Lab!');
    } else {
      toast.success('Welcome to Chemistry Lab! Start your first experiment!');
    }
  }, []);

  // Save progress whenever game state changes
  useEffect(() => {
    saveChemistryProgress(gameState);
  }, [gameState]);

  const handleMix = () => {
    if (!chemical1 || !chemical2) return;
    
    setIsExperimenting(true);
    
    // Simulate mixing animation delay
    setTimeout(() => {
      const result: MixingResult = mixChemicals(
        chemical1,
        volume1,
        chemical2,
        volume2,
        currentLevel.targetReaction
      );
      
      setResultChemical(result.resultChemical);
      
      if (result.success) {
        // Level completed
        setGameState(prev => {
          const newLevels = [...prev.levels];
          newLevels[prev.currentLevel] = {
            ...newLevels[prev.currentLevel],
            isCompleted: true
          };
          
          // Unlock next level
          if (prev.currentLevel + 1 < newLevels.length) {
            newLevels[prev.currentLevel + 1] = {
              ...newLevels[prev.currentLevel + 1],
              isUnlocked: true
            };
          }
          
          return {
            ...prev,
            levels: newLevels,
            totalScore: prev.totalScore + result.scoreEarned,
            experimentsCompleted: prev.experimentsCompleted + 1
          };
        });
        
        toast.success(`🧪 ${result.feedback}`, {
          description: `+${result.scoreEarned} points!`,
          duration: 4000
        });
        
        // Auto advance after success
        setTimeout(() => {
          handleNextLevel();
        }, 3000);
        
      } else {
        setAttemptsLeft(prev => prev - 1);
        toast.error(`❌ ${result.feedback}`, {
          description: `${attemptsLeft - 1} attempts remaining`
        });
        
        if (attemptsLeft - 1 <= 0) {
          toast.error('No more attempts! Resetting level...', {
            duration: 3000
          });
          setTimeout(() => {
            handleReset();
          }, 2000);
        }
      }
      
      setIsExperimenting(false);
    }, 2000);
  };

  const handleReset = () => {
    setVolume1(50);
    setVolume2(50);
    setResultChemical(null);
    setAttemptsLeft(currentLevel?.maxAttempts || 3);
    setShowHint(false);
  };

  const handleNextLevel = () => {
    if (gameState.currentLevel + 1 < gameState.levels.length) {
      setGameState(prev => ({
        ...prev,
        currentLevel: prev.currentLevel + 1
      }));
      handleReset();
      toast.info(`🔬 Level ${gameState.currentLevel + 2} unlocked!`);
    } else {
      toast.success('🎉 Congratulations! You completed all chemistry experiments!', {
        duration: 5000
      });
    }
  };

  const handleShowHint = () => {
    if (!currentLevel) return;
    
    const optimal = calculateOptimalVolumes(currentLevel.targetReaction);
    setShowHint(true);
    toast.info(`💡 Hint: Try approximately ${optimal.volume1.toFixed(0)}mL : ${optimal.volume2.toFixed(0)}mL ratio`, {
      duration: 5000
    });
  };

  if (!currentLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <CardTitle>Experiments Complete!</CardTitle>
            <CardDescription>
              You've mastered all chemistry experiments! Final Score: {gameState.totalScore}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()} className="w-full">
              Start New Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Chemistry Lab
              </h1>
              <p className="text-muted-foreground">Interactive Chemical Reactions</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Score</div>
              <div className="text-2xl font-bold text-blue-600">{gameState.totalScore}</div>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              Level {gameState.currentLevel + 1}
            </Badge>
          </div>
        </div>

        {/* Level Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentLevel.title}
              <Badge variant="secondary">
                {attemptsLeft}/{currentLevel.maxAttempts} attempts
              </Badge>
            </CardTitle>
            <CardDescription>{currentLevel.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <strong>Target Reaction:</strong> {currentLevel.targetReaction.name}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {currentLevel.targetReaction.description}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Lab */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 items-center">
          {/* Reactant 1 */}
          <div className="text-center">
            <Beaker
              chemical={chemical1}
              volume={volume1}
              maxVolume={100}
              label="Reactant 1"
              isGlowing={isExperimenting}
            />
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Volume (mL)</label>
              <Slider
                value={[volume1]}
                onValueChange={(value) => setVolume1(value[0])}
                max={100}
                min={10}
                step={5}
                className="w-full"
                disabled={isExperimenting}
              />
              <div className="text-xs text-muted-foreground mt-1">{volume1} mL</div>
            </div>
          </div>

          {/* Plus Sign & Mix Button */}
          <div className="text-center">
            <div className="text-4xl font-bold text-muted-foreground mb-4">+</div>
            <Button 
              onClick={handleMix}
              disabled={isExperimenting}
              size="lg"
              className="w-full animate-pulse-subtle"
            >
              {isExperimenting ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Mixing...
                </>
              ) : (
                'Mix Chemicals'
              )}
            </Button>
          </div>

          {/* Reactant 2 */}
          <div className="text-center">
            <Beaker
              chemical={chemical2}
              volume={volume2}
              maxVolume={100}
              label="Reactant 2"
              isGlowing={isExperimenting}
            />
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Volume (mL)</label>
              <Slider
                value={[volume2]}
                onValueChange={(value) => setVolume2(value[0])}
                max={100}
                min={10}
                step={5}
                className="w-full"
                disabled={isExperimenting}
              />
              <div className="text-xs text-muted-foreground mt-1">{volume2} mL</div>
            </div>
          </div>

          {/* Result */}
          <div className="text-center">
            <Beaker
              chemical={resultChemical || undefined}
              volume={resultChemical?.volume || 0}
              maxVolume={200}
              label="Result"
              isTarget={true}
            />
            {resultChemical && (
              <Badge 
                variant={resultChemical.id === 'result' ? "default" : "secondary"}
                className="mt-2"
              >
                {resultChemical.id === 'result' ? 'Success!' : 'Try Again'}
              </Badge>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" onClick={handleReset} disabled={isExperimenting}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" onClick={handleShowHint} disabled={isExperimenting}>
            <Info className="w-4 h-4 mr-2" />
            Hint
          </Button>
        </div>

        {/* Progress */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <p className="text-muted-foreground">
              Completed {gameState.levels.filter(l => l.isCompleted).length} of {gameState.levels.length} experiments
            </p>
          </div>
          <Progress 
            value={(gameState.levels.filter(l => l.isCompleted).length / gameState.levels.length) * 100} 
            className="h-3"
          />
        </div>
      </div>
    </div>
  );
};