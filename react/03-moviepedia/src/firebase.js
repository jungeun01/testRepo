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
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

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

async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  // query(컬렉션 정보,조건1,조건2,조건3...)
  // orderby
  const q = query(collect, orderBy(options.order, "desc"));
  const snapshot = await getDocs(q);
  const resultDate = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultDate;
}

async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);
  let q;
  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }

  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
  console.log(lastQuery);
  const resultDate = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return { resultDate, lastQuery };
}

async function addDatas(collectionName, dataObj) {
  // 문서 ID 수동

  try {
    const uuid = crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);

    dataObj.imgUrl = url;

    // createdAt,updatedAt ==> 현재 날짜 밀리세컨즈로 바꿔서
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updateAt = time;

    // id 필드의 값==> 가장 큰 id + 1
    const lastId = await getLastNum(collectionName, "id");
    dataObj.id = lastId + 1;

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    const docSnap = await getDoc(result); //result ==> documentReference
    const resultDate = { ...docSnap.data(), docId: docSnap.id };

    return resultDate;
  } catch (error) {
    return false;
  }

  async function uploadImage(path, imgFile) {
    // 스토리지 객체 가져오기
    const storage = getStorage();
    // 저장할 이미지 객체 생성
    const imageRef = ref(storage, path);
    // File 객체를 스토리지에 저장
    await uploadBytes(imageRef, imgFile);
    // 저장한 File 의 url 가져오기
    const url = await getDownloadURL(imageRef);
    return url;
  }
}
async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();

  try {
    //  2. 스토리지에서 이미지 삭제

    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    //  3. 컬렉션에서 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db,컬렉션명, 문서ID);
  // getDocs(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await doc(db, collectionName, docId);
  // const docData = await getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
};
