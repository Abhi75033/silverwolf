import { motion, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import Footers from "./Footer"; // --- REMOVED This line
import React, { useState, useEffect } from "react"; // --- ADDED useEffect ---
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// --- NEW: Accordion Imports ---
import {
  Accordion, // --- ADDED ---
  AccordionContent, // --- ADDED ---
  AccordionItem, // --- ADDED ---
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Loader2,
  CalendarDays, // --- NEW: Icon for scheduling
  ArrowRight, // --- NEW: Icon for button
  X, // --- NEW: Added icon
  Database, // --- NEW: Added Footer icon
  Layers, // --- NEW: Added Footer icon
  LifeBuoy // --- NEW: Added Footer icon
} from "lucide-react";


// --- REUSABLE SPOTLIGHT CARD WRAPPER ---
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
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
    <div 
      className={`relative rounded-xl border border-wolf-blue/20 shadow-lg overflow-hidden ${className}`} // MODIFIED: Removed h-full
      style={{ 
        background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.8), rgba(59, 130, 246, 0.05))",
        backdropFilter: "blur(0.5rem)"
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
};

// --- NEW: Added Footer Component Code ---
const Footer = () => {
  // Animated Tagline logic
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Code.", "Create.", "Innovate."];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  // Animated Mesh Gradient logic
  const colors = [
    [59, 130, 246], // wolf-blue
    [168, 85, 247], // wolf-purple
    [22, 163, 74],  // wolf-green
    [59, 130, 246]  // wolf-blue
  ];
  
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % (colors.length - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [colors.length]);

  const [fromColor, toColor] = [
    `rgb(${colors[colorIndex].join(',')})`,
    `rgb(${colors[colorIndex + 1].join(',')})`
  ];
  
  const background = useMotionTemplate`linear-gradient(90deg, ${fromColor}, ${toColor})`;

  // Social links
  const socialLinks = [
    { icon: Github, label: "GitHub", url: "#", color: "hover:text-white" },
    { icon: Linkedin, label: "LinkedIn", url: "#", color: "hover:text-blue-400" },
    { icon: Twitter, label: "Twitter", url: "#", color: "hover:text-sky-400" }
  ];

  // Footer links
  const footerLinks = [
    { title: "Services", links: [{ name: "Web Development", url: "#" }, { name: "Creative Design", url: "#" }, { name: "AI Integration", url: "#" }] },
    { title: "Company", links: [{ name: "About Us", url: "#" }, { name: "Portfolio", url: "#" }, { name: "Team", url: "#" }] },
    { title: "Resources", links: [{ name: "Contact", url: "#" }, { name: "Blog", url: "#" }, { name: "FAQ", url: "#" }] }
  ];

  return (
    <motion.footer 
      className="relative py-20 bg-background/95 border-t border-wolf-blue/20 overflow-hidden"
      style={{ background: "#0C1016" }}
    >
      {/* --- Fluid Mesh Gradient Background --- */}
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: background,
            transition: "background 4s ease-in-out"
          }}
        />
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.3), transparent 40%)"
        }}
        animate={{
          x: ["0%", "5%", "0%"],
          y: ["0%", "-5%", "0%"]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-4 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-wolf-blue to-wolf-purple rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SilverWolf</span>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-lg text-muted-foreground">We</span>
              <div className="relative h-7 w-28">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[currentWord]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground/80 max-w-xs mb-6">
              Building the future of the web with cutting-edge design and development.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-background/50 border border-wolf-blue/20 flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color} hover:scale-110 hover:border-primary/50`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.url} 
                      className="text-muted-foreground/80 hover:text-white hover:underline underline-offset-4 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-wolf-blue/20 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} SilverWolf. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
// --- END: Footer Component Code ---


const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "", // --- ADDED ---
    projectType: "",
    message: ""
  });
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState("");

  // --- NEW: State for Booking Modal ---
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ name: "", date: "", timeSlot: "" });


  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@silverwolf.tech", color: "text-wolf-blue" },
    { icon: Phone, label: "Phone", value: "+91 63947 53801", color: "text-wolf-green" },
    { icon: MapPin, label: "Location", value: "Remote Worldwide", color: "text-wolf-purple" },
    { icon: Clock, label: "Response Time", value: "Within 24 hours", color: "text-wolf-silver" }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "#", color: "hover:text-foreground" },
    { icon: Linkedin, label: "LinkedIn", url: "#", color: "hover:text-wolf-blue" },
    { icon: Twitter, label: "Twitter", url: "#", color: "hover:text-wolf-blue" }
  ];

  const projectTypes = ["Web Development", "E-commerce", "Creative Design", "Video Editing", "Other"];

  // --- NEW: FAQ Data ---
  const faqData = [
    {
      question: "What is your typical project timeline?",
      answer: "A standard website typically takes 4-6 weeks from initial design to deployment. E-commerce platforms or complex web apps can take 8-12 weeks or more, depending on the scope and feature requirements."
    },
    {
      question: "How does your pricing model work?",
      answer: "We offer both fixed-price and hourly rate models. For well-defined projects like a standard website, we provide a fixed quote. For ongoing modifications, complex builds, or consultation, we work on an hourly basis. We'll discuss the best fit for you during our consultation."
    },
    {
      question: "What is your process for a new project?",
      answer: "Our process is collaborative: 1. **Discovery:** We hold a meeting to understand your goals and requirements. 2. **Design:** We create mockups and prototypes for your review. 3. **Development:** Our team builds the project with regular progress updates. 4. **Testing:** We conduct thorough testing for bugs and responsiveness. 5. **Deployment:** We launch your project and provide training."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in the MERN stack (MongoDB, Express, React, Node.js) and Next.js for high-performance web applications. For design, we are experts in Photoshop, Illustrator, Premiere Pro, and Figma."
    }
  ];

  // --- Form input change handler ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- NEW: Booking form change handler ---
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  // --- Project type selection handler ---
  const handleProjectTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, projectType: type })); // --- FIX: Changed [name]: value to projectType: type ---
  };

  // --- Form submission handler ---
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };
  
  // --- NEW: Booking submission handler ---
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingData);
    // Add booking submission logic here (e.g., send to API, then close modal)
    setIsBookingModalOpen(false);
  };

  // --- NEW: Close Booking Modal Handler ---
  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };


  // --- AI Message Draft handler ---
  const handleAIDraft = async () => {
    if (!formData.projectType) {
      setErrorAI("Please select a project type first.");
      return;
    }
    setIsLoadingAI(true);
    setErrorAI("");
    const apiKey = "AIzaSyB1tGB7vWJcfU1_GcqMyQBq6SDcaAJ94P0"; // API Key will be injected by the environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const systemPrompt = "You are a professional client looking to hire a web development and design agency. Your goal is to draft a concise, clear, and professional inquiry message based on a project type and an optional brief idea.";
    const userPrompt = `Project Type: "${formData.projectType}"\nMy brief idea (if any): "${formData.message}"\nPlease draft a concise (2-4 sentences) and professional inquiry message to a web agency about this project.\nIf my brief idea is empty, just write a general inquiry for that project type.\nDo not include a greeting or sign-off, just the message body.`;
    const payload = { contents: [{ parts: [{ text: userPrompt }] }], systemInstruction: { parts: [{ text: systemPrompt }] } };
    let retries = 3;
    let delay = 1000;
    while (retries > 0) {
      try {
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          setFormData(prev => ({ ...prev, message: text.trim() }));
        } else {
          setErrorAI("Couldn't draft a message. Response was empty.");
        }
        setIsLoadingAI(false);
        return;
      } catch (err) {
        console.error("API call failed:", err);
        retries--;
        if (retries === 0) {
          setErrorAI("Failed to draft message. Please try again.");
          setIsLoadingAI(false);
        } else {
          await new Promise(res => setTimeout(res, delay));
          delay *= 2;
        }
      }
    }
  };


  return (
    <>
    <section className="py-20 bg-background/95 relative overflow-hidden">
      {/* --- Consistent Aurora Background --- */}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4 text-gradient">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your project to life? Get in touch and let's discuss how we can help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <SpotlightCard className="p-8 h-full"> {/* MODIFIED: Added h-full */}
              <h3 className="text-2xl font-sans font-semibold mb-6">
                Send a Message
              </h3>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                {/* ... Form fields (First Name, Last Name, Email) ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input name="firstName" placeholder="John" className="bg-background/50" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input name="lastName" placeholder="Doe" className="bg-background/50" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input type="text" name="phone" placeholder="+91 1800 1800 1800" className="bg-background/50" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input type="email" name="email" placeholder="john@example.com" className="bg-background/50" value={formData.email} onChange={handleInputChange} />
                </div>
                
                {/* ... Project Type Badges ... */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Type</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {projectTypes.map((type) => (
                      <Badge 
                        key={type} 
                        variant={formData.projectType === type ? "default" : "outline"}
                        className={`cursor-pointer transition-smooth ${
                          formData.projectType === type 
                            ? 'bg-wolf-blue text-white' 
                            : 'border-wolf-blue/30 text-wolf-blue hover:bg-wolf-blue/10'
                        }`}
                        onClick={() => handleProjectTypeSelect(type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* ... Message Textarea with AI Draft Button ... */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">Message</label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="group/button"
                      onClick={handleAIDraft}
                      disabled={isLoadingAI}
                    >
                      {isLoadingAI ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2 text-wolf-purple transition-transform group-hover/button:scale-125" />
                      )}
                      ✨ AI Draft
                    </Button>
                  </div>
                  {errorAI && <p className="text-xs text-red-400 mb-2">{errorAI}</p>}
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your project... or let AI help you draft a message!" 
                    className="min-h-[120px] bg-background/50"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                {/* ... Submit Button ... */}
                <Button 
                  type="submit"
                  className="w-full group shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30"
                >
                  <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Send Message
                </Button>
              </form>
            </SpotlightCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-sans font-semibold mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground mb-8">
                Whether you need a complete web application, website modifications, 
                or just have questions about your project, we're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <SpotlightCard className="p-4 h-full"> {/* MODIFIED: Added h-full */}
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted/50 ${info.color}`}>
                        <info.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {info.label}
                        </p>
                        <p className="font-medium">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            {/* ... Social Links ... */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank" // Added target="_blank"
                    rel="noopener noreferrer" // Added rel
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-3 rounded-lg border shadow-lg overflow-hidden ${social.color}`}
                  >
                    <SpotlightCard className="p-0"> {/* MODIFIED: No h-full needed */}
                      <social.icon className="h-5 w-5" />
                    </SpotlightCard>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ... Availability Status ... */}
            <div className="group">
              <SpotlightCard className="p-6 h-full"> {/* MODIFIED: Added h-full */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-wolf-green rounded-full animate-pulse"></div>
                  <span className="font-semibold text-wolf-green">Available for Projects</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects. Next available slot: 
                  <span className="text-foreground font-medium ml-1">
                    Next Week
                  </span>
                </p>
              </SpotlightCard>
            </div>
            
            {/* --- NEW: Schedule a Call Card --- */}
            <div className="group">
              <SpotlightCard className="p-6 text-center h-full"> {/* MODIFIED: Added h-full */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-wolf-blue/20 to-wolf-purple/20 text-wolf-blue">
                    <CalendarDays className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-sans font-semibold mb-2 text-foreground">
                  Skip the Form
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Book a free 15-minute consultation directly on our calendar.
                </p>
                <Button 
                  className="w-full group shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30"
                  onClick={() => setIsBookingModalOpen(true)} // --- MODIFIED: Opens modal ---
                >
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </SpotlightCard>
            </div>
            
          </motion.div>
        </div>

        {/* --- NEW: FAQ Section --- */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-sans font-bold text-center mb-4 text-gradient">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-12">
            Have questions? We've got answers. Here are some of the most common things clients ask us.
          </p>

          {/* --- MODIFIED: FAQ Design --- */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((faq, index) => (
                <SpotlightCard key={index} className="group"> {/* Use SpotlightCard as wrapper */}
                  <AccordionItem 
                    value={`item-${index}`}
                    className="border-none" // Remove default accordion border
                  >
                    <AccordionTrigger className="p-6 text-left font-sans font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </SpotlightCard>
              ))}
            </Accordion>
          </div>
          {/* --- END: MODIFIED FAQ Design --- */}

        </motion.div>

      </div>
   
    </section>

    {/* --- NEW: Booking Modal --- */}
    <AnimatePresence>
      {isBookingModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(8px)" }}
          onClick={handleCloseBookingModal}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-md flex flex-col p-6 rounded-xl border border-wolf-purple/20 shadow-2xl overflow-hidden"
            style={{ 
              background: "linear-gradient(to bottom right, rgba(12, 16, 22, 0.95), rgba(59, 130, 246, 0.1))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-20"
              onClick={handleCloseBookingModal}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center mb-6 pb-4 border-b border-wolf-blue/20">
              <CalendarDays className="h-6 w-6 mr-3 text-wolf-purple" />
              <h3 className="text-2xl font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r from-wolf-blue to-wolf-purple">
                Book a Consultation
              </h3>
            </div>
            
            <form className="flex-grow overflow-y-auto pr-2 space-y-4" onSubmit={handleBookingSubmit}>
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input 
                  name="name" 
                  placeholder="John Doe" 
                  className="bg-background/50" 
                  value={bookingData.name}
                  onChange={handleBookingChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">E-mail</label>
                <Input 
                type="email"
                  name="name" 
                  placeholder="jonedoe@xyz.com" 
                  className="bg-background/50" 
                  value={bookingData.name}
                  onChange={handleBookingChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Date</label>
                <Input 
                  type="date" 
                  name="date" 
                  className="bg-background/50" 
                  value={bookingData.date}
                  onChange={handleBookingChange}
                  min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Time Slot (IST)</label>
                <select
                  name="timeSlot"
                  className="w-full bg-background/50 border border-input rounded-md px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-wolf-blue focus:outline-none"
                  value={bookingData.timeSlot}
                  onChange={handleBookingChange}
                >
                  <option value="" disabled>Select a time...</option>
                  <option value="10:00 - 10:30">10:00 - 10:30 AM</option>
                  <option value="11:00 - 11:30">11:00 - 11:30 AM</option>
                  <option value="14:00 - 14:30">02:00 - 02:30 PM</option>
                  <option value="15:00 - 15:30">03:00 - 03:30 PM</option>
                  <option value="16:00 - 16:30">04:00 - 04:30 PM</option>
                </select>
              </div>
              
              <Button 
                type="submit"
                className="w-full group shadow-lg shadow-wolf-blue/20 bg-gradient-to-r from-wolf-blue to-wolf-purple hover:shadow-xl hover:shadow-wolf-blue/30"
              >
                Request Meeting
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    <Footers/>
    </>
  );
};

export default Contact;

