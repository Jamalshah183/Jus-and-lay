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
  Users 
} from "lucide-react";

export default function FirmProfile() {
  const [activeTab, setActiveTab] = useState<"overview" | "focus" | "services" | "banking" | "clients">("overview");

  const tabs = [
    { id: "overview", label: "Overview & Heritage", icon: BookOpen },
    { id: "focus", label: "Focus & Approach", icon: Scale },
    { id: "services", label: "Our Services", icon: Layers },
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

            {/* TAB 3: OUR SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-8 text-left">
                <div className="pb-6 border-b border-white/5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold block mb-1">
                    Division III
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Primary Service Sectors & Legal Grid
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Two Main Divisions */}
                  <div className="lg:col-span-6 space-y-6">
                    <h4 className="font-serif text-lg font-bold text-white border-b border-white/5 pb-2">
                      Structured Business Divisions
                    </h4>

                    {/* Division 1 Card */}
                    <div className="p-5 border border-white/5 bg-[#070e1b] rounded-xs relative">
                      <div className="absolute top-0 right-0 py-2 px-3 bg-gold/15 text-gold border-l border-b border-white/5 text-[9px] uppercase font-bold rounded-tr-xs">
                        01
                      </div>
                      <span className="block font-serif text-base font-semibold text-gold mb-1">
                        Corporate & Commercial Services
                      </span>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                        Our primary advisory domain, focusing specifically on transnational transactions, board advisory, regulatory SECP compliance, and corporate restructure planning.
                      </p>
                    </div>

                    {/* Division 2 Card */}
                    <div className="p-5 border border-white/5 bg-[#070e1b] rounded-xs relative">
                      <div className="absolute top-0 right-0 py-2 px-3 bg-gold/15 text-gold border-l border-b border-white/5 text-[9px] uppercase font-bold rounded-tr-xs">
                        02
                      </div>
                      <span className="block font-serif text-base font-semibold text-gold mb-1">
                        Litigation & Alternate Dispute Resolution
                      </span>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                        Delivering advocacy across high courts and the Supreme Court of Pakistan, specializing in intensive trials, mediation, and arbitration representation.
                      </p>
                    </div>
                  </div>

                  {/* Executive Summary List */}
                  <div className="lg:col-span-6 bg-[#070e1b] border border-white/5 p-6 sm:p-8 rounded-xs space-y-6">
                    <h4 className="font-serif text-lg font-bold text-white border-b border-white/5 pb-2">
                      Strategic Corporate Practices
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Civil Law",
                        "Criminal Law",
                        "Employment Law",
                        "Environmental Law",
                        "Litigation and Dispute Resolution",
                        "Corporate and Commercial Litigation",
                        "Income Tax and Sales Tax"
                      ].map((service, index) => (
                        <div key={index} className="flex gap-2.5 items-center">
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                          <span className="text-white/80 text-xs sm:text-sm font-sans tracking-wide">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
    </div>
  );
}
