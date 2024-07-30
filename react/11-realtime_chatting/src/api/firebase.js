import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";

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
// ChatRoom 저장할 데이터 가져오는곳
async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

// ----------------실시간으로 데이터 불러오는 함수 내용
function getRealTimeMessages(collectionName, setData) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy("createdAt"), limit(100));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
  });
  return unsubscribe;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });

  // limit조건
  q = query(q, limit(limits));
  return q;
}

export { db, getUserAuth, addDatas, getRealTimeMessages, getQuery };
