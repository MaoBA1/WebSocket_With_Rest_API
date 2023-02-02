const { initializeApp } = require('firebase/app');
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
const { getStorage } = require('firebase/storage');


const firebaseConfig = {
  apiKey: "AIzaSyAlDHCzY_Trq2PE7bOIcn4XquUoH7RkQzA",
  authDomain: "theblog-bb4c5.firebaseapp.com",
  projectId: "theblog-bb4c5",
  storageBucket: "theblog-bb4c5.appspot.com",
  messagingSenderId: "281742752023",
  appId: "1:281742752023:web:bc07c40fa92b3f8aea5f52"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = [
    app,
    db,
    auth,
    storage
];