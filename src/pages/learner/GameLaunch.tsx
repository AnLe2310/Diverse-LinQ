import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  CheckCircle,
  Clock,
  Monitor,
  Wifi,
  Volume2,
  AlertCircle,
  Gamepad2,
  ExternalLink
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GameLaunch = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLaunching, setIsLaunching] = useState(false);

  const eligibilityChecks = [
    { id: 1, label: "Pre-game survey completed", passed: true },
    { id: 2, label: "Valid license assigned", passed: true },
    { id: 3, label: "Game access enabled by admin", passed: true },
    { id: 4, label: "Within scheduled game window", passed: true },
  ];

  const systemRequirements = [
    { icon: Monitor, label: "Desktop or laptop recommended", status: "info" },
    { icon: Wifi, label: "Stable internet connection required", status: "info" },
    { icon: Volume2, label: "Audio enabled for best experience", status: "info" },
    { icon: Clock, label: "Estimated time: 30-45 minutes", status: "info" },
  ];

  const allChecksPassed = eligibilityChecks.every(check => check.passed);

  const handleLaunchGame = () => {
    setIsLaunching(true);
    setTimeout(() => {
      toast({
        title: "Game Session Started",
        description: "Opening Off the Map in a new window...",
      });
      // In production, this would launch the actual game
      setTimeout(() => {
        setIsLaunching(false);
        navigate('/learner/post-survey');
      }, 2000);
    }, 1500);
  };

  return (
    <DashboardLayout role="learner">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Game Header */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center relative">
            <Gamepad2 className="h-24 w-24 text-primary/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="mb-2">Ready to Play</Badge>
              <h1 className="text-3xl font-bold">Off the Map</h1>
              <p className="text-muted-foreground">An immersive diversity & inclusion experience</p>
            </div>
          </div>
        </Card>

        {/* Eligibility Checks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Eligibility Check
            </CardTitle>
            <CardDescription>
              All requirements must be met before playing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eligibilityChecks.map((check) => (
                <div 
                  key={check.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    check.passed ? 'bg-green-500/10' : 'bg-destructive/10'
                  }`}
                >
                  {check.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                  <span className={check.passed ? 'text-foreground' : 'text-destructive'}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Before You Start</CardTitle>
            <CardDescription>
              Prepare for the best experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {systemRequirements.map((req, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <req.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{req.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Launch Button */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Ready to begin your journey? Click the button below to launch the game.
              </p>
              <Button
                size="lg"
                className="w-full sm:w-auto px-8"
                onClick={handleLaunchGame}
                disabled={!allChecksPassed || isLaunching}
              >
                {isLaunching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Launch Game
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              {!allChecksPassed && (
                <p className="text-sm text-destructive">
                  Please complete all eligibility requirements before playing.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GameLaunch;
