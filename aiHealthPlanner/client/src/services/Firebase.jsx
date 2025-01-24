// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAl0fA5i9wC_h361aVWGNK-DWadH8na80Y",
  authDomain: "yatrix-1eb78.firebaseapp.com",
  projectId: "yatrix-1eb78",
  storageBucket: "yatrix-1eb78.firebasestorage.app",
  messagingSenderId: "1009352420152",
  appId: "1:1009352420152:web:8974288f8a6b08a7f3efcd",
  measurementId: "G-8FMW7CDNE9",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
