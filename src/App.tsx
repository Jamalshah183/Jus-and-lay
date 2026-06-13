import React, { useState, useEffect } from "react";
import { IMAGES, INTRODUCTION, ABOUT_FIRM, OUR_CLIENTS, CLIENTS_BY_SECTOR } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  CalendarCheck 
} from "lucide-react";

// Import custom components
import Navbar from "./components/Navbar";
import ParallaxSection from "./components/ParallaxSection";
import Attorneys from "./components/Attorneys";
import ConsultationForm from "./components/ConsultationForm";
import CEOSection from "./components/CEOSection";
import FirmProfile from "./components/FirmProfile";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const fallback = setTimeout(handleLoad, 3000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  const handleCTABookScroll = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* 1. STICKY NAVBAR */}
      <Navbar />

      {/* 2. HERO VIEW using the client's specified Introduction text */}
      <ParallaxSection
        id="home"
        backgroundImage={IMAGES.heroBg}
        mobileBackgroundImage="https://images.pexels.com/photos/7876151/pexels-photo-7876151.jpeg"
        heightClass="min-h-screen lg:h-screen pt-28 pb-32 lg:py-16"
        overlayOpacity="opacity-65"
        overlayColor="bg-black"
        showScrollIndicator={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-16">
          <div className="lg:col-span-12 space-y-8 text-left max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 border border-gold/30 rounded-full bg-gold/10 backdrop-blur-sm shadow-sm"
            >
              <Scale className="w-4 h-4 text-gold animate-bounce" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] font-sans font-bold uppercase text-gold">
                Supreme Corporate & Banking Representation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-white uppercase"
            >
              Strategic Counsel by <br />
              <span className="text-gold gold-glow font-serif italic">{INTRODUCTION.firmName}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-3.5xl font-light tracking-wide leading-relaxed"
            >
              {INTRODUCTION.sentence1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="font-serif text-white/50 text-xs sm:text-sm md:text-base italic max-w-3xl leading-relaxed border-l border-gold/30 pl-4"
            >
              {INTRODUCTION.sentence2}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center pt-2"
            >
              <a
                href="#consultation"
                onClick={(e) => handleCTABookScroll(e, "#consultation")}
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-gold text-[#070e1b] font-extrabold text-[10px] sm:text-xs tracking-widest uppercase rounded-xs hover:bg-white hover:text-navy hover:shadow-[0_0_20px_rgba(255,188,87,0.45)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#070e1b] shrink-0" />
                <span>WhatsApp Liaison</span>
              </a>
              
              <button
                onClick={(e) => handleCTABookScroll(e, "#firm-profile")}
                className="px-6 py-3.5 sm:px-8 sm:py-4 border border-white/20 hover:border-gold hover:bg-white/5 text-white font-bold text-[10px] sm:text-xs tracking-widest uppercase rounded-xs transition-all duration-300 cursor-pointer text-center"
              >
                Chambers Profile
              </button>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* 3. SECTION 2: ABOUT SECTION */}
      <ParallaxSection
        id="about"
        backgroundImage={IMAGES.aboutBg}
        heightClass="min-h-screen py-24 flex items-center"
        overlayOpacity="opacity-75"
        overlayColor="bg-black"
      >
        <div className="w-full space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Block: About the firm details */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 bg-[#0b1324]/95 border border-gold/25 p-7 sm:p-10 md:p-12 rounded-lg shadow-2xl relative"
            >
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/40" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/40" />

              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
                National Legal Capacity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
                About "Jus & Lay"
              </h2>
              <div className="w-20 h-[1.5px] bg-gold mb-8" />
              
              <div className="space-y-6 font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light text-left">
                <p>
                  {ABOUT_FIRM.paragraph1}
                </p>
                <p>
                  {ABOUT_FIRM.paragraph2}
                </p>
              </div>
            </motion.div>

            {/* Right Block: Comprehensive summary details of litigation & banking client services */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 p-6 sm:p-8 bg-[#0b1424]/90 border border-white/5 rounded-lg text-left"
            >
              <span className="text-[10px] uppercase tracking-widest text-[#ffbc57] font-bold block mb-2">Practice Spectrum</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">Advisory & Litigation Desks</h3>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed mb-4">
                We offer a full range of corporate, commercial, civil & criminal legal services, particularly Corporate & Banking Laws litigation as well as an advisory side.
              </p>
              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                Our services to the financial institutions cover corporate matters and transaction-based legal opinions on Financial Agreements, documentations, mortgages, execution of documents, and verification of documents.
              </p>
            </motion.div>
          </div>

          {/* Premium Visual Divider */}
          <div className="flex items-center justify-center gap-6 max-w-2xl mx-auto py-10">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent flex-grow" />
            <div className="p-1 px-4 border border-gold/35 rounded-full bg-gold/5 text-gold text-[10px] tracking-widest uppercase font-sans font-extrabold flex items-center gap-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Chambers Dossier</span>
            </div>
            <div className="h-[1px] bg-gradient-to-l from-transparent via-gold/30 to-transparent flex-grow" />
          </div>

          {/* Firm Profile Dossier containing all interactive specifications */}
          <FirmProfile />

          {/* Separate Clients Section below Chambers Firm Profile */}
          <div className="w-full pt-16 mt-16 border-t border-white/5 overflow-hidden">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-2">
                Prestigious Representations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
                Our Clients
              </h3>
              <div className="w-12 h-[1px] bg-gold/50 mx-auto mt-3" />
            </div>

            {/* Infinite Horizontal Marquee */}
            <div className="relative w-full overflow-hidden py-8 bg-[#0b1324]/85 border-y border-gold/15 rounded-lg max-w-6xl mx-auto shadow-xl mb-12">
              {/* Luxury Ambient Masking Gradients */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-transparent to-transparent z-10 pointer-events-none" />

              <div className="flex w-max">
                <motion.div
                  className="flex whitespace-nowrap gap-12 sm:gap-16 items-center shrink-0 pr-12 sm:pr-16"
                  animate={{ x: [0, "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30, // Slightly slower, more elegant rotation
                    ease: "linear",
                  }}
                >
                  {/* Duplicate to ensure seamless looping without visual gaps */}
                  {[...OUR_CLIENTS, ...OUR_CLIENTS, ...OUR_CLIENTS, ...OUR_CLIENTS].map((client, index) => (
                    <div key={index} className="flex items-center gap-12 sm:gap-16 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0" />
                        <span className="font-serif text-[13px] sm:text-sm md:text-base font-bold tracking-widest text-[#fffdfa]/95 hover:text-gold transition-colors duration-200 uppercase">
                          {client}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Sector-specific Client lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 mb-8">
              {/* Financial Institutions */}
              <div className="bg-[#0b1324]/60 border border-gold/15 p-6 sm:p-8 rounded-lg flex flex-col hover:border-gold/30 transition-all duration-300">
                <h4 className="font-serif text-sm sm:text-base font-bold text-gold uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Financial Institutions
                </h4>
                <div className="flex-grow space-y-3">
                  {CLIENTS_BY_SECTOR.financial.map((client, index) => (
                    <div key={index} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                      <span className="text-white/85 text-xs sm:text-sm font-sans tracking-wide leading-relaxed">{client}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corporate & Institutional Clients */}
              <div className="bg-[#0b1324]/60 border border-gold/15 p-6 sm:p-8 rounded-lg flex flex-col hover:border-gold/30 transition-all duration-300">
                <h4 className="font-serif text-sm sm:text-base font-bold text-gold uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                  Corporate & Institutional Clients
                </h4>
                <div className="flex-grow space-y-3">
                  {CLIENTS_BY_SECTOR.corporate.map((client, index) => (
                    <div key={index} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                      <span className="text-white/85 text-xs sm:text-sm font-sans tracking-wide leading-relaxed">{client}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-sans">
                • Defense, Corporate counsel & Advisory partners nationwide •
              </span>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Leadership Directive & CEO Section */}
      <CEOSection />

      {/* 4. SECTION 3: ATTORNEYS DECK */}
      <section id="team" className="py-24 bg-[#070e1b] relative">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1324] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <Attorneys />
        </div>
      </section>

      {/* 5. DIRECT CONTACT SECURE Liaison & METROPOLITAN COORDINATES */}
      <span id="consultation" className="scroll-mt-24 pointer-events-none select-none h-0 w-0 block" />
      <ParallaxSection
        id="contact"
        backgroundImage={IMAGES.consultBg}
        heightClass="min-h-screen py-24"
        overlayOpacity="opacity-80"
        overlayColor="bg-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left info panel */}
          <div className="lg:col-span-6 space-y-10 text-left">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
                Secure Communication
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
                Chambers Liaison Desk
              </h2>
              <div className="w-20 h-[1.5px] bg-gold mb-8" />
              <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light">
                To preserve absolute solicitor-client privilege instantly and secure direct access, our chambers utilize a direct encrypted liaison desk, bridging elite counsel directly onto senior partner devices.
              </p>
            </div>

            {/* Lahore Chambers HQ Coordinates */}
            <div className="p-8 bg-[#0b1424]/95 border border-white/5 rounded-lg space-y-6 shadow-xl">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-3">
                Lahore Chambers (HQ)
              </h3>

              <div className="space-y-5 font-sans">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      Central Secretariat Location
                    </span>
                    <span className="block text-white/95 text-xs sm:text-sm leading-relaxed mt-1 font-medium">
                      Suite No.1, 236-Riwaz Garden<br />
                      Lahore, Pakistan
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      Direct Voiceline
                    </span>
                    <a href="tel:03218520085" className="block text-white/95 text-xs sm:text-sm font-mono hover:text-gold transition-colors mt-1 font-medium">
                      +92 (321) 852-0085
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      General Brief Archive
                    </span>
                    <a href="mailto:advisory@juslay.com" className="block text-white/95 text-xs sm:text-sm font-mono hover:text-gold transition-colors truncate mt-1 font-medium">
                      advisory@juslay.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Privilege Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Privilege Assured
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    Strict professional solicitor privilege protocols apply immediately to safeguard communications.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CalendarCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Partner Redirection
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    Your brief routes directly into executive partner devices for high-priority legal evaluation.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-6 flex justify-center w-full lg:sticky lg:top-28">
            <ConsultationForm />
          </div>
        </div>
      </ParallaxSection>

      {/* 6. SECURE FOOTER */}
      <footer className="bg-[#040811] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-10">
            
            {/* Left Brand block */}
            <div className="md:col-span-6 space-y-4 text-left">
              <div className="inline-block p-2 bg-[#fdfbf7] rounded-sm shadow-sm border border-gold/20">
                <img
                  src="https://images.pexels.com/photos/38052959/pexels-photo-38052959.png"
                  alt="Jus & Lay Logo"
                  className="h-[80px] sm:h-[96px] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-white/40 text-xs font-sans leading-relaxed max-w-sm">
                Corporate commercial counseling, civil & criminal advocacy, and services to financial institutions BOP & HBL under strict privilege.
              </p>
            </div>

            {/* Right certifications block */}
            <div className="md:col-span-6 flex justify-end text-left md:text-right">
              <div className="p-4 border border-white/5 bg-white/[0.01] rounded flex gap-3.5 max-w-md items-start">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1 text-left">
                  <span className="block text-[9px] uppercase font-bold text-gold tracking-wider">
                    Chambers Certifications
                  </span>
                  <span className="block text-[10px] text-white/45 font-sans leading-relaxed">
                    Advocates of the High Courts & Supreme Court of Pakistan. Certified representation across major financial and corporate sectors nationwide.
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
            <span className="text-[10px] text-white/30 font-sans tracking-wider text-left">
              © {new Date().getFullYear()} JUS & LAY. All corporate shields reserved.
            </span>
            
            <div className="flex items-center gap-4 text-[10px] font-sans font-semibold text-white/30">
              <a href="#about" onClick={(e) => handleCTABookScroll(e, "#about")} className="hover:text-gold hover:underline">Privilege Standard</a>
              <span>•</span>
              <a href="#firm-profile" onClick={(e) => handleCTABookScroll(e, "#firm-profile")} className="hover:text-gold hover:underline">Regulatory ComplianceDesk</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
