import { DashboardLayout, PageHeader } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Users, Shield, Key, Building2, Clock, Globe, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminSettings = () => {
  return (
    <DashboardLayout role="admin" userName="John Smith" tenantName="Acme Corporation">
      <PageHeader 
        title="Settings" 
        description="Manage your organization settings and preferences"
        breadcrumbs={[{ label: "Settings" }]}
      />

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="organization" className="gap-2">
            <Building2 className="w-4 h-4" /> Organization
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Users className="w-4 h-4" /> Roles & Access
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <div className="glass rounded-xl p-6 border border-border/50 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Organization Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Organization Name</Label>
                  <Input value="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label>Primary Contact Email</Label>
                  <Input value="admin@acme.com" />
                </div>
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select defaultValue="100-500">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="50-100">50-100 employees</SelectItem>
                      <SelectItem value="100-500">100-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                Region & Data Residency
              </h4>
              <div className="glass rounded-lg p-4 bg-cyan/5 border border-cyan/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">EU-West (Ireland)</p>
                    <p className="text-sm text-muted-foreground">All data stored within EU boundaries</p>
                  </div>
                  <Badge variant="cyan">GDPR Compliant</Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-primary">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roles">
          <div className="glass rounded-xl p-6 border border-border/50 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Admin Users</h3>
              <div className="space-y-3">
                {[
                  { name: "John Smith", email: "john@acme.com", role: "Primary Admin" },
                  { name: "Sarah Johnson", email: "sarah@acme.com", role: "Admin" },
                ].map((admin, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-cyan flex items-center justify-center">
                        <span className="text-sm font-medium text-background">{admin.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-xs text-muted-foreground">{admin.email}</p>
                      </div>
                    </div>
                    <Badge variant={admin.role === "Primary Admin" ? "violet" : "glass"}>{admin.role}</Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4">
                <Users className="w-4 h-4 mr-2" />
                Invite Admin
              </Button>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Key className="w-4 h-4 text-muted-foreground" />
                SSO Configuration
              </h4>
              <div className="glass rounded-lg p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Single Sign-On (SSO)</p>
                    <p className="text-sm text-muted-foreground">Enable SAML-based SSO for your organization</p>
                  </div>
                  <Badge variant="glass">Coming Soon</Badge>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="glass rounded-xl p-6 border border-border/50 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Data Retention</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Survey Data Retention</p>
                      <p className="text-xs text-muted-foreground">How long survey responses are stored</p>
                    </div>
                  </div>
                  <Select defaultValue="24">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Gameplay Data Retention</p>
                      <p className="text-xs text-muted-foreground">How long gameplay telemetry is stored</p>
                    </div>
                  </div>
                  <Select defaultValue="12">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="font-medium mb-4">Privacy & Compliance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Export Requests</p>
                    <p className="text-sm text-muted-foreground">Allow learners to export their data (GDPR)</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Deletion Requests</p>
                    <p className="text-sm text-muted-foreground">Allow learners to request data deletion</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-primary">Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="glass rounded-xl p-6 border border-border/50 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">New Report Available</p>
                    <p className="text-xs text-muted-foreground">Notify when a team report is ready</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">License Expiry Warning</p>
                    <p className="text-xs text-muted-foreground">Notify 30 days before license expiry</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Weekly Progress Summary</p>
                    <p className="text-xs text-muted-foreground">Receive weekly learner progress digest</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Survey Completion Reminders</p>
                    <p className="text-xs text-muted-foreground">Auto-remind learners with incomplete surveys</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-primary">Save Changes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminSettings;
