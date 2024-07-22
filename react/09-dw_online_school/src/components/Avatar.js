import React from "react";
import styles from "./Avatar.module.css";
import tempImg from "../assets/person.png";
// 게시물 이미지
function Avatar({ photoUrl, name }) {
  return <img className={styles.avatar} src={photoUrl} title={name} />;
}

export default Avatar;
