// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNrYdceSYpiUva6V5KhQFqmUf9QPBygwY",
  authDomain: "netflixgpt120999.firebaseapp.com",
  projectId: "netflixgpt120999",
  storageBucket: "netflixgpt120999.firebasestorage.app",
  messagingSenderId: "517023964476",
  appId: "1:517023964476:web:66739d6f4bbbbbd2931239",
  measurementId: "G-NV8F5K07XM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
