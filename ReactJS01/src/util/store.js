import { configureStore } from "@reduxjs/toolkit";
import productDetailReducer from "../hook/productDetailSlice";
import similarReducer from "../hook/productSlice";

export const store = configureStore({
  reducer: {
    productDetail: productDetailReducer,
    similarProducts: similarReducer,
  },
});
