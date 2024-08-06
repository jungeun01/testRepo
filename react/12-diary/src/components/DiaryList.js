import React, { useState } from "react";
import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { Navigate, useNavigate } from "react-router-dom";
import { emotionList } from "../util/emotion";
import { useSelector } from "react-redux";
import { getUserAuth } from "../api/firebase";

const sortOptionList = [
  { name: "최신순", value: "latest" },
  { name: "오래된 순", value: "oldest" },
];
const filterOptionList = [
  { name: "전부다", value: "all" },
  { name: "좋은 감정만", value: "good" },
  { name: "안좋은 감정만", value: "bad" },
];

function ControlMenu({ optionList, value, onChange }) {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const [order, setOrder] = useState("latest"); //최신순
  const [filter, setFilter] = useState("all"); //전부다
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const auth = getUserAuth();
  const checkLogin = () => {
    // if (!auth.currentUser) {
    if (!isAuthenticated) {
      alert("로그인을 해주세요");
      navigate("/login");
    } else {
      navigate("/new");
    }
  };

  const getSortedDiaryList = () => {
    // 필터링 함수 만들기.
    const getFilteredList = (diary) => {
      if (filter === "good") {
        // filter state 가 good 이면 (emotion 의 값이 3보다 작거나 같을때)
        return diary.emotion <= 3;
      } else {
        //filter state 가 good이 아니면 (emotion의 값이 3보다 클 때)
        return diary.emotion > 3;
      }
    };
    // 정렬 함수 만들기.
    const getOrderedList = (a, b) => {
      if (order == "latest") {
        // order state 가 latest 이면 b-a
        return b.date - a.date;
      } else {
        // order state 가 latest 아니면 a-b
        return a.date - b.date;
      }
    };
    const filteredList =
      filter === "all"
        ? diaryList
        : diaryList.filter((diary) => getFilteredList(diary));

    const sortedList = filteredList.sort(getOrderedList);
    //sort 함수는 파라미터 자체를 함수로 받는다.
    return sortedList;
  };

  return (
    <div className="diaryList">
      <div className="menu_wrapper">
        <div className="control_menus">
          <ControlMenu
            optionList={sortOptionList}
            value={order}
            onChange={setOrder}
          />
          <ControlMenu
            optionList={filterOptionList}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className="new_btn">
          <Button text={"새 일기 쓰기"} type="positive" onClick={checkLogin} />
        </div>
        {/* {auth.currentUser && ( */}
        {isAuthenticated && (
          <div>
            <Button
              text={"로그아웃"}
              type={"negative"}
              onClick={() => auth.signOut()}
            />
          </div>
        )}
      </div>
      {getSortedDiaryList().map((diary) => {
        return (
          <Dia
            ryItem
            key={diary.id}
            {...diary}
            isAuthenticated={isAuthenticated}
          />
        );
      })}
    </div>
  );
}

export default DiaryList;
