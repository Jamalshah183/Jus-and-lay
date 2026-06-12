import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Scale } from "lucide-react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Establishing Secure Counsel Connection...",
    "Verifying Cryptographic Credentials...",
    "Opening Supreme Chambers Dossier...",
    "Authorizing Elite Executive Board..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Quadratic-like approach: slow down as we near 100%
        const remaining = 100 - prev;
        const inc = Math.max(1, Math.round(remaining * 0.15));
        return Math.min(100, prev + inc);
      });
    }, 150);

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-[#070e1b] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background ambient gold-navy glow vectors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      {/* Decorative Gold Seal / Frame */}
      <div className="relative flex flex-col items-center max-w-sm px-6">
        
        {/* Animated outer ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-12 -bottom-12 -left-12 -right-12 border-t-2 border-b border-r-2 border-l border-gold/30 rounded-full scale-[0.65] xs:scale-[0.8]"
        />

        {/* Animated inner ring counter-rotating */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-16 -bottom-16 -left-16 -right-16 border-r border-l-2 border-t border-b-2 border-gold/15 rounded-full scale-[0.55] xs:scale-[0.7]"
        />

        {/* Logo Container - centered in the golden ring */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ 
            scale: [0.95, 1.02, 0.95], 
            opacity: 1 
          }}
          transition={{ 
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8 } 
          }}
          className="relative z-10 p-5 rounded-xl bg-white border-2 border-gold/60 shadow-[0_0_40px_rgba(255,188,87,0.2)] mb-8 flex items-center justify-center max-w-[140px] xs:max-w-[170px]"
        >
          <img
            src="https://images.pexels.com/photos/38052959/pexels-photo-38052959.png"
            alt="Jus & Lay Law Conglomerate Logo"
            className="w-full h-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Core Loading Text and Status messages */}
        <div className="mt-4 flex flex-col items-center gap-2 relative z-10 w-full text-center">
          <div className="flex items-center gap-2 text-gold">
            <Scale className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-[11px] xs:text-xs font-sans font-bold tracking-[0.25em] uppercase text-gold">
              Jus & Lay Law Conglomerate
            </span>
          </div>

          <div className="h-6 overflow-hidden mt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] xs:text-xs font-sans text-white/50 tracking-wide"
              >
                {statuses[statusIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Golden Progress Bar Layout */}
          <div className="w-48 xs:w-56 h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden relative">
            <motion.div
              layout
              className="h-full bg-gold"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.2 }}
            />
          </div>

          {/* Percentage */}
          <span className="text-[9px] xs:text-[10px] font-mono font-bold text-gold/80 tracking-widest mt-1">
            SECURE SYNC: {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
