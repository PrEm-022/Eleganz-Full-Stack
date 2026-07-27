// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzLCK2dNltQMphyAaNK5PfVuXeEdRGL-k",
  authDomain: "eleganze-b904d.firebaseapp.com",
  projectId: "eleganze-b904d",
  storageBucket: "eleganze-b904d.firebasestorage.app",
  messagingSenderId: "378338212178",
  appId: "1:378338212178:web:8aff663a11a6a0b98c228b",
  measurementId: "G-FVJPVFE23B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };