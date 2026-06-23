import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, setDoc, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, deleteUser, initializeAuth, inMemoryPersistence } from 'firebase/auth';
import { initializeApp, deleteApp } from 'firebase/app';
import { db, auth, config as firebaseConfig, handleFirestoreError, OperationType, storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { 
  Users, Gavel, Plus, Search, LogOut, 
  ChevronRight, Calendar, FileText, 
  ShieldCheck, ArrowLeft, Loader2, Save,
  ChevronLeft, LayoutGrid, CalendarDays,
  Building2, ExternalLink, Clock, Eye, EyeOff,
  Edit, FileBox, Trash2, AlertTriangle
} from 'lucide-react';
import { LEGAL_TEAM } from '../data';
import { compressImageIfPossible, fileToBase64, openOrDownloadFile } from '../lib/fileHelper';
import { DocumentUploader } from '../components/DocumentUploader';
import { safeConfirm, safeAlert } from '../lib/modalHelper';

interface Hearing {
  id?: string;
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

interface Case {
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
  createdAt?: { toDate: () => Date };
}

interface AdminPortalProps {
  setView: (view: 'main' | 'admin-login' | 'admin-portal' | 'client-login' | 'client-portal') => void;
}

export default function AdminPortal({ setView }: AdminPortalProps) {
  const [cases, setCases] = useState<Case[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getClientPassword = (clientId: string) => {
    if (!clientId) return null;
    const searchId = clientId.toLowerCase().trim();
    
    // First check dedicated users collection
    const userDoc = users.find(u => u.email?.toLowerCase().trim() === searchId);
    if (userDoc?.password) return userDoc.password;

    // Fallback to searching all cases for any record that contains a password for this client ID
    const caseWithPassword = cases.find(c => 
      c.clientId?.toLowerCase().trim() === searchId && 
      c.clientPassword && 
      c.clientPassword.trim() !== ''
    );
    return caseWithPassword?.clientPassword || null;
  };
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const today = new Date().toISOString().split('T')[0];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDateHearings, setSelectedDateHearings] = useState<Hearing[]>([]);

  const filteredCases = cases.filter(c => 
    !c.caseTitle.includes('Sample Trial Case') && (
      c.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.clientId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [formData, setFormData] = useState({
    caseTitle: '',
    caseNo: '',
    srNo: '',
    judgeName: '',
    courtName: '',
    counselName: '',
    lastHearingDate: '',
    nextHearingDate: '',
    clientId: '',
    clientPassword: '',
    proceedings: '',
    orderSheetUrl: '',
  });

  const [isEditingCase, setIsEditingCase] = useState(false);
  const [editFormData, setEditFormData] = useState({
    caseTitle: '',
    caseNo: '',
    srNo: '',
    judgeName: '',
    courtName: '',
    counselName: '',
    lastHearingDate: '',
    nextHearingDate: '',
    clientId: '',
    clientPassword: '',
    proceedings: '',
    orderSheetUrl: '',
  });

  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const selectedCase = cases.find(c => c.id === selectedCaseId) || null;
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [uploadedHearingFileName, setUploadedHearingFileName] = useState<string>('');
  const [uploadedCaseFileName, setUploadedCaseFileName] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'case' | 'hearing' | 'document';
    id: string;
    secondaryId?: string;
    data?: any;
    step: 1 | 2;
  } | null>(null);

  useEffect(() => {
    if (!selectedCaseId) {
      setUploadedDocs([]);
      return;
    }

    const docsPath = 'documents';
    const q = query(
      collection(db, docsPath),
      where('caseId', '==', selectedCaseId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUploadedDocs(docsData);
    }, (error) => {
      console.error("Error subscribing to case documents in AdminPortal:", error);
    });

    return () => unsubscribe();
  }, [selectedCaseId]);

  const startEditing = (c: Case) => {
    setEditFormData({
      caseTitle: c.caseTitle || '',
      caseNo: c.caseNo || '',
      srNo: c.srNo || '',
      judgeName: c.judgeName || '',
      courtName: c.courtName || '',
      counselName: c.counselName || '',
      lastHearingDate: c.lastHearingDate || '',
      nextHearingDate: c.nextHearingDate || '',
      clientId: c.clientId || '',
      clientPassword: getClientPassword(c.clientId) || c.clientPassword || '',
      proceedings: c.proceedings || '',
      orderSheetUrl: c.orderSheetUrl || '',
    });
    setIsEditingCase(true);
  };

  const [newHearing, setNewHearing] = useState({
    date: '',
    nextHearingDate: '',
    proceedings: '',
    orderSheetUrl: '',
    purpose: '',
    judgeName: '',
    courtName: ''
  });

  const [isUploading, setIsUploading] = useState(false);
 
  // Helper for file upload to Firebase Storage with intelligent Base64 Firestore fallbacks
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    setter: (url: string) => void,
    nameSetter?: (name: string) => void
  ) => {
    let file = e.target.files?.[0];
    if (!file) return;

    if (nameSetter) {
      nameSetter(file.name);
    }

    if (file.size > 15 * 1024 * 1024) { 
      safeAlert("File is too large. Please upload files smaller than 15MB.");
      return;
    }

    setIsUploading(true);
    try {
      // Step 1: Client-side compression if image to reduce transport/storage size
      if (file.type.startsWith('image/')) {
        try {
          const compressed = await compressImageIfPossible(file);
          file = compressed;
        } catch (compErr) {
          console.warn("Image pre-compression failed, proceeding with original file:", compErr);
        }
      }

      // Step 2: Try Firebase Storage Cloud upload
      const storageRef = ref(storage, `cases/${Date.now()}_${file.name}`);
      const metadata = {
        contentType: file.type || 'application/octet-stream',
      };
      
      console.log("Attempting cloud upload to:", storageRef.fullPath, "with type:", metadata.contentType);
      
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setter(downloadURL);
    } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.warn("Storage upload failed, attempting auto database fallback:", e);
      
      // Step 3: Handle automatic Firestore-safe fallback (Base64) for files under 800KB
      if (file.size <= 800 * 1024) {
        try {
          const base64Data = await fileToBase64(file);
          setter(base64Data);
          safeAlert("Notice: Firebase Storage is not yet enabled or rules are restricted. Your file has been successfully converted and stored inside the database instead!");
        } catch (base64Err) {
          console.error("Base64 conversion failed:", base64Err);
          safeAlert("Failed to compress/encode file for local database fallback.");
        }
      } else {
        // File is too large for Firestore's 1MB limit & Cloud Storage failed
        let storageError = "Failed to upload file.";
        if (e.code === 'storage/unauthorized') {
          storageError = "Firebase Storage permissions are restricted in your Google console.";
        }
        
        safeAlert(`${storageError}\n\nSince Cloud Storage is locked, files up to 800KB are automatically saved in the database as a fallback. However, this file is ${Math.round(file.size / 1024)}KB.\n\nPlease upload a smaller file (under 800KB) OR update your Firebase Console rules to enable Storage.`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const fetchUsers = React.useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const fetchedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserProfile[];
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const fetchCases = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'cases'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const fetchedCases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Case));
      setCases(fetchedCases);
      await fetchUsers();
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsers]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        const admins = ['juslay3@gmail.com', 'jamalshah183@gmail.com'];
        const userEmail = u.email?.toLowerCase();
        
        if (userEmail && admins.includes(userEmail) && u.providerData.some(p => p.providerId === 'google.com')) {
          // Ensure admin user profile document exists in the 'users' collection
          const ensureAdminProfile = async () => {
            try {
              const uRef = doc(db, 'users', u.uid);
              await setDoc(uRef, {
                uid: u.uid,
                email: u.email || '',
                role: 'admin',
                name: u.displayName || 'Admin',
                createdAt: serverTimestamp()
              }, { merge: true });
            } catch (err) {
              console.error("Failed to ensure admin profile document:", err);
            }
          };
          ensureAdminProfile();
          fetchCases();
          
          // Auto-bootstrap check for empty databases
          const checkAndBootstrap = async () => {
             try {
              const snap = await getDocs(collection(db, 'cases'));
              if (snap.empty) {
                console.log('Database empty, auto-bootstrapping default items...');
                // Seed some default fields locally
                const defaultCases = [
                  {
                    caseTitle: "State vs John Doe",
                    caseNo: "CR-2026-904",
                    srNo: "12",
                    judgeName: "Justice Wajid Ali",
                    courtName: "LHC Bench 4",
                    counselName: LEGAL_TEAM[0]?.name || "AMMAR YASIR NAQVI",
                    lastHearingDate: "2026-06-15",
                    nextHearingDate: "2026-07-10",
                    clientId: "client@test.com",
                    clientPassword: "password123",
                    proceedings: "Arguments completed. Adjourned for files submission.",
                    hearings: [],
                    createdAt: serverTimestamp()
                  }
                ];
                
                for (const c of defaultCases) {
                  await addDoc(collection(db, 'cases'), c);
                }

                // Create user profile
                const secondaryApp = initializeApp(firebaseConfig, `Bootstrap_${Date.now()}`);
                const secondaryAuth = initializeAuth(secondaryApp, {
                  persistence: inMemoryPersistence
                });
                try {
                  const uc = await createUserWithEmailAndPassword(secondaryAuth, 'client@test.com', 'password123');
                  const uRef = doc(db, 'users', uc.user.uid);
                  await setDoc(uRef, {
                    email: 'client@test.com',
                    password: 'password123',
                    role: 'client',
                    createdAt: serverTimestamp()
                  });
                } catch (ec: any) {
                  if (ec.code !== 'auth/email-already-in-use') console.warn(ec);
                } finally {
                  await deleteApp(secondaryApp);
                }

                fetchCases();
              }
            } catch (err: unknown) {
              console.error('Auto-bootstrap failed:', err);
            }
          };
          checkAndBootstrap();

        } else {
          auth.signOut();
          localStorage.removeItem('session_start_time');
          localStorage.removeItem('last_activity_time');
          setView('admin-login');
        }
      } else {
        setView('admin-login');
      }
    });
    return () => unsubscribe();
  }, [setView, fetchCases]);

  const handleDeleteCase = async (caseId: string, clientId: string, bypassConfirm = false) => {
    if (!bypassConfirm) {
      setDeleteConfirm({
        type: 'case',
        id: caseId,
        secondaryId: clientId,
        step: 1
      });
      return;
    }
    
    setIsSaving(true);
    try {
      const otherCases = cases.filter(c => c.id !== caseId && c.clientId?.toLowerCase() === clientId?.toLowerCase());
      
      if (clientId && otherCases.length === 0) {
        const userProfile = users.find(u => u.email?.toLowerCase() === clientId.toLowerCase());
        
        if (userProfile && userProfile.password) {
           let secondaryApp;
           try {
             secondaryApp = initializeApp(firebaseConfig, `DeleteUser_${Date.now()}`);
             const secondaryAuth = initializeAuth(secondaryApp, {
               persistence: inMemoryPersistence
             });
             const userCred = await signInWithEmailAndPassword(secondaryAuth, userProfile.email, userProfile.password);
             await deleteUser(userCred.user);
             
             const { deleteDoc: delDoc, doc: fireDoc } = await import('firebase/firestore');
             await delDoc(fireDoc(db, 'users', userProfile.id));
             
             console.log("Cleaned up user account for client:", clientId);
           } catch (deleteError) {
             console.warn("User account cleanup warning:", deleteError);
           } finally {
             if (secondaryApp) await deleteApp(secondaryApp);
           }
        }
      }
      
      await deleteDoc(doc(db, 'cases', caseId));
      
      fetchCases();
      safeAlert("Case record deleted.");
      if (selectedCaseId === caseId) setSelectedCaseId(null);
    } catch (error) {
      console.error("Error deleting case:", error);
      safeAlert("Failed to delete the case record.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDocument = async (docId: string, fileUrl?: string, bypassConfirm = false) => {
    if (!bypassConfirm) {
      setDeleteConfirm({
        type: 'document',
        id: docId,
        secondaryId: fileUrl,
        step: 1
      });
      return;
    }
    try {
      await deleteDoc(doc(db, 'documents', docId));
      
      if (fileUrl && fileUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const fileRef = ref(storage, fileUrl);
          await deleteObject(fileRef);
        } catch (storageErr) {
          console.warn("Storage item cleanup bypassed/failed:", storageErr);
        }
      }
      safeAlert("Document deleted successfully from vault.");
    } catch (err) {
      console.error("Error deleting document:", err);
      safeAlert("Failed to delete the document.");
    }
  };

  const handleDeleteHearing = async (hearingToDelete: Hearing, bypassConfirm = false) => {
    if (!selectedCase?.id) return;
    if (!bypassConfirm) {
      setDeleteConfirm({
        type: 'hearing',
        id: hearingToDelete.id || `h_${(hearingToDelete.date || '').replace(/[^a-zA-Z0-9]/g, '')}_${(hearingToDelete.proceedings || '').substring(0, 10).replace(/[^a-zA-Z0-9]/g, '')}`,
        data: hearingToDelete,
        step: 1
      });
      return;
    }
    setIsSaving(true);
    try {
      const caseId = selectedCase.id;
      // Determine hearing ID (fallback for legacy records that don't have an ID)
      const hearingId = hearingToDelete.id || `h_${(hearingToDelete.date || '').replace(/[^a-zA-Z0-9]/g, '')}_${(hearingToDelete.proceedings || '').substring(0, 10).replace(/[^a-zA-Z0-9]/g, '')}`;
      
      // Delete the specific hearing document from the subcollection
      await deleteDoc(doc(db, "cases", caseId, "hearings", hearingId));
      
      // Remove the hearing from the array in the parent case document
      const caseRef = doc(db, 'cases', caseId);
      const updatedHearings = (selectedCase.hearings || []).filter(h => 
        !(h.date === hearingToDelete.date && h.proceedings === hearingToDelete.proceedings)
      );
      
      await updateDoc(caseRef, {
        hearings: updatedHearings,
        updatedAt: serverTimestamp()
      });
      
      // Update local state immediately so UI updates without flickering or waiting for reload
      setCases(prevCases => prevCases.map(c => c.id === caseId ? { ...c, hearings: updatedHearings } : c));
      
      safeAlert("Hearing record successfully removed.");
    } catch (error: any) {
      console.error("Error removing hearing:", error);
      if (error?.code === 'permission-denied') {
        safeAlert("Error: You do not have permission to delete this hearing.");
      } else {
        safeAlert("Failed to remove hearing record: " + (error instanceof Error ? error.message : String(error)));
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddHearing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase?.id) return;
    
    setIsSaving(true);
    try {
      const caseRef = doc(db, 'cases', selectedCase.id);
      
      // Generate a unique ID for the new hearing document in the subcollection
      const hearingsColRef = collection(db, 'cases', selectedCase.id, 'hearings');
      const newHearingDocRef = doc(hearingsColRef);
      const hearingId = newHearingDocRef.id;

      const hearingWithContext = {
        id: hearingId,
        ...newHearing,
        judgeName: newHearing.judgeName || selectedCase.judgeName,
        courtName: newHearing.courtName || selectedCase.courtName
      };

      // 1. Write the hearing document to the subcollection
      await setDoc(newHearingDocRef, {
        ...hearingWithContext,
        caseId: selectedCase.id,
        clientId: selectedCase.clientId || '',
        createdAt: serverTimestamp()
      });

      // 2. Add to parent cases array for real-time reads in main list
      const updatedHearings = [...(selectedCase.hearings || []), hearingWithContext];
      
      await updateDoc(caseRef, {
        hearings: updatedHearings,
        lastHearingDate: newHearing.date,
        nextHearingDate: newHearing.nextHearingDate,
        updatedAt: serverTimestamp()
      });

      if (newHearing.orderSheetUrl) {
        try {
          const fileName = uploadedHearingFileName || `Order_Sheet_${newHearing.date || Date.now()}.pdf`;
          await addDoc(collection(db, 'documents'), {
            fileName: fileName,
            fileUrl: newHearing.orderSheetUrl,
            fileType: fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
            caseId: selectedCase.id,
            uploadedBy: auth.currentUser?.uid || 'admin',
            createdAt: serverTimestamp()
          });
          setUploadedHearingFileName('');
        } catch (docErr) {
          console.error("Auto document upload sync failed on add hearing:", docErr);
        }
      }
      
      setNewHearing({ date: '', nextHearingDate: '', proceedings: '', orderSheetUrl: '', purpose: '', judgeName: '', courtName: '' });
      fetchCases();
      safeAlert("Hearing committed to official record.");
    } catch (error) {
      console.error("Error adding hearing:", error);
      safeAlert("Failed to update hearing record.");
      handleFirestoreError(error, OperationType.UPDATE, `cases/${selectedCase.id}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase?.id) return;
    
    setIsSaving(true);
    const userDocExists = users.some(u => u.email.toLowerCase() === editFormData.clientId.toLowerCase());
    
    try {
      if (editFormData.clientPassword && editFormData.clientId.includes('@')) {
        let secondaryApp;
        try {
          secondaryApp = initializeApp(firebaseConfig, `AuthSyncUpdate_${Date.now()}`);
          const secondaryAuth = initializeAuth(secondaryApp, {
            persistence: inMemoryPersistence
          });
          
          let userId = '';
          try {
            const userCred = await createUserWithEmailAndPassword(secondaryAuth, editFormData.clientId, editFormData.clientPassword);
            userId = userCred.user.uid;
          } catch (authError: unknown) {
            const errorCode = (authError as { code?: string })?.code;
            if (errorCode === 'auth/email-already-in-use') {
              try {
                const userCred = await signInWithEmailAndPassword(secondaryAuth, editFormData.clientId, editFormData.clientPassword);
                userId = userCred.user.uid;
              } catch (loginError) {
                console.warn("Could not retrieve UID during update:", loginError);
              }
            } else if (errorCode === 'auth/weak-password') {
              safeAlert("Password too weak (6 chars min).");
              throw authError;
            } else {
              throw authError;
            }
          }
          
          if (userId) {
            const userRef = doc(db, 'users', userId);
            const userPayload: Record<string, any> = {
              email: editFormData.clientId || '',
              password: editFormData.clientPassword || '',
              role: 'client',
              updatedAt: serverTimestamp()
            };
            if (!userDocExists) {
              userPayload.createdAt = serverTimestamp();
            }
            await setDoc(userRef, userPayload, { merge: true });
          }
          
          const { signOut: sOut } = await import('firebase/auth');
          await sOut(secondaryAuth);
        } catch (authError: unknown) {
          console.warn("Auth sync error during update:", authError);
        } finally {
          if (secondaryApp) {
            await deleteApp(secondaryApp);
          }
        }
      }
      
      const caseRef = doc(db, 'cases', selectedCase.id);
      const caseDataToUpdate: Record<string, any> = {
        caseTitle: editFormData.caseTitle || '',
        caseNo: editFormData.caseNo || '',
        srNo: editFormData.srNo || '',
        judgeName: editFormData.judgeName || '',
        courtName: editFormData.courtName || '',
        counselName: editFormData.counselName || '',
        lastHearingDate: editFormData.lastHearingDate || '',
        nextHearingDate: editFormData.nextHearingDate || '',
        clientId: editFormData.clientId || '',
        proceedings: editFormData.proceedings || '',
        updatedAt: serverTimestamp()
      };
      
      if (editFormData.clientPassword) {
        caseDataToUpdate.clientPassword = editFormData.clientPassword;
      }
      if (editFormData.orderSheetUrl) {
        caseDataToUpdate.orderSheetUrl = editFormData.orderSheetUrl;
      }
      
      await updateDoc(caseRef, caseDataToUpdate);

      if (editFormData.orderSheetUrl && editFormData.orderSheetUrl !== selectedCase.orderSheetUrl) {
        try {
          const fileName = uploadedCaseFileName || 'Updated_Order_Sheet.pdf';
          await addDoc(collection(db, 'documents'), {
            fileName: fileName,
            fileUrl: editFormData.orderSheetUrl,
            fileType: fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
            caseId: selectedCase.id,
            uploadedBy: auth.currentUser?.uid || 'admin',
            createdAt: serverTimestamp()
          });
          setUploadedCaseFileName('');
        } catch (docErr) {
          console.error("Auto document upload sync failed on case update:", docErr);
        }
      }
      setIsEditingCase(false);
      fetchCases();
      safeAlert("Case record successfully updated!");
    } catch (error) {
      console.error("Error updating case:", error);
      safeAlert("Failed to update case record: " + (error instanceof Error ? error.message : String(error)));
      handleFirestoreError(error, OperationType.UPDATE, `cases/${selectedCase.id}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const userDocExists = users.some(u => u.email.toLowerCase() === formData.clientId.toLowerCase());

    try {
      if (formData.clientPassword && formData.clientId.includes('@')) {
        let secondaryApp;
        try {
          secondaryApp = initializeApp(firebaseConfig, `AuthSync_${Date.now()}`);
          const secondaryAuth = initializeAuth(secondaryApp, {
            persistence: inMemoryPersistence
          });
          
          let userId = '';
          try {
            const userCred = await createUserWithEmailAndPassword(secondaryAuth, formData.clientId, formData.clientPassword);
            userId = userCred.user.uid;
          } catch (authError: unknown) {
            const errorCode = (authError as { code?: string })?.code;
            if (errorCode === 'auth/email-already-in-use') {
              try {
                const userCred = await signInWithEmailAndPassword(secondaryAuth, formData.clientId, formData.clientPassword);
                userId = userCred.user.uid;
              } catch (loginError) {
                console.warn("Could not retrieve UID:", loginError);
              }
            } else if (errorCode === 'auth/weak-password') {
              safeAlert("Password too weak (6 chars min).");
              throw authError;
            } else {
              throw authError;
            }
          }
          
          if (userId) {
            const userRef = doc(db, 'users', userId);
            const userPayload: Record<string, any> = {
              email: formData.clientId || '',
              password: formData.clientPassword || '',
              role: 'client',
              updatedAt: serverTimestamp()
            };
            if (!userDocExists) {
              userPayload.createdAt = serverTimestamp();
            }
            await setDoc(userRef, userPayload, { merge: true });
          }

          const { signOut: sOut } = await import('firebase/auth');
          await sOut(secondaryAuth);
        } catch (authError: unknown) {
          console.warn("Auth sync error:", authError);
        } finally {
          if (secondaryApp) {
            await deleteApp(secondaryApp);
          }
        }
      }

      const caseDataToInsert: Record<string, any> = {
        caseTitle: formData.caseTitle || '',
        caseNo: formData.caseNo || '',
        srNo: formData.srNo || '',
        judgeName: formData.judgeName || '',
        courtName: formData.courtName || '',
        counselName: formData.counselName || '',
        lastHearingDate: formData.lastHearingDate || '',
        nextHearingDate: formData.nextHearingDate || '',
        clientId: formData.clientId || '',
        proceedings: formData.proceedings || '',
      };

      if (formData.clientPassword) {
        caseDataToInsert.clientPassword = formData.clientPassword;
      }
      if (formData.orderSheetUrl) {
        caseDataToInsert.orderSheetUrl = formData.orderSheetUrl;
      }

      const docRef = await addDoc(collection(db, 'cases'), {
        ...caseDataToInsert,
        hearings: [],
        createdAt: serverTimestamp()
      });

      if (formData.orderSheetUrl) {
        try {
          const fileName = uploadedCaseFileName || 'Initial_Order_Sheet.pdf';
          await addDoc(collection(db, 'documents'), {
            fileName: fileName,
            fileUrl: formData.orderSheetUrl,
            fileType: fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
            caseId: docRef.id,
            uploadedBy: auth.currentUser?.uid || 'admin',
            createdAt: serverTimestamp()
          });
          setUploadedCaseFileName('');
        } catch (docErr) {
          console.error("Auto document upload sync failed on case create:", docErr);
        }
      }
      setIsAdding(false);
      setFormData({
        caseTitle: '',
        caseNo: '',
        srNo: '',
        judgeName: '',
        courtName: '',
        counselName: '',
        lastHearingDate: '',
        nextHearingDate: '',
        clientId: '',
        clientPassword: '',
        proceedings: '',
        orderSheetUrl: '',
      });
      fetchCases();
      safeAlert("Case record successfully created!");
    } catch (error) {
      console.error("Error adding case:", error);
      safeAlert("Failed to create new case record: " + (error instanceof Error ? error.message : String(error)));
      handleFirestoreError(error, OperationType.CREATE, 'cases');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    localStorage.removeItem('session_start_time');
    setView('main');
  };

  const getCounselImage = (name: string) => {
    const member = LEGAL_TEAM.find(t => t.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(t.name.toLowerCase()));
    return member?.image || "https://images.pexels.com/photos/37339382/pexels-photo-37339382.png";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between font-sans selection:bg-gold-500 selection:text-black">
      {/* Mini Portal Header */}
      <header className="border-b border-zinc-900 bg-[#040811] py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setView('main')} className="flex items-center gap-2 text-gold-500 hover:text-white transition-colors cursor-pointer">
            <Gavel className="w-5 h-5" />
            <span className="font-serif font-bold text-lg text-white">Jus & Lay Admin Control</span>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40 hidden sm:inline">{auth.currentUser?.email}</span>
            <button 
              onClick={() => setView('main')}
              className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              ← Return to Website
            </button>
          </div>
        </div>
      </header>

      {/* Admin Control Header */}
      <div className="bg-zinc-900 text-white py-10 px-4 shadow-xl border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-left">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-white m-0">Admin Workspace</h1>
              <div className="flex items-center gap-4 mt-1 flex-wrap">
                <p className="text-zinc-400 text-xs font-medium">Record Entry, File Vault, and Calendar.</p>
                <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full border border-amber-500/20">
                  <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Active Cases:</span>
                  <span className="text-xs font-black text-white">{cases.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handleSignOut}
              className="px-4 py-2.5 bg-zinc-850 hover:bg-zinc-800 border border-zinc-805 text-white/80 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Exit Workspace
            </button>
            <button 
              onClick={() => { setIsAdding(true); setSelectedCaseId(null); }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-xl text-xs font-extrabold hover:scale-[1.02] transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Log Record
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar controls */}
          <div className="lg:col-span-1 space-y-6 text-left">
            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 shadow-sm">
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">View Toggle</h3>
              <div className="grid grid-cols-2 gap-2 bg-black p-1.5 rounded-2xl">
                <button 
                  onClick={() => { setViewMode('list'); setSelectedCaseId(null); setIsAdding(false); }}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${viewMode === 'list' ? 'bg-zinc-800 text-amber-500 shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" /> LIST
                </button>
                <button 
                  onClick={() => { setViewMode('calendar'); setSelectedCaseId(null); setIsAdding(false); }}
                  className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${viewMode === 'calendar' ? 'bg-zinc-800 text-amber-500 shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                >
                  <CalendarDays className="w-3.5 h-3.5" /> CALENDAR
                </button>
              </div>
            </div>

            <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 shadow-sm select-none">
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">System Telemetry</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-amber-500">
                      <Gavel className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400">Cases</span>
                  </div>
                  <span className="text-sm font-black text-white">{cases.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center text-amber-500">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-zinc-400">Authenticated Users</span>
                  </div>
                  <span className="text-sm font-black text-white">
                    {new Set(cases.map(c => c.clientId)).size}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Workspace Frame */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div 
                  key="add-case"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-zinc-900 rounded-3xl border border-zinc-850 p-6 lg:p-10 text-left"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-5 mb-8">
                    <div className="flex items-center gap-3">
                      <Gavel className="w-6 h-6 text-amber-500" />
                      <h2 className="text-xl font-serif font-bold text-white uppercase">Initialize New Case File</h2>
                    </div>
                    <button 
                      onClick={() => setIsAdding(false)} 
                      className="text-xs font-bold text-white/50 hover:text-white"
                    >
                      Cancel Entry
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 font-sans">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Case Title / Parties Name</label>
                        <input required type="text" placeholder="e.g. State vs. Malik" value={formData.caseTitle} onChange={(e) => setFormData({...formData, caseTitle: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Case File Number</label>
                        <input required type="text" placeholder="e.g. CIV-2026-0041" value={formData.caseNo} onChange={(e) => setFormData({...formData, caseNo: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Serial Number</label>
                        <input type="text" placeholder="e.g. 15" value={formData.srNo} onChange={(e) => setFormData({...formData, srNo: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Presiding Judge</label>
                        <input required type="text" placeholder="e.g. Justice Syed Ali" value={formData.judgeName} onChange={(e) => setFormData({...formData, judgeName: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Court Venue / Jurisdiction</label>
                        <input required type="text" placeholder="e.g. Sessions Court, Lahore" value={formData.courtName} onChange={(e) => setFormData({...formData, courtName: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Lead Counsel in Charge</label>
                        <select required value={formData.counselName} onChange={(e) => setFormData({...formData, counselName: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white [color-scheme:dark]">
                          <option value="">Select Counsel</option>
                          {LEGAL_TEAM.map(l => (
                            <option key={l.id} value={l.name}>{l.name} ({l.role})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 border-t border-zinc-850 pt-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Initial / Last Hearing Date</label>
                        <input required type="date" value={formData.lastHearingDate} onClick={(e) => (e.target as any).showPicker?.()} onChange={(e) => setFormData({...formData, lastHearingDate: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white [color-scheme:dark]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1 text-amber-500 font-bold">Upcoming Hearing Date</label>
                        <input required type="date" value={formData.nextHearingDate} onClick={(e) => (e.target as any).showPicker?.()} onChange={(e) => setFormData({...formData, nextHearingDate: e.target.value})} className="w-full bg-black border border-amber-500/20 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white [color-scheme:dark]" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 border-t border-zinc-850 pt-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1 font-bold text-amber-500">Client Login Email (Drives Access)</label>
                        <input required type="email" placeholder="client@test.com" value={formData.clientId} onChange={(e) => setFormData({...formData, clientId: e.target.value})} className="w-full bg-black border border-amber-500/20 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Assign Portal Password (6 Chars Min)</label>
                        <input required type="text" placeholder="password123" value={formData.clientPassword} onChange={(e) => setFormData({...formData, clientPassword: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                        <span className="text-[9px] text-white/30 block ml-1 font-bold">Client will use this key and email to read case files.</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-zinc-850 pt-6">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Case Order Sheet Attachment (PDF or Image)</label>
                      <input type="file" accept="image/*,application/pdf" id="main-case-upload" onChange={(e) => handleFileUpload(e, (url) => setFormData({...formData, orderSheetUrl: url}), (name) => setUploadedCaseFileName(name))} className="hidden" />
                      <label htmlFor="main-case-upload" className={`w-full flex items-center justify-between bg-black border border-zinc-850 rounded-xl px-4 py-3 text-sm cursor-pointer hover:border-amber-500/30 transition-all ${formData.orderSheetUrl ? 'border-amber-500/50 bg-amber-500/5' : ''}`}>
                        <span className="flex items-center gap-2 text-zinc-400">
                          {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                          {formData.orderSheetUrl ? 'File Staged successfully' : 'Drag or Upload Document'}
                        </span>
                        {formData.orderSheetUrl && <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded uppercase">Stored</span>}
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Current State / Latest Proceedings Overview</label>
                      <textarea required rows={4} placeholder="Summarize what went down on the last court hearing..." value={formData.proceedings} onChange={(e) => setFormData({...formData, proceedings: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none resize-none text-white" />
                    </div>

                    <div className="flex gap-4 justify-end">
                      <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3.5 bg-zinc-850 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all cursor-pointer">Discard</button>
                      <button type="submit" disabled={isSaving || isUploading} className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-xl text-xs font-black hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isUploading ? 'Uploading file...' : 'Build Official Dossier'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : viewMode === 'calendar' && !selectedCase ? (
                <motion.div 
                  key="calendar-frame"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden shadow-xl"
                >
                  <CalendarSection 
                    cases={cases} 
                    currentMonth={currentMonth} 
                    setCurrentMonth={setCurrentMonth}
                    onDateClick={(hs) => setSelectedDateHearings(hs)}
                  />

                  {selectedDateHearings.length > 0 && (
                    <div className="p-8 bg-zinc-800/40 border-t border-amber-500/25">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-3">
                          <Gavel className="w-4 h-4" /> Schedule Logs for {selectedDateHearings[0].date}
                        </h3>
                        <button onClick={() => setSelectedDateHearings([])} className="text-xs font-bold text-zinc-500 hover:text-white cursor-pointer">Close</button>
                      </div>
                      <div className="grid gap-4">
                        {selectedDateHearings.map((h, i) => (
                          <div 
                            key={i}
                            onClick={() => { if(h.caseId) { setSelectedCaseId(h.caseId); setSelectedDateHearings([]); setShowPassword(false); } }}
                            className="bg-black p-5 rounded-2xl border border-zinc-850 flex justify-between items-center hover:border-amber-500/30 transition-all cursor-pointer group text-left"
                          >
                            <div className="min-w-0">
                              <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">{h.caseNo}</span>
                              <h4 className="text-sm font-bold text-white uppercase mt-0.5 group-hover:text-amber-500 transition-colors truncate">{h.caseTitle}</h4>
                              <p className="text-xs text-white/50 italic mt-2 line-clamp-1">&quot;{h.proceedings}&quot;</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-650 group-hover:text-amber-500 shrink-0 transition-all translate-x-0 group-hover:translate-x-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : selectedCase ? (
                isEditingCase ? (
                  <motion.div 
                    key="case-edit-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-xl p-6 lg:p-10 text-left animate-in duration-200"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-5 mb-8">
                      <div className="flex items-center gap-3">
                        <Gavel className="w-6 h-6 text-amber-500" />
                        <h2 className="text-xl font-serif font-bold text-white uppercase">Edit Case File Details</h2>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsEditingCase(false)} 
                        className="text-xs font-bold text-white/50 hover:text-white"
                      >
                        Cancel Edit
                      </button>
                    </div>

                    <form onSubmit={handleUpdateCase} className="space-y-8 font-sans">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Case Title / Parties Name</label>
                          <input required type="text" placeholder="e.g. State vs. Malik" value={editFormData.caseTitle} onChange={(e) => setEditFormData({...editFormData, caseTitle: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Case File Number</label>
                          <input required type="text" placeholder="e.g. CIV-2026-0041" value={editFormData.caseNo} onChange={(e) => setEditFormData({...editFormData, caseNo: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Serial Number</label>
                          <input type="text" placeholder="e.g. 15" value={editFormData.srNo} onChange={(e) => setEditFormData({...editFormData, srNo: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Presiding Judge</label>
                          <input required type="text" placeholder="e.g. Justice Syed Ali" value={editFormData.judgeName} onChange={(e) => setEditFormData({...editFormData, judgeName: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Court Venue / Jurisdiction</label>
                          <input required type="text" placeholder="e.g. Sessions Court, Lahore" value={editFormData.courtName} onChange={(e) => setEditFormData({...editFormData, courtName: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Lead Counsel in Charge</label>
                          <select required value={editFormData.counselName} onChange={(e) => setEditFormData({...editFormData, counselName: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white [color-scheme:dark]">
                            <option value="">Select Counsel</option>
                            {LEGAL_TEAM.map(l => (
                              <option key={l.id} value={l.name}>{l.name} ({l.role})</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 border-t border-zinc-850 pt-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Last Hearing Date</label>
                          <input required type="date" value={editFormData.lastHearingDate} onClick={(e) => (e.target as any).showPicker?.()} onChange={(e) => setEditFormData({...editFormData, lastHearingDate: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white [color-scheme:dark]" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1 text-amber-500 font-bold">Upcoming Hearing Date</label>
                          <input required type="date" value={editFormData.nextHearingDate} onClick={(e) => (e.target as any).showPicker?.()} onChange={(e) => setEditFormData({...editFormData, nextHearingDate: e.target.value})} className="w-full bg-black border border-amber-500/20 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white [color-scheme:dark]" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 border-t border-zinc-850 pt-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1 font-bold text-amber-500">Client Login Email (Drives Access)</label>
                          <input required type="email" placeholder="client@test.com" value={editFormData.clientId} onChange={(e) => setEditFormData({...editFormData, clientId: e.target.value})} className="w-full bg-black border border-amber-500/20 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Update Portal Password (6 Chars Min)</label>
                          <input required type="text" placeholder="password123" value={editFormData.clientPassword} onChange={(e) => setEditFormData({...editFormData, clientPassword: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none text-white" />
                          <span className="text-[9px] text-white/30 block ml-1 font-bold">Overwrites or creates the client's auth profile.</span>
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-zinc-850 pt-6">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Case Order Sheet Attachment (PDF or Image)</label>
                        <input type="file" accept="image/*,application/pdf" id="edit-case-upload" onChange={(e) => handleFileUpload(e, (url) => setEditFormData({...editFormData, orderSheetUrl: url}), (name) => setUploadedCaseFileName(name))} className="hidden" />
                        <label htmlFor="edit-case-upload" className={`w-full flex items-center justify-between bg-black border border-zinc-850 rounded-xl px-4 py-3 text-sm cursor-pointer hover:border-amber-500/30 transition-all ${editFormData.orderSheetUrl ? 'border-amber-500/50 bg-amber-500/5' : ''}`}>
                          <span className="flex items-center gap-2 text-zinc-400">
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                            {editFormData.orderSheetUrl ? 'File Staged successfully' : 'Drag or Upload Document'}
                          </span>
                          {editFormData.orderSheetUrl && <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded uppercase">Stored</span>}
                        </label>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-zinc-500 ml-1">Current State / Latest Proceedings Overview</label>
                        <textarea required rows={4} placeholder="Summarize what went down on the last court hearing..." value={editFormData.proceedings} onChange={(e) => setEditFormData({...editFormData, proceedings: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-2xl px-4 py-4 text-sm focus:ring-4 focus:ring-amber-500/5 outline-none resize-none text-white" />
                      </div>

                      <div className="flex gap-4 justify-end">
                        <button type="button" onClick={() => setIsEditingCase(false)} className="px-6 py-3.5 bg-zinc-850 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-all cursor-pointer">Discard</button>
                        <button type="submit" disabled={isSaving || isUploading} className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-xl text-xs font-black hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer">
                          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          {isUploading ? 'Uploading file...' : 'Save File Updates'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="case-detail"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 shadow-xl overflow-hidden text-left animate-in duration-200"
                  >
                    {/* Detailed Panel View */}
                    <div className="p-6 lg:p-10 bg-zinc-800/30 border-b border-zinc-850">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-3">
                            <span className="px-3 py-1 bg-amber-500 text-black text-[8px] font-black uppercase rounded-full tracking-widest">Active File</span>
                            <span className="text-xs font-mono font-black text-amber-500 break-all bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/20">{selectedCase.caseNo}</span>
                          </div>
                          <h2 className="text-xl lg:text-2xl font-serif font-bold text-white uppercase leading-tight truncate max-w-sm md:max-w-md lg:max-w-lg">{selectedCase.caseTitle}</h2>
                          
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-4 text-xs font-bold text-white/50">
                            <p className="flex items-center gap-2 shrink-0"><Users className="w-4 h-4 text-amber-500" /> Owner ID: <span className="text-amber-500 font-bold">{selectedCase.clientId}</span></p>
                            <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-zinc-800">
                              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500">Key:</span>
                              <span className="text-[11px] font-mono text-white/80">{getClientPassword(selectedCase.clientId) ? (showPassword ? getClientPassword(selectedCase.clientId) : '••••••••') : 'Not Set'}</span>
                              <button onClick={() => setShowPassword(!showPassword)} className="text-amber-500 p-0.5 hover:text-white transition-all cursor-pointer">
                                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => startEditing(selectedCase)} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xs rounded-xl transition-all cursor-pointer hover:opacity-90 active:scale-95">
                            <Edit className="w-3.5 h-3.5" /> Edit Case
                          </button>
                          <button onClick={() => { setSelectedCaseId(null); setIsEditingCase(false); }} className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 font-bold text-xs rounded-xl border border-zinc-700 transition-colors cursor-pointer">
                            <ChevronLeft className="w-4 h-4" /> Back to List
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
                        <div className="bg-black/50 p-4 rounded-xl border border-zinc-850">
                          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Sr. Number</p>
                          <p className="text-sm font-bold text-white mt-0.5">{selectedCase.srNo || 'N/A'}</p>
                        </div>
                        <div className="bg-black/50 p-4 rounded-xl border border-zinc-850">
                          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Last Hearing</p>
                          <p className="text-sm font-bold text-white mt-0.5">{selectedCase.lastHearingDate}</p>
                        </div>
                        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 rounded-xl shadow-lg shadow-amber-500/5 text-black">
                          <p className="text-[8px] font-black uppercase tracking-widest text-black/50">Next Hearing</p>
                          <p className="text-sm font-black mt-0.5">{selectedCase.nextHearingDate}</p>
                        </div>
                        <div className="bg-black/50 p-4 rounded-xl border border-zinc-850">
                          <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Chronicle entries</p>
                          <p className="text-sm font-black text-amber-500 mt-0.5">{selectedCase.hearings?.length || 0}</p>
                        </div>
                      </div>
                    </div>

                  <div className="p-6 lg:p-10 space-y-12">
                    {/* Add hearing list for specific file */}
                    <div className="bg-zinc-800/40 p-5 lg:p-8 rounded-[2rem] border border-dashed border-zinc-700">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Chronology record Log
                      </h4>

                      <form onSubmit={handleAddHearing} className="grid md:grid-cols-3 gap-5">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-zinc-500">Hearing Date</label>
                          <input required type="date" max={today} value={newHearing.date} onClick={(e) => (e.target as any).showPicker?.()} onChange={(e) => setNewHearing({...newHearing, date: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white [color-scheme:dark]" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-amber-500 font-bold">Next Date Draft</label>
                          <input required type="date" min={today} value={newHearing.nextHearingDate} onClick={(e) => (e.target as any).showPicker?.()} onChange={(e) => setNewHearing({...newHearing, nextHearingDate: e.target.value})} className="w-full bg-black border border-amber-500/20 rounded-xl px-3 py-2.5 text-xs text-white [color-scheme:dark]" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-zinc-500">Purpose tag</label>
                          <input type="text" placeholder="e.g. Evidence" value={newHearing.purpose} onChange={(e) => setNewHearing({...newHearing, purpose: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase text-zinc-500">Upload Order Sheet (PDF/JPG)</label>
                          <input type="file" accept="image/*,application/pdf" id="hearing-file-spec" onChange={(e) => handleFileUpload(e, (url) => setNewHearing({...newHearing, orderSheetUrl: url}), (name) => setUploadedHearingFileName(name))} className="hidden" />
                          <label htmlFor="hearing-file-spec" className={`w-full flex items-center justify-between bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-xs cursor-pointer hover:border-amber-500/30 transition-all ${newHearing.orderSheetUrl ? 'border-amber-500/50 bg-amber-500/5' : ''}`}>
                            <span className="truncate text-zinc-400">
                             {isUploading ? 'Uploading...' : newHearing.orderSheetUrl ? 'Sheet uploaded' : 'Select order attachment'}
                            </span>
                          </label>
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[9px] font-black uppercase text-zinc-500">Hearing Transcript Summary</label>
                          <input required type="text" placeholder="Record brief notes on today's court arguments..." value={newHearing.proceedings} onChange={(e) => setNewHearing({...newHearing, proceedings: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white" />
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                           <button type="submit" disabled={isSaving || isUploading} className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-black rounded-lg hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1 cursor-pointer">
                              <Save className="w-3.5 h-3.5" /> Commit Entry
                           </button>
                        </div>
                      </form>
                    </div>

                    {/* Metadata Overviews */}
                    <div className="grid md:grid-cols-2 gap-8 border-b border-zinc-850 pb-8">
                      <div className="space-y-4">
                         <div className="flex gap-3">
                           <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                             <Building2 className="w-5 h-5" />
                           </div>
                           <div>
                             <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Presiding officer & Court</p>
                             <p className="text-xs font-bold text-white uppercase">{selectedCase.judgeName}</p>
                             <span className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest block mt-0.5">{selectedCase.courtName}</span>
                           </div>
                         </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-4 bg-black/40 rounded-xl border border-zinc-850">
                           <img src={getCounselImage(selectedCase.counselName)} alt={selectedCase.counselName} className="w-10 h-10 rounded-full object-cover border border-zinc-800" referrerPolicy="no-referrer" />
                           <div className="min-w-0">
                             <p className="text-[8px] font-black text-zinc-500 uppercase tracking-wider">Lead Counsel in charge</p>
                             <p className="text-xs font-bold text-white truncate uppercase">{selectedCase.counselName}</p>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Hearings history log */}
                    <div>
                      <h3 className="text-base font-serif font-bold text-white mb-6">Historical Chronology Logs</h3>
                      <div className="relative space-y-6">
                        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-805" />
                        
                        {selectedCase.hearings && selectedCase.hearings.length > 0 ? 
                          [...selectedCase.hearings].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((h, idx) => (
                            <div key={idx} className="relative flex gap-4 text-left">
                              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 shrink-0 flex items-center justify-center text-amber-500 shadow-sm relative z-10">
                                <Clock className="w-3.5 h-3.5" />
                              </div>
                              <div className="bg-black/50 p-4 rounded-xl border border-zinc-850 flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-black text-amber-500">{h.date}</span>
                                  <div className="flex items-center gap-3">
                                    {h.orderSheetUrl && (
                                      <button 
                                        onClick={() => openOrDownloadFile(h.orderSheetUrl || '', `${h.caseNo || 'hearing'}_order_${h.date}`)}
                                        className="text-[9px] font-black uppercase text-amber-500 hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none appearance-none"
                                      >
                                        <FileText className="w-3 h-3" /> View Sheet
                                      </button>
                                    )}
                                    <button 
                                      onClick={() => handleDeleteHearing(h)}
                                      className="text-[9px] font-black uppercase text-red-500 hover:text-red-400 flex items-center gap-1 cursor-pointer bg-transparent border-none appearance-none hover:underline"
                                      title="Delete Hearing Record"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                  </div>
                                </div>
                                <p className="text-white/60 text-xs leading-relaxed">{h.proceedings}</p>
                              </div>
                            </div>
                          ))
                        : (
                          <p className="text-xs text-white/30 italic">No previous hearing records compiled.</p>
                        )}
                      </div>
                    </div>

                    {/* Case Secure Documents Vault */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 space-y-6" id="admin-case-vault-section">
                      <div className="flex items-center gap-2">
                        <FileBox className="w-5 h-5 text-amber-500" />
                        <h3 className="text-xs font-black text-white uppercase tracking-wider">Dynamic Case Documents Vault ({uploadedDocs.length})</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 items-start">
                        {/* List of currently uploaded files */}
                        <div className="space-y-3 font-sans">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-2">Vault Stored Records</h4>
                          
                          {uploadedDocs.length > 0 ? (
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                              {uploadedDocs.map((doc) => (
                                <div 
                                  key={doc.id}
                                  className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-xl border border-zinc-850 hover:border-amber-500/25 transition-all min-w-0"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 bg-zinc-800 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                                      <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="text-left min-w-0">
                                      <span className="text-white font-bold text-xs block truncate max-w-[130px] sm:max-w-[180px]">{doc.fileName}</span>
                                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Admin Archive</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button 
                                      onClick={() => openOrDownloadFile(doc.fileUrl, doc.fileName)}
                                      className="text-[9px] font-black uppercase text-amber-500 font-extrabold hover:underline select-none bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 py-1.5 px-3 rounded-lg cursor-pointer transition-all"
                                    >
                                      View
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteDocument(doc.id, doc.fileUrl)}
                                      className="text-[9px] font-black uppercase text-red-500 font-extrabold hover:bg-red-500/10 border border-red-500/20 py-1.5 px-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-center"
                                      title="Delete Document"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-white/30 italic bg-black/40 p-5 rounded-2xl border border-dashed border-zinc-850 text-center">
                              No documents yet transmitted. Deliver files via the uploader widget.
                            </p>
                          )}
                        </div>

                        {/* Uploader section */}
                        <div>
                          {selectedCase.id && <DocumentUploader caseId={selectedCase.id} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <motion.div 
                  key="list-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex bg-zinc-900 border border-zinc-800 rounded-2xl items-center px-4 py-2.5 shadow-inner">
                    <Search className="w-5 h-5 text-zinc-500 shrink-0 mr-3" />
                    <input 
                      type="text" 
                      placeholder="Search legal files via Title, Client ID or Case Number..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none placeholder:text-zinc-650 text-white"
                    />
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                    </div>
                  ) : filteredCases.length === 0 ? (
                    <div className="bg-zinc-900 p-12 text-center border border-zinc-800 rounded-3xl">
                      <Gavel className="w-12 h-12 text-zinc-550 mx-auto mb-4" />
                      <h4 className="text-base font-serif font-bold text-white mb-1">No Case Records Found</h4>
                      <p className="text-xs text-white/30 max-w-xs mx-auto">Verify search filters or initialize the database with a first record entry.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredCases.map((c) => (
                        <div 
                          key={c.id} 
                          onClick={() => { if(c.id) { setSelectedCaseId(c.id); setShowPassword(false); } }}
                          className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 hover:border-amber-500/25 transition-all text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer group"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono font-black text-amber-500/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-wider">{c.caseNo}</span>
                            <h3 className="text-base font-bold text-white uppercase mt-2 group-hover:text-amber-500 transition-colors truncate max-w-sm md:max-w-md">{c.caseTitle}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-white/40 font-semibold select-all">
                              <span>Client: <span className="text-white/60 font-medium">{c.clientId}</span></span>
                              <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                              <span>Counsel: <span className="text-white/60 font-medium">{c.counselName}</span></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-stretch md:self-auto justify-end border-t border-zinc-800/40 pt-4 md:border-0 md:pt-0">
                            <div className="text-right hidden sm:block mr-2 select-none">
                              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest block">Next Hearing</span>
                              <span className="text-xs font-black text-white block mt-0.5">{c.nextHearingDate || 'Unscheduled'}</span>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); if(c.id) handleDeleteCase(c.id, c.clientId); }}
                              className="p-2 bg-black hover:bg-red-500 hover:text-white rounded-lg border border-zinc-850 text-white/40 transition-colors cursor-pointer"
                              title="Delete file permanently"
                            >
                              <Plus className="w-4 h-4 rotate-45" />
                            </button>
                            <div className="p-2.5 bg-zinc-800 rounded-xl group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-black text-zinc-500 transition-all">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <footer className="bg-black border-t border-zinc-900 py-6 text-center text-white/30 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JUS & LAY Administration. Strictly confidential access key protocols active.</p>
        </div>
      </footer>

      {/* Custom Deletion Confirmation Modal with Double Warning */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-zinc-900 flex items-center gap-3 bg-red-950/20">
              <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
              <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wide">
                {deleteConfirm.step === 1 ? '⚠️ Confirm Deletion' : '🛑 Critical Confirmation'}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {deleteConfirm.step === 1 ? (
                <>
                  <p className="text-zinc-300 text-sm leading-relaxed text-left">
                    Are you sure you want to delete this <strong className="text-white capitalize">{deleteConfirm.type}</strong>? This action cannot be undone.
                  </p>
                  <p className="text-zinc-500 text-xs italic bg-zinc-900/50 p-3 rounded-lg border border-zinc-900 text-left">
                    {deleteConfirm.type === 'case' && "All hearings and documents under this case file will remain in database but the master case file will be removed permanently."}
                    {deleteConfirm.type === 'hearing' && "The selected hearing record and its associated proceedings data will be permanently removed."}
                    {deleteConfirm.type === 'document' && "The document record and its underlying physical file in secure storage will be deleted."}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-red-400 font-bold text-sm leading-relaxed uppercase tracking-wider text-left">
                    ⚠️ PLEASE CONFIRM ONCE MORE!
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed text-left">
                    You are about to permanently delete this {deleteConfirm.type}. There is NO recycle bin or undo option. Please click the button below only if you are absolutely certain.
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 bg-zinc-900/40 border-t border-zinc-900 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              {deleteConfirm.step === 1 ? (
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(prev => prev ? { ...prev, step: 2 } : null)}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  Proceed to Step 2
                </button>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    const { type, id, secondaryId, data } = deleteConfirm;
                    setDeleteConfirm(null);
                    if (type === 'case') {
                      await handleDeleteCase(id, secondaryId || '', true);
                    } else if (type === 'document') {
                      await handleDeleteDocument(id, secondaryId, true);
                    } else if (type === 'hearing') {
                      await handleDeleteHearing(data, true);
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-lg shadow-red-900/20"
                >
                  Yes, Permanently Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Calendar Component
function CalendarSection({ cases, currentMonth, setCurrentMonth, onDateClick }: { 
  cases: Case[], 
  currentMonth: Date, 
  setCurrentMonth: (d: Date) => void,
  onDateClick: (h: Hearing[]) => void
}) {
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 0).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const numDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const hearingMap: Record<string, Hearing[]> = {};
  
  cases.forEach(c => {
    if (c.nextHearingDate) {
      if (!hearingMap[c.nextHearingDate]) hearingMap[c.nextHearingDate] = [];
      hearingMap[c.nextHearingDate].push({
        date: c.nextHearingDate,
        proceedings: 'Scheduled Upcoming Court Session',
        caseTitle: c.caseTitle,
        caseNo: c.caseNo,
        caseId: c.id
      });
    }
    if (c.hearings) {
      c.hearings.forEach(h => {
        if (!hearingMap[h.date]) hearingMap[h.date] = [];
        hearingMap[h.date].push({
          ...h,
          caseTitle: c.caseTitle,
          caseNo: c.caseNo,
          caseId: c.id
        });
      });
    }
  });

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 sm:h-28 border-b border-r border-zinc-800 bg-zinc-900/10" />);
  }
  
  for (let d = 1; d <= numDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayHearings = hearingMap[dateStr] || [];
    const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();

    days.push(
      <div 
        key={d} 
        onClick={() => dayHearings.length > 0 && onDateClick(dayHearings)}
        className={`h-24 sm:h-28 border-b border-r border-zinc-800 p-2 sm:p-2.5 transition-all relative ${dayHearings.length > 0 ? 'cursor-pointer hover:bg-amber-500/5' : ''} ${isToday ? 'bg-amber-500/5' : ''}`}
      >
        <div className="flex justify-between items-start">
          <span className={`text-xs font-bold ${isToday ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black w-4 h-4 rounded-full flex items-center justify-center' : 'text-zinc-500'}`}>
            {d}
          </span>
          {dayHearings.length > 0 && (
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-sm" />
          )}
        </div>
        
        <div className="mt-1 space-y-0.5 overflow-hidden">
          {dayHearings.slice(0, 1).map((h, i) => (
            <div key={i} className="text-[8px] font-black text-black bg-gradient-to-r from-amber-500 to-yellow-500 border border-amber-500/20 rounded px-1.5 py-0.5 truncate shadow-sm uppercase">
              {h.caseTitle}
            </div>
          ))}
          {dayHearings.length > 1 && (
            <div className="text-[7px] font-black text-amber-500 px-1">
              + {dayHearings.length - 1} MORE
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-5 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-800 text-amber-500 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-white m-0">{monthNames[month]} {year}</h2>
            <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Record Calendar</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={prevMonth} className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800 text-zinc-400 hover:text-amber-500 cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={() => setCurrentMonth(new Date())} className="px-3 py-1.5 text-[10px] font-black text-white hover:text-amber-500 hover:bg-zinc-800 rounded-lg transition-colors uppercase tracking-widest cursor-pointer">Today</button>
          <button onClick={nextMonth} className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-800 text-zinc-400 hover:text-amber-500 cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 bg-black border-b border-zinc-800">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="py-2.5 text-center text-[9px] font-black text-zinc-500 tracking-widest">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 border-l border-zinc-800">
        {days}
      </div>
    </div>
  );
}
