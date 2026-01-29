import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: "cyan" | "violet" | "emerald" | "amber" | "rose";
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  iconColor = "cyan"
}: StatCardProps) => {
  const iconColorClasses = {
    cyan: "text-cyan bg-cyan/20",
    violet: "text-violet bg-violet/20",
    emerald: "text-emerald bg-emerald/20",
    amber: "text-amber bg-amber/20",
    rose: "text-rose bg-rose/20",
  };

  const changeClasses = {
    positive: "text-emerald",
    negative: "text-rose",
    neutral: "text-muted-foreground",
  };

  return (
    <div className="glass rounded-xl p-6 border border-border/50 hover:border-border transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className={cn("text-sm mt-2", changeClasses[changeType])}>
              {change}
            </p>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconColorClasses[iconColor])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
