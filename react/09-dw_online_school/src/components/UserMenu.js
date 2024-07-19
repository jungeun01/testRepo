import React, { useEffect, useState } from "react";
import personImg from "../assets/person.png";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";

function UserMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const isLogined = JSON.parse(localStorage.getItem("member"));

  const handleClick = (e) => {
    e.stopPropagation(); // 버블링 막아주는 함수
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => {
      setIsOpen(false);
      //   alert("Window click handler");
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      // window.addEventListener("click", handleClickOutside);
      // return () => {
      //   window.removeEventListener("click", handleClickOutside);
      // 윈도우 객체에서 무언갈 할때 지워줄때 저런식으로 사용.
    };
  }, [isOpen]);
  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleClick}>
        <img src={personImg} />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          {!isLogined ? (
            <>
              <li className={styles.disabled}>위시리스트</li>
              <Link to="/login">
                <li>로그인</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/wishlist">
                <li>위시리스트</li>
              </Link>
              <Link to="/logout">
                <li>로그아웃</li>
              </Link>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
