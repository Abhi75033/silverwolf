import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import React, { useState } from "react"; // useState is already here, perfect
import { 
  Code2, 
  Smartphone, 
  Database, 
  Cloud, 
  Settings, 
  Zap,
  ArrowRight,
  Palette,
  Video,
  Camera,
  Check,
  Cpu,
  Sparkles,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom"; // --- FIX: Removed useNavigate import ---

// --- Scrolling Marquee Component (Unchanged) ---
const Marquee = ({ keywords, direction = "left" }: { keywords: string[]; direction?: "left" | "right" }) => {
  const marqueeVariants = {
    animate: {
      x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <motion.div
        className="flex items-center justify-center md:justify-start [&>*]:mx-4"
        variants={marqueeVariants}
        animate="animate"
      >
        {keywords.map((text, i) => (
          <span key={i} className="text-sm sm:text-base font-medium text-muted-foreground/50 whitespace-nowrap">
            {text}
          </span>
        ))}
      </motion.div>
      <motion.div
        className="flex items-center justify-center md:justify-start [&>*]:mx-4"
        variants={marqueeVariants}
        animate="animate"
        aria-hidden="true"
      >
        {keywords.map((text, i) => (
          <span key={i} className="text-sm sm:text-base font-medium text-muted-foreground/50 whitespace-nowrap">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// --- ENHANCED: Slide-up Panel Card Component ---
const ServiceCard = ({ service }: { service: any }) => {
  // --- NEW: Spotlight effect values ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // --- NEW: State to handle mobile taps ---
  const [isTapped, setIsTapped] = useState(false);

  // const navigate = useNavigate(); // --- FIX: Removed useNavigate hook ---

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      250px circle at ${mouseX}px ${mouseY}px,
      rgba(59, 130, 246, 0.15), 
      transparent 80%
    )
  `;
  // --- End of Spotlight effect values ---


  const cardVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -8 } // Card lift
  };

  const panelVariants = {
    rest: { y: "100%" }, // Hidden at the bottom
    hover: { y: "0%" }
  };

  return (
    <motion.div 
      className="relative h-[480px] rounded-xl border border-wolf-blue/20 shadow-lg overflow-hidden group" // Added 'group' for potential future use
      style={{ 
        background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.8), rgba(59, 130, 246, 0.05))",
        backdropFilter: "blur(0.5rem)"
      }}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      // --- FIX: Add animate and onTap props ---
      animate={isTapped ? "hover" : "rest"} // Force state based on tap
      onTap={() => setIsTapped(!isTapped)}   // Toggle state on tap
      // --- End of FIX ---
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove} // --- NEW: Added mouse move handler ---
    >
      {/* --- NEW: Spotlight Effect --- */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      {/* --- Visible Content --- */}
      <div className="p-6 h-full flex flex-col">
        <div className="relative w-12 h-12 p-3 bg-wolf-blue/10 rounded-xl flex items-center justify-center mb-4">
          <service.icon className="h-6 w-6 text-wolf-blue" />
        </div>
        <h3 className="text-xl font-sans font-semibold mb-2 text-foreground">
          {service.title}
        </h3>
        <p 
          className="text-muted-foreground text-sm mb-6"
        >
          {service.description}
        </p>
      </div>

      {/* --- Slide-Up Panel (on hover) --- */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-3/4 p-6 bg-background/90 backdrop-blur-md border-t border-wolf-purple/20 flex flex-col"
        variants={panelVariants} // This will now correctly inherit the "hover" state from the parent
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ 
          background: "linear-gradient(to bottom, rgba(12, 16, 22, 0.9), rgba(168, 85, 247, 0.1))"
        }}
        // --- FIX: Stop tap events on the panel from bubbling up and closing the card ---
        onTap={(e) => {
          e.stopPropagation(); // Prevent the tap from reaching the parent card's onTap
        }}
      >
        {/* Scrollable content area */}
        <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100% - 90px)' }}> {/* Reserve 90px for the footer */}
          <h4 className="text-sm font-semibold mb-3 text-wolf-blue">Technologies:</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {service.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs bg-wolf-blue/10 text-wolf-blue rounded-full border border-wolf-blue/20">
                {tech}
              </span>
            ))}
          </div>

          <h4 className="text-sm font-semibold mb-3 text-wolf-purple">Features:</h4>
          <div className="space-y-2">
            {service.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-wolf-green mr-2 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Panel Footer (Price + Button) */}
        <div className="mt-auto pt-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
              {service.price}
            </span>
            <span className="px-3 py-1 text-xs bg-wolf-green/10 text-wolf-green rounded-full border border-wolf-green/20">
              Custom Quote
            </span>
          </div>
          {/* --- FIX: Replaced useNavigate with <a> tag --- */}
          <Button asChild className="w-full group shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30">
            <a href="/contact">
              Get Quote
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};


const Services = () => {
  const services = [
        {
      icon: Code2,
      title: "Full Stack Development",
      description: "Complete web application development from frontend to backend, including database design and API integration.",
      technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Express"],
      features: ["Custom Development", "API Integration", "Database Design", "Authentication"],
      price: "From $2,000"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Modern, mobile-first responsive websites that look perfect on all devices and screen sizes.",
      technologies: ["Tailwind CSS", "Bootstrap", "Material-UI", "CSS3", "HTML5"],
      features: ["Mobile-First", "Cross-Browser", "Performance Optimized", "SEO Ready"],
      price: "From $800"
    },
    {
      icon: Database,
      title: "Database Solutions",
      description: "Database design, optimization, and management for scalable and efficient data storage solutions.",
      technologies: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Mongoose"],
      features: ["Schema Design", "Performance Tuning", "Data Migration", "Backup Solutions"],
      price: "From $600"
    },
    {
      icon: Cloud,
      title: "Deployment & Hosting",
      description: "Professional deployment and hosting solutions with continuous integration and monitoring.",
      technologies: ["Vercel", "Render", "cPanel", "GitHub Actions", "Docker"],
      features: ["CI/CD Pipeline", "SSL Certificates", "Domain Setup", "Performance Monitoring"],
      price: "From $300"
    },
    {
      icon: Settings,
      title: "Website Modification",
      description: "Enhancement and modification of existing websites with new features and improved functionality.",
      technologies: ["Any Framework", "Legacy Code", "Modern Migration", "Bug Fixes"],
      features: ["Feature Addition", "Bug Fixes", "Performance Boost", "Code Cleanup"],
      price: "From $400"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization, SEO improvements, and performance monitoring for maximum efficiency.",
      technologies: ["Lighthouse", "WebVitals", "CDN", "Caching", "Compression"],
      features: ["Speed Optimization", "SEO Enhancement", "Code Splitting", "Image Optimization"],
      price: "From $500"
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description: "Professional graphic design services including logos, brochures, business cards, and social media content.",
      technologies: ["Photoshop", "Illustrator", "Canva", "InDesign", "Figma"],
      features: ["Logo Design", "Brand Identity", "Print Design", "Social Media Graphics"],
      price: "From $200"
    },
    {
      icon: Video,
      title: "Video Editing",
      description: "Creative video editing and motion graphics for social media, promotional content, and broadcast.",
      technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Canva", "CapCut"],
      features: ["Video Editing", "Motion Graphics", "Reels & Shorts", "Intro/Outro Design"],
      price: "From $300"
    },
    {
      icon: Camera,
      title: "Creative Design",
      description: "Complete design solutions for weddings, events, and business marketing materials.",
      technologies: ["Photoshop", "Illustrator", "Canva", "InDesign", "CorelDraw"],
      features: ["Wedding Cards", "Visiting Cards", "Templates", "Event Design"],
      price: "From $150"
    }
  ];
  
  const skillsKeywords = [
    "Full Stack Development", "Creative Design", "Video Editing", "UI/UX", "AI Integration",
    "React.js", "Node.js", "Brand Strategy", "Motion Graphics", "E-commerce Solutions"
  ];
  const skillsKeywords2 = [
    "Responsive Design", "SEO Optimization", "Web Hosting", "cPanel", "Git & Github", 
    "Next.js", "Premiere Pro", "Photoshop", "Figma", "Canva"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  // --- NEW: State for Gemini Feature ---
  const [projectDescription, setProjectDescription] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");



  // --- NEW: Gemini API Call Function with Exponential Backoff ---
  const handleGenerateSuggestions = async () => {
    if (!projectDescription) {
      setError("Please describe your project idea first.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setAiSuggestions("");

    const apiKey = "AIzaSyB1tGB7vWJcfU1_GcqMyQBq6SDcaAJ94P0"; // API Key is an empty string
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = "You are a helpful sales assistant for a digital agency. Your goal is to analyze a client's project idea and suggest which of the agency's services are the best fit, in a concise and friendly bulleted list.";
    
    const userPrompt = `
A potential client has a project idea: "${projectDescription}".

Here is our list of services:
${services.map(s => `- ${s.title}: ${s.description}`).join('\n')}

Please suggest 3-4 key services or steps from our list that would be most relevant to their project. Format your response as a bulleted list. Do not add any introductory or concluding sentences, just the list.
    `;

    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          setAiSuggestions(text);
        } else {
          setError("Couldn't generate suggestions. The response was empty.");
        }
        
        setIsLoading(false);
        return; // Success, exit loop

      } catch (err) {
        console.error("API call failed:", err);
        retries--;
        if (retries === 0) {
          setError("Failed to generate suggestions after multiple attempts. Please try again later.");
          setIsLoading(false);
        } else {
          await new Promise(res => setTimeout(res, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
  };


  return (
    <section className="py-20 sm:py-28 bg-background/95 relative overflow-hidden">
      {/* --- Animated Aurora Background (Unchanged) --- */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wolf-blue/20 via-transparent to-transparent"
          animate={{ 
            x: [-200, 0, -200], 
            opacity: [0.3, 0.7, 0.3] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wolf-purple/20 via-transparent to-transparent"
          animate={{ 
            x: [200, 0, 200], 
            opacity: [0.3, 0.7, 0.3] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 10 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive web development and creative design services to bring your digital vision to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // --- FIX: Changed whileInNow to whileInView ---
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.title} 
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* --- ENHANCED CTA Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 sm:mt-24 p-6 sm:p-8 bg-gradient-to-br from-background/80 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20 shadow-lg relative overflow-hidden"
        >
          <Cpu className="absolute -top-8 -right-8 h-32 w-32 text-wolf-purple opacity-10" />

          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-sans font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Not sure where to start? Describe your project idea below, and our AI assistant will suggest the right services for you.
            </p>
            
            {/* --- NEW: Gemini Feature Form --- */}
            <div className="max-w-lg mx-auto">
              <textarea
                className="w-full p-3 rounded-lg border border-wolf-blue/30 bg-background/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-wolf-blue"
                rows={3}
                placeholder="e.g., 'I want to build a small e-commerce site for my bakery...'"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                disabled={isLoading}
              />
              <Button 
                size="lg" 
                className="mt-4 shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30 disabled:opacity-50"
                onClick={handleGenerateSuggestions}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                {isLoading ? "Generating..." : "✨ Get AI Suggestions"}
              </Button>

              {/* --- NEW: Display Area for Results --- */}
              {error && (
                <p className="mt-4 text-sm text-red-400">{error}</p>
              )}
              {aiSuggestions && (
                <div className="mt-6 p-4 text-left bg-background/50 rounded-lg border border-wolf-green/20">
                  <h4 className="font-semibold text-wolf-green mb-2">Here are our suggestions:</h4>
                  <div 
                    className="text-muted-foreground space-y-2"
                    dangerouslySetInnerHTML={{ 
                      __html: aiSuggestions
                        .replace(/•/g, '<span class="flex items-start"><span class="text-wolf-green mr-2 mt-1.5">•</span><span>')
                        .replace(/\n/g, '</span></span>') 
                    }} 
                  />
                </div>
              )}
            </div>
            
            {/* Original Button (optional, or remove) */}
           
          </div>
        </motion.div>

        {/* --- Dual Marquee (Unchanged) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 sm:mt-24 space-y-4"
        >
          <Marquee keywords={skillsKeywords} direction="left" />
          <Marquee keywords={skillsKeywords2} direction="right" />
        </motion.div>
      </div>
    </section>
  );
};

export default Services;



