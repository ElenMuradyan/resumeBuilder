import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "jira-f512c.firebaseapp.com",
  databaseURL: "https://jira-f512c-default-rtdb.firebaseio.com",
  projectId: "jira-f512c",
  storageBucket: "jira-f512c.appspot.com",
  messagingSenderId: "790675547152",
  appId: "1:790675547152:web:afd2e26520c46257695695",
  measurementId: "G-YPFTVJ7YFM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export{
    db,
    auth,
    storage
};