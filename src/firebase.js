import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjR1ZWSsxaI2aE7IPUKUF7EBSBSBnLUoA",
  authDomain: "safeem-549e3.firebaseapp.com",
  projectId: "safeem-549e3",
  storageBucket: "safeem-549e3.appspot.com",
  messagingSenderId: "816624098113",
  appId: "1:816624098113:web:4fc3d98a1689b9c56fdfc0",
  databaseURL: "https://safeem-549e3-default-rtdb.firebaseio.com/",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Successfully signed in with Google:", user.displayName);
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }
};

// Realtime Database setup
const database = getDatabase(app);

// Export everything
export { app, auth, database, ref, push, onValue, signInWithGoogle };