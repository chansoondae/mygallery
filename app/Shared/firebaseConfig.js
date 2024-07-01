// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7EUpfXy8UGL4DD7RpxwEa_CRxMyjae8o",
  authDomain: "artfriends-366fa.firebaseapp.com",
  projectId: "artfriends-366fa",
  storageBucket: "artfriends-366fa.appspot.com",
  messagingSenderId: "81465616011",
  appId: "1:81465616011:web:d33eb627f4efac316b968e",
  measurementId: "G-B2KGDKD51J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;