import { Button } from "@/components/ui/button";
import './Hero.css'; // Importing CSS for Hero component
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring,
  animate,
  AnimatePresence
} from "framer-motion";
import { 
  ArrowRight, 
  Code, 
  Rocket, 
  Zap, 
  Palette, 
  Camera, 
  Globe, 
  Star, 
  Shield, 
  Cpu, 
  Users, 
  Award, 
  Clock, 
  CheckCircle,
  Sparkles, // <-- Added for AI features
  X, // <-- Added for modal close
  Loader2, // <-- Added for loading spinner
  Lightbulb // <-- Added for idea spark
} from "lucide-react";
// import { Link } from "react-router-dom"; // Replaced with <a> for demo
import { useRef, useEffect, useState } from "react";
// import { TypeAnimation } from "react-type-animation"; // Removed this dependency

// --- NEW SVG Logo ---
// Replaced imported image with an inline SVG for portability
// ... (SilverWolfLogo component code remains unchanged) ...
const SilverWolfLogo = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="wolf-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--wolf-blue)" />
        <stop offset="100%" stopColor="var(--wolf-purple)" />
      </linearGradient>
    </defs>
    {/* Abstract Wolf Head */}
    <path 
      d="M50 10 L65 30 L60 50 L75 70 L60 90 L40 90 L25 70 L40 50 L35 30 Z" 
      fill="url(#wolf-grad)"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="2"
    />
    <path 
      d="M50 10 L65 30 L50 40 L35 30 Z"
      fill="white"
      fillOpacity="0.8"
    />
    <path 
      d="M50 40 L60 50 L50 60 L40 50 Z"
      fill="white"
      fillOpacity="0.6"
    />
  </svg>
);


// --- NEW CSS-based Typing Animation ---
// ... (TypingAnimation component code remains unchanged) ...
const TypingAnimation = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingPeriod = 150; // Speed of typing
  const deletePeriod = 100; // Speed of deleting
  const pausePeriod = 2000; // Pause at end of word

  const texts = [
    'WEB DEVELOPMENT AGENCY',
    'REACT & NODE.JS EXPERTS',
    'YOUR DIGITAL PARTNER',
    'CUSTOM WEB SOLUTIONS',
  ];

  useEffect(() => {
    let ticker: number;

    const handleTyping = () => {
      const i = loopNum % texts.length;
      const currentFullText = texts[i];
      
      let newText;
      if (isDeleting) {
        newText = currentFullText.substring(0, text.length - 1);
      } else {
        newText = currentFullText.substring(0, text.length + 1);
      }
      
      setText(newText);

      let delta = isDeleting ? deletePeriod : typingPeriod;

      if (!isDeleting && newText === currentFullText) {
        // Pause at end of word
        delta = pausePeriod;
        setIsDeleting(true);
      } else if (isDeleting && newText === '') {
        // Finished deleting
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        delta = 500; // Pause before new word
      }

      ticker = window.setTimeout(handleTyping, delta);
    };

    ticker = window.setTimeout(handleTyping, typingPeriod);

    return () => { window.clearTimeout(ticker); };
  }, [text, isDeleting, loopNum]); // Note: This dependency array is intentionally simplified for this effect

  return (
    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple relative">
      <span>{text}</span>
      {/* Blinking cursor */}
      {/* --- UPDATED: Use animate-blink for a more realistic cursor --- */}
      <span className="absolute right-[-10px] top-0 bottom-0 w-0.5 bg-wolf-blue animate-blink"></span>
    </h2>
  );
};


// --- ENHANCED AnimatedCounter ---
// ... (AnimatedCounter component code remains unchanged) ...
const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = countRef.current;
    if (!node) return;

    const controls = animate(0, end, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        setCount(Math.round(value));
      }
    });

    return () => controls.stop();
  }, [end, duration]);
  
  return <span ref={countRef}>{count}</span>;
};


// --- NEW TiltCard Component ---
// ... (TiltCard component code remains unchanged) ...
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-all duration-300 ${className}`}
    >
      {/* Inner element for perspective */}
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.article>
  );
};


// --- NEW Gemini AI Modal ---
// ... (GeminiModal component code remains unchanged) ...
const GeminiModal = ({ isOpen, onClose, content, isLoading }: {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  isLoading: boolean;
}) => {
  // Function to format text (basic markdown)
  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={index} className="font-bold text-wolf-blue">{line.slice(2, -2)}</strong>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={index} className="ml-4 list-disc">{line.slice(2)}</li>;
      }
      return <p key={index}>{line || <br />}</p>; // Render empty string as line break
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
              <Sparkles className="h-6 w-6 text-wolf-purple" />
              <h3 className="font-sans font-bold text-xl text-gradient">AI Powered Response</h3>
            </div>
            
            <div className="min-h-[150px] max-h-[60vh] overflow-y-auto pr-2">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[150px]">
                {/* <!-- From Uiverse.io by dexter-st -->  */}
<div className="loader-wrapper">
  <span className="loader-letter">G</span>
  <span className="loader-letter">e</span>
  <span className="loader-letter">n</span>
  <span className="loader-letter">e</span>
  <span className="loader-letter">r</span>
  <span className="loader-letter">a</span>
  <span className="loader-letter">t</span>
  <span className="loader-letter">i</span>
  <span className="loader-letter">n</span>
  <span className="loader-letter">g</span>

  <div className="loader"></div>
</div>

                  <p className="mt-4 text-muted-foreground text-sm">Generating ideas...</p>
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


// --- NEW Scrolling Marquee for SEO Keywords ---
const keywords1 = [
  "Professional web development", "React.js development", "Node.js backend", "MongoDB database",
  "Graphic design agency", "Logo design", "Social media graphics", "Video editing services"
];
const keywords2 = [
  "Creative design studio", "Digital marketing materials", "Business card design", "Template design",
  "AI project brainstorming", "Full-stack development", "TypeScript", "Startup web apps"
];

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
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <motion.div
        className="flex items-center justify-center md:justify-start [&>*]:mx-4"
        variants={marqueeVariants}
        animate="animate"
      >
        {keywords.map((text, i) => (
          <span key={i} className="text-xs text-muted-foreground/50 whitespace-nowrap">
            {text}
          </span>
        ))}
      </motion.div>
      {/* Duplicate for seamless loop */}
      <motion.div
        className="flex items-center justify-center md:justify-start [&>*]:mx-4"
        variants={marqueeVariants}
        animate="animate"
        aria-hidden="true"
      >
        {keywords.map((text, i) => (
          <span key={i} className="text-xs text-muted-foreground/50 whitespace-nowrap">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};


// --- ENHANCED Hero Component ---
const Hero = () => {
  const ref = useRef(null);
  // ... (useScroll and useTransform hooks remain unchanged) ...
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Scroll-based transforms for cubes (unchanged)
  const cube1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const cube1Rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const cube2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const cube2Rotate = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cube3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const cube3Rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const cube4Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const cube4Rotate = useTransform(scrollYProgress, [0, 1], [0, -90]);

  // --- NEW Mouse Follower Glow ---
  // ... (Mouse follower code remains unchanged) ...
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);


  // --- NEW State for Gemini API ---
  // ... (Gemini API state and functions remain unchanged) ...
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logoPrompt, setLogoPrompt] = useState("");

  // --- NEW Gemini API Call Function ---
  const callGeminiAPI = async (prompt: string, maxRetries = 3) => {
    setIsLoading(true);
    setIsModalOpen(true);
    setModalContent(""); // Clear previous content

    const apiKey = "AIzaSyB1tGB7vWJcfU1_GcqMyQBq6SDcaAJ94P0"; // API key is handled by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

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
          setModalContent("Sorry, I couldn't generate ideas right now. Please try again later.");
          setIsLoading(false);
        } else {
          // Wait before retrying
          await sleep(1000 * Math.pow(2, attempt));
        }
      }
    }
  };

  const handleLogoGeneration = () => {
    if (!logoPrompt.trim()) {
      setModalContent("Please enter an industry to generate logo ideas.");
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }
    const prompt = `Act as a creative director. Brainstorm 3 distinct logo concepts for a company in the '${logoPrompt}' industry. Describe each concept visually in one sentence (e.g., 'A minimalist wolf head silhouette formed from geometric lines'). Keep the response concise and use bullet points.`;
    callGeminiAPI(prompt);
  };

  const handleWebAppIdea = () => {
    const prompt = `Suggest one innovative web app idea for a startup. Provide a one-sentence pitch and 3 key features. Format as: **Pitch:** [Your pitch] \n\n **Features:** \n - Feature 1 \n - Feature 2 \n - Feature 3`;
    callGeminiAPI(prompt);
  };

  return (
    // --- UPDATED: Added 'isolate' for stacking context ---
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background isolate">
      {/* ... (Aurora Background, SEO, Glow, Gradients, and Cubes remain unchanged) ... */}
            {/* --- NEW Aurora Background --- */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-wolf-blue/30 rounded-full blur-[150px] opacity-30"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-wolf-purple/30 rounded-full blur-[120px] opacity-30"
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* SEO Structured Data (Unchanged) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Silver Wolf Technologies",
          "description": "Professional web development agency specializing in React.js, Node.js, and modern web applications",
          "url": "https://silverwolf.tech",
          // "logo": silverWolfLogo, // Use a full URL path in production
          "sameAs": [],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "service": [
            { "@type": "Service", "name": "Web Development", "description": "Custom web application development using React.js, Node.js, and TypeScript" },
            { "@type": "Service", "name": "Graphic Design", "description": "Professional logo design, branding, and visual identity creation" },
            { "@type": "Service", "name": "Video Editing", "description": "Professional video editing services for marketing and promotional content" }
          ]
        })}
      </script>

      {/* Meta description for SEO (Unchanged) */}
      <div className="sr-only">
        <h1>Silver Wolf Technologies - Premier Web Development Agency</h1>
        <p>Professional web development services specializing in React.js, Node.js, TypeScript, and MongoDB. We create ROI-driven web applications, stunning graphic designs, and professional video content for startups and enterprises worldwide.</p>
      </div>

      {/* --- NEW Mouse Follower Glow Element --- */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-40 md:opacity-100"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
          )
        }}
      />
      
      {/* Dynamic gradient background (Slightly simplified) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-wolf-blue/10" />

      {/* Scroll-triggered geometric elements (Enhanced styling) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 opacity-20"
          style={{ y: cube1Y, rotateY: cube1Rotate, transformStyle: "preserve-3d" }}
          // --- UPDATED: Added continuous rotation ---
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-wolf-blue/40 to-wolf-purple/30 rounded-lg shadow-2xl backdrop-blur-md border border-wolf-blue/20" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-16 w-20 h-20 opacity-25"
          style={{ y: cube2Y, rotateX: cube2Rotate, transformStyle: "preserve-3d" }}
          // --- UPDATED: Added continuous rotation ---
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-wolf-purple/35 to-wolf-green/25 rounded-lg shadow-xl backdrop-blur-md border border-wolf-purple/20" />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-16 h-16 opacity-30"
          style={{ y: cube3Y, rotateZ: cube3Rotate, transformStyle: "preserve-3d" }}
          // --- UPDATED: Added continuous rotation ---
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 4 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-wolf-green/30 to-wolf-blue/35 rounded-lg shadow-lg backdrop-blur-md border border-wolf-green/20" />
        </motion.div>
        
        {/* --- ADDED: 4th cube from original design --- */}
        <motion.div
          className="absolute top-2/3 right-1/3 w-12 h-12 opacity-35"
          style={{ y: cube4Y, rotateY: cube4Rotate, transformStyle: "preserve-3d" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
        >
          <div className="w-full h-full bg-gradient-to-br from-wolf-blue/45 to-wolf-purple/25 rounded-lg shadow-md backdrop-blur-sm border border-wolf-blue/25" />
        </motion.div>

        {/* Grid pattern overlay (Unchanged) */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>
      
      {/* Removed ParticleSystem */}


      <div className="container mx-auto px-4 relative z-10 pt-20">

        {/* ... (Left Column - Main Content remains unchanged) ... */}
        {/* Main Hero Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Main Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Logo positioned in left column */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {/* --- REPLACED img with SVG component --- */}
                <SilverWolfLogo className="w-full h-full filter drop-shadow-xl" />
              </motion.div>
              <div>
                {/* NOTE: Original component used 'font-orbitron'. Replace 'font-sans' if available. */}
                <h3 className="font-sans font-bold text-lg text-gradient">SILVER WOLF</h3>
                <p className="text-sm text-muted-foreground">Technologies</p>
              </div>
            </motion.div>

            <div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {/* --- REPLACED custom class with Tailwind classes --- */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">WEB DEVELOPMENT</span>
                <br />
                <span className="text-foreground">AGENCY</span>
              </motion.h1>

              <motion.div 
                className="text-xl md:text-2xl lg:text-3xl font-sans font-medium mt-4 mb-6 min-h-[3rem] md:min-h-[3.5rem] flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <TypingAnimation />
              </motion.div>

              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We design and build ROI‑driven web apps and websites for startups and enterprises. 
                Acquire customers, automate workflows, and scale with reliable, maintainable code.
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* --- REPLACED shadow-tech and Link --- */}
              <Button size="lg" className="group shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30">
                <a href="/portfolio" className="flex items-center">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-wolf-blue text-wolf-blue hover:bg-wolf-blue hover:text-white">
                <a href="/contact">HIRE US</a>
              </Button>
            </motion.div>
            
            {/* Tech highlights (Unchanged) */}
            <motion.div 
              className="flex flex-wrap gap-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* --- UPDATED: Added whileHover micro-interactions --- */}
              <motion.span 
                className="flex items-center gap-2 px-3 py-2 bg-wolf-blue/10 rounded-lg border border-wolf-blue/20 cursor-default"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <Rocket className="h-4 w-4 text-wolf-blue" />
                <span className="text-wolf-blue font-medium">Faster go‑to‑market</span>
              </motion.span>
              <motion.span 
                className="flex items-center gap-2 px-3 py-2 bg-wolf-purple/10 rounded-lg border border-wolf-purple/20 cursor-default"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <Zap className="h-4 w-4 text-wolf-purple" />
                <span className="text-wolf-purple font-medium">Conversion‑focused UI</span>
              </motion.span>
              <motion.span 
                className="flex items-center gap-2 px-3 py-2 bg-wolf-green/10 rounded-lg border border-wolf-green/20 cursor-default"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <Code className="h-4 w-4 text-wolf-green" />
                <span className="text-wolf-green font-medium">Secure, maintainable code</span>
              </motion.span>
            </motion.div>
          </motion.div>
          

          {/* --- BENTO GRID LAYOUT --- */}
          {/* Right Column - Services & Info Cards */}
          <motion.div
            className="grid grid-cols-4 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Web Development Card */}
            <motion.div 
              className="col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* ... (Web Development TiltCard remains unchanged) ... */}
              <TiltCard className="group relative p-6 bg-gradient-to-br from-background/80 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20 hover:border-wolf-blue/40 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-wolf-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-4">
                  <div className="relative p-4 bg-wolf-blue/10 rounded-xl group-hover:bg-wolf-blue/20 transition-colors duration-300">
                    <Globe className="h-8 w-8 text-wolf-blue group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-wolf-blue/20 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-xl mb-2 text-foreground group-hover:text-wolf-blue transition-colors duration-300">Web Development</h3>
                    <p className="text-sm text-muted-foreground mb-2">Full-stack development with modern technologies</p>
                    <div className="flex flex-wrap gap-1">
                      {["React.js", "Node.js", "TypeScript", "MongoDB"].map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-wolf-blue/10 text-wolf-blue rounded border border-wolf-blue/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Star className="h-5 w-5 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </TiltCard>
            </motion.div>

            {/* --- UPDATED: Graphic Design Card with AI Feature --- */}
            <motion.div 
              className="col-span-4 sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <TiltCard className="group relative p-6 bg-gradient-to-br from-background/80 to-wolf-purple/5 backdrop-blur-sm rounded-xl border border-wolf-purple/20 hover:border-wolf-purple/40 transition-all duration-500 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-wolf-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative p-4 bg-wolf-purple/10 rounded-xl group-hover:bg-wolf-purple/20 transition-colors duration-300">
                      <Palette className="h-8 w-8 text-wolf-purple group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-wolf-purple/20 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sans font-bold text-xl mb-1 text-foreground group-hover:text-wolf-purple transition-colors duration-300">Graphic Design</h3>
                      <p className="text-sm text-muted-foreground">Professional visual identity</p>
                    </div>
                  </div>
                  
                  {/* AI Feature Input */}
                  <div className="mt-auto space-y-2" style={{ transform: "translateZ(20px)" }}>
                    <p className="text-xs text-wolf-purple/90 font-medium flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" /> AI Logo Brainstorm
                    </p>
                    <input
                      type="text"
                      placeholder="Enter industry (e.g., 'Tech')"
                      className="w-full px-3 py-2 text-sm bg-background/50 border border-wolf-purple/30 rounded-md placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-wolf-purple/50"
                      value={logoPrompt}
                      onChange={(e) => setLogoPrompt(e.target.value)}
                      onClick={(e) => e.stopPropagation()} // Prevent card tilt
                      onFocus={(e) => e.stopPropagation()}
                    />
                    <Button
                      size="sm"
                      className="w-full bg-wolf-purple/20 text-wolf-purple border border-wolf-purple/30 hover:bg-wolf-purple/30"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card tilt
                        handleLogoGeneration();
                      }}
                      disabled={isLoading}
                    >
                      ✨ Get AI Logo Ideas
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Video Editing Card */}
            <motion.div 
              className="col-span-4 sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {/* ... (Video Editing TiltCard remains unchanged) ... */}
              <TiltCard className="group relative p-6 bg-gradient-to-br from-background/80 to-wolf-green/5 backdrop-blur-sm rounded-xl border border-wolf-green/20 hover:border-wolf-green/40 transition-all duration-500 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-wolf-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-4">
                  <div className="relative p-4 bg-wolf-green/10 rounded-xl group-hover:bg-wolf-green/20 transition-colors duration-300">
                    <Camera className="h-8 w-8 text-wolf-green group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-wolf-green/20 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-bold text-xl mb-2 text-foreground group-hover:text-wolf-green transition-colors duration-300">Video Editing</h3>
                    <p className="text-sm text-muted-foreground mb-2">Premium video production and editing</p>
                    <div className="flex flex-wrap gap-1">
                      {["Reels", "Intros", "Broadcasts"].map((type, i) => (
                        <span key={i} className="px-2 py-1 text-xs bg-wolf-green/10 text-wolf-green rounded border border-wolf-green/20">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* --- NEW: AI Idea Spark Card --- */}
            <motion.div 
              className="col-span-4 sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div 
                className="group p-6 bg-gradient-to-br from-background/90 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20 text-center hover:border-wolf-blue/40 transition-all duration-300 h-full flex flex-col justify-center items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative p-4 bg-wolf-blue/10 rounded-xl mb-4">
                  <Lightbulb className="h-8 w-8 text-wolf-blue" />
                  <div className="absolute inset-0 bg-wolf-blue/20 rounded-xl blur-lg opacity-50" />
                </div>
                <h3 className="font-sans font-bold text-xl mb-2 text-foreground">AI Idea Spark</h3>
                <p className="text-sm text-muted-foreground mb-4">Let AI suggest a new web app idea for you.</p>
                <Button
                  size="sm"
                  className="bg-wolf-blue/20 text-wolf-blue border border-wolf-blue/30 hover:bg-wolf-blue/30"
                  onClick={handleWebAppIdea}
                  disabled={isLoading}
                >
                  ✨ Suggest an Idea
                </Button>
              </motion.div>
            </motion.div>

            {/* --- UPDATED: Animated Metrics Counters in one Bento Box --- */}
            <motion.div 
              className="col-span-4 sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Metric 1 */}
                <motion.div 
                  className="group p-4 bg-gradient-to-br from-background/90 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20 text-center hover:border-wolf-blue/40 transition-all duration-300 h-full flex flex-col justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 text-wolf-blue mr-2" />
                    <span className="text-2xl font-sans font-bold text-wolf-blue">
                      <AnimatedCounter end={50} />+
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Projects Delivered</p>
                </motion.div>

                {/* Metric 2 */}
                <motion.div 
                  className="group p-4 bg-gradient-to-br from-background/90 to-wolf-purple/5 backdrop-blur-sm rounded-xl border border-wolf-purple/20 text-center hover:border-wolf-purple/40 transition-all duration-300 h-full flex flex-col justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-5 w-5 text-wolf-purple mr-2" />
                    <span className="text-2xl font-sans font-bold text-wolf-purple">
                      <AnimatedCounter end={100} />%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Client Satisfaction</p>
                </motion.div>
                
                {/* Metric 3 */}
                <motion.div 
                  className="group p-4 bg-gradient-to-br from-background/90 to-wolf-green/5 backdrop-blur-sm rounded-xl border border-wolf-green/20 text-center hover:border-wolf-green/40 transition-all duration-300 h-full flex flex-col justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-wolf-green mr-2" />
                    <span className="text-2xl font-sans font-bold text-wolf-green">
                      <AnimatedCounter end={3} />+
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Years Experience</p>
                </motion.div>

                {/* Metric 4 */}
                <motion.div 
                  className="group p-4 bg-gradient-to-br from-background/90 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20 text-center hover:border-wolf-blue/40 transition-all duration-300 h-full flex flex-col justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-5 w-5 text-wolf-blue mr-2" />
                    <span className="text-2xl font-sans font-bold text-wolf-blue">24/7</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Support Available</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Client Tags */}
            <motion.div
              className="col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              {/* ... (Who We Serve card remains unchanged) ... */}
              <motion.div
                className="p-6 bg-gradient-to-br from-background/80 to-wolf-blue/5 backdrop-blur-sm rounded-xl border border-wolf-blue/20"
              >
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-wolf-blue" />
                  Who We Serve:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Startups", "Enterprises", "Small Businesses", "Agencies", "Freelancers", "E-commerce"].map((client, index) => (
                    <span key={index} className="px-3 py-1 bg-wolf-blue/10 text-wolf-blue rounded-full text-xs font-medium border border-wolf-blue/20 hover:bg-wolf-blue/20 transition-colors duration-200">
                      {client}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- UPDATED: SEO Keywords Marquee --- */}
        <motion.div 
          className="mt-16 pb-20 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Marquee keywords={keywords1} direction="left" />
          <Marquee keywords={keywords2} direction="right" />
        </motion.div>
      </div>

      {/* --- UPDATED: Enhanced Scroll indicator --- */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="w-6 h-10 border-2 border-wolf-blue rounded-full flex justify-center pt-2">
          {/* Animated inner pill */}
          <motion.div 
            className="w-1 h-2 bg-wolf-blue rounded-full"
            animate={{ 
              y: [0, 16, 0],
              opacity: [1, 0, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

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

export default Hero;

