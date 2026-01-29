import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy,
  TrendingUp,
  Target,
  Lightbulb,
  Download,
  Share2,
  CheckCircle,
  ArrowUpRight
} from "lucide-react";

const LearnerResults = () => {
  const insights = [
    {
      category: "Cultural Awareness",
      before: 45,
      after: 78,
      description: "Your understanding of cultural nuances has significantly improved."
    },
    {
      category: "Inclusive Communication",
      before: 60,
      after: 85,
      description: "You've developed stronger skills in inclusive dialogue."
    },
    {
      category: "Perspective Taking",
      before: 50,
      after: 82,
      description: "You're now better at understanding different viewpoints."
    },
    {
      category: "Bias Recognition",
      before: 40,
      after: 72,
      description: "You've improved at identifying unconscious biases."
    }
  ];

  const achievements = [
    { id: 1, title: "Journey Complete", description: "Finished all surveys and gameplay", earned: true },
    { id: 2, title: "Reflective Learner", description: "Provided thoughtful survey responses", earned: true },
    { id: 3, title: "Growth Mindset", description: "Showed improvement across all areas", earned: true },
  ];

  const keyTakeaways = [
    "Practice active listening in cross-cultural conversations",
    "Challenge assumptions before forming opinions",
    "Seek out diverse perspectives in decision-making",
    "Use inclusive language in team communications"
  ];

  return (
    <DashboardLayout role="learner">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 py-6">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Congratulations!</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            You've completed your Off the Map journey. Here's a summary of your personal growth and insights.
          </p>
        </div>

        {/* Overall Score */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Overall Growth Score</p>
                <p className="text-4xl font-bold">+32%</p>
                <p className="text-sm text-green-500 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Significant improvement
                </p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-green-500 border-green-500">
                  <CheckCircle className="mr-1 h-3 w-3" /> All Complete
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Growth Areas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{insight.category}</CardTitle>
                    <Badge variant="secondary" className="text-green-500">
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                      +{insight.after - insight.before}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Before</span>
                      <span>{insight.before}%</span>
                    </div>
                    <Progress value={insight.before} className="h-2 opacity-50" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">After</span>
                      <span className="text-green-500 font-medium">{insight.after}%</span>
                    </div>
                    <Progress value={insight.after} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Takeaways */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Key Takeaways
            </CardTitle>
            <CardDescription>
              Actions to apply in your daily work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {keyTakeaways.map((takeaway, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Target className="h-5 w-5 text-primary mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Achievements Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`p-4 rounded-lg border text-center ${
                    achievement.earned ? 'bg-primary/5 border-primary/20' : 'opacity-50'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-yellow-500/20' : 'bg-muted'}`}>
                      <Trophy className={`h-6 w-6 ${achievement.earned ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearnerResults;
