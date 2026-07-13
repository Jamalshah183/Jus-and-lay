"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ParallaxSection from "../../components/ParallaxSection";
import { IMAGES, OUR_CLIENTS, CLIENTS_BY_SECTOR } from "../../data";
import { motion } from "motion/react";
import { Landmark, Briefcase, Building, Users, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Banner for Clients page */}
      <ParallaxSection
        id="clients-hero"
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
              Prestigious Representations
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Our Prestigious Clients
            </h1>
            <div className="w-20 h-[2px] bg-gold" />
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl font-light font-sans leading-relaxed">
              We represent top-tier corporate firms, national commercial banks, and key public entities in Lahore, Karachi, and Islamabad.
            </p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Dynamic Infinite Marquee list */}
      <section className="py-16 bg-[#040811] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-bold block mb-2">
            Seamless Nationwide Representations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            Clientele Showcase
          </h2>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto mt-2" />
        </div>

        {/* Infinite Horizontal Marquee */}
        <div className="relative w-full overflow-hidden py-10 bg-[#0b1324]/80 border-y border-gold/15 shadow-2xl">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-transparent to-transparent z-10 pointer-events-none" />

          <div className="flex w-max">
            <motion.div
              className="flex whitespace-nowrap gap-12 sm:gap-16 items-center shrink-0 pr-12 sm:pr-16"
              animate={{ x: [0, "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {[...OUR_CLIENTS, ...OUR_CLIENTS, ...OUR_CLIENTS, ...OUR_CLIENTS].map((client, index) => (
                <div key={index} className="flex items-center gap-12 sm:gap-16 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-gold rotate-45 shrink-0" />
                    <span className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#fffdfa]/95 hover:text-gold transition-colors duration-200 uppercase">
                      {client}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sector Specific Client breakdown */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Column 1: Financial Institutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0b1324]/80 border border-gold/20 p-8 sm:p-12 rounded-lg flex flex-col hover:border-gold/40 transition-all duration-300 relative shadow-xl"
          >
            <div className="absolute top-4 right-4 text-gold/20">
              <Landmark className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold uppercase tracking-wider mb-6 border-b border-white/5 pb-3">
              Financial Institutions
            </h3>
            <p className="text-white/50 text-xs sm:text-sm font-light mb-8 leading-relaxed">
              Serving as preferred panel legal advocates for major commercial, investment, and developmental banks in Pakistan under the Recovery of Finances Act 2001.
            </p>

            <div className="space-y-4">
              {CLIENTS_BY_SECTOR.financial.map((client, index) => (
                <div key={index} className="flex items-center gap-3.5 py-2.5 border-b border-white/5 last:border-0 hover:text-gold transition-colors">
                  <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                  <span className="text-white/90 text-xs sm:text-sm font-sans tracking-wide leading-relaxed font-semibold">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Corporate & Institutional Clients */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#0b1324]/80 border border-gold/20 p-8 sm:p-12 rounded-lg flex flex-col hover:border-gold/40 transition-all duration-300 relative shadow-xl"
          >
            <div className="absolute top-4 right-4 text-gold/20">
              <Building className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold uppercase tracking-wider mb-6 border-b border-white/5 pb-3">
              Corporate & Institutional Clients
            </h3>
            <p className="text-white/50 text-xs sm:text-sm font-light mb-8 leading-relaxed">
              Retained as legal advisors and compliance counsels for major industrial, housing, pharmaceutical, and business groups in Lahore, Rawalpindi, and Karachi.
            </p>

            <div className="space-y-4">
              {CLIENTS_BY_SECTOR.corporate.map((client, index) => (
                <div key={index} className="flex items-center gap-3.5 py-2.5 border-b border-white/5 last:border-0 hover:text-gold transition-colors">
                  <div className="w-2 h-2 bg-gold rounded-full shrink-0" />
                  <span className="text-white/90 text-xs sm:text-sm font-sans tracking-wide leading-relaxed font-semibold">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Standard of Confidentiality block */}
      <section className="py-20 bg-[#060c18] border-t border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <ShieldCheck className="w-12 h-12 text-gold mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            Sol-Client Privilege Standard
          </h3>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            To preserve the security of commercial enterprises and financial sectors, we hold our records with strict regulatory secrecy. Client files are locked onto air-gapped systems inside our Lahore headquarters, guaranteeing absolute professional protection.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
