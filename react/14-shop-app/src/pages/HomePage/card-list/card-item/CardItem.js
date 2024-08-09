import React from "react";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";

function CardItem({ item }) {
  const { title, price, image } = item;
  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img src={image} />
      </Link>
      <h5>{`${title.slice(0, 15)}...`}</h5>
      <div>
        <button>장바구니에 담기</button>
        <p>$ {price}</p>
      </div>
    </li>
  );
}

export default CardItem;
