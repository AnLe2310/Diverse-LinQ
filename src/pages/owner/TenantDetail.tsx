import { DashboardLayout, PageHeader, StatCard, DataTable, StatusBadge } from "@/components/dashboard";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, TicketCheck, Gamepad2, FileBarChart, ScrollText, Settings, Shield, Calendar, Mail } from "lucide-react";

const TenantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock tenant data
  const tenant = {
    id,
    name: "Acme Corporation",
    region: "EU-West",
    partition: "tenant_acme",
    primaryAdmin: "john@acme.com",
    status: "Active",
    created: "2024-01-15",
    licenses: 120,
    licensesUsed: 89,
    learners: 89,
    teams: 12,
    reportsGenerated: 34,
  };

  const users = [
    { id: "1", name: "John Smith", email: "john@acme.com", role: "Admin", status: "Active", lastLogin: "2024-03-15" },
    { id: "2", name: "Sarah Johnson", email: "sarah@acme.com", role: "Admin", status: "Active", lastLogin: "2024-03-14" },
    { id: "3", name: "Mike Wilson", email: "mike@acme.com", role: "Learner", status: "Active", lastLogin: "2024-03-15" },
    { id: "4", name: "Emily Brown", email: "emily@acme.com", role: "Learner", status: "Pending", lastLogin: "-" },
  ];

  const auditLogs = [
    { id: "1", action: "User Login", actor: "john@acme.com", resource: "Auth", timestamp: "2024-03-15 10:23:45", ip: "192.168.1.1" },
    { id: "2", action: "License Assigned", actor: "sarah@acme.com", resource: "License #45", timestamp: "2024-03-15 09:15:22", ip: "192.168.1.2" },
    { id: "3", action: "Report Downloaded", actor: "john@acme.com", resource: "Team Report Q1", timestamp: "2024-03-14 16:45:00", ip: "192.168.1.1" },
    { id: "4", action: "Survey Completed", actor: "mike@acme.com", resource: "Pre-Game Survey", timestamp: "2024-03-14 14:30:12", ip: "192.168.1.5" },
  ];

  const userColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (item: typeof users[0]) => (
      <Badge variant={item.role === "Admin" ? "violet" : "cyan"}>{item.role}</Badge>
    )},
    { key: "status", header: "Status", render: (item: typeof users[0]) => <StatusBadge status={item.status} /> },
    { key: "lastLogin", header: "Last Login" },
  ];

  const auditColumns = [
    { key: "action", header: "Action" },
    { key: "actor", header: "Actor" },
    { key: "resource", header: "Resource" },
    { key: "timestamp", header: "Timestamp" },
    { key: "ip", header: "IP Address" },
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title={tenant.name}
        description={`Tenant ID: ${tenant.partition}`}
        breadcrumbs={[
          { label: "Tenants", href: "/owner/tenants" },
          { label: tenant.name }
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Contact Admin
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        }
      />

      {/* Tenant Info Header */}
      <div className="glass rounded-xl p-6 border border-border/50 mb-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
              <span className="text-2xl font-bold text-background">A</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{tenant.name}</h2>
              <p className="text-muted-foreground">{tenant.primaryAdmin}</p>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex flex-wrap gap-4">
            <div className="text-center px-4">
              <p className="text-2xl font-bold">{tenant.licenses}</p>
              <p className="text-xs text-muted-foreground">Total Licenses</p>
            </div>
            <div className="text-center px-4 border-l border-border">
              <p className="text-2xl font-bold text-cyan">{tenant.learners}</p>
              <p className="text-xs text-muted-foreground">Active Learners</p>
            </div>
            <div className="text-center px-4 border-l border-border">
              <p className="text-2xl font-bold text-violet">{tenant.teams}</p>
              <p className="text-xs text-muted-foreground">Teams</p>
            </div>
          </div>
          <StatusBadge status={tenant.status} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="License Utilization" value={`${Math.round((tenant.licensesUsed / tenant.licenses) * 100)}%`} icon={TicketCheck} iconColor="violet" />
        <StatCard title="Active Learners" value={tenant.learners} icon={Users} iconColor="cyan" />
        <StatCard title="Games Enabled" value={2} icon={Gamepad2} iconColor="emerald" />
        <StatCard title="Reports Generated" value={tenant.reportsGenerated} icon={FileBarChart} iconColor="amber" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="licenses" className="gap-2">
            <TicketCheck className="w-4 h-4" /> Licenses
          </TabsTrigger>
          <TabsTrigger value="games" className="gap-2">
            <Gamepad2 className="w-4 h-4" /> Games
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <ScrollText className="w-4 h-4" /> Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <DataTable columns={userColumns} data={users} />
        </TabsContent>

        <TabsContent value="licenses">
          <div className="glass rounded-xl p-6 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">License Allocation</h3>
                <p className="text-sm text-muted-foreground">Current license usage for this tenant</p>
              </div>
              <Button variant="outline">Allocate More</Button>
            </div>
            <div className="w-full bg-secondary rounded-full h-4 mb-2">
              <div 
                className="bg-gradient-to-r from-cyan to-violet h-4 rounded-full transition-all"
                style={{ width: `${(tenant.licensesUsed / tenant.licenses) * 100}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {tenant.licensesUsed} of {tenant.licenses} licenses used
            </p>
          </div>
        </TabsContent>

        <TabsContent value="games">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-6 border border-emerald/30 bg-emerald/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-8 h-8 text-emerald" />
                  <div>
                    <h4 className="font-semibold">Off the Map</h4>
                    <p className="text-sm text-muted-foreground">Version 2.1</p>
                  </div>
                </div>
                <Badge variant="emerald">Enabled</Badge>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Schedule: Always Open
                </span>
              </div>
            </div>
            <div className="glass rounded-xl p-6 border border-border/50 opacity-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Game Module 2</h4>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                  </div>
                </div>
                <Badge variant="glass">Disabled</Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <div className="glass rounded-xl p-4 border border-amber/30 bg-amber/5 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber" />
              <span className="text-sm">Audit logs are retained for 90 days per GDPR compliance requirements.</span>
            </div>
          </div>
          <DataTable columns={auditColumns} data={auditLogs} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default TenantDetail;
