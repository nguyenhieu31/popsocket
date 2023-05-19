import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import waiting from "../../hooks/waiting";
const API_URL = process.env.REACT_APP_API_URL;
export const getProducts = createAsyncThunk(
  //action type string
  "products/getProducts",
  // callback function
  async (data) => {
    const url = `${API_URL}/products`;
    // const url = "http://localhost:8080/api/v1/products";
    try {
      await waiting(2000);
      const res = await axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (err) {}
  }
);
export const getProductsBySearch = createAsyncThunk(
  //action type string
  "products/getProductsBySearch",
  // callback function
  async (data) => {
    try {
      await waiting(2000);
      if (data.length > 0) {
        return data;
      } else {
        const url = `${API_URL}/products/search`;
        const res = await axios.post(url, data);
        if (res) {
          return res.data;
        }
      }
    } catch (err) {}
  }
);
export const getCategoryProduct = createAsyncThunk(
  "categoryProductType/getCategoryProductType",
  async (data) => {
    const url = `${API_URL}/products-category`;
    try {
      const res = await axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (error) {}
  }
);
export const getProductByPrice = createAsyncThunk(
  "productByPrice/getProductByPrice",
  async (data) => {
    const url = `${API_URL}/products-price`;
    try {
      await waiting(1500);
      const res = await axios.post(url, data);
      if (res) {
        return res.data;
      }
    } catch (error) {}
  }
);
export const sortProductsByPrice = createAsyncThunk(
  "sortProduct/sortProductsByPrice",
  async (data) => {
    const url = `${API_URL}/product/sort-price`;
    try {
      await waiting(1500);
      const res = await axios.post(url, { type: data });
      if (res) {
        return res.data;
      }
    } catch (error) {}
  }
);
const initialState = {
  cart: [],
  loading: true,
  products: [],
  productsSearch: [],
  productCategory: {},
  errorMessage: "",
  isSearch: false,
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductByType: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductsBySearch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategoryProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductByPrice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sortProductsByPrice.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsSearch = [];
        state.products = action.payload;
      })
      .addCase(getProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.productsSearch = action.payload;
      })
      .addCase(getCategoryProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategory = action.payload;
      })
      .addCase(getProductByPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(sortProductsByPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getCategoryProduct.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getProductByPrice.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(sortProductsByPrice.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export const { getProductByType } = ProductSlice.actions;
export default ProductSlice.reducer;
