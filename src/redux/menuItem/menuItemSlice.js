import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export const getProductMenuItem = createAsyncThunk(
  //action type string
  "menuItem/getProductMenuItem",
  // callback function
  async (data) => {
    const url = `${API_URL}/category`;
    try {
      const res = await axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (err) {}
  }
);
const initialState = {
  cart: [],
  loading: false,
  menuItem: [],
  errorMessage: " ",
};
const menuItemSlice = createSlice({
  name: "menuItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductMenuItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItem = action.payload;
      })
      .addCase(getProductMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export const { clickStatusAccount } = menuItemSlice.actions;
export default menuItemSlice.reducer;
