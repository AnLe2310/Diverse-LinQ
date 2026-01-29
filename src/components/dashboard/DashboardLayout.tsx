import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "owner" | "admin" | "learner";
  userName?: string;
  tenantName?: string;
}

export const DashboardLayout = ({ 
  children, 
  role, 
  userName = "User",
  tenantName = "Diverselinq"
}: DashboardLayoutProps) => {
  const mockTenants = [
    { id: "1", name: "Diverselinq" },
    { id: "2", name: "Acme Corp" },
    { id: "3", name: "Tech Solutions" },
  ];

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopBar 
          userRole={role}
          userName={userName}
          tenantName={tenantName}
          showTenantSelector={role === "owner"}
          tenants={role === "owner" ? mockTenants : undefined}
        />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
