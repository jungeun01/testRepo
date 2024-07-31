import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

function HomePage(props) {
  const [curDate, setCurDate] = useState(new Date());
  const headerText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 버튼 클릭 시 다음 월로 넘어감
  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };
  // ---------------
  return (
    <div>
      <Header
        headText={headerText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
      <DiaryList />
    </div>
  );
}

export default HomePage;
