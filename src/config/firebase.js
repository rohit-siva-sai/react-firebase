// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9jyP1Dbh9jwvyAIiI7J81zifro4liUxs",
  authDomain: "fir-course-7ad7d.firebaseapp.com",
  projectId: "fir-course-7ad7d",
  storageBucket: "fir-course-7ad7d.appspot.com",
  messagingSenderId: "329103474306",
  appId: "1:329103474306:web:f1c6462781bb1608777e9b",
  measurementId: "G-F2HQT9FQZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)