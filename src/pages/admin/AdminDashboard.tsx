import { DashboardLayout, StatCard, PageHeader, DataTable, StatusBadge } from "@/components/dashboard";
import { Users, TicketCheck, Gamepad2, FileBarChart, ClipboardList, TrendingUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Active Learners", value: 89, change: "+5 this week", changeType: "positive" as const, icon: Users, iconColor: "cyan" as const },
    { title: "Licenses Remaining", value: 31, change: "of 120 total", changeType: "neutral" as const, icon: TicketCheck, iconColor: "violet" as const },
    { title: "Survey Completion", value: "94%", change: "+2% vs last month", changeType: "positive" as const, icon: ClipboardList, iconColor: "emerald" as const },
    { title: "Reports Ready", value: 8, change: "2 pending", changeType: "neutral" as const, icon: FileBarChart, iconColor: "amber" as const },
  ];

  const recentLearners = [
    { id: "1", name: "Emma Wilson", email: "emma@acme.com", team: "Sales Team", status: "Active", progress: "Completed" },
    { id: "2", name: "James Miller", email: "james@acme.com", team: "Sales Team", status: "Active", progress: "In Progress" },
    { id: "3", name: "Sophie Brown", email: "sophie@acme.com", team: "Marketing", status: "Active", progress: "Pre-Survey" },
    { id: "4", name: "Oliver Davis", email: "oliver@acme.com", team: "HR Team", status: "Pending", progress: "Not Started" },
  ];

  const learnerColumns = [
    { key: "name", header: "Name", render: (item: typeof recentLearners[0]) => (
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.email}</p>
      </div>
    )},
    { key: "team", header: "Team", render: (item: typeof recentLearners[0]) => (
      <Badge variant="glass">{item.team}</Badge>
    )},
    { key: "status", header: "Status", render: (item: typeof recentLearners[0]) => (
      <StatusBadge status={item.status} />
    )},
    { key: "progress", header: "Progress", render: (item: typeof recentLearners[0]) => {
      const colors: Record<string, string> = {
        "Completed": "text-emerald",
        "In Progress": "text-cyan",
        "Pre-Survey": "text-amber",
        "Not Started": "text-muted-foreground",
      };
      return <span className={colors[item.progress]}>{item.progress}</span>;
    }},
  ];

  const recentReports = [
    { id: "1", team: "Sales Team Alpha", period: "Q1 2024", learners: 12, status: "Ready" },
    { id: "2", team: "Marketing Team", period: "Q1 2024", learners: 8, status: "Ready" },
    { id: "3", team: "HR Team", period: "Q1 2024", learners: 6, status: "Processing" },
  ];

  return (
    <DashboardLayout role="admin" userName="John Smith" tenantName="Acme Corporation">
      <PageHeader 
        title="Admin Dashboard" 
        description="Overview of your organization's learning progress"
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Learners */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Learner Activity</h2>
            <button 
              onClick={() => navigate("/admin/learners")}
              className="text-sm text-primary hover:underline"
            >
              View all →
            </button>
          </div>
          <DataTable 
            columns={learnerColumns} 
            data={recentLearners}
          />
        </div>

        {/* Quick Actions & Reports */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={() => navigate("/admin/learners")}
                className="w-full glass rounded-xl p-4 border border-border/50 flex items-center gap-3 hover:border-primary/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <p className="font-medium">Add Learners</p>
                  <p className="text-xs text-muted-foreground">Invite or import learners</p>
                </div>
              </button>
              <button 
                onClick={() => navigate("/admin/games")}
                className="w-full glass rounded-xl p-4 border border-border/50 flex items-center gap-3 hover:border-primary/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald/20 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <p className="font-medium">Open Game Access</p>
                  <p className="text-xs text-muted-foreground">Enable game for teams</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Reports */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Reports</h2>
              <button 
                onClick={() => navigate("/admin/reports")}
                className="text-sm text-primary hover:underline"
              >
                View all →
              </button>
            </div>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="glass rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{report.team}</p>
                    <StatusBadge status={report.status === "Ready" ? "completed" : "pending"} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {report.learners} learners
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
