import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIqY9PY_B4ZenqMehacclgXgf3vING16M",
  authDomain: "myproject-1a08d.firebaseapp.com",
  projectId: "myproject-1a08d",
  storageBucket: "myproject-1a08d.appspot.com",
  messagingSenderId: "361775986496",
  appId: "1:361775986496:web:555d18913b2e78b437aca5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}
async function addDatas(collectionName, dataObj) {
  //문서 ID 수동
  const saveDoc = await doc(db, collectionName, 2);
  const saveResult = await setDoc(saveDoc, Object);
}
export { db, getDatas };
