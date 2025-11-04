import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import { 
  Award, 
  Users, 
  Coffee, 
  Code, 
  Zap,
  Target,
  Heart,
  Lightbulb
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Code, value: "50+", label: "Projects Completed" },
    { icon: Users, value: "30+", label: "Happy Clients" },
    { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
    { icon: Award, value: "3+", label: "Years Experience" }
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "Every line of code is crafted with attention to detail and purpose."
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Building fast, efficient applications that deliver exceptional user experiences."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Genuine love for technology and solving complex problems through code."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Staying ahead with cutting-edge technologies and modern development practices."
    }
  ];

  const journey = [
    {
      year: "2021",
      title: "Started Journey",
      description: "Began freelancing with HTML, CSS, and JavaScript projects."
    },
    {
      year: "2022",
      title: "Full Stack",
      description: "Expanded to full-stack development with React and Node.js."
    },
    {
      year: "2023",
      title: "Silver Wolf",
      description: "Founded Silver Wolf Technologies, focusing on modern web solutions."
    },
    {
      year: "2024",
      title: "Scaling Up",
      description: "Building enterprise-level applications and expanding client base."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient">
                About Silver Wolf Technologies
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A passionate freelance developer dedicated to creating innovative web solutions 
                that help businesses thrive in the digital world.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {stats.map((stat, index) => (
                <Card key={stat.label} className="p-6 text-center bg-gradient-card border-border shadow-card">
                  <stat.icon className="h-8 w-8 text-wolf-blue mx-auto mb-3" />
                  <div className="text-2xl font-orbitron font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-orbitron font-bold mb-6">
                  The Story Behind the Wolf
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Silver Wolf Technologies was born from a passion for creating digital experiences 
                    that make a difference. As a freelance developer, I've always believed that great 
                    software should be both powerful and elegant.
                  </p>
                  <p>
                    The wolf represents strength, intelligence, and loyalty – values that drive 
                    every project I undertake. Whether it's a simple website or a complex web application, 
                    I approach each challenge with the same dedication and attention to detail.
                  </p>
                  <p>
                    My journey in web development started with curiosity and has evolved into a mission: 
                    to help businesses leverage technology to achieve their goals and connect with their audiences.
                  </p>
                </div>
                <Button className="mt-6 shadow-tech">
                  View My Work
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {values.map((value, index) => (
                  <Card key={value.title} className="p-4 bg-gradient-card border-border shadow-card hover:shadow-tech transition-smooth">
                    <value.icon className="h-6 w-6 text-wolf-blue mb-3" />
                    <h3 className="font-orbitron font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-orbitron font-bold mb-4 text-gradient">
                The Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                From first line of code to building enterprise solutions
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {journey.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center mb-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <Card className="p-6 bg-gradient-card border-border shadow-card">
                      <Badge className="mb-3 bg-wolf-blue text-primary-foreground">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-orbitron font-semibold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </Card>
                  </div>
                  
                  <div className="w-4 h-4 bg-wolf-blue rounded-full border-4 border-background shadow-glow" />
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-orbitron font-bold mb-4 text-gradient">
                Technical Expertise
              </h2>
              <p className="text-lg text-muted-foreground">
                Constantly learning and adapting to new technologies
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full bg-gradient-card border-border shadow-card">
                  <h3 className="text-xl font-orbitron font-semibold mb-4 text-wolf-blue">
                    Frontend
                  </h3>
                  <div className="space-y-2">
                    {["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Material-UI", "Framer Motion"].map((skill) => (
                      <div key={skill} className="flex items-center">
                        <div className="w-2 h-2 bg-wolf-blue rounded-full mr-3" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 h-full bg-gradient-card border-border shadow-card">
                  <h3 className="text-xl font-orbitron font-semibold mb-4 text-wolf-purple">
                    Backend
                  </h3>
                  <div className="space-y-2">
                    {["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "Authentication"].map((skill) => (
                      <div key={skill} className="flex items-center">
                        <div className="w-2 h-2 bg-wolf-purple rounded-full mr-3" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 h-full bg-gradient-card border-border shadow-card">
                  <h3 className="text-xl font-orbitron font-semibold mb-4 text-wolf-green">
                    Tools & Deployment
                  </h3>
                  <div className="space-y-2">
                    {["Git & GitHub", "Vercel", "Render", "cPanel", "Docker", "CI/CD"].map((skill) => (
                      <div key={skill} className="flex items-center">
                        <div className="w-2 h-2 bg-wolf-green rounded-full mr-3" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;