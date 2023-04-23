import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "https://popsocket-80cc4ytir-nguyenhieu31.vercel.app";
export const getProductDetail = createAsyncThunk(
  //action type string
  "productDetail/getProductDetail",
  // callback function
  async (id) => {
    const url = `${API_URL}/products/${id}`;
    try {
      const res = await axios.get(url);
      return res.data;
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
        state.productDetailItem = action.payload;
        const { frontImage, behindImage, listImageHidden } = action.payload;
        state.listImage.push(frontImage, behindImage);
        state.listImage = state.listImage.concat(
          listImageHidden.map((item) => {
            const { image } = item;
            return image;
          })
        );
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