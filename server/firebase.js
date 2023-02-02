const { initializeApp } = require('firebase/app');
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
const { getStorage } = require('firebase/storage');


const firebaseConfig = {
    apiKey: "AIzaSyDX5jiS-lrq-i30kQPbWoU7nHShM43LhNY",
    authDomain: "postsandchatsapp.firebaseapp.com",
    projectId: "postsandchatsapp",
    storageBucket: "postsandchatsapp.appspot.com",
    messagingSenderId: "1014385980849",
    appId: "1:1014385980849:web:f06aceffd2e97fa7e7f990"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = {
    auth,
    db,
    storage
}