import  { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyDX5jiS-lrq-i30kQPbWoU7nHShM43LhNY",
  authDomain: "postsandchatsapp.firebaseapp.com",
  projectId: "postsandchatsapp",
  storageBucket: "postsandchatsapp.appspot.com",
  messagingSenderId: "1014385980849",
  appId: "1:1014385980849:web:f06aceffd2e97fa7e7f990"
};



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);