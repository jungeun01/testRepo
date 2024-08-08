import React from "react";
import styles from "./FiltersCategory.module.scss";
import CategoryTab from "./category-tab/CategoryTab";
import { CategoriesName } from "../../../store/categories/categories";

function FiltersCategory(props) {
  return (
    <div className={styles.filter_category}>
      <CategoryTab text={"모두"} categoriesName={CategoriesName.All} />
      <CategoryTab
        text={"전자기기"}
        categoriesName={CategoriesName.Electronics}
      />
      <CategoryTab text={"쥬얼리"} categoriesName={CategoriesName.Jewelry} />
      <CategoryTab
        text={"남성의류"}
        categoriesName={CategoriesName.MensClothing}
      />
      <CategoryTab
        text={"여성의류"}
        categoriesName={CategoriesName.WomensClothing}
      />
    </div>
  );
}

export default FiltersCategory;
