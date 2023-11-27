import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA264MX8WqW39TST5JUER9_U5Rtj52CHu0",
  authDomain: "chat-84fb4.firebaseapp.com",
  projectId: "chat-84fb4",
  storageBucket: "chat-84fb4.appspot.com",
  messagingSenderId: "733838941547",
  appId: "1:733838941547:web:c0e06294409459496fc02e"
};
  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()