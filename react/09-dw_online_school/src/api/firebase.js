import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAubeHzbJ4Zp8dJaczzyNdcvIoOD6gGYcU",
  authDomain: "dwos-6f8fb.firebaseapp.com",
  projectId: "dwos-6f8fb",
  storageBucket: "dwos-6f8fb.appspot.com",
  messagingSenderId: "932520071319",
  appId: "1:932520071319:web:a13d532d2ce391e67899d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName) {
  const collect = collection(db, collectionName);
  const snapshot = await getDocs(collect);
  console.log(snapshot);
  const resultData = snapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return resultData;
  //   debugger;
}

export { getAllDatas };
