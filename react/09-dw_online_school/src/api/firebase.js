import { initializeApp } from "firebase/app";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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

// 데이터들을 표시 -코스의 모든 데이터들을 불러오는 애들
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
// 코스 하나를 선택 했을때 그안에 또 다른 데이터들을 불러오는 애들
async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);

  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };

  return resultData;
}
// 회원정보 가져오면서 로그인 불러오는거
async function getMember(values) {
  const { email, password } = values;
  const collect = collection(db, "member");
  const q = query(collect, where("email", "==", email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;

  //이메일이나 비밀번호가 잘못입력됐을 경우 로그인 버튼을 눌렀을 때 나오는 알림창
  let message;
  let memberObj = {};
  if (docs.length == 0) {
    message = "이메일이 올바르지 않습니다.;";
  } else {
    const memberData = { ...docs[0].data(), docId: docs[0].id };
    if (password === memberData.password) {
      message = "로그인에 성공했습니다.";
      memberObj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      message = "비밀번호가 일치하지 않습니다.";
    }
  }
  return { memberObj, message };
}

// 업데이트 함수사용할때 /로그인 후 ...?
async function updateDatas(collectionName, docId, updateObj, option) {
  // 문서의 reference 객체가 필요하다
  const docRef = doc(db, collectionName, docId);

  try {
    // option이 있을때 와 없을때 조건문
    if (!option) {
      await updateDoc(docRef, updateObj);
    } else {
      if (option.type == "ADD") {
        await updateDoc(docRef, {
          [option.fieldName]: arrayUnion(updateObj),
        });
      } else if (option.type == "DELETE") {
        await updateDoc(docRef, {
          [option.fieldName]: arrayRemove(updateObj),
        });
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

export { getAllDatas, getData, getMember, updateDatas };
