import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building, 
  Scale, 
  ShieldCheck, 
  Award, 
  Briefcase, 
  Globe, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Coins, 
  Layers, 
  ShieldAlert, 
  Landmark, 
  TrendingUp, 
  Fingerprint, 
  ChevronRight, 
  BookOpen, 
  Users,
  X,
  HeartHandshake
} from "lucide-react";
import { PRACTICE_AREAS } from "../data";
import { PracticeArea } from "../types";

const getPracticeIcon = (iconName: string) => {
  switch (iconName) {
    case "Building":
      return <Building className="w-5 h-5 text-gold" />;
    case "Scale":
      return <Scale className="w-5 h-5 text-gold" />;
    case "HeartHandshake":
      return <HeartHandshake className="w-5 h-5 text-gold" />;
    case "Landmark":
      return <Landmark className="w-5 h-5 text-gold" />;
    case "TrendingUp":
      return <TrendingUp className="w-5 h-5 text-gold" />;
    case "FileText":
      return <FileText className="w-5 h-5 text-gold" />;
    default:
      return <Scale className="w-5 h-5 text-gold" />;
  }
};

export default function FirmProfile() {
  const [activeTab, setActiveTab] = useState<"overview" | "focus" | "services" | "banking" | "clients">("overview");
  const [selectedPractice, setSelectedPractice] = useState<PracticeArea | null>(null);

  const tabs = [
    { id: "overview", label: "Overview & Heritage", icon: BookOpen },
    { id: "focus", label: "Focus & Approach", icon: Scale },
    { id: "services", label: "Practice Focus", icon: Layers },
    { id: "banking", label: "Banking Advisory", icon: Coins },
    { id: "clients", label: "Client Registry", icon: Users },
  ] as const;

  const financialClients = [
    "The Bank of Punjab",
    "Bank Alfalah Limited",
    "Habib Bank Limited",
    "Standard Chartered Bank Pakistan",
    "Zarai Taraqiati Bank Limited",
  ];

  const institutionalClients = [
    "The Bank of Punjab",
    "Habib Bank Limited",
    "Bank Alfalah Limited",
    "Standard Chartered Bank Pakistan",
    "Zarai Taraqiati Bank Limited",
    "M/S Noor LPG Private Limited",
    "Feroz Sons Trust",
    "Fatima Memorial Hospital",
    "M/S Tabeer Travels & Tourism",
    "M/S Good Lucks Tanneries",
    "M/S Jameela Tanneries",
  ];

  return (
    <div id="firm-profile" className="w-full">
      {/* Visual Header / Section Title */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-4">
          Corporate Credentials
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
          Chambers Firm Profile
        </h2>
        <div className="w-24 h-[2px] bg-gold mx-auto mb-6" />
        <p className="max-w-2xl mx-auto text-white/70 text-sm sm:text-base leading-relaxed font-sans font-light">
          A definitive overview of JUS & LAY, detailing our sovereign advocacy, strategic corporate advisory, and national banking representing frameworks.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-white/10 pb-4 max-w-5xl mx-auto">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs tracking-wider uppercase font-sans font-bold border-b-2 transition-all duration-300 ${
                isActive 
                  ? "border-gold text-gold bg-gold/5" 
                  : "border-transparent text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? "text-gold animate-pulse" : "text-white/40"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Tabs Content Area */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-[#0b1324]/95 border border-gold/20 p-6 sm:p-10 md:p-12 rounded-sm shadow-2xl relative"
          >
            {/* Elegant Luxury Accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-gold/30" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-gold/30" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-gold/30" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-gold/30" />

            {/* TAB 1: OVERVIEW & HERITAGE */}
            {activeTab === "overview" && (
              <div className="space-y-8 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                      Division I
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Introduction & National Heritage
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 text-gold border border-gold/30 rounded-xs text-[10px] tracking-widest uppercase font-bold font-sans">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Est. Chambers</span>
                  </div>
                </div>

                {/* Big Pull-quote and paragraphs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-6">
                    <p className="font-serif text-lg sm:text-xl italic text-white/95 leading-relaxed border-l-2 border-gold pl-6 py-1">
                      “JUS & LAY” is a well-established, dedicated, efficient, and well-reputed law firm providing the highest quality of legal representation to its clients.
                    </p>
                    <div className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed font-light">
                      <p>
                        As attorneys, our record verdicts and unwavering dedication to representing our clients have earned us a national reputation for diligent, compassionate, and competent advocacy in our areas of law.
                      </p>
                      <p>
                        "JUS & LAY" is a well-established, medium-sized law firm with significant national capacity through a network of associates, giving us sizable influence in key financial centers throughout the country.
                      </p>
                      <p>
                        For several years, the firm has provided the highest quality legal representation to institutional and individual clients. We offer a full range of corporate, commercial, civil, and criminal legal services, particularly in Corporate and Banking Laws, litigation, and legal advisory services.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#070e1b] border border-white/5 p-6 rounded-xs space-y-6">
                    <h4 className="font-serif text-xs uppercase tracking-widest text-[#ffbc57] font-semibold border-b border-white/10 pb-2">
                      Core Institutional Commitment
                    </h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      Our services to financial institutions cover complex corporate matters and transaction-based legal opinions on banking client affairs.
                    </p>
                    <div className="space-y-2 text-xs text-white/80">
                      <div className="flex gap-2 items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>Sovereign Financial Agreements</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>Security Perfection & Title Audits</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>High-Profile SECP Clearances</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>Arbitration & Appellate Representation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FOCUS & APPROACH */}
            {activeTab === "focus" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                    Division II
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Strategic Focus & Legal Philosophy
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Point 1 */}
                  <div className="p-6 bg-[#070e1b] border border-white/5 hover:border-gold/30 rounded-xs transition-all duration-350 flex flex-col gap-4">
                    <div className="p-2 border border-gold/20 bg-gold/5 text-gold rounded-xs w-fit">
                      <Building className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Client-Centric Mandate</h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      As a corporate and commercial law firm, we strongly focus on the needs of our clients and their respective businesses.
                    </p>
                  </div>

                  {/* Point 2 */}
                  <div className="p-6 bg-[#070e1b] border border-white/5 hover:border-gold/30 rounded-xs transition-all duration-350 flex flex-col gap-4">
                    <div className="p-2 border border-gold/20 bg-gold/5 text-gold rounded-xs w-fit">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Rapid & Innovative Solutions</h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      Our client base requires rapid response, appropriate advice, and innovative legal solutions based on a full understanding of their individual business needs.
                    </p>
                  </div>

                  {/* Point 3 */}
                  <div className="p-6 bg-[#070e1b] border border-white/5 hover:border-gold/30 rounded-xs transition-all duration-350 flex flex-col gap-4">
                    <div className="p-2 border border-gold/20 bg-gold/5 text-gold rounded-xs w-fit">
                      <Award className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Exceptional Service Delivery</h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      Our practice is built on a reputation for exceptional service delivery, combined with outstanding skills, knowledge, and legal expertise. We follow a holistic approach to ensure clients receive sterling advice.
                    </p>
                  </div>

                  {/* Point 4 */}
                  <div className="p-6 bg-[#070e1b] border border-white/5 hover:border-gold/30 rounded-xs transition-all duration-350 flex flex-col gap-4">
                    <div className="p-2 border border-gold/20 bg-gold/5 text-gold rounded-xs w-fit">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Swift National Networks</h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      Our firm is designed for efficiency and accessibility. Through our effective network of associates, we respond swiftly to the needs of our clients locally and abroad.
                    </p>
                  </div>

                  {/* Point 5 */}
                  <div className="p-6 bg-[#070e1b] border border-white/5 hover:border-gold/30 rounded-xs transition-all duration-350 flex flex-col gap-4">
                    <div className="p-2 border border-gold/20 bg-gold/5 text-gold rounded-xs w-fit">
                      <Coins className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Refined Cost-Efficiency</h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      In pursuit of excellence for our clients, we continually maintain a balance between elite corporate legal representation and budget cost efficiency.
                    </p>
                  </div>

                  {/* Point 6 */}
                  <div className="p-6 bg-[#070e1b] border border-white/5 hover:border-gold/30 rounded-xs transition-all duration-350 flex flex-col gap-4">
                    <div className="p-2 border border-gold/20 bg-gold/5 text-gold rounded-xs w-fit">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Global Economic Vision</h4>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                      We have a keen understanding of global economic and market trends, allowing us to cut straight to the chase and find immediate resolution in complex litigation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRACTICE AREAS & JURISDICTIONS */}
            {activeTab === "services" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                    Division III
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Corporate Practices & Areas of Counsel
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRACTICE_AREAS.map((practice, index) => (
                    <div
                      key={practice.id}
                      onClick={() => setSelectedPractice(practice)}
                      className="group p-6 bg-[#070e1b] border border-white/5 rounded-xs hover:border-gold/30 hover:bg-[#070e1b]/45 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-gold/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xs" />
                      
                      <div className="space-y-4">
                        <div className="p-2.5 border border-gold/25 bg-gold/10 text-gold rounded-xs w-fit transition-all duration-300 group-hover:bg-gold group-hover:text-navy">
                          {getPracticeIcon(practice.icon)}
                        </div>
                        <h4 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                          {practice.title}
                        </h4>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                          {practice.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold tracking-widest text-gold/80 group-hover:text-gold group-hover:translate-x-1.5 transition-all duration-300 mt-6 border-t border-white/5 pt-3">
                        EXPLORE LIMITS <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SERVICES TO FINANCIAL INSTITUTIONS */}
            {activeTab === "banking" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                      Division IV
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Advisory to Financial Institutions
                    </h3>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {financialClients.map((client, idx) => (
                      <span key={idx} className="bg-white/5 text-white/50 text-[9px] tracking-wider font-sans font-bold px-2 py-1 rounded-sm border border-white/10">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Contentious Matters */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                      <ShieldAlert className="w-5 h-5 text-[#ff6b6b]" />
                      <h4 className="font-serif text-lg font-bold text-white">
                        Contentious Matters
                      </h4>
                    </div>
                    <p className="text-white/60 text-xs sm:text-sm font-light">
                      We protect financial institutions in litigation, trial courts, and regulatory disputes.
                    </p>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {[
                        "Recovery suits by and against banks",
                        "HR and employment matters",
                        "Civil litigation defense",
                        "Law Enforcement Agency (LEA) matters"
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-[#070e1b] border border-white/5 hover:border-gold/20 rounded-xs items-center">
                          <div className="w-1.5 h-1.5 bg-[#ff6b6b] rounded-full shrink-0" />
                          <span className="text-white/90 text-xs sm:text-sm font-sans">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Non-Contentious Matters */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-2">
                      <ShieldCheck className="w-5 h-5 text-[#2ecc71]" />
                      <h4 className="font-serif text-lg font-bold text-white">
                        Non-Contentious Matters
                      </h4>
                    </div>
                    <p className="text-white/60 text-xs sm:text-sm font-light">
                      Delivering diligent legal frameworks to secure mortgages, verify legitimacy, and perfect assets.
                    </p>
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {[
                        "Syndicate, corporate, and commercial financing agreements",
                        "Bank collateral guarantees and indemnity structures",
                        "Security perfection and property mortgage audits",
                        "Veracity and genuineness checking of legal deeds",
                        "Trust, finance, estate planning and other corporate opinions"
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-[#070e1b] border border-white/5 hover:border-gold/20 rounded-xs items-center">
                          <div className="w-1.5 h-1.5 bg-[#2ecc71] rounded-full shrink-0" />
                          <span className="text-white/90 text-xs sm:text-sm font-sans leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CLIENTS REGISTRY */}
            {activeTab === "clients" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                    Division V
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Corporate & Institutional Chambers Registry
                  </h3>
                </div>

                <div className="space-y-4 max-w-4xl">
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    The credentials, confidence, and trust earned from these premier financial groups, public trusts, state medical facilities, and energy companies form the foundation of our chambers:
                  </p>
                </div>

                {/* Grid of clients represented */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
                  {institutionalClients.map((client, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-[#070e1b] border border-white/5 rounded-xs flex flex-col justify-between hover:border-gold/30 hover:bg-[#070e1b]/40 shadow-md group transition-all duration-300"
                    >
                      <div className="space-y-3">
                        <div className="w-6 h-[1.5px] bg-gold" />
                        <span className="block font-serif text-[13px] sm:text-[14px] font-bold text-white/90 group-hover:text-gold transition-colors duration-250">
                          {client}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-2 text-[8px] uppercase tracking-wider text-white/30 font-sans group-hover:text-white/55">
                        <span>Chambers Client</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gold/30 group-hover:text-gold" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Practice Area Modal in Chambers Profile */}
      <AnimatePresence>
        {selectedPractice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPractice(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-[#070e1b] border border-gold/25 rounded-md overflow-hidden shadow-2xl z-25 p-8 md:p-10"
            >
              <button
                onClick={() => setSelectedPractice(null)}
                className="absolute top-5 right-5 text-white/50 hover:text-gold transition-colors p-2 rounded-full border border-white/5 bg-white/[0.02] focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 border border-gold/30 rounded-xs bg-gold/10 text-gold shadow-sm">
                  {getPracticeIcon(selectedPractice.icon)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                    Practice Briefing
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedPractice.title}
                  </h4>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10 mb-6" />

              <div className="space-y-6">
                <div>
                  <h5 className="text-[11px] uppercase tracking-widest text-gold font-bold mb-2">
                    Scope of Jurisdiction
                  </h5>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
                    {selectedPractice.longDesc}
                  </p>
                </div>

                <div className="p-4 bg-[#0b1324] rounded-xs border border-white/5 flex gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h6 className="font-sans text-xs font-bold text-white uppercase tracking-wider mb-1">
                      Certified Legal Guardrails
                    </h6>
                    <p className="text-white/50 text-xs font-sans leading-relaxed">
                      All strategic protocols within this division strictly respect international compliance directives and national supreme court precedents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => setSelectedPractice(null)}
                  className="px-6 py-3 sm:py-2.5 text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white transition-colors border border-white/10 hover:bg-white/5 rounded-xs w-full sm:w-auto order-2 sm:order-1"
                >
                  Close Brief
                </button>
                <a
                  href={`https://wa.me/923218520085?text=Hello%20Jus%20%26%20Lay%20Law%20Conglomerate%2C%20we%20wish%20to%20consult%20specifically%20regarding%20${encodeURIComponent(selectedPractice.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedPractice(null)}
                  className="px-6 py-3 sm:py-2.5 text-xs font-bold tracking-widest uppercase bg-gold text-[#070e1b] hover:bg-gold hover:text-[#070e1b] transition-all rounded-xs shadow-md text-center w-full sm:w-auto order-1 sm:order-2"
                >
                  WhatsApp Advisory
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
