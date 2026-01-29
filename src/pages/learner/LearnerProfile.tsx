import { DashboardLayout } from "@/components/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  User,
  Shield,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  FileText,
  Lock,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LearnerProfile = () => {
  const { toast } = useToast();

  const profile = {
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    team: "Engineering Team A",
    organization: "TechCorp Inc.",
    joinedDate: "2024-01-15"
  };

  const dataConsent = [
    { id: 1, label: "Survey responses for personal insights", enabled: true, required: true },
    { id: 2, label: "Gameplay data for team reports", enabled: true, required: true },
    { id: 3, label: "Anonymized data for platform improvement", enabled: true, required: false },
    { id: 4, label: "Email notifications about new features", enabled: false, required: false },
  ];

  const dataCategories = [
    { category: "Survey Responses", items: 2, lastUpdated: "2024-01-20" },
    { category: "Gameplay Sessions", items: 1, lastUpdated: "2024-01-19" },
    { category: "Profile Information", items: 5, lastUpdated: "2024-01-15" },
  ];

  const handleExportData = () => {
    toast({
      title: "Export Requested",
      description: "Your data export will be ready within 24 hours. You'll receive an email when it's ready.",
    });
  };

  const handleDeleteRequest = () => {
    toast({
      title: "Delete Request Submitted",
      description: "Your request to delete personal data has been submitted. This process may take up to 30 days.",
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout role="learner">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Profile & Privacy</h1>
          <p className="text-muted-foreground">
            Manage your personal information and data privacy settings.
          </p>
        </div>

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Your basic account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={profile.name} disabled />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label>Team</Label>
                <Input value={profile.team} disabled />
              </div>
              <div className="space-y-2">
                <Label>Organization</Label>
                <Input value={profile.organization} disabled />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Contact your admin to update your profile information.
            </p>
          </CardContent>
        </Card>

        {/* Data Consent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Data Consent
            </CardTitle>
            <CardDescription>
              Control how your data is used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dataConsent.map((consent) => (
              <div key={consent.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  {consent.required ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{consent.label}</p>
                    {consent.required && (
                      <p className="text-xs text-muted-foreground">Required for platform functionality</p>
                    )}
                  </div>
                </div>
                <Switch 
                  checked={consent.enabled} 
                  disabled={consent.required}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Your Data Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Data Summary
            </CardTitle>
            <CardDescription>
              Overview of data we store about you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{category.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.items} items · Last updated {category.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{category.items}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GDPR Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Your Privacy Rights (GDPR)
            </CardTitle>
            <CardDescription>
              Exercise your data protection rights under EU regulation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 rounded-lg border space-y-3">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  <p className="font-medium">Export My Data</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Download a copy of all your personal data in a portable format.
                </p>
                <Button variant="outline" className="w-full" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Request Export
                </Button>
              </div>
              <div className="p-4 rounded-lg border border-destructive/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <p className="font-medium">Delete My Data</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Request deletion of your personal data from our systems.
                </p>
                <Button variant="outline" className="w-full text-destructive hover:text-destructive" onClick={handleDeleteRequest}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Request Deletion
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-500">Important Notice</p>
                <p className="text-muted-foreground">
                  Data deletion is permanent and may affect your access to insights and team reports. 
                  Some data may be retained for legal compliance purposes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Retention Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Survey responses</span>
                <span>Retained for 24 months</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Gameplay data</span>
                <span>Retained for 24 months</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Account information</span>
                <span>Until account deletion</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LearnerProfile;
