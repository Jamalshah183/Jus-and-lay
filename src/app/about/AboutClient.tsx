"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CEOSection from "../../components/CEOSection";
import ParallaxSection from "../../components/ParallaxSection";
import { IMAGES, ABOUT_FIRM, OUR_PHILOSOPHY } from "../../data";
import { motion } from "motion/react";
import { Scale, ShieldCheck, Award, BookOpen, Star, Compass } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Banner for About Us */}
      <ParallaxSection
        id="about-hero"
        backgroundImage={IMAGES.aboutBg}
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
              Established Excellence
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
              About Our Chambers
            </h1>
            <div className="w-20 h-[2px] bg-gold" />
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl font-light font-sans leading-relaxed">
              Serving corporate enterprises, major public sector banks, and institutional clients across Pakistan with high-caliber trial advocacy and strategic counsel.
            </p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Main Corporate Overview Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Interactive dossier visual card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#0b1324]/95 border border-gold/25 p-8 sm:p-12 rounded-lg shadow-2xl relative"
          >
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-gold/40" />

            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Chambers Record
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6 uppercase tracking-wider">
              Legal Leadership in Pakistan
            </h2>
            <div className="w-16 h-[1.5px] bg-gold mb-8" />
            
            <div className="space-y-6 font-sans text-sm sm:text-base text-white/85 leading-relaxed font-light">
              <p>{ABOUT_FIRM.paragraph1}</p>
              <p>{ABOUT_FIRM.paragraph2}</p>
              <p>{ABOUT_FIRM.paragraph3}</p>
            </div>
          </motion.div>

          {/* Right: Quick metrics & core value highlight */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 bg-[#0b1424]/90 border border-white/5 rounded-lg text-left"
            >
              <span className="text-[10px] uppercase tracking-widest text-[#ffbc57] font-bold block mb-2">Practice Spectrum</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-4">Supreme Litigative Focus</h3>
              <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed mb-4">
                We manage heavy-demand corporate files, representing top commercial entities under strict confidentiality and absolute professional ethics.
              </p>
              <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                Our chambers boast extensive trial experiences in the High Courts of Sindh and Punjab, defending complex white-collar, regulatory compliance, and security enforcement frameworks.
              </p>
            </motion.div>

            {/* Core credentials bento grid item */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#0b1424]/40 border border-white/5 rounded-lg hover:border-gold/30 transition-colors">
                <Scale className="w-6 h-6 text-gold mb-3" />
                <h4 className="font-serif text-xs uppercase tracking-wider text-white font-extrabold mb-1">Trial Advocacy</h4>
                <p className="text-[10px] text-white/40">Aggressive defense & civil stay writs across all courts</p>
              </div>
              <div className="p-6 bg-[#0b1424]/40 border border-white/5 rounded-lg hover:border-gold/30 transition-colors">
                <ShieldCheck className="w-6 h-6 text-gold mb-3" />
                <h4 className="font-serif text-xs uppercase tracking-wider text-white font-extrabold mb-1">Corporate Counsel</h4>
                <p className="text-[10px] text-white/40">Regulatory advisories and FBR tax appeals councils</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Our Philosophy Block */}
      <section className="py-20 bg-[#060c18] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Chambers Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
              Our Commitments to Client Security
            </h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left font-sans font-light text-sm sm:text-base text-white/80 leading-relaxed">
              <p>{OUR_PHILOSOPHY.paragraph1}</p>
              <p>{OUR_PHILOSOPHY.paragraph2}</p>
            </div>

            <div className="space-y-4">
              {OUR_PHILOSOPHY.commitments.map((commitment, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-[#0b1324]/80 border border-gold/15 rounded-lg hover:border-gold/35 transition-colors text-left"
                >
                  <Compass className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-white/90 text-xs sm:text-sm font-sans font-semibold tracking-wide leading-relaxed">
                    {commitment}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEO Executive Statement */}
      <CEOSection />

      <Footer />
    </div>
  );
}
