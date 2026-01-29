import { useState } from "react";
import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, StatCard } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TicketCheck, Building2, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OwnerLicenses = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Mock license plans
  const plans = [
    { id: "1", name: "Starter Pack", licenses: 50, price: "€500/year", features: "Basic features", tenants: 5 },
    { id: "2", name: "Professional", licenses: 100, price: "€900/year", features: "All features + Priority support", tenants: 12 },
    { id: "3", name: "Enterprise", licenses: 500, price: "€3,500/year", features: "All features + Custom integrations", tenants: 7 },
  ];

  // Mock allocations
  const allocations = [
    { id: "1", tenant: "Acme Corporation", plan: "Professional", quantity: 120, used: 89, expiry: "2025-01-15", status: "Active" },
    { id: "2", tenant: "Tech Solutions BV", plan: "Professional", quantity: 80, used: 62, expiry: "2025-02-20", status: "Active" },
    { id: "3", tenant: "Innovation Labs", plan: "Starter Pack", quantity: 50, used: 0, expiry: "2025-03-01", status: "Pending" },
    { id: "4", tenant: "Global Training Inc", plan: "Enterprise", quantity: 200, used: 156, expiry: "2024-11-10", status: "Expiring Soon" },
    { id: "5", tenant: "Learning Corp", plan: "Professional", quantity: 100, used: 78, expiry: "2025-01-28", status: "Active" },
  ];

  const planColumns = [
    { key: "name", header: "Plan Name", render: (item: typeof plans[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center">
          <TicketCheck className="w-5 h-5 text-violet" />
        </div>
        <span className="font-medium">{item.name}</span>
      </div>
    )},
    { key: "licenses", header: "Licenses Included" },
    { key: "price", header: "Price" },
    { key: "features", header: "Features" },
    { key: "tenants", header: "Active Tenants" },
    {
      key: "actions",
      header: "",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-rose"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const allocationColumns = [
    { key: "tenant", header: "Tenant", render: (item: typeof allocations[0]) => (
      <div className="flex items-center gap-3">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <span>{item.tenant}</span>
      </div>
    )},
    { key: "plan", header: "Plan", render: (item: typeof allocations[0]) => <Badge variant="violet">{item.plan}</Badge> },
    { key: "quantity", header: "Allocated" },
    { key: "used", header: "Used", render: (item: typeof allocations[0]) => (
      <div className="flex items-center gap-2">
        <span>{item.used}</span>
        <span className="text-muted-foreground">({Math.round((item.used / item.quantity) * 100)}%)</span>
      </div>
    )},
    { key: "expiry", header: "Expiry Date" },
    { key: "status", header: "Status", render: (item: typeof allocations[0]) => <StatusBadge status={item.status.includes("Expiring") ? "pending" : item.status} /> },
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title="License Management" 
        description="Create plans, allocate licenses, and track usage"
        breadcrumbs={[{ label: "Licenses" }]}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Licenses" value="1,440" icon={TicketCheck} iconColor="violet" />
        <StatCard title="Allocated" value="550" change="38% of total" changeType="neutral" icon={TicketCheck} iconColor="cyan" />
        <StatCard title="In Use" value="385" change="70% utilization" changeType="positive" icon={TicketCheck} iconColor="emerald" />
        <StatCard title="Expiring Soon" value="200" change="1 tenant" changeType="negative" icon={TicketCheck} iconColor="amber" />
      </div>

      <Tabs defaultValue="allocations" className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="allocations">Allocations</TabsTrigger>
          <TabsTrigger value="plans">License Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="allocations">
          <FilterBar 
            searchPlaceholder="Search allocations..."
            filters={[
              { name: "Status", options: [{ value: "all", label: "All" }, { value: "active", label: "Active" }, { value: "expiring", label: "Expiring Soon" }] },
              { name: "Plan", options: [{ value: "all", label: "All Plans" }, ...plans.map(p => ({ value: p.id, label: p.name }))] }
            ]}
            showExport
            showAdd
            addLabel="Allocate Licenses"
          />
          <DataTable columns={allocationColumns} data={allocations} />
        </TabsContent>

        <TabsContent value="plans">
          <div className="flex justify-end mb-4">
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create License Plan</DialogTitle>
                  <DialogDescription>Define a new license bundle for tenants.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Plan Name</Label>
                    <Input placeholder="e.g., Enterprise Plus" />
                  </div>
                  <div className="space-y-2">
                    <Label>Number of Licenses</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input placeholder="€1,000/year" />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Policy</Label>
                    <Input placeholder="12 months from activation" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button className="bg-primary">Create Plan</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <DataTable columns={planColumns} data={plans} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default OwnerLicenses;
