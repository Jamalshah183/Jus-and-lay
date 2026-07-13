"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Attorneys from "../../components/Attorneys";
import ParallaxSection from "../../components/ParallaxSection";
import { IMAGES } from "../../data";
import { motion } from "motion/react";
import { Award, ShieldCheck, Scale, Landmark } from "lucide-react";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Banner for Team page */}
      <ParallaxSection
        id="team-hero"
        backgroundImage={IMAGES.aboutBg}
        heightClass="min-h-[45vh] pt-32 pb-20 flex items-center"
        overlayOpacity="opacity-85"
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
              Elite High Court trial Advocates
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Of Counsel & Partners
            </h1>
            <div className="w-20 h-[2px] bg-gold" />
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl font-light font-sans leading-relaxed">
              Meet our team of corporate legal consultants, banking defense experts, and trial advocates representing public and private enterprises nationwide.
            </p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Main Attorneys Display Component */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <Attorneys />
        </div>
      </section>

      {/* High Court Legal Integrities */}
      <section className="py-24 bg-[#040811] border-t border-b border-white/5 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Metric Card 1 */}
            <div className="p-8 border border-white/5 bg-white/[0.01] rounded-lg space-y-4 hover:border-gold/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gold/5 border border-gold/35 rounded flex items-center justify-center">
                <Scale className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Supreme Professionalism
              </h3>
              <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
                Our advocates combine robust academic legal credentials with centuries-old legal traditions of precision and absolute integrity before the High Courts & Supreme Court of Pakistan.
              </p>
            </div>

            {/* Metric Card 2 */}
            <div className="p-8 border border-white/5 bg-white/[0.01] rounded-lg space-y-4 hover:border-gold/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gold/5 border border-gold/35 rounded flex items-center justify-center">
                <Landmark className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Banking Defense Specialists
              </h3>
              <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
                Armed with deep proficiency in corporate financial recoveries, mortgage invalidations, title deed verifications, and FBR tax defense procedures.
              </p>
            </div>

            {/* Metric Card 3 */}
            <div className="p-8 border border-white/5 bg-white/[0.01] rounded-lg space-y-4 hover:border-gold/30 transition-all duration-300">
              <div className="w-12 h-12 bg-gold/5 border border-gold/35 rounded flex items-center justify-center">
                <Award className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Uncompromising Shield
              </h3>
              <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
                Operating with custom server database protocols to keep all documents, files, title records, and credentials stored under top-grade encrypted safety.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
