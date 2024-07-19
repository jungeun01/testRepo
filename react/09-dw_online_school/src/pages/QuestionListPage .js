import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import ListPage from "../components/ListPage";
// import questionsListPage from "./QuestionListPage ";
import searchImg from "../assets/search.svg";
import styles from "./QuestionsListPage.module.css";
// import QuestionsPage from "./QuestionsItem";
import QuestionsItem from "./QuestionsItem";
import { getAllDatas } from "../api/firebase";

function QuestionsListPage(props) {
  //데이터베이스 불러오기
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getAllDatas("questions");
    console.log(resultData);
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
      <div>
        {items.map((questions, idx) => {
          return <QuestionsItem item={questions} key={idx} />;
        })}
      </div>
    </ListPage>
  );
}

export default QuestionsListPage;
