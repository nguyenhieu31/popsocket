import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = process.env.REACT_APP_API_URL;
export const getAllComment = createAsyncThunk(
  //action type string
  "comment/getAllComment",
  // callback function
  async (id) => {
    const url = `${API_URL}/user/comments/${id}`;
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      if (err && err.res.status === 401) {
        console.log(err);
      }
    }
  }
);
export const CreateComment = createAsyncThunk(
  //action type string
  "comment/CreateComment",
  // callback function
  async (values) => {
    const url = `${API_URL}/user/create-comment`;
    try {
      const res = await axios.post(url, values);
      if (res) {
        toast.success("post comment is successful");
        return res.data;
      }
    } catch (err) {
      if (err && err.response.status === 401) {
        toast.error("post comment is fail");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
export const UpdateComment = createAsyncThunk(
  //action type string
  "comment/UpdateComment",
  // callback function
  async (values) => {
    const url = `${API_URL}/user/update-comment`;
    try {
      const res = await axios.put(url, values);
      if (res) {
        toast.success("update comment is successful");
        return res.data;
      }
    } catch (err) {
      if (err && err.response.status === 401) {
        toast.error("update comment is fail");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
export const DeleteComment = createAsyncThunk(
  //action type string
  "comment/DeleteComment",
  // callback function
  async (values) => {
    const url = `${API_URL}/user/delete-comment?id=${values.id}&id_product=${values.id_product}`;
    try {
      const res = await axios.delete(url);
      if (res) {
        toast.success("delete comment is successful");
        return res.data;
      }
    } catch (err) {
      if (err && err.response.status === 401) {
        toast.error("delete comment is fail");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
export const incrementButtonLike = createAsyncThunk(
  //action type string
  "comment/incrementButtonLike",
  // callback function
  async (values) => {
    const url = `${API_URL}/user/comment/increase-like`;
    try {
      const res = await axios.post(url, values);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      if (err && err.response.status === 401) {
        toast.error("like is fail");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
export const incrementButtonDislike = createAsyncThunk(
  //action type string
  "comment/incrementButtonDislike",
  // callback function
  async (values) => {
    const url = `${API_URL}/user/comment/increase-dislike`;
    try {
      const res = await axios.post(url, values);
      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      if (err && err.response.status === 401) {
        toast.error("like is fail");
        return;
      } else {
        console.log("Error occurred:", err.message);
      }
    }
  }
);
const initialState = {
  comments: [],
  loading: false,
  errorMessage: " ",
};
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UpdateComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DeleteComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(incrementButtonLike.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(incrementButtonDislike.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(CreateComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.comments = action.payload;
        }
      })
      .addCase(UpdateComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.comments = action.payload;
        }
      })

      .addCase(DeleteComment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.comments = action.payload;
        }
      })
      .addCase(getAllComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(incrementButtonLike.fulfilled, (state, action) => {
        state.loading = true;
        if (action.payload) {
          state.comments = action.payload;
        }
      })
      .addCase(incrementButtonDislike.fulfilled, (state, action) => {
        state.loading = true;
        if (action.payload) {
          state.comments = action.payload;
        }
      })
      .addCase(CreateComment.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(UpdateComment.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(DeleteComment.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(getAllComment.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(incrementButtonLike.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(incrementButtonDislike.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});
export default commentSlice.reducer;
