import React, { useState, useEffect } from "react";
import { ConsultationRequest } from "./types";
import { IMAGES, WHY_CHOOSE_US, STATS, TESTIMONIALS } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink,
  Star,
  BookOpen,
  HelpCircle,
  Cpu,
  ChevronRight,
  MessageCircle,
  Volume2,
  CalendarCheck
} from "lucide-react";

// Import custom components
import Navbar from "./components/Navbar";
import ParallaxSection from "./components/ParallaxSection";
import PracticeAreas from "./components/PracticeAreas";
import Attorneys from "./components/Attorneys";
import ConsultationForm from "./components/ConsultationForm";
import ConsultationsListModal from "./components/ConsultationsListModal";

// Helper to map dynamic Lucide icon strings to components for STATS
const getStatIcon = (iconName: string) => {
  switch (iconName) {
    case "Award":
      return <Award className="w-5 h-5 text-gold shrink-0 mt-1" />;
    case "Briefcase":
      return <Briefcase className="w-5 h-5 text-gold shrink-0 mt-1" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-1" />;
    case "Globe":
      return <Globe className="w-5 h-5 text-gold shrink-0 mt-1" />;
    default:
      return <Award className="w-5 h-5 text-gold shrink-0 mt-1" />;
  }
};

// Map dynamic Lucide icon strings to components for WHY_CHOOSE_US
const getWhyIcon = (iconName: string) => {
  switch (iconName) {
    case "ChevronRight":
      return <BookOpen className="w-5 h-5 text-gold" />;
    case "Shield":
      return <ShieldCheck className="w-5 h-5 text-gold" />;
    case "UserCheck":
      return <Award className="w-5 h-5 text-gold" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-gold" />;
    default:
      return <ChevronRight className="w-5 h-5 text-gold" />;
  }
};

export default function App() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Initialize and load any submitted requests from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("jus_lay_docket");
      if (stored) {
        setRequests(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to recover local docket ledger", err);
    }
  }, []);

  const handleNewRequest = (newRequest: ConsultationRequest) => {
    const updated = [newRequest, ...requests];
    setRequests(updated);
    try {
      localStorage.setItem("jus_lay_docket", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save client brief to local ledger", err);
    }
  };

  const handleRemoveRequest = (id: string) => {
    const filtered = requests.filter((r) => r.id !== id);
    setRequests(filtered);
    try {
      localStorage.setItem("jus_lay_docket", JSON.stringify(filtered));
    } catch (err) {
      console.error("Failed to purge client brief from local ledger", err);
    }
  };

  const handleCTABookScroll = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80; // offset for sticky navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1e38] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      
      {/* 1. STICKY NAVBAR */}
      <Navbar 
        onOpenConsultationsHistory={() => setIsHistoryOpen(true)} 
        consultationCount={requests.length} 
      />

      {/* 2. SECTION 1: HERO VIEW (Parallax Layered) */}
      <ParallaxSection
        id="home"
        backgroundImage={IMAGES.heroBg}
        midgroundAlign="right"
        midgroundSpeedMultiplier={-200}
        heightClass="h-screen py-16"
        overlayOpacity="opacity-60"
        overlayColor="bg-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-16">
          <div className="lg:col-span-8 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 border border-gold/30 rounded-full bg-gold/10 backdrop-blur-sm shadow-sm"
            >
              <Scale className="w-4 h-4 text-gold animate-bounce" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] font-sans font-bold uppercase text-gold">
                International Corporate Shield
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-white"
            >
              Strategic Legal Solutions for <span className="text-gold gold-glow font-serif italic">Businesses</span> & Individuals
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-white/75 text-base sm:text-lg md:text-xl max-w-2xl font-light tracking-wide leading-relaxed"
            >
              Advocates | Solicitors | Corporate Consultants. We build formidable legal defenses and strategic treaties to protect sovereign assets.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              <button
                onClick={(e) => handleCTABookScroll(e, "#consultation")}
                className="px-8 py-4 bg-gold text-navy font-bold text-xs tracking-widest uppercase rounded-xs hover:bg-white hover:text-navy hover:shadow-[0_0_20px_rgba(255,188,87,0.45)] transition-all duration-300 cursor-pointer"
              >
                Book Consultation
              </button>
              
              <button
                onClick={(e) => handleCTABookScroll(e, "#practices")}
                className="px-8 py-4 border border-white/20 hover:border-gold hover:bg-white/5 text-white font-bold text-xs tracking-widest uppercase rounded-xs transition-all duration-300 cursor-pointer"
              >
                Explore Services
              </button>
            </motion.div>
          </div>
          
          <div className="hidden lg:block lg:col-span-4" />
        </div>

        {/* Scroll down indicator absolute */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">
            Scroll To Brief
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </ParallaxSection>

      {/* 3. SECTION 2: ABOUT SECTION (Parallax Layered) */}
      <ParallaxSection
        id="about"
        backgroundImage={IMAGES.aboutBg}
        midgroundIcon="scales"
        midgroundAlign="left"
        midgroundSpeedMultiplier={-160}
        heightClass="min-h-screen py-24 flex items-center"
        overlayOpacity="opacity-70"
        overlayColor="bg-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Block: Floating content container with intro */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#122444]/95 border border-gold/25 p-8 sm:p-10 md:p-12 rounded-sm shadow-2xl gold-shadow relative"
          >
            {/* Visual gold corner brackets to depict luxury layout */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/45" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/45" />

            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Decade of Judicial Eminence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Jus & Lay Law Conglomerate
            </h2>
            <div className="w-20 h-[1.5px] bg-gold mb-8" />
            
            <div className="space-y-6 font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
              <p>
                Jus & Lay represents the peak of modern jurisprudential safety, commercial strategy, and multi-disciplinary defense. Bound strictly to defense excellence, we help international entrepreneurs, real-estate trusts, and corporate families navigate legislative complexity with complete asset preservation.
              </p>
              <p>
                Our philosophy prioritizes precision execution over file volume. We intentionally restrict card indices to deploy premium senior trial partners directly onto every case, providing deep academic counsel coupled with dynamic trial engineering.
              </p>
            </div>

            {/* Quote block */}
            <div className="mt-8 p-5 rounded-xs border-l-2 border-gold bg-navy/50 font-serif italic text-white/90 text-sm">
              "We perform not simply as external attorneys, but as custom strategic architects of your sovereign interests."
              <span className="block mt-2 text-[11px] uppercase tracking-wide text-gold font-sans font-bold not-italic">
                — Marcus J. Jus, Esq.
              </span>
            </div>
          </motion.div>

          {/* Right Block: Stats block showing 10+ experience handles */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-navy-dark/85 border border-white/5 hover:border-gold/25 p-6 rounded-xs flex gap-4 hover:bg-navy-light/10 transition-all duration-300"
              >
                <div className="p-2 border border-gold/20 rounded-xs bg-gold/10 text-gold h-fit">
                  {getStatIcon(stat.icon)}
                </div>
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl font-extrabold text-gold tracking-tight mb-1">
                    {stat.value}
                  </span>
                  <span className="block text-white/60 text-xs font-sans tracking-wide font-medium leading-snug">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* 4. SECTION 3: PRACTICE AREAS VIEW (Parallax Background) */}
      <ParallaxSection
        id="practices"
        backgroundImage={IMAGES.practiceBg}
        midgroundIcon="lady-justice"
        midgroundAlign="right"
        midgroundSpeedMultiplier={-180}
        heightClass="min-h-screen py-24"
        overlayOpacity="opacity-75"
        overlayColor="bg-black"
      >
        <PracticeAreas />
      </ParallaxSection>

      {/* 5. SECTION 4: WHY CHOOSE US (High-end Layered Grid) */}
      <section id="why-choose-us" className="py-24 bg-gradient-to-b from-[#0f1e38] to-[#122444] relative overflow-hidden">
        
        {/* Subtle glowing lines vectors */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,188,87,0.05),transparent_40%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Structural Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Why Elite Entities Appoint Us
            </h2>
            <div className="w-24 h-[2px] bg-gold mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-white/70 text-sm sm:text-base leading-relaxed font-sans">
              Our structures replace traditional billing benchmarks with high-velocity accountability, secure digital integrations, and partner lead priority.
            </p>
          </div>

          {/* Core Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group p-8 bg-navy-dark border border-white/5 rounded-sm hover:border-gold/30 hover:bg-[#122444] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="p-3 border border-gold/25 rounded-xs w-fit bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy transition-all duration-300">
                    {getWhyIcon(item.icon)}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
                <div className="w-12 h-[1px] bg-gold/40 group-hover:w-full transition-all duration-500 mt-8" />
              </motion.div>
            ))}
          </div>

          {/* Testimonial slider / showcase inline */}
          <div className="mt-20 max-w-4xl mx-auto bg-navy-dark/90 p-8 md:p-12 border border-gold/20 rounded-sm shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-gold/5 pointer-events-none font-serif text-9xl">
              ”
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 focus:outline-none"
              >
                <div className="flex gap-1.5 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold stroke-none" />
                  ))}
                </div>
                <p className="font-serif italic text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                  "{TESTIMONIALS[activeTestimonial].quote}"
                </p>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                    {TESTIMONIALS[activeTestimonial].author}
                  </h4>
                  <span className="text-xs text-gold font-sans">
                    {TESTIMONIALS[activeTestimonial].role} at <span className="font-semibold">{TESTIMONIALS[activeTestimonial].company}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Dot controls */}
            <div className="flex justify-center gap-2.5 mt-8 border-t border-white/5 pt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                    activeTestimonial === i ? "bg-gold w-6" : "bg-white/20 hover:bg-white/45"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 5: ATTORNEYS DECK (Elegant Grid layout) */}
      <section id="team" className="py-24 bg-[#0f1e38]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <Attorneys />
        </div>
      </section>

      {/* 7. SECTION 6: CONSULTATION ENCRYPTION FORM (Parallax Background) */}
      <ParallaxSection
        id="consultation"
        backgroundImage={IMAGES.consultBg}
        midgroundIcon="scales"
        midgroundAlign="center"
        midgroundSpeedMultiplier={-220}
        heightClass="min-h-screen py-24"
        overlayOpacity="opacity-75"
        overlayColor="bg-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info panel */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block">
              Direct Contact Pipeline
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Establish Privileged Dialogue
            </h2>
            <div className="w-20 h-[1.5px] bg-gold mb-8" />
            <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light">
              We process consultation filings as high-priority docket entries. Once submitted, your briefing statement is synchronized directly to senior executive portfolios for immediate forensic evaluation.
            </p>

            {/* Quick trust assurances */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Attorney-Client Privilege Assured
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    By submitting, our standard nondisclosure protocol forms protective legal boundaries over client materials dynamically.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CalendarCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Guaranteed 6-Hour Response Standard
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    Our on-call managing partner directly dials coordinates to finalize immediate appointment slots.
                  </span>
                </div>
              </div>
            </div>

            {/* Active Ledger stats if any */}
            {requests.length > 0 && (
              <div className="mt-8 p-4 bg-navy-dark/70 border border-gold/20 rounded-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase font-bold text-gold tracking-widest font-sans">
                    Active Session Ledger
                  </span>
                  <span className="block font-serif text-sm font-bold text-white">
                    You have securely filed {requests.length} brief(s)
                  </span>
                </div>
                <button
                  onClick={() => setIsHistoryOpen(true)}
                  className="px-4 py-2 bg-gold/15 text-gold hover:bg-gold hover:text-navy font-bold font-sans text-xs tracking-wider uppercase rounded-xs transition-colors focus:outline-none"
                >
                  View My Docket
                </button>
              </div>
            )}
          </div>

          {/* Right form container */}
          <div className="lg:col-span-6 flex justify-center">
            <ConsultationForm onSubmitSuccess={handleNewRequest} />
          </div>
        </div>
      </ParallaxSection>

      {/* 8. SECTION 7: CONTACT & SATELLITE AREA (Google maps vector & coordinates) */}
      <section id="contact" className="py-24 bg-gradient-to-t from-[#0b1424] to-[#0f1e38] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Chambers & Coordinates
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Connect Globally
            </h2>
            <div className="w-24 h-[2px] bg-gold mx-auto mb-8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left coordinate card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#122444]/65 border border-white/5 p-8 rounded-sm space-y-8 shadow-xl">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-4">
                  Metropolitan HQ Location
                </h3>

                <div className="space-y-6 font-sans">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                        Global Headquarters
                      </span>
                      <span className="block text-white/95 text-sm sm:text-base leading-relaxed mt-1 font-medium">
                        Metropolitan Legal Chambers<br />
                        Corporate Tower 4, Suite 800<br />
                        New York, NY 10001
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                        Secure Switched Voiceline
                      </span>
                      <a href="tel:+18005550391" className="block text-white/95 text-sm sm:text-base font-mono hover:text-gold transition-colors mt-1 font-medium">
                        +1 (800) 555-0391
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                        General Brief Archive Registry
                      </span>
                      <a href="mailto:council@juslayconglomerate.com" className="block text-white/95 text-sm sm:text-base font-mono hover:text-gold transition-colors truncate mt-1 font-medium">
                        council@juslayconglomerate.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10" />

                {/* Instant WhatsApp link as requested in guidelines */}
                <div className="space-y-3">
                  <span className="block text-[10px] uppercase font-bold text-white/40 tracking-widest font-sans">
                    Immediate Messenger Channel
                  </span>
                  <a
                    href="https://wa.me/18005550391?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20I'd%20like%20to%20schedule%20a%20partner%20briefing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3.5 py-3.5 bg-neutral-900 border border-[#2ecc71]/40 text-[#2ecc71] hover:bg-[#2ecc71]/10 hover:border-[#2ecc71] font-bold font-sans text-xs tracking-widest uppercase rounded-xs transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <MessageCircle className="w-4.5 h-4.5 text-[#2ecc71]" />
                    <span>Initiate Secure WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Map Placeholder container */}
            <div className="lg:col-span-7 bg-[#122444]/65 border border-white/5 p-5 rounded-sm shadow-xl flex flex-col justify-between h-[450px]">
              <div className="relative w-full h-full bg-[#0b1424] border border-white/5 rounded-xs overflow-hidden flex items-center justify-center">
                
                {/* Simulated high-quality interactive Dark satellite coordinate HUD */}
                <div className="absolute inset-0 bg-[#070e1b] flex flex-col items-center justify-center p-8 text-center space-y-6">
                  
                  {/* Decorative radar pulses */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,188,87,0.02)_10%,transparent_70%)] pointer-events-none" />

                  {/* Satellite line grids overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  {isMapLoaded ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-full relative"
                    >
                      {/* Fully styled high-end SVG Dark map representation of NY/Manhattan street coordinate */}
                      <svg width="100%" height="100%" viewBox="0 0 200 120" className="opacity-40">
                        {/* Street lines */}
                        <line x1="0" y1="20" x2="200" y2="20" stroke="#ffbc57" strokeWidth="0.3" strokeDasharray="1 3" />
                        <line x1="0" y1="45" x2="200" y2="45" stroke="white" strokeWidth="0.15" />
                        <line x1="0" y1="70" x2="200" y2="70" stroke="white" strokeWidth="0.15" />
                        <line x1="0" y1="95" x2="200" y2="95" stroke="white" strokeWidth="0.1" />

                        <line x1="30" y1="0" x2="30" y2="120" stroke="white" strokeWidth="0.15" />
                        <line x1="80" y1="0" x2="80" y2="120" stroke="#ffbc57" strokeWidth="0.4" strokeDasharray="1 4" />
                        <line x1="130" y1="0" x2="130" y2="120" stroke="white" strokeWidth="0.15" />
                        <line x1="170" y1="0" x2="170" y2="120" stroke="white" strokeWidth="0.1" />

                        {/* Central park sector representation */}
                        <rect x="95" y="30" width="20" height="30" fill="#2ecc71" opacity="0.08" stroke="#2ecc71" strokeWidth="0.2" />

                        {/* Animated radar circle */}
                        <circle cx="80" cy="45" r="12" fill="none" stroke="#ffbc57" strokeWidth="0.4">
                          <animate attributeName="r" values="5;20;5" dur="4s" repeatCount="indefinite" />
                        </circle>
                        {/* Static point */}
                        <circle cx="80" cy="45" r="2.5" fill="#ffbc57" />
                      </svg>

                      {/* Info coordinates overlay overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start">
                          <div className="text-left">
                            <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold font-sans">
                              Satellite Feed Live
                            </span>
                            <span className="block text-white/50 text-[10px] font-mono mt-0.5">
                              LAT 40.7128° N, LON 74.0060° W
                            </span>
                          </div>
                          <span className="text-[10px] bg-gold/15 text-gold border border-gold/20 px-2 py-0.5 rounded-sm font-bold font-sans">
                            HD MAP
                          </span>
                        </div>

                        <div className="bg-navy-dark/95 border border-gold/30 p-4 rounded-xs text-left max-w-sm self-center">
                          <span className="block text-[10px] font-bold text-gold uppercase tracking-wider font-sans mb-1">
                            Metropolitan HQ Pin
                          </span>
                          <span className="block text-white/80 text-xs font-sans leading-relaxed">
                            Secured Legal Chambers - Suite 800. Heliport entry and internal private parking available via corporate swipe credentials.
                          </span>
                        </div>

                        <div className="text-right">
                          <button
                            onClick={() => setIsMapLoaded(false)}
                            className="text-[9px] text-[#ffdddd] hover:text-white underline bg-transparent border-none cursor-pointer focus:outline-none"
                          >
                            Reset Vector coordinates
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="p-4 rounded-full border border-gold/25 bg-gold/5 flex items-center justify-center text-gold shadow-sm">
                        <Globe className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-white">
                          Aesthetic Vector Map Pipeline
                        </h4>
                        <p className="text-white/50 text-xs font-sans max-w-sm leading-relaxed">
                          For strict regulatory compliance and to avoid unsecured third-party trackers, we render locations via sanitized vector matrices.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsLoadingMapFeed()}
                        className="px-6 py-2.5 bg-gold text-navy font-bold font-sans text-xs tracking-wider uppercase rounded-xs hover:bg-white hover:text-navy transition-all focus:outline-none cursor-pointer"
                      >
                        Mount Coordinate Feed
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. SECURE FOOTER */}
      <footer className="bg-navy-dark border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-10">
            
            {/* Left Brand block */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-gold/35 rounded-sm bg-navy-dark">
                  <Scale className="w-5 h-5 text-gold" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-white uppercase">
                    Jus & Lay
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.35em] text-gold/80 font-bold font-sans">
                    Law Conglomerate
                  </span>
                </div>
              </div>
              <p className="text-white/40 text-xs font-sans leading-relaxed max-w-sm">
                Strategic counsel, high-level structural auditing, and master-level litigative advocacy. Serving international clients under absolute privilege.
              </p>
            </div>

            {/* Mid Links block */}
            <div className="md:col-span-3 flex justify-start md:justify-center gap-8 text-xs font-sans font-medium text-white/50">
              <div className="flex flex-col gap-2.5">
                <a href="#about" onClick={(e) => handleCTABookScroll(e, "#about")} className="hover:text-gold transition-colors">The Firm</a>
                <a href="#practices" onClick={(e) => handleCTABookScroll(e, "#practices")} className="hover:text-gold transition-colors">Our Practice Grid</a>
              </div>
              <div className="flex flex-col gap-2.5">
                <a href="#team" onClick={(e) => handleCTABookScroll(e, "#team")} className="hover:text-gold transition-colors">Partner Panel</a>
                <a href="#consultation" onClick={(e) => handleCTABookScroll(e, "#consultation")} className="hover:text-gold transition-colors">Secure Uplink</a>
              </div>
            </div>

            {/* Right certifications block */}
            <div className="md:col-span-4 flex justify-end">
              <div className="p-4 border border-white/5 bg-white/[0.01] rounded-xs flex gap-3.5 max-w-sm items-start">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block text-[9px] uppercase font-bold text-gold tracking-wider">
                    Sovereign Guard Certifications
                  </span>
                  <span className="block text-[10px] text-white/45 font-sans leading-relaxed">
                    Licensed to practice across State & Federal levels, appellate circuit courts of appeals, and international arbitral courts.
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
            <span className="text-[10px] text-white/30 font-sans tracking-wider">
              © {new Date().getFullYear()} Jus & Lay Law Conglomerate. All corporate shields reserved.
            </span>
            
            <div className="flex items-center gap-4 text-[10px] font-sans font-semibold text-white/30">
              <a href="#about" onClick={(e) => handleCTABookScroll(e, "#about")} className="hover:text-gold hover:underline">Privilege Protocols</a>
              <span>•</span>
              <a href="#practices" onClick={(e) => handleCTABookScroll(e, "#practices")} className="hover:text-gold hover:underline">Regulatory Compliance</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. ACTIVE LEDGER BRIEFINGS PANEL MODAL */}
      <AnimatePresence>
        {isHistoryOpen && (
          <ConsultationsListModal
            onClose={() => setIsHistoryOpen(false)}
            requests={requests}
            onRemoveRequest={handleRemoveRequest}
          />
        )}
      </AnimatePresence>

    </div>
  );

  // Helper trigger to simulate mounting coordinates
  function setIsLoadingMapFeed() {
    setIsMapLoaded(true);
  }
}
