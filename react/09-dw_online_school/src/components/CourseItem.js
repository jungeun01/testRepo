import React from "react";
import Card from "./Card";
import CourseIcon from "./CourseIcon";
import styles from "./CourseItem.module.css";
import { Link } from "react-router-dom";
import getCourseColor from "../utils/getCourseColor";

const diffArr = ["입문", "초급", "중급", "고급"];
function CourseItem({ item }) {
  const { title, summary, language, difficulty, code, photoUrl } = item;
  const courseColor = getCourseColor(code);
  const thumbStyle = {
    borderColor: courseColor,
  };

  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb} style={thumbStyle}>
        <CourseIcon photoUrl={photoUrl} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link>{title}</Link>
        </h2>
        <p className={styles.description}>{summary}</p>
        <div>
          <ul className={styles.tags}>
            <li>{language}</li>
            <li>{diffArr[difficulty]}</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
