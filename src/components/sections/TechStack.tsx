import { motion, AnimatePresence } from "framer-motion";
import {
  Atom, // React
  Type, // TypeScript
  RectangleHorizontal, // Next.js
  Wind, // Tailwind
  Palette, // Material UI
  BringToFront, // Bootstrap
  Server, // Node.js
  ServerCog, // Express
 // MongoDB
  GitBranch, // Git
  Settings, // cPanel
  Rocket, // Render
  Triangle, // Vercel
  PenTool, // Photoshop
  Clapperboard, // Premiere Pro
  Sparkles, // Canva
  Film, // After Effects
  MonitorPlay, // Illustrator (using this as a stand-in)
  Figma, // Figma
  // --- NEW: Added for AI features ---
  Lightbulb,
  X,
  Loader2,
  Cpu,
  // --- NEW: Added for more stack options ---
  Bolt, // Vite
  RefreshCw, // Redux
  Move3d, // Framer Motion
  DatabaseZap, // Firebase
  Database, // PostgreSQL (re-use)
  Network, // REST APIs
  Container, // Docker
  Cloud, // AWS
  AppWindow, // Netlify
  SquarePen, // Adobe XD
  Box, // Spline
  // --- NEW: Added for Automation, Data, Testing ---
  Bot, // Automation / Selenium
  TestTube, // Jest
  CheckCheck, // Cypress
  LineChart, // Pandas
  Sigma, // NumPy
  Brain, // PyTorch
  BrainCircuit, // TensorFlow
} from "lucide-react";
import { useState } from "react"; // --- NEW: Added for state
import { Button } from "@/components/ui/button"; // --- NEW: Added for button

// --- Scrolling Marquee Component ---
// (Unchanged)
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


// --- NEW: Gemini AI Modal ---
const GeminiModal = ({ isOpen, onClose, content, isLoading }: {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  isLoading: boolean;
}) => {
  // Function to format text (basic markdown)
  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Bold: **text**
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={index} className="font-bold text-wolf-blue">{line.slice(2, -2)}</strong>;
      }
      // Headers: ### text
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
      }
      // Bullets: - text or * text
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={index} className="ml-4 list-disc">{line.slice(2)}</li>;
      }
      // Render empty string as line break
      return <p key={index}>{line || <br />}</p>; 
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-lg bg-background/90 border border-wolf-blue/30 rounded-xl shadow-2xl p-6"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-6 w-6 text-wolf-purple" />
              <h3 className="font-sans font-bold text-xl text-gradient">AI Stack Recommendation</h3>
            </div>
            
            <div className="min-h-[150px] max-h-[60vh] overflow-y-auto pr-2">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[150px]">
                  <Loader2 className="h-8 w-8 text-wolf-blue animate-spin-slow" />
                  <p className="mt-4 text-muted-foreground text-sm">Generating recommendation...</p>
                </div>
              ) : (
                <div className="space-y-2 text-muted-foreground prose prose-sm prose-invert">
                  {formatContent(content)}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- NEW Utility for exponential backoff ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- NEW: Gemini API Call Function ---
const callGeminiAPI = async (
  prompt: string, 
  setModalContent: (content: string) => void, 
  setIsLoading: (loading: boolean) => void,
  maxRetries = 3
) => {
  setIsLoading(true);
  setModalContent(""); // Clear previous content

  const apiKey = "AIzaSyB1tGB7vWJcfU1_GcqMyQBq6SDcaAJ94P0"; // API key is handled by the environment
  const apiUrl = `https://generativelen/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  for (let attempt = 0; attempt < maxRetries; attempt++) {
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
      const candidate = result.candidates?.[0];

      if (candidate && candidate.content?.parts?.[0]?.text) {
        const text = candidate.content.parts[0].text;
        setModalContent(text);
        setIsLoading(false);
        return; // Success
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      console.error(`Gemini API call attempt ${attempt + 1} failed:`, error);
      if (attempt === maxRetries - 1) {
        // Last attempt failed
        setModalContent("Sorry, I couldn't generate a recommendation right now. Please try again later.");
        setIsLoading(false);
      } else {
        // Wait before retrying
        await sleep(1000 * Math.pow(2, attempt));
      }
    }
  }
};


const TechStack = () => {
  // --- NEW: State for AI features ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projectPrompt, setProjectPrompt] = useState("");

  const technologies = [
    // (Unchanged)
    {
      category: "Frontend",
      techs: [
        { name: "React.js", icon: Atom, color: "text-wolf-blue" },
        { name: "TypeScript", icon: Type, color: "text-wolf-blue" },
        { name: "Next.js", icon: RectangleHorizontal, color: "text-foreground" },
        { name: "Tailwind CSS", icon: Wind, color: "text-wolf-blue" },
        { name: "Vite", icon: Bolt, color: "text-yellow-400" }, // Added
        { name: "Redux", icon: RefreshCw, color: "text-wolf-purple" }, // Added
        { name: "Framer Motion", icon: Move3d, color: "text-purple-400" }, // CORRECTED: Removed typo
        { name: "Material UI", icon: Palette, color: "text-wolf-purple" },
        { name: "Bootstrap", icon: BringToFront, color: "text-wolf-purple" },
      ]
    },
    // (Unchanged)
    {
      category: "Backend",
      techs: [
        { name: "Node.js", icon: Server, color: "text-wolf-green" },
        { name: "Express.js", icon: ServerCog, color: "text-foreground" },
        { name: "MongoDB", icon: Database, color: "text-wolf-green" },
        { name: "Firebase", icon: DatabaseZap, color: "text-yellow-500" }, // Added
        { name: "PostgreSQL", icon: Database, color: "text-blue-400" }, // Added - FIX: Corrected typo 'name:G:' to 'name:'
        { name: "REST APIs", icon: Network, color: "text-muted-foreground" }, // Added
        { name: "TypeScript", icon: Type, color: "text-wolf-blue" },
      ]
    },
    {
      category: "DevOps, Data & Testing", // MODIFIED: Renamed category
      techs: [
        // Deployment & Tools
        { name: "Git & GitHub", icon: GitBranch, color: "text-foreground" },
        { name: "Docker", icon: Container, color: "text-blue-500" },
        { name: "AWS", icon: Cloud, color: "text-orange-500" },
        { name: "Vercel", icon: Triangle, color: "text-foreground" },
        { name: "Netlify", icon: AppWindow, color: "text-cyan-400" },
        { name: "Render", icon: Rocket, color: "text-wolf-purple" },
        { name: "cPanel", icon: Settings, color: "text-muted-foreground" },
        // Testing
        { name: "Jest", icon: TestTube, color: "text-red-500" },
        { name: "Cypress", icon: CheckCheck, color: "text-green-500" },
        { name: "Selenium", icon: Bot, color: "text-green-600" },
        // Data Processing
        { name: "Pandas", icon: LineChart, color: "text-blue-400" },
        { name: "NumPy", icon: Sigma, color: "text-blue-500" },
        { name: "PyTorch", icon: Brain, color: "text-orange-400" },
        { name: "TensorFlow", icon: BrainCircuit, color: "text-orange-500" },
      ]
    },
    {
      category: "Design Tools",
      techs: [
        { name: "Figma", icon: Figma, color: "text-foreground" },
        { name: "Photoshop", icon: PenTool, color: "text-wolf-blue" },
        { name: "Illustrator", icon: MonitorPlay, color: "text-wolf-purple" },
        { name: "Adobe XD", icon: SquarePen, color: "text-pink-500" }, // Added
        { name: "Spline", icon: Box, color: "text-blue-400" }, // Added
        { name: "Canva", icon: Sparkles, color: "text-wolf-green" },
        { name: "Premiere Pro", icon: Clapperboard, color: "text-wolf-purple" },
        { name: "After Effects", icon: Film, color: "text-wolf-blue" },
      ]
    }
  ];

  // --- NEW: Handler for Stack Recommender ---
  const handleStackRecommendation = () => {
    if (!projectPrompt.trim()) {
      setModalContent("Please enter a project idea to get a recommendation.");
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }
    
    // Create a string of available technologies for the prompt
    const techList = technologies
      .map(cat => `\n### ${cat.category}\n${cat.techs.map(t => t.name).join(', ')}`)
      .join('');

    const prompt = `Act as a senior CTO for 'Silver Wolf Technologies'. A potential client wants to build: "${projectPrompt}". 

Recommend a technology stack for them. You MUST choose from our official list of technologies provided below.

For each of the 4 categories (Frontend, Backend, DevOps, Data & Testing, Design Tools), pick the most suitable technologies from the list and write a brief, 1-2 sentence justification for *why* it's the right choice for this specific project.

Format the response clearly with headers and bullet points.

---
**Our Technology Stack:**
${techList}
---
`;
    
    setIsModalOpen(true);
    callGeminiAPI(prompt, setModalContent, setIsLoading);
  };

  // (Animation variants... unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05 
      } 
    }
  };
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };
  
  // (Keywords... unchanged)
  const skillsKeywords = [
    "Full Stack Development", "Creative Design", "Video Editing", "UI/UX", "AI Integration",
    "React.js", "Node.js", "Brand Strategy", "Motion Graphics", "E-commerce Solutions"
  ];
  const skillsKeywords2 = [
    "Responsive Design", "SEO Optimization", "Web Hosting", "cPanel", "Git & Github", 
    "Next.js", "Premiere Pro", "Photoshop", "Figma", "Canva"
  ];


  return (
    <section className="py-20 sm:py-28 bg-background/95 relative overflow-hidden">
      {/* (Animated Background... unchanged) */}
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
        
        {/* --- NEW: AI Stack Recommender --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 sm:p-8 bg-gradient-to-br from-background/80 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20 shadow-lg relative overflow-hidden"
        >
          {/* --- NEW: Added background icon --- */}
          <Cpu className="absolute -top-8 -right-8 h-32 w-32 text-wolf-purple opacity-10" />

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative p-3 bg-wolf-blue/10 rounded-xl">
                <Lightbulb className="h-8 w-8 text-wolf-blue" />
                <div className="absolute inset-0 bg-wolf-blue/20 rounded-xl blur-lg opacity-50" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-sans font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
              ✨ AI Stack Recommender
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Have a project idea? Describe it below and let our AI recommend a full technology stack for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="e.g., 'A social media app for hikers'"
                className="w-full flex-1 px-4 py-3 text-sm bg-background/50 border border-wolf-blue/30 rounded-md placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-wolf-blue/50"
                value={projectPrompt}
                onChange={(e) => setProjectPrompt(e.target.value)}
              />
              <Button
                size="lg"
                className="shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30"
                onClick={handleStackRecommendation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin-slow" />
                ) : (
                  <span className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Generate Stack
                  </span>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* --- Original Tech Stack Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-20 sm:mt-24 mb-16" // Added margin-top
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bool mb-4 text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
            Our Technology Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge technologies for web development and creative design solutions
          </p>
        </motion.div>

        {/* --- MODIFIED: Changed to lg:grid-cols-3 for Bento Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((category) => {
            // --- NEW: Logic for Bento Grid & Background Icons ---
            const isFrontend = category.category === "Frontend";
            const isDesign = category.category === "Design Tools";
            
            const cardIcons = {
              Frontend: Atom,
              Backend: Server,
              "DevOps, Data & Testing": Cloud, // MODIFIED
              "Design Tools": Figma,
            };
            const cardIconColors = {
              Frontend: "text-wolf-blue",
              Backend: "text-wolf-green",
              "DevOps, Data & Testing": "text-orange-500", // MODIFIED
              "Design Tools": "text-pink-500",
            };
            const IconComponent = cardIcons[category.category];
            
            // --- DELETED: Removed duplicate declarations ---
            
            // --- NEW: Grid column logic ---
            const gridCols = isFrontend || isDesign ? 'md:grid-cols-3 sm:grid-cols-2' : 'sm:grid-cols-2';


            return (
              <motion.div 
                key={category.category} 
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                // --- MODIFIED: Added bento classes and overflow-hidden ---
                className={`p-6 h-full bg-gradient-to-br from-background/80 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20 shadow-lg hover:shadow-wolf-blue/20 transition-all duration-300 relative overflow-hidden ${
                  isFrontend || isDesign ? 'md:col-span-2' : ''
                }`}
              >
                {/* --- NEW: Added background icon --- */}
                {IconComponent && (
                  <IconComponent className={`absolute -top-4 -right-4 h-24 w-24 ${cardIconColors[category.category]} opacity-10`} />
                )}

                {/* --- MODIFIED: Added relative z-10 --- */}
                <div className="relative z-10">
                  <h3 className="text-xl font-sans font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
                    {category.category}
                  </h3>
                  {/* --- MODIFIED: Replaced flex-wrap with grid --- */}
                  <motion.div 
                    className={`grid grid-cols-1 ${gridCols} gap-3`}
                    variants={listVariants}
                  >
                    {category.techs.map((tech) => (
                      <motion.div
                        key={tech.name}
                        variants={listItemVariants}
                        whileHover={{ 
                          scale: 1.05, // Bouncier hover
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        // --- REFINED: Styling for "Grid Item" layout ---
                        className="group flex items-center space-x-3 p-3 rounded-lg bg-background/50 transition-colors duration-200 hover:bg-wolf-blue/10"
                      >
                        <tech.icon className={`w-5 h-5 ${tech.color} transition-colors duration-200`} strokeWidth={2} />
                        <span className={`font-medium text-base text-foreground transition-colors duration-200 group-hover:${tech.color}`}>
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* (Dual Marquee... unchanged) */}
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

      {/* --- NEW: Add the Modal component to the DOM --- */}
      <GeminiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
        isLoading={isLoading}
      />
    </section>
  );
};

export default TechStack;


