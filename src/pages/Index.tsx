import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { FlaskConical, Calculator, Gamepad2, Trophy } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Educational Games
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn through interactive gaming experiences. Choose your adventure and master complex subjects through gamification!
          </p>
        </div>

        {/* Game Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Algebraic Adventure */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Algebraic Adventure</CardTitle>
              <CardDescription className="text-base">
                Embark on a mystical journey through dungeons while solving algebraic equations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">Equations</Badge>
                <Badge variant="secondary">Variables</Badge>
                <Badge variant="secondary">Problem Solving</Badge>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                <p>✨ 5 Progressive Levels</p>
                <p>🏆 Reward System</p>
                <p>💡 Hint System</p>
                <p>💾 Save Progress</p>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => navigate('/algebra')}
              >
                Start Adventure
              </Button>
            </CardContent>
          </Card>

          {/* Chemistry Lab */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Chemistry Lab</CardTitle>
              <CardDescription className="text-base">
                Mix real chemicals, observe reactions, and learn through hands-on experimentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary">Chemical Reactions</Badge>
                <Badge variant="secondary">Acid-Base</Badge>
                <Badge variant="secondary">Stoichiometry</Badge>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                <p>🧪 Realistic Colors</p>
                <p>⚖️ Ratio Calculations</p>
                <p>🎯 Multiple Attempts</p>
                <p>📊 Progress Tracking</p>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => navigate('/chemistry')}
              >
                Enter Lab
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Games?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gamification</h3>
              <p className="text-muted-foreground">
                Learn through engaging game mechanics with rewards, achievements, and progression systems
              </p>
            </div>
            <div className="p-6">
              <FlaskConical className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Hands-on simulations and real-time feedback make complex concepts easier to understand
              </p>
            </div>
            <div className="p-6">
              <Calculator className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Progressive Difficulty</h3>
              <p className="text-muted-foreground">
                Start with basics and gradually advance to more challenging problems at your own pace
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
