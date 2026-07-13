"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConsultationForm from "../../components/ConsultationForm";
import ParallaxSection from "../../components/ParallaxSection";
import { IMAGES } from "../../data";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, Landmark } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#070e1b] text-white selection:bg-gold selection:text-navy selection:font-bold overflow-x-hidden font-sans">
      <Navbar />

      {/* Hero Banner for Contact Us */}
      <ParallaxSection
        id="contact-hero"
        backgroundImage={IMAGES.consultBg}
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
              Direct Encrypted Contact Channels
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Contact & Liaison Desk
            </h1>
            <div className="w-20 h-[2px] bg-gold" />
            <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl font-light font-sans leading-relaxed">
              Bridge the gap to elite High Court counsel instantly. Connect directly onto senior partner devices under absolute solicitor-client privilege.
            </p>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Main Coordinate Information & Contact Form */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left panel: Lahore Chambers coordinates */}
          <div className="lg:col-span-5 space-y-10 text-left">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
                Location Coordinates
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-6 uppercase tracking-wider">
                Lahore Secretariat (HQ)
              </h2>
              <div className="w-16 h-[1.5px] bg-gold mb-8" />
              <p className="font-sans text-white/70 text-sm sm:text-base leading-relaxed font-light">
                To guarantee secure operations, our central headquarters operate with responsive, physical legal desks, ensuring instant access for legal stay writs or banking litigations.
              </p>
            </div>

            {/* Coordinates Block */}
            <div className="p-8 bg-[#0b1424]/95 border border-gold/20 rounded-lg space-y-6 shadow-xl relative">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gold" />
              
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-3 uppercase tracking-wide">
                Chambers Directory
              </h3>

              <div className="space-y-6 font-sans">
                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      Central Secretariat Location
                    </span>
                    <a 
                      href="https://www.google.com/maps/place/Jus+and+Lay/@31.5602366,74.3043217,17z/data=!4m14!1m7!3m6!1s0x39191dd7ba1899a7:0x4b888ec740724623!2sJus+and+Lay!8m2!3d31.5602366!4d74.3043217!16s%2Fg%2F11zcs61zms!3m5!1s0x39191dd7ba1899a7:0x4b888ec740724623!8m2!3d31.5602366!4d74.3043217!16s%2Fg%2F11zcs61zms?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white/95 text-xs sm:text-sm leading-relaxed mt-1 font-medium hover:text-gold transition-colors hover:underline"
                    >
                      Suite No.1, 236-Riwaz Garden<br />
                      Lahore, Pakistan
                    </a>
                  </div>
                </div>

                {/* Telephone Desk */}
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      Chambers Landline Desk
                    </span>
                    <a href="tel:03218520085" className="block text-white/95 text-xs sm:text-sm font-mono hover:text-gold transition-colors mt-1 font-medium">
                      +92 (321) 852-0085
                    </a>
                  </div>
                </div>

                {/* Direct WhatsApp Link */}
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-1" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      WhatsApp Liaison
                    </span>
                    <a 
                      href="https://wa.me/923218520085"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white/95 text-xs sm:text-sm font-mono hover:text-[#25D366] transition-colors mt-1 font-medium"
                    >
                      Connect on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Email Desk */}
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#ffbc57] font-bold">
                      Secure Electronic Mail
                    </span>
                    <a href="mailto:info@jusandlay.com" className="block text-white/95 text-xs sm:text-sm hover:text-gold transition-colors mt-1 font-medium">
                      info@jusandlay.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality Standard */}
            <div className="p-6 bg-[#0b1424]/40 border border-white/5 rounded-lg flex gap-3">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-xs uppercase tracking-wider text-white font-extrabold mb-1">Confidential Liaison Guarantee</h4>
                <p className="text-[10px] text-white/40">Our communication desks process every submission under severe regulatory secrecy protocols to guard your business objectives perfectly.</p>
              </div>
            </div>
          </div>

          {/* Right panel: Direct Consultation request form */}
          <div className="lg:col-span-7 bg-[#0b1324]/95 border border-white/5 p-7 sm:p-10 rounded-lg shadow-2xl relative">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
              Secure Submission Portal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide">
              Request Advisory Session
            </h2>
            <p className="text-white/40 text-xs font-sans mb-8">
              Fill out the form below to register your enterprise case files. High Court defense attorneys will review and establish liaison.
            </p>
            <ConsultationForm />
          </div>

        </div>
      </section>

      {/* Google Maps Iframe Section */}
      <section className="w-full h-[400px] border-t border-b border-white/10 bg-[#060c18]">
        <iframe 
          title="Jus & Lay Chambers Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.3787720972373!2d74.30174677626947!3d31.560236574196144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191dd7ba1899a7%3A0x4b888ec740724623!2sJus+and+Lay!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </div>
  );
}
