// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "rblo-8ce03.firebaseapp.com", //penser a le mettre dans env
  projectId: "rblo-8ce03",
  storageBucket: "rblo-8ce03.appspot.com",
  messagingSenderId: "1040345651337",
  appId: "1:1040345651337:web:a41398553d0c1f41d18e58",
  measurementId: "G-EF58SQ0297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);