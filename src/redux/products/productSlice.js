import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import waiting from "../../hooks/waiting";
// import ProductType from './../../component/partial/product-type/product-type';
const API_URL = process.env.REACT_APP_API_URL;
export const getProducts = createAsyncThunk(
  //action type string
  "products/getProducts",
  // callback function
  async (data) => {
    const url = `${API_URL}/products`;
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
    const url = `${API_URL}/products`;

    try {
      await waiting(2000);
      const res = await axios.get(url);
      if (res) {
        if (data.length > 0) {
          return data;
        } else {
          const searchResult = res.data.filter(
            (item) => item.name === data.name
          );
          return searchResult;
        }
      }
    } catch (err) {}
  }
);
export const getCategoryProduct = createAsyncThunk(
  "categoryProductType/getCategoryProductType",
  async (data) => {
    const url = `${API_URL}/products`;
    try {
      const res = await axios.get(url);
      if (res) {
        const categoryProduct = res.data.reduce((acc, product) => {
          const category = product.name.split(" ")[0];
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});
        return categoryProduct;
      }
    } catch (error) {}
  }
);
export const getProductByPrice = createAsyncThunk(
  "productByPrice/getProductByPrice",
  async (data) => {
    const url = `${API_URL}/products`;
    try {
      const res = await axios.get(url);
      if (res) {
        const { firstPrice, lastPrice } = data;
        const products = res.data.filter((product) => {
          return product.price >= firstPrice && product.price <= lastPrice;
        });
        return products;
      }
    } catch (error) {}
  }
);
export const sortProductsByPrice = createAsyncThunk(
  "sortProduct/sortProductsByPrice",
  async (data) => {
    const url = `${API_URL}/products`;
    try {
      const res = await axios.get(url);
      if (res) {
        let products = JSON.parse(JSON.stringify(res.data));
        if (data === "Price Low To High") {
          products = products.sort((a, b) => a.price - b.price);
          return products;
        } else if (data === "Price High To Low") {
          products = products.sort((a, b) => b.price - a.price);
          return products;
        } else {
          return res.data;
        }
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
        state.isSearch = true;
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
        state.products = action.payload;
      })
      .addCase(getProductsBySearch.fulfilled, (state, action) => {
        state.isSearch = false;
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
        state.isSearch = false;
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
