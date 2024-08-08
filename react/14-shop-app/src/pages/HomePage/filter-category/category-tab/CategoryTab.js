import React from "react";
import styles from "./CategoryTab.module.scss";

function CategoryTab({ text, categoriesName }) {
  const category = "";
  return (
    <button
      className={
        categoriesName === category
          ? styles.active_category
          : styles.category_button
      }
    >
      {text}
    </button>
  );
}

export default CategoryTab;
