import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus, Eye, Edit, Copy, Gamepad2, Building2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OwnerSurveys = () => {
  // Mock survey templates
  const templates = [
    { id: "1", name: "Pre-Game Survey v1", type: "Pre-Game", questions: 12, version: "1.0", status: "Active", assignments: 18 },
    { id: "2", name: "Post-Game Survey v1", type: "Post-Game", questions: 15, version: "1.0", status: "Active", assignments: 18 },
    { id: "3", name: "Pre-Game Survey v2 (Draft)", type: "Pre-Game", questions: 14, version: "2.0", status: "Draft", assignments: 0 },
  ];

  // Mock survey assignments
  const assignments = [
    { id: "1", tenant: "Acme Corporation", survey: "Pre-Game Survey v1", game: "Off the Map", responses: 89, completion: "100%" },
    { id: "2", tenant: "Acme Corporation", survey: "Post-Game Survey v1", game: "Off the Map", responses: 67, completion: "75%" },
    { id: "3", tenant: "Tech Solutions BV", survey: "Pre-Game Survey v1", game: "Off the Map", responses: 62, completion: "100%" },
    { id: "4", tenant: "Tech Solutions BV", survey: "Post-Game Survey v1", game: "Off the Map", responses: 45, completion: "73%" },
    { id: "5", tenant: "Global Training Inc", survey: "Pre-Game Survey v1", game: "Off the Map", responses: 156, completion: "100%" },
  ];

  const templateColumns = [
    { key: "name", header: "Template Name", render: (item: typeof templates[0]) => (
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === "Pre-Game" ? "bg-cyan/20" : "bg-violet/20"}`}>
          <ClipboardList className={`w-5 h-5 ${item.type === "Pre-Game" ? "text-cyan" : "text-violet"}`} />
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.questions} questions</p>
        </div>
      </div>
    )},
    { key: "type", header: "Type", render: (item: typeof templates[0]) => (
      <Badge variant={item.type === "Pre-Game" ? "cyan" : "violet"}>{item.type}</Badge>
    )},
    { key: "version", header: "Version" },
    { key: "assignments", header: "Tenant Assignments" },
    { key: "status", header: "Status", render: (item: typeof templates[0]) => <StatusBadge status={item.status.toLowerCase()} /> },
    { key: "actions", header: "", render: () => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon"><Copy className="w-4 h-4" /></Button>
      </div>
    )},
  ];

  const assignmentColumns = [
    { key: "tenant", header: "Tenant", render: (item: typeof assignments[0]) => (
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <span>{item.tenant}</span>
      </div>
    )},
    { key: "survey", header: "Survey Template" },
    { key: "game", header: "Game", render: (item: typeof assignments[0]) => (
      <div className="flex items-center gap-2">
        <Gamepad2 className="w-4 h-4 text-muted-foreground" />
        <span>{item.game}</span>
      </div>
    )},
    { key: "responses", header: "Responses" },
    { key: "completion", header: "Completion Rate", render: (item: typeof assignments[0]) => (
      <div className="flex items-center gap-2">
        <div className="w-20 bg-secondary rounded-full h-2">
          <div 
            className="bg-emerald h-2 rounded-full" 
            style={{ width: item.completion }}
          />
        </div>
        <span className="text-sm">{item.completion}</span>
      </div>
    )},
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title="Surveys Library" 
        description="Manage survey templates and tenant assignments"
        breadcrumbs={[{ label: "Surveys" }]}
        actions={
          <Button className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Survey Templates" value="3" icon={ClipboardList} iconColor="cyan" />
        <StatCard title="Total Responses" value="419" icon={ClipboardList} iconColor="violet" />
        <StatCard title="Avg Completion" value="90%" icon={ClipboardList} iconColor="emerald" />
        <StatCard title="Active Assignments" value="10" icon={ClipboardList} iconColor="amber" />
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <DataTable columns={templateColumns} data={templates} />
        </TabsContent>

        <TabsContent value="assignments">
          <FilterBar 
            searchPlaceholder="Search assignments..."
            filters={[
              { name: "Tenant", options: [{ value: "all", label: "All Tenants" }] },
              { name: "Type", options: [{ value: "all", label: "All Types" }, { value: "pre", label: "Pre-Game" }, { value: "post", label: "Post-Game" }] },
            ]}
          />
          <DataTable columns={assignmentColumns} data={assignments} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default OwnerSurveys;
