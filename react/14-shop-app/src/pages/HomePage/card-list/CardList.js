import React, { useEffect } from "react";
import CardItem from "./card-item/CardItem";
import styles from "./CardList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/products/productsSlice";

function CardList(props) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsSlice);
  const category = "";
  // 액션=>타입 ,페이로드
  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "category",
          operator: category ? "==" : ">=",
          value: category.toLowerCase(),
        },
      ],
    };
    dispatch(fetchProducts({ collectionName: "shop-app", queryOptions }));
  }, [category]);

  return (
    <ul className={styles.card_list}>
      {products.map((product, idx) => {
        return <CardItem item={product} key={idx} />;
      })}
    </ul>
  );
}

export default CardList;
