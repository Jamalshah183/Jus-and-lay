import { useState } from "react";
import { PRACTICE_AREAS } from "../data";
import { PracticeArea } from "../types";
import { Building, Scale, HeartHandshake, Landmark, TrendingUp, FileText, ArrowRight, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Icon mapper helper
const getPracticeIcon = (iconName: string) => {
  switch (iconName) {
    case "Building":
      return <Building className="w-8 h-8 text-gold" />;
    case "Scale":
      return <Scale className="w-8 h-8 text-gold" />;
    case "HeartHandshake":
      return <HeartHandshake className="w-8 h-8 text-gold" />;
    case "Landmark":
      return <Landmark className="w-8 h-8 text-gold" />;
    case "TrendingUp":
      return <TrendingUp className="w-8 h-8 text-gold" />;
    case "FileText":
      return <FileText className="w-8 h-8 text-gold" />;
    default:
      return <Scale className="w-8 h-8 text-gold" />;
  }
};

export default function PracticeAreas() {
  const [selectedPractice, setSelectedPractice] = useState<PracticeArea | null>(null);

  return (
    <div className="w-full text-white py-16 md:py-24">
      {/* Structural Header with elegant line and Serif font */}
      <div className="text-center mb-16 md:mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
          Elite Jurisdictions
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
          Areas of Practice
        </h2>
        <div className="w-24 h-[2px] bg-gold mx-auto mb-8" />
        <p className="max-w-2xl mx-auto text-white/70 text-sm sm:text-base leading-relaxed font-sans">
          Jus & Lay represents sophisticated clients across multiple critical practice areas, deploying targeted legal defense blocks combined with tactical commercial advisory.
        </p>
      </div>

      {/* Corporate Bento-Style Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {PRACTICE_AREAS.map((practice, index) => (
          <motion.div
            key={practice.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-gold rounded-sm p-8 bg-navy-dark/90 border border-white/10 hover:border-gold/30 hover:bg-navy/95 transition-all duration-300 flex flex-col justify-between gold-shadow"
            onClick={() => setSelectedPractice(practice)}
          >
            {/* Soft background gold gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
            
            <div>
              {/* Icon container */}
              <div className="p-3 border border-white/5 rounded-xs w-fit bg-white/[0.02] group-hover:bg-gold/10 group-hover:border-gold/20 transition-all mb-8">
                {getPracticeIcon(practice.icon)}
              </div>

              {/* Title & brief description */}
              <h3 className="font-serif text-xl font-bold mb-3 text-white group-hover:text-gold transition-colors duration-300">
                {practice.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {practice.description}
              </p>
            </div>

            {/* Premium action trigger */}
            <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-widest uppercase text-gold/80 group-hover:text-gold group-hover:translate-x-1.5 transition-all duration-300 mt-auto">
              Explore Practice Limits <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Elegant Pop-up Modal representing exhaustive law overview */}
      <AnimatePresence>
        {selectedPractice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPractice(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-navy-dark border border-gold/25 rounded-md overflow-hidden shadow-2xl z-25 p-8 md:p-10"
            >
              <button
                onClick={() => setSelectedPractice(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-gold transition-colors p-2 rounded-full border border-white/5 bg-white/[0.02] focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 border border-gold/30 rounded-xs bg-gold/10 text-gold shadow-sm">
                  {getPracticeIcon(selectedPractice.icon)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                    Practice Briefing
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedPractice.title}
                  </h4>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10 mb-6" />

              <div className="space-y-6">
                <div>
                  <h5 className="text-[11px] uppercase tracking-widest text-gold font-bold mb-2">
                    Scope of Jurisdiction
                  </h5>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
                    {selectedPractice.longDesc}
                  </p>
                </div>

                <div className="p-4 bg-navy rounded-xs border border-white/5 flex gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h6 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-1">
                      Certified Legal Guardrails
                    </h6>
                    <p className="text-white/50 text-xs font-sans leading-relaxed">
                      All strategic protocols within this division strictly respect international compliance directives and national supreme court precedents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setSelectedPractice(null)}
                  className="px-6 py-3 sm:py-2.5 text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors border border-white/10 hover:bg-white/5 rounded-xs w-full sm:w-auto order-2 sm:order-1"
                >
                  Close Brief
                </button>
                <a
                  href={`https://wa.me/923218520085?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20consult%20specifically%20regarding%20${encodeURIComponent(selectedPractice.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedPractice(null)}
                  className="px-6 py-3 sm:py-2.5 text-xs font-bold tracking-widest uppercase bg-gold text-navy hover:bg-gold-light hover:text-navy transition-all rounded-xs shadow-md text-center w-full sm:w-auto order-1 sm:order-2"
                >
                  WhatsApp Advisory
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
