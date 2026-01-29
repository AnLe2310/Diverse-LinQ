import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  ClipboardList, 
  Trophy, 
  Clock,
  CheckCircle,
  ArrowRight,
  Gamepad2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnerHome = () => {
  const navigate = useNavigate();

  const assignedGames = [
    { id: 1, name: "Off the Map", status: "ready", surveyComplete: true, played: false },
  ];

  const pendingTasks = [
    { id: 1, type: "survey", title: "Pre-game Survey", game: "Off the Map", status: "pending" },
    { id: 2, type: "game", title: "Play Off the Map", game: "Off the Map", status: "locked" },
    { id: 3, type: "survey", title: "Post-game Survey", game: "Off the Map", status: "locked" },
  ];

  const progress = {
    surveysCompleted: 0,
    gamesPlayed: 0,
    totalTasks: 3
  };

  return (
    <DashboardLayout role="learner">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Complete your surveys and games to unlock your personal insights.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Your Progress</p>
                <p className="text-2xl font-bold">{Math.round((progress.surveysCompleted + progress.gamesPlayed) / progress.totalTasks * 100)}% Complete</p>
              </div>
              <Trophy className="h-12 w-12 text-primary/50" />
            </div>
            <Progress value={(progress.surveysCompleted + progress.gamesPlayed) / progress.totalTasks * 100} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{progress.surveysCompleted} surveys completed</span>
              <span>{progress.gamesPlayed} games played</span>
            </div>
          </CardContent>
        </Card>

        {/* Tasks to Complete */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <Card 
                key={task.id} 
                className={`transition-all ${task.status === 'pending' ? 'border-primary/50 bg-primary/5' : 'opacity-60'}`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${task.status === 'pending' ? 'bg-primary/20' : 'bg-muted'}`}>
                      {task.type === 'survey' ? (
                        <ClipboardList className={`h-5 w-5 ${task.status === 'pending' ? 'text-primary' : 'text-muted-foreground'}`} />
                      ) : (
                        <Gamepad2 className={`h-5 w-5 ${task.status === 'pending' ? 'text-primary' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Step {index + 1}</span>
                        {task.status === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="font-medium">{task.title}</p>
                    </div>
                  </div>
                  {task.status === 'pending' ? (
                    <Button 
                      onClick={() => navigate(task.type === 'survey' ? '/learner/pre-survey' : '/learner/game')}
                    >
                      Start <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : task.status === 'locked' ? (
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" /> Locked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" /> Done
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Assigned Games */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Games</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {assignedGames.map((game) => (
              <Card key={game.id} className="overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                  <Gamepad2 className="h-16 w-16 text-primary/50" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{game.name}</CardTitle>
                    <Badge variant={game.status === 'ready' ? 'default' : 'secondary'}>
                      {game.status === 'ready' ? 'Ready to Play' : 'Locked'}
                    </Badge>
                  </div>
                  <CardDescription>
                    Complete the pre-game survey to unlock
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    disabled={game.status !== 'ready'}
                    onClick={() => navigate('/learner/game')}
                  >
                    <Play className="mr-2 h-4 w-4" /> Launch Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearnerHome;
