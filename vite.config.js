import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWhU9_YsIQH1qycuqh2iN1RaCRg8v-TIA",
  authDomain: "fitmatrix-eb6e5.firebaseapp.com",
  projectId: "fitmatrix-eb6e5",
  storageBucket: "fitmatrix-eb6e5.firebasestorage.app",
  messagingSenderId: "877271131203",
  appId: "1:877271131203:web:d34645312c74dd4317e0f6",
  measurementId: "G-462N6SJV9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.error("Firebase Analytics initialization failed", error);
    });
}

export { app, analytics };

