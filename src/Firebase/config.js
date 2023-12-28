// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA76EHHNG2HIsVRMCmOLxGd54XB-m3tp0k",
  authDomain: "twitter-x-project.firebaseapp.com",
  projectId: "twitter-x-project",
  storageBucket: "twitter-x-project.appspot.com",
  messagingSenderId: "935351351888",
  appId: "1:935351351888:web:eb5f3b94ce9b06fd5fef55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth referansı
export const auth = getAuth(app);
//provider referansı al
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
