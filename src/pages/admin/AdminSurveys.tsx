import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Users, CheckCircle2, Clock, Send, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSurveys = () => {
  // Survey stats
  const surveyStats = {
    preSurveyTotal: 89,
    preSurveyCompleted: 89,
    postSurveyTotal: 67,
    postSurveyCompleted: 52,
  };

  // Assigned surveys
  const assignedSurveys = [
    { id: "1", name: "Pre-Game Survey v1", type: "Pre-Game", assignedTo: "All Learners", responses: 89, target: 89, completion: "100%", status: "Complete" },
    { id: "2", name: "Post-Game Survey v1", type: "Post-Game", assignedTo: "Game Completers", responses: 52, target: 67, completion: "78%", status: "Active" },
  ];

  // Individual responses
  const responses = [
    { id: "1", learner: "Emma Wilson", team: "Sales Team Alpha", survey: "Post-Game Survey v1", submittedAt: "2024-03-15 11:30", status: "Completed" },
    { id: "2", learner: "James Miller", team: "Sales Team Alpha", survey: "Post-Game Survey v1", submittedAt: "2024-03-15 10:45", status: "Completed" },
    { id: "3", learner: "Sophie Brown", team: "Marketing Team", survey: "Post-Game Survey v1", submittedAt: "-", status: "Pending" },
    { id: "4", learner: "William Anderson", team: "Development", survey: "Post-Game Survey v1", submittedAt: "-", status: "Pending" },
    { id: "5", learner: "Oliver Davis", team: "HR Team", survey: "Pre-Game Survey v1", submittedAt: "2024-03-14 09:20", status: "Completed" },
  ];

  const surveyColumns = [
    { key: "name", header: "Survey", render: (item: typeof assignedSurveys[0]) => (
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === "Pre-Game" ? "bg-cyan/20" : "bg-violet/20"}`}>
          <ClipboardList className={`w-5 h-5 ${item.type === "Pre-Game" ? "text-cyan" : "text-violet"}`} />
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.assignedTo}</p>
        </div>
      </div>
    )},
    { key: "type", header: "Type", render: (item: typeof assignedSurveys[0]) => (
      <Badge variant={item.type === "Pre-Game" ? "cyan" : "violet"}>{item.type}</Badge>
    )},
    { key: "responses", header: "Responses", render: (item: typeof assignedSurveys[0]) => (
      <span>{item.responses} / {item.target}</span>
    )},
    { key: "completion", header: "Completion", render: (item: typeof assignedSurveys[0]) => (
      <div className="flex items-center gap-2">
        <div className="w-20 bg-secondary rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${item.status === "Complete" ? "bg-emerald" : "bg-violet"}`}
            style={{ width: item.completion }}
          />
        </div>
        <span className="text-sm">{item.completion}</span>
      </div>
    )},
    { key: "status", header: "Status", render: (item: typeof assignedSurveys[0]) => (
      <StatusBadge status={item.status === "Complete" ? "completed" : "active"} />
    )},
    { key: "actions", header: "", render: () => (
      <div className="flex gap-1">
        <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon"><Send className="w-4 h-4" /></Button>
      </div>
    )},
  ];

  const responseColumns = [
    { key: "learner", header: "Learner" },
    { key: "team", header: "Team", render: (item: typeof responses[0]) => (
      <Badge variant="glass">{item.team}</Badge>
    )},
    { key: "survey", header: "Survey" },
    { key: "submittedAt", header: "Submitted" },
    { key: "status", header: "Status", render: (item: typeof responses[0]) => (
      <StatusBadge status={item.status === "Completed" ? "completed" : "pending"} />
    )},
    { key: "actions", header: "", render: (item: typeof responses[0]) => (
      item.status === "Pending" ? (
        <Button variant="ghost" size="sm">
          <Send className="w-4 h-4 mr-1" />
          Remind
        </Button>
      ) : (
        <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
      )
    )},
  ];

  return (
    <DashboardLayout role="admin" userName="John Smith" tenantName="Acme Corporation">
      <PageHeader 
        title="Surveys" 
        description="Track survey completion and send reminders"
        breadcrumbs={[{ label: "Surveys" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Pre-Game Surveys" 
          value={`${surveyStats.preSurveyCompleted}/${surveyStats.preSurveyTotal}`} 
          change="100% complete" 
          changeType="positive" 
          icon={ClipboardList} 
          iconColor="cyan" 
        />
        <StatCard 
          title="Post-Game Surveys" 
          value={`${surveyStats.postSurveyCompleted}/${surveyStats.postSurveyTotal}`} 
          change="78% complete" 
          changeType="neutral" 
          icon={ClipboardList} 
          iconColor="violet" 
        />
        <StatCard 
          title="Pending Responses" 
          value={15} 
          icon={Clock} 
          iconColor="amber" 
        />
        <StatCard 
          title="Avg. Completion Time" 
          value="8 min" 
          icon={CheckCircle2} 
          iconColor="emerald" 
        />
      </div>

      <Tabs defaultValue="assigned" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="assigned">Assigned Surveys</TabsTrigger>
          <TabsTrigger value="responses">Individual Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned">
          <DataTable columns={surveyColumns} data={assignedSurveys} />
          
          {/* Reminder Action */}
          <div className="mt-4 glass rounded-xl p-4 border border-amber/30 bg-amber/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber" />
                <div>
                  <p className="font-medium">15 learners haven't completed their post-game survey</p>
                  <p className="text-sm text-muted-foreground">Send a reminder to encourage completion</p>
                </div>
              </div>
              <Button variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Send Bulk Reminder
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="responses">
          <FilterBar 
            searchPlaceholder="Search responses..."
            filters={[
              { name: "Survey", options: [{ value: "all", label: "All Surveys" }, { value: "pre", label: "Pre-Game" }, { value: "post", label: "Post-Game" }] },
              { name: "Status", options: [{ value: "all", label: "All Status" }, { value: "completed", label: "Completed" }, { value: "pending", label: "Pending" }] },
              { name: "Team", options: [{ value: "all", label: "All Teams" }] },
            ]}
            showExport
          />
          <DataTable columns={responseColumns} data={responses} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminSurveys;
