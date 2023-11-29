// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtrN7vncb3LxYJWmVMfVvQbEPVdgX8HpQ",
  authDomain: "quill-image.firebaseapp.com",
  projectId: "quill-image",
  storageBucket: "quill-image.appspot.com",
  messagingSenderId: "31469850532",
  appId: "1:31469850532:web:340a6336cc7dabb9c23b31",
  measurementId: "G-1JVVCJKK15",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage();
export default app;
