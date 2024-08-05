import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import {
  addItem,
  deleteItem,
  // fetchItems,
  initialState,
  reducer,
  updateItem,
} from "./api/itemReducer";
import DiaryPage from "./pages/DiaryPage";
import EditPage from "./pages/EditPage";
import Button from "./components/Button";
import LoginPage from "./pages/LoginPage";
import { getUserAuth } from "./api/firebase";
import { userInitialState, userReducer } from "./api/userReducer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "./store/diarySlice";

// 컨텍스트 생성
export const DiaryStateContext = createContext(); //items들이 들어있고
export const DiaryDispatchContext = createContext(); //onCreate 들어있..?

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const items = useSelector((state) => state.diary.items);
  const dispatch = useDispatch();

  const [userState, loginDispatch] = useReducer(userReducer, userInitialState);
  const auth = getUserAuth();
  const [user] = useAuthState(auth);
  console.log(user);

  // CERATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updateAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: user.email,
    };
    await addItem("diary", addObj, dispatch);
  };
  // READ
  // UPDATE
  const onUpdate = async (values) => {
    const updateObj = {
      updatedAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
    };
    await updateItem("diary", values.docId, updateObj, dispatch);
  };
  // DELETE
  const onDelete = async (docId) => {
    await deleteItem("diary", docId, dispatch);
  };

  useEffect(() => {
    // fetchItems(
    //   "diary",
    //   {
    //     conditions: [
    //       {
    //         field: "userEmail",
    //         operator: "==",
    //         value: user ? user.email : "admin@gamil.com",
    //       },
    //     ],
    //     orderBys: [{ field: "date", direction: "desc" }],
    //   },
    //   dispatch
    // );

    const param = {
      collectionName: "diary",
      queryOptions: {
        conditions: [
          {
            field: "userEmail",
            operator: "==",
            value: user ? user.email : "admin@gmail.com",
          },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
    };
    dispatch(fetchItems(param));
  }, [user]);
  return (
    //provider 넘겨주는 애들 / value=> 요소들??! /범위 설정
    <DiaryStateContext.Provider value={{ diaryList: items, auth: auth }}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <BrowserRouter>
          <div className="App">
            {/* <Button text={"로그인"} className="btn_login" onClick={goLogin} /> */}
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="new" element={<NewPage />} />
                <Route path="edit/:id" element={<EditPage />} />
                <Route path="diary/:id" element={<DiaryPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
export default App;
// 컨텍스트 생성
// createContext()사용:const DiaryDispatchContext=createContext()

// 컨텍스트 사용(접근)
// useContext(사용할 컨텍스트)사용

// redux=>바닐라js를위해 만들어진 라이브러리
// React-Redux 의 단점 :불필요한 코드 증가(보일러플레이트 코드 증가),
// state 의 불변성 유지를 위해서 복잡한 방법으로 state를 변경해야했다,
// ex) const FETCH_ITEM='FETCH_ITEM' ->불필요한 코드

// 리덕스툴킷
// STORE 안에 여러가지slice가 들어있다?!
