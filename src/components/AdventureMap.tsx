import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, Trophy, MapPin, Sparkles, Star, Crown } from 'lucide-react';
import { GameLevel } from '@/types/game';

interface AdventureMapProps {
  levels: GameLevel[];
  currentLevel: number;
  totalScore: number;
  onLevelSelect: (levelIndex: number) => void;
  inventory: string[];
}

export const AdventureMap = ({ levels, currentLevel, totalScore, onLevelSelect, inventory }: AdventureMapProps) => {
  const completedLevels = levels.filter(level => level.isCompleted).length;
  const totalLevels = levels.length;
  const overallProgress = (completedLevels / totalLevels) * 100;

  const getLevelIcon = (level: GameLevel, index: number) => {
    if (level.isCompleted) {
      return <Trophy className="h-6 w-6 text-treasure" />;
    }
    if (level.isUnlocked) {
      return <MapPin className="h-6 w-6 text-magic" />;
    }
    return <Lock className="h-6 w-6 text-locked" />;
  };

  const getLevelCardStyle = (level: GameLevel, index: number) => {
    if (level.isCompleted) {
      return 'bg-gradient-success border-success/30 hover:shadow-success';
    }
    if (level.isUnlocked) {
      return 'bg-gradient-magic border-magic/30 hover:shadow-magical';
    }
    return 'bg-locked/20 border-locked/30';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Game Header */}
      <Card className="bg-card/95 backdrop-blur-sm shadow-card-adventure">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-8 w-8 text-treasure animate-pulse" />
            <CardTitle className="text-3xl font-bold bg-gradient-treasure bg-clip-text text-transparent">
              Algebraic Adventure
            </CardTitle>
            <Crown className="h-8 w-8 text-treasure animate-pulse" />
          </div>
          <CardDescription className="text-lg">
            Master the art of algebra through mystical challenges
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-adventure rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-treasure">{completedLevels}/{totalLevels}</div>
              <div className="text-sm text-muted-foreground">Levels Completed</div>
            </div>
            <div className="text-center p-4 bg-gradient-adventure rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-magic">{totalScore}</div>
              <div className="text-sm text-muted-foreground">Total Score</div>
            </div>
            <div className="text-center p-4 bg-gradient-adventure rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-accent">{inventory.length}</div>
              <div className="text-sm text-muted-foreground">Items Collected</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Inventory Display */}
      {inventory.length > 0 && (
        <Card className="bg-card/95 backdrop-blur-sm shadow-card-adventure">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-treasure flex items-center gap-2">
              <Star className="h-5 w-5" />
              Your Magical Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {inventory.map((item, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-treasure/10 border-treasure/30 text-treasure"
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Level Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level, index) => (
          <Card 
            key={level.id}
            className={`transition-all duration-300 cursor-pointer ${getLevelCardStyle(level, index)} ${
              level.isUnlocked ? 'hover:scale-105' : 'cursor-not-allowed'
            }`}
            onClick={() => level.isUnlocked && onLevelSelect(index)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getLevelIcon(level, index)}
                  <Badge variant="outline" className="text-xs">
                    Level {index + 1}
                  </Badge>
                </div>
                {level.isCompleted && (
                  <Trophy className="h-4 w-4 text-treasure animate-pulse" />
                )}
              </div>
              <CardTitle className="text-lg">
                {level.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {level.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Equations:</span>
                  <span className="font-medium">{level.equations.length}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reward:</span>
                  <span className="font-medium text-treasure">{level.reward}</span>
                </div>
                
                {level.isUnlocked && !level.isCompleted && (
                  <Button 
                    className="w-full bg-gradient-magic hover:shadow-magical"
                    size="sm"
                  >
                    Enter Level
                  </Button>
                )}
                
                {level.isCompleted && (
                  <Button 
                    variant="outline" 
                    className="w-full border-success/30 bg-success/10 hover:bg-success/20"
                    size="sm"
                  >
                    Replay Level
                  </Button>
                )}
                
                {!level.isUnlocked && (
                  <Button 
                    variant="outline" 
                    className="w-full border-locked/30 bg-locked/10"
                    size="sm"
                    disabled
                  >
                    <Lock className="h-3 w-3 mr-2" />
                    Locked
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};