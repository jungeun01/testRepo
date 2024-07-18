import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CourseIcon from "../components/CourseIcon";
import Button from "../components/Button";
import Card from "../components/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";
import { getData } from "../api/firebase";
import styles from "./CoursePage.module.css";

function CoursePage() {
  // 간단한 정보 불러올때 중요한건 데이터베이스로
  //   console.log(props);
  const props = useLocation();
  const pathname = props;
  const { courseSlug } = useParams();
  const navigate = useNavigate(); //경로 이동

  const [course, setCourse] = useState();
  // undefined.code
  // undefined 여기서 끝
  // if(course){getCourseColor(course.code)}
  const courseColor = getCourseColor(course?.code);
  const headerStyle = {
    borderColor: courseColor,
  };

  const handleLoad = async () => {
    const resultData = await getData("courses", {
      field: "slug",
      condition: "==",
      value: courseSlug,
    });
    setCourse(resultData);
  };

  const handleAddWishlistClick = () => {
    // 로그인이 되어있는지 확인
    const member = JSON.parse(localStorage.getItem("member"));

    if (member) {
    } else {
      alert("로그인을 해주세요");
      navigate("/login", { state: pathname });
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);
  // handleLoad함수만 잘못쓰면 무한반복이되낭?
  return (
    <>
      <div className={styles.header} style={headerStyle}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course?.photoUrl} />
          <h1 className={styles.title}>{course?.title}</h1>
          <Button variant="round" onClick={handleAddWishlistClick}>
            + 코스 담기
          </Button>
          <p className={styles.summary}>{course?.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course?.topics.map(({ topic }) => {
          return (
            <Card key={topic.slug} className={styles.topic}>
              <h3 className={styles.title}>{topic.title}</h3>
              <p className={styles.summary}>{topic.summary}</p>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default CoursePage;
