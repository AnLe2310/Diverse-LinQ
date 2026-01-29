import { Badge } from "@/components/ui/badge";

export const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/50">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
              <span className="text-background font-bold text-lg">O</span>
            </div>
            <div>
              <p className="font-semibold">Off the Map Platform</p>
              <p className="text-sm text-muted-foreground">by Diverselinq × &ranj</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="glass">Multi-Tenant SaaS</Badge>
            <Badge variant="glass">GDPR Compliant</Badge>
            <Badge variant="glass">EU Hosted</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Platform Blueprint v1.0 — Architecture Overview
          </p>
        </div>
      </div>
    </footer>
  );
};
