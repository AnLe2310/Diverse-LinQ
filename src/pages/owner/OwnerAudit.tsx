import { DashboardLayout, PageHeader, FilterBar, DataTable, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Shield, ScrollText, Lock, Clock, Download, Eye, AlertTriangle, CheckCircle2, Key } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OwnerAudit = () => {
  // Mock audit logs
  const auditLogs = [
    { id: "1", action: "Tenant Created", actor: "admin@diverselinq.com", tenant: "Innovation Labs", resource: "Tenant", timestamp: "2024-03-15 14:23:45", ip: "82.196.1.1" },
    { id: "2", action: "License Allocated", actor: "admin@diverselinq.com", tenant: "Acme Corporation", resource: "120 licenses", timestamp: "2024-03-15 11:15:22", ip: "82.196.1.1" },
    { id: "3", action: "Admin Login", actor: "john@acme.com", tenant: "Acme Corporation", resource: "Auth", timestamp: "2024-03-15 10:23:45", ip: "192.168.1.1" },
    { id: "4", action: "Report Downloaded", actor: "sarah@acme.com", tenant: "Acme Corporation", resource: "Team Report Q1", timestamp: "2024-03-14 16:45:00", ip: "192.168.1.2" },
    { id: "5", action: "Data Export Request", actor: "mike@techsol.nl", tenant: "Tech Solutions BV", resource: "GDPR Export", timestamp: "2024-03-14 14:30:12", ip: "192.168.2.5" },
    { id: "6", action: "Game Enabled", actor: "admin@diverselinq.com", tenant: "Learning Corp", resource: "Off the Map", timestamp: "2024-03-14 09:00:00", ip: "82.196.1.1" },
  ];

  // Security status
  const securityStatus = [
    { name: "Database Encryption", status: "Active", icon: Lock, detail: "AES-256 at rest" },
    { name: "Transport Encryption", status: "Active", icon: Lock, detail: "TLS 1.3" },
    { name: "Tenant Isolation", status: "Active", icon: Shield, detail: "Schema partitioning" },
    { name: "Audit Logging", status: "Active", icon: ScrollText, detail: "90-day retention" },
    { name: "Access Controls", status: "Active", icon: Key, detail: "RBAC enabled" },
  ];

  // Data retention settings
  const retentionSettings = [
    { id: "1", dataType: "Audit Logs", retention: "90 days", lastPurge: "2024-03-01", status: "Compliant" },
    { id: "2", dataType: "Survey Responses", retention: "24 months", lastPurge: "2024-02-01", status: "Compliant" },
    { id: "3", dataType: "Gameplay Telemetry", retention: "12 months", lastPurge: "2024-03-01", status: "Compliant" },
    { id: "4", dataType: "User Sessions", retention: "30 days", lastPurge: "2024-03-15", status: "Compliant" },
  ];

  const auditColumns = [
    { key: "timestamp", header: "Timestamp" },
    { key: "action", header: "Action", render: (item: typeof auditLogs[0]) => (
      <span className="font-medium">{item.action}</span>
    )},
    { key: "actor", header: "Actor" },
    { key: "tenant", header: "Tenant", render: (item: typeof auditLogs[0]) => (
      <Badge variant="glass">{item.tenant}</Badge>
    )},
    { key: "resource", header: "Resource" },
    { key: "ip", header: "IP Address", render: (item: typeof auditLogs[0]) => (
      <span className="font-mono text-sm">{item.ip}</span>
    )},
    { key: "actions", header: "", render: () => (
      <button className="p-2 hover:bg-secondary rounded-lg">
        <Eye className="w-4 h-4" />
      </button>
    )},
  ];

  const retentionColumns = [
    { key: "dataType", header: "Data Type" },
    { key: "retention", header: "Retention Period" },
    { key: "lastPurge", header: "Last Purge" },
    { key: "status", header: "Status", render: (item: typeof retentionSettings[0]) => (
      <div className="flex items-center gap-2 text-emerald">
        <CheckCircle2 className="w-4 h-4" />
        <span>{item.status}</span>
      </div>
    )},
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title="Audit & Security" 
        description="Monitor access, security status, and compliance"
        breadcrumbs={[{ label: "Audit & Security" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Audit Events (24h)" value="1,247" icon={ScrollText} iconColor="amber" />
        <StatCard title="Security Alerts" value="0" change="All clear" changeType="positive" icon={Shield} iconColor="emerald" />
        <StatCard title="Active Sessions" value="156" icon={Key} iconColor="cyan" />
        <StatCard title="Data Exports" value="3" change="This month" changeType="neutral" icon={Download} iconColor="violet" />
      </div>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="logs" className="gap-2">
            <ScrollText className="w-4 h-4" /> Audit Logs
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" /> Security Status
          </TabsTrigger>
          <TabsTrigger value="retention" className="gap-2">
            <Clock className="w-4 h-4" /> Data Retention
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <FilterBar 
            searchPlaceholder="Search audit logs..."
            filters={[
              { name: "Tenant", options: [{ value: "all", label: "All Tenants" }] },
              { name: "Action Type", options: [{ value: "all", label: "All Actions" }, { value: "auth", label: "Authentication" }, { value: "data", label: "Data Access" }] },
              { name: "Time Range", options: [{ value: "24h", label: "Last 24 hours" }, { value: "7d", label: "Last 7 days" }, { value: "30d", label: "Last 30 days" }] },
            ]}
            showExport
          />
          <DataTable columns={auditColumns} data={auditLogs} />
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {securityStatus.map((item, idx) => (
              <div key={idx} className="glass rounded-xl p-5 border border-emerald/30 bg-emerald/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-emerald" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                  <Badge variant="emerald">{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Badges */}
          <div className="glass rounded-xl p-6 border border-border/50">
            <h3 className="font-semibold mb-4">Compliance Certifications</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan/10 border border-cyan/30">
                <Shield className="w-5 h-5 text-cyan" />
                <span className="font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet/10 border border-violet/30">
                <Shield className="w-5 h-5 text-violet" />
                <span className="font-medium">EU AI Act Aligned</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald/10 border border-emerald/30">
                <Lock className="w-5 h-5 text-emerald" />
                <span className="font-medium">EU Data Residency</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="retention">
          <div className="glass rounded-xl p-4 border border-amber/30 bg-amber/5 mb-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber" />
              <p className="text-sm">
                Data retention policies are configured per GDPR requirements. Automatic purging is enabled for all data types.
              </p>
            </div>
          </div>
          <DataTable columns={retentionColumns} data={retentionSettings} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default OwnerAudit;
