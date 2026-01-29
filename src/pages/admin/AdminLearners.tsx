import { useState } from "react";
import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, EmptyState } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Plus, Upload, MoreVertical, Mail, Edit, Trash2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminLearners = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const learners = [
    { id: "1", name: "Emma Wilson", email: "emma@acme.com", team: "Sales Team Alpha", license: "Assigned", status: "Active", progress: "Completed", joinedDate: "2024-01-20" },
    { id: "2", name: "James Miller", email: "james@acme.com", team: "Sales Team Alpha", license: "Assigned", status: "Active", progress: "Post-Survey", joinedDate: "2024-01-22" },
    { id: "3", name: "Sophie Brown", email: "sophie@acme.com", team: "Marketing Team", license: "Assigned", status: "Active", progress: "Game Complete", joinedDate: "2024-02-01" },
    { id: "4", name: "Oliver Davis", email: "oliver@acme.com", team: "HR Team", license: "Assigned", status: "Active", progress: "Pre-Survey", joinedDate: "2024-02-10" },
    { id: "5", name: "Charlotte Taylor", email: "charlotte@acme.com", team: "Sales Team Beta", license: "Pending", status: "Invited", progress: "Not Started", joinedDate: "2024-03-01" },
    { id: "6", name: "William Anderson", email: "william@acme.com", team: "Development", license: "Assigned", status: "Active", progress: "In Progress", joinedDate: "2024-02-15" },
  ];

  const teams = [
    { id: "1", name: "Sales Team Alpha", members: 12, completion: "75%", lead: "Emma Wilson" },
    { id: "2", name: "Sales Team Beta", members: 8, completion: "50%", lead: "John Carter" },
    { id: "3", name: "Marketing Team", members: 10, completion: "90%", lead: "Sophie Brown" },
    { id: "4", name: "HR Team", members: 6, completion: "33%", lead: "Lisa Park" },
    { id: "5", name: "Development", members: 15, completion: "60%", lead: "Mike Chen" },
  ];

  const learnerColumns = [
    { key: "name", header: "Learner", render: (item: typeof learners[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan/30 to-violet/30 flex items-center justify-center">
          <span className="text-sm font-medium">{item.name.split(" ").map(n => n[0]).join("")}</span>
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      </div>
    )},
    { key: "team", header: "Team", render: (item: typeof learners[0]) => (
      <Badge variant="glass">{item.team}</Badge>
    )},
    { key: "license", header: "License", render: (item: typeof learners[0]) => (
      <Badge variant={item.license === "Assigned" ? "emerald" : "amber"}>{item.license}</Badge>
    )},
    { key: "progress", header: "Progress", render: (item: typeof learners[0]) => {
      const progressSteps = ["Not Started", "Pre-Survey", "In Progress", "Game Complete", "Post-Survey", "Completed"];
      const currentStep = progressSteps.indexOf(item.progress);
      const percentage = Math.round((currentStep / (progressSteps.length - 1)) * 100);
      return (
        <div className="flex items-center gap-2">
          <div className="w-20 bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan to-violet h-2 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{item.progress}</span>
        </div>
      );
    }},
    { key: "status", header: "Status", render: (item: typeof learners[0]) => (
      <StatusBadge status={item.status} />
    )},
    { key: "actions", header: "", render: (item: typeof learners[0]) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><Mail className="w-4 h-4 mr-2" /> Send Reminder</DropdownMenuItem>
          <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit Profile</DropdownMenuItem>
          <DropdownMenuItem className="text-rose"><Trash2 className="w-4 h-4 mr-2" /> Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )},
  ];

  const teamColumns = [
    { key: "name", header: "Team Name", render: (item: typeof teams[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center">
          <Users className="w-5 h-5 text-violet" />
        </div>
        <span className="font-medium">{item.name}</span>
      </div>
    )},
    { key: "lead", header: "Team Lead" },
    { key: "members", header: "Members" },
    { key: "completion", header: "Completion", render: (item: typeof teams[0]) => (
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
    <DashboardLayout role="admin" userName="John Smith" tenantName="Acme Corporation">
      <PageHeader 
        title="Learners" 
        description="Manage learners and teams in your organization"
        breadcrumbs={[{ label: "Learners" }]}
        actions={
          <div className="flex gap-2">
            <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Learners</DialogTitle>
                  <DialogDescription>Upload a CSV file to bulk import learners.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                    <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop your CSV file here</p>
                    <Button variant="outline" size="sm">Browse Files</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Required columns:</p>
                    <code className="bg-secondary px-2 py-1 rounded">name, email, team</code>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsImportOpen(false)}>Cancel</Button>
                  <Button className="bg-primary">Import</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Learner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Learner</DialogTitle>
                  <DialogDescription>Invite a learner to your organization.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Team</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                  <Button className="bg-primary">Send Invitation</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      <Tabs defaultValue="learners" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="learners" className="gap-2">
            <Users className="w-4 h-4" /> All Learners
          </TabsTrigger>
          <TabsTrigger value="teams" className="gap-2">
            <Users className="w-4 h-4" /> Teams
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learners">
          <FilterBar 
            searchPlaceholder="Search learners..."
            filters={[
              { name: "Team", options: [{ value: "all", label: "All Teams" }, ...teams.map(t => ({ value: t.id, label: t.name }))] },
              { name: "Status", options: [{ value: "all", label: "All Status" }, { value: "active", label: "Active" }, { value: "invited", label: "Invited" }] },
              { name: "Progress", options: [{ value: "all", label: "All Progress" }, { value: "completed", label: "Completed" }, { value: "in-progress", label: "In Progress" }, { value: "not-started", label: "Not Started" }] },
            ]}
            showExport
          />
          <DataTable columns={learnerColumns} data={learners} />
        </TabsContent>

        <TabsContent value="teams">
          <div className="flex justify-end mb-4">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </div>
          <DataTable columns={teamColumns} data={teams} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminLearners;
