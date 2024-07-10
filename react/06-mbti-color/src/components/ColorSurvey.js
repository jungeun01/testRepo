import React from "react";
import styles from "./ColorSurvey.module.css";

function ColorSurvey({ mbtiItem }) {
  const { id, mbti, colorCode } = mbtiItem; //객체를 구조분해
  return (
    <div className={styles.colorSurvey}>
      <div className={styles.id}>{id}</div>
      <div className={styles.mbti}>{mbti}</div>
      <div className={styles.arrow}>
        <img className={styles.arrowIcon} src="/images/arrow.svg" />
      </div>
      <div
        className={styles.colorChip}
        style={{ backgroundColor: colorCode }}
      ></div>
      <div className={styles.colorCode}>{colorCode}</div>
    </div>
  );
}

export default ColorSurvey;
