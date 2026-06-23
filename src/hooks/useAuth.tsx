import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        // If logged in, ensure we have a login timestamp
        const now = Date.now().toString();
        const storedLoginTime = localStorage.getItem('session_start_time');
        if (!storedLoginTime) {
          localStorage.setItem('session_start_time', now);
        }
        // Initialize activity time
        localStorage.setItem('last_activity_time', now);
      } else {
        // Clear session on logout
        localStorage.removeItem('session_start_time');
        localStorage.removeItem('last_activity_time');
      }
    });

    return () => unsubscribe();
  }, []);

  // Activity tracking and periodic session expiry check
  useEffect(() => {
    if (!user) return;

    // Update last activity time
    const updateActivity = () => {
      localStorage.setItem('last_activity_time', Date.now().toString());
    };

    // Events to track activity
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.addEventListener(event, updateActivity);
    });

    const checkSession = () => {
      const now = Date.now();
      
      // 1. Fixed Session Expiry (e.g., 1 hour)
      const sessionStart = localStorage.getItem('session_start_time');
      if (sessionStart) {
        const startTime = parseInt(sessionStart);
        const oneHour = 60 * 60 * 1000;
        if (now - startTime > oneHour) {
          console.log("Total session duration exceeded. Signing out...");
          auth.signOut();
          localStorage.removeItem('session_start_time');
          localStorage.removeItem('last_activity_time');
          return;
        }
      }

      // 2. Idle Timeout (2 minutes)
      const lastActivity = localStorage.getItem('last_activity_time');
      if (lastActivity) {
        const activityTime = parseInt(lastActivity);
        const twoMinutes = 2 * 60 * 1000;
        
        if (now - activityTime > twoMinutes) {
          console.log("Inactivity limit reached. Signing out...");
          auth.signOut();
          localStorage.removeItem('session_start_time');
          localStorage.removeItem('last_activity_time');
        }
      }
    };

    // Check every 10 seconds
    const interval = setInterval(checkSession, 10000);

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateActivity);
      });
      clearInterval(interval);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
