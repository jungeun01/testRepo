import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import categoriesSlice from "./categories/categoriesSlice";
import productSlice from "./products/productSlice";

export const store = configureStore({
  reducer: {
    productsSlice,
    categoriesSlice,
    productSlice,
  },
});
