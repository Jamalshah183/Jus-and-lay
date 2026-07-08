"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Scale, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  ArrowLeft,
  CheckCircle2,
  FileText,
  ChevronRight,
  Phone,
  MessageCircle,
  HelpCircle,
  ShieldAlert,
  Gavel,
  Check
} from "lucide-react";

export default function CriminalLawClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
      setFormData({ name: "", email: "", phone: "", subject: "", details: "" });
    }, 4000);
  };

  const criminalServices = [
    {
      title: "White-Collar Crime Defense",
      desc: "Comprehensive representation of corporate executives and public officials in white-collar crimes, financial frauds, and asset tracking cases.",
      points: [
        "Defense before National Accountability Bureau (NAB) tribunals",
        "FIA (Federal Investigation Agency) cyber & bank fraud inquiries",
        "Anti-Money Laundering (AML) statutory compliance and trials",
        "Challenging arbitrary inclusions on the Exit Control List (ECL)"
      ]
    },
    {
      title: "Trial Court & High Court Advocacy",
      desc: "Relentless trial defense and appellate representation before Sessions Courts, High Courts, and the Supreme Court of Pakistan.",
      points: [
        "Filing and arguing pre-arrest (Bail-before-Arrest) petitions",
        "Post-arrest bail representation in severe financial & state trials",
        "Drafting and submitting appeals against conviction or sentencing",
        "Quashing of false FIRs (First Information Reports) under Sec 561-A"
      ]
    },
    {
      title: "Regulatory Investigations & Audits",
      desc: "Guiding businesses through sensitive investigations initiated by regulatory, securities, and customs authorities.",
      points: [
        "SECP (Securities and Exchange Commission) compliance inquiries",
        "Representations before Competition Commission of Pakistan (CCP)",
        "Intellectual Property rights protection and criminal seizure suits",
        "Anti-corruption corporate compliance audits and workshops"
      ]
    },
    {
      title: "Corporate Fraud & Embezzlement",
      desc: "Protecting business structures by executing private investigation reviews, logging formal FIRs, and seeking recovery.",
      points: [
        "Filing private criminal complaints under the Code of Criminal Procedure",
        "Investigating and auditing internal employee embezzlement",
        "Representing companies in commercial piracy and cyber hacks",
        "Filing damages suits alongside active criminal prosecutions"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is pre-arrest bail and when can it be obtained?",
      a: "Pre-arrest bail (Bail Before Arrest) is a protective remedy granted by the Sessions Court or High Court under Section 498 of the CrPC to protect an individual from arbitrary, malicious arrest by police or investigative agencies. It is granted upon demonstrating that the accusation is based on ulterior motives, enmity, or bad faith."
    },
    {
      q: "What are the powers of the Federal Investigation Agency (FIA)?",
      a: "The FIA is a federal agency empowered to investigate serious offenses involving federal laws, banking fraud, cybercrime (under PECA 2016), anti-money laundering, currency smuggling, and public sector corruption."
    },
    {
      q: "How can a baseless FIR (First Information Report) be quashed?",
      a: "An aggrieved person can file a petition under Section 561-A of the Code of Criminal Procedure before the High Court seeking the quashing of a false or legally unsustainable FIR, on the grounds that the proceedings constitute an abuse of the process of the court."
    },
    {
      q: "What happens if a person is placed on the Exit Control List (ECL)?",
      a: "Inclusion on the ECL restricts a person from traveling abroad. This action can be challenged through a representation to the Ministry of Interior or via a Constitutional Writ Petition in the High Court, asserting the fundamental right to freedom of movement."
    }
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
            <span className="hidden md:inline">Advocates High Courts of Pakistan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#ffbc57] rounded-full animate-ping" />
            <span className="text-[#ffbc57] font-semibold">Specialist Criminal & White Collar Desk</span>
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
      <header className="relative py-16 md:py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/80 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ffbc57] font-bold block mb-4">
            High Court Trial Counsel & white-collar Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Criminal & White-Collar Law
          </h1>
          <div className="w-24 h-[2px] bg-[#ffbc57] mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Formidable criminal defense, specialized corporate white-collar advocacy, pre-arrest & post-arrest bail petitions, and robust representation before NAB, FIA, and customs tribunals.
          </p>
        </div>
      </header>

      {/* Core Pitch & Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-2 border-[#ffbc57] pl-4">
            Upholding Due Process and Offering Strategic Defense Against Complex Accusations
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            An accusation or regulatory investigation can jeopardize a lifetime of professional effort, corporate reputation, and personal liberty. Our senior criminal advocates combine technical command of the Code of Criminal Procedure with dynamic trial advocacy to protect your legal and constitutional rights.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            At <strong className="text-[#ffbc57]">Jus & Lay</strong>, we represent company directors, corporate advisors, public administrators, and high-profile individuals. We work tirelessly to obtain prompt bail protections, challenge false FIRs, secure travelers from exit-lists, and defend high-stakes investigations before national commissions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <Gavel className="w-5 h-5 text-[#ffbc57] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Trial Prowess</h4>
                <p className="text-[11px] text-white/60">Comprehensive cross-examinations & defenses</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <ShieldAlert className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Rapid Bail Desks</h4>
                <p className="text-[11px] text-white/60">Emergency pre-arrest and transit bails</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#0b1324] border border-white/10 p-8 rounded-lg relative shadow-xl">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ffbc57]/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ffbc57]/30" />
          <h3 className="font-serif text-lg font-bold text-white mb-4 uppercase tracking-wider">Litigation Horizons</h3>
          <p className="text-xs text-white/60 mb-6">Unrivaled capabilities across federal and state forums:</p>
          <div className="space-y-3">
            {[
              "National Accountability Bureau (NAB) Trials",
              "FIA Banking and Cyber Crime Inquiries",
              "Pre-Arrest and Post-Arrest Bails (CrPC 497/498)",
              "Quashing of Arbitrary FIRs (Sec 561-A)",
              "Anti-Money Laundering Act (AMLA) Defenses",
              "Customs and Tariff Smuggling Trials"
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
              Divisional Specializations
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white">
              Core Criminal Law Offerings
            </h2>
            <div className="w-16 h-[2px] bg-[#ffbc57] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {criminalServices.map((service, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-[#070e1b] border border-white/5 hover:border-[#ffbc57]/30 rounded-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#ffbc57]/10 border border-[#ffbc57]/30 rounded flex items-center justify-center mb-6">
                    {idx === 0 && <ShieldAlert className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 1 && <Gavel className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 2 && <Scale className="w-6 h-6 text-[#ffbc57]" />}
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

      {/* Frequently Asked Questions */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbc57] font-bold block mb-3">
            Informed Decisions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            Criminal Law FAQ & Insights
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
                Immediate Counsel Liaison
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-white mb-6">
                Consult our Chambers
              </h2>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                Submit an outline of your active inquiry, bail requirements, or regulatory notice to connect with a senior criminal trial advocate.
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
                  <h4 className="text-xs font-black uppercase tracking-wider">WhatsApp Criminal Desk</h4>
                  <p className="text-[11px] text-white/90 font-medium">Direct with CEO Advocate Ammar Yasir Naqvi</p>
                </div>
              </a>

              <div className="p-5 bg-[#0b1324] border border-white/5 rounded-lg flex items-center gap-4">
                <Gavel className="w-6 h-6 text-[#ffbc57]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">High Court Chambers</h4>
                  <p className="text-[11px] text-white/60">Representations across major High Courts and Appellate Commissions</p>
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
                <h4 className="font-bold text-sm uppercase tracking-wider">Defense Dossier Registered</h4>
                <p className="text-xs text-emerald-400/80 leading-relaxed">
                  Thank you. Your request and information have been registered. A senior criminal trial attorney will analyze your inputs and contact you in absolute confidence.
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
                      placeholder="e.g. Zain Alvi" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Subject / Allegation Forum</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.subject} 
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="e.g. FIA Cyber Notice / Bail" 
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
                      placeholder="client@domain.com" 
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
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Case Briefing (strictly Confidential)</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.details} 
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Provide a brief summary of the FIR, investigation agency involved, active inquiry details, or bail relief requested." 
                    className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#ffbc57] text-[#070e1b] font-sans font-bold text-xs uppercase tracking-widest py-4 rounded hover:bg-[#ffa726] transition-all duration-300"
                >
                  Initiate Confidential Defense Intake
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="border-t border-white/5 bg-[#050a14] py-8 text-center text-xs text-white/40 font-sans">
        <p>© {new Date().getFullYear()} Jus & Lay Law Conglomerate. All corporate, litigation, financial, and intellectual rights reserved.</p>
      </footer>
    </div>
  );
}
