import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { createOrUpdateUser } from '../firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.warn('Firebase auth initialization timeout');
      setLoading(false);
    }, 10000); // 10 second timeout

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(timeout);
      
      // Create/update user document in Firestore when user signs in
      if (user) {
        try {
          // Check if user is anonymous (guest)
          const isGuest = user.isAnonymous;
          
          await createOrUpdateUser(user.uid, {
            displayName: isGuest ? `Guest_${user.uid.substring(0, 6)}` : user.displayName,
            email: isGuest ? null : user.email,
            photoURL: isGuest ? null : user.photoURL,
            isAnonymous: isGuest,
            lastLogin: new Date().toISOString()
          });
        } catch (error) {
          console.error('Error creating user document:', error);
        }
      }
      
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div>Loading...</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Initializing Firebase</div>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
};
