import { DashboardLayout, PageHeader, DataTable, StatusBadge, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Gamepad2, Users, Calendar, Clock, Play, CheckCircle2, AlertCircle } from "lucide-react";
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

const AdminGames = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [gameEnabled, setGameEnabled] = useState(true);

  // Game status
  const gameStatus = {
    name: "Off the Map",
    version: "2.1.0",
    enabled: true,
    eligibleLearners: 89,
    completedLearners: 67,
    inProgress: 12,
    notStarted: 10,
    schedule: "Always Open",
  };

  // Team eligibility
  const teamEligibility = [
    { id: "1", team: "Sales Team Alpha", eligible: 12, completed: 10, inProgress: 2, notStarted: 0, status: "Open" },
    { id: "2", team: "Sales Team Beta", eligible: 8, completed: 4, inProgress: 2, notStarted: 2, status: "Open" },
    { id: "3", team: "Marketing Team", eligible: 10, completed: 9, inProgress: 1, notStarted: 0, status: "Open" },
    { id: "4", team: "HR Team", eligible: 6, completed: 2, inProgress: 1, notStarted: 3, status: "Scheduled" },
    { id: "5", team: "Development", eligible: 15, completed: 8, inProgress: 4, notStarted: 3, status: "Open" },
  ];

  // Recent game sessions
  const recentSessions = [
    { id: "1", learner: "Emma Wilson", team: "Sales Team Alpha", startTime: "2024-03-15 10:30", duration: "45 min", status: "Completed" },
    { id: "2", learner: "James Miller", team: "Sales Team Alpha", startTime: "2024-03-15 09:15", duration: "52 min", status: "Completed" },
    { id: "3", learner: "William Anderson", team: "Development", startTime: "2024-03-14 14:00", duration: "38 min", status: "Completed" },
    { id: "4", learner: "Sophie Brown", team: "Marketing Team", startTime: "2024-03-14 11:20", duration: "-", status: "In Progress" },
  ];

  const teamColumns = [
    { key: "team", header: "Team", render: (item: typeof teamEligibility[0]) => (
      <div className="flex items-center gap-3">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium">{item.team}</span>
      </div>
    )},
    { key: "eligible", header: "Eligible" },
    { key: "completed", header: "Completed", render: (item: typeof teamEligibility[0]) => (
      <span className="text-emerald">{item.completed}</span>
    )},
    { key: "inProgress", header: "In Progress", render: (item: typeof teamEligibility[0]) => (
      <span className="text-cyan">{item.inProgress}</span>
    )},
    { key: "notStarted", header: "Not Started", render: (item: typeof teamEligibility[0]) => (
      <span className="text-muted-foreground">{item.notStarted}</span>
    )},
    { key: "status", header: "Access", render: (item: typeof teamEligibility[0]) => (
      <Badge variant={item.status === "Open" ? "emerald" : "amber"}>{item.status}</Badge>
    )},
    { key: "actions", header: "", render: () => (
      <Button variant="ghost" size="sm">Configure</Button>
    )},
  ];

  const sessionColumns = [
    { key: "learner", header: "Learner" },
    { key: "team", header: "Team", render: (item: typeof recentSessions[0]) => (
      <Badge variant="glass">{item.team}</Badge>
    )},
    { key: "startTime", header: "Started" },
    { key: "duration", header: "Duration" },
    { key: "status", header: "Status", render: (item: typeof recentSessions[0]) => (
      <StatusBadge status={item.status === "Completed" ? "completed" : "active"} />
    )},
  ];

  return (
    <DashboardLayout role="admin" userName="John Smith" tenantName="Acme Corporation">
      <PageHeader 
        title="Game Access" 
        description="Manage game availability and track learner progress"
        breadcrumbs={[{ label: "Game Access" }]}
      />

      {/* Game Card */}
      <div className="glass rounded-xl p-6 border border-emerald/30 bg-emerald/5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-emerald/20 flex items-center justify-center">
              <Gamepad2 className="w-8 h-8 text-emerald" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{gameStatus.name}</h2>
              <p className="text-muted-foreground">Version {gameStatus.version}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Game Access</span>
              <Switch 
                checked={gameEnabled}
                onCheckedChange={setGameEnabled}
              />
              <span className={gameEnabled ? "text-emerald font-medium" : "text-muted-foreground"}>
                {gameEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Game Access</DialogTitle>
                  <DialogDescription>Set specific time windows for game availability.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Schedule Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="always">Always Open</SelectItem>
                        <SelectItem value="weekdays">Weekdays Only (9-18)</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsScheduleOpen(false)}>Cancel</Button>
                  <Button className="bg-primary">Save Schedule</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-emerald/20 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{gameStatus.eligibleLearners}</p>
            <p className="text-sm text-muted-foreground">Eligible</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald">{gameStatus.completedLearners}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan">{gameStatus.inProgress}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-muted-foreground">{gameStatus.notStarted}</p>
            <p className="text-sm text-muted-foreground">Not Started</p>
          </div>
        </div>
      </div>

      {/* Eligibility Checks */}
      <div className="glass rounded-xl p-4 border border-cyan/30 bg-cyan/5 mb-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-cyan" />
          Eligibility Requirements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald" />
            <span>Active license assigned</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald" />
            <span>Pre-game survey completed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald" />
            <span>Team assigned</span>
          </div>
        </div>
      </div>

      {/* Team Eligibility */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Team Access</h3>
        <p className="text-muted-foreground text-sm">Configure game access per team</p>
      </div>
      <DataTable columns={teamColumns} data={teamEligibility} />

      {/* Recent Sessions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Recent Game Sessions</h3>
        <DataTable columns={sessionColumns} data={recentSessions} />
      </div>
    </DashboardLayout>
  );
};

export default AdminGames;
