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
  Percent,
  TrendingUp,
  Check
} from "lucide-react";

export default function TaxationClient() {
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

  const taxationServices = [
    {
      title: "Income Tax Advisory & Compliance",
      desc: "Providing bespoke income tax counsel, structuring cross-border corporate transactions, and filing complex corporate returns.",
      points: [
        "Corporate income tax filing and active taxpayer registration",
        "Tax structuring for mergers, acquisitions, and joint ventures",
        "Withholding tax (WHT) optimization and compliance audits",
        "Double taxation treaties and international advisory"
      ]
    },
    {
      title: "Sales Tax & VAT Management",
      desc: "Expert advisory and auditing for federal and provincial sales taxes on goods and services.",
      points: [
        "Provincial sales tax advisory (PRA, SRB, BRA, KPRA)",
        "Federal board of revenue (FBR) sales tax registrations",
        "Sales tax refund claims and adjustment audits",
        "Input-output tax adjustment optimization"
      ]
    },
    {
      title: "Tax Litigation & Appellate Advocacy",
      desc: "Formidable trial and appellate representation challenging illegal tax assessments and recoveries.",
      points: [
        "Appeals before Commissioner Inland Revenue (Appeals)",
        "Appellate Tribunal Inland Revenue (ATIR) representations",
        "Constitutional Writ Petitions challenging arbitrary tax demands",
        "Supreme Court petitions on complex constitutional tax points"
      ]
    },
    {
      title: "Transfer Pricing & Corporate Restructuring",
      desc: "Structuring group transactions to ensure strict compliance with transfer pricing regulations and local tax mandates.",
      points: [
        "Developing transfer pricing documentation and local files",
        "Benchmarking studies and arm's-length price evaluations",
        "Tax-efficient corporate reorganizations and spin-offs",
        "Pre-acquisition tax due diligence and risk mapping"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the difference between federal and provincial sales tax in Pakistan?",
      a: "In Pakistan, Sales Tax on Goods is a federal subject administered by the Federal Board of Revenue (FBR) under the Sales Tax Act, 1990. However, Sales Tax on Services is a provincial subject administered by provincial revenue authorities, such as the Punjab Revenue Authority (PRA), Sindh Revenue Board (SRB), Khyber Pakhtunkhwa Revenue Authority (KPRA), and Balochistan Revenue Authority (BRA)."
    },
    {
      q: "What remedies are available if FBR issues an unfair tax assessment?",
      a: "An aggrieved taxpayer can first file an appeal before the Commissioner Inland Revenue (Appeals). If still unsatisfied, a second appeal lies with the Appellate Tribunal Inland Revenue (ATIR). On questions of law, the matter can be escalated to the High Court via a Reference Application, or challenged under Article 199 through a Constitutional Writ if there's a blatant lack of jurisdiction."
    },
    {
      q: "How does the active taxpayer status affect corporate transactions?",
      a: "Being on the Active Taxpayers List (ATL) is critical. Non-ATL status (being a non-filer) subjects a business to significantly higher withholding tax rates on transactions, imports, banking operations, and property registrations, in addition to attracting increased audit scrutiny."
    },
    {
      q: "Can a tax recovery be stayed during the pendency of an appeal?",
      a: "Yes. Tax laws allow the appellate forum (Commissioner Appeals or ATIR) to grant a temporary stay against recovery of tax demands. If these forums are delayed, the High Court can grant protective relief under its writ jurisdiction to prevent coercive bank account attachment by tax officials."
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
            <span className="text-[#ffbc57] font-semibold">Specialist Taxation & Customs Desk</span>
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
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/80 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ffbc57] font-bold block mb-4">
            Corporate Tax Structuring & Appellate Litigation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Taxation & Customs Law
          </h1>
          <div className="w-24 h-[2px] bg-[#ffbc57] mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Strategic corporate tax advisory, FBR audit representation, transfer pricing compliance, and rigorous tax appeals before High Courts and appellate tribunals.
          </p>
        </div>
      </header>

      {/* Core Pitch & Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-2 border-[#ffbc57] pl-4">
            Optimizing Corporate Tax Liabilities and Defending Arbitrary Assessments
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            Tax legislation in Pakistan is highly dynamic, characterized by frequent regulatory amendments and aggressive fiscal targets. Our tax lawyers provide proactive advice that keeps your business compliant while legally optimizing direct and indirect tax exposure.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            At <strong className="text-[#ffbc57]">Jus & Lay</strong>, we stand between our clients and arbitrary fiscal recovery. We actively represent commercial conglomerates, pharmaceutical industries, and financial institutions in challenging unlawful notices, seeking stay orders, and litigating core constitutional tax questions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <Percent className="w-5 h-5 text-[#ffbc57] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Tax Shielding</h4>
                <p className="text-[11px] text-white/60">Legitimate transactional tax optimizations</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Stay Protection</h4>
                <p className="text-[11px] text-white/60">Rapid stay orders against coercive recoveries</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#0b1324] border border-white/10 p-8 rounded-lg relative shadow-xl">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ffbc57]/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ffbc57]/30" />
          <h3 className="font-serif text-lg font-bold text-white mb-4 uppercase tracking-wider">Litigation Horizons</h3>
          <p className="text-xs text-white/60 mb-6">Expert defense before primary appellate desks:</p>
          <div className="space-y-3">
            {[
              "FBR Corporate Income Tax Audits",
              "Provincial Service Tax Disputes (PRA/SRB)",
              "Customs Valuation and Classification Appeals",
              "Federal Sales Tax Refund Retentions",
              "Withholding Tax Compliance Defenses",
              "Double Taxation Treaty Relief Filings"
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
              Core Taxation Offerings
            </h2>
            <div className="w-16 h-[2px] bg-[#ffbc57] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {taxationServices.map((service, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-[#070e1b] border border-white/5 hover:border-[#ffbc57]/30 rounded-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#ffbc57]/10 border border-[#ffbc57]/30 rounded flex items-center justify-center mb-6">
                    {idx === 0 && <TrendingUp className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 1 && <Percent className="w-6 h-6 text-[#ffbc57]" />}
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
            Taxation Law FAQ & Insights
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
                Immediate Revenue Liaison
              </span>
              <h2 className="font-serif text-3xl font-extrabold text-white mb-6">
                Consult our Chambers
              </h2>
              <p className="text-white/70 text-sm leading-relaxed font-light">
                Submit details regarding FBR audits, custom classification issues, sales tax recoveries, or corporate structuring queries to obtain expert advisory.
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
                  <h4 className="text-xs font-black uppercase tracking-wider">WhatsApp Taxation Desk</h4>
                  <p className="text-[11px] text-white/90 font-medium">Direct with CEO Advocate Ammar Yasir Naqvi</p>
                </div>
              </a>

              <div className="p-5 bg-[#0b1324] border border-white/5 rounded-lg flex items-center gap-4">
                <Percent className="w-6 h-6 text-[#ffbc57]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">FBR Corporate Panel</h4>
                  <p className="text-[11px] text-white/60">Expert coordination across provincial and national revenue councils</p>
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
                <h4 className="font-bold text-sm uppercase tracking-wider">Tax Case Profiled</h4>
                <p className="text-xs text-emerald-400/80 leading-relaxed">
                  Thank you. Your tax issue details have been securely logged. A senior tax partner will analyze your parameters and coordinate strategic counsel.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Full Name / Entity Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Haseeb Shah" 
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
                      placeholder="e.g. Sales Tax Stay Order" 
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
                      placeholder="tax@domain.com" 
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
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Core Case / Tax Assessment Details</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.details} 
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Briefly describe the audit notice, assessment order, show-cause notice, or specific advisory requested." 
                    className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#ffbc57] text-[#070e1b] font-sans font-bold text-xs uppercase tracking-widest py-4 rounded hover:bg-[#ffa726] transition-all duration-300"
                >
                  Initiate Secure Tax Intake
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
