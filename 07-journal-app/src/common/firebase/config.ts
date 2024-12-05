// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// https://console.firebase.google.com/u/0/?hl=es-419 para llenar las variables
const firebaseConfig = {
  apiKey: "here!",
  authDomain: "here!",
  projectId: "react-practices-d01e5",
  storageBucket: "react-practices-d01e5.firebasestorage.app",
  messagingSenderId: "here",
  appId: "here"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);