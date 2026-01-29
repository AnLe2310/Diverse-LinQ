import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TicketCheck, Users, Clock, AlertTriangle, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AdminLicenses = () => {
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // License summary
  const licenseSummary = {
    total: 120,
    assigned: 89,
    available: 31,
    expiring: 0,
    expiryDate: "2025-01-15",
  };

  // License assignments
  const assignments = [
    { id: "1", learner: "Emma Wilson", email: "emma@acme.com", team: "Sales Team Alpha", assignedDate: "2024-01-20", expiryDate: "2025-01-20", usageCount: 3, status: "Active" },
    { id: "2", learner: "James Miller", email: "james@acme.com", team: "Sales Team Alpha", assignedDate: "2024-01-22", expiryDate: "2025-01-22", usageCount: 2, status: "Active" },
    { id: "3", learner: "Sophie Brown", email: "sophie@acme.com", team: "Marketing Team", assignedDate: "2024-02-01", expiryDate: "2025-02-01", usageCount: 5, status: "Active" },
    { id: "4", learner: "Oliver Davis", email: "oliver@acme.com", team: "HR Team", assignedDate: "2024-02-10", expiryDate: "2025-02-10", usageCount: 1, status: "Active" },
    { id: "5", learner: "Charlotte Taylor", email: "charlotte@acme.com", team: "Sales Team Beta", assignedDate: "-", expiryDate: "-", usageCount: 0, status: "Pending" },
  ];

  // Usage history
  const usageHistory = [
    { id: "1", date: "2024-03-15", action: "License Assigned", learner: "Charlotte Taylor", by: "John Smith" },
    { id: "2", date: "2024-03-10", action: "Game Session", learner: "Emma Wilson", by: "System" },
    { id: "3", date: "2024-03-08", action: "License Assigned", learner: "William Anderson", by: "John Smith" },
    { id: "4", date: "2024-03-05", action: "Game Session", learner: "James Miller", by: "System" },
  ];

  const assignmentColumns = [
    { key: "learner", header: "Learner", render: (item: typeof assignments[0]) => (
      <div>
        <p className="font-medium">{item.learner}</p>
        <p className="text-xs text-muted-foreground">{item.email}</p>
      </div>
    )},
    { key: "team", header: "Team", render: (item: typeof assignments[0]) => (
      <Badge variant="glass">{item.team}</Badge>
    )},
    { key: "assignedDate", header: "Assigned" },
    { key: "expiryDate", header: "Expires" },
    { key: "usageCount", header: "Uses", render: (item: typeof assignments[0]) => (
      <span className="font-mono">{item.usageCount}</span>
    )},
    { key: "status", header: "Status", render: (item: typeof assignments[0]) => (
      <StatusBadge status={item.status} />
    )},
  ];

  const historyColumns = [
    { key: "date", header: "Date" },
    { key: "action", header: "Action" },
    { key: "learner", header: "Learner" },
    { key: "by", header: "By" },
  ];

  return (
    <DashboardLayout role="admin" userName="John Smith" tenantName="Acme Corporation">
      <PageHeader 
        title="License Management" 
        description="Assign and track license usage for your learners"
        breadcrumbs={[{ label: "Licenses" }]}
        actions={
          <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary">
                <Plus className="w-4 h-4 mr-2" />
                Assign License
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign License</DialogTitle>
                <DialogDescription>Assign a license to a learner or team.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select learner or team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learner">Individual Learner</SelectItem>
                      <SelectItem value="team">Entire Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Select Learner</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose learner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="charlotte">Charlotte Taylor (No License)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="glass rounded-lg p-3 bg-cyan/5 border border-cyan/20">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-cyan">{licenseSummary.available}</strong> licenses available out of {licenseSummary.total}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAssignOpen(false)}>Cancel</Button>
                <Button className="bg-primary">Assign License</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* License Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Licenses" value={licenseSummary.total} icon={TicketCheck} iconColor="violet" />
        <StatCard title="Assigned" value={licenseSummary.assigned} change={`${Math.round((licenseSummary.assigned / licenseSummary.total) * 100)}% utilized`} changeType="neutral" icon={Users} iconColor="cyan" />
        <StatCard title="Available" value={licenseSummary.available} icon={TicketCheck} iconColor="emerald" />
        <StatCard title="Expiring Soon" value={licenseSummary.expiring} icon={Clock} iconColor="amber" />
      </div>

      {/* License Pool Visual */}
      <div className="glass rounded-xl p-6 border border-border/50 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">License Pool</h3>
            <p className="text-sm text-muted-foreground">Your organization's license allocation</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{licenseSummary.assigned} <span className="text-muted-foreground font-normal">/ {licenseSummary.total}</span></p>
            <p className="text-xs text-muted-foreground">Expires: {licenseSummary.expiryDate}</p>
          </div>
        </div>
        <div className="w-full bg-secondary rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-violet to-cyan h-4 rounded-full transition-all"
            style={{ width: `${(licenseSummary.assigned / licenseSummary.total) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{licenseSummary.assigned} assigned</span>
          <span>{licenseSummary.available} available</span>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">License Assignments</h3>
      </div>
      <FilterBar 
        searchPlaceholder="Search assignments..."
        filters={[
          { name: "Team", options: [{ value: "all", label: "All Teams" }] },
          { name: "Status", options: [{ value: "all", label: "All Status" }, { value: "active", label: "Active" }, { value: "pending", label: "Pending" }] },
        ]}
        showExport
      />
      <DataTable columns={assignmentColumns} data={assignments} />

      {/* Usage History */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <DataTable columns={historyColumns} data={usageHistory} />
      </div>
    </DashboardLayout>
  );
};

export default AdminLicenses;
