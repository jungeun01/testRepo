import React from "react";
import styles from "./NavCartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

function NavCartItem({ title, price, image, category, quantity, total }) {
  return (
    <div className={styles.nav_cart_item}>
      <Link>
        <img src={image} />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <span>
          {price} X {quantity}= ${total.toFixed(2)}
        </span>
      </div>
      <button className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default NavCartItem;
