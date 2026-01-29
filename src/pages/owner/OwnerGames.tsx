import { DashboardLayout, PageHeader, DataTable, StatusBadge } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Gamepad2, Settings, Calendar, Users, Building2 } from "lucide-react";

const OwnerGames = () => {
  // Mock games
  const games = [
    { 
      id: "1", 
      name: "Off the Map", 
      version: "2.1.0", 
      description: "Team collaboration and communication training game",
      tenants: 18,
      totalPlays: 1240,
      status: "Active"
    },
  ];

  // Mock game enablements per tenant
  const enablements = [
    { id: "1", tenant: "Acme Corporation", game: "Off the Map", active: true, schedule: "Always Open", eligibleLearners: 89, completions: 67 },
    { id: "2", tenant: "Tech Solutions BV", game: "Off the Map", active: true, schedule: "Mon-Fri, 9-18", eligibleLearners: 62, completions: 45 },
    { id: "3", tenant: "Innovation Labs", game: "Off the Map", active: false, schedule: "Not Set", eligibleLearners: 0, completions: 0 },
    { id: "4", tenant: "Global Training Inc", game: "Off the Map", active: true, schedule: "Always Open", eligibleLearners: 156, completions: 134 },
    { id: "5", tenant: "Learning Corp", game: "Off the Map", active: true, schedule: "Custom Schedule", eligibleLearners: 78, completions: 52 },
  ];

  const enablementColumns = [
    { key: "tenant", header: "Tenant", render: (item: typeof enablements[0]) => (
      <div className="flex items-center gap-3">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium">{item.tenant}</span>
      </div>
    )},
    { key: "active", header: "Status", render: (item: typeof enablements[0]) => (
      <div className="flex items-center gap-2">
        <Switch checked={item.active} />
        <span className={item.active ? "text-emerald" : "text-muted-foreground"}>
          {item.active ? "Enabled" : "Disabled"}
        </span>
      </div>
    )},
    { key: "schedule", header: "Schedule", render: (item: typeof enablements[0]) => (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span>{item.schedule}</span>
      </div>
    )},
    { key: "eligibleLearners", header: "Eligible Learners", render: (item: typeof enablements[0]) => (
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-muted-foreground" />
        <span>{item.eligibleLearners}</span>
      </div>
    )},
    { key: "completions", header: "Completions" },
    { key: "actions", header: "", render: () => (
      <Button variant="ghost" size="sm">
        <Settings className="w-4 h-4" />
      </Button>
    )},
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title="Game Management" 
        description="Enable and configure games for tenants"
        breadcrumbs={[{ label: "Games" }]}
      />

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {games.map((game) => (
          <div key={game.id} className="glass rounded-xl p-6 border border-emerald/30 bg-emerald/5">
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-xl bg-emerald/20 flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-emerald" />
              </div>
              <StatusBadge status={game.status} />
            </div>
            <h3 className="text-xl font-bold mb-1">{game.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Version: </span>
                <Badge variant="glass">{game.version}</Badge>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-sm">
              <div>
                <p className="text-2xl font-bold text-cyan">{game.tenants}</p>
                <p className="text-muted-foreground">Active Tenants</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-violet">{game.totalPlays.toLocaleString()}</p>
                <p className="text-muted-foreground">Total Plays</p>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder for future games */}
        <div className="glass rounded-xl p-6 border border-dashed border-border/50 flex flex-col items-center justify-center text-center opacity-50">
          <Gamepad2 className="w-10 h-10 text-muted-foreground mb-3" />
          <p className="font-medium">More Games Coming Soon</p>
          <p className="text-sm text-muted-foreground">Additional game modules in development</p>
        </div>
      </div>

      {/* Enablements Table */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Tenant Game Access</h2>
        <p className="text-muted-foreground">Configure game access and schedules per tenant</p>
      </div>

      <DataTable columns={enablementColumns} data={enablements} />
    </DashboardLayout>
  );
};

export default OwnerGames;
