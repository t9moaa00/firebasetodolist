import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuUC_w0xwSos0_Op8mTS6FFOPMqxqC5uQ",
  authDomain: "testi-5d65f.firebaseapp.com",
  projectId: "testi-5d65f",
  storageBucket: "testi-5d65f.appspot.com",
  messagingSenderId: "956852145813",
  appId: "1:956852145813:web:cc82cc2f1c95acc8ab159c",
  measurementId: "G-5K81XXYL76"
};

initializeApp(firebaseConfig);

const firestore = getFirestore();
const TODOS = "todos";

export {
    firestore,
    collection,
    addDoc,
    TODOS
}