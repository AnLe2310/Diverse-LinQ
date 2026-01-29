import { useState } from "react";
import { DashboardLayout, PageHeader, FilterBar, DataTable, StatusBadge, EmptyState } from "@/components/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Building2, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
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

const Tenants = () => {
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Mock tenants data
  const tenants = [
    { id: "1", name: "Acme Corporation", region: "EU-West", partition: "tenant_acme", primaryAdmin: "john@acme.com", licenses: 120, learners: 89, status: "Active", created: "2024-01-15" },
    { id: "2", name: "Tech Solutions BV", region: "EU-Central", partition: "tenant_techsol", primaryAdmin: "admin@techsol.nl", licenses: 80, learners: 62, status: "Active", created: "2024-02-20" },
    { id: "3", name: "Innovation Labs", region: "EU-North", partition: "tenant_innolabs", primaryAdmin: "contact@innolabs.se", licenses: 50, learners: 0, status: "Pending", created: "2024-03-01" },
    { id: "4", name: "Global Training Inc", region: "EU-West", partition: "tenant_global", primaryAdmin: "hr@globaltraining.de", licenses: 200, learners: 156, status: "Active", created: "2023-11-10" },
    { id: "5", name: "Learning Corp", region: "EU-South", partition: "tenant_learning", primaryAdmin: "team@learningcorp.es", licenses: 100, learners: 78, status: "Active", created: "2024-01-28" },
  ];

  const columns = [
    { 
      key: "name", 
      header: "Tenant Name",
      render: (item: typeof tenants[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-violet/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.primaryAdmin}</p>
          </div>
        </div>
      )
    },
    { 
      key: "region", 
      header: "Region", 
      render: (item: typeof tenants[0]) => <Badge variant="glass">{item.region}</Badge>
    },
    { key: "licenses", header: "Licenses" },
    { key: "learners", header: "Active Learners" },
    { 
      key: "status", 
      header: "Status", 
      render: (item: typeof tenants[0]) => <StatusBadge status={item.status} />
    },
    { key: "created", header: "Created" },
    {
      key: "actions",
      header: "",
      render: (item: typeof tenants[0]) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/owner/tenants/${item.id}`)}>
              <Eye className="w-4 h-4 mr-2" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-rose">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const filters = [
    {
      name: "Region",
      options: [
        { value: "all", label: "All Regions" },
        { value: "eu-west", label: "EU-West" },
        { value: "eu-central", label: "EU-Central" },
        { value: "eu-north", label: "EU-North" },
        { value: "eu-south", label: "EU-South" },
      ]
    },
    {
      name: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "pending", label: "Pending" },
        { value: "inactive", label: "Inactive" },
      ]
    }
  ];

  return (
    <DashboardLayout role="owner" userName="Platform Admin" tenantName="Diverselinq">
      <PageHeader 
        title="Tenants" 
        description="Manage customer organizations and their configurations"
        breadcrumbs={[{ label: "Tenants" }]}
        actions={
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Building2 className="w-4 h-4 mr-2" />
                Create Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Tenant</DialogTitle>
                <DialogDescription>
                  Set up a new customer organization with data isolation.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="name" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">EU Region</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eu-west">EU-West (Ireland)</SelectItem>
                      <SelectItem value="eu-central">EU-Central (Frankfurt)</SelectItem>
                      <SelectItem value="eu-north">EU-North (Stockholm)</SelectItem>
                      <SelectItem value="eu-south">EU-South (Milan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin">Primary Admin Email</Label>
                  <Input id="admin" type="email" placeholder="admin@company.com" />
                </div>
                <div className="glass rounded-lg p-3 bg-cyan/5 border border-cyan/20">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-cyan">Data Isolation:</strong> A dedicated database partition will be created for this tenant, ensuring complete data isolation per GDPR requirements.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button className="bg-primary">Create Tenant</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <FilterBar 
        searchPlaceholder="Search tenants..."
        filters={filters}
        showExport
      />

      <DataTable 
        columns={columns}
        data={tenants}
        onRowClick={(tenant) => navigate(`/owner/tenants/${tenant.id}`)}
      />
    </DashboardLayout>
  );
};

export default Tenants;
