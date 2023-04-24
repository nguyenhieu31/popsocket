import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = process.env.REACT_APP_API_URL;
export const setUsers = createAsyncThunk(
  //action type string
  "users/setUsers",
  // callback function
  async (values) => {
    const url = `${API_URL}/users`;
    try {
      const res = await axios.get(url);
      const findUser = res.data.find((user) => {
        return user.email === values.email;
      });
      if (findUser) {
        toast.error("email is already existing");
        return;
      } else {
        await axios.post(url, values);
        toast.success("Create account successful");
      }
    } catch (err) {}
  }
);
export const getUser = createAsyncThunk(
  //action type string
  "users/getUser",
  // callback function
  async (values) => {
    const url = `${API_URL}/users`;
    try {
      const res = await axios.get(url);
      const findUser = res.data.find((user) => {
        return user.email === values.email;
      });
      if (findUser && findUser.password === values.password) {
        toast.success("login successful");
        localStorage.setItem("user", JSON.stringify(findUser));
        return;
      } else {
        toast.error("email or password is incorrect");
        return;
      }
    } catch (err) {}
  }
);
export const updateUser = createAsyncThunk(
  //action type string
  "users/updateUser",
  // callback function
  async (dataInit) => {
    const url = `${API_URL}/users/${dataInit.id}`;
    const data = JSON.parse(JSON.stringify(dataInit));
    data.updatedDate = new Date().toString();
    try {
      const res = await axios.patch(url, data);
      if (res) {
        toast.success("update successful");
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      } else {
        toast.error("update is fail");
        return;
      }
    } catch (err) {}
  }
);
export const changePassword = createAsyncThunk(
  //action type string
  "users/changePassword",
  // callback function
  async (dataInit) => {
    const url = `${API_URL}/users/${dataInit.id}`;
    const data = JSON.parse(JSON.stringify(dataInit));
    data.updatedDate = new Date().toString();
    try {
      const res = await axios.patch(url, data);
      if (res) {
        toast.success("change password successful");
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      } else {
        toast.error("change password is fail");
        return;
      }
    } catch (err) {}
  }
);
export const addToCart = createAsyncThunk(
  //action type string
  "users/addToCart",
  // callback function
  async (values) => {
    const urlCart = `${API_URL}/carts`;
    try {
      const resCart = await axios.get(urlCart);
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        let innitValues = {
          id: values.idUser,
          cartItems: [],
        };
        const findCartByUser = resCart.data.filter((item) => {
          return item.id === innitValues.id;
        });
        if (findCartByUser.length > 0) {
          const isProduct = findCartByUser.find((item) => {
            const { cartItems } = item;
            const isItem = cartItems.find((detailItem) => {
              return detailItem.id === values.id;
            });
            if (isItem) {
              return item;
            }
            return null;
          });
          if (isProduct) {
            const url = `${API_URL}/carts/${isProduct.id}`;
            const findIndexProductInCart = isProduct.cartItems.findIndex(
              (item, index) => {
                return item.id === values.id;
              }
            );
            let deleteItem = isProduct.cartItems.splice(
              findIndexProductInCart,
              1
            );
            let [newItem] = deleteItem;
            newItem.quantity++;
            isProduct.cartItems.splice(findIndexProductInCart, 0, newItem);
            await axios.patch(url, isProduct);
            toast.success("add to cart successful");
            return isProduct;
          } else {
            const url = `${API_URL}/carts/${innitValues.id}`;
            innitValues.cartItems.push({ ...values, quantity: 1 });
            const [value] = findCartByUser;
            innitValues.cartItems = innitValues.cartItems.concat(
              value.cartItems
            );
            await axios.patch(url, JSON.parse(JSON.stringify(innitValues)));
            toast.success("add to cart successful");
            return innitValues;
          }
        } else {
          innitValues.cartItems.push({ ...values, quantity: 1 });
          await axios.post(urlCart, JSON.parse(JSON.stringify(innitValues)));
          toast.success("add to cart successful");
          return innitValues;
        }
      }
    } catch (err) {
      console.error(err.response);
    }
  }
);
export const getProductInCartByUser = createAsyncThunk(
  //action type string
  "users/getProductInCartByUser",
  // callback function
  async (id) => {
    const urlCart = `${API_URL}/carts`;
    try {
      const resCart = await axios.get(urlCart);
      const findCartByUser = resCart.data.find((item) => {
        return item.id === id;
      });
      if (findCartByUser) {
        return findCartByUser;
      }
    } catch (err) {}
  }
);
export const decrementCartItem = createAsyncThunk(
  //action type string
  "users/decrementCartItem",
  // callback function
  async (data) => {
    const urlCart = `${API_URL}/carts`;
    try {
      const resCart = await axios.get(urlCart);
      let innitValues = {
        id: data.idUser,
        cartItems: [],
      };
      const findCartByUser = resCart.data.find((item) => {
        return item.id === data.idUser;
      });
      if (findCartByUser) {
        const { id, cartItems } = findCartByUser;
        const url = `${API_URL}/carts/${id}`;
        const product = cartItems.find((item) => {
          return item.id === data.id;
        });
        const indexProduct = cartItems.findIndex((item) => {
          return item.id === data.id;
        });
        if (product && product.quantity === 1) {
          const newCartItems = cartItems.filter((item) => {
            return item.id !== product.id;
          });
          innitValues.cartItems = newCartItems;
          await axios.patch(url, JSON.parse(JSON.stringify(innitValues)));
          return innitValues.cartItems;
        } else {
          product.quantity--;
          cartItems.splice(indexProduct, 1, product);
          innitValues.cartItems = cartItems;
          await axios.patch(url, JSON.parse(JSON.stringify(innitValues)));
          return innitValues.cartItems;
        }
      }
    } catch (e) {}
  }
);
export const incrementCartItem = createAsyncThunk(
  //action type string
  "users/incrementCartItem",
  // callback function
  async (data) => {
    const urlCart = `${API_URL}/carts`;
    try {
      const resCart = await axios.get(urlCart);
      let innitValues = {
        id: data.idUser,
        cartItems: [],
      };
      const findCartByUser = resCart.data.find((item) => {
        return item.id === data.idUser;
      });
      if (findCartByUser) {
        const { id, cartItems } = findCartByUser;
        const url = `${API_URL}/carts/${id}`;
        const product = cartItems.find((item) => {
          return item.id === data.id;
        });
        const indexProduct = cartItems.findIndex((item) => {
          return item.id === data.id;
        });
        if (product) {
          product.quantity++;
          cartItems.splice(indexProduct, 1, product);
          innitValues.cartItems = cartItems;
          await axios.patch(url, JSON.parse(JSON.stringify(innitValues)));
          return innitValues;
        }
      }
    } catch (e) {}
  }
);
export const deleteCartItem = createAsyncThunk(
  //action type string
  "users/deleteCartItem",
  // callback function
  async (data) => {
    const urlCart = `${API_URL}/carts`;
    try {
      const resCart = await axios.get(urlCart);
      let innitValues = {
        id: data.idUser,
        cartItems: [],
      };
      const findCartByUser = resCart.data.find((item) => {
        return item.id === data.idUser;
      });
      if (findCartByUser) {
        const { id, cartItems } = findCartByUser;
        const url = `${API_URL}/carts/${id}`;
        const newCartItems = cartItems.filter((item) => {
          return item.id !== data.id;
        });
        innitValues.cartItems = newCartItems;
        await axios.patch(url, JSON.parse(JSON.stringify(innitValues)));
        return innitValues.cartItems;
      }
    } catch (e) {}
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
    loginSuccess: (state, action) => {
      return {
        ...state,
        isLogined: true,
        user: action.payload,
      };
    },
    logout: (state) => {
      localStorage.removeItem("user");
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
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changePassword.pending, (state, action) => {
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
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const { cartItems } = action.payload;
        state.cart = cartItems;
      })
      .addCase(getProductInCartByUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const { cartItems } = action.payload;
          state.cart = cartItems;
        }
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const { cartItems } = action.payload;
        state.cart = cartItems;
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
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
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
export const { loginSuccess, logout } = usersSlice.actions;
export default usersSlice.reducer;
