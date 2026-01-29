import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Shield, 
  Server, 
  Database, 
  Plug, 
  Eye,
  Users,
  Crown,
  GraduationCap,
  Key,
  Building2,
  TicketCheck,
  Gamepad2,
  ClipboardList,
  Activity,
  FileBarChart,
  Bell,
  ScrollText,
  HardDrive,
  BarChart3,
  Webhook,
  FileDown,
  Lock,
  Clock
} from "lucide-react";

const DiagramBox = ({ 
  title, 
  items, 
  color,
  icon: Icon 
}: { 
  title: string; 
  items: { icon: React.ElementType; label: string }[];
  color: "cyan" | "violet" | "emerald" | "amber" | "rose";
  icon: React.ElementType;
}) => {
  const colorClasses = {
    cyan: "border-cyan/30 bg-cyan/5",
    violet: "border-violet/30 bg-violet/5",
    emerald: "border-emerald/30 bg-emerald/5",
    amber: "border-amber/30 bg-amber/5",
    rose: "border-rose/30 bg-rose/5",
  };

  const iconColorClasses = {
    cyan: "text-cyan",
    violet: "text-violet",
    emerald: "text-emerald",
    amber: "text-amber",
    rose: "text-rose",
  };

  return (
    <div className={`glass rounded-xl p-4 border ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${iconColorClasses[color]}`} />
        <h4 className="font-semibold text-sm">{title}</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
            <item.icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Arrow = ({ direction = "down", className = "" }: { direction?: "down" | "right" | "left"; className?: string }) => {
  const paths = {
    down: "M12 4v16m0 0l-4-4m4 4l4-4",
    right: "M4 12h16m0 0l-4-4m4 4l-4 4",
    left: "M20 12H4m0 0l4-4m-4 4l4 4",
  };
  
  return (
    <svg className={`w-6 h-6 text-muted-foreground/50 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={paths[direction]} />
    </svg>
  );
};

export const ArchitectureDiagram = () => {
  return (
    <section className="relative py-24 overflow-hidden" id="architecture">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--cyan)/0.08),transparent_60%)]" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Architecture</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            High-Level <span className="gradient-text">System Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A scalable, secure multi-tenant platform designed for learning analytics 
            and gameplay insights with strict tenant isolation.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Layer 1: Client Apps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DiagramBox 
              title="Owner Portal" 
              icon={Crown}
              color="cyan"
              items={[
                { icon: Building2, label: "Tenant Management" },
                { icon: TicketCheck, label: "License Distribution" },
                { icon: BarChart3, label: "Platform Analytics" },
              ]}
            />
            <DiagramBox 
              title="Admin Portal" 
              icon={Users}
              color="violet"
              items={[
                { icon: Users, label: "Learner Management" },
                { icon: Gamepad2, label: "Game Scheduling" },
                { icon: FileBarChart, label: "Team Reports" },
              ]}
            />
            <DiagramBox 
              title="Learner Portal" 
              icon={GraduationCap}
              color="emerald"
              items={[
                { icon: ClipboardList, label: "Pre/Post Surveys" },
                { icon: Gamepad2, label: "Game Access" },
                { icon: Activity, label: "Progress Tracking" },
              ]}
            />
          </div>

          {/* Arrows */}
          <div className="flex justify-center">
            <Arrow direction="down" />
          </div>

          {/* Layer 2: Auth & Identity */}
          <div className="glass rounded-xl p-6 border border-amber/30 bg-amber/5">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Key className="w-6 h-6 text-amber" />
              <h4 className="font-semibold text-lg">Auth & Identity Layer</h4>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-background/50">Role-Based Access (Owner/Admin/Learner)</span>
              <span className="px-3 py-1 rounded-full bg-background/50">JWT Authentication</span>
              <span className="px-3 py-1 rounded-full bg-background/50">SSO Ready</span>
              <span className="px-3 py-1 rounded-full bg-background/50">Session Management</span>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center">
            <Arrow direction="down" />
          </div>

          {/* Layer 3: Core Backend Services */}
          <div className="glass rounded-xl p-6 border border-border">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Server className="w-6 h-6 text-primary" />
              <h4 className="font-semibold text-lg">Core Backend Services</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { icon: Building2, label: "Tenant Mgmt" },
                { icon: Users, label: "User & Teams" },
                { icon: TicketCheck, label: "Licensing" },
                { icon: Gamepad2, label: "Game Access" },
                { icon: ClipboardList, label: "Surveys" },
                { icon: Activity, label: "Telemetry Ingestion" },
                { icon: FileBarChart, label: "Reporting Engine" },
                { icon: Bell, label: "Notifications" },
                { icon: ScrollText, label: "Audit Logging" },
                { icon: Eye, label: "Monitoring" },
              ].map((service, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 text-xs">
                  <service.icon className="w-4 h-4 text-primary" />
                  <span>{service.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center">
            <Arrow direction="down" />
          </div>

          {/* Layer 4: Data Layer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DiagramBox 
              title="Per-Tenant DB" 
              icon={Database}
              color="rose"
              items={[
                { icon: Lock, label: "Schema Isolation" },
                { icon: Shield, label: "RLS Policies" },
                { icon: Clock, label: "Retention Rules" },
              ]}
            />
            <DiagramBox 
              title="Metadata Registry" 
              icon={Database}
              color="violet"
              items={[
                { icon: Building2, label: "Tenant Configs" },
                { icon: TicketCheck, label: "License Plans" },
                { icon: Gamepad2, label: "Game Catalog" },
              ]}
            />
            <DiagramBox 
              title="Object Storage" 
              icon={HardDrive}
              color="cyan"
              items={[
                { icon: FileDown, label: "Report Exports" },
                { icon: FileBarChart, label: "CSV Downloads" },
                { icon: ScrollText, label: "Audit Archives" },
              ]}
            />
            <DiagramBox 
              title="Analytics Store" 
              icon={BarChart3}
              color="emerald"
              items={[
                { icon: Activity, label: "Aggregated Metrics" },
                { icon: Users, label: "Team Insights" },
                { icon: Eye, label: "Usage Analytics" },
              ]}
            />
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-8 my-4">
            <div className="flex items-center gap-2 text-muted-foreground/70">
              <Arrow direction="left" />
              <span className="text-xs">Integrations</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground/70">
              <span className="text-xs">Observability</span>
              <Arrow direction="right" />
            </div>
          </div>

          {/* Layer 5: Integrations & Observability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DiagramBox 
              title="External Integrations" 
              icon={Plug}
              color="amber"
              items={[
                { icon: Gamepad2, label: "Game API (Telemetry)" },
                { icon: ClipboardList, label: "Survey Provider" },
                { icon: FileDown, label: "CSV Export" },
                { icon: Webhook, label: "Webhooks (Placeholder)" },
              ]}
            />
            <DiagramBox 
              title="Observability & Security" 
              icon={Eye}
              color="rose"
              items={[
                { icon: ScrollText, label: "Centralized Logging" },
                { icon: Shield, label: "Audit Trail" },
                { icon: Lock, label: "Encryption (Transit/Rest)" },
                { icon: Clock, label: "Retention Policies" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
