import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download, Eye, Users, Calendar, Share2, ExternalLink } from "lucide-react";

const AdminReports = () => {
  // Reports
  const reports = [
    { id: "1", team: "Sales Team Alpha", period: "Q1 2024", learners: 12, completed: 10, status: "Ready", generated: "2024-03-15" },
    { id: "2", team: "Marketing Team", period: "Q1 2024", learners: 10, completed: 9, status: "Ready", generated: "2024-03-14" },
    { id: "3", team: "Sales Team Beta", period: "Q1 2024", learners: 8, completed: 4, status: "Processing", generated: "-" },
    { id: "4", team: "HR Team", period: "Q1 2024", learners: 6, completed: 2, status: "Insufficient Data", generated: "-" },
    { id: "5", team: "Development", period: "Q1 2024", learners: 15, completed: 8, status: "Processing", generated: "-" },
    { id: "6", team: "Sales Team Alpha", period: "Q4 2023", learners: 10, completed: 10, status: "Ready", generated: "2024-01-05" },
  ];

  const columns = [
    { key: "team", header: "Team", render: (item: typeof reports[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber/20 flex items-center justify-center">
          <FileBarChart className="w-5 h-5 text-amber" />
        </div>
        <span className="font-medium">{item.team}</span>
      </div>
    )},
    { key: "period", header: "Period", render: (item: typeof reports[0]) => (
      <Badge variant="glass">{item.period}</Badge>
    )},
    { key: "learners", header: "Learners", render: (item: typeof reports[0]) => (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span>{item.completed}/{item.learners}</span>
      </div>
    )},
    { key: "status", header: "Status", render: (item: typeof reports[0]) => {
      const statusMap: Record<string, string> = {
        "Ready": "completed",
        "Processing": "pending",
        "Insufficient Data": "draft",
      };
      return <StatusBadge status={statusMap[item.status] || "draft"} />;
    }},
    { key: "generated", header: "Generated" },
    { key: "actions", header: "", render: (item: typeof reports[0]) => (
      <div className="flex items-center gap-1">
        {item.status === "Ready" && (
          <>
            <Button variant="ghost" size="icon">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    )},
  ];

  return (
    <DashboardLayout role="admin" userName="John Smith" tenantName="Acme Corporation">
      <PageHeader 
        title="Team Reports" 
        description="View and download team performance reports"
        breadcrumbs={[{ label: "Reports" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Reports" value="6" icon={FileBarChart} iconColor="amber" />
        <StatCard title="Ready to Download" value="3" icon={Download} iconColor="emerald" />
        <StatCard title="Processing" value="2" icon={FileBarChart} iconColor="cyan" />
        <StatCard title="Needs More Data" value="1" icon={FileBarChart} iconColor="rose" />
      </div>

      {/* Report Requirements Info */}
      <div className="glass rounded-xl p-4 border border-cyan/30 bg-cyan/5 mb-6">
        <div className="flex items-start gap-3">
          <FileBarChart className="w-5 h-5 text-cyan mt-0.5" />
          <div>
            <p className="font-medium text-sm">Report Generation Requirements</p>
            <p className="text-sm text-muted-foreground">
              Team reports require at least 5 learners to complete both the game and post-game survey. 
              Reports are generated automatically once requirements are met.
            </p>
          </div>
        </div>
      </div>

      <FilterBar 
        searchPlaceholder="Search reports..."
        filters={[
          { name: "Team", options: [{ value: "all", label: "All Teams" }] },
          { name: "Period", options: [{ value: "all", label: "All Periods" }, { value: "q1-2024", label: "Q1 2024" }, { value: "q4-2023", label: "Q4 2023" }] },
          { name: "Status", options: [{ value: "all", label: "All Status" }, { value: "ready", label: "Ready" }, { value: "processing", label: "Processing" }] },
        ]}
        showExport
      />

      <DataTable columns={columns} data={reports} />

      {/* Download Options */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5 border border-border/50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Download className="w-5 h-5 text-muted-foreground" />
            Bulk Download
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Download all ready reports for a specific period
          </p>
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download All Q1 2024 Reports (CSV)
          </Button>
        </div>
        <div className="glass rounded-xl p-5 border border-border/50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-muted-foreground" />
            Share Reports
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Generate shareable links for team leads (coming soon)
          </p>
          <Button variant="outline" className="w-full" disabled>
            <ExternalLink className="w-4 h-4 mr-2" />
            Generate Share Links
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;
