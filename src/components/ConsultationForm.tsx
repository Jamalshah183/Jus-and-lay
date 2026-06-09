import React, { useState } from "react";
import { ConsultationRequest } from "../types";
import { Send, Check, ShieldCheck, Mail, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConsultationFormProps {
  onSubmitSuccess: (request: ConsultationRequest) => void;
}

export default function ConsultationForm({ onSubmitSuccess }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    matter: "Corporate & M&A Law",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const legalMatters = [
    "Corporate & M&A Law",
    "Complex Civil Litigation",
    "Matrimonial Trusts & Family",
    "Commercial Property & Zoning",
    "Tax & Business Advisory",
    "Ironclad Contract Drafting",
    "Other Specialized Matters",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]); // Clear errors on typing
  };

  const validateForm = () => {
    const validationErrors = [];
    if (!formData.name.trim()) validationErrors.push("Client Name is required");
    
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      validationErrors.push("A valid email is required for docket indexing");
    }
    
    // Simple phone validator
    if (!formData.phone.trim() || formData.phone.length < 7) {
      validationErrors.push("A valid telephone number is required for direct partner callback");
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      validationErrors.push("Please provide a brief summary of the legal matter (minimum 10 characters)");
    }

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Simulate high-end legal server encryption & docket validation
    setTimeout(() => {
      const newRequest: ConsultationRequest = {
        id: "docket_" + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        matter: formData.matter,
        message: formData.message,
        date: new Date().toISOString(),
        status: "Pending",
      };

      onSubmitSuccess(newRequest);
      setIsLoading(false);
      setSuccess(true);
      
      // Reset form variables
      setFormData({
        name: "",
        phone: "",
        email: "",
        matter: "Corporate & M&A Law",
        message: "",
      });

      // Clear success notification after delay
      setTimeout(() => setSuccess(false), 8000);
    }, 1800);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-navy-dark/95 border border-gold/30 rounded-md p-8 md:p-10 shadow-2xl gold-shadow transition-all relative overflow-hidden">
      
      {/* Visual top bar of the form card indicating high-end cryptographic session */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-gold/50 via-gold to-gold/50" />

      {/* Decorative vector watermarks inside forms */}
      <div className="absolute -bottom-8 -right-8 opacity-[0.03] text-white pointer-events-none">
        <ShieldCheck className="w-48 h-48" />
      </div>

      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-2">
          Secure Executive Uplink
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Initiate Counsel Request
        </h3>
        <p className="text-white/60 text-xs font-sans leading-relaxed">
          Brief Jus & Lay's board partners instantly. Your correspondence remains sealed under attorney-client privilege.
        </p>
      </div>

      {/* Handlers of submit outcome */}
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-10 px-4 text-center space-y-6 flex flex-col items-center"
          >
            {/* Stamp seal animate */}
            <motion.div
              initial={{ scale: 0.3, rotate: 45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="w-16 h-16 rounded-full border-2 border-gold/60 bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(255,188,87,0.2)]"
            >
              <Check className="w-8 h-8" strokeWidth={3} />
            </motion.div>

            <div className="space-y-2">
              <h4 className="font-serif text-xl font-bold text-white uppercase tracking-wider">
                Docket Briefing Sealed
              </h4>
              <p className="text-white/70 text-sm font-sans max-w-sm mx-auto leading-relaxed">
                Your legal request is indexed. Founding partners will review cases and call within exactly 6 business hours.
              </p>
            </div>

            <div className="w-full h-[1px] bg-white/10" />

            <div className="text-white/50 text-[10px] font-mono flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-[#2ecc71]" />
              <span>TLS 1.3 256-Bit Sandbox Security Registered</span>
            </div>

            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 text-xs font-sans font-bold tracking-widest text-[#ffbc57] border border-gold/25 hover:bg-gold/10 hover:text-white transition-colors uppercase rounded-xs focus:outline-none"
            >
              Brief Another Matter
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="consultation-form"
            onSubmit={handleSubmit}
            className="space-y-5 relative"
          >
            {/* Display errors */}
            {errors.length > 0 && (
              <div className="p-4 bg-[#6b2121]/30 border border-[#ff5252]/40 rounded-xs flex gap-3 text-red-200">
                <AlertTriangle className="w-5 h-5 text-[#ff5252] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold block uppercase tracking-wider text-[9px] text-[#ffdddd]">
                    Briefing Validation Errors
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 font-sans">
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Client Name */}
            <div>
              <label htmlFor="name-input" className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2 font-sans">
                Full Client Name <span className="text-gold">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Marcus Aurelius, Esq."
                className="w-full p-3 bg-navy/60 border border-white/10 hover:border-white/25 focus:border-gold focus:ring-1 focus:ring-gold text-white text-sm rounded-xs font-sans placeholder-white/20 transition-all duration-300 focus:outline-none"
                disabled={isLoading}
              />
            </div>

            {/* Email & Phone side-by-side on MD */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email-input" className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2 font-sans">
                  Direct Email Address <span className="text-gold">*</span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@corporation.com"
                  className="w-full p-3 bg-navy/60 border border-white/10 hover:border-white/25 focus:border-gold focus:ring-1 focus:ring-gold text-white text-sm rounded-xs font-sans placeholder-white/20 transition-all duration-300 focus:outline-none"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="phone-input" className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2 font-sans">
                  Secure Call Number <span className="text-gold">*</span>
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 0192"
                  className="w-full p-3 bg-navy/60 border border-white/10 hover:border-white/25 focus:border-gold focus:ring-1 focus:ring-gold text-white text-sm rounded-xs font-sans placeholder-white/20 transition-all duration-300 focus:outline-none"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Practice Areas Select */}
            <div>
              <label htmlFor="legal-matter-select" className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2 font-sans">
                Primary Legal Jurisdiction <span className="text-gold">*</span>
              </label>
              <select
                id="legal-matter-select"
                name="matter"
                value={formData.matter}
                onChange={handleInputChange}
                className="w-full p-3 bg-navy/95 border border-white/10 hover:border-white/25 focus:border-gold focus:ring-1 focus:ring-gold text-white text-sm rounded-xs font-sans transition-all duration-300 focus:outline-none cursor-pointer"
                disabled={isLoading}
              >
                {legalMatters.map((opt) => (
                  <option key={opt} value={opt} className="bg-navy-dark">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Brief Message */}
            <div>
              <label htmlFor="consultation-message" className="block text-[10px] uppercase tracking-widest text-white/50 font-bold mb-2 font-sans">
                Legal Brief Statement / Objectives <span className="text-gold">*</span>
              </label>
              <textarea
                id="consultation-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Briefly state structural disputes, liabilities, dates, or assets involved. All entries are encrypted..."
                className="w-full p-3 bg-navy/60 border border-white/10 hover:border-white/25 focus:border-gold focus:ring-1 focus:ring-gold text-white text-sm rounded-xs font-sans placeholder-white/20 transition-all duration-300 focus:outline-none resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 text-xs font-sans font-bold tracking-[0.2em] uppercase bg-gold text-navy rounded-xs hover:bg-white hover:text-navy hover:shadow-[0_0_20px_rgba(255,188,87,0.35)] active:translate-y-px transition-all duration-300 select-none cursor-pointer focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-navy" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Encrypting Briefing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-navy shrink-0" />
                  <span>Submit Consultation Request</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
