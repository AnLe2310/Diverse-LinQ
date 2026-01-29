import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye, 
  FileCheck, 
  Scale,
  Server,
  Fingerprint,
  FileX,
  Clock,
  Search,
  Code,
  Activity,
  CheckCircle2
} from "lucide-react";

interface ComplianceCardProps {
  title: string;
  icon: React.ElementType;
  color: "cyan" | "violet" | "emerald" | "amber";
  items: { icon: React.ElementType; text: string }[];
}

const ComplianceCard = ({ title, icon: Icon, color, items }: ComplianceCardProps) => {
  const colorClasses = {
    cyan: "border-cyan/30 from-cyan/10 to-transparent",
    violet: "border-violet/30 from-violet/10 to-transparent",
    emerald: "border-emerald/30 from-emerald/10 to-transparent",
    amber: "border-amber/30 from-amber/10 to-transparent",
  };

  const iconColorClasses = {
    cyan: "text-cyan bg-cyan/20",
    violet: "text-violet bg-violet/20",
    emerald: "text-emerald bg-emerald/20",
    amber: "text-amber bg-amber/20",
  };

  return (
    <div className={`glass rounded-2xl p-6 border bg-gradient-to-b ${colorClasses[color]} transition-all duration-300 hover:scale-[1.02]`}>
      <div className={`w-12 h-12 rounded-xl ${iconColorClasses[color]} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
            <item.icon className="w-4 h-4 mt-0.5 text-foreground/60 flex-shrink-0" />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Compliance = () => {
  const cards: ComplianceCardProps[] = [
    {
      title: "Tenant Isolation",
      icon: Shield,
      color: "cyan",
      items: [
        { icon: Lock, text: "Database partitioning per tenant with separate schemas" },
        { icon: Fingerprint, text: "Strict row-level security policies" },
        { icon: Eye, text: "Least privilege access controls" },
        { icon: FileCheck, text: "Complete auditability of all data access" },
      ],
    },
    {
      title: "GDPR Compliance",
      icon: Scale,
      color: "violet",
      items: [
        { icon: CheckCircle2, text: "Explicit consent collection and tracking" },
        { icon: FileX, text: "Data minimization — only collect what's needed" },
        { icon: Clock, text: "Configurable retention policies per data type" },
        { icon: FileCheck, text: "Export and delete request handling (SAR/erasure)" },
      ],
    },
    {
      title: "EU AI Act Alignment",
      icon: Eye,
      color: "emerald",
      items: [
        { icon: FileCheck, text: "Transparency notes for any AI-assisted features" },
        { icon: Search, text: "Reporting explainability documentation" },
        { icon: Activity, text: "Human oversight mechanisms in place" },
        { icon: Shield, text: "Risk assessment placeholders for future expansion" },
      ],
    },
    {
      title: "DevOps & Quality",
      icon: Server,
      color: "amber",
      items: [
        { icon: Code, text: "CI/CD pipelines with automated testing" },
        { icon: Search, text: "SonarQube code quality scanning" },
        { icon: Activity, text: "Centralized monitoring and alerting" },
        { icon: Lock, text: "Encryption in transit (TLS) and at rest (AES-256)" },
      ],
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden" id="compliance">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--amber)/0.08),transparent_60%)]" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <Badge variant="amber" className="mb-4">Compliance</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Security & <span className="gradient-text">Compliance</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with privacy-by-design principles, ensuring GDPR compliance, 
            EU AI Act alignment, and enterprise-grade security standards.
          </p>
        </div>

        {/* Compliance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <ComplianceCard {...card} />
            </div>
          ))}
        </div>

        {/* EU Hosting Badge */}
        <div className="mt-16 flex justify-center">
          <div className="glass rounded-full px-8 py-4 border border-primary/30 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Hosted in the European Union</p>
              <p className="text-sm text-muted-foreground">Data sovereignty and regulatory compliance guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
