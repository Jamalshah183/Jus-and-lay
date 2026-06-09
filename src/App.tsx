import React, { useState, useEffect } from "react";
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
  Star, 
  BookOpen, 
  Cpu, 
  ChevronRight, 
  MessageCircle, 
  CalendarCheck 
} from "lucide-react";

// Import custom components
import Navbar from "./components/Navbar";
import ParallaxSection from "./components/ParallaxSection";
import PracticeAreas from "./components/PracticeAreas";
import Attorneys from "./components/Attorneys";
import ConsultationForm from "./components/ConsultationForm";
import CEOSection from "./components/CEOSection";

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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

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
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      
      {/* 1. STICKY NAVBAR */}
      <Navbar />

      {/* 2. SECTION 1: HERO VIEW (Parallax Layered with true bottom Scroll Indicator) */}
      <ParallaxSection
        id="home"
        backgroundImage={IMAGES.heroBg}
        heightClass="h-screen py-16"
        overlayOpacity="opacity-60"
        overlayColor="bg-black"
        showScrollIndicator={true}
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
                Supreme Corporate Counsel
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-white"
            >
              Strategic Legal Solutions for <span className="text-gold gold-glow font-serif italic">Premier Enterprises</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans text-white/75 text-base sm:text-lg md:text-xl max-w-2xl font-light tracking-wide leading-relaxed"
            >
              Appellate Advocates | Corporate Solicitors | Tariff Consultants. We secure regulatory compliance and build defenses to shield major industrial assets.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              <a
                href="#consultation"
                onClick={(e) => handleCTABookScroll(e, "#consultation")}
                className="px-8 py-4 bg-gold text-navy font-extrabold text-xs tracking-widest uppercase rounded-xs hover:bg-white hover:text-navy hover:shadow-[0_0_20px_rgba(255,188,87,0.45)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-navy shrink-0" />
                <span>WhatsApp Liaison</span>
              </a>
              
              <button
                onClick={(e) => handleCTABookScroll(e, "#practices")}
                className="px-8 py-4 border border-white/20 hover:border-gold hover:bg-white/5 text-white font-bold text-xs tracking-widest uppercase rounded-xs transition-all duration-300 cursor-pointer"
              >
                Explore Practices
              </button>
            </motion.div>
          </div>
          
          <div className="hidden lg:block lg:col-span-4" />
        </div>
      </ParallaxSection>

      {/* 3. SECTION 2: ABOUT SECTION */}
      <ParallaxSection
        id="about"
        backgroundImage={IMAGES.aboutBg}
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
            className="lg:col-span-7 bg-[#0b1324]/95 border border-gold/25 p-8 sm:p-10 md:p-12 rounded-sm shadow-2xl gold-shadow relative"
          >
            {/* Visual gold corner brackets to depict luxury layout */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/45" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/45" />

            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Two Decades of Judicial Eminence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 animate-pulse" style={{ animationDuration: "6s" }}>
              Jus & Lay
            </h2>
            <div className="w-20 h-[1.5px] bg-gold mb-8" />
            
            <div className="space-y-6 font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light text-left">
              <p>
                Jus & Lay Law Conglomerate stands as a premier corporate law syndicate in Pakistan, delivering legal architecture for blue-chip companies, independent power producers (IPPs), multi-jurisdictional financiers, and industrial conglomerates.
              </p>
              <p>
                Operating with direct office structures in Lahore, Karachi, and Islamabad, we translate dense regulatory structures into actionable boardroom risk vectors. We avoid typical caseload volume, allowing our senior Supreme Court advocates to directly lead every transactional and appellate brief.
              </p>
            </div>

            {/* Quote block */}
            <div className="mt-8 p-5 rounded-xs border-l-2 border-gold bg-[#070e1b]/70 font-serif italic text-white/90 text-sm text-left">
              "We provide strategic sovereign safeguards to navigate intricate local mandates with total client confidentiality."
              <span className="block mt-2 text-[11px] uppercase tracking-wide text-gold font-sans font-bold not-italic">
                — Barrister Jamal M. Shah
              </span>
            </div>
          </motion.div>

          {/* Right Block: Stats block */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#0b1424]/90 border border-white/5 hover:border-gold/25 p-6 rounded-xs flex gap-4 hover:bg-[#0b1424]/40 transition-all duration-300 text-left"
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

      {/* Leadership Directive & CEO Interactive 3D Parallax Scroll Screen */}
      <CEOSection />

      {/* 4. SECTION 3: PRACTICE AREAS VIEW (Parallax Background) */}
      <ParallaxSection
        id="practices"
        backgroundImage={IMAGES.practiceBg}
        heightClass="min-h-screen py-24"
        overlayOpacity="opacity-75"
        overlayColor="bg-black"
      >
        <PracticeAreas />
      </ParallaxSection>

      {/* 5. SECTION 4: WHY CHOOSE US */}
      <section id="why-choose-us" className="py-24 bg-gradient-to-b from-[#070e1b] to-[#0b1324] relative overflow-hidden">
        
        {/* Subtle glowing lines vectors */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,188,87,0.03),transparent_40%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Our Professional Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Why Premier Corporations Appoint Us
            </h2>
            <div className="w-24 h-[2px] bg-gold mx-auto mb-8" />
            <p className="max-w-2xl mx-auto text-white/70 text-sm sm:text-base leading-relaxed font-sans">
              We leverage direct advisory models, eliminating standard communication friction with real-time reporting chambers and partner-level responsiveness.
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
                className="group p-8 bg-[#0b1424] border border-white/5 rounded-sm hover:border-gold/30 hover:bg-[#0f1d3a] transition-all duration-300 flex flex-col justify-between text-left"
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
          <div className="mt-20 max-w-4xl mx-auto bg-[#0b1424] p-8 md:p-12 border border-gold/20 rounded-sm shadow-xl relative overflow-hidden text-center">
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
                <div className="flex justify-center gap-1.5 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-gold stroke-none" />
                  ))}
                </div>
                <p className="font-serif italic text-base sm:text-lg md:text-xl text-white/95 leading-relaxed">
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

      {/* 6. SECTION 5: ATTORNEYS DECK */}
      <section id="team" className="py-24 bg-[#070e1b]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <Attorneys />
        </div>
      </section>

      {/* 7. SECTION 6: CONSULTATION ENCRYPTION FORM (WhatsApp-only custom widget) */}
      <ParallaxSection
        id="consultation"
        backgroundImage={IMAGES.consultBg}
        heightClass="min-h-screen py-24 animate-fade-in"
        overlayOpacity="opacity-75"
        overlayColor="bg-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info panel */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block">
              Direct Contact Framework
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Establish Privileged Dialogue
            </h2>
            <div className="w-20 h-[1.5px] bg-gold mb-8" />
            <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light">
              We process corporate intake files as high-priority briefs. To skip vulnerable online forms and secure attorney-client privilege instantly, we establish encrypted communication pathways directly on WhatsApp.
            </p>

            {/* Trust Assurances */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Constitutional Privilege Assured
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    By contacting, our professional chambers apply strict local and federal solicitor privilege protocols over all communications.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CalendarCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Direct Senior Partner Redirection
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    Your transmission routes directly onto executive partner devices for rapid operational evaluation and immediate response.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right form container holding custom interactive WhatsApp Liaison interface */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <ConsultationForm />
          </div>
        </div>
      </ParallaxSection>

      {/* 8. SECTION 7: CONTACT & SATELLITE AREA */}
      <section id="contact" className="py-24 bg-gradient-to-t from-[#040811] to-[#070e1b] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Metropolitan Chambers & Coordinates
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
              Connect Across Pakistan
            </h2>
            <div className="w-24 h-[2px] bg-gold mx-auto mb-8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left coordinate card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0b1424]/90 border border-white/5 p-8 rounded-sm space-y-8 shadow-xl text-left">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-4">
                  Lahore Chambers (HQ)
                </h3>

                <div className="space-y-6 font-sans">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                        Central Secretariat Location
                      </span>
                      <span className="block text-white/95 text-sm sm:text-base leading-relaxed mt-1 font-medium">
                        Suite No.1, 236-Riwaz Garden<br />
                        Lahore, Pakistan
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                        Secure Corporate Voiceline
                      </span>
                      <a href="tel:03218520085" className="block text-white/95 text-sm sm:text-base font-mono hover:text-gold transition-colors mt-1 font-medium">
                        +92 (32) 1852-0085
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                        General Brief Archive Registry
                      </span>
                      <a href="mailto:advisory@juslay.pk" className="block text-white/95 text-sm sm:text-base font-mono hover:text-gold transition-colors truncate mt-1 font-medium">
                        advisory@juslay.pk
                      </a>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10" />

                {/* Secure WhatsApp Action Link */}
                <div className="space-y-3">
                  <span className="block text-[10px] uppercase font-bold text-white/40 tracking-widest font-sans">
                    Intake Whatsapp Registry
                  </span>
                  <a
                    href="https://wa.me/923218520085?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20want%20to%20engage%20your%20legal%20counsel%20for%20enterprise%20consultancy."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3.5 py-3.5 bg-neutral-900 border border-[#2ecc71]/40 text-[#2ecc71] hover:bg-[#2ecc71]/10 hover:border-[#2ecc71] font-bold font-sans text-xs tracking-widest uppercase rounded-xs transition-all duration-300 cursor-pointer shadow-lg"
                  >
                    <MessageCircle className="w-4.5 h-4.5 text-[#2ecc71]" />
                    <span>Initiate WhatsApp Liaison</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Map Placeholder container */}
            <div className="lg:col-span-7 bg-[#0b1424]/90 border border-white/5 p-5 rounded-sm shadow-xl flex flex-col justify-between h-[450px]">
              <div className="relative w-full h-full bg-[#070e1b] border border-white/5 rounded-xs overflow-hidden flex items-center justify-center">
                
                {/* Simulated high-quality interactive Dark satellite coordinate HUD */}
                <div className="absolute inset-0 bg-[#050912] flex flex-col items-center justify-center p-8 text-center space-y-6">
                  
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
                      {/* Styled high-end SVG Dark map representation of Clifton/Secretariat Road Karachi */}
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

                        {/* Clifton coastal bay layout representation */}
                        <path d="M0,110 Q50,90 120,115 T200,105" fill="none" stroke="#2196f3" strokeWidth="3" opacity="0.15" />
                        
                        {/* Harbour Sector */}
                        <rect x="145" y="10" width="30" height="30" fill="#ffbc57" opacity="0.05" stroke="#ffbc57" strokeWidth="0.2" />

                        {/* Animated radar circle */}
                        <circle cx="80" cy="45" r="12" fill="none" stroke="#ffbc57" strokeWidth="0.4">
                          <animate attributeName="r" values="5;20;5" dur="4s" repeatCount="indefinite" />
                        </circle>
                        {/* Static point */}
                        <circle cx="80" cy="45" r="2.5" fill="#ffbc57" />
                      </svg>

                      {/* Info coordinates overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6">
                        <div className="flex justify-between items-start">
                          <div className="text-left">
                            <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold font-sans">
                              Satellite Secretariat Feed
                            </span>
                            <span className="block text-white/50 text-[10px] font-mono mt-0.5">
                              LAT 31.5204° N, LON 74.3587° E
                            </span>
                          </div>
                          <span className="text-[10px] bg-gold/15 text-gold border border-gold/20 px-2 py-0.5 rounded-sm font-bold font-sans">
                            HD REGIONAL MAP
                          </span>
                        </div>

                        <div className="bg-[#0b1424]/95 border border-gold/30 p-4 rounded-xs text-left max-w-sm self-center">
                          <span className="block text-[10px] font-bold text-gold uppercase tracking-wider font-sans mb-1">
                            Lahore secretariat pin
                          </span>
                          <span className="block text-white/80 text-xs font-sans leading-relaxed">
                            Suite No.1, 236-Riwaz Garden. Private meeting chambers and secure advisor coordinates inside Lahore's historic legal district.
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
                          Aesthetic Secretariat Vector Map
                        </h4>
                        <p className="text-white/50 text-xs font-sans max-w-sm leading-relaxed">
                          For high confidentiality standards and to prevent unsecured tracking vectors, we utilize stylized offline coordinate vectors.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsMapLoaded(true)}
                        className="px-6 py-2.5 bg-gold text-navy font-bold font-sans text-xs tracking-wider uppercase rounded-xs hover:bg-white hover:text-navy transition-all focus:outline-none cursor-pointer"
                      >
                        Mount Secretariat Feed
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
      <footer className="bg-[#040811] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-10">
            
            {/* Left Brand block */}
            <div className="md:col-span-5 space-y-4 text-left">
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
                Strategic corporate advice, high-stakes FBR/regulatory litigation defense, and premier project transactions under absolute privilege.
              </p>
            </div>

            {/* Mid Links block */}
            <div className="md:col-span-3 flex justify-start md:justify-center gap-8 text-xs font-sans font-medium text-white/50">
              <div className="flex flex-col gap-2.5 text-left">
                <a href="#about" onClick={(e) => handleCTABookScroll(e, "#about")} className="hover:text-gold transition-colors">The Sessions</a>
                <a href="#practices" onClick={(e) => handleCTABookScroll(e, "#practices")} className="hover:text-gold transition-colors">Our Practice Grid</a>
              </div>
              <div className="flex flex-col gap-2.5 text-left">
                <a href="#team" onClick={(e) => handleCTABookScroll(e, "#team")} className="hover:text-gold transition-colors">Lead Partners</a>
                <a href="#consultation" onClick={(e) => handleCTABookScroll(e, "#consultation")} className="hover:text-gold transition-colors">WhatsApp Secure</a>
              </div>
            </div>

            {/* Right certifications block */}
            <div className="md:col-span-4 flex justify-end text-left">
              <div className="p-4 border border-white/5 bg-white/[0.01] rounded-xs flex gap-3.5 max-w-sm items-start">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="block text-[9px] uppercase font-bold text-gold tracking-wider">
                    Sovereign Guard Certifications
                  </span>
                  <span className="block text-[10px] text-white/45 font-sans leading-relaxed">
                    Advocates of the High Courts & Supreme Court of Pakistan. Licensed to represent key infrastructure & financial sectors globally.
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
            <span className="text-[10px] text-white/30 font-sans tracking-wider text-left">
              © {new Date().getFullYear()} Jus & Lay Law Conglomerate. All corporate shields reserved.
            </span>
            
            <div className="flex items-center gap-4 text-[10px] font-sans font-semibold text-white/30">
              <a href="#about" onClick={(e) => handleCTABookScroll(e, "#about")} className="hover:text-gold hover:underline">Privilege Standard</a>
              <span>•</span>
              <a href="#practices" onClick={(e) => handleCTABookScroll(e, "#practices")} className="hover:text-gold hover:underline">Regulatory Compliance</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
