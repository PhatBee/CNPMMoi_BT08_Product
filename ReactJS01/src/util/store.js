import { configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "../hook/productDetailSlice";

export const store = configureStore({
  reducer: {
    productDetail: productDetailReducer,
  },
});
