import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have this button component

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50" />
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div 
          className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" 
          style={{
            backgroundImage: "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* --- Floating Abstract Shapes (Outside the isometric container) --- */}
      {/* Sphere */}
      <motion.div
        className="absolute top-[20%] right-[30%] w-6 h-6 bg-white rounded-full shadow-lg z-20"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, -15, 0] }}
        transition={{ 
          opacity: { duration: 1, delay: 1 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
      />
      
      {/* Triangle */}
      <motion.div
        className="absolute bottom-[25%] left-[30%] w-0 h-0 z-20"
        style={{
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid #fb923c', // orange-400
        }}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0], rotate: [0, -15, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.2 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
        }}
      />

      {/* Main Isometric Container */}
      <motion.div
        className="relative w-[clamp(300px,90vw,900px)] h-[clamp(300px,60vh,550px)] transform rotate-x-[30deg] rotate-z-[-45deg] perspective-[1000px] flex items-center justify-center z-10"
        initial={{ opacity: 0, y: 100, rotateX: 45, rotateZ: -60 }}
        animate={{ opacity: 1, y: 0, rotateX: 30, rotateZ: -45 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Base Platform */}
        <div className="absolute w-[90%] h-[90%] bg-purple-200 rounded-3xl shadow-xl transform skewY-[-20deg] rotate-x-[-10deg] [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]">
          {/* Top surface */}
          <div className="absolute inset-0 bg-purple-300 rounded-3xl transform skewY-[20deg] rotate-x-[10deg] [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]" />
          {/* Side (shadow) */}
          <div className="absolute inset-0 bg-purple-400 opacity-30 rounded-3xl transform translate-y-2 translate-x-1 z-[-1] [clip-path:polygon(10%_0%,100%_0%,90%_100%,0%_100%)]" />
          
          {/* Internal elements on the platform */}
          {/* Left Green Channel */}
          <div className="absolute left-[8%] top-[25%] w-12 h-24 bg-green-500 rounded-lg transform rotate-x-[30deg] skewY-[-20deg]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)' }}>
            <div className="absolute -inset-0.5 bg-green-600 opacity-30 transform translate-y-1 translate-x-0.5" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 0% 100%)' }} />
          </div>
          
          {/* Coffee Cup */}
          <motion.div 
            className="absolute left-[10%] top-[30%] w-6 h-12 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-x-[30deg] skewY-[-20deg] text-yellow-800 text-xs"
            animate={{ y: [0, -3, 0] }} // Bobbing animation
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ☕
          </motion.div>

          {/* Question Mark */}
          <motion.div
            className="absolute left-[25%] top-[5%] w-8 h-8 flex items-center justify-center text-3xl font-bold text-gray-700 transform rotate-x-[30deg] skewY-[-20deg]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: [0, -10, 10, -10, 0] }} // Wiggle
            transition={{ 
              opacity: { delay: 1, duration: 0.5 },
              rotate: { delay: 1.5, duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            ?
          </motion.div>

          {/* Buttons/Indicators */}
          <div className="absolute left-[18%] top-[20%] w-4 h-4 rounded-full bg-blue-400" />
          <div className="absolute left-[18%] top-[35%] w-3 h-3 rounded-full bg-pink-400" />
          <div className="absolute left-[18%] top-[50%] w-2 h-2 rounded-full bg-green-400" />

          {/* Page Not Found Sign */}
          <motion.div 
            className="absolute top-[40%] left-[30%] bg-white p-2 rounded-lg shadow-md text-center transform -rotate-z-6 translate-y-[-50px]"
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: -50, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <span className="block text-xl font-extrabold text-gray-800 uppercase tracking-widest leading-none">Page not</span>
            <span className="block text-xl font-extrabold text-gray-800 uppercase tracking-widest leading-none">FOUND</span>
          </motion.div>

          {/* 404 Card */}
          <motion.div 
            className="absolute top-[30%] left-[50%] w-40 h-28 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center p-2 transform rotate-z-6 translate-y-[-70px]"
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: -70, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <span className="text-5xl font-extrabold text-gray-900 leading-none">404</span>
            <span className="text-sm text-gray-600">Whooooops!</span>
            <div className="absolute top-1 right-2 w-2 h-2 bg-pink-500 rounded-full" />
          </motion.div>

          {/* Hand Cursor */}
          <motion.div
            className="absolute right-[20%] top-[15%] w-16 h-16 bg-pink-200 rounded-full flex items-end justify-center pb-2 text-3xl"
            style={{ borderRadius: '60% 60% 30% 30% / 100% 100% 0% 0%' }} // Simple hand shape approximation
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: [0, -10, 0] }} // Tapping animation
            transition={{ 
              opacity: { delay: 1, duration: 0.8 },
              y: { delay: 1, duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="w-4 h-8 bg-pink-300 rounded-t-full absolute top-[-5px] right-2 transform rotate-[-30deg]" /> {/* Finger */}
            <div className="w-4 h-8 bg-pink-300 rounded-t-full absolute top-[-10px] left-2 transform rotate-[30deg]" /> {/* Finger */}
          </motion.div>
          
          {/* Globe */}
          <motion.div 
            className="absolute right-[10%] bottom-[20%] w-20 h-20 rounded-full bg-blue-500 border-2 border-blue-700 flex items-center justify-center shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
          >
            {/* Spinning Landmass */}
            <motion.div 
              className="w-16 h-16 rounded-full bg-green-500 absolute" 
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* Spinning Dashed Border */}
            <div className="absolute inset-0 rounded-full border-4 border-white border-dashed animate-spin-slow" />
            <div className="absolute w-1 h-16 bg-white transform rotate-45" /> {/* Axis */}
            <div className="absolute w-1 h-16 bg-white transform -rotate-45" /> {/* Axis */}
          </motion.div>
        </div>
      </motion.div>

      {/* Text and Button below the illustration */}
      <motion.div
        className="text-center mt-8 relative z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Looks like you're lost!</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you were looking for doesn't exist.
        </p>
        <Button 
          asChild 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300 group"
        >
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go back home
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;

