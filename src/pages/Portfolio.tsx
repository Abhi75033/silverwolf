import Navigation from "@/components/ui/navigation";
import Portfolio from "@/components/sections/Portfolio";
import TechStack from "@/components/sections/TechStack";

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-16">
        <Portfolio />
        <TechStack />
      </main>
    </div>
  );
};

export default PortfolioPage;