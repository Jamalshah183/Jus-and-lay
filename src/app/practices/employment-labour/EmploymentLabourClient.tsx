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
  Users,
  Check
} from "lucide-react";

export default function EmploymentLabourClient() {
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

  const services = [
    {
      title: "Employment Contracts & Executive Agreements",
      desc: "Drafting, reviewing, and negotiating protective executive employment agreements, restrictive covenants, and comprehensive corporate HR manuals.",
      points: [
        "Non-disclosure and intellectual property protection covenants",
        "Executive compensation structures and severance terms",
        "Standardized worker and contractor engagement agreements",
        "Tailored corporate policy handbooks and HR rulebooks"
      ]
    },
    {
      title: "Workplace Disputes & Litigation",
      desc: "Vigorous representation of employers and high-level professionals in dismissal disputes, wage claims, and discrimination lawsuits.",
      points: [
        "Representation before provincial Labour Courts and Tribunals",
        "Gratuity, pension, and provident fund recovery actions",
        "Defense against wrongful termination and disciplinary claims",
        "Writ petitions challenging administrative labour findings"
      ]
    },
    {
      title: "Labour Compliance & Audits",
      desc: "Advising multi-state enterprises and industrial manufacturers on statutory compliance with federal and provincial labour enactments.",
      points: [
        "Compliance with Social Security (PESSI/SESSI) contributions",
        "Old-Age Benefits (EOBI) structural compliance audits",
        "Maternity leave and workers' compensation frameworks",
        "Health, safety, and workplace environmental standard audits"
      ]
    },
    {
      title: "Disciplinary Proceedings & Investigations",
      desc: "Conducting legally watertight internal inquiries, structuring show-cause notices, and managing employee suspension procedures.",
      points: [
        "Formulating show-cause notices and charges sheets",
        "Serving as independent inquiry officers for corporate clients",
        "Resolution of collective bargaining and trade union disputes",
        "Preventive legal advisory on mass redundancies and layoffs"
      ]
    }
  ];

  const faqs = [
    {
      q: "What is the statutory forum for resolving employment disputes in Pakistan?",
      a: "Employment disputes are primarily adjudicated by specialized provincial Labour Courts established under provincial Industrial Relations Acts. For federal territory or trans-provincial entities, certain matters fall under the National Industrial Relations Commission (NIRC)."
    },
    {
      q: "Are EOBI and Social Security contributions mandatory for all businesses?",
      a: "Yes, under the Employees' Old-Age Benefits Act, 1976 and provincial Social Security Ordinances, companies meeting the statutory employee threshold (typically 5 or more employees) must register and make regular monthly contributions to safeguard worker welfare."
    },
    {
      q: "How must a company structure a termination to avoid wrongful dismissal claims?",
      a: "Except in cases of voluntary resignation, termination by the employer must be in writing and clearly state the reason. For termination on grounds of misconduct, the law strictly mandates issuing a Show-Cause Notice, conducting a fair domestic inquiry, and providing the employee a personal hearing."
    },
    {
      q: "What are the rules regarding maternity benefits for female employees?",
      a: "Provincial laws, such as the Maternity Benefit Act, grant female workers fully paid maternity leave (typically 12 to 16 weeks depending on the province) and protect them from termination during their period of pregnancy and confinement."
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
            <span className="text-[#ffbc57] font-semibold">Specialist Employment & Labour Desk</span>
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
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/80 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#ffbc57] font-bold block mb-4">
            Industrial Compliance & Labour Advocacy
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Employment & Labour Law
          </h1>
          <div className="w-24 h-[2px] bg-[#ffbc57] mx-auto mb-6" />
          <p className="max-w-3xl mx-auto text-white/70 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Strategic counsel on labor compliance, EOBI, SESSI, trade union negotiations, disciplinary proceedings, and robust tribunal representation.
          </p>
        </div>
      </header>

      {/* Core Pitch & Highlights */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight border-l-2 border-[#ffbc57] pl-4">
            Protecting Industrial Harmony and Executing Watertight Executive Contracts
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
            The relationship between employers and employees is governed by a complex web of provincial and federal legislation. Our chambers assist corporate human resource teams and executives in implementing robust standards that minimize liability and secure business continuity.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            At <strong className="text-[#ffbc57]">Jus & Lay</strong>, we conduct EOBI/Social Security audits, manage transition plans, draft non-compete agreements, and defend key corporate clients against unfounded claims in the Labour Courts.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <Briefcase className="w-5 h-5 text-[#ffbc57] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">HR Protection</h4>
                <p className="text-[11px] text-white/60">Watertight policies & executive covenants</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#0b1324] border border-white/5 rounded">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Statutory Audits</h4>
                <p className="text-[11px] text-white/60">EOBI, PESSI, and SESSI safety measures</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 bg-[#0b1324] border border-white/10 p-8 rounded-lg relative shadow-xl">
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ffbc57]/30" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ffbc57]/30" />
          <h3 className="font-serif text-lg font-bold text-white mb-4 uppercase tracking-wider">Liaison Competencies</h3>
          <p className="text-xs text-white/60 mb-6">Unrivaled proficiency in resolving sensitive workplace challenges:</p>
          <div className="space-y-3">
            {[
              "Corporate Employee Handbooks",
              "Trade Union Negotiations & CBAs",
              "Inquiry Officer Legal Assistance",
              "Workers Welfare Fund (WWF) Audits",
              "Executive Severance Package Drafting",
              "Gratuity and Pension Settlements"
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
              Core Employment Law Services
            </h2>
            <div className="w-16 h-[2px] bg-[#ffbc57] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-[#070e1b] border border-white/5 hover:border-[#ffbc57]/30 rounded-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#ffbc57]/10 border border-[#ffbc57]/30 rounded flex items-center justify-center mb-6">
                    {idx === 0 && <FileText className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 1 && <Scale className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 2 && <ShieldCheck className="w-6 h-6 text-[#ffbc57]" />}
                    {idx === 3 && <Users className="w-6 h-6 text-[#ffbc57]" />}
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
            Employment Law FAQ & Insights
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
                Secure top-tier labor defense or professional executive advisory services from our legal experts.
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
                  <h4 className="text-xs font-black uppercase tracking-wider">WhatsApp Employment Desk</h4>
                  <p className="text-[11px] text-white/90 font-medium">Direct with CEO Advocate Ammar Yasir Naqvi</p>
                </div>
              </a>

              <div className="p-5 bg-[#0b1324] border border-white/5 rounded-lg flex items-center gap-4">
                <Briefcase className="w-6 h-6 text-[#ffbc57]" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffbc57]">Executive Mediation</h4>
                  <p className="text-[11px] text-white/60">Discreet executive split negotiations and out-of-court dispute resolutions</p>
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
                <h4 className="font-bold text-sm uppercase tracking-wider">Employment Issue Logged</h4>
                <p className="text-xs text-emerald-400/80 leading-relaxed">
                  Thank you. Your labor matter overview has been securely registered. Our senior labor counsel will review your parameters and follow up.
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
                      placeholder="e.g. Imran Raza" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Company / Organization</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.subject} 
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="e.g. Apex Industrial Group" 
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
                      placeholder="hr@company.com" 
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
                      placeholder="+92 321 4452839" 
                      className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">Core Case / Consultation Requirements</label>
                  <textarea 
                    required 
                    rows={4}
                    value={formData.details} 
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    placeholder="Briefly describe the employment contracts, labor dispute elements, EOBI concerns, or regulatory compliance support requested." 
                    className="w-full bg-[#070e1b] border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-[#ffbc57] outline-none transition-all placeholder:text-white/20 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#ffbc57] text-[#070e1b] font-sans font-bold text-xs uppercase tracking-widest py-4 rounded hover:bg-[#ffa726] transition-all duration-300"
                >
                  Initiate Secure HR Intake
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
