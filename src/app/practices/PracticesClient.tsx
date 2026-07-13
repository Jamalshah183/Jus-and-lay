"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FirmProfile from "../../components/FirmProfile";
import ParallaxSection from "../../components/ParallaxSection";
import { IMAGES } from "../../data";
import { motion } from "motion/react";
import { Scale, ShieldCheck, Briefcase, Landmark } from "lucide-react";

export default function PracticesPage() {
  const [activeTab, setActiveTab] = useState<"about" | "philosophy" | "practices" | "banking">("practices");
  
  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Banner for Practices page */}
      <ParallaxSection
        id="practices-hero"
        backgroundImage={IMAGES.practiceBg}
        heightClass="min-h-[45vh] pt-32 pb-20 flex items-center"
        overlayOpacity="opacity-80"
        overlayColor="bg-black"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block">
              Spectrum of Professional Competence
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Our Services & Practices
            </h1>
            <div className="w-20 h-[2px] bg-gold" />
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl font-light font-sans leading-relaxed">
              Advocating for financial institutes and corporate enterprises with unparalleled diligence across Pakistan's High Courts, SECP, FBR, and regulatory tribunals.
            </p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Interactive FirmProfile Display Component with custom tab selection */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
        <FirmProfile activeTab={activeTab} onTabChange={setActiveTab} />
      </section>

      {/* Strategic Practice Safeguards */}
      <section className="py-20 bg-[#040811] border-t border-b border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Litigation Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-wider">
              Legal Framework Security Protocols
            </h2>
            <div className="w-16 h-[1px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white/[0.01] border border-white/5 hover:border-gold/20 rounded-lg space-y-3 transition-all">
              <Scale className="w-6 h-6 text-gold" />
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">High Court Pleadings</h4>
              <p className="text-white/40 text-xs font-light leading-relaxed">Writs, injunctions, and stay appeals crafted to strict legal metrics under the CPC & High Court Rules.</p>
            </div>

            <div className="p-6 bg-white/[0.01] border border-white/5 hover:border-gold/20 rounded-lg space-y-3 transition-all">
              <ShieldCheck className="w-6 h-6 text-gold" />
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Corporate Diligence</h4>
              <p className="text-white/40 text-xs font-light leading-relaxed">Verification of titles, land registries, charge perfection, and mortgage credentials at supreme security.</p>
            </div>

            <div className="p-6 bg-white/[0.01] border border-white/5 hover:border-gold/20 rounded-lg space-y-3 transition-all">
              <Briefcase className="w-6 h-6 text-gold" />
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">SECP / FBR Compliance</h4>
              <p className="text-white/40 text-xs font-light leading-relaxed">Smooth statutory processing, NTN filings, and dispute defense counsel before tax appellate tribunals.</p>
            </div>

            <div className="p-6 bg-white/[0.01] border border-white/5 hover:border-gold/20 rounded-lg space-y-3 transition-all">
              <Landmark className="w-6 h-6 text-gold" />
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Banking Recovery Act</h4>
              <p className="text-white/40 text-xs font-light leading-relaxed">Aggressive litigative defense of multi-million recoveries under financial institutional enforcement laws.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
