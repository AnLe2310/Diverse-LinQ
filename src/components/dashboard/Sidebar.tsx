import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Building2, 
  TicketCheck, 
  Gamepad2, 
  FileBarChart, 
  ClipboardList, 
  Shield, 
  Users, 
  Settings,
  Home,
  Play,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  role: "owner" | "admin" | "learner";
}

const ownerNavItems: NavItem[] = [
  { label: "Dashboard", href: "/owner", icon: LayoutDashboard },
  { label: "Tenants", href: "/owner/tenants", icon: Building2 },
  { label: "Licenses", href: "/owner/licenses", icon: TicketCheck },
  { label: "Games", href: "/owner/games", icon: Gamepad2 },
  { label: "Reports", href: "/owner/reports", icon: FileBarChart },
  { label: "Surveys", href: "/owner/surveys", icon: ClipboardList },
  { label: "Audit & Security", href: "/owner/audit", icon: Shield },
];

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Learners", href: "/admin/learners", icon: Users },
  { label: "Licenses", href: "/admin/licenses", icon: TicketCheck },
  { label: "Game Access", href: "/admin/games", icon: Gamepad2 },
  { label: "Surveys", href: "/admin/surveys", icon: ClipboardList },
  { label: "Reports", href: "/admin/reports", icon: FileBarChart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const learnerNavItems: NavItem[] = [
  { label: "My Home", href: "/learner", icon: Home },
  { label: "Play Game", href: "/learner/game", icon: Play },
  { label: "My Results", href: "/learner/results", icon: FileBarChart },
  { label: "Profile", href: "/learner/profile", icon: User },
];

export const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = role === "owner" 
    ? ownerNavItems 
    : role === "admin" 
      ? adminNavItems 
      : learnerNavItems;

  const portalTitles = {
    owner: "Owner Portal",
    admin: "Admin Portal",
    learner: "Learner Portal",
  };

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 border-r border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 border-b border-border/50 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan to-violet flex items-center justify-center flex-shrink-0">
            <span className="text-background font-bold">O</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-semibold text-sm truncate">Off the Map</p>
              <p className="text-xs text-muted-foreground truncate">{portalTitles[role]}</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== `/${role}` && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
              {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* EU Compliance Badge */}
      {!collapsed && (
        <div className="p-4 border-t border-border/50">
          <div className="glass rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-emerald" />
              <span className="text-xs font-medium">EU Compliant</span>
            </div>
            <p className="text-[10px] text-muted-foreground">GDPR • EU AI Act</p>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-border/50">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>
    </aside>
  );
};
