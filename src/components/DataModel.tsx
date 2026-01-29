import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  User, 
  Users, 
  TicketCheck, 
  Gamepad2, 
  ClipboardList, 
  Activity, 
  FileBarChart, 
  ScrollText,
  Key,
  Link2
} from "lucide-react";

interface EntityCardProps {
  name: string;
  icon: React.ElementType;
  color: "cyan" | "violet" | "emerald" | "amber" | "rose";
  fields: { name: string; type: string; key?: "PK" | "FK" }[];
  relations?: string[];
}

const EntityCard = ({ name, icon: Icon, color, fields, relations }: EntityCardProps) => {
  const colorClasses = {
    cyan: "border-cyan/40 bg-cyan/5",
    violet: "border-violet/40 bg-violet/5",
    emerald: "border-emerald/40 bg-emerald/5",
    amber: "border-amber/40 bg-amber/5",
    rose: "border-rose/40 bg-rose/5",
  };

  const headerColorClasses = {
    cyan: "bg-cyan/20 border-cyan/30",
    violet: "bg-violet/20 border-violet/30",
    emerald: "bg-emerald/20 border-emerald/30",
    amber: "bg-amber/20 border-amber/30",
    rose: "bg-rose/20 border-rose/30",
  };

  const iconColorClasses = {
    cyan: "text-cyan",
    violet: "text-violet",
    emerald: "text-emerald",
    amber: "text-amber",
    rose: "text-rose",
  };

  return (
    <div className={`glass rounded-xl overflow-hidden border ${colorClasses[color]} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
      {/* Header */}
      <div className={`px-4 py-3 border-b ${headerColorClasses[color]} flex items-center gap-2`}>
        <Icon className={`w-5 h-5 ${iconColorClasses[color]}`} />
        <h4 className="font-semibold text-sm">{name}</h4>
      </div>
      
      {/* Fields */}
      <div className="p-4 space-y-1.5 font-mono text-xs">
        {fields.map((field, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {field.key === "PK" && <Key className="w-3 h-3 text-amber" />}
            {field.key === "FK" && <Link2 className="w-3 h-3 text-violet" />}
            {!field.key && <span className="w-3" />}
            <span className="text-foreground">{field.name}</span>
            <span className="text-muted-foreground ml-auto">{field.type}</span>
          </div>
        ))}
      </div>

      {/* Relations */}
      {relations && relations.length > 0 && (
        <div className="px-4 py-2 border-t border-border/50 bg-background/30">
          <p className="text-xs text-muted-foreground">
            → {relations.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export const DataModel = () => {
  const entities: EntityCardProps[] = [
    {
      name: "Tenant",
      icon: Building2,
      color: "cyan",
      fields: [
        { name: "tenant_id", type: "UUID", key: "PK" },
        { name: "name", type: "VARCHAR" },
        { name: "region", type: "ENUM" },
        { name: "db_partition_key", type: "VARCHAR" },
        { name: "status", type: "ENUM" },
        { name: "created_at", type: "TIMESTAMP" },
      ],
      relations: ["Users", "Teams", "LicenseAllocations"],
    },
    {
      name: "User",
      icon: User,
      color: "violet",
      fields: [
        { name: "user_id", type: "UUID", key: "PK" },
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "email", type: "VARCHAR" },
        { name: "role", type: "ENUM" },
        { name: "status", type: "ENUM" },
        { name: "last_login", type: "TIMESTAMP" },
      ],
      relations: ["Tenant", "LearnerProfile", "AuditLogs"],
    },
    {
      name: "LearnerProfile",
      icon: Users,
      color: "emerald",
      fields: [
        { name: "user_id", type: "UUID", key: "PK" },
        { name: "team_id", type: "UUID", key: "FK" },
        { name: "demographics", type: "JSONB" },
        { name: "consent_given", type: "BOOLEAN" },
      ],
      relations: ["User", "Team"],
    },
    {
      name: "Team",
      icon: Users,
      color: "amber",
      fields: [
        { name: "team_id", type: "UUID", key: "PK" },
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "name", type: "VARCHAR" },
        { name: "created_at", type: "TIMESTAMP" },
      ],
      relations: ["Tenant", "LearnerProfiles", "Reports"],
    },
    {
      name: "LicensePlan",
      icon: TicketCheck,
      color: "rose",
      fields: [
        { name: "plan_id", type: "UUID", key: "PK" },
        { name: "name", type: "VARCHAR" },
        { name: "rules", type: "JSONB" },
        { name: "expiry_policy", type: "INTERVAL" },
      ],
      relations: ["LicenseAllocations"],
    },
    {
      name: "LicenseAllocation",
      icon: TicketCheck,
      color: "cyan",
      fields: [
        { name: "allocation_id", type: "UUID", key: "PK" },
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "plan_id", type: "UUID", key: "FK" },
        { name: "quantity", type: "INTEGER" },
        { name: "valid_until", type: "TIMESTAMP" },
      ],
      relations: ["Tenant", "LicensePlan", "Assignments"],
    },
    {
      name: "LicenseAssignment",
      icon: TicketCheck,
      color: "violet",
      fields: [
        { name: "assignment_id", type: "UUID", key: "PK" },
        { name: "allocation_id", type: "UUID", key: "FK" },
        { name: "user_id", type: "UUID", key: "FK" },
        { name: "start_date", type: "TIMESTAMP" },
        { name: "end_date", type: "TIMESTAMP" },
        { name: "usage_count", type: "INTEGER" },
      ],
      relations: ["LicenseAllocation", "User"],
    },
    {
      name: "Game",
      icon: Gamepad2,
      color: "emerald",
      fields: [
        { name: "game_id", type: "UUID", key: "PK" },
        { name: "name", type: "VARCHAR" },
        { name: "version", type: "VARCHAR" },
        { name: "telemetry_schema", type: "JSONB" },
      ],
      relations: ["GameEnablements"],
    },
    {
      name: "GameEnablement",
      icon: Gamepad2,
      color: "amber",
      fields: [
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "game_id", type: "UUID", key: "FK" },
        { name: "active", type: "BOOLEAN" },
        { name: "schedule_window", type: "TSRANGE" },
      ],
      relations: ["Tenant", "Game"],
    },
    {
      name: "SurveyTemplate",
      icon: ClipboardList,
      color: "rose",
      fields: [
        { name: "template_id", type: "UUID", key: "PK" },
        { name: "type", type: "ENUM" },
        { name: "questions_ref", type: "JSONB" },
        { name: "version", type: "INTEGER" },
      ],
      relations: ["SurveyResponses"],
    },
    {
      name: "SurveyResponse",
      icon: ClipboardList,
      color: "cyan",
      fields: [
        { name: "response_id", type: "UUID", key: "PK" },
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "user_id", type: "UUID", key: "FK" },
        { name: "template_id", type: "UUID", key: "FK" },
        { name: "answers", type: "JSONB" },
        { name: "submitted_at", type: "TIMESTAMP" },
      ],
      relations: ["Tenant", "User", "SurveyTemplate"],
    },
    {
      name: "GameplayEvent",
      icon: Activity,
      color: "violet",
      fields: [
        { name: "event_id", type: "UUID", key: "PK" },
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "user_id", type: "UUID", key: "FK" },
        { name: "game_id", type: "UUID", key: "FK" },
        { name: "event_type", type: "VARCHAR" },
        { name: "payload", type: "JSONB" },
        { name: "timestamp", type: "TIMESTAMP" },
      ],
      relations: ["Tenant", "User", "Game"],
    },
    {
      name: "Report",
      icon: FileBarChart,
      color: "emerald",
      fields: [
        { name: "report_id", type: "UUID", key: "PK" },
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "team_id", type: "UUID", key: "FK" },
        { name: "period", type: "TSRANGE" },
        { name: "status", type: "ENUM" },
        { name: "export_uri", type: "VARCHAR" },
      ],
      relations: ["Tenant", "Team"],
    },
    {
      name: "AuditLog",
      icon: ScrollText,
      color: "amber",
      fields: [
        { name: "log_id", type: "UUID", key: "PK" },
        { name: "tenant_id", type: "UUID", key: "FK" },
        { name: "actor_user_id", type: "UUID", key: "FK" },
        { name: "action", type: "VARCHAR" },
        { name: "resource", type: "VARCHAR" },
        { name: "ip_address", type: "INET" },
        { name: "timestamp", type: "TIMESTAMP" },
      ],
      relations: ["Tenant", "User"],
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden" id="datamodel">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--emerald)/0.08),transparent_60%)]" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <Badge variant="emerald" className="mb-4">Data Model</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Core <span className="gradient-text">Entity Model</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ERD-style overview of all platform entities, their key fields, 
            and relationships — designed for tenant isolation and compliance.
          </p>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mb-12 text-sm">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber" />
            <span className="text-muted-foreground">Primary Key</span>
          </div>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-violet" />
            <span className="text-muted-foreground">Foreign Key</span>
          </div>
        </div>

        {/* Entity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {entities.map((entity, idx) => (
            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <EntityCard {...entity} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
