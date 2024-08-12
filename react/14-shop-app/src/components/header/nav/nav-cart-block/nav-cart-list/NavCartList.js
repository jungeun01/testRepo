import React from "react";
import styles from "./NavCartList.module.scss";
import NavCartItem from "./nav-cart-item/NavCartItem";
import { useSelector } from "react-redux";

function NavCartList(props) {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className={styles.nav_cart_list}>
      {products.map((product, idx) => (
        <NavCartItem {...product} key={idx} />
      ))}
    </div>
  );
}

export default NavCartList;
