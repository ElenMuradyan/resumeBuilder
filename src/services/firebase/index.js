import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS_iGhJnzlDOV8Ps9-UlG3fVKHFQPgksI",
  authDomain: "resumebuilder-8858e.firebaseapp.com",
  projectId: "resumebuilder-8858e",
  storageBucket: "resumebuilder-8858e.firebasestorage.app",
  messagingSenderId: "784508325514",
  appId: "1:784508325514:web:79c0cd001b932240e5e773",
  measurementId: "G-5T6Q3202WR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{
    auth,
    db
}