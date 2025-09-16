import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getProductByIdApi } from "../util/api";

export const fetchProductDetail = createAsyncThunk(
  "productDetail/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductByIdApi(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi tải sản phẩm");
    }
  }
);  

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetail: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
