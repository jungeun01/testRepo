import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from "./pages/NewPage";
import {
  addItem,
  fetchItems,
  initialState,
  reducer,
  updateItem,
} from "./api/itemReducer";
import DiaryPage from "./pages/DiaryPage";
import EditPage from "./pages/EditPage";

// 컨텍스트 생성
export const DiaryStateContext = createContext(); //items들이 들어있고
export const DiaryDispatchContext = createContext(); //onCreate 들어있..?

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // CERATE
  const onCreate = async (values) => {
    const addObj = {
      createdAt: new Date().getTime(),
      updateAt: new Date().getTime(),
      date: new Date(values.date).getTime(),
      content: values.content,
      emotion: values.emotion,
      userEmail: "wjddmsy12345@gmail.com",
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

  useEffect(() => {
    fetchItems(
      "diary",
      {
        conditions: [
          {
            field: "userEmail",
            operator: "==",
            value: "wjddmsy12345@gmail.com",
          },
        ],
        orderBys: [{ field: "date", direction: "desc" }],
      },
      dispatch
    );
  }, []);
  return (
    //provider 넘겨주는 애들 / value=> 요소들??! /범위 설정
    <DiaryStateContext.Provider value={state.items}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="new" element={<NewPage />} />
                <Route path="edit/:id" element={<EditPage />} />
                <Route path="diary/:id" element={<DiaryPage />} />
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
