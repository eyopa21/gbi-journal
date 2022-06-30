// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCsjTkGN_f0pw9rWj3uTpvRdLY2REpal6s",
    authDomain: "gbi-journal.firebaseapp.com",
    projectId: "gbi-journal",
    storageBucket: "gbi-journal.appspot.com",
    messagingSenderId: "446089395947",
    appId: "1:446089395947:web:af29d0f5b0694cd2e288ae",
    measurementId: "G-3BYRMR0PGW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let firebaseAuth = getAuth(app);
let firebaseDb = getDatabase(app);
let storage = getStorage(app);
let fireStore = getFirestore(app);



export { firebaseAuth, firebaseDb, storage, fireStore }