// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd76Er-7Bx5yoPfsCe-r-5SF7WeoGJ6VY",
  authDomain: "smart-village-ai.firebaseapp.com",
  projectId: "smart-village-ai",
  storageBucket: "smart-village-ai.firebasestorage.app",
  messagingSenderId: "38570669009",
  appId: "1:38570669009:web:5b0397d901a1523e4ea6f0",
  measurementId: "G-R81NLQYQSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
