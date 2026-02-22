import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq2fl8XWB634t0CiZLtCuxb8OT5uZMHwM",
  authDomain: "lab06-expense-d6fab.firebaseapp.com",
  projectId: "lab06-expense-d6fab",
  storageBucket: "lab06-expense-d6fab.firebasestorage.app",
  messagingSenderId: "132277135541",
  appId: "1:132277135541:web:3126d50454cfafd571f6fc",
  measurementId: "G-V50QYVQPB5"
};

export const app = initializeApp(firebaseConfig);   
export const db = getFirestore(app);               