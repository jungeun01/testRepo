const firebaseConfig = {
  apiKey: "AIzaSyAIqY9PY_B4ZenqMehacclgXgf3vING16M",
  authDomain: "myproject-1a08d.firebaseapp.com",
  projectId: "myproject-1a08d",
  storageBucket: "myproject-1a08d.appspot.com",
  messagingSenderId: "361775986496",
  appId: "1:361775986496:web:555d18913b2e78b437aca5",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}
async function deleteDatas(collectionName, docId) {
  try {
    await db.collection("collectionName").doc("docId").delete();
    return true;
  } catch (error) {
    return false;
  }
}
