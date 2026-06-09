import { useState, useEffect } from "react";
import { MessageCircle, ShieldCheck, Clock, CheckCircle, ArrowUpRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConsultationFormProps {
  onSubmitSuccess?: (request: any) => void;
}

export default function ConsultationForm({ onSubmitSuccess }: ConsultationFormProps) {
  const [activeRouting, setActiveRouting] = useState<"general" | "mna" | "litigation" | "tax">("general");
  const [copiedLink, setCopiedLink] = useState(false);
  const [pktTime, setPktTime] = useState("");

  // Keep a live Pakistani Standard Time (UTC+5) ticking for premium accuracy
  useEffect(() => {
    const updatePktTime = () => {
      const now = new Date();
      // Calculate UTC+5 for Pakistan
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const pktDate = new Date(utc + 3600000 * 5);
      
      const hours = pktDate.getHours();
      const minutes = pktDate.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
      setPktTime(`${formattedHours}:${formattedMinutes} ${ampm} PKT`);
    };

    updatePktTime();
    const interval = setInterval(updatePktTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const routingDetails = {
    general: {
      label: "General Counsel Liaison",
      message: "Hello Jus %26 Lay, we are looking to establish a secure partnership dialogue for corporate advisory.",
      desc: "Connect directly with our corporate intake desk for non-disclosure agreement (NDA) issuance and general retainer briefings.",
    },
    mna: {
      label: "SECP, M&A & Board Structuring",
      message: "Hello Jus %26 Lay, we require urgent corporate legal advise regarding SECP compliance or M%26A transactions.",
      desc: "Immediate routing to senior merger counsel for corporate mergers, SECP clearances, or international joint-ventures.",
    },
    litigation: {
      label: "Appellate & High-Court Litigation",
      message: "Hello Jus %26 Lay, we require urgent Senior Partner litigation counsel for an upcoming commercial appeal.",
      desc: "High-priority routing to Barrister Jamal M. Shah for emergency stay-orders, High Court filings and arbitrations.",
    },
    tax: {
      label: "Tax, FBR, Energy & NEPRA Tariff Law",
      message: "Hello Jus %26 Lay, our enterprise requires urgent counsel regarding a NEPRA tariff or FBR tax recovery appeal.",
      desc: "Direct routing to Advocate Zane Malik for FBR tax appellate defense, NEPRA/OGRA regulatory tariffs, or IPP power-sector counsel.",
    },
  };

  const currentRoute = routingDetails[activeRouting];
  const whatsAppLink = `https://wa.me/923218520085?text=${encodeURIComponent(currentRoute.message.replace(/%26/g, "&"))}`;

  const handleCopyChannel = () => {
    navigator.clipboard.writeText("+92 321 852 0085");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-navy-dark/95 border border-gold/30 rounded-md p-8 md:p-10 shadow-2xl gold-shadow transition-all relative overflow-hidden">
      {/* Visual luxury top border */}
      <div className="absolute top-0 inset-x-0 h-[3.5px] bg-gradient-to-r from-gold/50 via-gold to-gold/50" />

      {/* Background vector watermark */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] text-white pointer-events-none">
        <MessageCircle className="w-52 h-52 text-[#2ecc71]" />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-bold block">
            Direct Boardroom Connection
          </span>
          {/* Status badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2ecc71]/15 text-[#2ecc71] border border-[#2ecc71]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71] animate-ping" />
            <span className="text-[9px] uppercase tracking-wider font-extrabold font-sans">
              On-Call Active
            </span>
          </div>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Direct Partner Counsel
        </h3>
        <p className="text-white/60 text-xs sm:text-sm font-sans leading-relaxed">
          We maintain absolute discretion. To protect legal privilege and bypass unsecured servers, our chambers prioritize immediate encrypted communication via professional WhatsApp channels.
        </p>
      </div>

      {/* Pakistan Clock and Office Status Panel */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-navy/60 border border-white/5 rounded-xs mb-6 text-left">
        <div>
          <div className="text-[9px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>Chambers Clock (PST)</span>
          </div>
          <span className="block font-mono text-xs font-semibold text-white mt-1">
            {pktTime || "06:30 PM PKT"}
          </span>
        </div>
        <div>
          <div className="text-[9px] uppercase font-bold text-white/40 tracking-widest flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#2ecc71] shrink-0" />
            <span>Intake Speed</span>
          </div>
          <span className="block text-xs font-semibold text-white mt-1 leading-tight">
            Typical response &lt; 5 mins
          </span>
        </div>
      </div>

      {/* Selective Routing Buttons - Elite Corporate Aesthetic */}
      <div className="space-y-3 mb-6">
        <span className="block text-[10px] uppercase font-bold text-[#ffbc57]/80 tracking-widest text-left">
          Select Corporate Routing Profile:
        </span>
        <div className="grid grid-cols-2 gap-2">
          {(["general", "mna", "litigation", "tax"] as const).map((route) => (
            <button
              key={route}
              onClick={() => setActiveRouting(route)}
              className={`p-3 text-left rounded-xs border transition-all duration-300 focus:outline-none flex flex-col justify-between h-20 group relative cursor-pointer ${
                activeRouting === route
                  ? "bg-gold/15 border-gold text-gold"
                  : "bg-navy/40 border-white/5 hover:border-white/20 text-white/60 hover:text-white"
              }`}
            >
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-wider block leading-tight">
                {route === "general" && "General Liaison"}
                {route === "mna" && "SECP & M&A"}
                {route === "litigation" && "High-Court Appeals"}
                {route === "tax" && "FBR & NEPRA Tariffs"}
              </span>
              <div className="flex justify-between items-center w-full mt-auto">
                <span className="text-[9px] text-white/40 font-mono">
                  {route === "general" && "Liaison Desk"}
                  {route === "mna" && "Ayesha Lodhi"}
                  {route === "litigation" && "Barrister Shah"}
                  {route === "tax" && "Zane Malik"}
                </span>
                <ArrowUpRight className={`w-3.5 h-3.5 transition-all duration-300 ${activeRouting === route ? "translate-x-0.5 -translate-y-0.5 opacity-100 text-gold" : "opacity-30 group-hover:opacity-60"}`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Route Info Box */}
      <div className="p-4 bg-navy/60 border border-white/5 border-l-2 border-l-gold rounded-r-xs mb-8 text-left transition-all duration-300">
        <span className="text-[9px] uppercase font-extrabold text-[#ffbc57]/80 tracking-widest block mb-1">
          {currentRoute.label}
        </span>
        <p className="text-white/70 text-xs font-sans leading-relaxed font-light">
          {currentRoute.desc}
        </p>
      </div>

      {/* Big Action Connection Buttons */}
      <div className="space-y-4">
        {/* Prime WhatsApp link */}
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3.5 py-4.5 bg-neutral-900 border-2 border-[#2ecc71]/60 text-[#2ecc71] hover:bg-[#2ecc71]/10 hover:border-[#2ecc71] font-bold font-sans text-xs tracking-widest uppercase rounded-xs transition-all duration-300 cursor-pointer shadow-xl relative group focus:outline-none"
        >
          {/* Animated pulsing ripple */}
          <span className="absolute inset-0 bg-[#2ecc71]/5 opacity-0 group-hover:opacity-100 rounded-xs transition-opacity duration-300 pointer-events-none" />
          <MessageCircle className="w-5 h-5 text-[#2ecc71] shrink-0" />
          <span>Launch WhatsApp Connection</span>
        </a>

        {/* Copy number backup */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs text-white/40 font-sans">
          <span className="truncate">Chambers Direct Mobile ID: +92 (321) 852-0085</span>
          <button
            onClick={handleCopyChannel}
            className="text-gold hover:text-white underline cursor-pointer focus:outline-none shrink-0"
          >
            {copiedLink ? "✓ Copied Desk Number" : "Copy Number"}
          </button>
        </div>
      </div>

      {/* Solicitor Privileged Banner */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-3 text-left">
        <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div>
          <span className="block text-[10px] text-white/80 font-bold uppercase tracking-wider mb-1">
            Preserved Confidentiality Protection
          </span>
          <span className="block text-white/45 text-[10px] sm:text-xs font-sans leading-relaxed font-light">
            All messages, materials, and briefs submitted under our WhatsApp system are permanently sealed under Solicitor-Client Privilege as legislated in the Qanun-e-Shahadat Order.
          </span>
        </div>
      </div>
    </div>
  );
}
