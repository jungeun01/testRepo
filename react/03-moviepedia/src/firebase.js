import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH5Feyqr-F6fhU-G2ZPY-SPnCbHGklJUA",
  authDomain: "movie-8d9a6.firebaseapp.com",
  projectId: "movie-8d9a6",
  storageBucket: "movie-8d9a6.appspot.com",
  messagingSenderId: "182563348051",
  appId: "1:182563348051:web:870390abba9ec7271530a6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultDate = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultDate;
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
    return false;
  }
}
async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db,컬렉션명, 문서ID);
  // getDocs(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export { db, getDatas, addDatas, deleteDatas, updateDatas };
