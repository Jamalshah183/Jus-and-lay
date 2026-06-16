import React, { useState, useEffect } from "react";
import { 
  X, 
  Lock, 
  Shield, 
  User, 
  FileText, 
  Send, 
  Upload, 
  Check, 
  Clock, 
  Edit, 
  Plus, 
  Calendar, 
  AlertCircle, 
  DollarSign, 
  Activity, 
  LogOut, 
  MessageSquare,
  ChevronRight,
  ShieldAlert,
  Loader2,
  FileCheck,
  CheckCircle,
  Briefcase
} from "lucide-react";

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Interfaces
interface Milestone {
  date: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Message {
  id: string;
  sender: "client" | "chambers";
  text: string;
  timestamp: string;
}

interface CaseDocument {
  name: string;
  size: string;
  uploadedAt: string;
}

interface CaseInvoice {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Chambers Hold" | "Escrow Escaped";
}

interface CaseFile {
  id: string;
  clientEmail: string;
  clientName: string;
  caseNumber: string;
  title: string;
  partnerInCharge: string;
  status: string;
  nextHearing: string;
  description: string;
  milestones: Milestone[];
  documents: CaseDocument[];
  messages: Message[];
  invoices: CaseInvoice[];
}

const DEFAULT_CASES: CaseFile[] = [
  {
    id: "hbl-case",
    clientEmail: "client@hbl.com",
    clientName: "Habib Bank Limited (HBL)",
    caseNumber: "HBL/LC-4890/2026",
    title: "Habib Bank Limited v. National Enterprises Inc. (Commercial Recovery)",
    partnerInCharge: "Barrister Jamal M. Shah",
    status: "Under Appellate Stage (High Court)",
    nextHearing: "2026-06-28",
    description: "Supreme commercial recovery suit representing HBL for recovery of defaulted credit facilities under corporate mortgage security pledges.",
    milestones: [
      { date: "2026-06-05", title: "Chamber Replication Filed", description: "Replication and response to defendant’s written statement filed in the High Court.", completed: true },
      { date: "2026-06-12", title: "Injunction Sustained", description: "Stay order against corporate asset sell-off successfully sustained after arguments.", completed: true },
      { date: "2026-06-28", title: "Appellate Merits Arguments", description: "Final oral arguments regarding recovery execution orders scheduled before the Double Bench.", completed: false }
    ],
    documents: [
      { name: "High_Court_Stay_Order_Sustained.pdf", size: "2.4 MB", uploadedAt: "2026-06-12" },
      { name: "Calamity_Grounds_Appeal_Brief.pdf", size: "4.8 MB", uploadedAt: "2026-06-05" },
      { name: "HBL_Mortgage_Security_Pledge.pdf", size: "12.1 MB", uploadedAt: "2026-05-18" }
    ],
    messages: [
      { id: "1", sender: "chambers", text: "Welcome to your secure chambers liaison channel. Barrister Jamal M. Shah has reviewed your instruction.", timestamp: "2026-06-05 10:15" },
      { id: "2", sender: "client", text: "Thank you chambers. We need to ensure the recovery order execution stays active.", timestamp: "2026-06-05 11:30" },
      { id: "3", sender: "chambers", text: "Rest assured, our double bench application has preserved the status quo with absolute priority.", timestamp: "2026-06-12 16:45" }
    ],
    invoices: [
      { id: "INV-9021", description: "High Court Injunction Arguments & Retainer Second Tranche", date: "2026-06-10", amount: 450000, status: "Paid" },
      { id: "INV-8932", description: "Initial Filing & Power of Attorney Registry", date: "2026-05-15", amount: 350000, status: "Paid" },
      { id: "INV-9140", description: "Final Double Bench Merit Arguments Liaison Charge", date: "2026-06-15", amount: 500000, status: "Pending" }
    ]
  },
  {
    id: "secp-case",
    clientEmail: "mna.director@secp-enterprise.com",
    clientName: "SECP Mergers Desk",
    caseNumber: "SECP/REST-023/2026",
    title: "In Re: Board Restructuring & SECP Regulatory Clearances",
    partnerInCharge: "Ms. Ayesha Lodhi",
    status: "Filing Draft Finalized",
    nextHearing: "2026-07-04",
    description: "Legal advisory and compliance registry regarding structural restructuring and merger of cross-border telecom entities under SECP Rules.",
    milestones: [
      { date: "2026-06-10", title: "SECP Restructuring Application Drafted", description: "Comprehensive corporate articles of restructuring prepared by Ms. Lodhi.", completed: true },
      { date: "2026-07-04", title: "SECP Hearing on Merger clearances", description: "Registrar board meeting and hearing for structural clearance sanction.", completed: false }
    ],
    documents: [
      { name: "SECP_Submission_Draft_V3_Signed.pdf", size: "6.1 MB", uploadedAt: "2026-06-11" },
      { name: "Restructuring_Board_Minutes_ChamberSeal.pdf", size: "1.9 MB", uploadedAt: "2026-06-10" }
    ],
    messages: [
      { id: "1", sender: "chambers", text: "Sovereign merger clearances have been drafted and are awaiting your digital signature.", timestamp: "2026-06-10 14:00" },
      { id: "2", sender: "client", text: "Excellent, we have signed the authorization. Let’s prepare for the SECP Registrar desk review.", timestamp: "2026-06-11 09:20" }
    ],
    invoices: [
      { id: "INV-9014", description: "SECP Restructuring Clearance Fee", date: "2026-06-10", amount: 600000, status: "Paid" }
    ]
  },
  {
    id: "wapda-case",
    clientEmail: "energy.advisory@wapda.gov.pk",
    clientName: "WAPDA Regulatory Unit",
    caseNumber: "WAPDA/NEPRA-891/2026",
    title: "NEPRA Tariff Appellate appeal (Interim Stay Petition)",
    partnerInCharge: "Advocate Zane Malik",
    status: "Interim Stay Retained",
    nextHearing: "2026-06-18",
    description: "Appellate regulatory appeal against NEPRA tariff surcharge determination representing the public interest energy grid distribution setup.",
    milestones: [
      { date: "2026-06-14", title: "Appellate Brief Submission", description: "Appellate briefing and emergency stays submitted against arbitrary FBR recovery levies.", completed: true },
      { date: "2026-06-18", title: "Tariff Stay Hearing", description: "Arguments before the single bench on sustaining the recovery stay.", completed: false }
    ],
    documents: [
      { name: "NEPRA_Appeals_Brief_Verified.pdf", size: "8.5 MB", uploadedAt: "2026-06-14" },
      { name: "FBR_Arbitrary_Assessment_Chorography.pdf", size: "3.2 MB", uploadedAt: "2026-06-12" }
    ],
    messages: [
      { id: "1", sender: "chambers", text: "Advocate Zane Malik is on brief for WAPDA tariff issue. Emergency stay application listed for June 18.", timestamp: "2026-06-14 11:00" }
    ],
    invoices: [
      { id: "INV-8991", description: "WAPDA Tariffs Appellate Challenge Prep Retainer", date: "2026-06-11", amount: 750000, status: "Paid" }
    ]
  }
];

export default function PortalModal({ isOpen, onClose }: PortalModalProps) {
  const [currentUser, setCurrentUser] = useState<"none" | "client" | "admin">("none");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [currentClientCase, setCurrentClientCase] = useState<CaseFile | null>(null);
  const [activePortalTab, setActivePortalTab] = useState<"overview" | "documents" | "messages" | "billing">("overview");

  // Admin states
  const [allCases, setAllCases] = useState<CaseFile[]>([]);
  const [selectedCaseIdForAdmin, setSelectedCaseIdForAdmin] = useState<string>("");
  const [adminSection, setAdminSection] = useState<"cases" | "invoices" | "create">("cases");
  const [adminReplyText, setAdminReplyText] = useState("");
  const [clientReplyText, setClientReplyText] = useState("");

  // Create Case states
  const [newCaseClientEmail, setNewCaseClientEmail] = useState("");
  const [newCaseClientName, setNewCaseClientName] = useState("");
  const [newCaseNumber, setNewCaseNumber] = useState("");
  const [newCaseTitle, setNewCaseTitle] = useState("");
  const [newCasePartner, setNewCasePartner] = useState("Barrister Jamal M. Shah");
  const [newCaseStatus, setNewCaseStatus] = useState("Filing Stage");
  const [newCaseNextHearing, setNewCaseNextHearing] = useState("");
  const [newCaseDescription, setNewCaseDescription] = useState("");

  // Document upload state
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Fee state
  const [newInvoiceDesc, setNewInvoiceDesc] = useState("");
  const [newInvoiceAmount, setNewInvoiceAmount] = useState("");

  // Load and sync local storage
  useEffect(() => {
    const saved = localStorage.getItem("jus_lay_cases");
    if (saved) {
      try {
        setAllCases(JSON.parse(saved));
      } catch (e) {
        setAllCases(DEFAULT_CASES);
      }
    } else {
      localStorage.setItem("jus_lay_cases", JSON.stringify(DEFAULT_CASES));
      setAllCases(DEFAULT_CASES);
    }
  }, []);

  const saveCasesToStorage = (casesToSave: CaseFile[]) => {
    localStorage.setItem("jus_lay_cases", JSON.stringify(casesToSave));
    setAllCases(casesToSave);
    
    // Update active client case too if logged in
    if (currentClientCase) {
      const updated = casesToSave.find((c) => c.clientEmail === currentClientCase.clientEmail);
      if (updated) {
        setCurrentClientCase(updated);
      }
    }
    
    // Update admin selected case
    if (selectedCaseIdForAdmin) {
      const updated = casesToSave.find((c) => c.id === selectedCaseIdForAdmin);
      if (updated === undefined) {
        setSelectedCaseIdForAdmin("");
      }
    }
  };

  if (!isOpen) return null;

  // Login handler
  const handleLogin = (e: React.FormEvent, role: "client" | "admin") => {
    e.preventDefault();
    if (role === "admin") {
      if (clientEmail === "admin@jusandlay.com" && clientPassword === "admin123") {
        setCurrentUser("admin");
        setErrorMsg("");
        // Select first case on admin screen by default
        if (allCases.length > 0) {
          setSelectedCaseIdForAdmin(allCases[0].id);
        }
      } else {
        setErrorMsg("Invalid credentials. Enter admin@jusandlay.com and admin123.");
      }
    } else {
      // Find case with this client email
      const matchedCase = allCases.find((c) => c.clientEmail.toLowerCase() === clientEmail.trim().toLowerCase());
      if (matchedCase && clientPassword === "client123") {
        setCurrentUser("client");
        setCurrentClientCase(matchedCase);
        setErrorMsg("");
      } else {
        setErrorMsg("Unauthenticated credentials. Enter a valid registered client email (e.g. client@hbl.com) and password client123.");
      }
    }
  };

  const [errorMsg, setErrorMsg] = useState("");

  const bypassLogin = (email: string, role: "client" | "admin") => {
    setClientEmail(email);
    setClientPassword(role === "admin" ? "admin123" : "client123");
    setErrorMsg("");
  };

  const handleLogout = () => {
    setCurrentUser("none");
    setClientEmail("");
    setClientPassword("");
    setCurrentClientCase(null);
    setSelectedCaseIdForAdmin("");
    setErrorMsg("");
  };

  // Client messages handler
  const sendClientMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientReplyText.trim() || !currentClientCase) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "client",
      text: clientReplyText.trim(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
    };

    const updatedCases = allCases.map((c) => {
      if (c.id === currentClientCase.id) {
        return {
          ...c,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    });

    saveCasesToStorage(updatedCases);
    setClientReplyText("");

    // Setup an automated quick liaison clerk acknowledgment to demonstrate interaction
    setTimeout(() => {
      const deskAck: Message = {
        id: (Date.now() + 1).toString(),
        sender: "chambers",
        text: `Secure liaison alert: Chambers is processing your query. Barrister's Desk will finalize response shortly.`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
      };
      
      const casesWithAck = updatedCases.map((c) => {
        if (c.id === currentClientCase.id) {
          return {
            ...c,
            messages: [...c.messages, deskAck]
          };
        }
        return c;
      });
      saveCasesToStorage(casesWithAck);
    }, 1500);
  };

  // Admin reply handler
  const sendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim() || !selectedCaseIdForAdmin) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "chambers",
      text: adminReplyText.trim(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
    };

    const updatedCases = allCases.map((c) => {
      if (c.id === selectedCaseIdForAdmin) {
        return {
          ...c,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    });

    saveCasesToStorage(updatedCases);
    setAdminReplyText("");
  };

  // Drag and drop event handling
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(null);
            // File simulation upload succeeded
            const newDoc: CaseDocument = {
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              uploadedAt: new Date().toISOString().split("T")[0]
            };

            const targetCaseId = currentUser === "client" ? currentClientCase?.id : selectedCaseIdForAdmin;
            if (targetCaseId) {
              const updatedCases = allCases.map((c) => {
                if (c.id === targetCaseId) {
                  return {
                    ...c,
                    documents: [newDoc, ...c.documents]
                  };
                }
                return c;
              });
              saveCasesToStorage(updatedCases);
            }
          }, 600);
          return 100;
        }
        return prev + 15;
      });
    }, 100);
  };

  // Create new Case file
  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseClientEmail || !newCaseClientName || !newCaseNumber || !newCaseTitle) return;

    const newCase: CaseFile = {
      id: `case-${Date.now()}`,
      clientEmail: newCaseClientEmail.trim(),
      clientName: newCaseClientName.trim(),
      caseNumber: newCaseNumber.trim(),
      title: newCaseTitle.trim(),
      partnerInCharge: newCasePartner,
      status: newCaseStatus,
      nextHearing: newCaseNextHearing || "TBD",
      description: newCaseDescription.trim() || "Regulatory litigation dossier administered by Jus & Lay.",
      milestones: [
        { date: new Date().toISOString().split("T")[0], title: "Chamber Lodge Initiated", description: "Case file securely generated on the liaison index.", completed: true }
      ],
      documents: [],
      messages: [
        { id: "1", sender: "chambers", text: `Chambers docket generated. File: ${newCaseNumber}. Secure channel active under strict privilege.`, timestamp: new Date().toISOString().replace("T", " ").substring(0, 16) }
      ],
      invoices: []
    };

    saveCasesToStorage([newCase, ...allCases]);
    setNewCaseClientEmail("");
    setNewCaseClientName("");
    setNewCaseNumber("");
    setNewCaseTitle("");
    setNewCaseDescription("");
    setNewCaseNextHearing("");
    setAdminSection("cases");
    setSelectedCaseIdForAdmin(newCase.id);
  };

  // Admin delete case
  const handleDeleteCase = (id: string) => {
    if (confirm("Are you sure you want to archived/delete this case file under privilege?")) {
      const filtered = allCases.filter((c) => c.id !== id);
      saveCasesToStorage(filtered);
      if (filtered.length > 0) {
        setSelectedCaseIdForAdmin(filtered[0].id);
      } else {
        setSelectedCaseIdForAdmin("");
      }
    }
  };

  // Update case status
  const updateCaseStatus = (status: string) => {
    if (!selectedCaseIdForAdmin) return;
    const updated = allCases.map((c) => {
      if (c.id === selectedCaseIdForAdmin) {
        const newMilestone: Milestone = {
          date: new Date().toISOString().split("T")[0],
          title: `Status Changed: ${status}`,
          description: `Docket priority adjusted by liaison control officer.`,
          completed: true
        };
        return {
          ...c,
          status: status,
          milestones: [...c.milestones, newMilestone]
        };
      }
      return c;
    });
    saveCasesToStorage(updated);
  };

  // Add invoice
  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceDesc || !newInvoiceAmount || !selectedCaseIdForAdmin) return;

    const newInvoice: CaseInvoice = {
      id: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
      description: newInvoiceDesc,
      date: new Date().toISOString().split("T")[0],
      amount: parseFloat(newInvoiceAmount),
      status: "Pending"
    };

    const updated = allCases.map((c) => {
      if (c.id === selectedCaseIdForAdmin) {
        return {
          ...c,
          invoices: [newInvoice, ...c.invoices]
        };
      }
      return c;
    });

    saveCasesToStorage(updated);
    setNewInvoiceDesc("");
    setNewInvoiceAmount("");
  };

  // Pay/settle client invoice online
  const settleInvoice = (invoiceId: string) => {
    if (!currentClientCase) return;
    const updated = allCases.map((c) => {
      if (c.id === currentClientCase.id) {
        return {
          ...c,
          invoices: c.invoices.map((inv) => {
            if (inv.id === invoiceId) {
              return { ...inv, status: "Paid" as const };
            }
            return inv;
          })
        };
      }
      return c;
    });
    saveCasesToStorage(updated);
  };

  const selectedAdminCase = allCases.find((c) => c.id === selectedCaseIdForAdmin);

  return (
    <div className="fixed inset-0 z-50 bg-[#02050b]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl bg-[#091021] border border-gold/30 rounded-lg shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[680px] overflow-hidden"
        id="privileged-liaison-portal"
      >
        {/* Dynamic Header Watermark */}
        <div className="absolute top-0 inset-x-0 h-[3.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10" />

        {/* --- 1. LEFT PANEL: SECURE ACCREDITATION OR CONSOLE RAIL --- */}
        <div className="w-full md:w-[280px] bg-[#050b16] border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-gold animate-pulse" />
              <div>
                <span className="block text-[8px] uppercase tracking-widest font-extrabold text-[#ffbc57]/80">Jus & Lay Chambers</span>
                <span className="block font-serif text-[13px] font-bold text-white tracking-wide">Privileged Client desk</span>
              </div>
            </div>

            {currentUser === "none" ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-sm bg-gold/5 border border-gold/15 text-left">
                  <span className="text-[10px] font-sans font-extrabold uppercase text-gold tracking-widest block mb-1">
                    System Credentials
                  </span>
                  <p className="text-white/50 text-[10px] font-sans leading-relaxed">
                    Access to both case files and regulatory invoices is protected by strict Qanun-e-Shahadat Solicitor Privilege standards.
                  </p>
                </div>

                {/* Quick Access helper for easy testing */}
                <div className="space-y-2 mt-4 text-left">
                  <span className="text-[9px] uppercase tracking-wider text-white/50 font-bold block">
                    Bypass Testing Gate:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    <button 
                      onClick={() => bypassLogin("client@hbl.com", "client")}
                      className="p-1 px-2.5 bg-navy border border-white/5 text-left text-[10px] hover:bg-gold/15 hover:border-gold/30 text-white/70 block transition-all"
                    >
                      🛡️ HBL Client (client@hbl.com)
                    </button>
                    <button 
                      onClick={() => bypassLogin("mna.director@secp-enterprise.com", "client")}
                      className="p-1 px-2.5 bg-navy border border-white/5 text-left text-[10px] hover:bg-gold/15 hover:border-gold/30 text-white/70 block transition-all"
                    >
                      👔 SECP Client (mna.director@secp-enterprise.com)
                    </button>
                    <button 
                      onClick={() => bypassLogin("admin@jusandlay.com", "admin")}
                      className="p-1 px-2.5 bg-navy border border-white/5 text-left text-[10px] hover:bg-gold/15 hover:border-gold/30 text-white/70 block transition-all"
                    >
                      ⚖️ Chambers Admin (admin@jusandlay.com)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold text-xs">
                    {currentUser === "admin" ? "AD" : currentClientCase?.clientName?.substring(0, 2) || "CL"}
                  </div>
                  <div className="text-left overflow-hidden">
                    <span className="block text-[11px] font-bold text-white truncate">
                      {currentUser === "admin" ? "Chambers Partner" : currentClientCase?.clientName}
                    </span>
                    <span className="block text-[9px] text-[#ffbc57] uppercase tracking-wider font-semibold">
                      {currentUser === "admin" ? "Managing Desk" : currentClientCase?.caseNumber}
                    </span>
                  </div>
                </div>

                {/* Client specific menus */}
                {currentUser === "client" && (
                  <nav className="flex flex-col gap-1 mt-6 text-left">
                    <button
                      onClick={() => setActivePortalTab("overview")}
                      className={`w-full py-2 px-3 rounded text-[11px] tracking-wide font-sans font-bold uppercase transition-all flex items-center gap-2 ${activePortalTab === "overview" ? "bg-gold/10 text-gold border-l-2 border-gold" : "text-white/60 hover:bg-white/[0.02]"}`}
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Case Dossier</span>
                    </button>
                    <button
                      onClick={() => setActivePortalTab("documents")}
                      className={`w-full py-2 px-3 rounded text-[11px] tracking-wide font-sans font-bold uppercase transition-all flex items-center gap-2 ${activePortalTab === "documents" ? "bg-gold/10 text-gold border-l-2 border-gold" : "text-white/60 hover:bg-white/[0.02]"}`}
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Document Vault</span>
                    </button>
                    <button
                      onClick={() => setActivePortalTab("messages")}
                      className={`w-full py-2 px-3 rounded text-[11px] tracking-wide font-sans font-bold uppercase transition-all flex items-center gap-2 ${activePortalTab === "messages" ? "bg-gold/10 text-gold border-l-2 border-gold" : "text-white/60 hover:bg-white/[0.02]"}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Encrypted Liaison</span>
                    </button>
                    <button
                      onClick={() => setActivePortalTab("billing")}
                      className={`w-full py-2 px-3 rounded text-[11px] tracking-wide font-sans font-bold uppercase transition-all flex items-center gap-2 ${activePortalTab === "billing" ? "bg-gold/10 text-gold border-l-2 border-gold" : "text-white/60 hover:bg-white/[0.02]"}`}
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Retainer Ledger</span>
                    </button>
                  </nav>
                )}

                {/* Admin specific menus */}
                {currentUser === "admin" && (
                  <nav className="flex flex-col gap-1 mt-6 text-left">
                    <button
                      onClick={() => setAdminSection("cases")}
                      className={`w-full py-2 px-3 rounded text-[11px] tracking-wide font-sans font-bold uppercase transition-all flex items-center gap-2 ${adminSection === "cases" ? "bg-gold/10 text-gold border-l-2 border-gold" : "text-white/60 hover:bg-white/[0.02]"}`}
                    >
                      <Activity className="w-3.5 h-3.5" />
                      <span>Chambers Docket ({allCases.length})</span>
                    </button>
                    <button
                      onClick={() => setAdminSection("create")}
                      className={`w-full py-2 px-3 rounded text-[11px] tracking-wide font-sans font-bold uppercase transition-all flex items-center gap-2 ${adminSection === "create" ? "bg-gold/10 text-gold border-l-2 border-gold" : "text-white/60 hover:bg-white/[0.02]"}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Case File</span>
                    </button>
                  </nav>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 text-left">
            <span className="block text-[8px] uppercase tracking-wider text-white/35 font-mono">
              Encryption Status: AES-GCM
            </span>
            {currentUser !== "none" && (
              <button
                onClick={handleLogout}
                className="w-full py-2 rounded border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out Desk</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-2 rounded border border-white/10 hover:bg-white/5 transition-all text-xs text-white/60 font-bold block"
            >
              Exit Gateway
            </button>
          </div>
        </div>

        {/* --- 2. MAIN CENTER CONTENT PORTAL CONTAINER --- */}
        <div className="flex-1 bg-navy/20 flex flex-col h-full overflow-y-auto">
          {currentUser === "none" ? (
            /* ================= LOGIN FORM VIEW ================= */
            <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto p-8 text-center space-y-6">
              <div className="p-4 bg-gold/10 border border-gold/30 rounded-full">
                <Lock className="w-8 h-8 text-gold animate-pulse" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-extrabold text-white">Chamber Gateway</h3>
                <p className="text-white/50 text-xs sm:text-sm font-sans mt-2">
                  Please log in below to access sensitive filings, appellate dates, secure documents, and direct partner counsel threads.
                </p>
              </div>

              {errorMsg && (
                <div className="w-full text-left p-3.5 text-xs bg-red-500/15 border border-red-500/30 text-red-400 rounded flex gap-2.5 items-center">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={(e) => handleLogin(e, clientEmail === "admin@jusandlay.com" ? "admin" : "client")} className="w-full space-y-4">
                <div>
                  <label className="block text-left text-[10px] uppercase font-bold text-gold tracking-widest mb-1.5">
                    Liaison Account Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. client@hbl.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#050b16] border border-white/15 outline-none rounded p-3 text-xs focus:border-gold transition-colors text-white text-left font-mono"
                  />
                </div>

                <div>
                  <label className="block text-left text-[10px] uppercase font-bold text-gold tracking-widest mb-1.5">
                    Security Passcode
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    className="w-full bg-[#050b16] border border-white/15 outline-none rounded p-3 text-xs focus:border-gold transition-colors text-white text-left font-mono"
                  />
                  <span className="block text-left text-[9px] text-white/30 font-sans mt-1">
                    Demo Password: client123 or admin123
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      setClientEmail("client@hbl.com");
                      setClientPassword("client123");
                      setTimeout(() => {
                        handleLogin(e as any, "client");
                      }, 100);
                    }}
                    className="py-3 px-4 rounded border border-white/10 hover:border-gold/30 hover:bg-gold/5 bg-navy/40 transition-colors text-xs font-bold text-white/80 cursor-pointer"
                  >
                    Quick HBL Client
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      setClientEmail("admin@jusandlay.com");
                      setClientPassword("admin123");
                      setTimeout(() => {
                        handleLogin(e as any, "admin");
                      }, 100);
                    }}
                    className="py-3 px-4 rounded bg-gold text-navy hover:bg-[#ffbc57] transition-all text-xs font-bold font-sans tracking-wide cursor-pointer"
                  >
                    Partner Console
                  </button>
                </div>
              </form>
            </div>
          ) : currentUser === "client" ? (
            /* ================= CLIENT DESK VIEWS ================= */
            <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col h-full overflow-y-auto">
              
              {/* Client Tab: Overview */}
              {activePortalTab === "overview" && currentClientCase && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="border-b border-white/5 pb-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/15 text-[9px] uppercase tracking-wider font-extrabold font-sans">
                      Active Legal Matter
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-2">
                      {currentClientCase.title}
                    </h4>
                    <p className="text-white/40 text-xs font-mono mt-1">Chambers Docket No: {currentClientCase.caseNumber}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#050b16] border border-white/5 rounded space-y-3">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold block">
                        Assigned Counsel
                      </span>
                      <p className="text-sm font-semibold text-white">{currentClientCase.partnerInCharge}</p>
                      <p className="text-xs text-white/60 leading-relaxed font-light">{currentClientCase.description}</p>
                    </div>

                    <div className="p-4 bg-[#050b16] border border-white/5 rounded space-y-3">
                      <span className="text-[10px] uppercase tracking-wider text-gold font-bold block">
                        Hearing Calendar Panel
                      </span>
                      <div className="flex gap-3 items-center">
                        <Calendar className="w-5 h-5 text-gold shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-[#f2be6d] font-mono uppercase tracking-wide">Next Court Hearing</p>
                          <p className="text-sm font-bold text-white font-mono mt-0.5">{currentClientCase.nextHearing || "N/A"}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center pt-2 border-t border-white/5">
                        <Activity className="w-5 h-5 text-gold shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-white/50 uppercase tracking-wide">Flow Stage</p>
                          <p className="text-xs font-bold text-green-400 mt-0.5 font-sans uppercase tracking-wider">{currentClientCase.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Case Progress milestones timeline */}
                  <div className="p-5 bg-[#050b16] border border-white/5 rounded space-y-4">
                    <h5 className="font-serif text-xs uppercase font-extrabold text-gold tracking-widest border-b border-white/5 pb-2">
                      Appellate & Procedural Milestones
                    </h5>
                    <div className="space-y-4 relative pl-6 border-l border-white/10 ml-2 pt-2">
                      {currentClientCase.milestones.map((milestone, idx) => (
                        <div key={idx} className="relative space-y-1">
                          <span className={`absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${milestone.completed ? "bg-gold border-gold" : "bg-[#091021] border-[#ffbc57]"}`}>
                            {milestone.completed && <Check className="w-2.5 h-2.5 text-navy-dark stroke-[3]" />}
                          </span>
                          <span className="block font-mono text-[10px] text-white/40">{milestone.date}</span>
                          <p className="text-xs font-bold text-white">{milestone.title}</p>
                          <p className="text-[11px] text-white/50 font-light leading-relaxed">{milestone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Client Tab: Document Vault */}
              {activePortalTab === "documents" && currentClientCase && (
                <div className="space-y-6 text-left animate-fade-in flex-grow flex flex-col h-full">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white">Privileged Document Vault</h4>
                      <p className="text-white/45 text-xs">Direct upload portal to place secure briefs or court filings safely under privilege.</p>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 bg-white/5 text-white/60 border border-white/10 rounded">
                      SSL Confirmed
                    </span>
                  </div>

                  {/* Drag and Drop Uploader */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`relative p-6 border-2 border-dashed rounded text-center transition-all ${
                      dragActive ? "border-gold bg-gold/5" : "border-white/15 bg-navy/40 hover:border-gold/30"
                    }`}
                  >
                    <input
                      type="file"
                      id="case-doc-file-input"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <label htmlFor="case-doc-file-input" className="cursor-pointer block">
                      {uploadProgress !== null ? (
                        <div className="space-y-3 py-2 flex flex-col items-center">
                          <Loader2 className="w-8 h-8 text-gold animate-spin" />
                          <span className="text-xs text-gold font-mono font-bold">Uploading to Chambers Vault: {uploadProgress}%</span>
                          <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gold transition-all duration-100" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 py-2">
                          <div className="mx-auto w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">Drag & Drop case documents here, or click to browse</span>
                            <span className="text-[10px] text-white/40 block mt-1">Acceptable formats: PDF, DOCX, PNG (Max 50MB)</span>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>

                  {/* File Lists */}
                  <div className="space-y-2 overflow-y-auto max-h-[220px]">
                    <span className="block text-[10px] uppercase tracking-wider font-extrabold text-gold">Vault Files Verified ({currentClientCase.documents.length})</span>
                    {currentClientCase.documents.length === 0 ? (
                      <div className="p-4 bg-[#050b16] border border-white/5 rounded text-center text-white/45 text-xs font-light">
                        No custom filings uploaded yet.
                      </div>
                    ) : (
                      currentClientCase.documents.map((doc, idx) => (
                        <div key={idx} className="p-3 bg-[#050b16] border border-white/5 hover:border-gold/10 rounded flex items-center justify-between transition-all">
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText className="w-4.5 h-4.5 text-gold shrink-0" />
                            <div className="text-left min-w-0">
                              <span className="block text-xs font-bold text-white truncate pr-2">{doc.name}</span>
                              <span className="block text-[9px] text-white/35 font-mono">{doc.size} • Uploaded on {doc.uploadedAt}</span>
                            </div>
                          </div>
                          <span className="text-[9px] px-2.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-sans font-bold uppercase shrink-0">
                            Verified
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Client Tab: Encrypted Messages */}
              {activePortalTab === "messages" && currentClientCase && (
                <div className="space-y-4 text-left animate-fade-in flex-grow flex flex-col h-full overflow-hidden">
                  <div className="border-b border-white/5 pb-2">
                    <h4 className="font-serif text-lg font-bold text-white">Chambers Encrypted liaison</h4>
                    <p className="text-white/45 text-xs">A direct privilege liaison stream with {currentClientCase.partnerInCharge} and handling clerks.</p>
                  </div>

                  {/* Message Window */}
                  <div className="flex-grow bg-[#050b16]/70 border border-white/5 p-4 rounded overflow-y-auto space-y-4 h-[240px] flex flex-col">
                    <div className="mt-auto space-y-3">
                      {currentClientCase.messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.sender === "client" ? "ml-auto items-end" : "mr-auto items-start"}`}>
                          <div className={`p-3 rounded-md text-xs leading-relaxed ${msg.sender === "client" ? "bg-gold text-navy-dark font-medium rounded-tr-none" : "bg-navy border border-white/10 text-white rounded-tl-none"}`}>
                            {msg.text}
                          </div>
                          <span className="text-[8px] text-white/30 font-mono mt-1">{msg.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <form onSubmit={sendClientMessage} className="flex gap-2 min-h-[44px]">
                    <input
                      type="text"
                      required
                      placeholder="Type secure message to chambers clerk..."
                      value={clientReplyText}
                      onChange={(e) => setClientReplyText(e.target.value)}
                      className="flex-grow bg-[#050b16] border border-white/15 outline-none rounded px-3 text-xs focus:border-gold text-white text-left"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-5 rounded bg-gold hover:bg-[#ffbc57] text-navy-dark font-extrabold uppercase text-[10px] tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Client Tab: Billing Retainers */}
              {activePortalTab === "billing" && currentClientCase && (
                <div className="space-y-6 text-left animate-fade-in flex-grow flex flex-col h-full">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-white">Chambers Retainer Ledger</h4>
                      <p className="text-white/45 text-xs">Direct log of professional fees, state registry costs, and courtroom retainers.</p>
                    </div>
                  </div>

                  {/* Invoices List */}
                  <div className="space-y-2 overflow-y-auto max-h-[340px]">
                    {currentClientCase.invoices.length === 0 ? (
                      <div className="p-6 bg-[#050b16] border border-white/5 rounded text-center text-white/45 text-xs font-light">
                        No invoice ledger issued yet.
                      </div>
                    ) : (
                      currentClientCase.invoices.map((inv) => (
                        <div key={inv.id} className="p-4 bg-[#050b16] border border-white/5 rounded flex-col sm:flex sm:flex-row sm:items-center sm:justify-between gap-4 transition-all hover:border-gold/10">
                          <div className="text-left space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-extrabold text-[#f1bf6d]">{inv.id}</span>
                              <span className="text-[10px] text-white/50 font-mono">• Dated {inv.date}</span>
                            </div>
                            <span className="block text-xs text-white font-bold">{inv.description}</span>
                            <span className="block font-mono text-xs text-white/70">Amount due: PKR {inv.amount.toLocaleString()}</span>
                          </div>

                          <div className="flex flex-col sm:items-end justify-between gap-2.5 mt-3 sm:mt-0">
                            <span className={`inline-block text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border text-center ${
                              inv.status === "Paid" 
                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                : "bg-orange-500/10 text-orange-400 border-orange-500/20 animate-pulse"
                            }`}>
                              {inv.status}
                            </span>
                            {inv.status === "Pending" && (
                              <button
                                onClick={() => settleInvoice(inv.id)}
                                className="px-3 py-1 bg-gold hover:bg-[#ebae53] text-[#070e1b] rounded text-[9px] uppercase font-bold tracking-wider max-w-max"
                              >
                                Online Clearing (PKR)
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* ================= ADMINISTRATIVE CHAMBERS DESK ================= */
            <div className="p-6 md:p-8 flex-1 flex flex-col h-full overflow-y-auto text-left">
              
              {/* Admin Panel Actions */}
              {adminSection === "cases" && (
                <div className="space-y-6 flex-grow flex flex-col h-full animate-fade-in">
                  <div className="border-b border-white/5 pb-2.5 flex justify-between items-center">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-white">Chambers Case Index</h4>
                      <p className="text-white/45 text-xs">Archive administration, status enforcement, hearing calendar, and invoicing.</p>
                    </div>
                    <button
                      onClick={() => setAdminSection("create")}
                      className="py-2 px-3 bg-gold hover:bg-[#ffbc57] text-[#050b16] text-[10px] font-bold font-sans tracking-wide rounded-sm uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Case File</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[460px] overflow-hidden">
                    
                    {/* LEFT LIST: ALL CASES */}
                    <div className="md:col-span-4 bg-[#050b16] border border-white/5 rounded overflow-y-auto p-2 space-y-1.5 h-full">
                      <span className="block p-2 text-[10px] uppercase font-bold text-white/35 font-mono">List of Matters</span>
                      {allCases.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedCaseIdForAdmin(c.id);
                            setActivePortalTab("overview");
                          }}
                          className={`w-full text-left p-3 rounded transition-all cursor-pointer block border ${selectedCaseIdForAdmin === c.id ? "bg-gold/10 border-gold/40 text-gold" : "bg-transparent border-transparent text-white/70 hover:bg-white/[0.02]"}`}
                        >
                          <span className="block text-[11px] font-extrabold truncate text-white">{c.clientName}</span>
                          <span className="block text-[9px] font-mono text-white/40 mt-0.5 truncate">{c.caseNumber}</span>
                          <span className="inline-block mt-2 text-[8px] uppercase font-bold text-gold bg-gold/10 px-2 rounded-sm border border-gold/15">
                            {c.status}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* RIGHT DETAIL CHANGER */}
                    <div className="md:col-span-8 bg-[#050b16] border border-white/5 rounded p-5 overflow-y-auto h-full flex flex-col justify-between">
                      {selectedAdminCase ? (
                        <div className="space-y-4 flex-grow flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h5 className="text-sm font-bold text-white">{selectedAdminCase.title}</h5>
                                <span className="block text-[10px] text-white/45 font-mono">Client Email: {selectedAdminCase.clientEmail} | Docket: {selectedAdminCase.caseNumber}</span>
                              </div>
                              <button
                                onClick={() => handleDeleteCase(selectedAdminCase.id)}
                                className="text-red-400 hover:text-red-500 font-bold p-1 hover:bg-red-500/15 rounded text-[10px] tracking-wide uppercase font-sans cursor-pointer focus:outline-none shrink-0"
                              >
                                Archive Docket
                              </button>
                            </div>

                            {/* State Modifier */}
                            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                              <div>
                                <label className="block text-[9px] uppercase font-bold text-gold mb-1">Modify Case Flow Status</label>
                                <select
                                  value={selectedAdminCase.status}
                                  onChange={(e) => updateCaseStatus(e.target.value)}
                                  className="w-full bg-navy text-white text-xs border border-white/10 rounded p-2 focus:border-gold outline-none"
                                >
                                  <option value="Chambers Inquest Stage">Chambers Inquest Stage</option>
                                  <option value="Filing Draft Finalized">Filing Draft Finalized</option>
                                  <option value="Interim Stay Retained">Interim Stay Retained</option>
                                  <option value="Under Appellate Stage (High Court)">Under Appellate Stage (High Court)</option>
                                  <option value="Arguments Complete (Awaiting Decree)">Arguments Complete (Awaiting Decree)</option>
                                  <option value="Resolved / Decree Satisfied">Resolved / Decree Satisfied</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase font-bold text-gold mb-1">Next Court Hearing Date</label>
                                <input
                                  type="date"
                                  value={selectedAdminCase.nextHearing}
                                  onChange={(e) => {
                                    const updated = allCases.map((c) => {
                                      if (c.id === selectedAdminCase.id) {
                                        return { ...c, nextHearing: e.target.value };
                                      }
                                      return c;
                                    });
                                    saveCasesToStorage(updated);
                                  }}
                                  className="w-full bg-navy text-white text-xs border border-white/10 rounded p-1.5 focus:border-gold outline-none font-mono"
                                />
                              </div>
                            </div>

                            {/* Invoicing Section inside Admin Details */}
                            <div className="pt-4 border-t border-white/5 flex gap-4">
                              <form onSubmit={handleAddInvoice} className="flex-1 bg-navy/40 p-3 rounded p-2.5 border border-white/5 flex flex-col gap-2">
                                <span className="block text-[9px] uppercase font-bold text-gold">Issue Professional Retainer Fee</span>
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    placeholder="Invoice Description"
                                    required
                                    value={newInvoiceDesc}
                                    onChange={(e) => setNewInvoiceDesc(e.target.value)}
                                    className="bg-[#050b16] border border-white/10 text-xs text-white p-2 outline-none rounded focus:border-gold"
                                  />
                                  <input
                                    type="number"
                                    placeholder="Amount (PKR)"
                                    required
                                    value={newInvoiceAmount}
                                    onChange={(e) => setNewInvoiceAmount(e.target.value)}
                                    className="bg-[#050b16] border border-white/10 text-xs text-white p-2 outline-none rounded focus:border-gold font-mono"
                                  />
                                </div>
                                <button type="submit" className="py-1.5 bg-gold text-[#050b16] rounded font-bold uppercase text-[9px] max-w-max px-4">
                                  Post Retainer Fee Note
                                </button>
                              </form>
                            </div>
                          </div>

                          {/* Message/Liaison Tab for selected Admin case */}
                          <div className="space-y-2 border-t border-white/5 pt-4">
                            <span className="block text-[10px] uppercase font-bold text-white/40">Secure Client Liaison (Live thread)</span>
                            <div className="p-3 bg-navy/40 rounded h-[120px] overflow-y-auto space-y-2.5 max-h-[120px]">
                              {selectedAdminCase.messages.map((m) => (
                                <div key={m.id} className="text-xs">
                                  <span className={`font-bold font-mono ${m.sender === "client" ? "text-green-400" : "text-amber-400"}`}>
                                    [{m.sender === "client" ? "CLIENT" : "CHAMBERS"}]:{" "}
                                  </span>
                                  <span className="text-white/80 font-light">{m.text}</span>
                                  <span className="block text-[8px] text-white/30 font-mono mt-0.5">{m.timestamp}</span>
                                </div>
                              ))}
                            </div>
                            <form onSubmit={sendAdminReply} className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Reply securely to client's boardroom dashboard..."
                                required
                                value={adminReplyText}
                                onChange={(e) => setAdminReplyText(e.target.value)}
                                className="flex-grow bg-[#050b16] border border-white/10 text-xs text-white p-2 outline-none rounded focus:border-gold"
                              />
                              <button type="submit" className="py-2 px-4 bg-gold text-[#050b16] rounded text-[10px] font-bold uppercase">
                                Send Reply
                              </button>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-white/40 text-xs font-light">
                          Select an active case from the left panel to modify or message.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Create Case view */}
              {adminSection === "create" && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="border-b border-white/5 pb-2">
                    <h4 className="font-serif text-lg font-bold text-white">Generate Secure Case File Docket</h4>
                    <p className="text-white/45 text-xs">Generate pristine client dossiers with corresponding local passwords (client123) automatically allocated.</p>
                  </div>

                  <form onSubmit={handleCreateCase} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gold mb-1.5">Client Enterprise Business Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Allied Bank Limited (ABL)"
                        value={newCaseClientName}
                        onChange={(e) => setNewCaseClientName(e.target.value)}
                        className="w-full bg-[#050b16] border border-white/10 outline-none rounded p-3 text-xs focus:border-gold text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gold mb-1.5">Client Liaison Designated Email</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. counsel@alliedbank.com.pk"
                        value={newCaseClientEmail}
                        onChange={(e) => setNewCaseClientEmail(e.target.value)}
                        className="w-full bg-[#050b16] border border-white/10 outline-none rounded p-3 text-xs focus:border-gold text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gold mb-1.5">Chambers Unique Docket Case Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ABL/CIV-1234/2026"
                        value={newCaseNumber}
                        onChange={(e) => setNewCaseNumber(e.target.value)}
                        className="w-full bg-[#050b16] border border-white/10 outline-none rounded p-3 text-xs focus:border-gold text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gold mb-1.5">Hearing Date (Optional)</label>
                      <input
                        type="date"
                        value={newCaseNextHearing}
                        onChange={(e) => setNewCaseNextHearing(e.target.value)}
                        className="w-full bg-[#050b16] border border-white/10 outline-none rounded p-3 text-xs focus:border-gold text-white font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-gold mb-1.5">Case Legal Action Reference Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Allied Bank Limited v. National Finance Corporation (Mortgage Enforcement Suit)"
                        value={newCaseTitle}
                        onChange={(e) => setNewCaseTitle(e.target.value)}
                        className="w-full bg-[#050b16] border border-white/10 outline-none rounded p-3 text-xs focus:border-gold text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-gold mb-1.5">Privileged Litigation Background Description</label>
                      <textarea
                        rows={3}
                        placeholder="Detailed legal action background and target defense scope..."
                        value={newCaseDescription}
                        onChange={(e) => setNewCaseDescription(e.target.value)}
                        className="w-full bg-[#050b16] border border-white/10 outline-none rounded p-3 text-xs focus:border-gold text-white font-light leading-relaxed"
                      />
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setAdminSection("cases")}
                        className="py-3 px-6 rounded border border-white/10 hover:bg-white/5 text-white text-xs font-bold uppercase transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="py-3 px-8 rounded bg-gold hover:bg-[#ffbc57] text-[#050b16] text-xs font-extrabold uppercase transition-all shadow-lg"
                      >
                        Confirm generation
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
