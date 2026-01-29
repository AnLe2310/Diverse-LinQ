import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Star,
  Trophy
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PostGameSurvey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const questions = [
    {
      id: 1,
      type: "slider",
      question: "How would you rate your overall experience with Off the Map?",
      min: 1,
      max: 10,
      labels: ["Poor", "Excellent"]
    },
    {
      id: 2,
      type: "radio",
      question: "Did the game help you understand different perspectives better?",
      options: ["Not at all", "Slightly", "Moderately", "Significantly", "Tremendously"]
    },
    {
      id: 3,
      type: "radio",
      question: "How likely are you to apply what you learned in your daily work?",
      options: ["Very Unlikely", "Unlikely", "Neutral", "Likely", "Very Likely"]
    },
    {
      id: 4,
      type: "text",
      question: "What was the most valuable insight you gained from this experience?",
      placeholder: "Share your key takeaway..."
    },
    {
      id: 5,
      type: "radio",
      question: "Would you recommend this experience to your colleagues?",
      options: ["Definitely Not", "Probably Not", "Maybe", "Probably Yes", "Definitely Yes"]
    },
    {
      id: 6,
      type: "text",
      question: "Any suggestions for improving the experience?",
      placeholder: "Your feedback helps us improve..."
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast({
        title: "All Complete! 🎉",
        description: "Thank you! Your results are now available.",
      });
      navigate('/learner/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswer = (value: string | number) => {
    setAnswers({ ...answers, [currentQ.id]: value });
  };

  const isAnswered = answers[currentQ.id] !== undefined && answers[currentQ.id] !== '';

  return (
    <DashboardLayout role="learner">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Trophy className="h-5 w-5" />
            <span className="text-sm font-medium">Post-Game Survey</span>
          </div>
          <h1 className="text-2xl font-bold">How Was Your Experience?</h1>
          <p className="text-muted-foreground">
            Your feedback helps us improve and contributes to your personal insights report.
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
            {currentQ.type === 'slider' && (
              <CardDescription>Drag the slider to rate your experience</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {currentQ.type === 'radio' && currentQ.options && (
              <RadioGroup
                value={answers[currentQ.id]?.toString() || ''}
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
            {currentQ.type === 'slider' && currentQ.min !== undefined && currentQ.max !== undefined && (
              <div className="space-y-6 py-4">
                <div className="flex justify-center">
                  <div className="flex items-center gap-2">
                    {[...Array(10)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-6 w-6 transition-all ${
                          i < (answers[currentQ.id] as number || 0) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <Slider
                  value={[answers[currentQ.id] as number || 5]}
                  onValueChange={([value]) => handleAnswer(value)}
                  min={currentQ.min}
                  max={currentQ.max}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{currentQ.labels?.[0]}</span>
                  <span className="text-2xl font-bold text-foreground">{answers[currentQ.id] || 5}</span>
                  <span>{currentQ.labels?.[1]}</span>
                </div>
              </div>
            )}
            {currentQ.type === 'text' && (
              <Textarea
                value={answers[currentQ.id]?.toString() || ''}
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
              <>View Results <Trophy className="ml-2 h-4 w-4" /></>
            ) : (
              <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PostGameSurvey;
