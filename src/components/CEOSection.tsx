import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Award } from "lucide-react";

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

  const ceoY = useTransform(scrollYProgress, [0, 1], isMobile ? ["40px", "-40px"] : ["80px", "-120px"]);
  const ceoScale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.98, 1.05] : [0.95, 1.15]);
  const bgImageY = useTransform(scrollYProgress, [0, 1], isMobile ? [-120, 120] : [-240, 240]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[80vh] overflow-hidden bg-gradient-to-b from-[#0b1324] via-[#050912] to-[#0b1324] py-16 lg:py-24 flex items-center justify-center border-t border-b border-gold/15"
    >
      {/* Background Graphic Parallax Backdrop */}
      <motion.div
        style={{ y: bgImageY }}
        className="absolute inset-0 w-full pointer-events-none select-none z-0 overflow-hidden h-[140%] -top-[20%]"
      >
        <img
          src="https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg"
          alt="Prestigious Law Chambers Backdrop"
          className="w-full h-full object-cover filter brightness-[0.35] opacity-[0.45]"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Foggy Overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0b1324] to-transparent pointer-events-none z-1" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[#0b1324] pointer-events-none z-1" />

      {/* Foreground Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* LEFT COLUMN: Executive Statement Card */}
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1 relative z-20">
            <div className="bg-[#070e1b]/90 backdrop-blur-xl border border-gold/30 p-8 sm:p-10 lg:p-12 rounded-lg shadow-[0_25px_60px_-15px_rgba(4,8,17,0.9)] relative group">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-gold via-[#ffbc57]/50 to-transparent" />
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/20 rounded-full bg-gold/5">
                  <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                  <span className="text-[10px] sm:text-xs tracking-[0.25em] font-sans font-extrabold uppercase text-gold">
                    Executive Chambers Directive
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    An Unwavering Dedication to <span className="text-gold italic font-serif">Airtight Protection</span>
                  </h2>
                  <div className="w-20 h-[1.5px] bg-gold" />
                </div>

                <div className="space-y-4 font-sans text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  <p>
                    "JUS & LAY" is a well-established, dedicated, efficient & well reputed law firm which is providing highest quality of legal representation to its clients.
                  </p>
                  <blockquote className="border-l border-gold pl-4 italic text-white/95 text-sm sm:text-base font-serif bg-white/[0.01] py-3 pr-2 rounded-r">
                    "As an attorney, our record verdicts and unwavering dedication to represent our client, have earned as a national reputation for diligent, compassionate, and competent advocacy in our areas of law."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Parallax Cutout CEO Photo Stage */}
          <div className="lg:col-span-6 flex flex-col justify-end items-center lg:items-end order-1 lg:order-2 h-[320px] sm:h-[420px] lg:h-[650px] relative w-full">
            <motion.div
              style={{
                y: ceoY,
                scale: ceoScale,
              }}
              className="absolute inset-0 w-full h-full flex items-end justify-center lg:justify-end z-10 select-none pointer-events-none origin-bottom"
            >
              <div className="relative h-full flex flex-col items-center justify-end shrink-0 max-w-full pointer-events-auto">
                <img
                  src="https://images.pexels.com/photos/38037504/pexels-photo-38037504.png"
                  alt="Ammar Yasir Naqvi"
                  referrerPolicy="no-referrer"
                  className={`w-auto object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(4,8,17,0.95)] ${
                    isMobile ? "h-[100%]" : "h-[120%] lg:h-[135%]"
                  }`}
                />

                {/* Badge Overlay */}
                <div 
                  className="absolute bottom-0 z-30 w-full bg-[#070e1b]/95 backdrop-blur-xl border border-gold/40 p-4 sm:p-5 rounded-t-lg shadow-2xl text-left"
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gold/10 rounded border border-gold/30 shrink-0 mt-0.5">
                      <Award className="w-4 h-4 text-gold" />
                    </div>
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-serif text-[15px] sm:text-lg font-bold text-white tracking-wide truncate">
                        AMMAR YASIR NAQVI
                      </h4>
                      <p className="text-[10px] uppercase tracking-widest text-gold font-sans font-bold mt-0.5 truncate">
                        CEO / Lead Chambers Counsel
                      </p>
                      <p className="text-white/60 text-[10px] mt-1 text-left leading-relaxed font-sans font-light">
                        <strong>Credentials:</strong> B.com, LL.B Advocate High Court <br />
                        <strong>Practice:</strong> Banking, Corporate, Commercial, Criminal, Civil, Constitutional Laws
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
