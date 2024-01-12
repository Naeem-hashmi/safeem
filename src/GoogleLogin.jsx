// GoogleLogin.js
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithGoogle } from "./firebase";

const GoogleLogin = ({ onUserChange }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onUserChange(currentUser);
      } else {
        setUser(null);
        onUserChange(null);
      }
    });

    return () => unsubscribe();
  }, [onUserChange]);

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
      ) : (
        <button onClick={handleSignOut}>Logout</button>
      )}
    </div>
  );
};

export default GoogleLogin;
