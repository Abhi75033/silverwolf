import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Sparkles, Loader2, X } from "lucide-react"; // Added new icons

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
      type: "Full Stack",
      status: "Deployed",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Payment Processing", "Admin Dashboard", "Real-time Updates"]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management tool with team features, time tracking, and progress analytics.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      type: "Web App",
      status: "In Development",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Team Collaboration", "Time Tracking", "Analytics Dashboard"]
    },
    // ... (other projects remain the same) ...
    {
      id: 3,
      title: "Restaurant Website",
      description: "Modern restaurant website with online reservations, menu management, and customer reviews system.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Express", "Material-UI", "Node.js"],
      type: "Client Project",
      status: "Deployed",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Online Reservations", "Menu Management", "Review System"]
    },
    {
      id: 4,
      title: "Portfolio CMS",
      description: "Content management system for creative professionals with image optimization and SEO features.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "Sanity", "Tailwind", "Vercel"],
      type: "CMS",
      status: "Deployed",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Image Optimization", "SEO Ready", "Easy Content Updates"]
    },
    {
      id: 5,
      title: "Learning Management System",
      description: "Educational platform with course creation, student tracking, and interactive learning modules.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "MongoDB", "Express", "Socket.io"],
      type: "Education",
      status: "Modified",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Course Creation", "Progress Tracking", "Interactive Modules"]
    },
    {
      id: 6,
      title: "Real Estate Platform",
      description: "Property listing website with advanced search, virtual tours, and agent management system.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
      type: "Enterprise",
      status: "Deployed",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Advanced Search", "Virtual Tours", "Agent Portal"]
    }
  ];

  // --- NEW: State for AI Modal ---
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [learningPath, setLearningPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Deployed": return "bg-wolf-green text-black";
      case "In Development": return "bg-wolf-blue text-white";
      case "Modified": return "bg-wolf-purple text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // --- NEW: Function to handle modal open and API call ---
  const handleShowLearningPath = async (project: any) => {
    setSelectedProject(project);
    setIsLoading(true);
    setError("");
    setLearningPath("");

    const apiKey = "AIzaSyB1tGB7vWJcfU1_GcqMyQBq6SDcaAJ94P0"; // Leave this empty string
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = "You are an expert senior developer and mentor. Your goal is to provide a high-level, step-by-step learning path for a junior developer who wants to build a specific project. Focus on the key concepts and technologies.";
    
    const userPrompt = `
Project Title: "${project.title}"
Project Description: "${project.description}"
Technologies Used: ${project.technologies.join(', ')}

Please provide a concise, step-by-step learning path (5-7 steps) for a junior developer to learn how to build this project. Format your response as a numbered list. Do not add any introductory or concluding sentences, just the list.
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
          setLearningPath(text);
        } else {
          setError("Couldn't generate a learning path. The response was empty.");
        }
        
        setIsLoading(false);
        return; // Success

      } catch (err) {
        console.error("API call failed:", err);
        retries--;
        if (retries === 0) {
          setError("Failed to generate path after multiple attempts. Please try again later.");
          setIsLoading(false);
        } else {
          await new Promise(res => setTimeout(res, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
  };

  // --- NEW: Function to close the modal ---
  const handleCloseModal = () => {
    setSelectedProject(null);
    setLearningPath("");
    setIsLoading(false);
    setError("");
  };

  // --- NEW: Project Card Component with Spotlight ---
  const ProjectCard = ({ project, onShowLearningPath }: { project: any, onShowLearningPath: (project: any) => void }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const background = useMotionTemplate`
      radial-gradient(
        300px circle at ${mouseX}px ${mouseY}px,
        rgba(59, 130, 246, 0.15), 
        transparent 80%
      )
    `;

    return (
      <motion.div
        variants={itemVariants}
        className="group relative h-full rounded-xl border border-wolf-blue/20 shadow-lg overflow-hidden"
        style={{ 
          background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.8), rgba(59, 130, 246, 0.05))",
          backdropFilter: "blur(0.5rem)"
        }}
        onMouseMove={handleMouseMove}
      >
        {/* --- Spotlight Effect --- */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />

        <div className="flex flex-col h-full">
          <div className="relative overflow-hidden">
            {/* --- Image is now a link --- */}
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </a>
            <Badge className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}>
              {project.status}
            </Badge>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-sans font-semibold">{project.title}</h3>
              <Badge variant="outline" className="text-xs flex-shrink-0">
                {project.type}
              </Badge>
            </div>

            <p className="text-muted-foreground mb-4 text-sm">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs bg-wolf-blue/10 text-wolf-blue border border-wolf-blue/20">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="space-y-1 mb-4">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-muted-foreground">
                  {/* --- Consistent bullet style --- */}
                  <span className="w-1 h-1 bg-wolf-green rounded-full mr-2 flex-shrink-0"></span>
                  {feature}
                </div>
              ))}
            </div>

            {/* --- Consistent CTA buttons at the bottom --- */}
            <div className="mt-auto pt-4">
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 group/button shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Site
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="group/button" asChild>
                   <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              {/* --- NEW: AI Feature Button --- */}
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full mt-2 group/button"
                onClick={() => onShowLearningPath(project)}
              >
                <Sparkles className="h-4 w-4 mr-2 text-wolf-purple transition-transform group-hover/button:scale-125" />
                ✨ See Learning Path
              </Button>
            </div>
            
          </div>
        </div>
      </motion.div>
    );
  };
  // --- END: Project Card Component ---


  return (
    <section className="py-20 bg-background/95 relative overflow-hidden">
      {/* --- Animated Aurora Background --- */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <motion.div 
          className="absolute top-0 left-0 w-1
/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wolf-blue/20 via-transparent to-transparent"
          animate={{ x: [-200, 0, -200], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wolf-purple/20 via-transparent to-transparent"
          animate={{ x: [200, 0, 200], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
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
            Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing successful projects, from custom development to client modifications and deployments
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible" // --- FIX: Changed from whileInView="visible" ---
          viewport={{ once: true }} // This prop is fine to keep
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onShowLearningPath={handleShowLearningPath} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" className="shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30">
            View All Projects
          </Button>
        </motion.div>
      </div>

      {/* --- NEW: AI Learning Path Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl p-6 rounded-xl border border-wolf-purple/20 shadow-2xl overflow-hidden"
              style={{ 
                background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.95), rgba(59, 130, 246, 0.1))",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={handleCloseModal}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 mr-3 text-wolf-purple" />
                <h3 className="text-xl font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
                  Learning Path for: {selectedProject.title}
                </h3>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto pr-2">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center min-h-[200px] text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin text-wolf-blue mb-4" />
                    Generating your learning path...
                  </div>
                )}
                {error && (
                  <div className="flex items-center justify-center min-h-[200px] text-red-400">
                    {error}
                  </div>
                )}
                {learningPath && (
                  <div 
                    className="text-muted-foreground space-y-3"
                    style={{ whiteSpace: "pre-line" }} // Renders newlines from the AI
                  >
                    {learningPath}
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;

