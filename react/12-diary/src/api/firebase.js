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
  getDoc,
  runTransaction,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrsT76dckwfcPgb1ATQ--K6EBFwcx2Cxc",
  authDomain: "diary-cc050.firebaseapp.com",
  projectId: "diary-cc050",
  storageBucket: "diary-cc050.appspot.com",
  messagingSenderId: "502749934639",
  appId: "1:502749934639:web:6f1ccb2b1ba5702bd082da",
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
async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) {
    return 0;
  }
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export async function addDatas(collectionName, addObj) {
  try {
    //db객체와 콜백함수를 넣어준다.
    const resultData = await runTransaction(db, async (tr) => {
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;
      const docRef = await addDoc(getCollection(collectionName), addObj);
      const snapshot = await getDoc(docRef);
      const docData = snapshot.exists()
        ? { ...snapshot.data(), docId: snapshot.id }
        : null;
      return docData;
    });
    return resultData;
  } catch (error) {
    console.log("Error transaction:", error);
  }
}
// exists()=>존재하냐 안하냐?!
// Transaction 데이터 베이스의 작업단위
// 사용자가 1명이 무슨 작업을 하던 이사람의 작업이 우선적으로 실행
// 사용자가 여러명이면 그 순서를 어떻게 정할거냐?- 를정하는게 Transaction

// 세명의 사용자가 일기 등록을 동시에 눌렀을 때?. =>만약 addDatas안에 데이터 50개의 정보가있을때
// 세명이 동시에 누르면 51.51.51 로 나오는데 51,52,53으로 나오게 하려면 Transaction함수를 사용하여 순서를 정해준다.

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
export async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}
