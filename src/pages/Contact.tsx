import Navigation from "@/components/ui/navigation";
import Contact from "@/components/sections/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <main className="pt-16">
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;