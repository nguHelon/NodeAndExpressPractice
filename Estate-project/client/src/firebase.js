// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "estate-project-df558.firebaseapp.com",
    projectId: "estate-project-df558",
    storageBucket: "estate-project-df558.appspot.com",
    messagingSenderId: "249130795737",
    appId: "1:249130795737:web:ccd2f6d09ad1f295bff4c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);