import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  UploadTask 
} from 'firebase/storage';
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  X,
  FileCheck2,
  Lock
} from 'lucide-react';
import { auth, db, storage, handleFirestoreError, OperationType } from '../lib/firebase';

interface DocumentUploaderProps {
  caseId: string;
  onUploadSuccess?: (metadata: { id: string; fileName: string; fileUrl: string; caseId: string }) => void;
  onUploadError?: (errorMsg: string) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  caseId,
  onUploadSuccess,
  onUploadError
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const uploadTaskRef = useRef<UploadTask | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = auth.currentUser;

  // Validation constants
  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const validateFile = (selectedFile: File): string | null => {
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      return 'Incorrect file format. Only PDF, JPEG, and PNG files are permitted.';
    }
    if (selectedFile.size > MAX_SIZE_BYTES) {
      return `File reaches beyond our limit. Maximum file size is ${MAX_SIZE_MB}MB.`;
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const error = validateFile(selected);
    if (error) {
      setStatus('error');
      setErrorMsg(error);
      setFile(null);
      if (onUploadError) onUploadError(error);
      return;
    }

    setFile(selected);
    setStatus('idle');
    setErrorMsg('');
    setProgress(0);
  };

  const startUpload = async () => {
    if (!file || !caseId) return;

    if (!currentUser) {
      const authErr = "Unauthorized: You must be signed in to upload documents.";
      setStatus('error');
      setErrorMsg(authErr);
      if (onUploadError) onUploadError(authErr);
      return;
    }

    setStatus('uploading');
    setProgress(0);
    setErrorMsg('');

    const storagePath = `cases/${caseId}/documents/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const metadata = {
      contentType: file.type,
      customMetadata: {
        uploadedBy: currentUser.uid,
        caseId: caseId
      }
    };

    // Use uploadBytesResumable to track progress
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTaskRef.current = uploadTask;

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (error) => {
        console.error("Firebase Storage Upload Failed:", error);
        let message = 'Upload failed. Please ensure Firebase Storage is configured and you have permission to write to this path.';
        
        if (error.code === 'storage/unauthorized') {
          message = 'Access Denied: You do not have permissions to upload documents to this case path.';
        } else if (error.code === 'storage/canceled') {
          message = 'Upload was canceled successfully.';
        } else if (error.code === 'storage/unknown') {
          message = 'An unknown system error occurred during storage upload.';
        }

        setStatus('error');
        setErrorMsg(message);
        if (onUploadError) onUploadError(message);
      },
      async () => {
        try {
          // Retrieve download URL
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

          // Build metadata document to save in Firestore /documents
          const docMetadata = {
            fileName: file.name,
            fileUrl: downloadUrl,
            fileType: file.type,
            caseId: caseId,
            uploadedBy: currentUser.uid,
            createdAt: serverTimestamp()
          };

          const path = 'documents';
          try {
            const docRef = await addDoc(collection(db, path), docMetadata);
            setStatus('success');
            setProgress(100);
            setFile(null);
            
            if (onUploadSuccess) {
              onUploadSuccess({
                id: docRef.id,
                fileName: file.name,
                fileUrl: downloadUrl,
                caseId: caseId
              });
            }
          } catch (fsError) {
            // Under firestore-integration guideline, handle Firestore operation failures
            handleFirestoreError(fsError, OperationType.CREATE, path);
          }
        } catch (err: any) {
          console.error("Error finalizing uploaded document:", err);
          const message = typeof err === 'object' && err?.message ? err.message : 'Error syncing file information with the database.';
          setStatus('error');
          setErrorMsg(message);
          if (onUploadError) onUploadError(message);
        }
      }
    );
  };

  const cancelUpload = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.cancel();
      setStatus('idle');
      setFile(null);
      setProgress(0);
    }
  };

  const triggerSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    const error = validateFile(droppedFile);
    if (error) {
      setStatus('error');
      setErrorMsg(error);
      setFile(null);
      if (onUploadError) onUploadError(error);
      return;
    }

    setFile(droppedFile);
    setStatus('idle');
    setErrorMsg('');
    setProgress(0);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden" id="document-uploader-root">
      
      {/* Header section with Law Conglomerate aesthetic */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-amber-500" />
          <h4 className="text-white font-bold text-sm tracking-wide uppercase">Secure Document Vault</h4>
        </div>
        {!currentUser && (
          <span className="flex items-center gap-1.5 text-[10px] text-red-400 bg-red-950/40 border border-red-900/40 px-2 py-0.5 rounded-full font-bold uppercase">
            <Lock className="w-3 h-3" /> Locked
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* If user is not authenticated, show elegant warning overlay */}
        {!currentUser ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <AlertCircle className="w-12 h-12 text-zinc-500 mb-3" />
            <p className="text-zinc-400 text-xs leading-relaxed max-w-xs font-medium">
              You must be logged in as an authorized legal representative or client to transmit files into the Case Dossier.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Main upload drag/drop zone */}
            {status !== 'uploading' && status !== 'success' && (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerSelect}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                  isDragOver 
                    ? 'border-amber-500 bg-amber-500/5' 
                    : file 
                      ? 'border-emerald-500/40 bg-emerald-500/5' 
                      : 'border-zinc-800 hover:border-zinc-700 bg-black/40'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,image/jpeg,image/png" 
                  className="hidden" 
                />

                {file ? (
                  <>
                    <FileText className="w-12 h-12 text-emerald-500 mb-3 animate-pulse" />
                    <span className="text-xs text-white font-medium text-center truncate max-w-xs block mb-1">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setStatus('idle');
                      }}
                      className="mt-3 text-[10px] text-zinc-500 hover:text-white uppercase tracking-wider font-bold transition-colors"
                    >
                      Remove File
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-zinc-500 mb-3 group-hover:text-amber-500 transition-colors" />
                    <span className="text-xs text-zinc-300 font-bold h-fit mb-1 text-center">
                      Drag & Drop Document
                    </span>
                    <span className="text-[10px] text-zinc-500 text-center max-w-xs leading-relaxed">
                      Select or drop PDF, JPEG, or PNG up to 10MB
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Custom real-time upload progress view */}
            {status === 'uploading' && (
              <div className="space-y-4 py-4 bg-zinc-950/60 border border-zinc-850 rounded-xl p-5" id="uploader-progress-block">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-505" />
                    <span className="text-zinc-300 font-medium truncate max-w-xs">Uploading {file?.name}</span>
                  </div>
                  <span className="text-amber-500 font-black tracking-wider font-mono">{progress}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-850">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Resumable Stream</span>
                  <button 
                    onClick={cancelUpload}
                    className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300 uppercase tracking-wider font-extrabold transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Success state notifier */}
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-5 flex flex-col items-center text-center space-y-2.5"
                id="uploader-success-block"
              >
                <CheckCircle className="w-12 h-12 text-emerald-505" />
                <div>
                  <h5 className="text-white text-xs font-black uppercase tracking-wider">Document Deposited Successfully</h5>
                  <p className="text-zinc-400 text-[11px] leading-relaxed mt-1">
                    The file has been archived and recorded in the database.
                  </p>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Upload New File
                </button>
              </motion.div>
            )}

            {/* Error notifications */}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-950/30 border border-red-500/20 rounded-xl p-5 flex flex-col items-center text-center space-y-2.5"
                id="uploader-error-block"
              >
                <XCircle className="w-12 h-12 text-red-500" />
                <div className="max-w-xs">
                  <h5 className="text-white text-xs font-black uppercase tracking-wider">Upload Transmission Denied</h5>
                  <p className="text-zinc-400 text-[11px] leading-relaxed mt-1" id="error-message-detail">
                    {errorMsg}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setStatus('idle');
                    setFile(null);
                  }}
                  className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {/* Action buttons (Transmit) */}
            {file && status === 'idle' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={startUpload}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/5 col-span-2"
              >
                <Upload className="w-4 h-4 shrink-0" /> Transmit Document to Vault
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
