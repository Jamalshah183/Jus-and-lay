import React, { useState } from 'react';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Mail, Lock, AlertCircle, Scale, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface ClientLoginProps {
  setView: (view: 'main' | 'admin-login' | 'admin-portal' | 'client-login' | 'client-portal') => void;
}

export default function ClientLogin({ setView }: ClientLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check for user document first to confirm they are a registered client
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      // Check if user has any active cases
      const q = query(
        collection(db, 'cases'),
        where('clientId', '==', user.email)
      );
      const snapshot = await getDocs(q);

      // If user exists in 'users' collection OR has a case, allow login
      if (snapshot.empty && !userDoc.exists()) {
        await signOut(auth);
        setError('Your account is not fully configured. Please contact the advocate for assistance.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('session_start_time', Date.now().toString());
      setView('client-portal');
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      let errorMessage = 'Failed to sign in. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
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
            <span className="font-serif font-bold text-lg text-slate-900">Jus & Lay Client Portal</span>
          </button>
          <button 
            onClick={() => setView('main')}
            className="text-slate-600 hover:text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-transparent border-0"
          >
            ← Return to Website
          </button>
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center p-4 py-20 bg-radial-gradient">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-8 text-center text-slate-800 relative">
              <Scale className="w-12 h-12 text-emerald-600 mx-auto mb-4 relative z-10" />
              <h1 className="text-2xl font-serif font-bold relative z-10 text-slate-800">Client Portal</h1>
              <p className="text-emerald-700 text-xs font-bold uppercase tracking-wider mt-2 relative z-10">Secure Access for Law Firm Clients</p>
            </div>

            {/* Form */}
            <div className="p-8 sm:p-10">
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-650" />
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@email.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-12 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-0 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <motion.button 
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01, y: -0.5 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-md shadow-emerald-600/15 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer transition-all border-0"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-200 text-center space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">
                    Don't have an account or lost access?
                  </p>
                  <a 
                    href="https://wa.me/923218520085" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-emerald-600 font-bold hover:text-emerald-750 transition-colors underline underline-offset-4"
                  >
                    Contact Your Advocate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mini Portal Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} JUS & LAY CRM Portal. All Rights Reserved. Protected under Advocate-Client Privilege.</p>
        </div>
      </footer>
    </div>
  );
}
