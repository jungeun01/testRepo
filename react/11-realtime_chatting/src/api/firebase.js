import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoVCEZJaQaVc_XIeMJL-LKlQRV0-AQiZM",
  authDomain: "chatting-b687e.firebaseapp.com",
  projectId: "chatting-b687e",
  storageBucket: "chatting-b687e.appspot.com",
  messagingSenderId: "581883350748",
  appId: "1:581883350748:web:03ecce9848e4f83c4e2e19",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}
export { getUserAuth };
