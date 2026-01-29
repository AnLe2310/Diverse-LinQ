import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { DataFlow } from "@/components/DataFlow";
import { DataModel } from "@/components/DataModel";
import { Compliance } from "@/components/Compliance";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ArchitectureDiagram />
      <DataFlow />
      <DataModel />
      <Compliance />
      <Footer />
    </div>
  );
};

export default Index;
