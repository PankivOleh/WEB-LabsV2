// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7tdllWtZ_rhcYMYm-aFwgyH1s5QE7_J0",
  authDomain: "startup-simulator-e09c9.firebaseapp.com",
  projectId: "startup-simulator-e09c9",
  storageBucket: "startup-simulator-e09c9.firebasestorage.app",
  messagingSenderId: "637575187134",
  appId: "1:637575187134:web:e6db62b4b8c76a59a02cef",
  measurementId: "G-M2H7YTGFLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);