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

export default function LitigationResolutionClient() {
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

  const litigationServices = [
    {
      title: "Civil & Commercial Litigation",
      desc: "Comprehensive pleading, motion practice, and trials before the Civil Courts and High Courts of Pakistan for breach of contract, property ownership, and business disputes.",
      points: [
        "Plaint and Written Statement drafting under CPC 1908",
        "Seeking permanent and temporary injunctions (Stay orders)",
        "Title recovery, partition, and specific performance suits",
        "Regular First Appeals (RFA) and Revision Petitions"
      ]
    },
    {
      title: "Alternative Dispute Resolution (ADR)",
      desc: "Strategic representation in domestic and international commercial arbitrations, mediations, and negotiated structured settlements.",
      points: [
        "Drafting enforceable arbitration clauses",
        "Arbitration proceedings under the Arbitration Act, 1940",
        "Enforcement of foreign arbitral awards in Pakistani Courts",
        "Expert mediator services for complex family and commercial splits"
      ]
    },
    {
      title: "Constitutional Writs & Public Law",
      desc: "Defense and protection of fundamental rights and administrative fairness through constitutional writ petitions before the High Courts.",
      points: [
        "Writ petitions under Article 199 of the Constitution of Pakistan",
        "Challenging unlawful actions of regulatory bodies & state actors",
        "Vesting rights, tenders, and license cancellation challenges",
        "Quashing of illegal administrative or regulatory circulars"
      ]
    },
    {
      title: "Appeals & Special Tribunals",
      desc: "Advocacy across specialized federal and provincial appellate boards, including revenue, tax, service, and custom tribunals.",
      points: [
        "Service Tribunal representations for civil servants",
        "Appeals before the Appellate Tribunal Inland Revenue (ATIR)",
        "Environmental Tribunal defense for industrial groups",
        "Petitions before the Intellectual Property Tribunals"
      ]
    }
  ];

  const faqs = [
    {
      q: "What are the stages of a standard civil suit in Pakistan?",
      a: "A civil suit begins with filing a Plaint (Arzi Daawa), followed by issuing summons to the defendant. The defendant submits a Written Statement (Jawab Daawa). Next, the Court frames 'Issues' (unsettled questions). Both sides then present oral and documentary Evidence, followed by Final Arguments, leading to the Judgment and Decree."
    },
    {
      q: "How long does a litigation matter typically take to resolve?",
      a: "Timelines vary significantly depending on the court level and nature of the dispute. Simple civil matters or injunction applications can be argued in weeks, while full trials involving intensive evidence can take 1 to 3 years. We actively utilize expedited procedures and alternative dispute resolution (ADR) to accelerate timelines."
    },
    {
      q: "What is a Constitutional Writ Petition and when can it be filed?",
      a: "Under Article 199 of the Constitution of Pakistan, a Writ Petition can be filed in the High Court when a person's or entity's fundamental rights are violated, or when public authorities act without lawful authority. It is applicable when no other adequate, speedy legal remedy is available under the law."
    },
    {
      q: "Can a foreign arbitration award be enforced in Pakistan?",
      a: "Yes, Pakistan is a signatory to the New York Convention. Foreign arbitral awards are highly enforceable through the High Courts under the Recognition and Enforcement (Arbitration Agreements and Foreign Arbitral Awards) Act, 2011, subject to standard procedural compliance."
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
            <span className="text-[#ffbc57] font-semibold">Specialist Litigation & ADR Desk</span>
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
            Supreme Court & High Court Trial Advocacy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Litigation & Dispute Resolution
          </h1>
          <div className="w-24 h-[2px] bg-[#ffbc57] mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Formidable courtroom advocacy and precise trial execution across civil, commercial, administrative, and constitutional disputes in Pakistani jurisdictions.
          </p>
        </div>
      </header>

      {/* Core Pitch & Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-2 border-[#ffbc57] pl-4">
            Relentless Advocacy and Protective Dispute Strategies Before All Tribunals
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            Disputes are an inevitable reality of commercial growth and civil transactions. Our advocates bring an unmatched level of trial readiness, technical precision, and strategic foresight to secure your legal position under Pakistani statutory frameworks.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            At <strong className="text-[#ffbc57]">Jus & Lay</strong>, we represent commercial groups, land-holding trusts, and high-net-worth families in high-stakes litigations. We work tirelessly to obtain prompt interim relief (stay orders) and design watertight defenses to shield your operations from arbitrary regulatory actions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <Gavel className="w-5 h-5 text-[#ffbc57] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Aggressive Trials</h4>
                <p className="text-[11px] text-white/60">Comprehensive evidence & pleading mastery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Robust Mediation</h4>
                <p className="text-[11px] text-white/60">Structured ADR and settlement desks</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#0b1324] border border-white/10 p-8 rounded-lg relative shadow-xl">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ffbc57]/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ffbc57]/30" />
          <h3 className="font-serif text-lg font-bold text-white mb-4 uppercase tracking-wider">Litigation Areas</h3>
          <p className="text-xs text-white/60 mb-6">Our chambers hold a stellar track record across key disputation arenas:</p>
          <div className="space-y-3">
            {[
              "High-Value Commercial Contract Breaches",
              "Constitutional Injunctions & Stay Writs",
              "Land Ownership, Partition & Rent Disputes",
              "Regulatory Orders & Monopolistic Censures",
              "Intellectual Property & Copyright Violations",
              "Corporate Shareholder Dissolution Suits"
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
              Core Dispute Representation Offerings
            </h2>
            <div className="w-16 h-[2px] bg-[#ffbc57] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {litigationServices.map((service, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-[#070e1b] border border-white/5 hover:border-[#ffbc57]/30 rounded-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#ffbc57]/10 border border-[#ffbc57]/30 rounded flex items-center justify-center mb-6">
                    {idx === 0 && <Gavel className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 1 && <Scale className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 2 && <ShieldAlert className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 3 && <FileText className="w-6 h-6 text-[#ffbc57]" />}
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
            Litigation Law FAQ & Insights
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
                Immediate Court Liaison
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-white mb-6">
                Consult our Chambers
              </h2>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                Submit an overview of your active litigation, stay order petitions, commercial claims, or administrative dispute elements to secure prompt representative counsel.
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
                  <h4 className="text-xs font-black uppercase tracking-wider">WhatsApp Litigation Desk</h4>
                  <p className="text-[11px] text-white/90 font-medium">Direct with CEO Advocate Ammar Yasir Naqvi</p>
                </div>
              </a>

              <div className="p-5 bg-[#0b1324] border border-white/5 rounded-lg flex items-center gap-4">
                <Gavel className="w-6 h-6 text-[#ffbc57]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Regional Litigation Reach</h4>
                  <p className="text-[11px] text-white/60">Presence across Civil Courts, High Courts, and Supreme Court Panels</p>
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
                <h4 className="font-bold text-sm uppercase tracking-wider">Litigation Case Logged</h4>
                <p className="text-xs text-emerald-400/80 leading-relaxed">
                  Thank you. Your dispute briefing has been securely registered. A senior trial advocate will analyze your parameters and coordinate a strategy session.
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
                      placeholder="e.g. Hammad Malik" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Subject / Matter Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.subject} 
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="e.g. Land Stay / Commercial Breach" 
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
                      placeholder="+92 300 7654321" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Core Case / Dispute Details</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.details} 
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Briefly describe the active litigation, opposition details, court jurisdiction if any, and target relief." 
                    className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#ffbc57] text-[#070e1b] font-sans font-bold text-xs uppercase tracking-widest py-4 rounded hover:bg-[#ffa726] transition-all duration-300"
                >
                  Initiate Secure Litigation Intake
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
