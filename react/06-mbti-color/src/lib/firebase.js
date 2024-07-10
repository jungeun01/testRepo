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
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJNvys5PzZ3aEnbCrPfLQEHq3WmaO_dX8",
  authDomain: "mbti-project-bc83d.firebaseapp.com",
  projectId: "mbti-project-bc83d",
  storageBucket: "mbti-project-bc83d.appspot.com",
  messagingSenderId: "38863985366",
  appId: "1:38863985366:web:04465f7bfbcd6175998777",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy(order, "desc")); //desc:내림차순
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
  //   debugger;
  // 디버거는 앱에서 버그를 찾고 수정하는 데 사용되는 필수 도구
}
export { getAllDatas };
