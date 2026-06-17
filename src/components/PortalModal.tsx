import React, { useState, useEffect } from "react";
import { 
  X, 
  Lock, 
  Shield, 
  User, 
  FileText, 
  Upload, 
  Check, 
  Clock, 
  Plus, 
  Calendar, 
  AlertCircle, 
  Activity, 
  LogOut, 
  MessageSquare,
  ChevronRight,
  ShieldAlert,
  Loader2,
  FileCheck,
  CheckCircle,
  Briefcase,
  Users,
  Gavel,
  Search,
  ChevronLeft,
  LayoutGrid,
  CalendarDays,
  ExternalLink,
  Eye,
  EyeOff,
  Save
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  isConfigured as isFirebaseConfigured, 
  db, 
  auth, 
  storage, 
  handleFirestoreError, 
  OperationType 
} from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  setDoc,
  where,
  onSnapshot
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Interfaces matching raw files exactly
interface Hearing {
  date: string;
  nextHearingDate?: string;
  proceedings: string;
  orderSheetUrl?: string;
  caseTitle?: string;
  caseNo?: string;
  purpose?: string;
  judgeName?: string;
  courtName?: string;
  caseId?: string;
}

interface CaseData {
  id?: string;
  caseTitle: string;
  caseNo: string;
  srNo: string;
  judgeName: string;
  courtName: string;
  counselName: string;
  lastHearingDate: string;
  nextHearingDate: string;
  clientId: string;
  clientPassword?: string;
  proceedings: string;
  orderSheetUrl?: string;
  hearings: Hearing[];
  status?: string;
}

interface UserProfile {
  id: string;
  email: string;
  password?: string;
  role: string;
}

// Fallback/Mock cases to run offline in preview if Firebase keys are absent
const DEFAULT_MOCK_CASES: CaseData[] = [
  {
    id: "hbl-case-1",
    caseTitle: "Habib Bank Limited v. National Enterprises Inc. (Commercial Recovery)",
    caseNo: "HBL/LC-4890/2026",
    srNo: "12 / 2026",
    judgeName: "Mr. Justice Babar Sattar",
    courtName: "Islamabad High Court, Islamabad",
    counselName: "Advocate Wajid Awan",
    lastHearingDate: "2026-06-12",
    nextHearingDate: "2026-06-28",
    clientId: "client@hbl.com",
    clientPassword: "client123",
    proceedings: "Injunction stay order against corporate asset sell-off successfully sustained after lengthy arguments.",
    orderSheetUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Ongoing",
    hearings: [
      {
        date: "2026-06-12",
        nextHearingDate: "2026-06-28",
        proceedings: "Stay order sustained. Defendant’s application for discharge dismissed. Main appeal fixed for final parameters.",
        orderSheetUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        purpose: "Stay Argument",
        judgeName: "Mr. Justice Babar Sattar",
        courtName: "Islamabad High Court"
      },
      {
        date: "2026-06-05",
        nextHearingDate: "2026-06-12",
        proceedings: "High replication and board answer submitted before the double bench. Reply filed.",
        purpose: "Replication Filing",
        judgeName: "Mr. Justice Babar Sattar",
        courtName: "Islamabad High Court"
      }
    ]
  },
  {
    id: "secp-case-1",
    caseTitle: "In Re: Board Restructuring & SECP Regulatory Clearances v. Mergers Desk",
    caseNo: "SECP/REST-023/2026",
    srNo: "45",
    judgeName: "Registrar SECP Desk",
    courtName: "Securities & Exchange Commission of Pakistan",
    counselName: "Advocate Wajid Awan",
    lastHearingDate: "2026-06-10",
    nextHearingDate: "2026-07-04",
    clientId: "mna.director@secp-enterprise.com",
    clientPassword: "client123",
    proceedings: "SECP Merger compliance clearances under final reviews. Surcharge stay registered under legal seal.",
    orderSheetUrl: "",
    status: "Ongoing",
    hearings: [
      {
        date: "2026-06-10",
        nextHearingDate: "2026-07-04",
        proceedings: "Articles of merger restructure filed. Bench was satisfied of initial securities board parameters.",
        purpose: "Desk Review",
        judgeName: "Registrar SECP Desk",
        courtName: "Securities & Exchange Commission of Pakistan"
      }
    ]
  }
];

export default function PortalModal({ isOpen, onClose }: PortalModalProps) {
  // Views navigation state: "choice" | "client-login" | "admin-login" | "client-dashboard" | "admin-dashboard"
  const [view, setView] = useState<"choice" | "client-login" | "admin-login" | "client-dashboard" | "admin-dashboard">("choice");
  
  // Real or Mock mode flag
  const isDemo = !isFirebaseConfigured;

  // Session user profile
  const [sessionUser, setSessionUser] = useState<{ email: string; uid: string; role: "client" | "admin" } | null>(null);

  // Authentication Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Cases state
  const [cases, setCases] = useState<CaseData[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Admin section: "list" | "calendar" | "add-case"
  const [adminMode, setAdminMode] = useState<"list" | "calendar">("list");
  const [isAddingCase, setIsAddingCase] = useState(false);
  const [isSavingCase, setIsSavingCase] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Create Case Form Data
  const [formData, setFormData] = useState({
    caseTitle: "",
    caseNo: "",
    srNo: "",
    judgeName: "",
    courtName: "",
    counselName: "Advocate Wajid Awan",
    lastHearingDate: "",
    nextHearingDate: "",
    clientId: "",
    clientPassword: "",
    proceedings: "",
    orderSheetUrl: ""
  });

  // Adding Hearing State
  const [newHearing, setNewHearing] = useState({
    date: "",
    nextHearingDate: "",
    proceedings: "",
    orderSheetUrl: "",
    purpose: "",
    judgeName: "",
    courtName: ""
  });

  // Upload progress simulation
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  // Drag and drop mock
  const [dragActive, setDragActive] = useState(false);

  // Initialize cases from Firestore or local storage fallback
  useEffect(() => {
    if (!isOpen) return;

    if (isDemo) {
      // LocalStorage mode
      const saved = localStorage.getItem("awan_cases_data");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCases(parsed);
          setCasesLoading(false);
        } catch {
          localStorage.setItem("awan_cases_data", JSON.stringify(DEFAULT_MOCK_CASES));
          setCases(DEFAULT_MOCK_CASES);
          setCasesLoading(false);
        }
      } else {
        localStorage.setItem("awan_cases_data", JSON.stringify(DEFAULT_MOCK_CASES));
        setCases(DEFAULT_MOCK_CASES);
        setCasesLoading(false);
      }
    } else {
      // Real Firebase database
      fetchFirestoreCases();
    }
  }, [isOpen, isDemo]);

  // Firestore fetch callback
  const fetchFirestoreCases = async () => {
    setCasesLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'cases'));
      const fetched = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as CaseData));
      setCases(fetched);
    } catch (err) {
      console.error("Firestore loading error:", err);
    } finally {
      setCasesLoading(false);
    }
  };

  if (!isOpen) return null;

  // Sign out triggers
  const handleSignOut = async () => {
    setAuthLoading(true);
    try {
      if (!isDemo && auth) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.error("Firebase Signout error:", err);
    } finally {
      setSessionUser(null);
      setEmail("");
      setPassword("");
      setAuthError("");
      setSelectedCaseId(null);
      setAuthLoading(false);
      setIsAddingCase(false);
      setView("choice");
    }
  };

  // Login Logic
  const handleLoginSubmit = async (e: React.FormEvent, role: "client" | "admin") => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    if (isDemo) {
      // Simulation logins
      setTimeout(() => {
        const userEmail = email.trim().toLowerCase();
        
        if (role === "admin") {
          const admins = ['jamalshah183@gmail.com', 'wajid112211@gmail.com', 'admin@awan.com'];
          if (admins.includes(userEmail) && password === "admin123") {
            setSessionUser({
              email: email.trim(),
              uid: "dev-admin-uid-123",
              role: "admin"
            });
            setView("admin-dashboard");
          } else {
            setAuthError("Unauthorized credentials. Type 'admin@awan.com' or 'jamalshah183@gmail.com' and password 'admin123' to bypass.");
          }
        } else {
          // Client login helper
          const matched = cases.find(c => c.clientId.toLowerCase() === userEmail);
          if (matched && password === "client123") {
            setSessionUser({
              email: email.trim(),
              uid: userEmail,
              role: "client"
            });
            setSelectedCaseId(matched.id || null);
            setView("client-dashboard");
          } else {
            setAuthError("No registered client found. Type 'client@hbl.com' and password 'client123' to bypass.");
          }
        }
        setAuthLoading(false);
      }, 700);
    } else {
      // Real firebase authentication
      try {
        if (role === "admin") {
          // Google provider authentication is usually used for admins on raw admin_login,
          // but we can support both popup Google and email password if requested
          setAuthError("To log in as a real admin, please perform authorized Google sign-in configuration.");
        } else {
          const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
          // Query if cases contain this user's email
          setSessionUser({
            email: userCred.user.email || "",
            uid: userCred.user.uid,
            role: "client"
          });
          setView("client-dashboard");
        }
      } catch (err: any) {
        setAuthError(err.message || "Failed to sign in. Please verify your internet and credentials.");
      } finally {
        setAuthLoading(false);
      }
    }
  };

  // Google SSO authentication for Admins in real Firebase mode
  const handleGoogleAdminLogin = async () => {
    if (isDemo) {
      // Demo Bypass
      setEmail("jamalshah183@gmail.com");
      setPassword("admin123");
      setSessionUser({
        email: "jamalshah183@gmail.com",
        uid: "google-demo-admin",
        role: "admin"
      });
      setView("admin-dashboard");
      return;
    }

    setAuthLoading(true);
    setAuthError("");
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const admins = ['jamalshah183@gmail.com', 'wajid112211@gmail.com'];
      const userEmail = user.email?.toLowerCase();

      if (userEmail && admins.includes(userEmail) && user.providerData.some(p => p.providerId === 'google.com')) {
        setSessionUser({
          email: userEmail,
          uid: user.uid,
          role: "admin"
        });
        setView("admin-dashboard");
      } else {
        await firebaseSignOut(auth);
        setAuthError("Unauthorized access. Only authorized admin accounts are allowed.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Sign-in was cancelled or domain unauthorized.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Fast Test Bypass Credentials
  const bypassLogin = (emailStr: string, passStr: string, r: "client" | "admin") => {
    setEmail(emailStr);
    setPassword(passStr);
    setAuthError("");
    
    // Quick auto log in
    if (isDemo) {
      setSessionUser({
        email: emailStr,
        uid: r === "admin" ? "dev-admin-uid-123" : emailStr,
        role: r
      });
      if (r === "client") {
        const mat = cases.find(c => c.clientId.toLowerCase() === emailStr.toLowerCase());
        setSelectedCaseId(mat ? (mat.id || null) : null);
        setView("client-dashboard");
      } else {
        setView("admin-dashboard");
      }
    }
  };

  // File Upload Logic (Mock or Real)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "orderSheetUrl" | "hearingOrderSheet") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("File is too large. Please upload files smaller than 15MB.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    if (isDemo) {
      // Simulate progress bar beautifully!
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null) return 0;
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(null);
              setIsUploading(false);
              const dummyUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
              if (fieldName === "orderSheetUrl") {
                setFormData(prev => ({ ...prev, orderSheetUrl: dummyUrl }));
                alert(`File "${file.name}" uploaded to mock storage directory.`);
              } else {
                setNewHearing(prev => ({ ...prev, orderSheetUrl: dummyUrl }));
                alert(`Hearing order sheet uploaded to mock storage directory.`);
              }
            }, 600);
            return 100;
          }
          return prev + 10;
        });
      }, 80);
    } else {
      // Real Firebase Storage Upload
      try {
        const storageRef = ref(storage, `cases/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        if (fieldName === "orderSheetUrl") {
          setFormData(prev => ({ ...prev, orderSheetUrl: url }));
        } else {
          setNewHearing(prev => ({ ...prev, orderSheetUrl: url }));
        }
        alert("File successfully saved to Google Cloud Storage!");
      } catch (err: any) {
        alert(`Storage Upload Fail: ${err.message}`);
      } finally {
        setUploadProgress(null);
        setIsUploading(false);
      }
    }
  };

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
      const mockFileEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(mockFileEvent, "orderSheetUrl");
    }
  };

  // Add Case Form Submit (Mock or Real)
  const handleCreateCaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.caseTitle || !formData.caseNo || !formData.clientId) {
      alert("Please fill in crucial fields: Case Title, Case No, and Client Email");
      return;
    }

    setIsSavingCase(true);
    const dateStr = new Date().toISOString().split("T")[0];

    const casePayload: CaseData = {
      caseTitle: formData.caseTitle,
      caseNo: formData.caseNo,
      srNo: formData.srNo || "TBD",
      judgeName: formData.judgeName || "District Judge",
      courtName: formData.courtName || "High Court Central Bench",
      counselName: formData.counselName,
      lastHearingDate: formData.lastHearingDate || dateStr,
      nextHearingDate: formData.nextHearingDate || "None Sched",
      clientId: formData.clientId.trim().toLowerCase(),
      clientPassword: formData.clientPassword || "client123",
      proceedings: formData.proceedings || "Case file initialized on Awan digital docket index.",
      orderSheetUrl: formData.orderSheetUrl,
      hearings: [],
      status: "Ongoing"
    };

    if (isDemo) {
      // LocalStorage persist
      setTimeout(() => {
        const withId = { ...casePayload, id: `case-${Date.now()}` };
        const updated = [withId, ...cases];
        setCases(updated);
        localStorage.setItem("awan_cases_data", JSON.stringify(updated));
        alert("Case docket successfully created locally!");
        setIsAddingCase(false);
        setFormData({
          caseTitle: "",
          caseNo: "",
          srNo: "",
          judgeName: "",
          courtName: "",
          counselName: "Advocate Wajid Awan",
          lastHearingDate: "",
          nextHearingDate: "",
          clientId: "",
          clientPassword: "",
          proceedings: "",
          orderSheetUrl: ""
        });
        setIsSavingCase(false);
      }, 600);
    } else {
      // Firestore database creation
      try {
        await addDoc(collection(db, 'cases'), {
          ...casePayload,
          createdAt: serverTimestamp()
        });
        alert("New case record synchronized successfully to Firestore!");
        setIsAddingCase(false);
        setFormData({
          caseTitle: "",
          caseNo: "",
          srNo: "",
          judgeName: "",
          courtName: "",
          counselName: "Advocate Wajid Awan",
          lastHearingDate: "",
          nextHearingDate: "",
          clientId: "",
          clientPassword: "",
          proceedings: "",
          orderSheetUrl: ""
        });
        fetchFirestoreCases();
      } catch (err: any) {
        alert(`Firestore Error: ${err.message}`);
      } finally {
        setIsSavingCase(false);
      }
    }
  };

  // Add Hearing to Active Case (Mock or Real)
  const handleAddHearingSubmit = async (e: React.FormEvent, parentCaseId: string) => {
    e.preventDefault();
    if (!newHearing.date || !newHearing.proceedings) {
      alert("Please provide Hearing Date and Proceedings description.");
      return;
    }

    setIsSavingCase(true);
    const hearingObj: Hearing = {
      date: newHearing.date,
      nextHearingDate: newHearing.nextHearingDate || "N/A",
      proceedings: newHearing.proceedings,
      orderSheetUrl: newHearing.orderSheetUrl || "",
      purpose: newHearing.purpose || "General Hearing",
      judgeName: newHearing.judgeName || "District Judge",
      courtName: newHearing.courtName || "High Court Bench"
    };

    if (isDemo) {
      setTimeout(() => {
        const updated = cases.map(c => {
          if (c.id === parentCaseId) {
            return {
              ...c,
              lastHearingDate: newHearing.date,
              nextHearingDate: newHearing.nextHearingDate || c.nextHearingDate,
              hearings: [hearingObj, ...(c.hearings || [])]
            };
          }
          return c;
        });
        setCases(updated);
        localStorage.setItem("awan_cases_data", JSON.stringify(updated));
        alert("Hearing record successfully registered to timeline!");
        setNewHearing({
          date: "",
          nextHearingDate: "",
          proceedings: "",
          orderSheetUrl: "",
          purpose: "",
          judgeName: "",
          courtName: ""
        });
        setIsSavingCase(false);
      }, 500);
    } else {
      // Firestore hearing update
      try {
        const caseRef = doc(db, 'cases', parentCaseId);
        const parentCase = cases.find(c => c.id === parentCaseId);
        if (parentCase) {
          const updatedHearings = [hearingObj, ...(parentCase.hearings || [])];
          await updateDoc(caseRef, {
            hearings: updatedHearings,
            lastHearingDate: newHearing.date,
            nextHearingDate: newHearing.nextHearingDate || parentCase.nextHearingDate,
            updatedAt: serverTimestamp()
          });
          alert("Case hearing history updated in Firestore.");
          setNewHearing({
            date: "",
            nextHearingDate: "",
            proceedings: "",
            orderSheetUrl: "",
            purpose: "",
            judgeName: "",
            courtName: ""
          });
          fetchFirestoreCases();
        }
      } catch (err: any) {
        alert(`Firestore Hearing Update failed: ${err.message}`);
      } finally {
        setIsSavingCase(false);
      }
    }
  };

  // Archive / Delete a Case
  const handleArchiveCase = async (caseId: string) => {
    if (!confirm("Are you sure you want to completely delete/archive this case record? This cannot be undone.")) return;

    if (isDemo) {
      const updated = cases.filter(c => c.id !== caseId);
      setCases(updated);
      localStorage.setItem("awan_cases_data", JSON.stringify(updated));
      alert("Case file successfully archived locally.");
      setSelectedCaseId(null);
    } else {
      try {
        const { deleteDoc, doc: fireDoc } = await import('firebase/firestore');
        await deleteDoc(fireDoc(db, 'cases', caseId));
        alert("Case record deleted from Firestore.");
        setSelectedCaseId(null);
        fetchFirestoreCases();
      } catch (err: any) {
        alert(`Delete Fail: ${err.message}`);
      }
    }
  };

  // Filtering list
  const filteredCases = cases.filter(c => 
    c.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCase = cases.find(c => c.id === selectedCaseId) || null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1a30]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="relative w-full max-w-6xl bg-white border border-silver/30 rounded-2xl shadow-3xl flex flex-col md:flex-row h-[90vh] md:h-[720px] overflow-hidden"
        id="awan-associates-portal"
      >
        {/* Top Gold Border Bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40 z-10" />

        {/* --- LEFT PANEL NAVIGATION / STATS RIDER --- */}
        <div className="w-full md:w-[280px] bg-[#0c1a30] p-6 flex flex-col justify-between shrink-0 text-white border-b md:border-b-0 md:border-r border-gold/15">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-7 h-7 text-gold animate-pulse" />
              <div>
                <span className="block text-[8px] uppercase tracking-widest font-extrabold text-gold">Awan Law Associates</span>
                <span className="block font-serif text-[12px] font-bold text-white tracking-wide">Secure Client Portal</span>
              </div>
            </div>

            {view === "choice" || view.includes("login") ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xs bg-[#122847] border border-gold/20 text-left">
                  <span className="text-[9px] font-sans font-extrabold uppercase text-gold tracking-widest block mb-1">
                    System Encryption
                  </span>
                  <p className="text-white/60 text-[10px] font-sans leading-relaxed">
                    Gate communication, files registry, and legal order schedules are fully protected under privilege.
                  </p>
                </div>

                <div className="space-y-2 mt-4 text-left">
                  <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">
                    Fast Bypass Credentials
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    <button 
                      onClick={() => bypassLogin("client@hbl.com", "client123", "client")}
                      className="p-1 px-2.5 bg-[#122847] border border-gold/10 text-left text-[9px] hover:bg-gold hover:text-[#0c1a30] text-gold block transition-all rounded-xs cursor-pointer"
                    >
                      🛡️ HBL Client (client@hbl.com)
                    </button>
                    <button 
                      onClick={() => bypassLogin("mna.director@secp-enterprise.com", "client123", "client")}
                      className="p-1 px-2.5 bg-[#122847] border border-gold/10 text-left text-[9px] hover:bg-gold hover:text-[#0c1a30] text-gold block transition-all rounded-xs cursor-pointer"
                    >
                      👔 SECP Client (mna.director@secp-enterprise.com)
                    </button>
                    <button 
                      onClick={() => bypassLogin("admin@awan.com", "admin123", "admin")}
                      className="p-1 px-2.5 bg-[#122847] border border-gold/10 text-left text-[9px] hover:bg-gold hover:text-[#0c1a30] text-gold block transition-all rounded-xs cursor-pointer"
                    >
                      ⚖️ Advocate Admin (admin@awan.com)
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 p-3 bg-white/[0.04] border border-gold/20 rounded-xs">
                  <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold text-sm border border-gold/30">
                    {sessionUser?.role === "admin" ? "AD" : "CL"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-white truncate">
                      {sessionUser?.role === "admin" ? "Advocate Desk" : sessionUser?.email}
                    </span>
                    <span className="block text-[8px] text-gold uppercase tracking-wider font-semibold">
                      {sessionUser?.role === "admin" ? "Console Admin" : "Active Client"}
                    </span>
                  </div>
                </div>

                {/* Subview selectors inside portals */}
                {sessionUser?.role === "client" && (
                  <div className="space-y-2 pt-4">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Navigation</div>
                    <div className="p-2.5 bg-white/5 border border-gold/10 text-[11px] text-gold rounded-xs">
                      📁 Connected Dossier View
                    </div>
                  </div>
                )}

                {sessionUser?.role === "admin" && (
                  <div className="space-y-2 pt-4">
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Display Mode</div>
                    <div className="flex bg-[#122847] p-1 rounded-xs border border-gold/10 overflow-hidden">
                      <button 
                        onClick={() => { setAdminMode("list"); setIsAddingCase(false); }}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${adminMode === "list" ? "bg-gold text-[#0c1a30]" : "text-slate-300 hover:text-white"}`}
                      >
                        <LayoutGrid className="w-3.5 h-3.5" /> LIST
                      </button>
                      <button 
                        onClick={() => { setAdminMode("calendar"); setIsAddingCase(false); }}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${adminMode === "calendar" ? "bg-gold text-[#0c1a30]" : "text-slate-300 hover:text-white"}`}
                      >
                        <CalendarDays className="w-3.5 h-3.5" /> CALENDAR
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4 text-left">
            <span className="block text-[9px] font-mono text-slate-400 tracking-wider">
              {isDemo ? "🧪 SIMULATION MODE" : "🔒 WORKSPACE FIRESTORE"}
            </span>

            {sessionUser && (
              <button
                onClick={handleSignOut}
                className="w-full py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 rounded-xs transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect Desk</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-xs border border-white/10 text-xs font-bold block transition-all cursor-pointer"
            >
              Close Portal Window
            </button>
          </div>
        </div>

        {/* --- MAIN DISPLAY PANEL --- */}
        <div className="flex-1 bg-slate-50 flex flex-col h-full overflow-y-auto">
          {view === "choice" && (
            /* ================= SELECT PORTAL VIEW ================= */
            <div className="flex-grow flex flex-col justify-center items-center max-w-lg mx-auto p-8 text-center space-y-8 animate-fade-in">
              <div className="space-y-3">
                <div className="w-20 h-20 rounded-full bg-[#0c1a30] border-2 border-gold flex items-center justify-center mx-auto shadow-md">
                  <Shield className="w-10 h-10 text-gold" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#0c1a30] tracking-tight">Access Gateways</h2>
                <p className="text-slate-600 text-sm">
                  Welcome to Awan Law Associates legal services liaison center. Select your gateway node to establish encrypted session.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => setView("client-login")}
                  className="p-6 bg-white border border-slate-200 hover:border-gold hover:shadow-lg transition-all rounded-xl text-left group cursor-pointer"
                >
                  <Briefcase className="w-8 h-8 text-[#0c1a30] group-hover:text-gold mb-4 transition-colors" />
                  <h4 className="font-serif text-lg font-bold text-[#0c1a30]">Client Portal</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    View active case dockets, upcoming hearing calendar details, and download compiled official Court Order sheets.
                  </p>
                </button>

                <button
                  onClick={() => setView("admin-login")}
                  className="p-6 bg-white border border-slate-200 hover:border-gold hover:shadow-lg transition-all rounded-xl text-left group cursor-pointer"
                >
                  <Gavel className="w-8 h-8 text-[#0c1a30] group-hover:text-gold mb-4 transition-colors" />
                  <h4 className="font-serif text-lg font-bold text-[#0c1a30]">Advocate Admin</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Centrally configure case filings, append court milestones, update hearing transcripts, and upload compilations.
                  </p>
                </button>
              </div>
            </div>
          )}

          {view === "client-login" && (
            /* ================= CLIENT LOGIN FORM ================= */
            <div className="flex-grow flex flex-col justify-center items-center max-w-md mx-auto p-8 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#0c1a30] flex items-center justify-center shadow-lg">
                <Lock className="w-6 h-6 text-gold" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0c1a30]">Client Secure Sign In</h3>
                <p className="text-slate-500 text-xs mt-1.5">
                  Enter your registered client account email to synchronize dossiers.
                </p>
              </div>

              {authError && (
                <div className="w-full text-left p-3.5 text-xs bg-red-50 border border-red-200 text-red-600 rounded-sm flex gap-2.5 items-center">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={(e) => handleLoginSubmit(e, "client")} className="w-full space-y-4">
                <div className="text-left">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="client@hbl.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-sm p-3 mt-1 text-xs focus:ring-1 focus:ring-gold focus:border-gold outline-none"
                  />
                </div>

                <div className="text-left">
                  <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Passcode</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-sm p-3 mt-1 text-xs focus:ring-1 focus:ring-gold focus:border-gold outline-none pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3">
                  <button
                    type="button"
                    onClick={() => { setView("choice"); setAuthError(""); }}
                    className="py-3 px-4 border border-slate-200 text-slate-700 text-xs font-bold rounded-sm hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Go Back
                  </button>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="py-3 px-4 bg-[#0c1a30] hover:bg-gold text-white hover:text-[#0c1a30] text-xs font-bold rounded-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Session"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {view === "admin-login" && (
            /* ================= ADMIN LOGIN FORM ================= */
            <div className="flex-grow flex flex-col justify-center items-center max-w-md mx-auto p-8 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-[#0c1a30] flex items-center justify-center shadow-lg border border-gold">
                <Gavel className="w-6 h-6 text-gold" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0c1a30]">Advocate Control Gate</h3>
                <p className="text-slate-500 text-xs mt-1.5">
                  Restricted access. Authenticate to modify client dossiers.
                </p>
              </div>

              {authError && (
                <div className="w-full text-left p-3.5 text-xs bg-red-50 border border-red-200 text-red-600 rounded-sm flex gap-2.5 items-center">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="w-full space-y-4">
                <button
                  onClick={handleGoogleAdminLogin}
                  disabled={authLoading}
                  className="w-full p-4 bg-[#0c1a30] hover:bg-gold text-white hover:text-[#0c1a30] rounded-sm transition-all flex items-center justify-center gap-3 font-semibold text-xs cursor-pointer"
                >
                  {authLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Sign In as Legal Administrator
                    </>
                  )}
                </button>

                <div className="p-4 bg-slate-100 border border-slate-200 rounded text-center text-slate-500 text-[11px] italic">
                  "Uses Single Sign-On. Click option to sign-in or use Advocate Admin bypass on left panel."
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={() => { setView("choice"); setAuthError(""); }}
                    className="text-xs text-[#0c1a30] font-bold hover:underline"
                  >
                    Return to Portal Choice
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === "client-dashboard" && selectedCase && (
            /* ================= CLIENT DIGITAL PORTAL ================= */
            <div className="p-6 md:p-8 space-y-6 animate-fade-in text-left">
              {/* Header Box */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6 mb-4">
                <div className="min-w-0">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[9px] uppercase tracking-wider font-extrabold border border-green-200">
                    Encrypted Case Dossier View
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#0c1a30] mt-2 block break-words">
                    {selectedCase.caseTitle}
                  </h2>
                  <p className="text-slate-500 text-xs mt-1 font-mono">Case Registry Index: {selectedCase.caseNo}</p>
                </div>

                {/* Advocate Image Badge */}
                <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-gold uppercase tracking-widest">Counsel Officer</p>
                    <p className="text-xs font-bold text-slate-700">{selectedCase.counselName}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full border-2 border-gold overflow-hidden shrink-0">
                    <img 
                      src="https://images.pexels.com/photos/37339382/pexels-photo-37339382.png" 
                      alt="Advocate Wajid Awan" 
                      className="w-full h-full object-cover scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              {/* Grid Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 border border-slate-100 shadow-sm rounded-lg">
                  <span className="text-[9px] font-black uppercase text-slate-400 block tracking-widest">Case Catalog ID</span>
                  <p className="text-xs font-mono font-bold text-[#0c1a30] mt-1 truncate">{selectedCase.caseNo}</p>
                </div>
                <div className="bg-white p-4 border border-slate-100 shadow-sm rounded-lg">
                  <span className="text-[9px] font-black uppercase text-slate-400 block tracking-widest">Sr. Calendar No</span>
                  <p className="text-xs font-mono font-bold text-[#0c1a30] mt-1">{selectedCase.srNo}</p>
                </div>
                <div className="bg-white p-4 border border-slate-100 shadow-sm rounded-lg">
                  <span className="text-[9px] font-black uppercase text-slate-400 block tracking-widest">Next Appointed Hearing</span>
                  <p className="text-xs font-mono font-black text-amber-600 mt-1">{selectedCase.nextHearingDate}</p>
                </div>
                <div className="bg-white p-4 border border-[#0c1a30]/10 shadow-sm rounded-lg bg-[#0c1a30]/5">
                  <span className="text-[9px] font-black uppercase text-gold block tracking-widest font-sans">Active Status</span>
                  <p className="text-xs font-sans font-black text-[#0c1a30] mt-1 uppercase tracking-wide">Ongoing</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Timeline & details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="p-5 bg-white border border-slate-100 shadow-xs rounded-xl space-y-4">
                    <h4 className="font-serif text-sm font-bold text-[#0c1a30] border-b border-slate-100 pb-2">
                      Legal Trial Context & Proceedings
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed leading-6 font-light">{selectedCase.proceedings}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400">Presiding Bench</span>
                        <p className="text-xs font-bold text-slate-800 uppercase mt-0.5">{selectedCase.judgeName}</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-black text-slate-400">Legal Forum</span>
                        <p className="text-xs font-bold text-[#0c1a30] uppercase mt-0.5">{selectedCase.courtName}</p>
                      </div>
                    </div>
                  </div>

                  {/* Official Order Sheets widget */}
                  {selectedCase.orderSheetUrl && (
                    <div className="p-5 bg-gold/10 border border-gold/40 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0c1a30] rounded-lg text-gold flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-slate-800 font-bold text-xs block">Main Compiled Order Sheet Compilation</span>
                          <span className="text-[9px] text-[#0c1a30] font-mono block">Official certified PDF Copy</span>
                        </div>
                      </div>
                      <a 
                        href={selectedCase.orderSheetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="py-1 px-3 bg-[#0c1a30] text-gold hover:bg-gold hover:text-[#0c1a30] text-[10px] font-black uppercase rounded-xs transition-colors shrink-0"
                      >
                        Download PDF
                      </a>
                    </div>
                  )}

                  {/* Case timeline history copied exactly */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-base font-bold text-[#0c1a30] flex items-center gap-2">
                      <Clock className="w-4.5 h-4.5 text-gold" /> Court Hearing History Records
                    </h3>
                    <div className="relative pl-6 border-l border-slate-200 ml-3 space-y-6">
                      {selectedCase.hearings && selectedCase.hearings.length > 0 ? (
                        [...selectedCase.hearings].sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime()).map((h, i) => (
                          <div key={i} className="relative space-y-2">
                            <span className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full border border-gold bg-[#0c1a30] flex items-center justify-center">
                              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                            </span>
                            <div className="bg-white p-4 border border-slate-100 rounded-lg shadow-xs hover:border-gold/30 transition-colors">
                              <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-slate-50 pb-2 mb-2">
                                <span className="text-xs font-bold text-[#0c1a30]">
                                  📅 Hearing Date: {h.date} {h.purpose && <span className="ml-2 px-1.5 py-0.5 bg-gold/15 text-gold text-[8px] font-black rounded uppercase">{h.purpose}</span>}
                                </span>
                                {h.orderSheetUrl && (
                                  <a 
                                    href={h.orderSheetUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-[9px] text-[#0c1a30] font-black uppercase hover:underline"
                                  >
                                    Get Certified Order PDF
                                  </a>
                                )}
                              </div>
                              <p className="text-slate-600 text-xs leading-relaxed">{h.proceedings}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="relative space-y-2">
                          <span className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full border border-gold bg-[#0c1a30] flex items-center justify-center" />
                          <div className="bg-white p-4 border border-slate-100 rounded-lg text-slate-500 text-xs italic">
                            Initial registration scheduled. No hearing transcripts archived as of yet.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right columns panels */}
                <div className="space-y-6">
                  {/* Select other cases for current client */}
                  {cases.filter(c => c.clientId.toLowerCase() === sessionUser?.email.toLowerCase()).length > 1 && (
                    <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-3">
                      <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Multi-Linked Cases</h4>
                      <div className="space-y-2">
                        {cases.filter(c => c.clientId.toLowerCase() === sessionUser?.email.toLowerCase()).map((c, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedCaseId(c.id || null)}
                            className={`w-full p-2.5 rounded-xs text-left text-xs text-slate-700 block transition-all ${selectedCaseId === c.id ? "bg-[#0c1a30] text-gold font-bold" : "bg-slate-100 hover:bg-slate-200"}`}
                          >
                            📁 {c.caseNo}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct support console */}
                  <div className="p-6 bg-[#0c1a30] text-white rounded-xl space-y-4">
                    <Shield className="w-8 h-8 text-gold" />
                    <h4 className="font-serif text-lg font-bold">Liaison Counsel Assistance</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Need direct legal liaison or clarifications under privilege? Contact Advocate Wajid Awan directly on WhatsApp.
                    </p>
                    <a 
                      href="https://wa.me/923218520085" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-gold text-[#0c1a30] text-center font-bold text-xs rounded-xs hover:bg-[#ebd59b] transition-all cursor-pointer"
                    >
                      🛡️ WhatsApp Legal Consult
                    </a>
                  </div>

                  <div className="p-5 bg-white border border-slate-100 rounded-xl text-slate-500 text-xs leading-relaxed leading-6">
                    <h5 className="font-bold text-[#0c1a30] mb-2 uppercase text-[10px] tracking-wider">Legal Framework Act</h5>
                    Client transactions, case registries, judge listings, and proceedings recorded here are strictly secure and confidential.
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "admin-dashboard" && (
            /* ================= ADMIN MANAGEMENT PANEL ================= */
            <div className="p-6 md:p-8 space-y-6 animate-fade-in text-left">
              {isAddingCase ? (
                /* ================= ADMIN: CREATE CASE FORM ================= */
                <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-serif text-lg font-bold text-[#0c1a30] flex items-center gap-2">
                      <Plus className="w-5 h-5 text-gold" /> Add New Case Registry
                    </h3>
                    <button 
                      onClick={() => setIsAddingCase(false)}
                      className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateCaseSubmit} className="space-y-4 text-xs grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 text-left">
                      <label className="font-bold text-slate-700">Case Registry Title</label>
                      <input 
                        required
                        type="text"
                        placeholder="Habib Bank Limited v. National Enterprises Inc."
                        value={formData.caseTitle}
                        onChange={e => setFormData({ ...formData, caseTitle: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded hover:border-slate-300 outline-none"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Case No / Registry Index</label>
                      <input 
                        required
                        type="text"
                        placeholder="HBL/LC-4890/2026"
                        value={formData.caseNo}
                        onChange={e => setFormData({ ...formData, caseNo: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Sr. Calendar No</label>
                      <input 
                        type="text"
                        placeholder="12 / 2026"
                        value={formData.srNo}
                        onChange={e => setFormData({ ...formData, srNo: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Presiding Bench / Judge</label>
                      <input 
                        type="text"
                        placeholder="Mr. Justice Babar Sattar"
                        value={formData.judgeName}
                        onChange={e => setFormData({ ...formData, judgeName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Legal Forum Court name</label>
                      <input 
                        type="text"
                        placeholder="Islamabad High Court"
                        value={formData.courtName}
                        onChange={e => setFormData({ ...formData, courtName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Client Log-In ID / Email</label>
                      <input 
                        required
                        type="email"
                        placeholder="client@hbl.com"
                        value={formData.clientId}
                        onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Client Passcode</label>
                      <input 
                        type="text"
                        placeholder="client123"
                        value={formData.clientPassword}
                        onChange={e => setFormData({ ...formData, clientPassword: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none text-slate-800"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Last Hearing Calendar Date</label>
                      <input 
                        type="date"
                        value={formData.lastHearingDate}
                        onChange={e => setFormData({ ...formData, lastHearingDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    <div className="text-left">
                      <label className="font-bold text-slate-700">Next Scheduled Court Date</label>
                      <input 
                        type="date"
                        value={formData.nextHearingDate}
                        onChange={e => setFormData({ ...formData, nextHearingDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 text-left">
                      <label className="font-bold text-slate-700">Default Court proceedings / description</label>
                      <textarea 
                        rows={3}
                        placeholder="Stay order against corporate asset sell-off successfully sustained after lengthy oral debate."
                        value={formData.proceedings}
                        onChange={e => setFormData({ ...formData, proceedings: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 mt-1 p-2.5 rounded outline-none"
                      />
                    </div>

                    {/* Certified Order Upload block */}
                    <div className="md:col-span-2 text-left space-y-2">
                      <label className="font-bold text-slate-700 block">Certified Copy Sheet PDF Upload</label>
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-all ${dragActive ? "border-gold bg-gold/5":"border-slate-200 bg-slate-50"}`}
                      >
                        <input 
                          type="file"
                          id="admin-form-upload-pdf"
                          onChange={e => handleFileUpload(e, "orderSheetUrl")}
                          className="hidden"
                        />
                        <label htmlFor="admin-form-upload-pdf" className="cursor-pointer block">
                          {isUploading ? (
                            <div className="flex flex-col items-center gap-1.5">
                              <Loader2 className="w-5 h-5 text-gold animate-spin" />
                              <span className="font-semibold text-[10px] text-slate-500">Uploading File compilation: {uploadProgress}%</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                              <p className="text-[10px] text-slate-600">Drag PDF copy sheet here, or click to browse</p>
                              {formData.orderSheetUrl && <p className="text-[9px] text-[#0c1a30] font-bold">✓ PDF compilation saved: {formData.orderSheetUrl.substring(0, 40)}...</p>}
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-3 text-sm">
                      <button
                        type="button"
                        onClick={() => setIsAddingCase(false)}
                        className="py-3 bg-slate-100 font-bold hover:bg-slate-200 text-slate-800 rounded-sm transition-colors text-center cursor-pointer"
                      >
                        Archive Draft
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingCase}
                        className="py-3 bg-[#0c1a30] text-gold font-bold hover:bg-gold hover:text-[#0c1a30] rounded-sm transition-all text-center cursor-pointer"
                      >
                        {isSavingCase ? "Saving Docket..." : "Save Case File"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : adminMode === "calendar" ? (
                /* ================= ADMIN: CALENDAR VIEW ================= */
                <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <h3 className="font-serif text-lg font-bold text-[#0c1a30]">Advocate Sessional Calendar</h3>
                    <button 
                      onClick={() => setAdminMode("list")}
                      className="px-3 py-1.5 border border-[#0c1a30]/20 hover:bg-[#0c1a30] hover:text-white text-[10px] font-bold tracking-wider rounded-xs uppercase cursor-pointer"
                    >
                      Return to List
                    </button>
                  </div>
                  
                  {/* Calendar Matrix - Rendering all cases scheduled on nextHearingDate */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-700 mb-2">Upcoming Scheduled Bench Appearances</h4>
                      <div className="space-y-3">
                        {cases.filter(c => c.nextHearingDate && c.nextHearingDate !== 'None Sched').map((c, i) => (
                          <div key={i} className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                            <span className="font-mono text-[10px] text-amber-600 block font-bold">📅 SCHEDULED COURT DATE: {c.nextHearingDate}</span>
                            <span className="font-bold text-slate-800 block text-xs mt-1">{c.caseTitle}</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">Court: {c.courtName} • Index: {c.caseNo}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg text-slate-600 space-y-2">
                      <span className="block text-[10px] uppercase font-black text-slate-400">Calendar Directives</span>
                      <p className="leading-relaxed leading-5">
                        Dates displayed represent critical hearings, appellate stay deadlines, or desk reviews compiled centrally. Ensure proper representations are issued in advance.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= ADMIN: CASES LIST & SEARCHING ================= */
                <div className="space-y-6">
                  {/* Stats Summary Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-4 shadow-xs">
                      <div className="w-10 h-10 rounded bg-[#0c1a30]/5 text-[#0c1a30] flex items-center justify-center font-bold">
                        📁
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">Total Docket Files</span>
                        <p className="font-serif text-lg font-bold text-slate-800">{cases.length}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white border border-slate-100 rounded-xl flex items-center gap-4 shadow-xs">
                      <div className="w-10 h-10 rounded bg-[#0c1a30]/5 text-gold flex items-center justify-center font-bold">
                        👥
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">Enrolled Case Clients</span>
                        <p className="font-serif text-lg font-bold text-slate-800">{new Set(cases.map(c => c.clientId)).size}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gold/15 border border-gold/40 rounded-xl flex items-center gap-4 shadow-xs">
                      <div className="w-10 h-10 rounded bg-white text-gold flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#0c1a30]">Quick Actions</span>
                        <button 
                          onClick={() => { setIsAddingCase(true); setSelectedCaseId(null); }}
                          className="text-[10px] font-black uppercase text-[#0c1a30] block hover:underline"
                        >
                          + Create New Docket File
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Searching cases bar */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl">
                    <div className="relative flex-grow w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="text" 
                        placeholder="Search docket filings by Title, Case No, or Client ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 py-2 pl-9 pr-4 rounded text-xs focus:ring-1 focus:ring-gold outline-none"
                      />
                    </div>
                    <button 
                      onClick={() => setIsAddingCase(true)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#0c1a30] hover:bg-gold text-white hover:text-[#0c1a30] text-xs font-bold rounded-sm shrink-0 transition-colors cursor-pointer"
                    >
                      + Create Case
                    </button>
                  </div>

                  {/* Case List Grid Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left case list */}
                    <div className="lg:col-span-1 bg-white border border-slate-100 rounded-xl p-4 space-y-3 min-h-[300px]">
                      <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Docket Files Catalog ({filteredCases.length})</h4>
                      <div className="space-y-2 max-h-[420px] overflow-y-auto">
                        {filteredCases.map((c, i) => (
                          <div 
                            key={i} 
                            onClick={() => setSelectedCaseId(c.id || null)}
                            className={`p-3 border rounded text-left transition-all cursor-pointer ${selectedCaseId === c.id ? "bg-[#0c1a30] text-gold border-[#0c1a30]":"bg-slate-50 border-slate-100 hover:border-slate-200"}`}
                          >
                            <span className={`block text-[9px] font-bold uppercase tracking-wider mr-2 ${selectedCaseId === c.id ? "text-amber-500":"text-indigo-900"}`}>{c.caseNo}</span>
                            <span className="block text-xs font-bold mt-1 line-clamp-1">{c.caseTitle}</span>
                            <span className="block text-[8px] text-slate-400 font-mono mt-0.5 truncate">Client: {c.clientId}</span>
                          </div>
                        ))}
                        {filteredCases.length === 0 && <p className="text-xs text-slate-400 text-center py-6">No matching case filings registered.</p>}
                      </div>
                    </div>

                    {/* Right case details + adding hearing timeline */}
                    <div className="lg:col-span-2">
                      {selectedCase ? (
                        <div className="bg-white border border-slate-100 rounded-xl p-5 space-y-6">
                          <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-4">
                            <div className="min-w-0 flex-1">
                              <span className="text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 border border-green-200 font-black rounded uppercase">Ongoing Case Profile</span>
                              <h3 className="font-serif text-lg font-bold text-[#0c1a30] mt-1 break-words leading-tight">{selectedCase.caseTitle}</h3>
                              <p className="text-[10px] font-mono text-slate-500 mt-1">Registry Code: {selectedCase.caseNo} • Password: {selectedCase.clientPassword || "client123"}</p>
                            </div>
                            <button
                              onClick={() => handleArchiveCase(selectedCase.id || "")}
                              className="px-2.5 py-1.5 text-[9px] font-bold uppercase rounded bg-red-50 text-red-650 hover:bg-red-500 hover:text-white border border-red-200 transition-colors cursor-pointer shrink-0"
                            >
                              Archive Record
                            </button>
                          </div>

                          {/* Quick details review */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
                              <span className="text-[8px] font-black text-slate-400 block uppercase">Sr. Num</span>
                              <p className="font-bold text-slate-800">{selectedCase.srNo}</p>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
                              <span className="text-[8px] font-black text-slate-400 block uppercase">Last Hearing</span>
                              <p className="font-bold text-slate-800">{selectedCase.lastHearingDate}</p>
                            </div>
                            <div className="bg-indigo-950 p-2.5 rounded border border-[#0c1a30]/20 text-white">
                              <span className="text-[8px] font-black text-indigo-300 block uppercase">Next Scheduled</span>
                              <p className="font-extrabold">{selectedCase.nextHearingDate}</p>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded border border-slate-100">
                              <span className="text-[8px] font-black text-slate-400 block uppercase">Client Mail</span>
                              <p className="font-extrabold text-[#0c1a30] truncate">{selectedCase.clientId}</p>
                            </div>
                          </div>

                          {/* ADD COURT HEARING EVENT FORM */}
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                            <span className="font-serif font-bold text-xs text-[#0c1a30] block">Append Court Hearing Event Transcript</span>
                            <form 
                              onSubmit={(e) => handleAddHearingSubmit(e, selectedCase.id || "")}
                              className="text-[10px] grid grid-cols-1 md:grid-cols-2 gap-3"
                            >
                              <div className="text-left">
                                <label className="font-bold text-slate-600 block">Hearing Execution Date</label>
                                <input 
                                  required
                                  type="date"
                                  value={newHearing.date}
                                  onChange={e => setNewHearing({ ...newHearing, date: e.target.value })}
                                  className="w-full bg-white border border-slate-200 mt-1 p-2 rounded outline-none"
                                />
                              </div>

                              <div className="text-left">
                                <label className="font-bold text-slate-600 block">Next Scheduled Bench Date (Optional)</label>
                                <input 
                                  type="date"
                                  value={newHearing.nextHearingDate}
                                  onChange={e => setNewHearing({ ...newHearing, nextHearingDate: e.target.value })}
                                  className="w-full bg-white border border-slate-200 mt-1 p-2 rounded outline-none"
                                />
                              </div>

                              <div className="text-left">
                                <label className="font-bold text-slate-600 block">Hearing Sub-Purpose</label>
                                <input 
                                  type="text"
                                  placeholder="e.g. Interim Stay Arguments"
                                  value={newHearing.purpose}
                                  onChange={e => setNewHearing({ ...newHearing, purpose: e.target.value })}
                                  className="w-full bg-white border border-slate-200 mt-1 p-2 rounded outline-none"
                                />
                              </div>

                              <div className="text-left">
                                <label className="font-bold text-slate-600 block">Judge Designation (If changed)</label>
                                <input 
                                  type="text"
                                  placeholder={selectedCase.judgeName}
                                  value={newHearing.judgeName}
                                  onChange={e => setNewHearing({ ...newHearing, judgeName: e.target.value })}
                                  className="w-full bg-white border border-slate-200 mt-1 p-2 rounded outline-none"
                                />
                              </div>

                              <div className="md:col-span-2 text-left">
                                <label className="font-bold text-slate-600 block">Hearing Detailed Decisions / Proceedings transcription</label>
                                <textarea 
                                  required
                                  rows={2}
                                  placeholder="Detailed proceedings transcript..."
                                  value={newHearing.proceedings}
                                  onChange={e => setNewHearing({ ...newHearing, proceedings: e.target.value })}
                                  className="w-full bg-white border border-slate-200 mt-1 p-2 rounded outline-none"
                                />
                              </div>

                              {/* Upload Hearing Sheet Order */}
                              <div className="md:col-span-2 text-left space-y-1">
                                <label className="font-bold text-slate-600 block">Certified File / Judgment PDF (Optional)</label>
                                <input 
                                  type="file"
                                  onChange={(e) => handleFileUpload(e, "hearingOrderSheet")}
                                  className="w-full bg-white text-slate-500 border border-slate-200 p-1 rounded file:bg-slate-200 file:border-none file:px-2 file:py-1 file:text-[9px] file:font-semibold"
                                />
                                {newHearing.orderSheetUrl && <p className="text-[8px] text-green-600 font-bold">✓ PDF sheet compiled successfully: {newHearing.orderSheetUrl.substring(0, 50)}...</p>}
                              </div>

                              <div className="md:col-span-2 text-right pt-2">
                                <button
                                  type="submit"
                                  disabled={isSavingCase}
                                  className="px-4 py-2 bg-[#0c1a30] text-gold font-bold hover:bg-gold hover:text-[#0c1a30] rounded-xs transition-colors cursor-pointer"
                                >
                                  {isSavingCase ? "Saving..." : "Append Hearing Record"}
                                </button>
                              </div>
                            </form>
                          </div>

                          {/* Historical Timeline block */}
                          <div className="space-y-3">
                            <span className="block font-serif font-bold text-slate-800 text-xs text-left">Timeline Hearings History</span>
                            <div className="relative pl-5 border-l border-slate-200 space-y-4 text-xs">
                              {selectedCase.hearings && selectedCase.hearings.length > 0 ? (
                                [...selectedCase.hearings].sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime()).map((h, i) => (
                                  <div key={i} className="relative text-left p-3 border border-slate-100 rounded-lg bg-slate-50 shadow-2xs">
                                    <div className="absolute -left-[27.5px] top-4 w-3.5 h-3.5 rounded-full bg-gold border border-[#0c1a30]" />
                                    <span className="font-bold text-slate-800 block">Date: {h.date} {h.purpose && <span className="ml-2 px-1 py-0.2 bg-[#0c1a30] text-gold rounded text-[8px] uppercase">{h.purpose}</span>}</span>
                                    {h.nextHearingDate && <span className="text-[9px] text-[#0c1a30] block mt-0.5 font-bold">↳ Next Sched Date: {h.nextHearingDate}</span>}
                                    <p className="text-slate-600 mt-1.5 leading-relaxed font-light">{h.proceedings}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-slate-500 text-xs italic text-left">No historical court appearances appended yet.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white border border-slate-100 border-dashed rounded-xl p-12 text-center text-slate-500 text-xs h-full flex flex-col justify-center items-center">
                          📁 Select or query a case filing from direct search listing catalog to edit listings.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
