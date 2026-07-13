"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#040811] border-t border-white/10 py-16 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 border-b border-white/5 pb-12">
          
          {/* Column 1: Brand block */}
          <div className="col-span-1 sm:col-span-2 md:col-span-4 space-y-4">
            <div className="inline-block p-2 bg-[#fdfbf7] rounded-sm shadow-sm border border-gold/20">
              <Link href="/">
                <img
                  src="https://images.pexels.com/photos/38052959/pexels-photo-38052959.png"
                  alt="Jus & Lay Logo"
                  className="h-[76px] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </Link>
            </div>
            <p className="text-white/40 text-xs font-sans leading-relaxed max-w-sm">
              Supreme corporate counsel, banking litigation defense, commercial advice, and nationwide trials before the High Courts & Supreme Court of Pakistan.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61591562501090#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full border border-white/10 hover:border-gold text-white/50 hover:text-gold hover:bg-gold/5 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/jus.and.lay/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full border border-white/10 hover:border-gold text-white/50 hover:text-gold hover:bg-gold/5 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 space-y-4">
            <h4 className="font-serif text-[11px] uppercase font-extrabold text-gold tracking-widest">
              Chambers Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-white/50">
              <li>
                <Link href="/" className="hover:text-gold transition-colors block">
                  Home Gateway
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors block">
                  About Chambers
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-gold transition-colors block">
                  Of Counsel & Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors block">
                  Liaison & Location
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-gold transition-colors block font-semibold text-gold">
                  Website Directory & Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Practices & Desks */}
          <div className="col-span-1 sm:col-span-1 md:col-span-3 space-y-4">
            <h4 className="font-serif text-[11px] uppercase font-extrabold text-gold tracking-widest">
              Practice Core
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-white/50">
              <li>
                <Link href="/practices" className="hover:text-gold transition-colors block font-semibold text-white/60">
                  Practice Areas Core
                </Link>
              </li>
              <li>
                <Link href="/practices" className="hover:text-gold transition-colors block">
                  Banking & Finance Desk
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors block">
                  Chambers History
                </Link>
              </li>
              <li>
                <Link href="/practices" className="hover:text-gold transition-colors block">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-gold transition-colors block">
                  Our Prestigious Clients
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Certification block */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 space-y-4">
            <h4 className="font-serif text-[11px] uppercase font-extrabold text-gold tracking-widest">
              Enforcement & Integrity
            </h4>
            <div className="p-3.5 border border-white/5 bg-white/[0.01] rounded flex gap-2.5 items-start">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block text-[8px] uppercase font-extrabold text-gold tracking-wider">
                  High Court Advocates
                </span>
                <span className="block text-[10px] text-white/45 font-sans leading-relaxed">
                  Certified litigation defense across major public & private financial institutions BOP & HBL under strict privilege.
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
          <span className="text-[10px] text-white/30 font-sans tracking-wider text-left">
            © {new Date().getFullYear()} JUS & LAY. All corporate shields reserved.
          </span>
          
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-sans font-semibold text-white/30">
            <Link href="/about" className="hover:text-gold hover:underline">Privilege Standard</Link>
            <span>•</span>
            <Link href="/practices" className="hover:text-gold hover:underline">Regulatory Compliance Desk</Link>
            <span>•</span>
            <Link href="/sitemap" className="hover:text-gold hover:underline">Sitemap Directory</Link>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:underline">XML Index</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
