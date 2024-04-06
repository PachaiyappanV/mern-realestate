// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-3e046.firebaseapp.com",
  projectId: "mern-real-estate-3e046",
  storageBucket: "mern-real-estate-3e046.appspot.com",
  messagingSenderId: "53946029023",
  appId: "1:53946029023:web:34687deee9d1ca1574ea6a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
