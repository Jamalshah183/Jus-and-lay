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
  Landmark,
  FileText,
  BadgeAlert,
  ChevronRight,
  Phone,
  MessageCircle,
  HelpCircle,
  ShieldAlert,
  Coins
} from "lucide-react";

export default function BankingRepresentationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "",
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
      setFormData({ name: "", email: "", phone: "", institution: "", details: "" });
    }, 4000);
  };

  const bankingServices = [
    {
      title: "Contentious Recovery Suits & Banking Disputes",
      desc: "Vigorous representation of financial institutions and corporate clients in loan recovery proceedings under the Financial Institutions (Recovery of Finances) Act, 2001.",
      points: [
        "Filing and defending recovery suits before the Banking Courts",
        "Obtaining attachment of assets and properties under Section 15",
        "Filing execution petitions for auction of mortgaged assets",
        "Appeals before High Courts against Banking Court decrees"
      ]
    },
    {
      title: "Syndicated Financing & Transaction Advisory",
      desc: "Specialized structuring of multi-bank syndicated loan agreements, project financing, and customized corporate debt arrangements.",
      points: [
        "Inter-creditor agreements and security agent deeds",
        "Feasibility audit and legal due diligence of security assets",
        "Drafting Facility Agreements and subordination covenants",
        "Compliance checks on credit exposure and State Bank policies"
      ]
    },
    {
      title: "Security Creation, Mortgages & Perfection",
      desc: "Expert drafting and verification of secure legal documentation ensuring bulletproof collateral protection for commercial lenders.",
      points: [
        "Equitable and registered mortgage deed drafting",
        "Creation of charge with the SECP (Form 10/16 filing)",
        "Title verification reports and clearance opinions for properties",
        "Redemption, foreclosure, and hypothecation perfection"
      ]
    },
    {
      title: "Regulatory Defense & SBP Prudential Guidelines",
      desc: "Expert advisory on SBP prudential regulations, foreign exchange rules, anti-money laundering (AML) compliance, and banking fraud audits.",
      points: [
        "Prudential regulations compliance audits",
        "Defense representation before SBP & FIA investigations",
        "Advisory on consumer credit laws and micro-finance regulations",
        "Bespoke opinions on currency regulations and SBP circulars"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the scope of Section 15 of the Financial Institutions (Recovery of Finances) Act, 2001?",
      a: "Section 15 provides a powerful mechanism for financial institutions to sell mortgaged property without the intervention of a court. This is triggered by serving dynamic notices to the mortgagor, followed by evaluating the asset and publishing public auction notices in leading newspapers."
    },
    {
      q: "How does the firm support commercial banks like Bank of Punjab or HBL in recovery matters?",
      a: "We act as the primary panel advocates, representing these institutions from initial default notices, structuring workout agreements, filing recovery suits, obtaining emergency attachment orders, to final property auctions under judicial execution decrees."
    },
    {
      q: "What documents are verified during a Banking Due Diligence assignment?",
      a: "Our due diligence covers chain of title (registry deeds, allotment letters, fard-e-malkiat), verification of tax clearances (FBR, provincial departments), verification of company resolutions (SECP records), and confirmation that no prior charges or liens exist on the collateral."
    },
    {
      q: "How are banking fraud or money laundering defense matters handled?",
      a: "These matters are defended through extensive reviews of electronic audit trails, bank statements, and transactional records. We represent executives and entities before regulatory panels, special tribunals, and high courts to protect against wrongful prosecution."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070e1b] text-white font-sans selection:bg-[#ffbc57] selection:text-[#070e1b]">
      {/* Schema.org JSON-LD Banking Service & Practice Area SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "Jus & Lay Law Conglomerate - Banking Desk",
            "description": "Supreme banking defense lawyers and loan recovery panel advocates in Pakistan. Serving Bank of Punjab, HBL, Bank Alfalah under Recovery of Finances Act 2001.",
            "url": "https://jusandlay.com/practices/banking-representation",
            "logo": "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
            "telephone": "+923218520085",
            "areaServed": "Pakistan",
            "serviceType": [
              "Banking Litigation",
              "Loan Recovery Suits",
              "Security Perfection & Charge Creation",
              "Syndicated Project Financing",
              "SBP Prudential Regulation Advisory"
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
            <span className="hidden md:inline">Advocates High Courts of Pakistan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            <span className="text-[#ffbc57] font-semibold">Specialist Banking Litigation Desk</span>
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
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/7781900/pexels-photo-7781900.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/80 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ffbc57] font-bold block mb-4">
            Preeminent Banking Litigation & Synergized Security Perfection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Banking & Finance Representation
          </h1>
          <div className="w-24 h-[2px] bg-[#ffbc57] mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Definitive legal representation for leading commercial and agricultural banks. Protecting institutional capital under the Financial Institutions Recovery Laws and SBP regulations.
          </p>
        </div>
      </header>

      {/* Core SEO Pitch & Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-2 border-[#ffbc57] pl-4">
            Safeguarding Banking Capital and Institutional Compliance under Special Laws
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            With decades of combined experience, our lawyers specialize in the enforcement of financial contracts and protection of commercial assets. <strong className="text-[#ffbc57]">Jus & Lay</strong> holds active representation panels for elite financial institutions across Pakistan.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            We handle both contentious matters, such as complex loan recoveries, banking court trials, executive mortgage auctions, and non-contentious tasks like title verification of large corporate collateral, syndicated loan security agency deeds, and drafting bespoke Islamic finance agreements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <Coins className="w-5 h-5 text-[#ffbc57] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Syndicated Finance</h4>
                <p className="text-[11px] text-white/60">Corporate capital structuring & audits</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <ShieldAlert className="w-5 h-5 text-[#ff6b6b] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff6b6b]">Act 2001 Specialization</h4>
                <p className="text-[11px] text-white/60">Expertise in Recovery Suits & Foreclosures</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#0b1324] border border-white/10 p-8 rounded-lg relative shadow-xl">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ffbc57]/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ffbc57]/30" />
          <h3 className="font-serif text-lg font-bold text-white mb-4 uppercase tracking-wider">Lending Panel Profiles</h3>
          <p className="text-xs text-white/60 mb-6">Our chambers hold active legal panels and handle representation for:</p>
          <div className="space-y-3">
            {[
              "The Bank of Punjab (BOP)",
              "Habib Bank Limited (HBL)",
              "Bank Alfalah Limited",
              "Standard Chartered Bank Pakistan",
              "Zarai Taraqiati Bank Limited (ZTBL)"
            ].map((bank, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs text-white/80 py-2 border-b border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#ffbc57] shrink-0" />
                <span>{bank}</span>
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
              Banking & Finance Practice
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white">
              Specialist Services to Financial Institutions
            </h2>
            <div className="w-16 h-[2px] bg-[#ffbc57] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bankingServices.map((service, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-[#070e1b] border border-white/5 hover:border-[#ffbc57]/30 rounded-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#ffbc57]/10 border border-[#ffbc57]/30 rounded flex items-center justify-center mb-6">
                    {idx === 0 && <ShieldAlert className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 1 && <Coins className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 2 && <FileText className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 3 && <Landmark className="w-6 h-6 text-[#ffbc57]" />}
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
            Banking Recovery Law FAQ & Insights
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
                Immediate Banking Desk Liaison
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-white mb-6">
                Consult our Chambers
              </h2>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                Submit details regarding financial defaults, security audits, syndicated financing draftings, or SBP regulatory queries to schedule an elite advocate consultation.
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
                  <h4 className="text-xs font-black uppercase tracking-wider">WhatsApp Banking Desk</h4>
                  <p className="text-[11px] text-white/90 font-medium">Liaison with Advocate Ammar Yasir Naqvi</p>
                </div>
              </a>

              <div className="p-5 bg-[#0b1324] border border-white/5 rounded-lg flex items-center gap-4">
                <Landmark className="w-6 h-6 text-[#ffbc57]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Lenders & Borrowers</h4>
                  <p className="text-[11px] text-white/60">Representing banking panels & high-net-worth borrowers</p>
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
                  Thank you. Your banking and finance consultation inquiry has been securely registered. A senior panel advocate will review your brief and coordinate further.
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
                      placeholder="e.g. Advocate Naqvi" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Institution / Enterprise</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.institution} 
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      placeholder="e.g. Bank / Corporate Group" 
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
                      placeholder="name@institution.com" 
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
                      placeholder="+92 321 8520085" 
                      className="w-full bg-[#070e1b] border border-[#ffbc57]/20 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Core Legal Concerns</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.details} 
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Briefly state default parameters, recovery details, security perfection, or compliance queries." 
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
