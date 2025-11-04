import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Code2, Send } from "lucide-react";
import React, { useState, useEffect } from "react";

const Footers = () => {
  const socialLinks = [
    { icon: Github, label: "GitHub", url: "#", color: "hover:text-foreground" },
    { icon: Linkedin, label: "LinkedIn", url: "#", color: "hover:text-wolf-blue" },
    { icon: Twitter, label: "Twitter", url: "#", color: "hover:text-wolf-blue" }
  ];

  const footerNav = [
    { label: "Services", url: "#services" },
    { label: "Portfolio", url: "#portfolio" },
    { label: "Team", url: "#team" },
    { label: "Contact", url: "#contact" }
  ];

  const taglines = ["Code.", "Create.", "Innovate."];
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <footer className="py-20 bg-background/95 relative overflow-hidden">
      
      {/* --- Content (must have relative z-10) --- */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* --- Brand & Animated Tagline --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Code2 className="h-8 w-8 text-wolf-blue mr-2" />
              <span className="text-2xl font-sans font-bold text-gradient">
                SilverWolf
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start h-8 text-lg text-muted-foreground font-mono">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTagline}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-wolf-blue to-wolf-purple font-semibold"
                >
                  {taglines[currentTagline]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* --- Navigation Links --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:mx-auto"
          >
            <h3 className="font-sans font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.url} 
                    className="text-sm text-muted-foreground hover:text-wolf-blue transition-colors group relative"
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-wolf-blue transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* --- Interactive Social Links --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:ml-auto"
          >
            <h3 className="font-sans font-semibold text-foreground mb-4">Connect</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Follow our journey and updates.
            </p>
            <div className="flex space-x-3 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-12 h-12 flex items-center justify-center rounded-xl bg-background/50 border border-wolf-blue/20 shadow-lg text-muted-foreground ${social.color} transition-all duration-300
                            hover:bg-background hover:shadow-wolf-blue/20 hover:border-wolf-blue/50
                            active:shadow-inner active:bg-background/20`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- Newsletter & Copyright --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-12 relative"
        >
          {/* --- NEW: Full-width Gradient Separator --- */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-wolf-blue/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Newsletter */}
            <div>
              <h4 className="font-sans font-semibold text-foreground mb-2">
                Stay Updated
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest insights on design and development.
              </p>
              <form className="flex space-x-2 max-w-sm">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-lg bg-background/50 border border-wolf-blue/20 focus:outline-none focus:ring-2 focus:ring-wolf-blue focus:border-transparent text-sm text-foreground"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-lg bg-gradient-to-r from-wolf-blue to-wolf-purple text-white shadow-lg shadow-wolf-blue/20 hover:shadow-xl hover:shadow-wolf-blue/30 transition-shadow"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center lg:text-right">
              &copy; {new Date().getFullYear()} SilverWolf. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footers;

