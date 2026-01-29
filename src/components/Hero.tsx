import { Badge } from "@/components/ui/badge";
import { Shield, Database, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--cyan)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--violet)/0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet/5 rounded-full blur-3xl animate-pulse-slow delay-500" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container relative z-10 px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
            <Badge variant="glass" className="px-4 py-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald mr-2 animate-pulse" />
              Enterprise SaaS Platform
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
            <span className="text-foreground">Off the Map</span>
            <br />
            <span className="gradient-text">Platform Blueprint</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Multi-tenant SaaS architecture for learning analytics, 
            gameplay telemetry, and team insights — built for scale, 
            security, and compliance.
          </p>

          {/* Key highlights */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
            <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
              <Shield className="w-5 h-5 text-cyan" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
              <Database className="w-5 h-5 text-violet" />
              <span className="text-sm font-medium">EU Hosted</span>
            </div>
            <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
              <Users className="w-5 h-5 text-emerald" />
              <span className="text-sm font-medium">Multi-Tenant</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
