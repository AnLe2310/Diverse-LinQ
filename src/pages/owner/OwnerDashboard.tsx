import { DashboardLayout, StatCard, PageHeader, DataTable, StatusBadge } from "@/components/dashboard";
import { Building2, TicketCheck, Users, FileBarChart, AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  // Mock data for KPIs
  const stats = [
    { title: "Total Tenants", value: 24, change: "+3 this month", changeType: "positive" as const, icon: Building2, iconColor: "cyan" as const },
    { title: "Active Licenses", value: "1,240", change: "86% utilized", changeType: "neutral" as const, icon: TicketCheck, iconColor: "violet" as const },
    { title: "Active Learners", value: "892", change: "+12% vs last month", changeType: "positive" as const, icon: Users, iconColor: "emerald" as const },
    { title: "Reports Generated", value: 156, change: "18 pending", changeType: "neutral" as const, icon: FileBarChart, iconColor: "amber" as const },
  ];

  // Recent tenants
  const recentTenants = [
    { id: "1", name: "Acme Corporation", region: "EU-West", licenses: 120, learners: 89, status: "Active" },
    { id: "2", name: "Tech Solutions BV", region: "EU-Central", licenses: 80, learners: 62, status: "Active" },
    { id: "3", name: "Innovation Labs", region: "EU-North", licenses: 50, learners: 0, status: "Pending" },
    { id: "4", name: "Global Training Inc", region: "EU-West", licenses: 200, learners: 156, status: "Active" },
  ];

  const tenantColumns = [
    { key: "name", header: "Tenant Name" },
    { key: "region", header: "Region", render: (item: typeof recentTenants[0]) => (
      <Badge variant="glass">{item.region}</Badge>
    )},
    { key: "licenses", header: "Licenses" },
    { key: "learners", header: "Learners" },
    { key: "status", header: "Status", render: (item: typeof recentTenants[0]) => (
      <StatusBadge status={item.status} />
    )},
  ];

  // Compliance alerts
  const alerts = [
    { id: "1", type: "warning", message: "3 tenants approaching license expiry", action: "Review" },
    { id: "2", type: "info", message: "Monthly audit report ready for download", action: "Download" },
    { id: "3", type: "success", message: "All data retention policies up to date", action: "View" },
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title="Owner Dashboard" 
        description="Platform overview and key performance indicators"
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tenants */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Tenants</h2>
            <button 
              onClick={() => navigate("/owner/tenants")}
              className="text-sm text-primary hover:underline"
            >
              View all →
            </button>
          </div>
          <DataTable 
            columns={tenantColumns} 
            data={recentTenants}
            onRowClick={(tenant) => navigate(`/owner/tenants/${tenant.id}`)}
          />
        </div>

        {/* Compliance Alerts */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Compliance & Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="glass rounded-xl p-4 border border-border/50 flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  alert.type === "warning" ? "bg-amber/20 text-amber" :
                  alert.type === "success" ? "bg-emerald/20 text-emerald" :
                  "bg-cyan/20 text-cyan"
                }`}>
                  {alert.type === "warning" ? <AlertTriangle className="w-4 h-4" /> :
                   alert.type === "success" ? <TrendingUp className="w-4 h-4" /> :
                   <FileBarChart className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <button className="text-xs text-primary hover:underline mt-1">
                    {alert.action}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EU Compliance Status */}
          <div className="glass rounded-xl p-4 border border-emerald/30 bg-emerald/5 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald animate-pulse" />
              <span className="font-medium text-sm">EU Compliance Status</span>
            </div>
            <p className="text-xs text-muted-foreground">
              All systems compliant with GDPR and EU AI Act requirements. 
              Last audit: 2 days ago.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
