import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAIqY9PY_B4ZenqMehacclgXgf3vING16M",
  authDomain: "myproject-1a08d.firebaseapp.com",
  projectId: "myproject-1a08d",
  storageBucket: "myproject-1a08d.appspot.com",
  messagingSenderId: "361775986496",
  appId: "1:361775986496:web:555d18913b2e78b437aca5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  // 문서 ID 수동

  try {
    //   const saveDoc = await doc(db, collectionName, "3");
    //   console.log(`doc() 결과: ${saveDoc}`);
    //   const saveResult = await setDoc(saveDoc, dataObj);
    //   console.log(`setDoc() 결과: ${saveResult}`);
    //   return true;
    // } catch (error) {
    //   return false;

    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    return fales;
  }
}

export { db, getDatas, addDatas };
