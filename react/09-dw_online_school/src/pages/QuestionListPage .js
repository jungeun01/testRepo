import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import ListPage from "../components/ListPage";
import searchImg from "../assets/search.svg";
import styles from "./QuestionsListPage.module.css";
import QuestionsItem from "../components/QuestionsItem";
import { getAllDatas } from "../api/firebase";

function QuestionsListPage(props) {
  //데이터베이스 불러오기
  const [items, setItems] = useState([]);

  let listItems;

  const handleLoad = async () => {
    const resultData = await getAllDatas("questions");
    listItems = resultData; //검색용으로 사용할 전체 데이터를 가지고 있어야 한다.
    // console.log(resultData);
    setItems(resultData);
  };
  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <ListPage variant="community">
      <form className={styles.form}>
        <input placeholder="검색으로 질문찾기" />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 질문</p>
      <div className={styles.questionList}>
        {items.map((question, idx) => {
          return <QuestionsItem question={question} key={idx} />;
        })}
      </div>
    </ListPage>
  );
}

export default QuestionsListPage;
