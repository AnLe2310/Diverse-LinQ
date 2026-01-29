import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download, Eye, Building2, Users, Calendar } from "lucide-react";

const OwnerReports = () => {
  // Mock reports
  const reports = [
    { id: "1", tenant: "Acme Corporation", team: "Sales Team Alpha", period: "Q1 2024", status: "Ready", generated: "2024-03-15", learners: 12 },
    { id: "2", tenant: "Acme Corporation", team: "Marketing Team", period: "Q1 2024", status: "Ready", generated: "2024-03-14", learners: 8 },
    { id: "3", tenant: "Tech Solutions BV", team: "Development Team", period: "Q1 2024", status: "Processing", generated: "-", learners: 15 },
    { id: "4", tenant: "Global Training Inc", team: "Leadership Group", period: "Q4 2023", status: "Ready", generated: "2024-01-05", learners: 6 },
    { id: "5", tenant: "Learning Corp", team: "HR Team", period: "Q1 2024", status: "Pending Data", generated: "-", learners: 10 },
  ];

  const columns = [
    { key: "tenant", header: "Tenant", render: (item: typeof reports[0]) => (
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <span>{item.tenant}</span>
      </div>
    )},
    { key: "team", header: "Team", render: (item: typeof reports[0]) => (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span>{item.team}</span>
      </div>
    )},
    { key: "period", header: "Period", render: (item: typeof reports[0]) => (
      <Badge variant="glass">{item.period}</Badge>
    )},
    { key: "learners", header: "Learners" },
    { key: "status", header: "Status", render: (item: typeof reports[0]) => (
      <StatusBadge status={item.status === "Ready" ? "completed" : item.status === "Processing" ? "pending" : "draft"} />
    )},
    { key: "generated", header: "Generated" },
    { key: "actions", header: "", render: (item: typeof reports[0]) => (
      <div className="flex items-center gap-2">
        {item.status === "Ready" && (
          <>
            <Button variant="ghost" size="icon">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    )},
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title="Reports" 
        description="View and download team reports across all tenants"
        breadcrumbs={[{ label: "Reports" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Reports" value="156" icon={FileBarChart} iconColor="amber" />
        <StatCard title="Ready to Download" value="142" icon={Download} iconColor="emerald" />
        <StatCard title="Processing" value="8" icon={FileBarChart} iconColor="cyan" />
        <StatCard title="Pending Data" value="6" icon={FileBarChart} iconColor="rose" />
      </div>

      <FilterBar 
        searchPlaceholder="Search reports..."
        filters={[
          { name: "Tenant", options: [{ value: "all", label: "All Tenants" }, { value: "acme", label: "Acme Corporation" }, { value: "tech", label: "Tech Solutions BV" }] },
          { name: "Status", options: [{ value: "all", label: "All Status" }, { value: "ready", label: "Ready" }, { value: "processing", label: "Processing" }, { value: "pending", label: "Pending Data" }] },
          { name: "Period", options: [{ value: "all", label: "All Periods" }, { value: "q1-2024", label: "Q1 2024" }, { value: "q4-2023", label: "Q4 2023" }] },
        ]}
        showExport
      />

      <DataTable columns={columns} data={reports} />

      {/* Report Info */}
      <div className="mt-6 glass rounded-xl p-4 border border-cyan/30 bg-cyan/5">
        <div className="flex items-start gap-3">
          <FileBarChart className="w-5 h-5 text-cyan mt-0.5" />
          <div>
            <p className="font-medium text-sm">Team Report Format</p>
            <p className="text-sm text-muted-foreground">
              Reports are generated in a fixed template format combining survey responses and gameplay telemetry. 
              Download as CSV for data analysis or PDF for presentation.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerReports;
