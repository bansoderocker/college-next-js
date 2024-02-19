// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsBYzYbs6HMipDh3lO-8vCIVnK9whpXIg",
  authDomain: "college-project-f82eb.firebaseapp.com",
  databaseURL: "https://college-project-f82eb-default-rtdb.firebaseio.com",
  projectId: "college-project-f82eb",
  storageBucket: "college-project-f82eb.appspot.com",
  messagingSenderId: "540604545516",
  appId: "1:540604545516:web:bc3fadef7202c185dde8c9",
  measurementId: "G-Q7T0T9PS9R",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, firebaseConfig, auth, database, storage };
