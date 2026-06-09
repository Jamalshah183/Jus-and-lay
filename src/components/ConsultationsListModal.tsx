import { ConsultationRequest } from "../types";
import { Mail, Phone, Calendar, Briefcase, FileText, CheckCircle2, AlertCircle, X, Trash2 } from "lucide-react";
import { motion } from "motion/react";

interface ConsultationsListModalProps {
  onClose: () => void;
  requests: ConsultationRequest[];
  onRemoveRequest: (id: string) => void;
}

export default function ConsultationsListModal({
  onClose,
  requests,
  onRemoveRequest,
}: ConsultationsListModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-3xl bg-navy-dark border border-gold/30 rounded-md overflow-hidden shadow-2xl z-25 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center bg-navy/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 border border-gold/30 rounded-xs bg-gold/15 text-gold">
              <Calendar className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold font-sans">
                Docket Ledger
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                My Consultation Briefings ({requests.length})
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/50 hover:text-gold transition-colors p-2 rounded-full border border-white/5 bg-white/[0.02] focus:outline-none"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content area: list of requests */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          {requests.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              <AlertCircle className="w-12 h-12 text-gold/40 mx-auto" />
              <p className="text-white/60 font-sans text-sm max-w-md mx-auto">
                No active consultation requests found in your local browser docket. Submit the form in the "Case Consultation" section below to register a secure briefing.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-[#122444] border border-white/5 hover:border-gold/20 rounded-xs p-5 md:p-6 transition-all duration-300 relative group flex flex-col md:flex-row justify-between gap-6"
                >
                  <button
                    onClick={() => onRemoveRequest(request.id)}
                    className="absolute top-4 right-4 text-white/30 hover:text-[#ff5252] transition-colors p-1.5 focus:outline-none"
                    title="Withdraw Briefing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Left Side: Sender / Metadata */}
                  <div className="space-y-3 max-w-sm">
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 text-[9px] font-sans font-bold uppercase rounded-full bg-gold/15 text-gold border border-gold/25">
                        {request.status}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {new Date(request.date).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-white group-hover:text-gold transition-colors">
                      {request.name}
                    </h4>

                    <div className="space-y-1.5 text-xs text-white/60 font-sans">
                      <a href={`mailto:${request.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                        <Mail className="w-3.5 h-3.5 text-gold/80" />
                        <span className="truncate">{request.email}</span>
                      </a>
                      <a href={`tel:${request.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors font-mono">
                        <Phone className="w-3.5 h-3.5 text-gold/80" />
                        <span>{request.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Message / Content */}
                  <div className="flex-1 md:border-l md:border-white/10 md:pl-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold font-sans text-gold uppercase tracking-wider">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{request.matter}</span>
                    </div>

                    <div className="p-3 bg-navy-dark/40 rounded-xs border border-white/5 text-white/85 text-xs leading-relaxed font-sans max-h-[120px] overflow-y-auto">
                      <p>{request.message}</p>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] text-white/40 font-semibold font-sans mt-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2ecc71]" />
                      <span>Secured with AES-256 local client sandbox protocol</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 flex justify-end bg-navy/90 gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold tracking-widest uppercase bg-gold text-navy hover:bg-white transition-all rounded-xs focus:outline-none"
          >
            Acknowledge Docket
          </button>
        </div>
      </motion.div>
    </div>
  );
}
