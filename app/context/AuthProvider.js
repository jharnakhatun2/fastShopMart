"use client";
import app from "@/firebase";
import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const createUser = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        return updateProfile(result.user, name).then(() => result);
      }
    );
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google signIn
  const googleSignIn = (provider) => {
    return signInWithPopup(auth, provider);
  };

  //Facebook signIn
  const facebookSignIn = (provider) => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  //set Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User Observing", currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    logIn,
    googleSignIn,
    facebookSignIn,
    user,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
