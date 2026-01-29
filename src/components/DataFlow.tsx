import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TicketCheck, 
  ClipboardList, 
  Gamepad2, 
  Link2, 
  FileBarChart, 
  Download, 
  ScrollText,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const FlowStep = ({ 
  number, 
  title, 
  description, 
  icon: Icon,
  color 
}: { 
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: "cyan" | "violet" | "emerald" | "amber" | "rose";
}) => {
  const colorClasses = {
    cyan: "bg-cyan/20 text-cyan border-cyan/30",
    violet: "bg-violet/20 text-violet border-violet/30",
    emerald: "bg-emerald/20 text-emerald border-emerald/30",
    amber: "bg-amber/20 text-amber border-amber/30",
    rose: "bg-rose/20 text-rose border-rose/30",
  };

  const numberBgClasses = {
    cyan: "bg-cyan text-background",
    violet: "bg-violet text-background",
    emerald: "bg-emerald text-background",
    amber: "bg-amber text-background",
    rose: "bg-rose text-background",
  };

  return (
    <div className="relative flex items-start gap-4 group">
      {/* Number badge */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${numberBgClasses[color]} flex items-center justify-center font-bold text-sm shadow-lg`}>
        {number}
      </div>
      
      {/* Content */}
      <div className={`flex-1 glass rounded-xl p-4 border ${colorClasses[color]} transition-all duration-300 group-hover:scale-[1.02]`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5" />
          <h4 className="font-semibold">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export const DataFlow = () => {
  const steps = [
    {
      number: 1,
      title: "Tenant Onboarding",
      description: "Owner creates a new tenant organization. Admin users are invited to manage their company's learners and licenses.",
      icon: Building2,
      color: "cyan" as const,
    },
    {
      number: 2,
      title: "License Allocation",
      description: "Licenses are allocated to the tenant based on their plan. Admins assign licenses to individual learners or teams.",
      icon: TicketCheck,
      color: "violet" as const,
    },
    {
      number: 3,
      title: "Pre-Game Survey",
      description: "Learners complete a pre-game survey to capture baseline data, demographics, and initial insights before gameplay.",
      icon: ClipboardList,
      color: "emerald" as const,
    },
    {
      number: 4,
      title: "Gameplay & Telemetry",
      description: "Learners play Off the Map. Gameplay telemetry events are ingested in real-time and stored per tenant.",
      icon: Gamepad2,
      color: "amber" as const,
    },
    {
      number: 5,
      title: "Post-Game Survey",
      description: "After completing the game, learners fill out a post-game survey for reflection and feedback capture.",
      icon: ClipboardList,
      color: "rose" as const,
    },
    {
      number: 6,
      title: "Data Linking",
      description: "Platform automatically links survey responses with gameplay telemetry to learner profiles and team assignments.",
      icon: Link2,
      color: "cyan" as const,
    },
    {
      number: 7,
      title: "Report Generation",
      description: "Reporting engine generates team reports using a fixed template, combining all data sources into actionable insights.",
      icon: FileBarChart,
      color: "violet" as const,
    },
    {
      number: 8,
      title: "Export & Dashboard",
      description: "Owners and Admins can download CSV exports and view dashboards with aggregated team and organization analytics.",
      icon: Download,
      color: "emerald" as const,
    },
    {
      number: 9,
      title: "Audit & Compliance",
      description: "All key actions and access events are captured in audit logs for compliance, transparency, and security monitoring.",
      icon: ScrollText,
      color: "amber" as const,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden" id="dataflow">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--violet)/0.08),transparent_60%)]" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <Badge variant="violet" className="mb-4">Data Flow</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            End-to-End <span className="gradient-text">Data Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow the complete flow from tenant onboarding through gameplay, 
            surveys, and reporting — all captured and auditable.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="max-w-3xl mx-auto space-y-6 relative">
          {/* Connecting line */}
          <div className="absolute left-5 top-10 bottom-10 w-0.5 bg-gradient-to-b from-cyan via-violet to-amber opacity-30" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <FlowStep {...step} />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-6 border border-primary/30">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <h4 className="font-semibold text-lg">Complete Data Lifecycle</h4>
            </div>
            <p className="text-muted-foreground text-sm">
              Every step is traceable, auditable, and compliant. Data flows securely through 
              isolated tenant partitions, ensuring privacy and enabling comprehensive analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
