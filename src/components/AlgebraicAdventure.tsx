import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GameState } from '@/types/game';
import { createGameLevels, saveGameProgress, loadGameProgress } from '@/utils/gameData';
import { AdventureMap } from './AdventureMap';
import { GameLevel } from './GameLevel';

type GameView = 'map' | 'level';

export const AlgebraicAdventure = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    levels: createGameLevels(),
    inventory: [],
    totalScore: 0,
    hintsUsed: 0,
  });
  const [currentView, setCurrentView] = useState<GameView>('map');
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);

  // Load saved progress on component mount
  useEffect(() => {
    const savedProgress = loadGameProgress();
    if (savedProgress) {
      setGameState(prevState => ({
        ...prevState,
        ...savedProgress,
        levels: prevState.levels.map((level, index) => {
          const savedLevel = savedProgress.levels?.[index];
          return savedLevel || level;
        }),
      }));
      toast.success('Welcome back, brave adventurer!');
    } else {
      toast.success('Welcome to your Algebraic Adventure!');
    }
  }, []);

  // Save progress whenever game state changes
  useEffect(() => {
    saveGameProgress(gameState);
  }, [gameState]);

  const handleLevelSelect = (levelIndex: number) => {
    const level = gameState.levels[levelIndex];
    if (level.isUnlocked) {
      setSelectedLevelIndex(levelIndex);
      setCurrentView('level');
    }
  };

  const handleLevelComplete = (levelId: string, reward: string) => {
    setGameState(prevState => {
      const newLevels = [...prevState.levels];
      const completedLevelIndex = newLevels.findIndex(level => level.id === levelId);
      
      if (completedLevelIndex !== -1) {
        // Mark current level as completed
        newLevels[completedLevelIndex] = {
          ...newLevels[completedLevelIndex],
          isCompleted: true,
        };

        // Unlock next level
        if (completedLevelIndex + 1 < newLevels.length) {
          newLevels[completedLevelIndex + 1] = {
            ...newLevels[completedLevelIndex + 1],
            isUnlocked: true,
          };
        }
      }

      const newInventory = [...prevState.inventory];
      if (!newInventory.includes(reward)) {
        newInventory.push(reward);
      }

      return {
        ...prevState,
        levels: newLevels,
        inventory: newInventory,
        totalScore: prevState.totalScore + (completedLevelIndex + 1) * 100,
        currentLevel: Math.max(prevState.currentLevel, completedLevelIndex + 1),
      };
    });

    // Show success message
    toast.success(`Level completed! You earned: ${reward}`, {
      description: 'The adventure continues...',
      duration: 3000,
    });

    // Return to map after a delay
    setTimeout(() => {
      setCurrentView('map');
    }, 3000);
  };

  const handleBackToMap = () => {
    setCurrentView('map');
  };

  if (currentView === 'level') {
    const selectedLevel = gameState.levels[selectedLevelIndex];
    return (
      <div className="min-h-screen bg-gradient-adventure p-4">
        <GameLevel
          level={selectedLevel}
          onComplete={handleLevelComplete}
          onBack={handleBackToMap}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-adventure p-4">
      <AdventureMap
        levels={gameState.levels}
        currentLevel={gameState.currentLevel}
        totalScore={gameState.totalScore}
        onLevelSelect={handleLevelSelect}
        inventory={gameState.inventory}
      />
    </div>
  );
};