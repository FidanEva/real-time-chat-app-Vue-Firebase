import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcTfOv5WNxP7x0xLPI49uewd2RpNGsX50",
  authDomain: "realtimechatapp-f16a1.firebaseapp.com",
  projectId: "realtimechatapp-f16a1",
  storageBucket: "realtimechatapp-f16a1.firebasestorage.app",
  messagingSenderId: "395798565745",
  appId: "1:395798565745:web:ae8d81e1721e61b2de5cd0",
  measurementId: "G-P0VD5GFLBX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();