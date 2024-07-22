import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import styles from "./QuestionItem.module.css";
import DateText from "./DateText";
import QuestionPage from "../pages/QuestionPage";

function QuestionsItem({ question }) {
  const { title, createdAt, answers, writer } = question;
  return (
    <Card className={styles.questionItem}>
      <div className={styles.info}>
        <p className={styles.title}>
          <Link to={`/questions/${question.docId}`} state={{ question }}>
            {title}
          </Link>
          <span className={styles.count}>[{answers.length}]</span>
        </p>
        <p className={styles.date}>
          <DateText value={createdAt} />
          {/* 날짜 */}
        </p>
      </div>
      <div className={styles.writer}>
        <Avatar photoUrl={writer.profile.photo} name={writer.name} />
        {/* 이미지 뽑아오기. writer안에 profile 그안에 photo 가져오는방법 */}
      </div>
    </Card>
  );
}

export default QuestionsItem;
