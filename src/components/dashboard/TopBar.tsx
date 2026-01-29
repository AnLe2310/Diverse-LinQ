import { Bell, Search, ChevronDown, User, Settings, LogOut, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  userRole: "owner" | "admin" | "learner";
  userName?: string;
  tenantName?: string;
  showTenantSelector?: boolean;
  tenants?: { id: string; name: string }[];
  onTenantChange?: (tenantId: string) => void;
}

export const TopBar = ({ 
  userRole, 
  userName = "User", 
  tenantName = "Diverselinq",
  showTenantSelector = false,
  tenants = [],
  onTenantChange
}: TopBarProps) => {
  const navigate = useNavigate();

  const roleLabels = {
    owner: "Platform Owner",
    admin: "Tenant Admin",
    learner: "Learner",
  };

  const roleBadgeColors = {
    owner: "cyan" as const,
    admin: "violet" as const,
    learner: "emerald" as const,
  };

  return (
    <header className="h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Tenant Selector (Owner only) */}
        {showTenantSelector && tenants.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-border/50">
                <Building2 className="w-4 h-4" />
                <span>{tenantName}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Switch Tenant</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {tenants.map((tenant) => (
                <DropdownMenuItem 
                  key={tenant.id}
                  onClick={() => onTenantChange?.(tenant.id)}
                >
                  {tenant.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="w-64 pl-10 bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose rounded-full" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                <span className="text-sm font-medium text-background">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium">{userName}</p>
                <Badge variant={roleBadgeColors[userRole]} className="text-[10px] px-1.5 py-0">
                  {roleLabels[userRole]}
                </Badge>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p>{userName}</p>
                <p className="text-xs text-muted-foreground font-normal">{tenantName}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/")} className="text-rose">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
