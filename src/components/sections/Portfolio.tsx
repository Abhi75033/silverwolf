import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Github, 
  Sparkles, 
  Loader2, 
  X, 
  GalleryHorizontal, // Added for gallery button
  ChevronLeft,       // Added for gallery nav
  ChevronRight,      // Added for gallery nav
  Rocket             // Added for new CTA card
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Tryme E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.",
      images: [ // Changed from 'image' to 'images'
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762273039/Screenshot_2025-11-04_at_9.43.33_PM_q4on4a.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762273147/Screenshot_2025-11-04_at_9.43.42_PM_tswr3b.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762273171/Screenshot_2025-11-04_at_9.43.49_PM_iqfjqk.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762273197/Screenshot_2025-11-04_at_9.44.00_PM_gnrnzt.png",
      

      ],
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind"],
      type: "Full Stack",
      status: "Deployed",
      liveUrl: "https://spoofy-frontend.vercel.app/",
      githubUrl: "#",
      features: ["Payment Processing", "Admin Dashboard", "Real-time Updates"]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management tool with team features, time tracking, and progress analytics.",
      images: [
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277173/Screenshot_2025-11-04_at_10.50.05_PM_dg3t4v.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277217/Screenshot_2025-11-04_at_10.50.09_PM_mmatoi.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277283/Screenshot_2025-11-04_at_10.50.14_PM_ffts7c.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277310/Screenshot_2025-11-04_at_10.50.19_PM_nhoe5w.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277351/Screenshot_2025-11-04_at_10.50.23_PM_c8whu5.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277866/Screenshot_2025-11-04_at_11.07.13_PM_aacq1o.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277397/Screenshot_2025-11-04_at_10.50.30_PM_pxqdeh.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277650/Screenshot_2025-11-04_at_10.50.43_PM_wirrm8.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762277720/Screenshot_2025-11-04_at_10.50.53_PM_fijyar.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278131/Screenshot_2025-11-04_at_11.11.22_PM_vertt4.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278181/Screenshot_2025-11-04_at_11.10.56_PM_bidyts.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278238/Screenshot_2025-11-04_at_11.10.37_PM_dcdwbt.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278264/Screenshot_2025-11-04_at_11.10.44_PM_apitsh.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278301/Screenshot_2025-11-04_at_11.10.24_PM_z4wu9m.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278348/Screenshot_2025-11-04_at_11.10.17_PM_x7a3ng.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278392/Screenshot_2025-11-04_at_11.10.07_PM_z8myam.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278437/Screenshot_2025-11-04_at_11.10.04_PM_y9exxa.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278480/Screenshot_2025-11-04_at_11.09.57_PM_rrobdz.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278524/Screenshot_2025-11-04_at_11.09.50_PM_pu6f4g.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278573/Screenshot_2025-11-04_at_11.09.47_PM_wgvzwy.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278605/Screenshot_2025-11-04_at_11.09.44_PM_d0ctb0.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278646/Screenshot_2025-11-04_at_11.09.38_PM_aoifl6.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278693/Screenshot_2025-11-04_at_11.09.14_PM_czoxcr.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278736/Screenshot_2025-11-04_at_11.09.22_PM_x4lusg.png",
        "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762278776/Screenshot_2025-11-04_at_11.09.36_PM_dlb1lw.png"
        
      ],
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      type: "Web App",
      status: "In Development",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Team Collaboration", "Time Tracking", "Analytics Dashboard"]
    },
    {
      id: 3,
      title: "Restaurant Website",
      description: "Modern restaurant website with online reservations, menu management, and customer reviews system.",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
      ],
      technologies: ["React", "Express", "Material-UI", "Node.js"],
      type: "Client Project",
      status: "Pending",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Online Reservations", "Menu Management", "Review System"]
    },
    {
      id: 4,
      title: "Portfolio CMS",
      description: "Content management system for creative professionals with image optimization and SEO features.",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80"
      ],
      technologies: ["Next.js", "Sanity", "Tailwind", "Vercel"],
      type: "CMS",
      status: "In Development",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Image Optimization", "SEO Ready", "Easy Content Updates"]
    },
    {
      id: 5,
      title: "Learning Management System",
      description: "Educational platform with course creation, student tracking, and interactive learning modules.",
      images: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
      ],
      technologies: ["React", "MongoDB", "Express", "Socket.io"],
      type: "Education",
      status: "In Development",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Course Creation", "Progress Tracking", "Interactive Modules"]
    },
    {
      id: 6,
      title: "Real Estate Platform",
      description: "Property listing website with advanced search, virtual tours, and agent management system.",
      images: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
      ], // Single image example
      technologies: ["Next.js", "TypeScript", "Prisma", "Tailwind"],
      type: "Enterprise",
      status: "In Development",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Advanced Search", "Virtual Tours", "Agent Portal"]
    }
  ];

  // --- State for AI Modal ---
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [learningPath, setLearningPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // --- NEW: State for Gallery Modal ---
  const [galleryProject, setGalleryProject] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);


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
      case "Modified":
      case "Pending": // Added "Pending" status here
        return "bg-wolf-purple text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // --- Function to handle AI modal open and API call ---
  const handleShowLearningPath = async (project: any) => {
    setSelectedProject(project);
    setIsLoading(true);
    setError("");
    setLearningPath("");

    const apiKey = ""; // API key is handled by the environment
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

  // --- Function to close the AI modal ---
  const handleCloseModal = () => {
    setSelectedProject(null);
    setLearningPath("");
    setIsLoading(false);
    setError("");
  };

  // --- NEW: Gallery Modal Functions ---
  const handleShowGallery = (project: any) => {
    setGalleryProject(project);
    setActiveImageIndex(0);
  };

  const handleCloseGallery = () => {
    setGalleryProject(null);
  };

  const handleNextImage = () => {
    if (!galleryProject) return;
    setActiveImageIndex((prev) => (prev + 1) % galleryProject.images.length);
  };

  const handlePrevImage = () => {
    if (!galleryProject) return;
    setActiveImageIndex((prev) => (prev - 1 + galleryProject.images.length) % galleryProject.images.length);
  };

  const handleThumbClick = (index: number) => {
    setActiveImageIndex(index);
  };


  // --- Project Card Component with Spotlight ---
  const ProjectCard = ({ project, onShowLearningPath, onShowGallery }: { project: any, onShowLearningPath: (project: any) => void, onShowGallery: (project: any) => void }) => {
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
            {/* --- Image is NO LONGER a link --- */}
            <img
              src={project.images[0]} // Use first image
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x600/0c1016/3b82f6?text=Image+Not+Found')}
            />
            <Badge className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}>
              {project.status}
            </Badge>
            {/* --- NEW: Gallery Button --- */}
            {project.images && project.images.length > 1 && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 left-4 h-8 w-8 bg-black/50 text-white hover:bg-black/75 backdrop-blur-sm"
                onClick={() => onShowGallery(project)}
                aria-label="View project gallery"
              >
                <GalleryHorizontal className="h-4 w-4" />
              </Button>
            )}
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
                
                {/* --- MODIFIED: Conditional Live Site Button --- */}
                {project.status === "Deployed" ? (
                  <Button size="sm" className="flex-1 group/button shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Site
                    </a>
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1" disabled>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Site
                  </Button>
                )}

                <Button size="sm" variant="outline" className="group/button" asChild>
                   <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              {/* --- AI Feature Button --- */}
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


  // --- NEW: CTA Card Component ---
  const CtaCard = () => {
    return (
      <motion.div
        variants={itemVariants}
        className="group relative h-full rounded-xl p-8 flex flex-col items-center justify-center text-center overflow-hidden border-2 border-dashed border-wolf-blue/30 transition-all duration-300 hover:border-wolf-blue hover:bg-wolf-blue/5"
      >
        <div className="absolute inset-0 -z-10 w-full h-full bg-gradient-to-b from-transparent via-wolf-blue/5 to-transparent" />
        
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Rocket className="h-12 w-12 text-wolf-purple mb-6" />
        </motion.div>
        
        <h3 className="text-2xl font-sans font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
          Turn Your Idea Into Reality
        </h3>
        
        <p className="text-muted-foreground mb-8">
         Build. Create. Launch — your vision starts here.
        </p>
        
        <Button onClick={()=>navigate('/contact')} size="lg" className="shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30">
          Let's Talk
        </Button>
      </motion.div>
    );
  };
  // --- END: CTA Card Component ---


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
            <ProjectCard 
              key={project.id} 
              project={project} 
              onShowLearningPath={handleShowLearningPath}
              onShowGallery={handleShowGallery} // Pass new prop
            />
          ))}
          {/* --- NEW: Added CTA Card to the grid --- */}
          <CtaCard />
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

      {/* --- AI Learning Path Modal --- */}
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


      {/* --- NEW: Gallery Modal --- */}
      <AnimatePresence>
        {galleryProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={handleCloseGallery} // Close on backdrop click
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl p-4 sm:p-6 rounded-xl border border-wolf-purple/20 shadow-2xl overflow-hidden"
              style={{ 
                background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.95), rgba(59, 130, 246, 0.1))",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-foreground"
                onClick={handleCloseGallery}
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </Button>
              
              <h3 className="text-xl font-sans font-semibold text-foreground mb-4">
                {galleryProject.title}
              </h3>

              {/* Main Image Viewer */}
              <div className="relative mb-4">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    src={galleryProject.images[activeImageIndex]}
                    alt={`Project image ${activeImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-auto max-h-[60vh] object-contain rounded-lg"
                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x600/0c1016/3b82f6?text=Image+Not+Found')}
                  />
                </AnimatePresence>

                {/* Prev Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/75"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                {/* Next Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/75"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex justify-center gap-2 overflow-x-auto p-2">
                {galleryProject.images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleThumbClick(index)}
                    className={`w-16 h-12 rounded-md overflow-hidden flex-shrink-0 transition-all duration-200
                      ${index === activeImageIndex ? 'ring-2 ring-wolf-blue ring-offset-2 ring-offset-background/95' : 'opacity-60 hover:opacity-100'}
                    `}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover" 
                      onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/0c1016/3b82f6?text=Error')}
                    />
                  </button>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Portfolio;


