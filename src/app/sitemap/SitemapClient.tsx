"use client";

import React from "react";
import Link from "next/link";
import { 
  Scale, 
  ShieldCheck, 
  ArrowLeft,
  FileText,
  ChevronRight,
  Phone,
  Compass,
  Briefcase,
  Users,
  MapPin,
  Lock,
  ExternalLink,
  BookOpen,
  Facebook,
  Instagram
} from "lucide-react";

export default function SitemapClient() {
  const practiceAreas = [
    {
      title: "Corporate & Commercial Law",
      path: "/practices/corporate-representation",
      desc: "SECP company incorporation, statutory compliance under Pakistan Companies Act 2017, drafting contracts, and joint venture documentation.",
      keywords: ["Corporate law firm Lahore", "SECP company registration", "Corporate structuring Pakistan"]
    },
    {
      title: "Banking Litigation & Defense",
      path: "/practices/banking-representation",
      desc: "Formidable defense and appellate advocacy under the Financial Institutions (Recovery of Finances) Ordinance, 2001.",
      keywords: ["Banking recovery defense", "Banking lawyers in Pakistan", "Loan litigation advocates"]
    },
    {
      title: "Civil Litigation & Trial Practice",
      path: "/practices/litigation-resolution",
      desc: "Trial and appellate representation before Civil Courts, High Courts, and the Supreme Court of Pakistan.",
      keywords: ["Civil litigation lawyers Lahore", "Supreme Court advocates Pakistan", "Arbitration and contract enforcement"]
    },
    {
      title: "Labour & Employment Law",
      path: "/practices/employment-labour",
      desc: "Counseling services, HR policies formulation, labor dispute defense, and compliance audits for EOBI & PESSI.",
      keywords: ["Labor court defense Pakistan", "EOBI registration", "Workplace dispute advocates"]
    },
    {
      title: "Corporate Taxation & FBR Appeals",
      path: "/practices/taxation",
      desc: "Federal Board of Revenue (FBR) tax audit appeals, provincial sales tax (PRA/SRB) filings, and stay order applications.",
      keywords: ["FBR tax appeals Pakistan", "Tax lawyers in Lahore", "Customs and taxation law advocate"]
    },
    {
      title: "Criminal Law & White-Collar Defense",
      path: "/practices/criminal-law",
      desc: "Trial advocacy and bail petitions before Sessions Courts, FIA inquiries, cybercrime cases, and NAB investigations.",
      keywords: ["White-collar crime lawyers Pakistan", "NAB trials advocate Lahore", "Federal Investigation Agency defense"]
    },
    {
      title: "Environmental Law & Regulatory Compliance",
      path: "/practices/environmental-regulatory",
      desc: "EIA and IEE submissions, environmental tribunal litigation, and obtaining Punjab/Federal EPA NOC approvals.",
      keywords: ["EPA Punjab approvals Pakistan", "Environmental tribunal litigation", "NOC acquisition advocates"]
    }
  ];

  const mainPages = [
    { name: "Chambers Main Gateway (Home)", hash: "/", desc: "The primary digital portal of Jus & Lay, detailing legal achievements, leadership profiles, and client representation records." },
    { name: "Chambers History & Core Leadership", hash: "/#about", desc: "Our firm’s history, core philosophy, executive leadership details, and high-standard legacy in the legal sector." },
    { name: "Partners & Of Counsel Directory", hash: "/#team", desc: "A detailed registry of senior advocates, High Court practitioners, and specialized legal advisors." },
    { name: "Contact, Liaison & Global Offices", hash: "/#contact", desc: "Physical locations of Lahore headquarters, correspondence protocols, secure contact channels, and maps." }
  ];

  const securePortals = [
    { name: "Secure Client Login Portal", hash: "client-login", desc: "Secure portal for existing corporate clients to access pending litigation files, security valuations, and legal briefs." },
    { name: "Chambers Administrative Terminal", hash: "admin-login", desc: "Private dashboard for firm managers and advocates to manage case records, case laws, and legal requests." }
  ];

  return (
    <div className="min-h-screen bg-[#070e1b] text-white font-sans selection:bg-[#ffbc57] selection:text-[#070e1b]">
      {/* Mini Top Bar */}
      <div className="border-b border-white/5 bg-[#0b1324] py-2 px-6 text-xs text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#ffbc57]" /> Direct Chambers: +92 (321) 852-0085
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">High Court & Supreme Court Advocates</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#ffbc57] rounded-full animate-ping" />
            <span className="text-[#ffbc57] font-semibold">Live Site Directory Index</span>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-white/50 hover:text-[#ffbc57] transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chambers Main</span>
        </Link>
      </div>

      {/* Hero Header Section */}
      <header className="relative py-16 md:py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1324] via-[#070e1b] to-[#070e1b]" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ffbc57] font-bold block mb-4">
            Aesthetic and Functional Sitemap
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Website Directory & Sitemap
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-white/60 leading-relaxed font-sans">
            A comprehensive, crawlable index of all practice desks, primary departments, client portals, and search-optimized endpoints for Jus & Lay Law Conglomerate, Pakistan.
          </p>
        </div>
      </header>

      {/* Main Content Map */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Columns - Map List */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Section: Core Corporate & Banking Desks */}
          <section id="practice-sitemap" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Scale className="w-6 h-6 text-[#ffbc57]" />
              <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Corporate & Banking Litigation Desks
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceAreas.map((area, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-lg border border-white/5 bg-[#0b1324]/50 hover:border-[#ffbc57]/30 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-serif text-base font-bold text-white group-hover:text-[#ffbc57] transition-colors flex items-center gap-1.5 mb-2">
                      <span>{area.title}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#ffbc57]" />
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed mb-4">
                      {area.desc}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                      {area.keywords.map((kw, kIdx) => (
                        <span 
                          key={kIdx} 
                          className="text-[9px] font-mono uppercase bg-white/[0.03] text-[#ffbc57]/80 px-2 py-0.5 rounded"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={area.path} 
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-[#ffbc57] hover:underline pt-1"
                    >
                      <span>Explore Desk Practice</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Main Core Pages */}
          <section id="structure-sitemap" className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Compass className="w-6 h-6 text-[#ffbc57]" />
              <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Primary Chambers Navigation Map
              </h2>
            </div>

            <div className="space-y-4">
              {mainPages.map((page, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-lg border border-white/5 bg-[#0b1324]/20 hover:bg-[#0b1324]/40 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-bold text-white">
                      {page.name}
                    </h3>
                    <p className="text-xs text-white/55">
                      {page.desc}
                    </p>
                  </div>
                  <Link 
                    href={page.hash} 
                    className="text-xs text-[#ffbc57] font-semibold hover:underline shrink-0 flex items-center gap-1"
                  >
                    <span>Visit Section</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column - Portals & SEO Highlights */}
        <div className="space-y-8">
          
          {/* Box 1: Secure Desk & Portals */}
          <div className="p-6 rounded-lg border border-white/10 bg-[#0b1324] space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Lock className="w-5 h-5 text-[#ffbc57]" />
              <h3 className="font-serif text-lg font-extrabold text-white">
                Client & Chambers Portals
              </h3>
            </div>

            <div className="space-y-4">
              {securePortals.map((portal, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="text-xs font-bold text-white/95">{portal.name}</h4>
                  <p className="text-[11px] text-white/50 leading-relaxed mb-2">
                    {portal.desc}
                  </p>
                  <Link 
                    href={`/?view=${portal.hash}`}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold text-[#ffbc57] hover:underline"
                  >
                    <span>Launch Portal Terminal</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Box 2: SEO Index Verification */}
          <div className="p-6 rounded-lg border border-white/5 bg-white/[0.01] space-y-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <BookOpen className="w-5 h-5 text-[#ffbc57]" />
              <h3 className="font-serif text-base font-bold text-white">
                XML Sitemap Indices
              </h3>
            </div>
            
            <p className="text-xs text-white/50 leading-relaxed">
              For complete crawler synchronization, search engine bots should read the raw dynamic XML indices containing precision priorities and localized metadata.
            </p>

            <a 
              href="/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full text-center py-2.5 px-4 border border-[#ffbc57]/20 hover:border-[#ffbc57] text-xs font-extrabold uppercase tracking-wider text-[#ffbc57] rounded hover:bg-[#ffbc57]/5 transition-all inline-flex justify-center items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Access Raw sitemap.xml</span>
            </a>
          </div>

          {/* Box 3: Verification Shield */}
          <div className="p-6 rounded-lg border border-white/5 bg-[#0b1324]/30 space-y-3">
            <div className="flex gap-2 items-start text-xs text-white/60">
              <ShieldCheck className="w-5 h-5 text-[#ffbc57] shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-white mb-1">
                  Pakistan Judicial Framework Index
                </span>
                <span className="text-[11px] leading-relaxed block">
                  All pages listed comply with local electronic transaction regulations and legal chamber publication protocols.
                </span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Footer Area */}
      <footer className="border-t border-white/5 py-8 bg-[#050a14]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} JUS & LAY Law Conglomerate. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61591562501090#" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbc57] transition-colors flex items-center gap-1.5">
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook</span>
            </a>
            <span>•</span>
            <a href="https://www.instagram.com/jus.and.lay/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbc57] transition-colors flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <span>•</span>
            <Link href="/" className="hover:text-[#ffbc57] hover:underline">Chambers Home</Link>
            <span>•</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffbc57] hover:underline">XML Index</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
