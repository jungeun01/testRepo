import React from "react";
import Container from "../components/Container";
import styles from "./QuestionPage.module.css";
import Writer from "../components/Writer";
import Answer from "../components/Answer";
import { useLocation } from "react-router-dom";
import DateText from "../components/DateText";
import { keyframes } from "styled-components";
import Lined from "../components/Lined";
import Warn from "../components/Warn";
import DOMPurify from "dompurify";

function QuestionPage(props) {
  //   const question = useLocation().state.question;아래랑 같음.
  const { question } = useLocation().state;
  console.log(question);
  const { title, createdAt, answers, writer, content } = question;

  const sanitizedData = (data) => {
    //만약 악성코드가 설치되어있을때를 대비해 소독할수있는 함수
    return { __html: DOMPurify.sanitize(data) };
  };

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>
                  <DateText value={createdAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={writer} />
            </div>
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: content }} //태그모양은 사라지고 실행됨
              //   dangerouslySetInnerHTML={sanitizedData(content)}
              // 위에있는거처럼 사용하면 실행되지 않음
            />
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>
          <Lined>{answers.length} 개 답변</Lined>
        </h2>

        {answers.length > 0 ? (
          answers.map((answer) => (
            <Answer
              key={answer.id}
              answer={answer}
              className={styles.answerItem}
            />
          ))
        ) : (
          <Warn
            title="답변을 기다리고 있어요."
            description="이 질문의 첫 번째 답변을 달아주시겠어요?"
          />
        )}

        {}
      </Container>
    </>
  );
}

export default QuestionPage;
