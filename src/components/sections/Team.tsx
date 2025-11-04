import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import React, { useState } from "react"; // Added React import and useState
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  User, 
  Code2, 
  Palette, 
  Video, 
  Briefcase,
  Sparkles, // NEW: Added icon
  MessageSquare, // NEW: Added icon
  Loader2, // NEW: Added icon
  X, // NEW: Added icon
  Send, // NEW: Added icon
  Linkedin, // NEW: Added icon
  Github, // NEW: Added icon
  Globe, // NEW: Added icon
  Building, // NEW: Added icon
  ArrowRight, // NEW: Added icon
  PlusCircle // NEW: Added icon
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// --- Social Icons Map ---
const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  globe: Globe,
};

// --- NEW: Master list for uniform icon display ---
const masterSocialLinks = ['github', 'linkedin', 'globe'];


// --- Team Member Card Component with Spotlight ---
const TeamMemberCard = ({ member, index, onStartChat }: { member: any, index: number, onStartChat: (member: any) => void }) => {
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
      key={member.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="h-full" // Added h-full for motion div
      onMouseMove={handleMouseMove} // Added mouse move handler
    >
      <Card className="bg-gradient-card border-border/50 hover:border-primary/30 transition-smooth h-full group overflow-hidden relative flex flex-col">
        {/* Card Background Effect (Spotlight) */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }} // Use the spotlight background
        />
        
        {/* Original gradient hover effect (can be combined) */}
        <div className="absolute inset-0 bg-gradient-to-br from-wolf-blue/5 via-transparent to-tech-purple/5 opacity-0 group-hover:opacity-100 transition-smooth" />
        
        <CardContent className="p-6 relative z-10 flex flex-col flex-grow">
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary/50 transition-smooth">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {/* --- UPDATED: Green dot alignment and animation --- */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-wolf-green rounded-full border-2 border-background animate-pulse" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-sans font-bold text-lg text-foreground group-hover:text-gradient transition-smooth">
                {member.name}
              </h3>
              {/* --- UPDATED: Flex container for role and new badge --- */}
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <Badge 
                  variant="outline" 
                  className="text-xs border-tech-purple/30 text-tech-purple bg-tech-purple/10"
                >
                  {member.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Briefcase className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{member.experience}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {member.description}
          </p>

          {/* Skills */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
              <Code2 className="h-3 w-3 mr-1" />
              Skills
            </h4>
            <div className="flex flex-wrap gap-1">
              {member.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-xs bg-wolf-blue/10 text-wolf-blue border-wolf-blue/20 hover:bg-wolf-blue/20 transition-smooth"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
              <Palette className="h-3 w-3 mr-1" />
              Specialties
            </h4>
            <div className="flex flex-wrap gap-1">
              {member.specialties.map((specialty) => (
                <Badge 
                  key={specialty} 
                  variant="outline" 
                  className="text-xs border-tech-purple/30 text-tech-purple hover:bg-tech-purple/10 transition-smooth"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* --- ENHANCED: Buttons pushed to bottom --- */}
          <div className="mt-auto space-y-3">
            
            {/* --- NEW: Social Icons (Circular, Glowing, Centered) --- */}
            <div className="flex justify-center gap-4 pt-2">
              {masterSocialLinks.map((key) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                // @ts-ignore
                const url = member.socials[key as keyof typeof member.socials];
                const isDisabled = !url || url === '#';

                return (
                  <Button 
                    key={key}
                    variant="ghost" // Use ghost variant
                    size="icon" 
                    className="group/btn rounded-full text-muted-foreground hover:text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:shadow-wolf-blue/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    onClick={() => !isDisabled && window.open(url as string, '_blank')}
                    disabled={isDisabled}
                    aria-label={`${member.name} ${key}`}
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover/btn:scale-110" />
                  </Button>
                );
              })}
            </div>
            
            {/* --- NEW: AI Chat Button --- */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full group/btn"
              onClick={() => onStartChat(member)}
            >
              <Sparkles className="h-4 w-4 mr-2 text-wolf-purple transition-transform group-hover/btn:scale-125" />
              ✨ Chat with {member.name.split(' ')[0]}
            </Button>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
};
// --- END: Team Member Card Component ---

// --- NEW: Join Team Card Component ---
const JoinTeamCard = ({ index, onOpenModal }: { index: number, onOpenModal: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }} // --- FIX: Simplified hover effect ---
      className="h-full"
    >
      <Card 
        className="bg-gradient-card border-border/50 h-full group overflow-hidden relative flex flex-col justify-center items-center text-center p-6"
        style={{ transition: "transform 0.3s ease" }}
      >
        {/* --- Animated Glowing Background --- */}
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3), transparent 70%)"
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* --- Spotlight Effect --- */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(300px circle at 50% 50%, rgba(168, 85, 247, 0.2), transparent 80%)"
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-4 bg-wolf-purple/20 rounded-full mb-4">
            <PlusCircle className="h-10 w-10 text-wolf-purple" />
          </div>
          <h3 className="font-sans font-bold text-xl text-foreground mb-2">
            Want to Join Us?
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            We're always looking for talented and passionate people.
          </p>
          <Button 
            className="w-full group shadow-lg shadow-wolf-purple/20 bg-gradient-to-r from-wolf-purple to-wolf-blue hover:shadow-xl hover:shadow-wolf-purple/30"
            onClick={onOpenModal}
          >
            See Our Openings
            {/* --- FIX: Corrected typo 'translatex-1' to 'translate-x-1' --- */}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
// --- END: Join Team Card Component ---


const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Divakar",
      role: "Creative Designer",
      status: "Associate Member", // --- ADDED ---
      experience: "3+ Years",
      avatar: "/lovable-uploads/3e894869-f929-465a-a9e3-b4d19a94be22.png",
      skills: ["Photoshop", "Illustrator", "Canva", "Premiere Pro", "After Effects", "Figma", "InDesign", "Lightroom", "XD",],
      specialties: ["Logo Design", "Social Media", "Video Editing", "Brochures"],
      description: "Expert in graphic design and video editing with premium quality output and fast turnaround.",
      socials: { 
        globe: "https://www.behance.net/divakardesigner01", // Using globe for Behance
        github: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Abhishek kumar",
      role: "Full Stack Developer",
      status: "Associate Member", // --- ADDED ---
      experience: "5+ Years",
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocJDMaXHQwxypUwdWQJxUXW4KHP_R_8_-4qL9gVW4EfmbUEvBZ3A=s96-c",
      skills: ["React", "Node.js", "TypeScript", "GraphQL", "AWS", "Docker", "Kubernetes", "CI/CD", "Microservices", "SQL",],
      specialties: ["Web Development", "API Design", "Cloud Integration", "Performance Optimization"],
      description: "Senior developer specializing in modern web technologies and scalable solutions.",
      socials: { 
        github: "#", 
        linkedin: "#" ,
        globe: "#"
      }
    },
    {
      id: 3,
      name: "Sharad Yadav",
      role: "Full Satck Developer",
      status: "Associate Member", // --- ADDED ---
      experience: "4+ Years",
      avatar: "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762188813/Screenshot_2025-11-03_at_10.17.39_PM_f4ycpx.png",
      skills: ["HTML", "CSS", "JavaScript", "React", "Figma", "Animation","Node.js", "Express", "MongoDB", "Git"],
      specialties: ["Web Development", "Responsive Design", "Prototyping", "Animation"],
      description: "Creative developer bridging design and code for exceptional user experiences.",
      socials: { 
        linkedin: "#", 
        globe: "#", // Using globe for Dribbble/Portfolio
        github: "#"
      }
    },
    // --- RE-ADDED 4th member ---
    {
      id: 4,
      name: "Aditya Raj",
      role: "AI/ML Engineer",
      status: "Associate Member", // --- ADDED ---
      experience: "2+ Years",
      avatar: "https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762190709/WhatsApp_Image_2025-11-03_at_22.53.49_y17ccx.jpg",
      skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis", "Model Deployment"],
      specialties: ["Machine Learning", "Data Science", "AI Solutions", "Predictive Modeling"],
      description: "Innovative AI/ML engineer developing intelligent solutions to complex problems.",
      socials: { 
        linkedin: "#", 
        github: "#",
        globe: "#"
      }
    }
  ];

  // --- NEW: Job Openings Data ---
  const jobOpenings = [
  {
      title: "Senior React Developer",
      location: "Remote",
      type: "Full-Time",
      description: "We are looking for a Senior React Developer to build and maintain high-quality web applications. You will be responsible for designing and implementing user-facing features using modern React practices."
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
      description: "Passionate about creating beautiful, intuitive interfaces? We're seeking a UI/UX Designer to join our creative team. You will work on everything from wireframes to final high-fidelity designs."
    },
    {
      title: "Backend (Node.js) Engineer",
      location: "Remote",
      type: "Full-Time",
      description: "Join our backend team to design, develop, and maintain our server-side logic, APIs, and database integrations. Experience with microservices and AWS is a plus."
    }
  ];

  // --- NEW: State for AI Chat Modal ---
  type ChatMessage = {
    role: 'user' | 'model';
    content: string;
  };
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- NEW: State for Openings Modal ---
  const [isOpeningModalOpen, setIsOpeningModalOpen] = useState(false);


  // --- NEW: Function to start chat ---
  const handleStartChat = (member: any) => {
    setSelectedMember(member);
    setChatHistory([]); // Clear previous chat
    setUserQuery("");
    setError("");
  };

  // --- NEW: Function to close modal ---
  const handleCloseModal = () => {
    setSelectedMember(null);
  };
  
  // --- NEW: Function to close Openings modal ---
  const handleCloseOpeningsModal = () => {
    setIsOpeningModalOpen(false);
  };

  // --- NEW: Function to handle sending a chat message ---
  const handleSendQuery = async () => {
    if (!userQuery.trim() || !selectedMember) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userQuery };
    const currentChatHistory = [...chatHistory, newUserMessage];
    
    setChatHistory(currentChatHistory);
    setUserQuery("");
    setIsLoading(true);
    setError("");

    const apiKey = "AIzaSyB1tGB7vWJcfU1_GcqMyQBq6SDcaAJ94P0"; // API Key will be injected
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = `
You are ${selectedMember.name}, a ${selectedMember.role} and ${selectedMember.status}, with ${selectedMember.experience} of experience.
Your skills include: ${selectedMember.skills.join(', ')}.
Your specialties are: ${selectedMember.specialties.join(', ')}.
Your personality is professional, friendly, and helpful.
A user is chatting with you on the company website. Answer their questions as this persona. 
Keep your answers concise and informative (2-3 sentences).
Do not break character. Do not say "As an AI...".
`;

    // Construct the payload with history
    const payloadContents = [
      ...currentChatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ];

    const payload = {
      contents: payloadContents,
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
          const newModelMessage: ChatMessage = { role: 'model', content: text };
          setChatHistory(prev => [...prev, newModelMessage]);
        } else {
          setError("Sorry, I couldn't generate a response. Please try again.");
        }
        
        setIsLoading(false);
        return; // Success

      } catch (err) {
        console.error("API call failed:", err);
        retries--;
        if (retries === 0) {
          setError("Failed to get a response after multiple attempts. Please try again later.");
          setIsLoading(false);
        } else {
          await new Promise(res => setTimeout(res, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
  };


  return (
    <section className="py-20 bg-background/95 relative overflow-hidden">
      {/* --- ENHANCED: Consistent Aurora Background --- */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wolf-blue/20 via-transparent to-transparent"
          animate={{ x: [-200, 0, -200], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wolf-purple/20 via-transparent to-transparent"
          animate={{ x: [200, 0, 200], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="flex items-center space-x-2"
              animate={{ 
                textShadow: [
                  "0 0 10px hsl(var(--wolf-blue) / 0.5)",
                  "0 0 20px hsl(var(--tech-purple) / 0.5)",
                  "0 0 10px hsl(var(--wolf-blue) / 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Code2 className="h-8 w-8 text-wolf-blue" />
              <span className="text-4xl font-mono text-gradient font-bold">
                &lt;Team /&gt;
              </span>
              <Palette className="h-8 w-8 text-tech-purple" />
            </motion.div>
          </div>
          
          {/* --- MODIFIED: Removed Button from header --- */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-gradient">
              Meet Our Expert Team
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Talented professionals combining <span className="text-wolf-blue font-semibold">cutting-edge development</span> with 
            <span className="text-tech-purple font-semibold"> creative design excellence</span> to deliver exceptional results.
          </p>
        </motion.div>

        {/* --- MODIFIED: Grid layout reverted to 3 cols --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              index={index} 
              onStartChat={handleStartChat} // Pass handler
            />
          ))}
          {/* --- NEW: Added Join Team Card to the grid --- */}
          <JoinTeamCard 
            index={teamMembers.length} 
            onOpenModal={() => setIsOpeningModalOpen(true)} 
          />
        </div>

        {/* Coding Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Projects Completed", value: "150+", icon: Code2 },
            { label: "Design Assets Created", value: "500+", icon: Palette },
            { label: "Video Projects", value: "80+", icon: Video },
            { label: "Happy Clients", value: "50+", icon: User }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 bg-gradient-card rounded-lg border border-border/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-sans font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* --- NEW: AI Chat Modal --- */}
      <AnimatePresence>
        {selectedMember && (
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
              className="relative w-full max-w-lg h-[70vh] flex flex-col p-6 rounded-xl border border-wolf-purple/20 shadow-2xl overflow-hidden"
              style={{ 
                background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.95), rgba(59, 130, 246, 0.1))",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-20"
                onClick={handleCloseModal}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center mb-4 pb-4 border-b border-wolf-blue/20">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
                    Chat with {selectedMember.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{selectedMember.role}</p>
                </div>
              </div>
              
              {/* Chat History */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
                {chatHistory.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                    <MessageSquare className="h-10 w-10 mb-2" />
                    <p className="text-sm">Ask {selectedMember.name.split(' ')[0]} anything about {selectedMember.specialties[0].toLowerCase()} or {selectedMember.skills[0]}!</p>

                  </div>
                )}
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-wolf-blue text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-muted">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-red-900/50 text-red-300">
                      {error}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form
                className="mt-auto flex space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
              >
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder={`Type your message...`}
                  className="flex-1 bg-background/50 border border-wolf-blue/30 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-wolf-blue"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30"
                  disabled={isLoading || !userQuery.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- NEW: Openings Modal --- */}
      <AnimatePresence>
        {isOpeningModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(8px)" }}
            onClick={handleCloseOpeningsModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl h-[80vh] flex flex-col p-6 rounded-xl border border-wolf-purple/20 shadow-2xl overflow-hidden"
              style={{ 
                background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.95), rgba(59, 130, 246, 0.1))",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-20"
                onClick={handleCloseOpeningsModal}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center mb-6 pb-4 border-b border-wolf-blue/20">
                <Building className="h-6 w-6 mr-3 text-wolf-purple" />
                <h3 className="text-2xl font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
                  Our Openings
                </h3>
              </div>
              
              {/* Job List */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                {jobOpenings.map((job, index) => (
                  <motion.div
                    key={index}
                    className="p-5 rounded-lg border border-wolf-blue/20 bg-background/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2">
                      <div className="mb-3 sm:mb-0">
                        <h4 className="text-lg font-semibold text-foreground">{job.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{job.location}</span>
                          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        className="group shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30 flex-shrink-0"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                  </motion.div>
                ))}
                
                {/* --- UPDATED: Empty state message --- */}
                {jobOpenings.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                    <Building className="h-10 w-10 mb-4" />
                    <h4 className="text-lg font-semibold">New Openings Coming Soon!</h4>
                   
                    <p className="text-sm">We're not actively hiring right now, but please check back soon as new positions open up.</p>
                   <img src={"https://res.cloudinary.com/abhisek-aur-backend/image/upload/v1762193693/original-4838b216be2e7554cbe245e3892004ca-removebg-preview_zbmmvp.png"} alt="Hiring Soon" width={500} /> </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Team;

