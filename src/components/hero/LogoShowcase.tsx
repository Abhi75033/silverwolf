import React, { useEffect, useRef, useState } from "react";
import { Camera, Code, Palette } from "lucide-react";

interface LogoShowcaseProps {
  videoSrc?: string;
  poster: string;
}

const LogoShowcase: React.FC<LogoShowcaseProps> = ({ videoSrc, poster }) => {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Try to play video when ready (for autoplay policies)
    if (videoRef.current && videoReady) {
      const play = async () => {
        try {
          await videoRef.current?.play();
        } catch {}
      };
      play();
    }
  }, [videoReady]);

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem]">
      {/* Outer rotating ring */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-conic from-wolf-blue/20 via-tech-purple/20 to-neon-green/20 blur-2xl opacity-70 animate-spin"
        style={{ animationDuration: "20s" }}
        aria-hidden
      />

      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-radial from-wolf-blue/20 to-transparent blur-xl" aria-hidden />

      {/* Main media container */}
      <div className="relative z-10 grid place-items-center rounded-full border border-primary/20 bg-background/60 shadow-card backdrop-blur-xl overflow-hidden w-full h-full group">
        {/* Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoReady(true)}
            poster={poster}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Fallback image while video loads or if not provided */}
        <img
          src={poster}
          alt="Company logo"
          className={`relative w-full h-full object-contain drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.03] ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Orbiting badges */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-2 left-8 animate-[spin_18s_linear_infinite]">
            <div className="-rotate-12 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs border border-wolf-blue/30 shadow-card">
              <Code className="h-4 w-4 text-wolf-blue" /> <span>React · Node</span>
            </div>
          </div>
          <div className="absolute bottom-6 -left-2 animate-[spin_22s_linear_infinite]">
            <div className="rotate-6 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs border border-tech-purple/30 shadow-card">
              <Palette className="h-4 w-4 text-tech-purple" /> <span>UI/UX · Brand</span>
            </div>
          </div>
          <div className="absolute -right-3 top-12 animate-[spin_26s_linear_infinite]">
            <div className="-rotate-3 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs border border-neon-green/30 shadow-card">
              <Camera className="h-4 w-4 text-neon-green" /> <span>Motion · Edit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
