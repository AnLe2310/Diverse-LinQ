import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  Users, 
  GraduationCap,
  ArrowRight,
  Shield,
  Gamepad2
} from "lucide-react";

const roles = [
  {
    id: "owner",
    title: "Platform Owner",
    description: "Diverselinq administrator with full platform access",
    icon: Building2,
    route: "/owner",
    color: "from-cyan/20 to-cyan/5 border-cyan/30 hover:border-cyan/50"
  },
  {
    id: "admin",
    title: "Tenant Admin",
    description: "Company administrator managing learners and licenses",
    icon: Users,
    route: "/admin",
    color: "from-violet/20 to-violet/5 border-violet/30 hover:border-violet/50"
  },
  {
    id: "learner",
    title: "Learner",
    description: "End user completing surveys and playing games",
    icon: GraduationCap,
    route: "/learner",
    color: "from-emerald/20 to-emerald/5 border-emerald/30 hover:border-emerald/50"
  }
];

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (selectedRole) {
      const role = roles.find(r => r.id === selectedRole);
      if (role) {
        // Store role in sessionStorage for demo purposes
        sessionStorage.setItem("demo_role", selectedRole);
        sessionStorage.setItem("demo_email", email || "demo@example.com");
        navigate(role.route);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
              <Gamepad2 className="h-5 w-5 text-background" />
            </div>
            <div>
              <p className="font-semibold">Off the Map Platform</p>
              <p className="text-xs text-muted-foreground">by Diverselinq</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-emerald" />
            <span>EU Compliant</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Select your role to access the platform
            </p>
          </div>

          {/* Demo Notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-center">
            <p className="text-sm text-amber-500">
              🎭 Demo Mode — Select a role to explore the portal
            </p>
          </div>

          {/* Email Input (optional for demo) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-card/50"
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <Label>Select your role</Label>
            <div className="grid gap-3">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 bg-gradient-to-r ${role.color} ${
                    selectedRole === role.id 
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                      : ""
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`p-3 rounded-lg bg-background/50`}>
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{role.title}</p>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedRole === role.id 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground/30"
                    }`}>
                      {selectedRole === role.id && (
                        <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <Button
            size="lg"
            className="w-full"
            disabled={!selectedRole}
            onClick={handleLogin}
          >
            Continue to Portal
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Back to Landing */}
          <p className="text-center text-sm text-muted-foreground">
            <button 
              onClick={() => navigate("/")}
              className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              ← Back to Landing Page
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>© 2024 Diverselinq. All rights reserved. GDPR & EU AI Act Compliant.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
