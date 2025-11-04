import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import TechStack from "@/components/sections/TechStack";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main>
        <Hero />
        <TechStack />
        <Services />
        <Portfolio />
        <Team />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
