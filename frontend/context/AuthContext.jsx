import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // Register new farmer
  const register = async ({ email, password, name, village, phone, farmSize, mainCrop }) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });

    // Save extra farmer data to Firestore
    await setDoc(doc(db, 'farmers', result.user.uid), {
      name,
      email,
      village,
      phone,
      farmSize,
      mainCrop,
      createdAt: serverTimestamp(),
    });

    return result;
  };

  // Login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logout = () => signOut(auth);

  // Fetch farmer profile from Firestore
  const fetchProfile = async (uid) => {
    try {
      const snap = await getDoc(doc(db, 'farmers', uid));
      if (snap.exists()) setFarmerProfile(snap.data());
      setDbConnected(true);
    } catch (err) {
      console.error("Profile Fetch Error:", err);
      setDbConnected(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) fetchProfile(user.uid);
      else setFarmerProfile(null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, farmerProfile, register, login, logout, loading, dbConnected }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
