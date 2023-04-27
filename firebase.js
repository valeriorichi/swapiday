import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const app = initializeApp({
  apiKey: "AIzaSyD0mpjQAJMNz8k04rPGOR-XS8aNOnKPfc0",
  authDomain: "swapiday.firebaseapp.com",
  databaseURL:
    "https://swapiday-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "swapiday",
  storageBucket: "swapiday.appspot.com",
  messagingSenderId: "141533386702",
  appId: "1:141533386702:web:cda68729625a455f793d9f",
  measurementId: "G-KXW3N69CNJ",
});

export const auth = getAuth(app);
