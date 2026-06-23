import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'motion/react';
import { 
  LogOut, 
  FileBox, 
  Clock, 
  MessageSquare, 
  Shield, 
  Gavel,
  AlertCircle,
  FileText,
  User as UserIcon,
  Building2,
  Calendar,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { auth, db, storage } from '../lib/firebase';
import { ref, deleteObject } from 'firebase/storage';
import { collection, query, where, onSnapshot, or, doc, deleteDoc } from 'firebase/firestore';
import { LEGAL_TEAM } from '../data';
import { openOrDownloadFile } from '../lib/fileHelper';
import { DocumentUploader } from '../components/DocumentUploader';
import { safeConfirm, safeAlert } from '../lib/modalHelper';

interface DocumentMetadata {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  caseId: string;
  uploadedBy: string;
  createdAt?: any;
}

interface Hearing {
  date: string;
  nextHearingDate?: string;
  proceedings: string;
  orderSheetUrl?: string;
  purpose?: string;
  judgeName?: string;
  courtName?: string;
}

interface CaseData {
  id: string;
  caseTitle: string;
  caseNo: string;
  srNo: string;
  judgeName: string;
  lastHearingDate: string;
  nextHearingDate: string;
  proceedings: string;
  hearings?: Hearing[];
  courtName: string;
  counselName: string;
  orderSheetUrl?: string;
  clientId: string;
}

enum OperationType {
  LIST = 'list',
  GET = 'get'
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

interface ClientPortalProps {
  setView: (view: 'main' | 'admin-login' | 'admin-portal' | 'client-login' | 'client-portal') => void;
}

export default function ClientPortal({ setView }: ClientPortalProps) {
  const { user, loading } = useAuth();
  const [cases, setCases] = React.useState<CaseData[]>([]);
  const [casesLoading, setCasesLoading] = React.useState(true);
  const [selectedCaseId, setSelectedCaseId] = React.useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = React.useState<DocumentMetadata[]>([]);

  const displayCases = cases.filter(c => !c.caseTitle.includes('Sample Trial Case'));

  // Sync uploaded documents dynamically in real-time
  React.useEffect(() => {
    if (!selectedCaseId || !user) return;

    const docsPath = 'documents';
    const q = query(
      collection(db, docsPath),
      where('caseId', '==', selectedCaseId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DocumentMetadata[];
      setUploadedDocs(docsData);
    }, (error) => {
      console.error("Error subscribing to case documents:", error);
    });

    return () => unsubscribe();
  }, [selectedCaseId, user]);

  // Sort hearings helper (newest first)
  const sortHearings = (hearings?: Hearing[]) => {
    if (!hearings) return [];
    return [...hearings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handleDeleteDocument = async (docId: string, fileUrl?: string) => {
    if (!safeConfirm("Are you sure you want to permanently delete this document?")) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'documents', docId));
      
      if (fileUrl && fileUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const fileRef = ref(storage, fileUrl);
          await deleteObject(fileRef);
        } catch (storageErr) {
          console.warn("Storage cleanup skipped or failed:", storageErr);
        }
      }
      safeAlert("Document successfully deleted.");
    } catch (err) {
      console.error("Error deleting document:", err);
      safeAlert("Failed to delete document.");
    }
  };

  React.useEffect(() => {
    if (!loading && !user) {
      setView('client-login');
    }
  }, [user, loading, setView]);

  React.useEffect(() => {
    if (!user) return;

    const casesPath = 'cases';
    const q = query(
      collection(db, casesPath), 
      or(
        where('clientId', '==', user.uid),
        where('clientId', '==', user.email)
      )
    );
    
    // Safety timeout for loading
    const timeoutId = setTimeout(() => {
      setCasesLoading(false);
    }, 5000);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      clearTimeout(timeoutId);
      const casesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CaseData[];
      setCases(casesData);
      if (casesData.length > 0 && !selectedCaseId) {
        setSelectedCaseId(casesData[0].id);
      }
      setCasesLoading(false);
    }, (error) => {
      clearTimeout(timeoutId);
      handleFirestoreError(error, OperationType.LIST, casesPath);
      setCasesLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [user, selectedCaseId]);

  // Set default selection
  React.useEffect(() => {
    if (!selectedCaseId && displayCases.length > 0) {
      setSelectedCaseId(displayCases[0].id);
    }
  }, [displayCases, selectedCaseId]);

  if (loading || (user && casesLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = () => {
    auth.signOut();
    setView('main');
  };

  const selectedCase = displayCases.find(c => c.id === selectedCaseId) || displayCases[0];

  // Helper to find counsel's image
  const getCounselImage = (name: string) => {
    const member = LEGAL_TEAM.find(t => t.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(t.name.toLowerCase()));
    return member?.image || "https://images.pexels.com/photos/37339382/pexels-photo-37339382.png";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-amber-600 selection:text-white">
      {/* Mini Portal Header */}
      <header className="border-b border-slate-200 bg-white py-4 px-6 sticky top-0 z-50 shadow-sm shadow-slate-100/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setView('main')} className="flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-colors cursor-pointer">
            <Gavel className="w-5 h-5 text-amber-500" />
            <span className="font-serif font-bold text-lg text-slate-900">Jus & Lay CRM Hub</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 hidden sm:inline">{user.email}</span>
            <button 
              onClick={() => setView('main')}
              className="text-slate-600 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              ← Return to Website
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 lg:mb-10">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-slate-900 truncate">Welcome, Client</h1>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 truncate">Manage your active cases and legal documents.</p>
          </div>
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-5 border-t border-slate-200 pt-4 md:border-0 md:pt-0">
            <div className="flex items-center gap-3 pr-5 border-r border-slate-200">
               <div className="text-right hidden sm:block">
                 <p className="text-[10px] font-black text-amber-650 uppercase tracking-widest">Lead Counsel</p>
                 <p className="text-xs font-bold text-slate-800">{selectedCase?.counselName || "Advocate Yasir Naqvi"}</p>
               </div>
               <div className="w-16 h-16 rounded-full border-2 border-slate-200/50 overflow-hidden shadow-lg select-none">
                 <img 
                   src={getCounselImage(selectedCase?.counselName || "")} 
                   alt={selectedCase?.counselName || "Lead Counsel"}
                   className="w-full h-full object-cover scale-110"
                   referrerPolicy="no-referrer"
                 />
               </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 hover:text-slate-950 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-bold text-slate-400 hidden sm:block">{user.email}</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-zinc-800 to-zinc-950 flex items-center justify-center text-amber-500 font-extrabold text-sm border border-zinc-700">
                {user.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10">
          {[
            { label: 'Active CRM Cases', value: displayCases.length.toString(), icon: Gavel, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Total Files', value: displayCases.reduce((acc, c) => acc + (c.orderSheetUrl ? 1 : 0) + (c.hearings?.filter(h => h.orderSheetUrl).length || 0), 0).toString(), icon: FileBox, color: 'text-zinc-700', bg: 'bg-zinc-100' },
            { label: 'Next Hearing', value: displayCases[0]?.nextHearingDate || 'None', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-50/60' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white p-4 lg:p-6 rounded-2xl border border-slate-205 shadow-sm flex items-center gap-4 lg:gap-5 ${i === 2 && 'sm:col-span-2 lg:col-span-1'}`}
            >
              <div className={`w-12 h-12 lg:w-14 lg:h-14 ${stat.bg} ${stat.color} rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0`}>
                <stat.icon className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider truncate">{stat.label}</p>
                <p className="text-base lg:text-xl font-serif font-bold text-slate-900 truncate">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Mobile Case Selector */}
          <div className="lg:hidden space-y-3 mb-6 overflow-hidden">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
              <Gavel className="w-3.5 h-3.5 text-amber-500" /> Case Navigation
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-1">
              {displayCases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`shrink-0 text-left p-3 rounded-xl border transition-all min-w-[150px] max-w-[190px] snap-start ${
                    selectedCaseId === c.id 
                    ? 'bg-zinc-900 text-white border-zinc-950 shadow-md' 
                    : 'bg-white border-slate-200'
                  }`}
                >
                  <p className={`text-[8px] font-black uppercase tracking-wider mb-0.5 ${selectedCaseId === c.id ? 'text-white/70' : 'text-slate-450'}`}>
                    {c.caseNo}
                  </p>
                  <p className={`text-[10px] font-bold line-clamp-1 ${selectedCaseId === c.id ? 'text-white' : 'text-slate-700'}`}>
                    {c.caseTitle}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Main Case List */}
          <div className="lg:col-span-2 space-y-8 lg:space-y-12">
            {!selectedCase ? (
              <div className="bg-white rounded-3xl p-8 lg:p-12 text-center border border-slate-205 shadow-sm">
                <div className="w-20 h-20 bg-amber-50 text-amber-650 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gavel className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900">No Case Records Found</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">Access restricted to authorized clients. If you are a new client and require access, please contact the attorney office.</p>
                <div className="mt-8 p-4 bg-amber-50 border border-amber-105 rounded-2xl flex items-start gap-4 text-left">
                   <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                   <p className="text-xs text-amber-805 font-medium leading-relaxed">
                     Once a lawyer adds your case using your email (<strong>{user.email}</strong>), it will automatically synchronize and show up here in real-time.
                   </p>
                </div>
              </div>
            ) : (
              <div key={selectedCase.id} className="bg-white rounded-2xl lg:rounded-[2.5rem] border border-slate-200/80 shadow-md overflow-hidden group hover:border-amber-400 transition-colors">
                <div className="p-4 lg:p-10 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className="px-3 py-1 bg-amber-500 text-black text-[9px] font-black rounded-full uppercase tracking-[0.15em] shadow-sm whitespace-nowrap">Active Case</span>
                      <p className="text-amber-700 text-[10px] font-black bg-amber-50 px-3 py-1 rounded-lg tracking-wider break-all">NO: {selectedCase.caseNo}</p>
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg lg:text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors uppercase leading-tight break-words">{selectedCase.caseTitle}</h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 mb-1">
                        <p className="text-slate-500 text-[10px] sm:text-xs font-bold flex items-center gap-2 shrink-0">
                          <UserIcon className="w-3.5 h-3.5 text-amber-650" /> {selectedCase.judgeName}
                        </p>
                        <p className="text-slate-500 text-[10px] sm:text-xs font-bold flex items-center gap-2 shrink-0">
                          <Building2 className="w-3.5 h-3.5 text-amber-655" /> {selectedCase.courtName}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6">
                    <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-lg lg:rounded-2xl border border-slate-200 shadow-sm min-w-0">
                      <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Sr. No</p>
                      <p className="text-slate-800 font-bold text-[11px] sm:text-xs lg:text-base truncate">{selectedCase.srNo}</p>
                    </div>
                    <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-lg lg:rounded-2xl border border-slate-200 shadow-sm min-w-0">
                      <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Last Hearing</p>
                      <p className="text-slate-805 font-bold text-[11px] sm:text-xs lg:text-base truncate">{selectedCase.lastHearingDate}</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-2 sm:p-3 lg:p-4 rounded-lg lg:rounded-2xl shadow-md min-w-0 text-black">
                      <p className="text-[8px] lg:text-[10px] font-black text-black/50 uppercase tracking-widest truncate">Next Hearing</p>
                      <p className="text-black font-extrabold text-[11px] sm:text-xs lg:text-base truncate">{selectedCase.nextHearingDate}</p>
                    </div>
                    <div className="bg-white p-2 sm:p-3 lg:p-4 rounded-lg lg:rounded-2xl border border-slate-200 shadow-sm min-w-0">
                      <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Status</p>
                      <p className="text-amber-600 font-bold text-[11px] sm:text-xs lg:text-base truncate">Ongoing</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 lg:p-10">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-10 border-b border-slate-100 pb-8 lg:pb-10 mb-8 lg:mb-10">
                    <div className="space-y-5 lg:space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Presiding Judge</h4>
                          <p className="text-slate-800 font-bold text-xs lg:text-base leading-relaxed uppercase">{selectedCase.judgeName}</p>
                        </div>
                      </div>
 
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full border border-slate-205 overflow-hidden shrink-0 shadow-md">
                          <img 
                            src={getCounselImage(selectedCase.counselName)} 
                            alt={selectedCase.counselName}
                            className="w-full h-full object-cover scale-110"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Counsel</h4>
                          <p className="text-slate-800 font-bold text-xs lg:text-sm leading-relaxed truncate max-w-[200px]"> {selectedCase.counselName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-bold text-slate-400">Available for Consultation</span>
                          </div>
                        </div>
                      </div>
                    </div>
 
                    <div className="space-y-5 lg:space-y-6">
                       <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                         <Building2 className="w-5 h-5 text-amber-600 shrink-0" />
                         <div className="min-w-0">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Forum</p>
                           <span className="text-xs lg:text-sm font-bold text-amber-600 uppercase tracking-wider block truncate">{selectedCase.courtName}</span>
                         </div>
                       </div>
                      
                      <div className="bg-slate-50 border border-slate-200 p-5 lg:p-6 rounded-3xl">
                        <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <FileText className="w-4 h-4" /> Official Order Sheets
                        </h4>
                        
                        {selectedCase.orderSheetUrl ? (
                          <div className="space-y-3">
                            <button 
                              onClick={() => openOrDownloadFile(selectedCase.orderSheetUrl || '', selectedCase.caseTitle || 'order_sheet')}
                              className="flex items-center justify-between w-full bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-205 group/link hover:border-amber-400 hover:shadow-md transition-all active:scale-[0.98] min-w-0 cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 bg-zinc-900 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="text-left min-w-0">
                                  <span className="text-slate-805 font-bold text-[10px] lg:text-xs block truncate">Main Compiled File</span>
                                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block truncate">Document Format</span>
                                </div>
                              </div>
                              <div className="bg-slate-100 p-1.5 rounded-full group-hover/link:bg-zinc-900 group-hover/link:text-amber-500 transition-colors shrink-0 text-slate-550">
                                <FileText className="w-3.5 h-3.5" />
                              </div>
                            </button>
                          </div>
                        ) : (
                          <div className="text-slate-400 text-[10px] italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                             No files available yet.
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-5 lg:p-6 rounded-3xl" id="client-uploaded-docs-block">
                        <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <FileBox className="w-4 h-4" /> Case Files & Uploads ({uploadedDocs.length})
                        </h4>

                        {uploadedDocs.length > 0 ? (
                          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                            {uploadedDocs.map((doc) => (
                              <div 
                                key={doc.id}
                                className="flex items-center justify-between w-full bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:border-amber-400 transition-all min-w-0"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-7 h-7 bg-amber-500/10 text-amber-700 rounded-lg flex items-center justify-center shrink-0">
                                    <FileText className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="text-left min-w-0 font-sans">
                                    <span className="text-slate-800 font-bold text-xs block truncate max-w-[120px] sm:max-w-[160px]">{doc.fileName}</span>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Legal Record</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button 
                                    onClick={() => openOrDownloadFile(doc.fileUrl, doc.fileName)}
                                    className="text-[9px] font-black uppercase text-amber-600 font-extrabold hover:underline select-none bg-amber-50 hover:bg-amber-100 border border-amber-200 py-1.5 px-3 rounded-lg cursor-pointer transition-colors"
                                  >
                                    View
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteDocument(doc.id, doc.fileUrl)}
                                    className="text-[9px] font-black uppercase text-red-600 font-extrabold hover:bg-red-50 border border-red-100 py-1.5 px-2.5 rounded-lg cursor-pointer transition-colors flex items-center justify-center"
                                    title="Delete Document"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 text-[10px] italic bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
                            No uploaded documents found for this case.
                          </p>
                        )}

                        <div className="mt-5 border-t border-slate-200/60 pt-5">
                          <DocumentUploader caseId={selectedCase.id} />
                        </div>
                      </div>
                    </div>
                  </div>
 
                  {/* Hearing Timeline */}
                  <div className="px-0 py-2">
                    <h3 className="text-base lg:text-lg font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
                      <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-amber-500" /> Case Hearing History
                    </h3>
                    
                    <div className="relative space-y-10 font-sans">
                      <div className="absolute left-[18px] lg:left-[23px] top-4 bottom-4 w-0.5 bg-slate-200" />
                      
                      {selectedCase.hearings && selectedCase.hearings.length > 0 ? (
                        sortHearings(selectedCase.hearings).map((hearing, hIndex, array) => (
                          <div key={hIndex} className="relative flex gap-4 lg:gap-8">
                            <div className={`w-9 h-9 lg:w-12 lg:h-12 rounded-full shrink-0 flex items-center justify-center shadow-md relative z-10 transition-colors ${hIndex === 0 ? 'bg-gradient-to-r from-amber-550 to-yellow-550 text-black font-extrabold' : 'bg-white text-zinc-800 border border-slate-205'}`}>
                              <Gavel className="w-4 h-4 lg:w-5 h-5" />
                            </div>
                            <div className="bg-slate-50 p-5 lg:p-6 rounded-2xl border border-slate-200/50 flex-grow hover:border-slate-300 transition-colors group/item shadow-sm text-left">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <p className="text-[10px] lg:text-sm font-black text-amber-600 flex items-center gap-2">
                                      <Calendar className="w-3.5 h-3.5" /> 
                                      <span className="uppercase tracking-wider">Hearing Date:</span> {hearing.date}
                                    </p>
                                    {hearing.purpose && (
                                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[8px] font-black uppercase rounded tracking-wider border border-amber-200">
                                        {hearing.purpose}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-[sans-serif]">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                                      Seq: {array.length - hIndex}
                                    </p>
                                    {(hearing.judgeName || selectedCase.judgeName) && (
                                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> 
                                        Before: {hearing.judgeName || selectedCase.judgeName}
                                      </p>
                                    )}
                                    {hearing.nextHearingDate && (
                                      <p className="text-[8px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" /> 
                                        Next Scheduled: {hearing.nextHearingDate}
                                      </p>
                                    )}
                                    {(hearing.courtName || selectedCase.courtName) && (
                                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" /> 
                                        {hearing.courtName || selectedCase.courtName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {hearing.orderSheetUrl && (
                                  <button 
                                    onClick={() => openOrDownloadFile(hearing.orderSheetUrl || '', `${selectedCase.caseNo || 'case'}_order_${hearing.date}`)}
                                    className="text-[9px] font-black uppercase tracking-widest text-white bg-zinc-900 px-3 py-1.5 rounded-full shadow-sm hover:scale-[1.05] transition-all flex items-center gap-2 w-fit active:scale-95 cursor-pointer hover:bg-slate-800"
                                  >
                                    <FileText className="w-3 h-3 text-amber-500" /> Get Order
                                  </button>
                                )}
                              </div>
                              <p className="text-slate-605 text-xs lg:text-sm leading-relaxed">
                                <span className="font-black text-slate-700 text-[10px] lg:text-xs block mb-1 uppercase tracking-wider">Detailed Proceedings</span>
                                {hearing.proceedings}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="relative flex gap-4 lg:gap-8">
                           <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-full shrink-0 flex items-center justify-center shadow-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold relative z-10">
                              <Gavel className="w-4 h-4 lg:w-5 h-5" />
                            </div>
                            <div className="bg-slate-50 p-5 lg:p-6 rounded-2xl border border-slate-205 flex-grow shadow-md text-left">
                              <div className="flex items-center gap-3 mb-3">
                                <p className="text-[10px] lg:text-sm font-black text-amber-600 flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span className="uppercase tracking-wider">Hearing Date:</span> {selectedCase.lastHearingDate}
                                </p>
                                <span className="px-2 py-0.5 bg-slate-200 text-slate-500 text-[8px] font-black uppercase rounded tracking-wider border border-slate-300">Initial Recording</span>
                              </div>
                              <p className="text-slate-600 text-xs lg:text-sm leading-relaxed">{selectedCase.proceedings || "No detailed history available."}</p>
                            </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-left font-sans">
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Gavel className="w-5 h-5 text-amber-500" /> My Cases
              </h3>
              <div className="space-y-3 font-sans font-sans">
                {displayCases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedCaseId === c.id 
                      ? 'bg-amber-50/60 border-amber-400/40 shadow-sm' 
                      : 'bg-slate-50/50 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${selectedCaseId === c.id ? 'text-amber-700' : 'text-slate-400'}`}>
                      {c.caseNo}
                    </p>
                    <p className={`text-sm font-bold line-clamp-2 ${selectedCaseId === c.id ? 'text-slate-800' : 'text-slate-600'}`}>
                      {c.caseTitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-950/20 text-left font-sans">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <Shield className="w-10 h-10 text-amber-500/50 mb-6" />
                <h3 className="text-xl font-serif font-bold mb-4">Direct Advocate Support</h3>
                <p className="text-white/80 text-sm mb-8 leading-relaxed">Need help immediately? Contact your dedicated legal consultant directly through WhatsApp.</p>
                <a 
                  href="https://wa.me/923218520085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-[0.98] border border-slate-200 cursor-pointer text-center"
                >
                  <MessageSquare className="w-5 h-5 text-black" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-left font-sans">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-serif font-bold text-slate-900 font-bold">Confidentiality</h3>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                Your case data and files are strictly confidential. All communications are protected under advocate-client privilege.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mini Portal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JUS & LAY CRM Portal. All Rights Reserved. Protected under Advocate-Client Privilege.</p>
        </div>
      </footer>
    </div>
  );
}
