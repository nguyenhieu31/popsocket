import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { axiosJWT } from "../../util/axios-interceptor";
const API_URL = process.env.REACT_APP_API_URL;
//user
export const setUsers = createAsyncThunk(
  //action type string
  "users/setUsers",
  // callback function
  async (values) => {
    const url = `${API_URL}/user/signup-account`;
    try {
      const res = await axios.post(url, values);
      if (res.status === 200) {
        Cookies.set("token", res.data.token);
        toast.success("Create account successful");
        return;
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error("email is already existing");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
export const getUser = createAsyncThunk(
  //action type string
  "users/getUser",
  // callback function
  async (values) => {
    const url = `${API_URL}/user/login-account`;
    try {
      const res = await axios.post(url, values);
      if (res.status === 200) {
        const { user, token } = res.data;
        toast.success("login successful");
        Cookies.set("token", token, { expires: 7 });
        return user;
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("email or password is incorrect");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
export const updateUser = createAsyncThunk(
  //action type string
  "users/updateUser",
  // callback function
  async (dataInit) => {
    const url = `${API_URL}/user/update/${dataInit.id}`;
    const data = JSON.parse(JSON.stringify(dataInit));
    try {
      const res = await axiosJWT.put(url, data);
      if (res.status === 200) {
        toast.success("update successful");
        return res.data;
      } else {
        toast.error("update is fail");
        return;
      }
    } catch (err) {
      if (
        (err && err.response.status === 401) ||
        (err && err.response.status === 403)
      ) {
        console.log(err.message);
        toast.error("update failed");
        return;
      } else {
        console.log(err);
      }
    }
  }
);
export const changePassword = createAsyncThunk(
  //action type string
  "users/changePassword",
  // callback function
  async (dataInit) => {
    const url = `${API_URL}/user/change-password/${dataInit.id}`;
    const data = JSON.parse(JSON.stringify(dataInit));
    try {
      const res = await axiosJWT.patch(url, data);
      if (res.status === 200) {
        toast.success("change password successful");
        return;
      }
    } catch (err) {
      if (err && err.response.status === 401) {
        toast.error("change password is fail");
        return;
      } else {
        console.log(err);
      }
    }
  }
);
export const updateAvatarUser = createAsyncThunk(
  //action type string
  "users/updateAvatarUser",
  // callback function
  async (data) => {
    const url = `${API_URL}/user/${data.userID}/upload-avatar`;
    let formData = new FormData();
    formData.append("file", data.file);
    try {
      const res = await axiosJWT.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        toast.success("update successful");
        return res.data.user;
      } else {
        toast.error("update is fail");
        return;
      }
    } catch (err) {}
  }
);
export const loginSuccess = createAsyncThunk(
  //action type string
  "users/loginSuccess",
  // callback function
  async () => {
    const url = `${API_URL}/user/login`;
    try {
      const res = await axiosJWT.get(url);
      if (res.status === 200) {
        const { user } = res.data;
        return user;
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
export const logout = createAsyncThunk(
  //action type string
  "users/logout",
  // callback function
  async () => {
    const url = `${API_URL}/user/logout`;
    const token = Cookies.get("token");
    try {
      const decoded = jwt_decode(token);
      if (decoded) {
        Cookies.remove("token");
        const res = await axios.post(url, decoded);
        if (res.status === 200) {
          toast.success("Logout successful");
          return;
        }
      }
    } catch (err) {
      if (err && err.response.status === 401) {
        toast.error("Logout is incorrect");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
//cart
export const addToCart = createAsyncThunk(
  //action type string
  "users/addToCart",
  // callback function
  async (values) => {
    const urlCart = `${API_URL}/products/${values.id}/add-to-cart`;
    try {
      const resCart = await axios.post(urlCart, values);
      if (resCart.status === 200) {
        toast.success("add to cart successful");
        return resCart.data;
      }
    } catch (err) {
      if (err && err.res.status === 500) {
        toast.error("add to cart failed");
      }
    }
  }
);
export const getProductInCartByUser = createAsyncThunk(
  //action type string
  "users/getProductInCartByUser",
  // callback function
  async (id) => {
    const urlCart = `${API_URL}/cart/products/${id}`;
    const token = Cookies.get("token");
    try {
      if (token) {
        if (id) {
          const resCart = await axios.get(urlCart);
          if (resCart.status === 200) {
            return resCart.data;
          }
        }
      }
    } catch (err) {
      if (err && err.res.status === 500) {
        return err.message;
      }
    }
  }
);
export const decrementCartItem = createAsyncThunk(
  //action type string
  "users/decrementCartItem",
  // callback function
  async (data) => {
    const urlCart = `${API_URL}/cart/products/decrementProducts/${data.id}`;
    try {
      const resCart = await axios.patch(urlCart, data);
      if (resCart.status === 200) {
        return resCart.data;
      }
    } catch (err) {
      if (err && err.res.status === 500) {
        console.log(err.message);
      }
    }
  }
);
export const incrementCartItem = createAsyncThunk(
  //action type string
  "users/incrementCartItem",
  // callback function
  async (data) => {
    const urlCart = `${API_URL}/cart/products/incrementProducts/${data.id}`;
    try {
      const resCart = await axios.patch(urlCart, data);
      if (resCart.status === 200) {
        return resCart.data;
      }
    } catch (err) {
      if (err && err.res.status === 500) {
        console.log(err.message);
      }
    }
  }
);
export const deleteCartItem = createAsyncThunk(
  //action type string
  "users/deleteCartItem",
  // callback function
  async (data) => {
    const urlCart = `${API_URL}/cart/products/delete/${data.id}?userID=${data.id_user}`;
    try {
      const resCart = await axios.delete(urlCart);
      if (resCart.status === 200) {
        toast.success("delete successful");
        return resCart.data;
      }
    } catch (err) {
      if (err && err.res.status === 500) {
        console.log(err.message);
      }
    }
  }
);
const initialState = {
  cart: [],
  loading: false,
  errorMessage: "",
  users: [],
  isLogined: false,
  user: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogined = false;
      state.user = null;
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginSuccess.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateAvatarUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductInCartByUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(decrementCartItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(incrementCartItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginSuccess.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.isLogined = true;
          state.user = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogined = false;
        state.user = {};
        state.cart = [];
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload;
      })
      .addCase(updateAvatarUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getProductInCartByUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.cart = action.payload;
        }
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(setUsers.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(loginSuccess.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(updateAvatarUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getProductInCartByUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(incrementCartItem.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
// export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
