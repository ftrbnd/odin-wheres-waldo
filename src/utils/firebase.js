import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA5gxavi90HRgtdVCbFAfo_QjehO12MFA",
  authDomain: "odin-wheres-waldo-2023.firebaseapp.com",
  projectId: "odin-wheres-waldo-2023",
  storageBucket: "odin-wheres-waldo-2023.appspot.com",
  messagingSenderId: "582800982601",
  appId: "1:582800982601:web:1dcbfb894c0c045b0af598",
  measurementId: "G-X84EE0ZJ16"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();