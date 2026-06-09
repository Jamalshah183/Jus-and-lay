import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  id?: string;
  className?: string;
  backgroundImage: string;
  overlayOpacity?: string; // e.g., 'opacity-90' or 'bg-opacity-80'
  overlayColor?: string; // e.g., 'bg-navy-dark'
  midgroundIcon?: "lady-justice" | "scales" | "emblem" | null;
  midgroundAlign?: "left" | "right" | "center";
  midgroundSpeedMultiplier?: number;
  heightClass?: string; // e.g., 'min-h-[100vh]' or 'py-24'
  children: ReactNode;
}

export default function ParallaxSection({
  id,
  className = "",
  backgroundImage,
  overlayOpacity = "opacity-75",
  overlayColor = "bg-black",
  midgroundIcon = null,
  midgroundAlign = "right",
  midgroundSpeedMultiplier = -150,
  heightClass = "min-h-screen",
  children,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll state of this container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background shifts slowly to create depth (Parallax layer 1)
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  // Midground shifts faster than background, moving in opposite direction (Parallax layer 3)
  const midgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${midgroundSpeedMultiplier * -0.5}px`, `${midgroundSpeedMultiplier * 1.5}px`]
  );
  const midgroundRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

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
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] bg-cover bg-center"
      />

      {/* 2. Midground transparent dark overlay */}
      <div className={`absolute inset-0 ${overlayColor} ${overlayOpacity} z-10`} />
      
      {/* Dynamic linear dark gradient overlay to ensure smooth block connection */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 z-10 pointer-events-none" />

      {/* 3. Midground parallax graphic layer (moves with different speed for 3D depth) */}
      {midgroundIcon && (
        <motion.div
          style={{ y: midgroundY, rotate: midgroundRotate }}
          className={`absolute z-15 pointer-events-none opacity-20 md:opacity-30 mix-blend-screen text-gold transition-colors duration-500
            ${midgroundAlign === "right" ? "right-[5%] md:right-[10%] top-1/4" : ""}
            ${midgroundAlign === "left" ? "left-[5%] md:left-[10%] top-1/4" : ""}
            ${midgroundAlign === "center" ? "self-center top-1/3 text-center" : ""}
          `}
        >
          {midgroundIcon === "lady-justice" && (
            <svg
              width="300"
              height="500"
              viewBox="0 0 100 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="w-[180px] h-[300px] md:w-[300px] md:h-[500px]"
            >
              {/* Lady Justice luxury outlines */}
              <path d="M50,15 C52,15 53,17 53,19 C53,21 51,23 49,23 C47,23 47,21 47,19 C47,17 48,15 50,15 Z" />
              <path d="M50,23 L50,60" />
              {/* Blindfold line */}
              <line x1="47" y1="18" x2="53" y2="19" />
              {/* Sword */}
              <line x1="25" y1="35" x2="25" y2="120" strokeWidth="1" />
              <line x1="20" y1="42" x2="30" y2="42" />
              <path d="M25,35 L22,30 L28,30 Z" />
              {/* Arm holding Sword */}
              <path d="M49,30 L38,30 L25,42" />
              {/* Arm holding Scales */}
              <path d="M51,30 L66,28 L78,35" />
              {/* Scales Beam */}
              <line x1="68" y1="34" x2="88" y2="36" strokeWidth="1" stroke="currentColor" />
              {/* Scales plate left */}
              <line x1="68" y1="34" x2="63" y2="55" />
              <line x1="68" y1="34" x2="73" y2="55" />
              <path d="M60,55 L76,55" strokeWidth="1" />
              {/* Scales plate right */}
              <line x1="88" y1="36" x2="83" y2="57" />
              <line x1="88" y1="36" x2="93" y2="57" />
              <path d="M80,57 L96,57" strokeWidth="1" />
              {/* Robe/Drape curves */}
              <path d="M40,60 C42,80 35,110 38,150 C38,160 42,170 45,180" />
              <path d="M60,60 C58,80 65,110 62,150 C62,160 58,170 55,180" />
              <path d="M48,60 C48,90 52,120 50,160 C50,170 51,180 50,190" />
              <path d="M42,60 C45,62 55,62 58,60 L50,26 Z" />
              {/* Stand */}
              <path d="M35,190 L65,190 L50,180 Z" />
              <line x1="30" y1="195" x2="70" y2="195" strokeWidth="2" />
            </svg>
          )}

          {midgroundIcon === "scales" && (
            <svg
              width="300"
              height="300"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="w-[200px] h-[200px] md:w-[350px] md:h-[350px]"
            >
              {/* Traditional scales of justice */}
              {/* Pillar base */}
              <path d="M30,90 L70,90" strokeWidth="2" />
              <path d="M38,90 L62,90 L50,85 Z" />
              <line x1="50" y1="85" x2="50" y2="15" strokeWidth="2.5" />
              <path d="M45,15 C45,10 55,10 55,15 Z" fill="currentColor" opacity="0.3" />

              {/* Main crossbar (lever) - horizontal balance */}
              <line x1="15" y1="25" x2="85" y2="25" strokeWidth="2" />
              {/* Pivot circles */}
              <circle cx="50" cy="25" r="3" fill="currentColor" />
              <circle cx="15" cy="25" r="1.5" />
              <circle cx="85" cy="25" r="1.5" />

              {/* Left scale pans */}
              <line x1="15" y1="25" x2="5" y2="55" />
              <line x1="15" y1="25" x2="25" y2="55" />
              <path d="M2,55 C2,65 28,65 28,55 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />

              {/* Right scale pans */}
              <line x1="85" y1="25" x2="75" y2="55" />
              <line x1="85" y1="25" x2="95" y2="55" />
              <path d="M72,55 C72,65 98,65 98,55 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
            </svg>
          )}

          {midgroundIcon === "emblem" && (
            <svg
              width="400"
              height="400"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="w-[220px] h-[220px] md:w-[400px] md:h-[400px]"
            >
              {/* Complex corporate vector emblem shield, scales, brand */}
              <circle cx="100" cy="100" r="85" strokeWidth="0.5" strokeDasharray="3 3" />
              <path d="M100,25 C145,25 155,40 155,90 C155,145 125,175 100,185 C75,175 45,145 45,90 C45,40 55,25 100,25 Z" strokeWidth="1.2" />
              
              {/* Embedded simplified scale */}
              <line x1="75" y1="80" x2="125" y2="80" strokeWidth="1.5" />
              <line x1="100" y1="65" x2="100" y2="140" strokeWidth="2" />
              <circle cx="100" cy="80" r="2" fill="currentColor" />
              
              {/* Left pan */}
              <line x1="75" y1="80" x2="68" y2="105" />
              <line x1="75" y1="80" x2="82" y2="105" />
              <path d="M65,105 L85,105" strokeWidth="1" />
              
              {/* Right pan */}
              <line x1="125" y1="80" x2="118" y2="105" />
              <line x1="125" y1="80" x2="132" y2="105" />
              <path d="M115,105 L135,105" strokeWidth="1" />

              <path d="M80,145 C90,150 110,150 120,145" strokeWidth="1" />
            </svg>
          )}
        </motion.div>
      )}

      {/* 4. Foreground Content container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
        {children}
      </div>
    </div>
  );
}
