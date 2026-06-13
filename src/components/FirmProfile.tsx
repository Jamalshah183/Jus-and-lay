import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  Layers, 
  Users,
  ChevronRight, 
  BookOpen,
  FolderLock,
  Landmark,
  ShieldAlert
} from "lucide-react";
import { 
  ABOUT_FIRM, 
  OUR_PHILOSOPHY, 
  PRACTICE_AREAS, 
  FINANCIAL_INSTITUTIONS_SERVICE
} from "../data";

export default function FirmProfile() {
  const [activeTab, setActiveTab] = useState<"about" | "philosophy" | "practices" | "banking">("about");

  const tabs = [
    { id: "about", label: "About Firm", icon: BookOpen },
    { id: "philosophy", label: "Our Philosophy", icon: Scale },
    { id: "practices", label: "Practice Areas", icon: Layers },
    { id: "banking", label: "Financial Institutions", icon: Landmark },
  ] as const;

  return (
    <div id="firm-profile" className="w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
          Corporate Credentials
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
          Chambers Firm Profile
        </h2>
        <div className="w-24 h-[2px] bg-gold mx-auto mb-6" />
        <p className="max-w-2xl mx-auto text-white/70 text-sm sm:text-base leading-relaxed font-sans font-light">
          A definitive, holistic overview detailing JUS & LAY's legal representations, regulatory councils, and banking litigation defense frameworks.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10 border-b border-white/10 pb-4 max-w-5xl mx-auto">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-[10px] sm:text-xs tracking-wider uppercase font-sans font-extrabold border-b-2 transition-all duration-300 ${
                isActive 
                  ? "border-gold text-gold bg-gold/5" 
                  : "border-transparent text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-gold animate-pulse" : "text-white/40"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tabs Content Dynamic Area */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-[#0b1324]/95 border border-gold/20 p-5 sm:p-10 md:p-12 rounded-lg shadow-2xl relative"
          >
            {/* Elegant Luxury Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/30" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/30" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/30" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/30" />

            {/* TAB 1: ABOUT FIRM */}
            {activeTab === "about" && (
              <div className="space-y-8 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                      CHAMBERS HISTORY
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      About "JUS & LAY"
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 text-gold border border-gold/30 rounded-xs text-[10px] tracking-widest uppercase font-bold font-sans self-start md:self-auto">
                    <Award className="w-3.5 h-3.5" />
                    <span>Established Advocates</span>
                  </div>
                </div>

                <div className="space-y-6 text-white/80 text-sm sm:text-base leading-relaxed font-light">
                  <p className="font-serif text-lg sm:text-xl italic text-white leading-relaxed border-l-2 border-gold pl-6 py-1">
                    {ABOUT_FIRM.paragraph1}
                  </p>
                  <p>
                    {ABOUT_FIRM.paragraph2}
                  </p>
                  <div className="bg-[#070e1b] border border-gold/15 p-6 rounded-md text-white/80 text-xs sm:text-sm">
                    <strong className="text-gold block mb-3 font-serif text-sm uppercase tracking-wider">Expertise & Capacity:</strong>
                    {ABOUT_FIRM.paragraph3}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OUR PHILOSOPHY */}
            {activeTab === "philosophy" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                    LEGAL PHILOSOPHY
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Our Philosophy
                  </h3>
                </div>

                <div className="space-y-6 text-white/80 text-sm sm:text-base leading-relaxed font-light">
                  <p className="font-sans text-white/95 leading-relaxed text-sm sm:text-base">
                    {OUR_PHILOSOPHY.paragraph1}
                  </p>
                  
                  <div className="bg-[#070e1b] border border-gold/15 p-6 sm:p-8 rounded-md">
                    <h4 className="font-serif text-xs uppercase tracking-widest text-[#ffbc57] font-bold border-b border-white/5 pb-2 mb-4">
                      We are committed to:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {OUR_PHILOSOPHY.commitments.map((commitment, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0 mt-1.5" />
                          <span className="text-white/85 text-xs sm:text-sm">{commitment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="border-l border-gold pl-5 italic text-gold text-sm sm:text-base font-serif py-1">
                    {OUR_PHILOSOPHY.paragraph2}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: PRACTICE AREAS */}
            {activeTab === "practices" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                    PRACTICE CORE
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Practice Areas
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PRACTICE_AREAS.map((area, index) => (
                    <div key={index} className="p-5 bg-[#070e1b] border border-white/5 hover:border-gold/30 rounded-lg transition-all duration-300">
                      <h4 className="font-serif text-sm sm:text-base font-bold text-gold mb-3 uppercase tracking-wide border-b border-white/5 pb-2 flex items-center justify-between">
                        <span>{area.title}</span>
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      </h4>
                      <ul className="space-y-2">
                        {area.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-gold/60 text-xs mt-0.5">•</span>
                            <span className="text-white/75 text-xs sm:text-sm font-sans font-light leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SERVICES TO FINANCIAL INSTITUTIONS */}
            {activeTab === "banking" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                      SPECIALIZED BANKING DESK
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      {FINANCIAL_INSTITUTIONS_SERVICE.title}
                    </h3>
                  </div>
                  <div className="bg-gold/15 text-gold border border-gold/20 text-[9px] font-sans font-bold py-1 px-2.5 rounded uppercase tracking-wider self-start sm:self-auto">
                    Corporate & Banking Litigators
                  </div>
                </div>

                <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light font-sans italic border-l-2 border-gold/50 pl-4 py-1">
                  {FINANCIAL_INSTITUTIONS_SERVICE.subtitle}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Contentious Matters */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2.5 border-b border-white/15 pb-2">
                      <ShieldAlert className="w-4 h-4 text-[#ff6b6b]" />
                      <h4 className="font-serif text-base font-bold text-white">
                        {FINANCIAL_INSTITUTIONS_SERVICE.contentiousTitle}:
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {FINANCIAL_INSTITUTIONS_SERVICE.contentious.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-[#070e1b] border border-white/5 rounded">
                          <div className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full shrink-0" />
                          <span className="text-white/90 text-xs sm:text-sm font-sans">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Non-Contentious Matters */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-2.5 border-b border-white/15 pb-2">
                      <ShieldCheck className="w-4 h-4 text-[#2ecc71]" />
                      <h4 className="font-serif text-base font-bold text-white">
                        {FINANCIAL_INSTITUTIONS_SERVICE.nonContentiousTitle}:
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {FINANCIAL_INSTITUTIONS_SERVICE.nonContentious.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-[#070e1b] border border-white/5 rounded">
                          <div className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full shrink-0 mt-1.5" />
                          <span className="text-white/90 text-xs sm:text-sm font-sans leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
