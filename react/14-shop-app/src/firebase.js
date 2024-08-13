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
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1ajgNrTpNj69VX9KHgQf5WNKhBOLX3CE",
  authDomain: "shop-app-8b501.firebaseapp.com",
  projectId: "shop-app-8b501",
  storageBucket: "shop-app-8b501.appspot.com",
  messagingSenderId: "25406386428",
  appId: "1:25406386428:web:90a082335f0ea134cc6779",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(...path) {
  let newPath = path;
  if (typeof path[0] !== "string") {
    // [newPath] = path;
    newPath = path.flat();
  }
  return collection(db, ...newPath);
}

export function getUserAuth() {
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
export async function getData(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  const resultData = { ...doc.data(), docId: doc.id };
  return resultData;
  // 무조건 하나의 데이터만 가져올때(조회할때)!!!!
}

export async function joinUser(uid, email) {
  await setDoc(doc(db, "users", uid), { email: email });
}

export async function asyncCart(uid, cartArr) {
  const cartRef = getCollection("users", uid, "cart");
  const batch = writeBatch(db);

  // doc(db,'컬렉션명','문서id')

  for (const item of cartArr) {
    const result = await updateQuantity(uid, item);
    if (!result) {
      const itemRef = doc(cartRef, item.id.toString());
      batch.set(itemRef, item);
    }
  }

  await batch.commit();
}

export async function updateQuantity(uid, cartItem) {
  const cartRef = getCollection("users", uid, "cart");
  const itemRef = doc(cartRef, cartItem.id.toString());

  // 문서가 존재하는지 확인
  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    const currentData = itemDoc.data();
    const updatedQuantity = (currentData.quantity || 0) + 1;
    await updateDoc(itemRef, { quantity: updatedQuantity });
    return true;
  } else {
    return false;
  }
}

export async function deleteDatas(collectionName, docId) {
  try {
    const cartRef = getCollection(collectionName);
    const docRef = doc(cartRef, docId.toString());
    await deleteDoc(docRef); //여기에서 딱 문서삭제됨.
    return true;
  } catch (error) {
    console.log("Error Delete:", error);
  }
}

export async function addCart(collectionName, cartObj) {
  const collectionRef = getCollection(collectionName);
  const cartRef = doc(collectionRef, cartObj.id.toString());
  await setDoc(cartRef, cartObj);
}
