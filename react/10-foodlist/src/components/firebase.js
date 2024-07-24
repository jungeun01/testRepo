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
  apiKey: "AIzaSyBdjfjs5UQ6BkxInzHOPnSMgOmBebVaB1o",
  authDomain: "foodlist-a93c2.firebaseapp.com",
  projectId: "foodlist-a93c2",
  storageBucket: "foodlist-a93c2.appspot.com",
  messagingSenderId: "47973719703",
  appId: "1:47973719703:web:895f05014a6dadde6f53d2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장==> 스토리지의 이미지url을 가져와서addObj의 imgUrl 값으로 변경
  const path = createPath("food/"); //스토리지 경로
  const url = await uploadImage(path, addObj.imgUrl);

  addObj.imgUrl = url;
  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장
  await addDoc(getCollection(collectionName), addObj);
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);
  //File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 file의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}
async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), //collection
    orderBy(field, "desc"), //정렬할 필드로 내림차순
    limit(1) //1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

//food list 데이터 가져오기!!~!!!
async function getDatasOrderByLimit(collectionName, options) {
  const { fieldName, limits } = options;
  let q;
  if (!options.lq) {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      limit(limits)
    );
  } else {
    q = query(
      getCollection(collectionName),
      orderBy(fieldName, "desc"),
      startAfter(options.lq),
      limit(limits)
    );
  }
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const lastQuery = docs[docs.length - 1];
  const resultData = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return { resultData, lastQuery };
}

//이미지 삭제
// async function deleteDatas(collectionName, docId, imgUrl) {
//   const storage = getStorage();

//   try {
//     const deleteRef = ref(storage, imgUrl);
//     await deleteObject(deleteRef);

//     const docRef = await doc(db, collectionName, docId);
//     await deleteDoc(docRef);
//     return true;
//   } catch (error) {
//     return false;
//   }
// }
export { addDatas, getDatasOrderByLimit };
