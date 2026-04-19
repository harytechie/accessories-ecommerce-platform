// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper: fetch (or create) the Firestore user document and return isAdmin
  const fetchUserDoc = async (firebaseUser) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data().isAdmin === true;
      } else {
        // First-time login — create user document
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          avatar: firebaseUser.photoURL || null,
          isAdmin: false,
          createdAt: serverTimestamp(),
        });
        return false;
      }
    } catch (err) {
      console.error('Failed to fetch user document:', err);
      return false;
    }
  };

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const adminStatus = await fetchUserDoc(firebaseUser);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          avatar: firebaseUser.photoURL || null,
        });
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login with email & password
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  // Signup with email, password, and optional display name
  const signup = async (userData) => {
    const { email, password, name } = userData;
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(result.user, { displayName: name });
    }
    // Create Firestore user document
    const userRef = doc(db, 'users', result.user.uid);
    await setDoc(userRef, {
      uid: result.user.uid,
      email: result.user.email,
      name: name || email.split('@')[0],
      avatar: null,
      isAdmin: false,
      createdAt: serverTimestamp(),
    });
    return result.user;
  };

  // Login with Google popup
  const loginWithGoogle = async () => {
    try {
      console.log("AuthContext: Starting Google login...");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("AuthContext: SUCCESS:", result.user);
      return result.user;
    } catch (error) {
      console.error("AuthContext: ERROR CODE:", error.code);
      console.error("AuthContext: ERROR MESSAGE:", error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout, isLoggedIn: !!user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
