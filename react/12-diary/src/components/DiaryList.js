import React, { useState } from "react";
import "./DiaryList.css";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { Navigate, useNavigate } from "react-router-dom";
import { emotionList } from "../util/emotion";

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

  const getSortedDiaryList = () => {
    // 필터링 함수 만들기.
    const getFilteredList = (diary) => {
      // const filteredList = diaryList.filter(diary);
      // filter state 가 good 이면 (emotion 의 값이 3보다 작거나 같을때)
      if (filter == "good") {
      } else {
      }

      //filter state 가 good이 아니면 (emotion의 값이 3보다 클 때)
    };
    // 정렬 함수 만들기.
    const getOrderedList = () => {
      // order state 가 latest 이면 b-a
      // order state 가 latest 아니면 a-b
    };
    const filteredList = diaryList.filter((diary) => getFilteredList(diary));
    const sortedList = filteredList.sort(getOrderedList);

    return sortedList;

    // return getFilteredList(diary);
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
          <Button
            text={"새 일기 쓰기"}
            type="positive"
            onClick={() => {
              navigate("/new");
            }}
          />
        </div>
      </div>
      {diaryList.map((diary) => {
        return <DiaryItem key={diary.id} {...diary} />;
      })}
    </div>
  );
}

export default DiaryList;
