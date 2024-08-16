import React, { useEffect } from "react";
import CardItem from "./card-item/CardItem";
import styles from "./CardList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/products/productsSlice";
import CardSkeleton from "../card-skeleton/CardSkeleton";
import { getDatasRest } from "../../../api";

function CardList(props) {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productsSlice);
  const category = useSelector((state) => state.categoriesSlice);
  // 액션=>타입 ,페이로드

  // const handleLoad = async () => {
  //   const queryOptions = {
  //     conditions: [
  //       {
  //         field: "category",
  //         operator: category ? "EQUAL" : "GREATER_THAN_OR_EQUAL",
  //         value: category.toLowerCase(),
  //       },
  //     ],
  //   };
  //   const restResult = await getDatasRest("products", queryOptions);
  // };
  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "category",
          // operator: category ? "==" : ">=",
          operator: category ? "EQUAL" : "GREATER_THAN_OR_EQUAL",
          value: category.toLowerCase(),
        },
      ],
    };
    dispatch(fetchProducts({ collectionName: "shop-app", queryOptions }));
    // handleLoad();
  }, [category]);

  if (isLoading) return <CardSkeleton />;

  return (
    <ul className={styles.card_list}>
      {products.map((product, idx) => {
        return <CardItem item={product} key={idx} />;
      })}
    </ul>
  );
}

export default CardList;
