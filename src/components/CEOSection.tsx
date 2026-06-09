import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MessageCircle, Sparkles, Shield, UserCheck, Briefcase, Award } from "lucide-react";

export default function CEOSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position across the active container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Multilayer Parallax Transforms for interactive 3D depth
  // 1. Background Outline Title: moves slower in the opposite direction
  const titleBgY = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);

  // 2. CEO cutout image: moves faster with zoom/scale to feel closer to the viewport
  const ceoY = useTransform(scrollYProgress, [0, 1], ["80px", "-120px"]);
  const ceoScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.15]);
  const ceoRotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);

  // 3. Floating HUD panels: move independently to emphasize air-tight 3D layering
  const hudY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
  const lightY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1324] via-[#050912] to-[#0b1324] py-20 lg:py-32 flex items-center justify-center border-t border-b border-gold/15"
    >
      {/* BACKGROUND GRAPHICS & TEXT (Deepest Layer: z-0) */}
      <div className="absolute inset-0 bg-[#050912]/80 opacity-70 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b1324] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1324] to-transparent pointer-events-none" />
      
      {/* Animated Light Sphere */}
      <motion.div
        style={{ y: lightY }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold/[0.03] rounded-full filter blur-[100px] pointer-events-none"
      />

      {/* Extreme Layer: Huge 3D background watermark text that slides slowly behind the CEO */}
      <motion.div
        style={{ y: titleBgY }}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.02] z-0 overflow-hidden"
      >
        <div className="font-serif font-black text-[15vw] leading-none uppercase tracking-[0.1em] text-white text-center whitespace-nowrap">
          AMMAR YASIR
        </div>
      </motion.div>

      {/* CORE CONTAINER (Middle to Foreground Layer: z-10 / z-20) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center relative">
          
          {/* LEFT COLUMN: Overlapping Executive Statement Card (z-20) - Compact 5-column layout to prevent expansion */}
          <div className="lg:col-span-5 space-y-6 text-left order-2 lg:order-1 relative z-20">
            
            {/* Elegant glassmorphic text card that overrides the right-side CEO image cutout with a direct overlap */}
            <div className="bg-[#070e1b]/85 backdrop-blur-xl border border-white/10 p-8 sm:p-10 lg:p-12 rounded-xs shadow-[0_25px_60px_-15px_rgba(4,8,17,0.9)] lg:-mr-44 xl:-mr-64 relative group">
              
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

                {/* CEO Signature / Details Block */}
                <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                      Ammar Yasir
                    </span>
                    <span className="block text-xs uppercase tracking-widest text-gold font-sans font-bold mt-1">
                      Chief Executive Officer & Managing Partner
                    </span>
                    <span className="text-white/40 text-[10px] font-mono block mt-1">
                      Lahore HQ • Suite No.1, 236-Riwaz Garden
                    </span>
                  </div>

                  {/* Secure Link directly to CEO Liaison desk */}
                  <a
                    href="https://wa.me/923218520085?text=Hello%20Ammar%20Yasir%20CEO%20office%20Jus%20%26%20Lay%2C%20we%20require%20privileged%20executive%20counsel%20on%20an%20urgent%20corporate%20dispute."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#2ecc71]/40 hover:border-[#2ecc71] bg-navy/40 text-[#2ecc71] hover:bg-[#2ecc71]/10 rounded-xs text-xs font-bold font-sans tracking-wider uppercase transition-all duration-300 shadow-lg justify-center sm:justify-start"
                  >
                    <MessageCircle className="w-4 h-4 text-[#2ecc71]" />
                    <span>CEO Liaison Desk</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Float decorative background widgets behind the card */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border-b border-l border-white/5 pointer-events-none rounded-bl-sm" />
            <div className="absolute -top-8 -left-8 w-24 h-24 border-t border-l border-white/5 pointer-events-none rounded-tl-sm" />
          </div>

          {/* RIGHT COLUMN: Massive Cutout CEO Parallax Stage (z-10) - Enlarged to 7-columns */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end items-end order-1 lg:order-2 h-[450px] sm:h-[600px] lg:h-[850px] relative w-full">
            
            {/* Deep geometric line art matching law firm theme - sits behind the CEO image */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 opacity-5 pointer-events-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-white/50" />
              ))}
            </div>

            {/* Back Gold Ring Accent (Depth Layer: z-0 inside the Right Column) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] aspect-square rounded-full border border-gold/10 opacity-40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] aspect-square rounded-full border border-white/5 opacity-20 pointer-events-none" />

            {/* 3D PARALLAX CORE: Large Cutout CEO sitting in a chair details layout */}
            <motion.div
              style={{
                y: ceoY,
                scale: ceoScale,
                rotate: ceoRotate,
              }}
              className="absolute inset-0 w-full h-full flex items-end justify-center lg:justify-end z-10 select-none pointer-events-none origin-bottom"
            >
              {/* Massive CEO Cutout image - breeding outside conventional bounding frames to tower over the layout with no background container */}
              <img
                src="https://images.pexels.com/photos/38037504/pexels-photo-38037504.png"
                alt="Ammar Yasir, CEO Jus & Lay Law Conglomerate"
                referrerPolicy="no-referrer"
                className="w-auto h-[120%] sm:h-[130%] lg:h-[155%] max-h-none object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(4,8,17,0.95)] drop-shadow-[0_0_80px_rgba(255,188,87,0.05)]"
              />
            </motion.div>

            {/* Bottom transition gradient to cleanly merge the chair cutout model into the bottom fold */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050912] via-[#050912]/85 to-transparent z-15 pointer-events-none" />

            {/* Floating Forefront Interactive HUD Panels (z-20 - layers over the CEO model) */}
            <motion.div
              style={{ y: hudY }}
              className="absolute top-10 right-4 sm:right-10 lg:right-6 bg-neutral-900/80 backdrop-blur-md border border-white/10 p-5 rounded-sm z-20 shadow-2xl max-w-[210px] text-left pointer-events-auto hidden sm:block"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-white font-sans">
                  Firm Authority
                </span>
              </div>
              <p className="text-[10px] text-white/60 leading-relaxed font-sans font-light">
                Secure enterprise routing with active litigation protection protocol. Cert. No: JL-A1.
              </p>
            </motion.div>

            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], ["-20px", "40px"]) }}
              className="absolute bottom-16 left-4 sm:left-10 lg:left-12 bg-neutral-900/80 backdrop-blur-md border border-gold/30 p-4 rounded-sm z-20 shadow-2xl max-w-[220px] text-left pointer-events-auto hidden md:block"
            >
              <div className="flex items-center gap-1.5 mb-1.5 text-gold">
                <Award className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase tracking-widest font-bold font-sans">
                  Sovereign Counsel
                </span>
              </div>
              <p className="text-[10px] text-white/70 leading-normal font-sans">
                Appellate stay-orders, SECP structural clearances, and state arbitrations.
              </p>
            </motion.div>

            {/* Managing Partner Floating Status Tag on absolute top (z-25) */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-25">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2ecc71]/15 text-[#2ecc71] hover:bg-[#2ecc71]/20 border border-[#2ecc71]/30 rounded-full transition-all duration-300 backdrop-blur-md whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#2ecc71] animate-ping" />
                <span className="text-[9px] uppercase tracking-widest font-extrabold font-sans">
                  CEO OFFICE • ACTIVE CONCIERGE
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
