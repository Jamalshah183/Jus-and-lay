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
      const admins = ['juslay3@gmail.com'];
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
    <div className="min-h-screen bg-black text-white flex flex-col justify-between font-sans selection:bg-gold-500 selection:text-black">
      {/* Mini Portal Header */}
      <header className="border-b border-zinc-800 bg-[#040811] py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setView('main')} className="flex items-center gap-2 text-white/75 hover:text-white transition-colors cursor-pointer">
            <Scale className="w-5 h-5 text-gold-500" />
            <span className="font-serif font-bold text-lg">Jus & Lay Admin Gate</span>
          </button>
          <button 
            onClick={() => setView('main')}
            className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            ← Return to Website
          </button>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center px-4 py-20 bg-radial-gradient">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-zinc-900 rounded-[2.5rem] shadow-2xl shadow-amber-500/5 border border-amber-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 p-10 text-center relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <div className="relative z-10 text-black">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20 border-4 border-black overflow-hidden relative">
                  <Scale className="w-10 h-10 text-black" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-black tracking-tight">Admin Gate</h1>
                <p className="text-black/60 text-xs font-bold uppercase tracking-[0.2em] mt-2">Restricted Access Only</p>
              </div>
            </div>

            <div className="p-10">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-4 bg-zinc-800 border border-amber-500/20 rounded-2xl flex gap-3 text-white text-sm font-medium"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
                  {error}
                </motion.div>
              )}

              <div className="space-y-6">
                <div className="bg-black/50 p-6 rounded-2xl border border-zinc-800 italic text-white/50 text-sm text-center">
                  &quot;Authenticating via secure Google Single Sign-On.&quot;
                </div>

                <div className="pt-2 border-t border-zinc-850">
                  <p className="text-[8px] text-white/30 mb-2 uppercase font-black text-center">Trouble signing in?</p>
                  <button 
                    onClick={() => window.open(window.location.href, '_blank')}
                    className="w-full text-[10px] text-amber-500 font-bold hover:underline cursor-pointer"
                  >
                    Open Admin Login in New Tab
                  </button>
                </div>

                <button
                  onClick={handleAdminLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
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
                </button>

                <button 
                  onClick={() => setView('client-login')}
                  className="w-full text-white/30 text-[10px] font-black uppercase tracking-[0.2em] hover:text-amber-500 transition-colors py-2 cursor-pointer"
                >
                  Return to Client Portal
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 opacity-20 grayscale pointer-events-none">
            <div className="w-1 h-1 bg-amber-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Law Firm Security</span>
          </div>
        </motion.div>
      </div>

      {/* Mini Portal Footer */}
      <footer className="bg-black border-t border-zinc-900 py-6 text-center text-white/30 text-xs text-sans">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JUS & LAY Admin Portal. All Rights Reserved. Protected under Secure SSL protocols.</p>
        </div>
      </footer>
    </div>
  );
}
