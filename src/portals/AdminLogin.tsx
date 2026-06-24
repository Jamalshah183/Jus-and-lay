import React, { useState } from 'react';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Lock, ArrowRight, Loader2, AlertCircle, Scale } from 'lucide-react';

interface AdminLoginProps {
  setView: (view: 'main' | 'admin-login' | 'admin-portal' | 'client-login' | 'client-portal') => void;
}

export default function AdminLogin({ setView }: AdminLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Strict check for admin email and provider
      const admins = ['juslay3@gmail.com', 'jamalshah183@gmail.com', 'lawyer.ay26@gmail.com'];
      const userEmail = user.email?.toLowerCase();
      
      if (userEmail && admins.includes(userEmail) && user.providerData.some(p => p.providerId === 'google.com')) {
        localStorage.setItem('session_start_time', Date.now().toString());
        setView('admin-portal');
      } else {
        await auth.signOut();
        setError('Unauthorized access. Only authorized admin accounts via Google are allowed.');
      }
    } catch (err) {
      const errorObj = err as { code?: string; message?: string };
      console.error('Login error:', err);
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
      
      if (errorObj.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups for this site and try again.');
      } else if (errorObj.code === 'auth/unauthorized-domain') {
        setError(`Domain ${currentHost} is not authorized. Please add it to Authorized Domains in Firebase Console > Authentication > Settings. Also try opening the app in a new tab.`);
      } else if (errorObj.code === 'auth/cancelled-popup-request') {
        setError('Sign-in was cancelled.');
      } else {
        setError(errorObj.message || 'Failed to authenticate. Please check your internet and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-emerald-600 selection:text-white">
      {/* Mini Portal Header */}
      <header className="border-b border-slate-200 bg-white py-4 px-6 sticky top-0 z-50 shadow-sm shadow-slate-100/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setView('main')} className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition-colors cursor-pointer bg-transparent border-0">
            <Scale className="w-5 h-5 text-emerald-600" />
            <span className="font-serif font-bold text-lg text-slate-900">Jus & Lay Admin Gate</span>
          </button>
          <button 
            onClick={() => setView('main')}
            className="text-slate-600 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-transparent border-0"
          >
            ← Return to Website
          </button>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center px-4 py-20 bg-radial-gradient">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 p-8 text-center text-slate-800 relative">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md border border-slate-150 overflow-hidden relative">
                  <Scale className="w-8 h-8 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-slate-800 tracking-tight">Admin Gate</h1>
                <p className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Restricted Access Only</p>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-250 rounded-2xl flex gap-3 text-red-850 text-sm font-medium"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  {error}
                </motion.div>
              )}

              <div className="space-y-6">
                <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100 italic text-slate-500 text-sm text-center">
                  &quot;Authenticating via secure Google Single Sign-On.&quot;
                </div>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <p className="text-[9px] text-slate-400 mb-2 uppercase font-bold">Trouble signing in?</p>
                  <button 
                    onClick={() => {
                      try {
                        window.open(window.location.href, '_blank');
                      } catch (err) {
                        console.warn("Failed to open tab:", err);
                        // fallback
                        const link = document.createElement('a');
                        link.href = window.location.href;
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }
                    }}
                    className="w-full text-xs text-emerald-600 font-bold hover:underline cursor-pointer bg-transparent border-0"
                  >
                    Open Admin Login in New Tab
                  </button>
                </div>

                <motion.button
                  onClick={handleAdminLogin}
                  disabled={isLoading}
                  whileHover={{ scale: 1.01, y: -0.5 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 cursor-pointer border-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Sign In as Administrator
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>

                <button 
                  onClick={() => setView('client-login')}
                  className="w-full text-slate-400 hover:text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] transition-colors py-2 cursor-pointer bg-transparent border-0"
                >
                  Return to Client Portal
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Law Firm Security</span>
          </div>
        </motion.div>
      </div>

      {/* Mini Portal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JUS & LAY Admin Portal. All Rights Reserved. Protected under Secure SSL protocols.</p>
        </div>
      </footer>
    </div>
  );
}
