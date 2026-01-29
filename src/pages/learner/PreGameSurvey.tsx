import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  ClipboardList
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PreGameSurvey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      type: "radio",
      question: "How would you rate your current understanding of diversity and inclusion in the workplace?",
      options: ["Very Low", "Low", "Moderate", "High", "Very High"]
    },
    {
      id: 2,
      type: "radio",
      question: "How comfortable are you discussing topics related to cultural differences?",
      options: ["Very Uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very Comfortable"]
    },
    {
      id: 3,
      type: "radio",
      question: "How often do you interact with colleagues from different cultural backgrounds?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"]
    },
    {
      id: 4,
      type: "text",
      question: "What do you hope to learn from this experience?",
      placeholder: "Share your thoughts..."
    },
    {
      id: 5,
      type: "radio",
      question: "How would you describe your team's current approach to inclusive practices?",
      options: ["Needs Improvement", "Developing", "Adequate", "Good", "Excellent"]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast({
        title: "Survey Completed!",
        description: "Thank you for completing the pre-game survey. You can now play the game.",
      });
      navigate('/learner/game');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const isAnswered = answers[currentQ.id] !== undefined && answers[currentQ.id] !== '';

  return (
    <DashboardLayout role="learner">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <ClipboardList className="h-5 w-5" />
            <span className="text-sm font-medium">Pre-Game Survey</span>
          </div>
          <h1 className="text-2xl font-bold">Before You Play</h1>
          <p className="text-muted-foreground">
            Help us understand your starting point. Your answers are confidential.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="font-medium">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            {currentQ.type === 'text' && (
              <CardDescription>Take your time to reflect on this question.</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {currentQ.type === 'radio' && currentQ.options && (
              <RadioGroup
                value={answers[currentQ.id] || ''}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {currentQ.options.map((option) => (
                  <div 
                    key={option} 
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer hover:border-primary/50 ${
                      answers[currentQ.id] === option ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                    {answers[currentQ.id] === option && (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </RadioGroup>
            )}
            {currentQ.type === 'text' && (
              <Textarea
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder={currentQ.placeholder}
                className="min-h-[150px]"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentQuestion === questions.length - 1 ? (
              <>Complete Survey <CheckCircle className="ml-2 h-4 w-4" /></>
            ) : (
              <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PreGameSurvey;
