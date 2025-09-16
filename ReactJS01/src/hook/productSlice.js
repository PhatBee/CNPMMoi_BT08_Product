import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getSimilarProductsApi } from "../util/api";

// async thunk gọi API
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilar",
  async (id) => {
    const res = await getSimilarProductsApi(id);
    console.log("Fetch similar products raw: ", res);
    console.log("Fetch similar products data: ", res.data);
    return res;
  }
);

const similarSlice = createSlice({
  name: "similarProducts",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default similarSlice.reducer;
