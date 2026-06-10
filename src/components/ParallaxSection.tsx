import { useRef, ReactNode, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  id?: string;
  className?: string;
  backgroundImage: string;
  mobileBackgroundImage?: string;
  overlayOpacity?: string; // e.g., 'opacity-90' or 'bg-opacity-80'
  overlayColor?: string; // e.g., 'bg-navy-dark'
  midgroundIcon?: "lady-justice" | "scales" | "emblem" | null;
  midgroundAlign?: "left" | "right" | "center";
  midgroundSpeedMultiplier?: number;
  heightClass?: string; // e.g., 'min-h-[100vh]' or 'py-24'
  showScrollIndicator?: boolean;
  children: ReactNode;
}

export default function ParallaxSection({
  id,
  className = "",
  backgroundImage,
  mobileBackgroundImage,
  overlayOpacity = "opacity-75",
  overlayColor = "bg-black",
  midgroundIcon = null,
  midgroundAlign = "right",
  midgroundSpeedMultiplier = -150,
  heightClass = "min-h-screen",
  showScrollIndicator = false,
  children,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track the scroll state of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background shifts significantly on both mobile and desktop (speed increased on mobile per user request)
  const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["-20%", "20%"] : ["-30%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], isMobile ? [1.12, 1.25] : [1.08, 1.3]);

  const activeBg = (isMobile && mobileBackgroundImage) ? mobileBackgroundImage : backgroundImage;

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative w-full ${heightClass} overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* 1. Background image with motion translation */}
      <motion.div
        style={{
          y: bgY,
          scale: bgScale,
          backgroundImage: `url(${activeBg})`,
        }}
        className={`absolute inset-x-0 bg-cover bg-center ${
          isMobile ? "-top-[25%] -bottom-[25%]" : "-top-[30%] -bottom-[30%]"
        }`}
      />

      {/* 2. Midground transparent dark overlay */}
      <div className={`absolute inset-0 ${overlayColor} ${overlayOpacity} z-10`} />
      
      {/* Dynamic linear dark gradient overlay to ensure smooth block connection */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 z-10 pointer-events-none" />

      {/* 3. Foreground Content container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
        {children}
      </div>

      {/* 4. Elegant Scroll Down Indicator positioned dynamically at structural bottom of the container */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold/80 font-sans font-bold">
            Scroll To Brief
          </span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-gold/50 via-gold/30 to-transparent" />
        </div>
      )}
    </div>
  );
}
