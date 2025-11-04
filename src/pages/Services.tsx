import Navigation from "@/components/ui/navigation";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-16">
        <Services />
        <Contact />
      </main>
    </div>
  );
};

export default ServicesPage;