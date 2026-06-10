import { useState } from "react";
import { TeamMember } from "../types";
import { Mail, Phone, X, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LandingAccordionItem } from "./ui/interactive-image-accordion";

export default function Attorneys() {
  const [activePartner, setActivePartner] = useState<TeamMember | null>(null);

  return (
    <div className="w-full text-white py-16 md:py-24">
      {/* Modern Interactive Image Accordion displaying partners */}
      <LandingAccordionItem onSelectPartner={setActivePartner} />


      {/* CV / Profile Modal overlay */}
      <AnimatePresence>
        {activePartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setActivePartner(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="relative w-full max-w-3xl bg-navy-dark border border-gold/30 rounded-md overflow-hidden shadow-2xl z-25 flex flex-col md:flex-row"
            >
              <button
                onClick={() => setActivePartner(null)}
                className="absolute top-5 right-5 z-20 text-white/50 hover:text-gold transition-colors p-2 rounded-full border border-white/5 bg-navy-dark/70 focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Portrait Side (MD+) */}
              <div className="w-full md:w-2/5 aspect-[3/4] md:aspect-auto relative bg-navy flex items-center justify-center">
                <img
                  src={activePartner.image}
                  alt={activePartner.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent opacity-90 md:opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-gold animate-pulse" />
                    <span className="text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      Senior Executive Board
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-white">
                    {activePartner.name}
                  </h4>
                </div>
              </div>

              {/* CV Body Side */}
              <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold font-sans">
                    Academic & Trial Pedigree
                  </span>
                  <h4 className="font-serif text-2xl font-extrabold text-white mt-1 mb-2">
                    {activePartner.name}
                  </h4>
                  <p className="text-gold/90 text-xs font-sans font-semibold mb-6 tracking-wide uppercase border-b border-white/10 pb-4">
                    {activePartner.role}
                  </p>

                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 text-white/70 text-sm leading-relaxed font-sans">
                    <p>{activePartner.bio}</p>
                    <p className="text-xs text-white/50 uppercase tracking-widest font-bold">
                      • Strategic Executive Mandate
                    </p>
                    <p className="text-xs">
                      Engaged exclusively in counsel for sovereign funds, multi-state commercial operations, high-net equity distribution, and high-frequency litigation defense.
                    </p>
                  </div>
                </div>

                {/* Direct Contact options */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h5 className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-3">
                    Direct Secure Communication Channels
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <a
                      href={`mailto:${activePartner.email}`}
                      className="flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-gold/10 border border-white/5 hover:border-gold/20 rounded-xs group transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                      <div className="overflow-hidden">
                        <span className="block text-[9px] uppercase tracking-wider text-white/40">
                          Direct Cryptographic Mail
                        </span>
                        <span className="block text-xs font-mono text-white/85 truncate">
                          {activePartner.email}
                        </span>
                      </div>
                    </a>

                    <a
                      href={`tel:${activePartner.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-3 p-3 bg-white/[0.02] hover:bg-gold/10 border border-white/5 hover:border-gold/20 rounded-xs group transition-all duration-300"
                    >
                      <Phone className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-white/40">
                          Partner Secure Voiceline
                        </span>
                        <span className="block text-xs font-mono text-white/85">
                          {activePartner.phone}
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={() => setActivePartner(null)}
                      className="px-6 py-3 sm:py-2.5 text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors border border-white/10 hover:bg-white/5 rounded-xs focus:outline-none w-full sm:w-auto order-2 sm:order-1"
                    >
                      Dismiss Bio
                    </button>
                    <a
                      href={
                        activePartner.id === "ammar"
                          ? "https://wa.me/923218520085?text=Hello%20Ammar%20Yasir%20CEO%20office%20Jus%20%26%20Lay%2C%20we%20require%20privileged%20executive%20counsel%20regarding%20a%20high-stakes%20corporate%20matter."
                          : activePartner.id === "marcus"
                          ? "https://wa.me/923218520085?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Barrister%20Jamal%20M.%20Shah%20for%20an%20urgent%20appellate%20matter."
                          : activePartner.id === "serena"
                          ? "https://wa.me/923218520085?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Ayesha%20Khan%20Lodhi%20for%20an%20M%26A%20or%20corporate%20structuring%20matter."
                          : "https://wa.me/923218520085?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Advocate%20Zane%20Malik%20regarding%20tax%2C%20FBR%20or%20power-grid%20counsel."
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActivePartner(null)}
                      className="px-6 py-3 sm:py-2.5 text-xs font-bold tracking-widest uppercase bg-gold text-navy hover:bg-gold-light hover:text-navy shadow-md block transition-all rounded-xs text-center w-full sm:w-auto order-1 sm:order-2"
                    >
                      WhatsApp Counsel
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
