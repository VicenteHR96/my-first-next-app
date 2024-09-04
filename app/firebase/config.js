// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_c4AOF0gbGx5L8YbqZqxGHMi9iYKAaiQ",
  authDomain: "ecommercecoder-app.firebaseapp.com",
  projectId: "ecommercecoder-app",
  storageBucket: "ecommercecoder-app.appspot.com",
  messagingSenderId: "409714691452",
  appId: "1:409714691452:web:7fa9e87e5e1c6137c2a8f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
