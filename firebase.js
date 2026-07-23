// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA9apY7hEtT47L-5oJ3mDOrMMabIXK0f0E",
  authDomain: "puppies-home.firebaseapp.com",
  projectId: "puppies-home",
  storageBucket: "puppies-home.firebasestorage.app",
  messagingSenderId: "45864845436",
  appId: "1:45864845436:web:187ba9819e68aa977a49f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
const auth = getAuth(app);

// Firestore
const db = getFirestore(app);

// Export
export { auth, db };
