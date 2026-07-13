"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  ArrowLeft,
  CheckCircle2,
  Building2,
  FileText,
  BadgeAlert,
  ChevronRight,
  Phone,
  MessageCircle,
  HelpCircle,
  Globe,
  Building
} from "lucide-react";

export default function CorporateRepresentationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    details: ""
  });

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", company: "", details: "" });
    }, 4000);
  };

  const corporateServices = [
    {
      title: "Company Incorporation & SECP Registration",
      desc: "Comprehensive advisory and execution for establishing private limited, public limited, single-member companies (SMC), and non-profit organizations under the Companies Act, 2017.",
      points: [
        "Memorandum and Articles of Association drafting",
        "Digital signature and SECP portal profile creation",
        "Foreign directors and international parent company registrations",
        "NGO/NPO license acquisition under Section 42"
      ]
    },
    {
      title: "Mergers, Acquisitions & Joint Ventures",
      desc: "Strategic advisory for complex transactions, business transfers, asset purchases, and joint ventures between local and international corporate groups.",
      points: [
        "Legal due diligence and risk assessment reports",
        "Share Purchase Agreements (SPA) and Shareholder Agreements (SHA)",
        "Regulatory approvals from Competition Commission of Pakistan (CCP)",
        "Court-approved schemes of arrangement and amalgamations"
      ]
    },
    {
      title: "Corporate Governance & Compliance Desk",
      desc: "Proactive maintenance of statutory records, annual returns, and regular filings before the SECP to ensure uninterrupted legal status.",
      points: [
        "Filing of Form 29 (Director changes) and Form A (Annual Return)",
        "Ultimate Beneficial Ownership (UBO) declaration compliance",
        "Board meeting minutes and general meeting resolution draftings",
        "Advisory on Companies Act 2017 amendments and compliance codes"
      ]
    },
    {
      title: "Commercial Contracts & Regulatory Licenses",
      desc: "Bespoke drafting, reviewing, and negotiation of diverse operational contracts to shield your enterprise from transactional liabilities.",
      points: [
        "Franchise, distributor, and vendor service agreements",
        "Intellectual Property licensing & trademark registrations",
        "Licensing with Board of Investment (BOI) & Ministry of Interior",
        "Employment covenants, non-disclosures (NDAs), and executive terms"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the timeline for incorporating a private limited company with the SECP?",
      a: "Typically, standard incorporation takes 3 to 7 working days once all documentation (such as name reservation, digital signatures, and capital declarations) is finalized. For foreign shareholders or directors, additional security clearance via the Ministry of Interior is required, which extends the timeline."
    },
    {
      q: "How does Jus & Lay assist with corporate tax registration and compliance?",
      a: "We provide end-to-end support including Federal Board of Revenue (FBR) NTN registration, provincial sales tax board registration (e.g., PRA, SRB), and direct coordination with tax authorities for exemption certificates, corporate tax filings, and custom audit defenses."
    },
    {
      q: "What are the regulatory requirements for foreign investments in Pakistan?",
      a: "Foreign companies can establish a wholly-owned subsidiary or branch office in Pakistan. Key requirements include registration with the SECP, obtaining a clearance certificate from the Board of Investment (BOI), registering with the State Bank of Pakistan (SBP) for equity inflow repatriation, and meeting Ministry of Interior guidelines."
    },
    {
      q: "How are disputes resolved under Pakistani Corporate Law?",
      a: "Disputes can be resolved via litigation before the specialized Company Bench of the High Courts, or through alternative dispute resolution (ADR) mechanisms such as domestic or international arbitration, which are frequently drafted into our bespoke commercial agreements."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070e1b] text-white font-sans selection:bg-[#ffbc57] selection:text-[#070e1b]">
      {/* Schema.org JSON-LD Local Business & Practice Area SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Jus & Lay Law Conglomerate - Corporate Representation Desk",
            "description": "Expert Corporate & Commercial lawyers in Pakistan specializing in SECP company registration, M&A, regulatory compliance, and joint ventures.",
            "url": "https://jusandlay.com/practices/corporate-representation",
            "logo": "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
            "telephone": "+923218520085",
            "areaServed": "Pakistan",
            "serviceType": [
              "Corporate Structuring",
              "SECP Company Incorporation",
              "Mergers and Acquisitions",
              "Regulatory Compliance Advisory",
              "Commercial Contracts"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PK"
            }
          })
        }}
      />

      {/* Mini Top Bar */}
      <div className="border-b border-white/5 bg-[#0b1324] py-2 px-6 text-xs text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-[#ffbc57]" /> Direct Chambers: +92 (321) 852-0085
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">CEO Liaison Office: Islamabad & Lahore</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[#ffbc57] font-semibold">Active Corporate Advisory Portal</span>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb & Back Link */}
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
      <header className="relative py-16 md:py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/80 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ffbc57] font-bold block mb-4">
            Elite Corporate Counsel & Transactional Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Corporate & Commercial Law Specialists
          </h1>
          <div className="w-24 h-[2px] bg-[#ffbc57] mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Providing supreme corporate structuring, SECP regulatory compliant frameworks, intellectual property custody, and cross-border commercial transaction defense before the High Courts of Pakistan.
          </p>
        </div>
      </header>

      {/* Core SEO Pitch & Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-2 border-[#ffbc57] pl-4">
            Securing Corporate Ventures and Regulatory Franchises with Institutional Integrity
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            In the highly regulated corporate landscape of Pakistan, establishing and expanding your commercial presence requires meticulous adherence to local legislative changes. At <strong className="text-[#ffbc57]">Jus & Lay</strong>, we serve as counsel to industry-leading trusts, FMCGs, travel operators, and foreign investors.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            From incorporating digital and IT start-ups in Pakistan, ensuring compliance with the Securities and Exchange Commission of Pakistan (SECP), to drafting secure joint venture agreements that mitigate operational risks, our advocates bring High Court-tested rigor to transactional documents.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <Award className="w-5 h-5 text-[#ffbc57] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">High Court Advocates</h4>
                <p className="text-[11px] text-white/60">Nationwide advocacy & dispute defense</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">100% Compliance Record</h4>
                <p className="text-[11px] text-white/60">Flawless audit & regulatory history</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#0b1324] border border-white/10 p-8 rounded-lg relative shadow-xl">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ffbc57]/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ffbc57]/30" />
          <h3 className="font-serif text-lg font-bold text-white mb-4 uppercase tracking-wider">Representative Sectors</h3>
          <p className="text-xs text-white/60 mb-6">Our chambers routinely represent market leaders in key commercial sectors:</p>
          <div className="space-y-3">
            {[
              "LPG & Power Infrastructure Corporations",
              "Public & Private Healthcare Trusts",
              "Hospitality & Nationwide Tourism Groups",
              "Leather Tanneries & Industrial Exporters",
              "Real Estate & Construction Conglomerates",
              "Multi-National Technology Subsidiaries"
            ].map((sector, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-white/80 py-2 border-b border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#ffbc57] shrink-0" />
                <span>{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-[#0b1324]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#ffbc57] font-bold block mb-3">
              Specialized Divisions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white">
              Corporate Advisory & Transactional Offerings
            </h2>
            <div className="w-16 h-[2px] bg-[#ffbc57] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporateServices.map((service, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-[#070e1b] border border-white/5 hover:border-[#ffbc57]/30 rounded-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#ffbc57]/10 border border-[#ffbc57]/30 rounded flex items-center justify-center mb-6">
                    {idx === 0 && <Building2 className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 1 && <Globe className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 2 && <FileText className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 3 && <Briefcase className="w-6 h-6 text-[#ffbc57]" />}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">{service.desc}</p>
                  
                  <div className="space-y-2.5 border-t border-white/5 pt-4">
                    {service.points.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-white/80">
                        <span className="text-[#ffbc57] text-sm mt-[-1px]">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Frequently Asked Questions Section */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbc57] font-bold block mb-3">
            Informed Decisions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            Corporate Law FAQ & Insights
          </h2>
          <div className="w-12 h-[1px] bg-[#ffbc57] mx-auto mt-4" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="border border-white/10 rounded-lg overflow-hidden bg-[#0b1324] transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-white flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#ffbc57] shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronRight className={`w-4 h-4 text-[#ffbc57] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
                </button>
                {isOpen && (
                  <div className="p-5 border-t border-white/5 bg-[#070e1b] text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lead Capture and Direct Contact Liaison */}
      <section className="py-20 bg-gradient-to-b from-[#0b1324] to-[#070e1b] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Action Liaison Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#ffbc57] font-bold block mb-3">
                Immediate Corporate Liaison
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-white mb-6">
                Consult our Chambers
              </h2>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                Submit an overview of your commercial advisory or incorporation requirements, or contact our Chief Executive Officer directly via WhatsApp for verified priority corporate counsel.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="https://wa.me/923218520085" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-5 bg-[#25D366] text-white hover:bg-[#1ebd59] rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300"
              >
                <MessageCircle className="w-6 h-6 shrink-0" />
                <div className="text-left">
                  <h4 className="text-xs font-black uppercase tracking-wider">WhatsApp Corporate Desk</h4>
                  <p className="text-[11px] text-white/90 font-medium">Direct with CEO Advocate Ammar Yasir Naqvi</p>
                </div>
              </a>

              <div className="p-5 bg-[#0b1324] border border-white/5 rounded-lg flex items-center gap-4">
                <Building className="w-6 h-6 text-[#ffbc57]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Regional Reach</h4>
                  <p className="text-[11px] text-white/60">Presence across Islamabad, Lahore, & High Court Circuits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Lead Form */}
          <div className="lg:col-span-7 bg-[#0b1324] border border-white/10 p-6 sm:p-10 rounded-lg relative shadow-xl">
            <h3 className="font-serif text-xl font-bold text-white mb-6">Submit Counsel Request</h3>
            
            {formSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
                <h4 className="font-bold text-sm uppercase tracking-wider">Advocacy Request Logged</h4>
                <p className="text-xs text-emerald-400/80 leading-relaxed">
                  Thank you. Your corporate inquiry has been securely registered in our system. An advocate from our Corporate Advisory division will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. M. Hamza" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Company / Venture Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.company} 
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="e.g. Acme Tech Pvt Ltd" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@company.com" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Contact Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+92 300 1234567" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Core Advisory Requirements</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.details} 
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Briefly describe the corporate matter, incorporation details, or compliance requirements." 
                    className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#ffbc57] text-[#070e1b] font-sans font-bold text-xs uppercase tracking-widest py-4 rounded hover:bg-[#ffa726] transition-all duration-300"
                >
                  Initiate Secure Counsel Intake
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="border-t border-white/5 bg-[#050a14] py-8 text-center text-xs text-white/40 font-sans">
        <p>© {new Date().getFullYear()} Jus & Lay Law Conglomerate. All corporate, financial litigation, and intellectual rights reserved.</p>
      </footer>
    </div>
  );
}
