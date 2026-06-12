import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MessageCircle, Sparkles, Shield, UserCheck, Briefcase, Award } from "lucide-react";

export default function CEOSection() {
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

  // Track scroll position across the active container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Multilayer Parallax Transforms for interactive 3D depth (speed increased on mobile per user request)
  // 1. Background Outline Title: moves slower in the opposite direction
  const titleBgY = useTransform(scrollYProgress, [0, 1], isMobile ? ["-35px", "35px"] : ["-50px", "50px"]);

  // 2. CEO cutout image: moves faster with zoom/scale to feel closer to the viewport
  const ceoY = useTransform(scrollYProgress, [0, 1], isMobile ? ["100px", "-140px"] : ["150px", "-210px"]);
  const ceoScale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.95, 1.15] : [0.9, 1.25]);
  const ceoRotate = useTransform(scrollYProgress, [0, 1], isMobile ? [-0.5, 0.5] : [-1.5, 1.5]);

  // 3. Parallax Background Image layer: drifts faster for highly impactful depth
  const bgImageY = useTransform(scrollYProgress, [0, 1], isMobile ? [-240, 240] : [-360, 360]);

  // 4. Floating HUD panels: move independently to emphasize air-tight 3D layering
  const hudY = useTransform(scrollYProgress, [0, 1], isMobile ? ["40px", "-40px"] : ["60px", "-60px"]);
  const lightY = useTransform(scrollYProgress, [0, 1], isMobile ? ["-15%", "15%"] : ["-20%", "20%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1324] via-[#050912] to-[#0b1324] py-16 lg:py-32 flex items-center justify-center border-t border-b border-gold/15"
    >
      {/* 1. Behind the scenes: Parallax Background Image representing corporate luxury */}
      <motion.div
        style={{ y: bgImageY }}
        className={`absolute inset-x-0 w-full pointer-events-none select-none z-0 overflow-hidden ${
          isMobile ? "-top-[25%] h-[150%]" : "-top-[35%] h-[170%]"
        }`}
      >
        <img
          src="https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg"
          alt="Prestigious Law Chambers Backdrop"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.15] opacity-[0.70]"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* BACKGROUND GRADICS (Fades to blend and completely hide background image details below the CEO grid content) */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b1324] to-transparent pointer-events-none z-1" />
      
      {/* Solid blocker matching the container's bottom padding exactly to ensure no background image bleed-through below the grid */}
      <div className="absolute inset-x-0 bottom-0 h-20 lg:h-32 bg-[#0b1324] pointer-events-none z-1" />
      {/* High-reaching transition fog starting from the solid bottom block to dissolve the law-chamber graphic smoothly */}
      <div className="absolute inset-x-0 bottom-20 lg:bottom-32 h-64 bg-gradient-to-t from-[#0b1324] to-transparent pointer-events-none z-1" />

      {/* CORE CONTAINER (Middle to Foreground Layer: z-10 / z-20) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative">
          
          {/* LEFT COLUMN: Executive Statement Card (z-20) - balanced 6-column layout to prevent expansion */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1 relative z-20">
            
            {/* Elegant glassmorphic text card with clean margins to prevent covering the CEO image cutout */}
            <div className="bg-[#070e1b]/85 backdrop-blur-xl border border-white/10 p-8 sm:p-10 lg:p-12 rounded-xs shadow-[0_25px_60px_-15px_rgba(4,8,17,0.9)] lg:-mr-6 xl:-mr-10 relative group">
              
              {/* Luxury Accent Line representing supreme legal architecture */}
              <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-gold via-[#ffbc57]/50 to-transparent" />
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/20 rounded-full bg-gold/5 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                  <span className="text-[10px] sm:text-xs tracking-[0.25em] font-sans font-extrabold uppercase text-gold">
                    Executive Chambers Directive
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    Engineering a New Paradigm for <span className="text-gold italic font-serif gold-glow">Elite Advocacy</span>
                  </h2>
                  <div className="w-20 h-[1.5px] bg-gold" />
                </div>

                <div className="space-y-6 font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light">
                  <p>
                    At <span className="text-white font-semibold">Jus & Lay Law Conglomerate</span>, our direction is set by a commitment to absolute legal protection. We avoid the standardized, high-volume casework of traditional firms, preserving our focus for complex corporate governance, sovereign projects, and high-frequency litigation defense.
                  </p>
                  
                  <blockquote className="border-l-2 border-gold pl-5 italic text-white/95 text-base sm:text-lg font-serif bg-white/[0.02] py-4 pr-4 rounded-r-xs">
                    "We do not merely react to regulatory changes; we design the strategic frameworks that preempt corporate vulnerabilities altogether."
                  </blockquote>

                  <p>
                    Under our centralized docket protocol, every enterprise brief undergoes collaborative stress testing. This ensures your capital, compliance, and secrets remain insulated under airtight solicitor privilege.
                  </p>
                </div>

              </div>
            </div>

            {/* Float decorative background widgets behind the card */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border-b border-l border-white/5 pointer-events-none rounded-bl-sm" />
            <div className="absolute -top-8 -left-8 w-24 h-24 border-t border-l border-white/5 pointer-events-none rounded-tl-sm" />
          </div>

          {/* RIGHT COLUMN: Massive Cutout CEO Parallax Stage (z-10) - Balanced to 6-columns */}
          <div className="lg:col-span-6 flex flex-col justify-end items-center lg:items-end order-1 lg:order-2 h-[340px] sm:h-[450px] lg:h-[850px] relative w-full">
            
            {/* 3D PARALLAX CORE: Large Cutout CEO sitting in a chair details layout */}
            <motion.div
              style={{
                y: ceoY,
                scale: ceoScale,
                rotate: ceoRotate,
              }}
              className="absolute inset-0 w-full h-full flex items-end justify-center lg:justify-end z-10 select-none pointer-events-none origin-bottom"
            >
              {/* Image & Badge Integrated Wrapper - sizes strictly by the image width, permitting pointer-events on the badge itself */}
              <div className="relative h-full flex flex-col items-center justify-end shrink-0 max-w-full pointer-events-auto">
                {/* Massive CEO Cutout image - breeding outside conventional bounding frames to tower over the layout with no background container */}
                <img
                  src="https://images.pexels.com/photos/38037504/pexels-photo-38037504.png"
                  alt="Ammar Yasir Naqvi, CEO Jus & Lay Law Conglomerate"
                  referrerPolicy="no-referrer"
                  className={`w-auto object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(4,8,17,0.95)] drop-shadow-[0_0_80px_rgba(255,188,87,0.05)] ${
                    isMobile ? "h-[105%]" : "h-[120%] sm:h-[130%] lg:h-[155%]"
                  }`}
                />

                {/* Credential Badge - perfectly sized to peer/image boundary, fixed with the image at the exact bottom */}
                <div 
                  id="ceo-credential-badge" 
                  className="absolute bottom-0 z-30 w-full bg-[#070e1b]/95 backdrop-blur-xl border border-gold/40 p-4 sm:p-5 rounded-t-lg rounded-b-none shadow-[0_20px_50px_rgba(4,8,17,0.98)] text-left group transition-all duration-300 hover:border-gold"
                >
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="p-2 sm:p-2.5 bg-gold/10 rounded-xs border border-gold/30 shrink-0 mt-0.5">
                      <Award className="w-5 h-5 text-gold" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-serif text-[15px] sm:text-xl font-bold text-white tracking-wide truncate">
                        Ammar Yasir Naqvi
                      </h4>
                      <p className="text-[9px] sm:text-xs uppercase tracking-widest text-gold font-sans font-extrabold mt-0.5 truncate">
                        Chief Executive Officer & Managing Partner
                      </p>
                      <p className="text-white/50 text-[8px] sm:text-[10px] font-mono mt-2 flex items-center gap-1.5 leading-relaxed truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        Lahore HQ • Suite No.1, 236-Riwaz Garden
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
