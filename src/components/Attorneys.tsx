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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 md:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setActivePartner(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="relative my-auto w-full max-w-3xl bg-[#0b1424] border border-gold/30 rounded-xl overflow-y-auto md:overflow-visible md:overflow-y-visible shadow-2xl z-25 flex flex-col md:flex-row max-h-[92vh] md:max-h-none"
            >
              <button
                onClick={() => setActivePartner(null)}
                className="absolute top-4 right-4 z-30 text-white/70 hover:text-gold transition-colors p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xs focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Portrait Side */}
              <div className="w-full md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[480px] relative bg-navy flex items-center justify-center shrink-0">
                <img
                  src={activePartner.id === "ammar" ? "https://images.pexels.com/photos/38052861/pexels-photo-38052861.jpeg" : activePartner.image}
                  alt={activePartner.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1424] via-transparent to-transparent opacity-95 md:opacity-60" />
                <div className="absolute bottom-4 left-4 xs:bottom-6 xs:left-6 right-6">
                  <div className="flex items-center gap-2 mb-1 xs:mb-2">
                    <Award className="w-3.5 h-3.5 text-gold animate-pulse" />
                    <span className="text-[8px] xs:text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      Of Counsel
                    </span>
                  </div>
                  <h4 className="font-serif text-lg xs:text-xl font-bold text-white">
                    {activePartner.name}
                  </h4>
                </div>
              </div>

              {/* CV Body Side */}
              <div className="w-full md:w-3/5 p-5 xs:p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold font-sans">
                    Advocate profile & Credentials
                  </span>
                  <h4 className="font-serif text-xl xs:text-2xl font-extrabold text-white mt-1 mb-1 xs:mb-2">
                    {activePartner.name}
                  </h4>
                  <p className="text-gold/90 text-[10px] xs:text-xs font-sans font-semibold mb-4 xs:mb-6 tracking-wide uppercase border-b border-white/10 pb-3 xs:pb-4">
                    {activePartner.role}
                  </p>

                  <div className="space-y-3 xs:space-y-4 max-h-[140px] xs:max-h-[200px] sm:max-h-[220px] overflow-y-auto pr-2 text-white/70 text-xs xs:text-sm leading-relaxed font-sans scrollbar-thin">
                    <p className="font-light">{activePartner.bio}</p>
                    <p className="text-[10px] xs:text-xs text-white/50 uppercase tracking-widest font-bold">
                      • Strategic Legal Mission
                    </p>
                    <p className="text-[11px] xs:text-xs font-light">
                      Providing top-tier representation, record verdicts, and unwavering client advocacy under strict procedural privacy guidelines.
                    </p>
                  </div>
                </div>

                {/* Direct Contact options */}
                <div className="mt-6 md:mt-8 pt-4 xs:pt-6 border-t border-white/10">
                  <h5 className="text-[9px] xs:text-[10px] uppercase tracking-widest text-white/50 font-bold mb-3">
                    Secure Contact Details
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 mb-4 xs:mb-6 font-sans">
                    <a
                      href={`mailto:${activePartner.email}`}
                      className="flex items-center gap-3 p-2.5 xs:p-3 bg-white/[0.02] hover:bg-gold/10 border border-white/5 hover:border-gold/20 rounded group transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                      <div className="overflow-hidden text-left">
                        <span className="block text-[8px] xs:text-[9px] uppercase tracking-wider text-white/40">
                          Direct Chambers Email
                        </span>
                        <span className="block text-[11px] xs:text-xs font-mono text-white/85 truncate">
                          {activePartner.email}
                        </span>
                      </div>
                    </a>

                    <a
                      href={`tel:${activePartner.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-3 p-2.5 xs:p-3 bg-white/[0.02] hover:bg-gold/10 border border-white/5 hover:border-gold/20 rounded group transition-all duration-300"
                    >
                      <Phone className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <span className="block text-[8px] xs:text-[9px] uppercase tracking-wider text-white/40">
                          Secure Voiceline
                        </span>
                        <span className="block text-[11px] xs:text-xs font-mono text-white/85 truncate">
                          {activePartner.phone}
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 xs:gap-3">
                    <button
                      onClick={() => setActivePartner(null)}
                      className="px-4 xs:px-6 py-2.5 text-[10px] xs:text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors border border-white/10 hover:bg-white/5 rounded focus:outline-none w-full sm:w-auto order-2 sm:order-1"
                    >
                      Dismiss Bio
                    </button>
                    <a
                      href={
                        activePartner.id === "ammar"
                          ? "https://wa.me/923218520085?text=Hello%20Ammar%20Yasir%20CEO%20office%20Jus%20%26%20Lay%2C%20we%20require%20privileged%20executive%20counsel%20regarding%20a%20high-stakes%20corporate%20matter."
                          : activePartner.id === "malik"
                          ? "https://wa.me/923007777167?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Malik%20Abid%20Hussain%20Awan%20for%20an%20urgent%20legal%20matter."
                          : activePartner.id === "taqi"
                          ? "https://wa.me/923234701617?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Syed%20Taqi%20Ul%20Hassan%20for%20an%20urgent%20legal%20matter."
                          : activePartner.id === "ali"
                          ? "https://wa.me/923314422906?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Muhammad%20Ali%20Anwar%20regarding%20high-court%20counsel."
                          : activePartner.id === "qalb"
                          ? "https://wa.me/923334726790?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Syed%20Qalb%20E%20Abbas%20regarding%20high-court%20counsel."
                          : activePartner.id === "javed"
                          ? "https://wa.me/923004452839?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20engage%20Javed%20Hashmi%20regarding%20high-court%20counsel."
                          : "https://wa.me/923218520085?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20require%20privileged%20counsel."
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setActivePartner(null)}
                      className="px-4 xs:px-6 py-2.5 text-[10px] xs:text-xs font-bold tracking-widest uppercase bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-md block transition-all rounded text-center w-full sm:w-auto order-1 sm:order-2"
                    >
                      WhatsApp Counsel (Direct)
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
