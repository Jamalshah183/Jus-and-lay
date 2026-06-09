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
        heightClass="min-h-screen lg:h-screen pt-28 pb-32 lg:py-16"
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
              className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 items-stretch sm:items-center"
            >
              <a
                href="#consultation"
                onClick={(e) => handleCTABookScroll(e, "#consultation")}
                className="px-6 py-3.5 sm:px-8 sm:py-4 bg-gold text-navy font-extrabold text-[10px] sm:text-xs tracking-widest uppercase rounded-xs hover:bg-white hover:text-navy hover:shadow-[0_0_20px_rgba(255,188,87,0.45)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-navy shrink-0" />
                <span>WhatsApp Liaison</span>
              </a>
              
              <button
                onClick={(e) => handleCTABookScroll(e, "#practices")}
                className="px-6 py-3.5 sm:px-8 sm:py-4 border border-white/20 hover:border-gold hover:bg-white/5 text-white font-bold text-[10px] sm:text-xs tracking-widest uppercase rounded-xs transition-all duration-300 cursor-pointer text-center"
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

      {/* 7. COMBINED SECTION: DIRECT CONTACT & METROPOLITAN COORDINATES */}
      <span id="consultation" className="scroll-mt-24 pointer-events-none select-none h-0 w-0 block" />
      <ParallaxSection
        id="contact"
        backgroundImage={IMAGES.consultBg}
        heightClass="min-h-screen py-24"
        overlayOpacity="opacity-80"
        overlayColor="bg-black"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left info & coordinates panel */}
          <div className="lg:col-span-6 space-y-10 text-left">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
                Direct Contact Framework
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
                Connect Across Pakistan
              </h2>
              <div className="w-20 h-[1.5px] bg-gold mb-8" />
              <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light">
                To preserve absolute solicitor-client privilege instantly and skip vulnerable online databases, our chambers utilize a direct encrypted liaison desk, bridging elite counsel directly onto senior partner devices.
              </p>
            </div>

            {/* Lahore Chambers HQ Details */}
            <div className="p-8 bg-[#0b1424]/95 border border-white/5 rounded-xs space-y-6 shadow-xl">
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
                      Secure Corporate Voiceline
                    </span>
                    <a href="tel:03218520085" className="block text-white/95 text-xs sm:text-sm font-mono hover:text-gold transition-colors mt-1 font-medium">
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
                    <a href="mailto:advisory@juslay.pk" className="block text-white/95 text-xs sm:text-sm font-mono hover:text-gold transition-colors truncate mt-1 font-medium">
                      advisory@juslay.pk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Constitutional Privilege Assured
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    Strict professional solicitor privilege protocols apply immediately to safeguard communication confidentiality.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <CalendarCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-sans font-bold text-white uppercase tracking-wider mb-0.5">
                    Direct Partner Redirection
                  </span>
                  <span className="block text-white/50 text-xs font-sans leading-relaxed">
                    Your briefcase routes directly into active executive partner devices for high-priority evaluation.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form widget */}
          <div className="lg:col-span-6 flex justify-center w-full lg:sticky lg:top-28">
            <ConsultationForm />
          </div>
        </div>
      </ParallaxSection>

      {/* 9. SECURE FOOTER */}
      <footer className="bg-[#040811] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-10">
            
            {/* Left Brand block */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="inline-block p-4 bg-[#fdfbf7] rounded-sm shadow-md border border-gold/20">
                <img
                  src="https://images.pexels.com/photos/38039527/pexels-photo-38039527.png"
                  alt="Jus & Lay Law Conglomerate Logo"
                  className="h-[288px] sm:h-[336px] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
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
