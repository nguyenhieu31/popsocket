import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const getProductDetail = createAsyncThunk(
  //action type string
  "productDetail/getProductDetail",
  // callback function
  async (id) => {
    const url = `${API_URL}/products/${id}`;
    try {
      const res = await axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);
const initialState = {
  cart: [],
  loading: false,
  productDetailItem: {},
  errorMessage: " ",
  listImage: [],
};
const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    deleteDataProduct: (state) => {
      return {
        ...state,
        productDetailItem: {},
        listImage: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        const { product, galerythumbnail } = action.payload;
        state.productDetailItem = product;
        state.listImage.push(product.front_thumbnail, product.behind_thumbnail);
        const arrayThumbnail = galerythumbnail.map((item) => {
          return item.imagegalery;
        });
        state.listImage = state.listImage.concat(arrayThumbnail);
        state.listImage = state.listImage.slice(0, 8);
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export const { deleteDataProduct } = productDetailSlice.actions;
export default productDetailSlice.reducer;
