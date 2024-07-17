import React, { useEffect, useRef, useState } from "react";
import ListPage from "../components/ListPage";
import searchImg from "../assets/search.svg";
import styles from "./CourseList.module.css";
import CourseItem from "../components/CourseItem";
import { getAllDatas } from "../api/firebase";

let listItems;

function CourseListPage(props) {
  // 데이터베이스 불러오기!
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const handleKeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장한다
    setKeyword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // 전체 데이터를 가지고 있는listItems를 활용해
    // 사용자가 입력한 키워드를 title에 포함하고 있는객체를 원소로 가지는 배열을 만든다.
    // const searchItems = listItems.filter((item) => {
    //   return item.title.includes(keyword);
    // });

    // 만든 배열을 items state에 set해준다

    // setItems(searchItems);
    setItems(listItems.filter(({ title }) => title.includes(keyword)));
  };
  const handleLoad = async () => {
    // 파이어베이스의 courses 컬렉션의 데이터를 가져온다.
    const resultData = await getAllDatas("courses");
    // 전체데이터 변수에 저장
    listItems = resultData;

    // 가져온 데이터 콘솔로 확인.
    console.log(resultData);

    // items state에 set 해준다.
    setItems(resultData);
  };
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant="catalog">
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="검색으로 코스찾기"
          value={keyword}
          onChange={handleKeywordChange}
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>

      <div className={styles.courseList}>
        {items.map((course) => {
          return <CourseItem key={course.docId} item={course} />;
        })}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
