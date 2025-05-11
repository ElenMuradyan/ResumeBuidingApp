import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgtgcrdcYVz1DGyPhe1c4259uNMecJXHw",
  authDomain: "resumebuilder-876b4.firebaseapp.com",
  projectId: "resumebuilder-876b4",
  storageBucket: "resumebuilder-876b4.firebasestorage.app",
  messagingSenderId: "356950891447",
  appId: "1:356950891447:web:5ac705fedc7333d0df6632",
  measurementId: "G-5T8S9HGN4D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth, 
    db
}